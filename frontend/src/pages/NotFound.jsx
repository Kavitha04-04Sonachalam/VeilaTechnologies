import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-grid-pattern px-6 select-none">
      
      {/* Glow effect */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-md w-full text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 glassmorphism rounded-2xl border border-white/5 flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-brand-orange-mid/10 border border-brand-orange-mid/20 flex items-center justify-center text-brand-orange-light text-3xl">
            <FaExclamationTriangle />
          </div>

          <h1 className="font-display font-extrabold text-5xl text-white leading-none">
            404
          </h1>
          
          <h2 className="font-display font-bold text-lg text-brand-orange-light">
            PAGE ARCHIVE OFFLINE
          </h2>

          <p className="text-sm text-brand-muted leading-relaxed font-sans max-w-xs">
            The page you are looking for has been moved, renamed, or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className="w-full mt-4 py-3 text-xs font-semibold rounded gradient-brand text-white flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200"
          >
            <FaHome /> Return Home
          </Link>
        </motion.div>

      </div>

    </div>
  );
};

export default NotFound;
