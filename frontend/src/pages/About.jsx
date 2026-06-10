import { motion } from 'framer-motion';
import { FaLightbulb, FaShieldAlt, FaRocket, FaHandsHelping, FaAward } from 'react-icons/fa';

const About = () => {
  const team = [
    { name: "Victoria Sterling", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
    { name: "Eric Chen", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
    { name: "Amelia Vance", role: "VP of Engineering", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" },
    { name: "David Miller", role: "Director of UX Architecture", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" }
  ];

  const timeline = [
    { year: "2026", title: "Official Foundation", desc: "Veila Technologies was established in Virudhunagar, Tamilnadu, with a core mission to merge design, technology, and strategy." },
    { year: "2026", title: "Digital Service Deployment", desc: "Launched expert web development, custom software engineering, result-oriented SEO audits, and marketing workflows." },
    { year: "2027", title: "Expansion & Scaling", desc: "Scaling operations globally to deliver creative, result-oriented digital solutions that create real value for our business clients." }
  ];

  const coreValues = [
    { icon: <FaLightbulb />, title: "Innovation", desc: "Constantly researching modern tech frameworks to keep our clients ahead of the technology curve." },
    { icon: <FaShieldAlt />, title: "Integrity", desc: "Honest feedback, transparent cost breakdowns, secure code structures, and strict client NDA compliance." },
    { icon: <FaAward />, title: "Excellence", desc: "We don't build minimum viable prototypes; we deliver fully optimized, tested, production-ready systems." },
    { icon: <FaHandsHelping />, title: "Collaboration", desc: "Working closely with product leads, developers, and designers to ensure exact requirements alignment." }
  ];

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-24 min-h-screen">
      
      {/* Story Section */}
      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Our Story</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-800 dark:text-white mt-2 mb-6 leading-tight">
              Transforming Ideas Into Digital Reality
            </h1>
            <p className="text-sm sm:text-base text-neutral-800 dark:text-brand-gray mb-4 leading-relaxed font-sans">
              Veila Technologies is a technology-driven company focused on helping businesses grow through innovative digital solutions. We specialize in web development, software development, digital marketing, SEO, and social media management.
            </p>
            <p className="text-sm sm:text-base text-neutral-750 dark:text-brand-muted leading-relaxed font-sans">
              Our goal is to provide reliable, creative, and result-oriented services that help businesses establish a strong online presence and achieve their growth objectives. At Veila Technologies, we believe in combining technology, creativity, and strategy to deliver solutions that create real value for our clients.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative h-[350px] rounded-2xl overflow-hidden border border-white/5 select-none"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
              alt="Team working" 
              className="w-full h-full object-cover filter brightness-95" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/90 via-transparent to-transparent" />
            
            {/* Stats Overlay */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-6 left-6 p-4 glassmorphism rounded-xl border border-white/5 shadow-lg"
            >
              <span className="text-2xl font-extrabold text-brand-orange-light block font-display">100%</span>
              <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">Client Satisfaction Rate</span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-neutral-50 dark:bg-brand-dark-card/20 border-y border-neutral-200 dark:border-brand-dark-border relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        >
          <motion.div variants={fadeInUp} className="p-8 glassmorphism rounded-2xl border border-white/5 hover:border-brand-orange-mid/10 transition-colors duration-300">
            <h3 className="font-display font-bold text-xl text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-brand-orange-light"><FaRocket size={18} /></span> Our Mission
            </h3>
            <p className="text-sm text-neutral-800 dark:text-brand-gray leading-relaxed font-sans">
              To deliver premium software architecture that solves real operational bottlenecks, simplifies user tasks, and builds long-term technical value for our corporate partners.
            </p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="p-8 glassmorphism rounded-2xl border border-white/5 hover:border-brand-orange-mid/10 transition-colors duration-300">
            <h3 className="font-display font-bold text-xl text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-brand-orange-light"><FaLightbulb size={18} /></span> Our Vision
            </h3>
            <p className="text-sm text-neutral-800 dark:text-brand-gray leading-relaxed font-sans">
              To establish Veila Technologies as the global standard for custom digital development, recognized for our pristine engineering, modern aesthetics, and client-centric relationship models.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Ethics</span>
            <h2 className="font-display font-extrabold text-3xl text-neutral-800 dark:text-white mt-2 mb-4">
              Our Core Values
            </h2>
            <div className="w-12 h-1 bg-brand-orange-mid mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value) => (
              <motion.div 
                key={value.title} 
                variants={fadeInUp}
                whileHover={{ 
                  y: -6,
                  boxShadow: "0 0 20px rgba(255, 106, 0, 0.1)",
                  borderColor: "rgba(255, 106, 0, 0.25)"
                }}
                className="p-6 rounded-xl glassmorphism hover:glassmorphism-hover border border-white/5 transition-all duration-300 select-none"
              >
                <div className="text-brand-orange-light text-2xl mb-4">{value.icon}</div>
                <h3 className="font-display font-bold text-base text-neutral-800 dark:text-white mb-2">{value.title}</h3>
                <p className="text-xs text-neutral-800 dark:text-brand-muted leading-relaxed font-sans">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-neutral-50/50 dark:bg-brand-dark-card/20 border-y border-neutral-200 dark:border-brand-dark-border">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">History</span>
            <h2 className="font-display font-extrabold text-3xl text-neutral-800 dark:text-white mt-2 mb-4">
              Company Journey Timeline
            </h2>
          </motion.div>

          <div className="relative border-l-2 border-neutral-200 dark:border-brand-dark-border pl-6 ml-4 flex flex-col gap-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-white dark:bg-brand-black border-2 border-brand-orange-mid shadow" />
                
                <span className="font-mono text-sm font-extrabold text-brand-orange-light block mb-1">
                  {item.year}
                </span>
                <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-800 dark:text-brand-gray leading-relaxed max-w-2xl font-sans">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Leadership</span>
            <h2 className="font-display font-extrabold text-3xl text-neutral-800 dark:text-white mt-2 mb-4">
              Meet Our Experts
            </h2>
            <div className="w-12 h-1 bg-brand-orange-mid mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ 
                  y: -6,
                  boxShadow: "0 0 25px rgba(255, 106, 0, 0.12)",
                  borderColor: "rgba(255, 106, 0, 0.25)"
                }}
                className="glassmorphism rounded-xl border border-white/5 overflow-hidden flex flex-col items-center text-center group transition-all duration-300 cursor-pointer"
              >
                <div className="w-full h-64 overflow-hidden bg-brand-dark-border select-none relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-base text-neutral-800 dark:text-white mb-1 group-hover:text-brand-orange-light transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs text-neutral-500 dark:text-brand-muted font-semibold font-sans">
                    {member.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
