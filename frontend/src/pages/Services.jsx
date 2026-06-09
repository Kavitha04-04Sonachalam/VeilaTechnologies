import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCode, FaMobileAlt, FaBrain, FaCloud, FaPalette, FaServer, FaCogs, FaDatabase,
  FaCheck, FaArrowRight
} from 'react-icons/fa';

const Services = () => {
  const serviceDetails = [
    {
      icon: <FaCode />,
      title: "Web Development",
      desc: "Fast, accessible, responsive websites and single-page applications optimized for indexing, user conversion, and search ranking.",
      features: ["React & Next.js architectures", "State management systems", "Responsive grid layouts"],
      benefits: ["Improved loading metrics", "SEO ready markup", "Easy content maintenance"],
    },
    {
      icon: <FaServer />,
      title: "Software Development",
      desc: "Reliable custom software programs, desktop management systems, automated company utilities, and API pipelines built for efficiency.",
      features: ["Custom data dashboard integrations", "Automation script flows", "Legacy codebase migrations"],
      benefits: ["Removed manual operation errors", "Centralized local databases", "Streamlined team workflows"],
    },
    {
      icon: <FaBrain />,
      title: "Digital Marketing",
      desc: "Result-oriented online campaigns, brand positioning models, and target audience alignment to drive sales and business growth.",
      features: ["Google Adwords management", "Targeted customer mapping", "Weekly performance analytical reporting"],
      benefits: ["Increased customer acquisition", "Strengthened visual brand identity", "Data-driven advertising budget waste minimization"],
    },
    {
      icon: <FaDatabase />,
      title: "Search Engine Optimization (SEO)",
      desc: "Deep structure audits, schema additions, copy optimization, and loading speed audits to rank your business first in search engines.",
      features: ["Technical site crawl checks", "High-volume keyword research", "Backlink profile orchestration"],
      benefits: ["Boosted natural organic traffic", "Higher visibility on local search lists", "Optimized mobile indexing compatibility"],
    },
    {
      icon: <FaMobileAlt />,
      title: "Social Media Management",
      desc: "Designing creative visual assets and copy for Instagram, YouTube, and corporate channels to grow customer trust.",
      features: ["Instagram profile asset mockups", "YouTube banner graphic content templates", "Engagement tracking and analytics"],
      benefits: ["Constant active brand presence", "Builds trust with target audience", "Increased brand loyalty metrics"],
    },
    {
      icon: <FaPalette />,
      title: "UI/UX Design",
      desc: "Premium squircle layout design systems, interactive client journeys, and Figma wireframes centered on human-computer interaction.",
      features: ["Custom design system wireframing", "Clickable flow wireframes", "Modern color theory alignments"],
      benefits: ["Reduced user bounce rate", "Instant visual brand credibility", "Intuitive navigation pathways"],
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Expertise</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-800 dark:text-white mt-2 mb-6">
            Services Custom-Tailored for Success
          </h1>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-brand-gray leading-relaxed font-sans max-w-2xl mx-auto">
            Veila Technologies combines modern engineering frameworks, responsive styling, and robust database layers to build systems that solve core operations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 px-6 relative">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-1/3 left-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {serviceDetails.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="p-8 glassmorphism rounded-2xl border border-white/5 hover:border-brand-orange-mid/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded bg-brand-orange-mid/10 border border-brand-orange-mid/20 flex items-center justify-center text-brand-orange-light text-xl">
                    {service.icon}
                  </div>
                  <h2 className="font-display font-bold text-xl text-neutral-800 dark:text-white">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm text-neutral-800 dark:text-brand-gray leading-relaxed mb-6 font-sans">
                  {service.desc}
                </p>

                {/* Features & Benefits split */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xs text-neutral-800 dark:text-white font-bold uppercase tracking-wider mb-3">Key Features</h3>
                    <ul className="flex flex-col gap-2">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs">
                          <span className="text-brand-orange-light mt-0.5 shrink-0"><FaCheck size={10} /></span>
                          <span className="text-neutral-800 dark:text-brand-gray">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs text-neutral-800 dark:text-white font-bold uppercase tracking-wider mb-3">Business Benefits</h3>
                    <ul className="flex flex-col gap-2">
                      {service.benefits.map((bene) => (
                        <li key={bene} className="flex items-start gap-2 text-xs">
                          <span className="text-brand-orange-light mt-0.5 shrink-0"><FaCheck size={10} /></span>
                          <span className="text-neutral-800 dark:text-brand-gray">{bene}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <Link
                to="/contact"
                className="w-full sm:w-auto self-start mt-4 px-5 py-2.5 text-xs font-semibold rounded gradient-brand hover:brightness-110 text-white shadow-xs glow-orange/15 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Inquire Service <FaArrowRight size={10} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Services;
