import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Technologies from './pages/Technologies';
import Portfolio from './pages/Portfolio';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';

// Route handler for page titles & scroll to top
const RouteChangeHandler = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const titles = {
      '/': 'Veila Technologies | Premium Digital Innovation',
      '/about': 'About Us | Veila Technologies',
      '/services': 'Services | Veila Technologies',
      '/technologies': 'Technologies | Veila Technologies',
      '/portfolio': 'Portfolio | Veila Technologies',
      '/careers': 'Careers | Veila Technologies',
      '/contact': 'Contact Us | Veila Technologies',
    };
    
    document.title = titles[pathname] || 'Veila Technologies';
  }, [pathname]);

  return null;
};

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor position tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOverClickable = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');
      
      setIsHoveringClickable(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOverClickable);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOverClickable);
    };
  }, []);

  return (
    <>
      {/* 1. Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onFinished={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-neutral-50 dark:bg-brand-black text-neutral-800 dark:text-white flex flex-col justify-between transition-colors duration-300">

          
          {/* Scroll progress indicator */}
          <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

          {/* Interactive cursor glow light (subtle neon tracker) */}
          <div 
            className={`pointer-events-none fixed z-50 rounded-full transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
              isHoveringClickable 
                ? 'w-16 h-16 bg-brand-orange-mid/10 border border-brand-orange-mid/30 blur-xs'
                : 'w-[350px] h-[350px] bg-brand-orange-mid/[0.04] blur-[90px]'
            }`}
            style={{ 
              left: `${mousePos.x}px`, 
              top: `${mousePos.y}px`
            }}
          />

          <RouteChangeHandler />
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/technologies" element={<Technologies />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
