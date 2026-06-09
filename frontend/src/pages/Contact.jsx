import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaYoutube, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    let cleanPhone = null;
    if (phone.trim() !== "") {
      cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
      const phoneRegex = /^\+?[1-9]\d{6,14}$/;
      if (!phoneRegex.test(cleanPhone)) {
        setError("Invalid phone number format. Must be 7 to 15 digits, optionally starting with '+'");
        setSubmitting(false);
        return;
      }
    }

    try {
      await axios.post('https://formspree.io/f/xlgknzbv', {
        name,
        email,
        phone: cleanPhone || phone || null,
        service: service || null,
        message
      }, {
        headers: {
          'Accept': 'application/json'
        }
      });
      setSuccess(true);
      // Clean inputs
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setMessage("");
    } catch (err) {
      console.error(err);
      let errorMsg = "Failed to submit message. Please try again.";
      if (err.response?.data?.errors) {
        errorMsg = err.response.data.errors.map(e => e.message).join(", ");
      } else if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMsg = err.response.data.detail.map(d => d.msg).join(", ");
        } else {
          errorMsg = err.response.data.detail;
        }
      }
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs text-brand-orange-light font-sans font-bold tracking-widest uppercase">Contact Us</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-800 dark:text-white mt-2 mb-6">
            Let's Build Something Great
          </h1>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-brand-gray leading-relaxed font-sans max-w-xl mx-auto">
            Get in touch with our engineering architects. We provide transparent design proposals, resource sizing, and code delivery roadmaps.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="pb-24 px-6 relative">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange-mid/5 blur-[120px] top-10 left-10 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-extrabold text-2xl text-neutral-800 dark:text-white leading-none">
                Office Headquarters
              </h2>
              <p className="text-sm text-neutral-800 dark:text-brand-muted leading-relaxed">
                Our main consulting and design division operates out of our tech campus. Contact us to schedule an introductory video call or face-to-face workshop.
              </p>
              
              <div className="flex flex-col gap-5 mt-4">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="text-brand-orange-light mt-1 shrink-0"><FaMapMarkerAlt size={16} /></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white mb-1">Location</h4>
                    <p className="text-xs text-neutral-800 dark:text-brand-gray font-sans">
                      Virudhunagar, Tamilnadu, India
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="text-brand-orange-light mt-1 shrink-0"><FaEnvelope size={16} /></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white mb-1">Email</h4>
                    <p className="text-xs text-neutral-800 dark:text-brand-gray font-sans">
                      veilatechnologies@gmail.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="text-brand-orange-light mt-1 shrink-0"><FaPhone size={16} /></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white mb-1">Phone</h4>
                    <p className="text-xs text-neutral-800 dark:text-brand-gray font-sans">
                      +91 8072196400
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Link Cards */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-800 dark:text-white mb-4">Connect Socially</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/veilatechnologies?igsh=MjhvN3VoMTRlYTl1" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-brand-orange-mid dark:bg-brand-dark-card dark:hover:bg-brand-orange-mid border border-black/5 dark:border-white/5 text-neutral-700 hover:text-white dark:text-brand-gray dark:hover:text-white transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://www.youtube.com/@VeilaTechnologies" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-brand-orange-mid dark:bg-brand-dark-card dark:hover:bg-brand-orange-mid border border-black/5 dark:border-white/5 text-neutral-700 hover:text-white dark:text-brand-gray dark:hover:text-white transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>


          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 glassmorphism rounded-2xl border border-white/5 relative">
              <div className="absolute w-64 h-64 rounded-full bg-brand-orange-mid/5 blur-3xl bottom-6 right-6 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-4"
                  >
                    <div className="text-brand-orange-light text-5xl animate-bounce"><FaCheckCircle /></div>
                    <h3 className="font-display font-bold text-xl text-white">Message Transmitted!</h3>
                    <p className="text-sm text-brand-muted max-w-sm">
                      Thank you for contacting Veila Technologies. We have logged your request and our lead engineering architect will follow up via email within 24 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-6 px-6 py-2.5 text-xs font-semibold rounded gradient-brand text-white cursor-pointer"
                    >
                      Send New Message
                    </button>
                  </motion.div>
                ) : (
                  <form action="https://formspree.io/f/xlgknzbv" method="POST" onSubmit={handleFormSubmit} className="flex flex-col gap-5 relative z-10">
                    
                    {error && (
                      <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-300 rounded font-medium">
                        {error}
                      </div>
                    )}

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-brand-muted font-semibold">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-brand-muted font-semibold">Your Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>

                    {/* Phone & Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-brand-muted font-semibold">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                          placeholder="Your Phone Number"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-brand-muted font-semibold">Select a Service</label>
                        <select
                          name="service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white"
                        >
                          <option value="">Select a Service</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Software Development">Software Development</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="SEO">SEO</option>
                          <option value="Social Media Management">Social Media Management</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-brand-muted font-semibold">Your Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-white dark:bg-brand-black border border-neutral-300 dark:border-white/5 rounded focus:border-brand-orange-mid focus:outline-none text-neutral-800 dark:text-white resize-none"
                        placeholder="Your Message"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-2 py-3 rounded text-sm font-semibold gradient-brand hover:brightness-110 text-white cursor-pointer disabled:opacity-50 transition-all duration-200"
                    >
                      {submitting ? "Transmitting..." : "Send Message"}
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
