import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-100 dark:bg-brand-black border-t border-neutral-200 dark:border-brand-dark-border pt-16 pb-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute w-96 h-96 rounded-full bg-brand-orange-mid/5 blur-3xl -bottom-36 -right-36 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-neutral-950/90 dark:bg-transparent p-1.5 rounded-lg transition-colors duration-300">
                <img src="/logo.png" alt="Veila logo" className="w-7 h-7 object-contain filter drop-shadow-[0_0_8px_rgba(255,106,0,0.3)]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-md tracking-wider text-neutral-950 dark:text-white transition-colors duration-300">
                  VEILA
                </span>
                <span className="text-[9px] text-brand-orange-light font-sans font-bold tracking-widest leading-none">
                  TECHNOLOGIES
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-800 dark:text-brand-muted mt-2 leading-relaxed font-sans">
              Veila Technologies is a technology-driven company focused on helping businesses grow through innovative digital solutions. Est. 2026.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.instagram.com/veilatechnologies?igsh=MjhvN3VoMTRlYTl1" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-black dark:text-brand-muted dark:hover:text-white transition-colors duration-200">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.youtube.com/@VeilaTechnologies" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-black dark:text-brand-muted dark:hover:text-white transition-colors duration-200">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-neutral-800 dark:text-white uppercase tracking-widest mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link to="/services" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  AI & ML Orchestration
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  Cloud Deployments
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  UI/UX Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-neutral-800 dark:text-white uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link to="/about" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  About Story
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  Technology Grid
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  Careers (Openings)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-600 dark:text-brand-muted hover:text-brand-orange-light transition-colors duration-200">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Subscription */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-sm text-neutral-800 dark:text-white uppercase tracking-widest mb-2">
              Subscribe
            </h4>
            <p className="text-sm text-neutral-800 dark:text-brand-muted">
              Receive updates on technology innovations, cloud trends, and project deliveries.
            </p>
            {subscribed ? (
              <div className="p-3 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded font-medium font-sans">
                ✓ Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded bg-white dark:bg-brand-dark-card/50 border border-neutral-300 dark:border-brand-dark-border focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded gradient-brand hover:brightness-110 text-white cursor-pointer transition-all duration-200 shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-brand-dark-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 dark:text-brand-muted">
            &copy; {new Date().getFullYear()} Veila Technologies. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-xs text-neutral-500 dark:text-brand-muted">
            <Link to="/contact" className="hover:text-black dark:hover:text-white">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-black dark:hover:text-white">Terms of Service</Link>
            
            <button
              onClick={handleScrollToTop}
              className="p-2.5 rounded bg-neutral-200 dark:bg-brand-dark-card border border-black/5 dark:border-white/5 hover:border-brand-orange-mid/30 text-neutral-600 hover:text-black dark:text-brand-gray dark:hover:text-white cursor-pointer transition-all duration-200"
              aria-label="Back to top"
            >
              <FaArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
