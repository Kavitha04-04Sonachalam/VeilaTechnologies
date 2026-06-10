import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLock, FaUser, FaChartBar, FaBriefcase, FaFolder, FaEnvelope, FaSignOutAlt, 
  FaPlus, FaEdit, FaTrash, FaDownload, FaEye, FaTimes, FaGlobe, FaGithub 
} from 'react-icons/fa';
import axios from 'axios';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('veila_admin_token') || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState("Analytics");
  const [stats, setStats] = useState({ total_contacts: 0, total_applications: 0, total_projects: 0, total_jobs: 0 });
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  const [loadingStats, setLoadingStats] = useState(true);
  
  // CRUD Modals
  const [projectModal, setProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // If null, creating new
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projImage, setProjImage] = useState("");
  const [projTech, setProjTech] = useState("");
  const [projGithub, setProjGithub] = useState("");
  const [projLive, setProjLive] = useState("");

  const [jobModal, setJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // If null, creating new
  const [jobTitle, setJobTitle] = useState("");
  const [jobLoc, setJobLoc] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [jobDesc, setJobDesc] = useState("");

  const API_BASE = "http://localhost:8000/api";

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Fetch metrics when token changes
  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    setLoadingStats(true);
    try {
      // Fetch stats
      const statsRes = await axios.get(`${API_BASE}/admin/stats`, axiosConfig);
      setStats(statsRes.data);

      // Fetch contacts
      const contactsRes = await axios.get(`${API_BASE}/admin/contacts`, axiosConfig);
      setContacts(contactsRes.data);

      // Fetch applications
      const appsRes = await axios.get(`${API_BASE}/admin/applications`, axiosConfig);
      setApplications(appsRes.data);

      // Fetch projects
      const projRes = await axios.get(`${API_BASE}/projects`);
      setProjects(projRes.data);

      // Fetch jobs
      const jobsRes = await axios.get(`${API_BASE}/careers/jobs`);
      setJobs(jobsRes.data);
    } catch (err) {
      console.error("Failed to load admin dashboard data", err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    // OAuth2 password requests send urlencoded form data
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await axios.post(`${API_BASE}/admin/login`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      const newToken = response.data.access_token;
      localStorage.setItem('veila_admin_token', newToken);
      setToken(newToken);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setLoginError(err.response?.data?.detail || "Invalid admin credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('veila_admin_token');
    setToken("");
  };

  // CRUD actions for Projects
  const handleOpenProjectModal = (proj = null) => {
    setSelectedProject(proj);
    if (proj) {
      setProjTitle(proj.title);
      setProjDesc(proj.description);
      setProjImage(proj.image_url || "");
      setProjTech(proj.tech_stack);
      setProjGithub(proj.github_url || "");
      setProjLive(proj.live_url || "");
    } else {
      setProjTitle("");
      setProjDesc("");
      setProjImage("");
      setProjTech("");
      setProjGithub("");
      setProjLive("");
    }
    setProjectModal(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: projTitle,
      description: projDesc,
      image_url: projImage || null,
      tech_stack: projTech,
      github_url: projGithub || null,
      live_url: projLive || null
    };

    try {
      if (selectedProject) {
        // Edit
        await axios.put(`${API_BASE}/projects/${selectedProject.id}`, payload, axiosConfig);
      } else {
        // Create
        await axios.post(`${API_BASE}/projects`, payload, axiosConfig);
      }
      setProjectModal(false);
      fetchDashboardData();
    } catch (err) {
      alert("Failed to save project. Verify your login status.");
    }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API_BASE}/projects/${id}`, axiosConfig);
      fetchDashboardData();
    } catch (err) {
      alert("Failed to delete project.");
    }
  };

  // CRUD actions for Jobs
  const handleOpenJobModal = (job = null) => {
    setSelectedJob(job);
    if (job) {
      setJobTitle(job.title);
      setJobLoc(job.location);
      setJobExp(job.experience);
      setJobType(job.employment_type);
      setJobDesc(job.description);
    } else {
      setJobTitle("");
      setJobLoc("");
      setJobExp("");
      setJobType("Full-Time");
      setJobDesc("");
    }
    setJobModal(true);
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: jobTitle,
      location: jobLoc,
      experience: jobExp,
      employment_type: jobType,
      description: jobDesc
    };

    try {
      if (selectedJob) {
        // Edit
        await axios.put(`${API_BASE}/jobs/${selectedJob.id}`, payload, axiosConfig);
      } else {
        // Create
        await axios.post(`${API_BASE}/jobs`, payload, axiosConfig);
      }
      setJobModal(false);
      fetchDashboardData();
    } catch (err) {
      alert("Failed to save job position.");
    }
  };

  const handleJobDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job Listing? (This will also delete linked candidate applications)")) return;
    try {
      await axios.delete(`${API_BASE}/jobs/${id}`, axiosConfig);
      fetchDashboardData();
    } catch (err) {
      alert("Failed to delete job.");
    }
  };

  // Download resume path
  const getResumeUrl = (path) => {
    // Backend static mount serves uploads folder on port 8000
    // The path saved in DB is usually 'uploads/unique_filename.pdf'
    // So URL: http://localhost:8000/uploads/unique_filename.pdf
    const filename = path.split('/').pop();
    return `http://localhost:8000/uploads/${filename}`;
  };

  // Login Screen Render
  if (!token) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-grid-pattern px-6 select-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-md w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 glassmorphism rounded-2xl border border-white/5"
          >
            <div className="flex flex-col items-center text-center gap-4 mb-6">
              <img src="/logo.png" alt="Veila logo" className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(255,106,0,0.3)]" />
              <div>
                <h1 className="font-display font-bold text-xl text-white">Veila Security Gateway</h1>
                <span className="text-[10px] text-brand-orange-light font-sans font-bold uppercase tracking-wider">Administrative Authentication Required</span>
              </div>
            </div>

            {loginError && (
              <div className="p-3 mb-4 text-xs bg-red-950/40 border border-red-500/30 text-red-300 rounded font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4 select-text">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted font-semibold flex items-center gap-1.5"><FaUser size={10} /> Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white"
                  placeholder="admin"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted font-semibold flex items-center gap-1.5"><FaLock size={10} /> Security Code</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white"
                  placeholder="••••••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-4 py-3 rounded text-sm font-semibold gradient-brand hover:brightness-110 text-white cursor-pointer disabled:opacity-50 transition-all duration-200"
              >
                {loginLoading ? "Authorizing Gateway..." : "Access Dashboard"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: "Analytics", icon: <FaChartBar /> },
    { name: "Projects", icon: <FaFolder /> },
    { name: "Jobs", icon: <FaBriefcase /> },
    { name: "Contacts", icon: <FaEnvelope /> },
    { name: "Applications", icon: <FaUser /> }
  ];

  return (
    <div className="pt-24 min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-white flex items-center gap-2">
              Veila Admin Control Panel
            </h1>
            <span className="text-xs text-brand-orange-light font-semibold uppercase tracking-wider font-sans">
              System Console Online
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-semibold rounded border border-white/10 bg-brand-dark-card hover:bg-brand-dark-hover text-brand-gray hover:text-white transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center"
          >
            <FaSignOutAlt /> Terminate Session
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-brand-dark-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2.5 text-xs font-semibold rounded border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === tab.name
                  ? 'gradient-brand text-white border-transparent shadow'
                  : 'bg-brand-dark-card/60 text-brand-gray border-white/5 hover:text-white'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        {/* Loading Indicator */}
        {loadingStats ? (
          <div className="text-center py-20 animate-pulse text-brand-orange-light text-sm font-semibold font-mono">
            FETCHING SYSTEM DATA PIPELINES...
          </div>
        ) : (
          <div className="select-text">
            
            {/* 1. TAB CONTENT: ANALYTICS */}
            {activeTab === "Analytics" && (
              <div className="flex flex-col gap-8">
                {/* Stats Counters Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="p-4 sm:p-6 rounded-2xl glassmorphism border border-white/5 flex flex-col gap-2 relative overflow-hidden">
                    <span className="text-xs text-brand-muted uppercase font-bold tracking-widest block">Contacts</span>
                    <span className="font-display font-extrabold text-3xl text-white">{stats.total_contacts}</span>
                    <FaEnvelope className="absolute right-4 bottom-4 text-brand-orange-mid/10 text-4xl" />
                  </div>
                  <div className="p-4 sm:p-6 rounded-2xl glassmorphism border border-white/5 flex flex-col gap-2 relative overflow-hidden">
                    <span className="text-xs text-brand-muted uppercase font-bold tracking-widest block">Applications</span>
                    <span className="font-display font-extrabold text-3xl text-white">{stats.total_applications}</span>
                    <FaUser className="absolute right-4 bottom-4 text-brand-orange-mid/10 text-4xl" />
                  </div>
                  <div className="p-4 sm:p-6 rounded-2xl glassmorphism border border-white/5 flex flex-col gap-2 relative overflow-hidden">
                    <span className="text-xs text-brand-muted uppercase font-bold tracking-widest block">Projects</span>
                    <span className="font-display font-extrabold text-3xl text-white">{stats.total_projects}</span>
                    <FaFolder className="absolute right-4 bottom-4 text-brand-orange-mid/10 text-4xl" />
                  </div>
                  <div className="p-4 sm:p-6 rounded-2xl glassmorphism border border-white/5 flex flex-col gap-2 relative overflow-hidden">
                    <span className="text-xs text-brand-muted uppercase font-bold tracking-widest block">Job Positions</span>
                    <span className="font-display font-extrabold text-3xl text-white">{stats.total_jobs}</span>
                    <FaBriefcase className="absolute right-4 bottom-4 text-brand-orange-mid/10 text-4xl" />
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-8 rounded-2xl glassmorphism border border-white/5 flex flex-col gap-4">
                  <h3 className="font-display font-bold text-lg text-white">Console System Overview</h3>
                  <p className="text-sm text-brand-gray leading-relaxed font-sans max-w-3xl">
                    This admin dashboard handles the backend database models stored on your PostgreSQL (or SQLite local fallback) instance. You can modify job listings, upload projects, and review incoming sales contact request and resumes.
                  </p>
                </div>
              </div>
            )}

            {/* 2. TAB CONTENT: PROJECTS */}
            {activeTab === "Projects" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg text-white">Project Showcase Database</h2>
                  <button
                    onClick={() => handleOpenProjectModal()}
                    className="px-4 py-2 text-xs font-semibold rounded gradient-brand text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaPlus size={10} /> Add Project
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-brand-dark-card text-brand-muted uppercase font-bold text-[10px] tracking-wider border-b border-white/5">
                        <th className="p-4">Title</th>
                        <th className="p-4">Tech Stack</th>
                        <th className="p-4">Links</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-brand-dark-card/30">
                          <td className="p-4 font-semibold text-white">{proj.title}</td>
                          <td className="p-4 text-brand-gray max-w-xs truncate">{proj.tech_stack}</td>
                          <td className="p-4 flex gap-3 text-brand-muted">
                            {proj.live_url && <a href={proj.live_url} target="_blank" rel="noreferrer" className="hover:text-white"><FaGlobe /></a>}
                            {proj.github_url && <a href={proj.github_url} target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleOpenProjectModal(proj)} className="p-2 rounded bg-white/5 hover:bg-brand-orange-mid/15 text-brand-gray hover:text-brand-orange-light transition-all cursor-pointer"><FaEdit size={12} /></button>
                              <button onClick={() => handleProjectDelete(proj.id)} className="p-2 rounded bg-white/5 hover:bg-red-500/15 text-brand-gray hover:text-red-400 transition-all cursor-pointer"><FaTrash size={12} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. TAB CONTENT: JOBS */}
            {activeTab === "Jobs" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg text-white">Careers Job Openings</h2>
                  <button
                    onClick={() => handleOpenJobModal()}
                    className="px-4 py-2 text-xs font-semibold rounded gradient-brand text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaPlus size={10} /> Add Job listing
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-brand-dark-card text-brand-muted uppercase font-bold text-[10px] tracking-wider border-b border-white/5">
                        <th className="p-4">Position</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Experience</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-brand-dark-card/30">
                          <td className="p-4 font-semibold text-white">{job.title}</td>
                          <td className="p-4 text-brand-gray">{job.location}</td>
                          <td className="p-4 text-brand-orange-light font-semibold">{job.employment_type}</td>
                          <td className="p-4 text-brand-gray">{job.experience}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleOpenJobModal(job)} className="p-2 rounded bg-white/5 hover:bg-brand-orange-mid/15 text-brand-gray hover:text-brand-orange-light transition-all cursor-pointer"><FaEdit size={12} /></button>
                              <button onClick={() => handleJobDelete(job.id)} className="p-2 rounded bg-white/5 hover:bg-red-500/15 text-brand-gray hover:text-red-400 transition-all cursor-pointer"><FaTrash size={12} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. TAB CONTENT: CONTACTS */}
            {activeTab === "Contacts" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-display font-bold text-lg text-white">Client Contacts Log</h2>
                
                {contacts.length === 0 ? (
                  <div className="text-center py-12 text-xs text-brand-muted font-mono bg-brand-dark-card/30 rounded border border-white/5">
                    NO SALES CONTACT LOGS REGISTERED IN DATABASE.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {contacts.map((c) => (
                      <div key={c.id} className="p-6 rounded-xl bg-brand-dark-card/30 border border-white/5 flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                          <div>
                            <span className="font-semibold text-white text-base mr-3">{c.name}</span>
                            {c.company && <span className="text-xs bg-brand-orange-mid/10 border border-brand-orange-mid/20 text-brand-orange-light px-2 py-0.5 rounded font-medium">{c.company}</span>}
                          </div>
                          <span className="text-[10px] text-brand-muted font-mono">{new Date(c.created_at).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-brand-gray">
                          <span>Email: <a href={`mailto:${c.email}`} className="text-brand-orange-light hover:underline">{c.email}</a></span>
                          {c.phone && <span>Phone: {c.phone}</span>}
                        </div>
                        
                        <p className="text-xs text-brand-muted leading-relaxed font-sans bg-brand-black/40 border border-white/5 p-4 rounded mt-1">
                          {c.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. TAB CONTENT: APPLICATIONS */}
            {activeTab === "Applications" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-display font-bold text-lg text-white">Job Applications</h2>

                {applications.length === 0 ? (
                  <div className="text-center py-12 text-xs text-brand-muted font-mono bg-brand-dark-card/30 rounded border border-white/5">
                    NO JOB CANDIDATE APPLICATIONS REGISTERED IN DATABASE.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {applications.map((app) => (
                      <div key={app.id} className="p-6 rounded-xl bg-brand-dark-card/30 border border-white/5 flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                          <div>
                            <span className="font-semibold text-white text-base mr-3">{app.full_name}</span>
                            <span className="text-xs text-brand-orange-light font-semibold uppercase tracking-wider">
                              Applied: {app.job?.title || `Position ID ${app.job_id}`}
                            </span>
                          </div>
                          <span className="text-[10px] text-brand-muted font-mono">{new Date(app.created_at).toLocaleString()}</span>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-brand-gray">
                          <span>Email: <a href={`mailto:${app.email}`} className="text-brand-orange-light hover:underline">{app.email}</a></span>
                          <span>Phone: {app.phone}</span>
                        </div>

                        {app.cover_letter && (
                          <div className="text-xs text-brand-muted font-sans bg-brand-black/40 border border-white/5 p-4 rounded mt-1">
                            <span className="block font-bold text-[10px] uppercase text-white tracking-widest mb-1.5">Cover Letter:</span>
                            {app.cover_letter}
                          </div>
                        )}

                        <div className="mt-2">
                          <a
                            href={getResumeUrl(app.resume_path)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold bg-brand-orange-mid/10 hover:bg-brand-orange-mid/25 border border-brand-orange-mid/20 text-brand-orange-light hover:text-white transition-all cursor-pointer"
                          >
                            <FaDownload size={10} /> Download Resume / CV
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>

      {/* A. MODALS: PROJECT CRUD */}
      <AnimatePresence>
        {projectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-brand-dark-card border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col max-h-[90vh] relative"
            >
              <button onClick={() => setProjectModal(false)} className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white transition-colors cursor-pointer"><FaTimes size={12} /></button>

              <h3 className="font-display font-bold text-xl text-white mb-6">
                {selectedProject ? "Edit Showcase Project" : "Register New Project"}
              </h3>

              <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4 overflow-y-auto pr-1 select-text">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-muted font-semibold">Project Title *</label>
                  <input type="text" required value={projTitle} onChange={(e) => setProjTitle(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="e.g. Apex Dashboard" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-muted font-semibold">Tech Stack (comma separated) *</label>
                  <input type="text" required value={projTech} onChange={(e) => setProjTech(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="React, FastAPI, PostgreSQL, AWS" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-muted font-semibold">GitHub Repository URL</label>
                    <input type="url" value={projGithub} onChange={(e) => setProjGithub(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="https://github.com/..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-muted font-semibold">Live Deployment URL</label>
                    <input type="url" value={projLive} onChange={(e) => setProjLive(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="https://..." />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-muted font-semibold">Thumbnail Image URL</label>
                  <input type="url" value={projImage} onChange={(e) => setProjImage(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="https://images.unsplash.com/..." />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-muted font-semibold">Project Description *</label>
                  <textarea rows={4} required value={projDesc} onChange={(e) => setProjDesc(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white resize-none" placeholder="Provide details about the project challenges, designs, and achievements..." />
                </div>

                <button type="submit" className="w-full mt-2 py-3 rounded text-sm font-semibold gradient-brand hover:brightness-110 text-white cursor-pointer transition-all duration-200">
                  {selectedProject ? "Update Project Details" : "Register Project Showcase"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* B. MODALS: JOB CRUD */}
      <AnimatePresence>
        {jobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-brand-dark-card border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col max-h-[90vh] relative"
            >
              <button onClick={() => setJobModal(false)} className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white transition-colors cursor-pointer"><FaTimes size={12} /></button>

              <h3 className="font-display font-bold text-xl text-white mb-6">
                {selectedJob ? "Edit Job Position" : "Post New Job Opening"}
              </h3>

              <form onSubmit={handleJobSubmit} className="flex flex-col gap-4 overflow-y-auto pr-1 select-text">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-muted font-semibold">Position Title *</label>
                  <input type="text" required value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="e.g. Lead Devops Architect" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs text-brand-muted font-semibold">Office Location *</label>
                    <input type="text" required value={jobLoc} onChange={(e) => setJobLoc(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="Remote (Global) / NYC" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-muted font-semibold">Employment Type</label>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white cursor-pointer">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-muted font-semibold">Required Experience *</label>
                  <input type="text" required value={jobExp} onChange={(e) => setJobExp(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white" placeholder="e.g. 5+ Years" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-muted font-semibold">Job Description (markdown splits using '### ' headers and '- ' list items) *</label>
                  <textarea rows={5} required value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="w-full px-4 py-2 text-sm bg-brand-black border border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-white resize-none" placeholder="### Role Overview&#10;Describe details...&#10;&#10;### Requirements&#10;- Requirement 1&#10;- Requirement 2" />
                </div>

                <button type="submit" className="w-full mt-2 py-3 rounded text-sm font-semibold gradient-brand hover:brightness-110 text-white cursor-pointer transition-all duration-200">
                  {selectedJob ? "Update Job listing" : "Post Job Opening"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Admin;
