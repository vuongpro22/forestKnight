import emailjs from "@emailjs/browser";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
    
    // Initialize EmailJS with your public key
    emailjs.init("GEk6xcGUMXH9SDK18");
  }, [controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Using emailjs.send with the correct parameter for recipient
    emailjs.send(
      'service_4kxo9bc',
      'template_ke3xtdn',
      {
        user_name: form.user_name,
        user_email: form.user_email,
        message: form.message,
        to_name: "Binh Vuong", // Add recipient name
        reply_to: form.user_email, // Add reply-to email
      },
      'GEk6xcGUMXH9SDK18'
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setLoading(false);
        setForm({
          user_name: "",
          user_email: "",
          message: "",
        });
        alert('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setLoading(false);
        alert(`Failed to send message: ${error.text || error.message || 'Unknown error'}`);
      });
  };

  return (
    <div
      className="md:m-12 md:px-48 flex flex-col sm:flex-row gap-10 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              type: "tween",
              duration: 1,
              delay: 0.2,
            },
          },
        }}
        className='flex-[0.8] md:pb-40 mx-4 sm:mx-auto'
      >
        <h3 className={styles.sectionText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 gap-6 flex flex-col bg-tertiary/20 p-8 rounded-2xl backdrop-blur-sm border border-quaternary/20 shadow-lg shadow-quaternary/10"
        >
          <div className="flex flex-col gap-2">
            <span className='text-white font-medium text-lg'>Full Name</span>
            <input
              type="text"
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="bg-tertiary/50 p-4 text-white border border-quaternary/30 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-quaternary/50 focus:border-transparent transition-all duration-300 placeholder:text-white/50"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <span className='text-white font-medium text-lg'>Email Address</span>
            <input
              type="email"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="bg-tertiary/50 p-4 text-white border border-quaternary/30 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-quaternary/50 focus:border-transparent transition-all duration-300 placeholder:text-white/50"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <span className='text-white font-medium text-lg'>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="10"
              className="bg-tertiary/50 p-4 text-white border border-quaternary/30 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-quaternary/50 focus:border-transparent transition-all duration-300 placeholder:text-white/50 resize-none"
              required
            />
          </div>
          
          <button
            type='submit'
            className='bg-quaternary/80 hover:bg-quaternary py-3 px-8 w-fit text-white font-bold rounded-lg shadow-md shadow-quaternary/20 hover:shadow-lg hover:shadow-quaternary/30 transition-all duration-300 transform hover:scale-105'
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        
        {/* Social Media Icons */}
        <div className="mt-8 flex gap-6">
          <a 
            href="https://www.facebook.com/tranbinhvuong2210/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-quaternary transition-colors duration-300 transform hover:scale-110"
          >
            <FaFacebook size={30} />
          </a>
          <a 
            href="https://www.instagram.com/b1nhvuong/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-quaternary transition-colors duration-300 transform hover:scale-110"
          >
            <FaInstagram size={30} />
          </a>
          <a 
            href="https://www.youtube.com/@Tbinhvuong" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-quaternary transition-colors duration-300 transform hover:scale-110"
          >
            <FaYoutube size={30} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");