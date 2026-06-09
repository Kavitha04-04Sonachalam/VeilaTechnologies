import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaPaperclip, FaTimes, FaCheckCircle, FaBriefcaseMedical } from 'react-icons/fa';
import axios from 'axios';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeJobId, setActiveJobId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // For application modal
  const [activeFilter, setActiveFilter] = useState("All");
  const filterPills = ["All", "Remote", "Hybrid", "Full-Time", "Contract"];
  
  // Application Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/careers/jobs');
        setJobs(response.data);
      } catch (error) {
        console.warn('Backend API connection failed, using offline jobs fallback.', error);
        setJobs([
          {
            id: 1,
            title: "Senior React Developer",
            location: "Remote (USA / Europe / Asia)",
            experience: "5+ Years",
            employment_type: "Full-Time",
            description: "### Role Overview\nVeila Technologies is looking for a Senior React Developer to join our core product team. You will lead the frontend architecture, designing modular components and implementing interactive, smooth UI/UX with high animation fidelity.\n\n### Requirements\n- Strong experience in React.js, Tailwind CSS, and state management.\n- Hands-on experience with Framer Motion, GSAP, or general animation principles.\n- Familiarity with RESTful APIs, Axios integration, and performance benchmarking."
          },
          {
            id: 2,
            title: "Full Stack Software Engineer",
            location: "Hybrid (New York, NY)",
            experience: "3+ Years",
            employment_type: "Full-Time",
            description: "### Role Overview\nWe are looking for a versatile Full Stack Developer to build high-performance web applications. You will work on both our FastAPI microservices and React dashboards, managing database schemas, integrations, and server deployments.\n\n### Requirements\n- Experience with Python (FastAPI, Flask or Django) and relational databases (PostgreSQL/SQLAlchemy).\n- Experience with React, modern state libraries, and responsive web design.\n- Solid knowledge of containerization (Docker) and Git workflows."
          },
          {
            id: 3,
            title: "DevOps & Security Architect",
            location: "Remote",
            experience: "6+ Years",
            employment_type: "Contract",
            description: "### Role Overview\nManage our scalable cloud deployments, security policies, and continuous integration pipelines. You will orchestrate containerized services and ensure high reliability, fast load speeds, and enterprise security compliance.\n\n### Requirements\n- Deep experience with AWS cloud infrastructure (VPC, EC2, ECS, RDS, S3).\n- Mastery of Docker, CI/CD tools (GitHub Actions, GitLab CI), and Terraform.\n- Strong understanding of web security, SSL, JWT authentication, and DDOS mitigation."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setSubmitError("");
    setFullName("");
    setEmail("");
    setPhone("");
    setCoverLetter("");
    setResumeFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setSubmitError("Please upload your resume file (PDF or Word document).");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setSubmitError("Invalid phone number format. Must be 7 to 15 digits, optionally starting with '+'");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("job_id", selectedJob.id);
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("phone", cleanPhone);
    formData.append("cover_letter", coverLetter);
    formData.append("resume", resumeFile);

    try {
      await axios.post('http://localhost:8000/api/careers/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmitSuccess(true);
      // Clean inputs
      setFullName("");
      setEmail("");
      setPhone("");
      setCoverLetter("");
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      let errorMsg = "Failed to submit application. Please try again later.";
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMsg = err.response.data.detail.map(d => d.msg).join(", ");
        } else {
          errorMsg = err.response.data.detail;
        }
      }
      setSubmitError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Join Us</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-800 dark:text-white mt-2 mb-6">
            Build the Future with Veila
          </h1>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-brand-gray leading-relaxed font-sans max-w-xl mx-auto">
            We are always looking for expert developers, DevOps architects, and UI/UX specialists. Work remote or hybrid on high-scale enterprise contracts.
          </p>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="pb-24 px-6 relative">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] bottom-0 right-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Filter Pills */}
          {!loading && jobs.length > 0 && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8 select-none">
              {filterPills.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setActiveJobId(null); // Collapse open jobs on filter switch
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded border transition-all duration-200 cursor-pointer ${
                    activeFilter === filter
                      ? 'gradient-brand text-white border-transparent shadow-md glow-orange/15'
                      : 'bg-white dark:bg-brand-dark-card/60 text-neutral-600 dark:text-brand-gray border-black/5 dark:border-white/5 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col gap-6">
              {[1, 2].map((n) => (
                <div key={n} className="glassmorphism rounded-xl p-6 border border-white/5 h-32 animate-pulse" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 glassmorphism rounded-2xl border border-white/5 p-8">
              <div className="text-brand-muted text-5xl mb-4 flex justify-center"><FaBriefcaseMedical /></div>
              <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white">No open positions</h3>

              <p className="text-sm text-brand-muted mt-2">We aren't actively hiring for new positions. Check back soon!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {(() => {
                  const filtered = jobs.filter((job) => {
                    if (activeFilter === "All") return true;
                    if (activeFilter === "Remote") return job.location.toLowerCase().includes("remote");
                    if (activeFilter === "Hybrid") return job.location.toLowerCase().includes("hybrid");
                    if (activeFilter === "Full-Time") return job.employment_type === "Full-Time";
                    if (activeFilter === "Contract") return job.employment_type === "Contract";
                    return true;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-12 glassmorphism rounded-2xl border border-white/5 p-8">
                        <div className="text-brand-muted text-4xl mb-3 flex justify-center"><FaBriefcase /></div>
                        <h4 className="font-display font-bold text-md text-neutral-800 dark:text-white">No positions match "{activeFilter}"</h4>
                        <p className="text-xs text-brand-muted mt-1">Try selecting another filter category.</p>
                      </div>
                    );
                  }

                  return filtered.map((job) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      key={job.id} 
                      className="glassmorphism rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-brand-orange-mid/10"
                    >
                      {/* Job Header */}
                      <div 
                        onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
                        className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                      >
                        <div>
                          <h3 className="font-display font-bold text-lg text-neutral-800 dark:text-white hover:text-brand-orange-light transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-neutral-500 dark:text-brand-muted font-medium">
                            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.location}</span>
                            <span className="flex items-center gap-1"><FaBriefcase /> {job.experience}</span>
                            <span className="flex items-center gap-1"><FaClock /> {job.employment_type}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyClick(job);
                          }}
                          className="px-5 py-2 text-xs font-semibold rounded gradient-brand hover:brightness-110 text-white cursor-pointer transition-all duration-200 self-start sm:self-center"
                        >
                          Apply Now
                        </button>
                      </div>

                      {/* Job Description (Expandable) */}
                      <AnimatePresence initial={false}>
                        {activeJobId === job.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-white/5 bg-brand-black/20"
                          >
                            <div className="p-6 text-sm text-neutral-800 dark:text-brand-gray font-sans leading-relaxed flex flex-col gap-4">
                              {/* Parse markdown-like job description splits */}
                              {job.description.split('\n\n').map((para, pIdx) => {
                                if (para.startsWith('### ')) {
                                  return <h4 key={pIdx} className="font-display font-bold text-neutral-800 dark:text-white text-sm uppercase mt-4 mb-1">{para.replace('### ', '')}</h4>;
                                }
                                if (para.startsWith('- ')) {
                                  return (
                                    <ul key={pIdx} className="list-disc pl-5 flex flex-col gap-1.5">
                                      {para.split('\n').map((li, lIdx) => (
                                        <li key={lIdx}>{li.replace('- ', '')}</li>
                                      ))}
                                    </ul>
                                  );
                                }
                                return <p key={pIdx}>{para}</p>;
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ));
                })()}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl bg-white dark:bg-brand-dark-card border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col max-h-[90vh] relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-500 hover:text-black dark:text-brand-muted dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close form modal"
              >
                <FaTimes size={14} />
              </button>

              <h3 className="font-display font-bold text-xl text-neutral-800 dark:text-white mb-1">
                Apply for Position
              </h3>
              <p className="text-xs text-brand-orange-light font-semibold mb-6">
                {selectedJob.title}
              </p>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                  <div className="text-brand-orange-light text-5xl animate-bounce"><FaCheckCircle /></div>
                  <h4 className="font-display font-bold text-lg text-neutral-800 dark:text-white">Application Received!</h4>
                  <p className="text-sm text-neutral-600 dark:text-brand-muted max-w-sm">
                    Thank you for applying. Our engineering recruitment team will review your credentials and contact you within 3 business days.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="mt-6 px-6 py-2 text-xs font-semibold rounded gradient-brand text-white cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 overflow-y-auto pr-1 select-text">
                  
                  {submitError && (
                    <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-300 rounded font-medium">
                      {submitError}
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-700 dark:text-brand-muted font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                      placeholder="Jane Doe"
                    />
                  </div>

                  {/* Email & Phone split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-700 dark:text-brand-muted font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-700 dark:text-brand-muted font-semibold">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-700 dark:text-brand-muted font-semibold">Resume / CV (PDF or DOCX) *</label>
                    <div className="relative border border-dashed border-neutral-300 dark:border-white/10 hover:border-brand-orange-mid/30 rounded p-6 text-center bg-neutral-50 dark:bg-brand-black cursor-pointer transition-colors duration-200">
                      <input
                        type="file"
                        required
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-brand-orange-light text-xl"><FaPaperclip /></span>
                        <span className="text-xs text-neutral-600 dark:text-brand-gray font-medium">
                          {resumeFile ? resumeFile.name : "Click to select or drag file here"}
                        </span>
                        <span className="text-[10px] text-neutral-500 dark:text-brand-muted">Max file size: 5MB</span>
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-700 dark:text-brand-muted font-semibold">Cover Letter</label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white resize-none"
                      placeholder="Tell us why you are a fit for this position..."
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 py-3 rounded text-sm font-semibold gradient-brand hover:brightness-110 text-white cursor-pointer disabled:opacity-50 transition-all duration-200"
                  >
                    {submitting ? "Submitting Application..." : "Submit Application"}
                  </button>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Careers;
