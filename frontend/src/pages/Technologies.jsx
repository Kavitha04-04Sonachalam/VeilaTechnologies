import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  const techStack = [
    // Frontend
    { name: "React", category: "Frontend", level: "Expert", icon: <FaReact className="text-sky-400" />, desc: "Used for SPA scaling, design systems, and client interfaces." },
    { name: "JavaScript", category: "Frontend", level: "Expert", icon: <FaJsSquare className="text-yellow-400" />, desc: "ES6+ asynchronous functions, event loop handling, and DOM operations." },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert", icon: <SiTailwindcss className="text-teal-400" />, desc: "Utility-first design configurations, custom theme overrides, and animation overlays." },
    { name: "HTML5", category: "Frontend", level: "Expert", icon: <FaHtml5 className="text-orange-500" />, desc: "Semantic site structure, SEO-optimized element layout, and browser compliance." },
    { name: "CSS3", category: "Frontend", level: "Expert", icon: <FaCss3Alt className="text-blue-500" />, desc: "Custom grid systems, flex overlays, transitions, variables, and responsive viewports." },
    
    // Backend
    { name: "Python", category: "Backend", level: "Expert", icon: <FaPython className="text-yellow-500" />, desc: "Asynchronous task scaling, system administration scripting, and machine learning structures." },
    { name: "FastAPI", category: "Backend", level: "Expert", icon: <SiFastapi className="text-emerald-400" />, desc: "High-performance async routing, Pydantic type integrations, and automatic OpenAPI schema builders." },
    { name: "Nginx", category: "Backend", level: "Intermediate", icon: <SiNginx className="text-emerald-600" />, desc: "Reverse proxy configurations, SSL handshake security management, and static load distribution." },

    // Database
    { name: "PostgreSQL", category: "Database", level: "Expert", icon: <SiPostgresql className="text-blue-400" />, desc: "Relational table indices, connection pooling setups, complex query optimization, and UUID primary keys." },
    { name: "SQLite", category: "Database", level: "Expert", icon: <SiSqlite className="text-sky-600" />, desc: "In-memory database fallbacks, local client mock configurations, and isolated automated unit test spaces." },

    // DevOps
    { name: "Docker", category: "DevOps", level: "Expert", icon: <FaDocker className="text-sky-500" />, desc: "Multi-stage project containerization, Docker Compose staging configurations, and microservice isolation." },
    { name: "Kubernetes", category: "DevOps", level: "Intermediate", icon: <SiKubernetes className="text-blue-500" />, desc: "Autoscaling container clusters, resource limits management, ingress routers, and rolling updates." },
    { name: "Terraform", category: "DevOps", level: "Intermediate", icon: <SiTerraform className="text-indigo-400" />, desc: "Infrastructure as Code (IaC) configuration for reproducible cloud setups and security groups." },

    // Cloud
    { name: "AWS", category: "Cloud", level: "Expert", icon: <FaAws className="text-orange-400" />, desc: "EC2 instances, VPC private subnetting, RDS cluster configs, S3 bucket storage, and IAM rights policies." },

    // Tools
    { name: "Git", category: "Tools", level: "Expert", icon: <FaGitAlt className="text-orange-600" />, desc: "Branch merge structures, rebase conflicts resolution, stash saves, and clean commit standards." },
    { name: "GitHub", category: "Tools", level: "Expert", icon: <SiGithub className="text-neutral-300" />, desc: "Pull request code reviews, GitHub Actions CI/CD workflows, releases management, and packages storage." },
    { name: "VS Code", category: "Tools", level: "Expert", icon: <FaTerminal className="text-sky-500" />, desc: "Custom lint configs, debug processes, workspace formatting, and remote server editing." },


    { name: "Postman", category: "Tools", level: "Expert", icon: <SiPostman className="text-orange-500" />, desc: "API endpoint test scripts, header checks, authentication requests flow, and collection exports." }
  ];

  const filteredTech = selectedCategory === "All" 
    ? techStack 
    : techStack.filter(t => t.category === selectedCategory);

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
            Explore the frontend, backend, database, DevOps, and cloud technologies we utilize to build scalable enterprise-grade applications.
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
      <section className="pb-24 px-6 relative">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] bottom-10 left-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredTech.map((tech) => (
            <motion.div
              layout
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 0 20px rgba(255, 106, 0, 0.15)",
                borderColor: "rgba(255, 106, 0, 0.2)"
              }}
              className="p-6 glassmorphism rounded-xl border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded bg-brand-dark-card border border-white/5 flex items-center justify-center text-3xl">
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
                <p className="text-xs text-neutral-800 dark:text-brand-muted leading-relaxed font-sans mb-4">
                  {tech.desc}
                </p>
              </div>

              {/* Category label */}
              <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest font-mono mt-auto block">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Technologies;
