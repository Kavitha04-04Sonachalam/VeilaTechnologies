import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
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

// Reusable Page Transition component
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// Lightweight Floating background particles
const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 15,
      targetX: Math.random() * 80 - 40,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-orange-mid/10 dark:bg-brand-orange-mid/[0.06]"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: -20,
          }}
          animate={{
            y: [0, -window.innerHeight - 150],
            x: [0, p.targetX, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const location = useLocation();

  // Custom magnetic cursor positions
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

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
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  }, [cursorX, cursorY]);

  return (
    <>
      {/* 1. Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onFinished={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-neutral-50 dark:bg-brand-black text-neutral-800 dark:text-white flex flex-col justify-between transition-colors duration-300 relative">

          {/* Floating Background Particles */}
          <ParticlesBackground />
          
          {/* Scroll progress indicator */}
          <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

          {/* Re-designed premium mouse follow custom cursor */}
          <motion.div
            className={`pointer-events-none fixed top-0 left-0 rounded-full z-50 -translate-x-1/2 -translate-y-1/2 border border-brand-orange-mid/30 hidden md:block ${
              isHoveringClickable 
                ? 'w-12 h-12 bg-brand-orange-mid/10' 
                : 'w-6 h-6 bg-transparent'
            }`}
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              transition: "width 0.2s, height 0.2s, background-color 0.2s"
            }}
          />
          <motion.div
            className="pointer-events-none fixed top-0 left-0 w-2 h-2 bg-brand-orange-mid rounded-full z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{
              x: cursorX,
              y: cursorY
            }}
          />

          {/* Ambient background glow tracking cursor */}
          <motion.div 
            className="pointer-events-none fixed top-0 left-0 z-0 rounded-full w-[450px] h-[450px] bg-brand-orange-mid/[0.03] blur-[110px] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{ 
              x: cursorXSpring, 
              y: cursorYSpring 
            }}
          />

          <RouteChangeHandler />
          <Navbar />

          <main className="flex-grow relative z-10">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="/technologies" element={<PageTransition><Technologies /></PageTransition>} />
                <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
                <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
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
