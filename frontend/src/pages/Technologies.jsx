import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaReact, FaJsSquare, FaPython, FaDocker, FaAws, FaGitAlt, FaTerminal, FaHtml5, FaCss3Alt
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiFastapi, SiPostgresql, SiGithub, SiKubernetes, SiTerraform, 
  SiPostman, SiSqlite, SiNginx 
} from 'react-icons/si';

const Technologies = () => {
  const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Cloud", "Tools"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [flippedCards, setFlippedCards] = useState({});

  const techStack = [
    // Frontend
    { 
      name: "React", 
      category: "Frontend", 
      level: "Expert", 
      icon: <FaReact className="text-sky-400" />, 
      desc: "Used for SPA scaling, design systems, and client interfaces.",
      useCases: "Modular components, state management integration, and interactive dashboard routing.",
      why: "Ensures highly modular code, fast UI rendering via virtual DOM, and a rich library ecosystem."
    },
    { 
      name: "JavaScript", 
      category: "Frontend", 
      level: "Expert", 
      icon: <FaJsSquare className="text-yellow-400" />, 
      desc: "ES6+ asynchronous functions, event loop handling, and DOM operations.",
      useCases: "Interactive client behaviors, DOM manipulation, and network call handling.",
      why: "Core language of the web, enabling real-time data orchestration and rich visual interactivity."
    },
    { 
      name: "Tailwind CSS", 
      category: "Frontend", 
      level: "Expert", 
      icon: <SiTailwindcss className="text-teal-400" />, 
      desc: "Utility-first design configurations, custom theme overrides, and animation overlays.",
      useCases: "Rapid prototyping, responsive styling layout rules, and uniform UI design patterns.",
      why: "Minimizes stylesheet sizes, removes name collisions, and provides standard utility tokens."
    },
    { 
      name: "HTML5", 
      category: "Frontend", 
      level: "Expert", 
      icon: <FaHtml5 className="text-orange-500" />, 
      desc: "Semantic site structure, SEO-optimized element layout, and browser compliance.",
      useCases: "Document structure outlines, meta tagging definitions, and search crawler index optimization.",
      why: "Foundational markup supporting modern web API standards and accessible page indices."
    },
    { 
      name: "CSS3", 
      category: "Frontend", 
      level: "Expert", 
      icon: <FaCss3Alt className="text-blue-500" />, 
      desc: "Custom grid systems, flex overlays, transitions, variables, and responsive viewports.",
      useCases: "Advanced typography styling, page transition keyframes, and multi-device grid alignments.",
      why: "Provides deep visual controls, media queries for accessibility, and smooth hardware transitions."
    },
    
    // Backend
    { 
      name: "Python", 
      category: "Backend", 
      level: "Expert", 
      icon: <FaPython className="text-yellow-500" />, 
      desc: "Asynchronous task scaling, system administration scripting, and machine learning structures.",
      useCases: "Machine learning integration, background tasks execution, and database scripting helpers.",
      why: "Readability, scientific package support, and robust backend scalability profiles."
    },
    { 
      name: "FastAPI", 
      category: "Backend", 
      level: "Expert", 
      icon: <SiFastapi className="text-emerald-400" />, 
      desc: "High-performance async routing, Pydantic type integrations, and automatic OpenAPI schema builders.",
      useCases: "RESTful API construction, request validator layers, and fast payload serialization.",
      why: "Extremely fast runtime performance, automatic Swagger documents generation, and Pydantic validation."
    },
    { 
      name: "Nginx", 
      category: "Backend", 
      level: "Intermediate", 
      icon: <SiNginx className="text-emerald-600" />, 
      desc: "Reverse proxy configurations, SSL handshake security management, and static load distribution.",
      useCases: "Load balancing, SSL termination pipelines, and HTTP request routing protocols.",
      why: "Handles massive connection limits with near-zero memory footprint and acts as an app shield."
    },

    // Database
    { 
      name: "PostgreSQL", 
      category: "Database", 
      level: "Expert", 
      icon: <SiPostgresql className="text-blue-400" />, 
      desc: "Relational table indices, connection pooling setups, complex query optimization, and UUID primary keys.",
      useCases: "User records storage, relational index searches, database constraints, and transactions.",
      why: "Highly reliable ACID compliance, rich query syntax, and connection scaling compatibility."
    },
    { 
      name: "SQLite", 
      category: "Database", 
      level: "Expert", 
      icon: <SiSqlite className="text-sky-600" />, 
      desc: "In-memory database fallbacks, local client mock configurations, and isolated automated unit test spaces.",
      useCases: "Local development staging, offline caching storage, and automated testing seeds.",
      why: "Zero configuration, runs in-process, and provides standard SQL support with no database daemon."
    },

    // DevOps
    { 
      name: "Docker", 
      category: "DevOps", 
      level: "Expert", 
      icon: <FaDocker className="text-sky-500" />, 
      desc: "Multi-stage project containerization, Docker Compose staging configurations, and microservice isolation.",
      useCases: "Local developer environment standardization and cloud container builds.",
      why: "Guarantees parity between local coding sandboxes and production servers, removing environment discrepancies."
    },
    { 
      name: "Kubernetes", 
      category: "DevOps", 
      level: "Intermediate", 
      icon: <SiKubernetes className="text-blue-500" />, 
      desc: "Autoscaling container clusters, resource limits management, ingress routers, and rolling updates.",
      useCases: "Multi-container server scaling, load balancing routing, and automatic self-healing.",
      why: "Automates deployment architectures and ensures zero-downtime rolling updates."
    },
    { 
      name: "Terraform", 
      category: "DevOps", 
      level: "Intermediate", 
      icon: <SiTerraform className="text-indigo-400" />, 
      desc: "Infrastructure as Code (IaC) configuration for reproducible cloud setups and security groups.",
      useCases: "VPC networking declaration, cloud server allocation, and storage authorization setups.",
      why: "Enables versioned infrastructure changes, avoiding manual server configurations and configuration drift."
    },

    // Cloud
    { 
      name: "AWS", 
      category: "Cloud", 
      level: "Expert", 
      icon: <FaAws className="text-orange-400" />, 
      desc: "EC2 instances, VPC private subnetting, RDS cluster configs, S3 bucket storage, and IAM rights policies.",
      useCases: "Production application hosting, secure data bucket storage, and load scaling systems.",
      why: "Global infrastructure reliability, robust access control layers, and extensive security tooling."
    },

    // Tools
    { 
      name: "Git", 
      category: "Tools", 
      level: "Expert", 
      icon: <FaGitAlt className="text-orange-600" />, 
      desc: "Branch merge structures, rebase conflicts resolution, stash saves, and clean commit standards.",
      useCases: "Code version tracking, multi-developer collaboration, and branch management.",
      why: "Decentralized control structure keeping code records clean and facilitating code review audits."
    },
    { 
      name: "GitHub", 
      category: "Tools", 
      level: "Expert", 
      icon: <SiGithub className="text-neutral-300" />, 
      desc: "Pull request code reviews, GitHub Actions CI/CD workflows, releases management, and packages storage.",
      useCases: "CI/CD automated testing, team code alignment, and issue ticketing tracks.",
      why: "Centralizes team coordination, automates lint checks, and protects target git branches."
    },
    { 
      name: "VS Code", 
      category: "Tools", 
      level: "Expert", 
      icon: <FaTerminal className="text-sky-500" />, 
      desc: "Custom lint configs, debug processes, workspace formatting, and remote server editing.",
      useCases: "Primary IDE editor, code lint enforcement, and multi-file debugging runs.",
      why: "Lightweight script editor, rich extension support, and integrated terminal controls."
    },
    { 
      name: "Postman", 
      category: "Tools", 
      level: "Expert", 
      icon: <SiPostman className="text-orange-500" />, 
      desc: "API endpoint test scripts, header checks, authentication requests flow, and collection exports.",
      useCases: "API endpoint schema validations, developer documentation, and payload mock tests.",
      why: "Streamlines backend verification and facilitates automated API integration validation reviews."
    }
  ];

  const filteredTech = selectedCategory === "All" 
    ? techStack 
    : techStack.filter(t => t.category === selectedCategory);

  const toggleFlip = (name) => {
    setFlippedCards((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="pt-24 min-h-screen">
      
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Our Stack</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-800 dark:text-white mt-2 mb-6">
            Technologies & Frameworks
          </h1>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-brand-gray leading-relaxed font-sans max-w-xl mx-auto">
            Click on any technology card to view detailed specifications, primary use cases, and our engineering rationale.
          </p>
        </div>
      </section>

      {/* Category selector */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded border transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'gradient-brand text-white border-transparent shadow-md glow-orange/15'
                  : 'bg-white dark:bg-brand-dark-card/60 text-neutral-600 dark:text-brand-gray border-black/5 dark:border-white/5 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Technology Grid */}
      <section className="pb-24 px-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] bottom-10 left-1/2 -translate-x-1/2 pointer-events-none" />
        
        <motion.div 
          layout
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => {
              const isFlipped = !!flippedCards[tech.name];
              return (
                <motion.div
                  layout
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-72 perspective-1000 cursor-pointer select-none"
                  onClick={() => toggleFlip(tech.name)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full relative transform-style-3d"
                  >
                    {/* CARD FRONT SIDE */}
                    <div className="absolute w-full h-full p-6 glassmorphism rounded-xl border border-white/5 flex flex-col justify-between backface-hidden hover:border-brand-orange-mid/20 transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-4">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded bg-white dark:bg-brand-dark-card border border-black/5 dark:border-white/5 flex items-center justify-center text-3xl shadow-sm">
                            {tech.icon}
                          </div>
                          
                          {/* Level Tag */}
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-sans bg-brand-orange-mid/10 border border-brand-orange-mid/20 text-brand-orange-light">
                            {tech.level}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white mb-2">
                          {tech.name}
                        </h3>
                        <p className="text-xs text-neutral-800 dark:text-brand-muted leading-relaxed font-sans">
                          {tech.desc}
                        </p>
                      </div>

                      {/* Footer Category + Flip hint */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest font-mono">
                          {tech.category}
                        </span>
                        <span className="text-[9px] text-brand-orange-light font-bold uppercase tracking-wider animate-pulse">
                          Click to Learn More
                        </span>
                      </div>
                    </div>

                    {/* CARD BACK SIDE */}
                    <div className="absolute w-full h-full p-6 bg-white dark:bg-neutral-900 border border-brand-orange-mid/30 rounded-xl flex flex-col justify-between rotate-y-180 backface-hidden text-neutral-800 dark:text-white shadow-lg shadow-brand-orange-mid/5">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-xl">{tech.icon}</div>
                          <h4 className="font-display font-extrabold text-md text-brand-orange-light">
                            {tech.name} Details
                          </h4>
                        </div>
                        
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-600 dark:text-brand-gray block mb-0.5">Primary Use Case</span>
                          <p className="text-[11px] font-sans leading-relaxed text-neutral-700 dark:text-brand-muted">
                            {tech.useCases}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-600 dark:text-brand-gray block mb-0.5">Why We Choose It</span>
                          <p className="text-[11px] font-sans leading-relaxed text-neutral-700 dark:text-brand-muted">
                            {tech.why}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-auto border-t border-black/5 dark:border-white/5 pt-3">
                        <span className="text-[9px] text-brand-muted uppercase font-bold tracking-widest font-mono">
                          {tech.category}
                        </span>
                        <span className="text-[9px] text-brand-orange-light font-bold uppercase tracking-wider">
                          Click to Flip Back
                        </span>
                      </div>
                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
};

export default Technologies;
