import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onFinished();
          }, 500);
          return 100;
        }
        // Increment progress by a random amount
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -30,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none"
    >
      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Glow effect in background */}
        <div className="absolute w-72 h-72 rounded-full bg-brand-orange-mid/10 blur-3xl -top-16 pointer-events-none" />
        
        {/* Centered logo with pulse and shadow glow */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            filter: [
              "drop-shadow(0 0 10px rgba(255, 106, 0, 0.4))",
              "drop-shadow(0 0 25px rgba(255, 106, 0, 0.7))",
              "drop-shadow(0 0 10px rgba(255, 106, 0, 0.4))"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut"
          }}
          className="mb-8 cursor-default"
        >
          <img 
            src="/logo.png" 
            alt="Veila Technologies Logo" 
            className="w-24 h-auto object-contain"
            onError={(e) => {
              // Fallback text if logo fails to render
              e.target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white font-display text-2xl font-bold tracking-wider mb-2"
        >
          VEILA TECHNOLOGIES
        </motion.h2>

        {/* Display Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-brand-orange-light text-glow-orange font-sans text-xs font-semibold uppercase tracking-widest mb-10"
        >
          Building The Future With Veila Technologies
        </motion.p>

        {/* Custom Progress Bar */}
        <div className="w-64 h-1.5 bg-brand-dark-border rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
            className="h-full gradient-brand rounded-full"
          />
        </div>

        {/* Percentage Label */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="text-brand-muted text-xs font-mono mt-3 block"
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
