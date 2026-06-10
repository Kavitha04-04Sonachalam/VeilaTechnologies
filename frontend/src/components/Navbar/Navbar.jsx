import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-black/80 border-b border-black/5 dark:border-white/5 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-neutral-950/90 dark:bg-transparent p-1.5 rounded-lg transition-colors duration-300">
            <img 
              src="/logo.png" 
              alt="Veila Technologies Logo" 
              className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(255,106,0,0.3)]" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-wider text-neutral-950 dark:text-white transition-colors duration-300">
              VEILA
            </span>
            <span className="text-[10px] text-brand-orange-light font-sans font-bold tracking-widest leading-none">
              TECHNOLOGIES
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `relative font-sans text-sm font-medium transition-colors duration-200 py-1.5 ${
                  isActive 
                    ? 'text-brand-orange-light' 
                    : 'text-neutral-600 hover:text-black dark:text-brand-gray dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange-mid rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle, Admin Dashboard Button, Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-black/5 dark:border-white/5 bg-neutral-200/40 dark:bg-brand-dark-card/40 hover:bg-neutral-300/60 dark:hover:bg-brand-dark-hover/60 transition-colors duration-200 text-neutral-600 hover:text-black dark:text-brand-gray dark:hover:text-white cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>

          {/* Mobile menu icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-600 hover:text-black dark:text-brand-gray dark:hover:text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-neutral-50/95 dark:bg-black/95 border-b border-neutral-200 dark:border-brand-dark-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-sans text-base font-semibold py-2 block border-l-2 pl-3 ${
                      isActive
                        ? 'border-brand-orange-mid text-brand-orange-light'
                        : 'border-transparent text-neutral-600 hover:text-black dark:text-brand-gray dark:hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="w-full text-center py-2.5 text-sm font-semibold rounded gradient-brand text-white transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
