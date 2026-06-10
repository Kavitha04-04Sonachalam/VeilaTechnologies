import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, FaMobileAlt, FaBrain, FaCloud, FaPalette, FaChevronLeft, FaChevronRight,
  FaServer, FaDatabase, FaCogs, FaCheckCircle, FaStar, FaQuoteLeft, FaArrowRight,
  FaReact, FaPython, FaDocker, FaAws, FaTimes, FaExternalLinkAlt, FaGithub
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiFastapi, SiPostgresql, SiGithub 
} from 'react-icons/si';
import axios from 'axios';
import StatsCounter from '../components/Stats/StatsCounter';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const getProjectLink = (url) => {
    if (!url) return '#';
    if (url.includes('veila.tech') || url.includes('github.com/veila-tech')) {
      return '/placeholder.html';
    }
    return url;
  };

  // Fetch Projects from API on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projects');
        setProjects(response.data.slice(0, 3)); // Display top 3
      } catch (error) {
        console.warn('Backend API connection failed, using offline projects fallback.', error);
        // Fallback seed projects in case backend is not running during review
        setProjects([
          {
            id: 1,
            title: "Aura Fintech Portal",
            description: "A secure glassmorphic financial transaction platform showcasing real-time analytics, instant multi-currency transfers, and AI-driven spending patterns.",
            image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop&fm=webp",
            tech_stack: "React, Tailwind CSS, FastAPI, PostgreSQL, AWS",
            github_url: "/placeholder.html",
            live_url: "/placeholder.html"
          },
          {
            id: 2,
            title: "Vortex AI Dashboard",
            description: "An enterprise-grade orchestration pipeline for LLM deployments. Features multi-agent collaboration interfaces, fine-tuning task management, and token analytics.",
            image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop&fm=webp",
            tech_stack: "FastAPI, Python, React, Tailwind, Framer Motion",
            github_url: "/placeholder.html",
            live_url: "/placeholder.html"
          },
          {
            id: 3,
            title: "Helios Cloud Infrastructure",
            description: "Automated multi-cloud infrastructure provisioner and scaling monitor. Streamlines Kubernetes cluster setups, AWS/GCP resource alignment, and logs streams.",
            image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop&fm=webp",
            tech_stack: "Docker, FastAPI, PostgreSQL, Kubernetes, AWS",
            github_url: "/placeholder.html",
            live_url: "/placeholder.html"
          }
        ]);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const services = [
    { icon: <FaCode />, title: "Web Development", desc: "High-performance websites, responsive SaaS applications, and interactive portals optimized for conversions." },
    { icon: <FaServer />, title: "Software Development", desc: "Reliable, custom software solutions, automated workflows, and CRM database connections built for scaling." },
    { icon: <FaBrain />, title: "Digital Marketing", desc: "Result-oriented campaigns, brand positioning strategy, and growth marketing to establish your online presence." },
    { icon: <FaDatabase />, title: "Search Engine Optimization (SEO)", desc: "Auditing structure, parsing schemas, and optimizing site speed to rank your company first in search pages." },
    { icon: <FaMobileAlt />, title: "Social Media Management", desc: "Orchestrating active YouTube, Instagram, and corporate accounts with creative graphic assets and copy." },
    { icon: <FaPalette />, title: "UI/UX Design", desc: "Creative wireframes, clickable mockups, and modular brand identities built around human-computer interaction." }
  ];

  const techStack = {
    Frontend: [
      { name: "React", icon: <FaReact className="text-sky-400" /> },
      { name: "JavaScript", icon: <span className="font-bold text-yellow-400 text-sm">JS</span> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> }
    ],
    Backend: [
      { name: "Python", icon: <FaPython className="text-yellow-500" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-emerald-400" /> }
    ],
    Database: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> }
    ],
    DevOps: [
      { name: "Docker", icon: <FaDocker className="text-sky-500" /> },
      { name: "GitHub Actions", icon: <SiGithub className="text-neutral-300" /> }
    ],
    Cloud: [
      { name: "AWS", icon: <FaAws className="text-orange-400" /> }
    ]
  };

  const [activeTechTab, setActiveTechTab] = useState("Frontend");

  const whyChooseUs = [
    { title: "Expert Developers", desc: "Our team consists of senior software architects, DevOps engineers, and UI designers with years of proven market delivery." },
    { title: "Scalable Architecture", desc: "We build systems prepared to scale seamlessly from 1,000 to millions of requests with optimal caching and connection pooling." },
    { title: "Secure Applications", desc: "Advanced security schemas including database-level encryption, OAuth2/JWT authorization mechanisms, and strict CORS compliance." },
    { title: "Agile Development", desc: "Weekly sprints, robust QA, staging-to-production automation pipelines, and continuous customer alignment." },
    { title: "Fast Delivery", desc: "Leveraging modern pre-configured cloud architectures, Docker setups, and React templates to launch products ahead of schedule." },
    { title: "Modern Technology", desc: "We utilize standard modern tech stacks to prevent code maintenance debts and ensure clean future code extension pathways." }
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "CTO, Apex Retail Group",
      quote: "Veila Technologies built our core e-commerce API pipelines. The speed, security, and documentation were outstanding. Our page loads dropped by 45%, resulting in an immediate boost in checkout completion rates.",
      stars: 5
    },
    {
      name: "Sofia Sterling",
      role: "Founder, Vortex AI",
      quote: "The interface Veila built for our AI dashboard has been praised by all our venture capital partners. It is rare to find an engineering team that handles complex backend machine learning scaling and premium UI animations with equal expertise.",
      stars: 5
    },
    {
      name: "Kaelen Drake",
      role: "VP of Product, Helios Cloud",
      quote: "FastAPI architectures built by Veila are extremely solid. Their PostgreSQL queries are heavily optimized, running complex statistics lookups under 20ms. Working with them was an absolute pleasure.",
      stars: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-6 bg-grid-pattern">
        {/* Glow Effects */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute w-72 h-72 rounded-full bg-brand-orange-light/5 blur-[90px] -top-10 left-10 pointer-events-none" />
        
        {/* Floating tech background elements */}
        <motion.div 
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute hidden md:block top-1/4 left-1/12 p-3 glassmorphism rounded-xl border border-white/5 opacity-40 hover:opacity-100 transition-opacity"
        >
          <FaReact className="text-sky-400 text-3xl" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], x: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="absolute hidden md:block bottom-1/4 left-1/6 p-3 glassmorphism rounded-xl border border-white/5 opacity-40 hover:opacity-100 transition-opacity"
        >
          <SiFastapi className="text-emerald-400 text-3xl" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -18, 0], x: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
          className="absolute hidden md:block top-1/3 right-1/10 p-3 glassmorphism rounded-xl border border-white/5 opacity-40 hover:opacity-100 transition-opacity"
        >
          <FaPython className="text-yellow-500 text-3xl" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], x: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 3 }}
          className="absolute hidden md:block bottom-1/3 right-1/6 p-3 glassmorphism rounded-xl border border-white/5 opacity-40 hover:opacity-100 transition-opacity"
        >
          <FaDocker className="text-sky-500 text-3xl" />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Glowing Logo wrapper */}
            <div className="relative mb-8 group cursor-pointer">
              {/* Pulsing outer aura glow */}
              <div className="absolute inset-0 rounded-3xl bg-brand-orange-mid/20 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100" />
              
              {/* Inner Badge */}
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 4,
                  borderColor: "rgba(255, 106, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative p-3 rounded-3xl border border-brand-orange-mid/30 bg-gradient-to-b from-neutral-900 to-neutral-950 dark:from-neutral-950 dark:to-black shadow-2xl flex items-center justify-center overflow-hidden"
              >
                {/* Shiny reflection sweep */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                <img 
                  src="/logo.png" 
                  alt="Veila logo" 
                  className="w-16 h-16 object-contain filter drop-shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-transform duration-300 group-hover:scale-105" 
                />
              </motion.div>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-neutral-950 dark:text-white tracking-tight leading-[1.05] mb-6">
              Transforming Ideas Into <br className="hidden sm:inline" />
              <span className="gradient-text-brand text-glow-orange">Digital Innovation</span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl text-base sm:text-lg text-neutral-800 dark:text-brand-gray font-sans font-medium mb-10 leading-relaxed">
              Veila Technologies is a technology-driven company focused on helping businesses grow through innovative digital solutions. We specialize in web development, software development, digital marketing, SEO, and social media management.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-sm sm:max-w-none">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded gradient-brand hover:brightness-110 text-white shadow-lg glow-orange/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Started <FaArrowRight size={12} />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded bg-white hover:bg-neutral-100 dark:bg-brand-dark-card dark:hover:bg-brand-dark-hover border border-black/10 dark:border-white/10 text-neutral-800 dark:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer hidden md:flex"
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
          >
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Scroll Down</span>
            <div className="w-5 h-8 border-2 border-neutral-300 dark:border-brand-dark-border rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-brand-orange-mid rounded-full animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 bg-neutral-50/50 dark:bg-brand-dark-card/30 border-y border-neutral-200 dark:border-brand-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col gap-2">
              <StatsCounter target={100} suffix="+" />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-brand-gray uppercase tracking-widest font-bold font-sans">
                Projects Delivered
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <StatsCounter target={50} suffix="+" />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-brand-gray uppercase tracking-widest font-bold font-sans">
                Happy Clients
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <StatsCounter target={10} suffix="+" />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-brand-gray uppercase tracking-widest font-bold font-sans">
                Technology Experts
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <StatsCounter target={5} suffix="+" />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-brand-gray uppercase tracking-widest font-bold font-sans">
                Years Experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-1/3 -left-36 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">What We Offer</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-800 dark:text-white mt-2 mb-4 leading-tight">
              Enterprise Services Built for Scale
            </h2>
            <div className="w-12 h-1 bg-brand-orange-mid mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="p-6 glassmorphism rounded-xl hover:glassmorphism-hover group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded bg-brand-orange-mid/10 border border-brand-orange-mid/20 flex items-center justify-center text-brand-orange-light text-xl mb-6 group-hover:scale-110 group-hover:bg-brand-orange-mid group-hover:text-white transition-all duration-300">
                  {svc.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white mb-3 group-hover:text-brand-orange-light transition-colors duration-200">
                  {svc.title}
                </h3>
                <p className="text-sm text-neutral-800 dark:text-brand-muted leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. TECHNOLOGY SHOWCASE */}
      <section className="py-20 px-6 bg-brand-dark-card/10 border-y border-neutral-200 dark:border-brand-dark-border">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Our Stack</span>
            <h2 className="font-display font-extrabold text-3xl text-neutral-800 dark:text-white mt-1 mb-6">
              Interactive Tech Showcase
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.keys(techStack).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTechTab(tab)}
                className={`px-5 py-2.5 rounded text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                  activeTechTab === tab 
                    ? 'gradient-brand text-white border-transparent shadow-md glow-orange/15'
                    : 'bg-white dark:bg-brand-dark-card/60 text-neutral-600 dark:text-brand-gray border-black/5 dark:border-white/5 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glassmorphism rounded-2xl p-4 sm:p-8 border border-white/5 relative overflow-hidden min-h-[220px] flex items-center justify-center">
            {/* Ambient orange pulse */}
            <div className="absolute w-64 h-64 rounded-full bg-brand-orange-mid/5 blur-3xl -top-12 -left-12 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTechTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full text-center"
              >
                {techStack[activeTechTab].map((tech) => (
                  <div 
                    key={tech.name}
                    className="p-4 sm:p-6 rounded-xl bg-white/60 dark:bg-brand-black/40 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-3 hover:border-brand-orange-mid/20 transition-colors duration-200"
                  >
                    <div className="text-4xl">{tech.icon}</div>
                    <span className="font-sans font-semibold text-sm text-neutral-800 dark:text-brand-gray">{tech.name}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE VEILA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Why Choose Us</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-800 dark:text-white mt-2 mb-4">
              Building Scalable & Secure Standards
            </h2>
            <div className="w-12 h-1 bg-brand-orange-mid mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="flex gap-4 p-6 rounded-xl glassmorphism hover:glassmorphism-hover hover:border-brand-orange-mid/20 transition-all duration-300"
              >
                <div className="text-brand-orange-light mt-1 shrink-0">
                  <FaCheckCircle size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-md text-neutral-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-800 dark:text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FEATURED PROJECTS SECTION (API DRIVEN) */}
      <section className="py-20 px-6 bg-neutral-50/40 dark:bg-brand-dark-card/30 border-y border-neutral-200 dark:border-brand-dark-border relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] bottom-0 right-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Our Work</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-800 dark:text-white mt-2">
                Featured Deliveries
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange-light hover:text-white transition-colors uppercase tracking-wider pl-1"
            >
              View All Projects <FaArrowRight size={10} />
            </Link>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="glassmorphism rounded-xl border border-white/5 overflow-hidden h-[400px] animate-pulse">
                  <div className="bg-brand-dark-border h-48 w-full" />
                  <div className="p-6 flex flex-col gap-4">
                    <div className="h-6 bg-brand-dark-border rounded w-2/3" />
                    <div className="h-16 bg-brand-dark-border rounded w-full" />
                    <div className="h-4 bg-brand-dark-border rounded w-1/2 mt-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <motion.div
                  key={proj.id}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedProject(proj)}
                  className="glassmorphism rounded-xl border border-white/5 overflow-hidden flex flex-col h-full hover:border-brand-orange-mid/20 transition-all duration-300 cursor-pointer select-none"
                >
                  <div className="relative h-48 overflow-hidden bg-brand-dark-border select-none">
                    <img 
                      src={proj.image_url.includes("?") ? `${proj.image_url}&fm=webp` : proj.image_url} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow select-text">
                    <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white mb-2 hover:text-brand-orange-light transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-neutral-800 dark:text-brand-muted line-clamp-3 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tech_stack.split(',').map((tech) => (
                        <span 
                          key={tech.trim()} 
                          className="px-2 py-1 text-[10px] font-semibold bg-neutral-100 dark:bg-brand-dark-border/60 text-neutral-700 dark:text-brand-gray rounded border border-black/5 dark:border-white/5"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mt-auto text-xs font-semibold uppercase tracking-widest select-none">
                      {proj.live_url && (
                        <a 
                          href={getProjectLink(proj.live_url)} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="text-brand-orange-mid hover:text-neutral-900 dark:text-brand-orange-light dark:hover:text-white transition-colors cursor-pointer"
                        >
                          Live Demo
                        </a>
                      )}
                      {proj.github_url && (
                        <a 
                          href={getProjectLink(proj.github_url)} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="text-neutral-500 hover:text-neutral-900 dark:text-brand-muted dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl bg-white dark:bg-brand-dark-card border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col max-h-[90vh] relative select-text"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-500 hover:text-black dark:text-brand-muted dark:hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close modal"
              >
                <FaTimes size={14} />
              </button>

              <div className="overflow-y-auto pr-1 flex flex-col gap-6">
                {/* Image */}
                <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden bg-brand-dark-border select-none">
                  <img 
                    src={selectedProject.image_url.includes("?") ? `${selectedProject.image_url}&fm=webp` : selectedProject.image_url} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 font-display font-extrabold text-2xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange-light mb-2">Project Overview</h4>
                  <p className="text-sm text-neutral-800 dark:text-brand-gray leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange-light mb-3">Technologies Employed</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech_stack.split(',').map((tech) => (
                      <span 
                        key={tech.trim()} 
                        className="px-3 py-1 text-xs font-semibold bg-neutral-100 dark:bg-brand-dark-border/60 text-neutral-700 dark:text-brand-gray rounded border border-black/5 dark:border-white/5"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {selectedProject.live_url && (
                    <a
                      href={getProjectLink(selectedProject.live_url)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-6 py-3 rounded text-sm font-semibold text-center gradient-brand hover:brightness-110 text-white shadow-lg glow-orange/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Launch Live Demo <FaExternalLinkAlt size={12} />
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={getProjectLink(selectedProject.github_url)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-6 py-3 rounded text-sm font-semibold text-center bg-white hover:bg-neutral-100 dark:bg-brand-dark-card/80 dark:hover:bg-brand-dark-hover border border-black/10 dark:border-white/10 text-neutral-800 dark:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Explore Codebase <FaGithub size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. TESTIMONIALS CAROUSEL */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Client Feedback</span>
            <h2 className="font-display font-extrabold text-3xl text-neutral-800 dark:text-white mt-1 mb-2">
              What Partners Say
            </h2>
          </div>

          <div className="glassmorphism rounded-2xl p-8 md:p-12 border border-white/5 relative">
            
            {/* Quote icon overlay */}
            <div className="absolute top-6 left-6 text-brand-orange-mid/10 text-7xl pointer-events-none">
              <FaQuoteLeft />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center gap-6"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonials[currentTestimonial].stars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" size={14} />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="font-sans text-base sm:text-lg italic text-neutral-800 dark:text-brand-gray leading-relaxed font-medium">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                {/* User info */}
                <div>
                  <h4 className="font-display font-bold text-neutral-800 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <span className="text-xs text-brand-orange-light font-semibold">
                    {testimonials[currentTestimonial].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider arrows */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full border border-white/5 bg-brand-dark-card/50 hover:bg-brand-dark-hover text-brand-gray hover:text-white transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full border border-white/5 bg-brand-dark-card/50 hover:bg-brand-dark-hover text-brand-gray hover:text-white transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <FaChevronRight size={12} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION (CTA) */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glassmorphism rounded-2xl p-8 md:p-14 text-center border border-white/5 relative overflow-hidden flex flex-col items-center shadow-2xl"
          >
            {/* Soft glowing overlays */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange-mid/10 blur-[100px] -bottom-1/2 -right-1/4 pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-orange-light/5 blur-[80px] -top-1/2 -left-1/4 pointer-events-none" />

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-neutral-800 dark:text-white tracking-tight leading-none mb-4">
              Ready to Upgrade Your Architecture?
            </h2>
            <p className="max-w-lg text-sm sm:text-base text-neutral-800 dark:text-brand-gray font-sans mb-8">
              Let's build a fast, secure, and modern digital solution that solves your operations and captures your audience.
            </p>
            
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded text-sm font-bold uppercase tracking-wider gradient-brand hover:brightness-110 text-white shadow-lg glow-orange/20 transition-all duration-300 cursor-pointer"
            >
              Launch Project
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
