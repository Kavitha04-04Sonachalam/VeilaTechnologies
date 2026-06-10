import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RippleButton = ({ 
  children, 
  className = "", 
  onClick, 
  to, 
  type = "button", 
  disabled = false,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Resolve client coordinates for both desktop clicks and mobile touch taps
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    // Default to button center if coordinates are missing or zero (e.g. keyboard click or touch trigger)
    if (clientX === undefined || clientY === undefined || (clientX === 0 && clientY === 0)) {
      clientX = rect.left + rect.width / 2;
      clientY = rect.top + rect.height / 2;
    }

    // Position ripple relative to button
    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      size,
      x,
      y
    };

    setRipples((prev) => [...prev, newRipple]);

    // Cleanup ripple after animation finishes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  // Resolve whether we render a React Router Link or a standard button
  if (to) {
    return (
      <Link to={to} {...props} className="contents">
        <motion.div
          onClick={createRipple}
          className={`relative overflow-hidden cursor-pointer select-none transition-all duration-300 flex items-center justify-center gap-2 ${className}`}
          whileHover={{ 
            scale: 1.04,
            boxShadow: "0 0 25px rgba(255, 106, 0, 0.4)",
            y: -2
          }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</span>
          <span className="ripple-container">
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                className="ripple-circle"
                style={{
                  width: ripple.size,
                  height: ripple.size,
                  left: ripple.x,
                  top: ripple.y,
                }}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </span>
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={createRipple}
      className={`relative overflow-hidden cursor-pointer select-none transition-all duration-300 ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={!disabled ? { 
        scale: 1.04,
        boxShadow: "0 0 25px rgba(255, 106, 0, 0.4)",
        y: -2
      } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</span>
      <span className="ripple-container">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="ripple-circle"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </span>
    </motion.button>
  );
};

export default RippleButton;
