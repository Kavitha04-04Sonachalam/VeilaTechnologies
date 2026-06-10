import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const getProjectLink = (url) => {
    if (!url) return '#';
    if (url.includes('veila.tech') || url.includes('github.com/veila-tech')) {
      return '/placeholder.html';
    }
    return url;
  };

  const filterTags = ["All", "React", "FastAPI", "PostgreSQL", "Cloud", "AWS", "Docker"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.warn('Backend API connection failed, using offline fallback.', error);
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
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedTag === "All"
    ? projects
    : projects.filter((p) => p.tech_stack.toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <div className="pt-24 min-h-screen">
      
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Showcase</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-800 dark:text-white mt-2 mb-6">
            Featured Projects & Portfolio
          </h1>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-brand-gray leading-relaxed font-sans max-w-xl mx-auto">
            Review our portfolio of recent project completions, backend microservices, and interactive frontend dashboards.
          </p>
        </div>
      </section>

      {/* Filter Selector */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-xs font-semibold rounded border transition-all duration-200 cursor-pointer ${
                selectedTag === tag
                  ? 'gradient-brand text-white border-transparent shadow-md glow-orange/15'
                  : 'bg-white dark:bg-brand-dark-card/60 text-neutral-600 dark:text-brand-gray border-black/5 dark:border-white/5 hover:text-black dark:hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6 relative">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-20 left-10 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          {loading ? (
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
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 glassmorphism rounded-2xl border border-white/5 p-8">
              <div className="text-brand-muted text-5xl mb-4 flex justify-center"><FaFolderOpen /></div>
              <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white">No projects found</h3>

              <p className="text-sm text-brand-muted mt-2">No projects matching tech tag "{selectedTag}" are registered.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((proj) => (
                  <motion.div
                    layout
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedProject(proj)}
                    className="glassmorphism rounded-xl border border-white/5 overflow-hidden flex flex-col h-full hover:border-brand-orange-mid/20 transition-all duration-300 cursor-pointer select-none"
                  >
                    <div className="relative h-48 overflow-hidden bg-brand-dark-border select-none">
                      <img 
                        src={proj.image_url.includes("?") ? `${proj.image_url}&fm=webp` : proj.image_url} 
                        alt={proj.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow select-text">
                      <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white mb-2">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-neutral-800 dark:text-brand-muted line-clamp-4 leading-relaxed mb-5">
                        {proj.description}
                      </p>
                      
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.tech_stack.split(',').map((tech) => (
                          <span 
                            key={tech.trim()} 
                            className="px-2.5 py-0.5 text-[10px] font-semibold bg-neutral-100 dark:bg-brand-dark-border/60 text-neutral-700 dark:text-brand-gray rounded border border-black/5 dark:border-white/5"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex gap-6 mt-auto text-xs font-semibold uppercase tracking-widest select-none">
                        {proj.live_url && (
                          <a 
                            href={getProjectLink(proj.live_url)} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-brand-orange-mid hover:text-neutral-900 dark:text-brand-orange-light dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            Live Demo <FaExternalLinkAlt size={10} />
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
                            GitHub <FaGithub size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Project Coming Soon Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-white dark:bg-brand-dark-card border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col relative select-text"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-500 hover:text-black dark:text-brand-muted dark:hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close modal"
              >
                <FaTimes size={14} />
              </button>

              <div className="flex flex-col gap-6 text-center">
                {/* Image */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-brand-dark-border select-none">
                  <img 
                    src={selectedProject.image_url.includes("?") ? `${selectedProject.image_url}&fm=webp` : selectedProject.image_url} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-display font-extrabold text-xl text-white text-left">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Coming Soon Notice */}
                <div className="py-2">
                  <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase mb-2 block">Coming Soon</span>
                  <h4 className="font-display font-extrabold text-2xl text-neutral-800 dark:text-white mb-3">
                    Case Study Coming Soon!
                  </h4>
                  <p className="text-sm text-neutral-800 dark:text-brand-gray leading-relaxed font-sans max-w-sm mx-auto">
                    We'll showcase this project in detail shortly.
                  </p>
                </div>

                {/* Action button to close */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-3 rounded text-sm font-semibold gradient-brand hover:brightness-110 text-white cursor-pointer transition-all duration-200"
                >
                  Close Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Portfolio;
