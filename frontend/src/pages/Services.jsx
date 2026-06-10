import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, FaMobileAlt, FaBrain, FaPalette, FaServer, FaDatabase,
  FaCheck, FaArrowRight, FaClock, FaShieldAlt
} from 'react-icons/fa';
import RippleButton from '../components/Button/RippleButton';

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [billingCycle, setBillingCycle] = useState("project"); // "project" or "monthly"

  const serviceDetails = [
    {
      icon: <FaCode />,
      title: "Web Development",
      desc: "Fast, accessible, responsive websites and single-page applications optimized for indexing, user conversion, and search ranking.",
      features: ["React & Next.js architectures", "State management systems", "Responsive grid layouts"],
      benefits: ["Improved loading metrics", "SEO ready markup", "Easy content maintenance"],
      timeline: "2-3 Weeks",
      deliverable: "High-performance SPA, semantic HTML markup, and JSON-LD schemas mapped to your company metadata."
    },
    {
      icon: <FaServer />,
      title: "Software Development",
      desc: "Reliable custom software programs, desktop management systems, automated company utilities, and API pipelines built for efficiency.",
      features: ["Custom data dashboard integrations", "Automation script flows", "Legacy codebase migrations"],
      benefits: ["Removed manual operation errors", "Centralized local databases", "Streamlined team workflows"],
      timeline: "4-6 Weeks",
      deliverable: "Containerized backend application with automated database scheduling, JWT security schemas, and Swagger API documentation."
    },
    {
      icon: <FaBrain />,
      title: "Digital Marketing",
      desc: "Result-oriented online campaigns, brand positioning models, and target audience alignment to drive sales and business growth.",
      features: ["Google Adwords management", "Targeted customer mapping", "Weekly performance analytical reporting"],
      benefits: ["Increased customer acquisition", "Strengthened visual brand identity", "Data-driven advertising budget waste minimization"],
      timeline: "Monthly Cycle",
      deliverable: "Fully set up conversion tracking pixels, custom demographic audience segmentation, and bi-weekly growth auditing."
    },
    {
      icon: <FaDatabase />,
      title: "Search Engine Optimization (SEO)",
      desc: "Deep structure audits, schema additions, copy optimization, and loading speed audits to rank your business first in search engines.",
      features: ["Technical site crawl checks", "High-volume keyword research", "Backlink profile orchestration"],
      benefits: ["Boosted natural organic traffic", "Higher visibility on local search lists", "Optimized mobile indexing compatibility"],
      timeline: "1-2 Weeks",
      deliverable: "Detailed audit logging files, critical rendering path performance optimizations, and site speed upgrade implementation."
    },
    {
      icon: <FaMobileAlt />,
      title: "Social Media Management",
      desc: "Designing creative visual assets and copy for Instagram, YouTube, and corporate channels to grow customer trust.",
      features: ["Instagram profile asset mockups", "YouTube banner graphic content templates", "Engagement tracking and analytics"],
      benefits: ["Constant active brand presence", "Builds trust with target audience", "Increased brand loyalty metrics"],
      timeline: "Weekly Cycle",
      deliverable: "Content strategy matrix, customized graphic vector files, and performance analytics report dashboards."
    },
    {
      icon: <FaPalette />,
      title: "UI/UX Design",
      desc: "Premium squircle layout design systems, interactive client journeys, and Figma wireframes centered on human-computer interaction.",
      features: ["Custom design system wireframing", "Clickable flow wireframes", "Modern color theory alignments"],
      benefits: ["Reduced user bounce rate", "Instant visual brand credibility", "Intuitive navigation pathways"],
      timeline: "1-2 Weeks",
      deliverable: "High fidelity clickable prototypes in Figma, component design kits, and mapped visual branding sheets."
    }
  ];

  const pricingTiers = [
    {
      name: "Starter Package",
      projectPrice: "₹9,999",
      monthlyPrice: "₹2,499",
      periodSuffix: "/mo",
      desc: "Perfect for startups and local businesses needing a fast, professional online presence.",
      features: [
        "Basic Website (up to 5 pages)",
        "Fully Responsive Layout",
        "Standard Contact Form",
        "Essential SEO Setup",
        "1-Week Delivery Support"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Professional Package",
      projectPrice: "₹24,999",
      monthlyPrice: "₹5,999",
      periodSuffix: "/mo",
      desc: "Best for growing companies requiring custom configurations, speed optimization, and ongoing maintenance.",
      features: [
        "Fully Custom Design",
        "High Performance Tuning (90+)",
        "Comprehensive SEO optimization",
        "Advanced UI/UX animations",
        "Analytics Dashboard integration",
        "30-Days Post-launch Support"
      ],
      cta: "Most Popular",
      highlight: true
    },
    {
      name: "Enterprise Package",
      projectPrice: "₹49,999+",
      monthlyPrice: "₹12,499+",
      periodSuffix: "/mo",
      desc: "Tailored for organizations needing full-scale web applications, cloud hosting, and database backends.",
      features: [
        "Full Custom Web Application",
        "Interactive Database integrations",
        "FastAPI Backend & Secure APIs",
        "Docker Containerization",
        "AWS/Cloud deployment setup",
        "Dedicated Engineering Support"
      ],
      cta: "Contact Us",
      highlight: false
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
      <section className="pb-20 px-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-1/3 left-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {serviceDetails.map((service, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                layout="position"
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => toggleExpand(i)}
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: isExpanded ? "0 0 35px rgba(255, 106, 0, 0.2)" : "0 0 20px rgba(255, 106, 0, 0.08)",
                  borderColor: "rgba(255, 106, 0, 0.25)"
                }}
                className={`p-8 glassmorphism rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
                  isExpanded ? 'border-brand-orange-mid/30 shadow-lg glow-orange/15' : 'border-white/5'
                }`}
              >
                <div>
                  {/* Header Icon + Title */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-brand-orange-mid/10 border border-brand-orange-mid/20 flex items-center justify-center text-brand-orange-light text-xl">
                        {service.icon}
                      </div>
                      <h2 className="font-display font-bold text-xl text-neutral-800 dark:text-white">
                        {service.title}
                      </h2>
                    </div>
                    
                    {/* Expand indicator pill */}
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-orange-light px-2 py-1 bg-brand-orange-mid/15 rounded-md">
                      {isExpanded ? 'Click to Collapse' : 'Click to Expand'}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-800 dark:text-brand-gray leading-relaxed mb-6 font-sans">
                    {service.desc}
                  </p>

                  {/* Features & Benefits split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-xs text-neutral-800 dark:text-white font-bold uppercase tracking-wider mb-3">Key Features</h3>
                      <ul className="flex flex-col gap-2">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs">
                            <span className="text-brand-orange-light mt-0.5 shrink-0"><FaCheck size={10} /></span>
                            <span className="text-neutral-800 dark:text-brand-gray font-sans">{feat}</span>
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
                            <span className="text-neutral-800 dark:text-brand-gray font-sans">{bene}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-black/5 dark:border-white/5 pt-4 mt-4 select-text"
                      >
                        <div className="flex flex-col sm:flex-row gap-6 text-xs text-neutral-800 dark:text-brand-muted">
                          <div className="flex items-start gap-2 flex-1">
                            <span className="text-brand-orange-light mt-0.5"><FaClock /></span>
                            <div>
                              <h4 className="font-bold text-neutral-700 dark:text-white uppercase mb-1">Standard Delivery Timeline</h4>
                              <p className="font-sans leading-relaxed">{service.timeline}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2 flex-1">
                            <span className="text-brand-orange-light mt-0.5"><FaShieldAlt /></span>
                            <div>
                              <h4 className="font-bold text-neutral-700 dark:text-white uppercase mb-1">Core Deliverables</h4>
                              <p className="font-sans leading-relaxed">{service.deliverable}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA button wrapper */}
                <div onClick={(e) => e.stopPropagation()} className="mt-6 flex self-start">
                  <RippleButton
                    to="/contact"
                    className="px-5 py-2.5 text-xs font-semibold rounded gradient-brand text-white shadow-xs"
                  >
                    Inquire Service <FaArrowRight size={10} />
                  </RippleButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 border-t border-neutral-200 dark:border-brand-dark-border bg-neutral-50/30 dark:bg-brand-dark-card/10 relative overflow-hidden">
        {/* Decorative lighting elements */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-brand-orange-mid/5 blur-[120px] bottom-0 right-10 pointer-events-none" />
        <div className="absolute w-72 h-72 rounded-full bg-brand-orange-light/5 blur-[90px] top-10 left-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Pricing Models</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-800 dark:text-white mt-2 mb-6">
              Transparent, Professional Tiers
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 dark:text-brand-gray leading-relaxed font-sans max-w-xl mx-auto mb-10">
              Pick a pricing model sized correctly for your business requirements. No hidden maintenance invoices.
            </p>

            {/* Sliding Toggle Animation */}
            <div className="inline-flex items-center gap-4 bg-white/70 dark:bg-brand-dark-card/80 border border-black/5 dark:border-white/5 rounded-full p-1 shadow-sm select-none">
              <button
                onClick={() => setBillingCycle("project")}
                className={`relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                  billingCycle === "project" 
                    ? 'text-white bg-brand-orange-mid shadow-md' 
                    : 'text-neutral-600 hover:text-black dark:text-brand-gray dark:hover:text-white'
                }`}
              >
                Project-Based
              </button>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                  billingCycle === "monthly" 
                    ? 'text-white bg-brand-orange-mid shadow-md' 
                    : 'text-neutral-600 hover:text-black dark:text-brand-gray dark:hover:text-white'
                }`}
              >
                Monthly Retainer
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier) => {
              // Select price depending on toggle state
              const isProject = billingCycle === "project";
              const currentPrice = isProject ? tier.projectPrice : tier.monthlyPrice;
              const period = isProject ? " / project" : tier.periodSuffix;

              const cardContent = (
                <div className={`p-8 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-md transition-colors duration-300 ${
                  tier.highlight 
                    ? 'bg-neutral-900/95 dark:bg-black/90 text-white border-none' 
                    : 'glassmorphism border border-white/5 hover:border-brand-orange-mid/20'
                }`}>
                  
                  {/* Ambient Highlight Overlay */}
                  {tier.highlight && (
                    <div className="absolute w-56 h-56 rounded-full bg-brand-orange-mid/10 blur-3xl -top-12 -right-12 pointer-events-none" />
                  )}

                  {/* Top portion */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h3 className={`font-display font-extrabold text-lg uppercase tracking-wider ${
                        tier.highlight ? 'text-brand-orange-light text-glow-orange' : 'text-neutral-800 dark:text-white'
                      }`}>
                        {tier.name}
                      </h3>
                      
                      {/* Popular Badge */}
                      {tier.highlight && (
                        <span className="text-[10px] uppercase font-bold tracking-wider gradient-brand text-white px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <p className={`text-xs leading-relaxed mb-6 font-sans ${
                      tier.highlight ? 'text-neutral-300' : 'text-neutral-800 dark:text-brand-muted'
                    }`}>
                      {tier.desc}
                    </p>

                    {/* Animated price transition */}
                    <div className="flex items-baseline gap-1 mb-8">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentPrice}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`font-display font-extrabold text-4xl sm:text-5xl ${
                            tier.highlight ? 'text-white' : 'text-neutral-950 dark:text-white'
                          }`}
                        >
                          {currentPrice}
                        </motion.span>
                      </AnimatePresence>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        tier.highlight ? 'text-neutral-400' : 'text-brand-muted'
                      }`}>
                        {period}
                      </span>
                    </div>

                    <div className="w-full h-px bg-black/5 dark:bg-white/10 mb-6" />

                    {/* Features list */}
                    <ul className="flex flex-col gap-4 mb-8">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs font-sans">
                          <span className="text-brand-orange-light mt-0.5 shrink-0"><FaCheck size={11} /></span>
                          <span className={tier.highlight ? 'text-neutral-200' : 'text-neutral-800 dark:text-brand-gray'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTA Button */}
                  <RippleButton
                    to="/contact"
                    className={`w-full py-3.5 rounded text-xs font-bold uppercase tracking-wider text-center shadow-lg transition-all duration-300 gradient-brand text-white hover:brightness-110 ${
                      tier.highlight ? 'glow-orange/20' : 'glow-orange/15'
                    }`}
                  >
                    {tier.cta}
                  </RippleButton>
                </div>
              );

              if (tier.highlight) {
                // Highlighted card receives custom animated gradient border wrapper
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 0 35px rgba(255, 106, 0, 0.35)"
                    }}
                    className="relative p-[1.5px] rounded-2xl animate-gradient-border bg-gradient-to-r from-brand-orange-light via-brand-orange-mid to-brand-orange-dark flex flex-col transition-all duration-300 shadow-xl"
                  >
                    {cardContent}
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 0 30px rgba(255, 106, 0, 0.18)",
                    borderColor: "rgba(255, 106, 0, 0.3)"
                  }}
                  className="flex flex-col transition-all duration-300"
                >
                  {cardContent}
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Services;
