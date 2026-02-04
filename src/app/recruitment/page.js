"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecruitmentForm from "@/components/RecruitmentForm";
import MatrixBackground from "@/components/MatrixBackground";
import { motion } from "framer-motion";
import {
  FaUserSecret,
  FaNetworkWired,
  FaChalkboardTeacher,
  FaLaptopCode,
} from "react-icons/fa";

const Recruitment = () => {
    const benefits = [
        {
          id: 1,
          title: "Hands-on Experience",
          description: "Work on real-world cybersecurity projects and CTF challenges.",
          icon: <FaLaptopCode size={30} />,
          color: "text-blue-400",
        },
        {
          id: 2,
          title: "Networking",
          description: "Connect with industry professionals, alumni, and like-minded peers.",
          icon: <FaNetworkWired size={30} />,
          color: "text-purple-400",
        },
        {
          id: 3,
          title: "Mentorship",
          description: "Learn from experienced seniors and experts in the field.",
          icon: <FaChalkboardTeacher size={30} />,
          color: "text-green-400",
        },
        {
          id: 4,
          title: "Cyber Awareness",
          description: "Contribute to spreading crucial cybersecurity awareness.",
          icon: <FaUserSecret size={30} />,
          color: "text-red-400",
        },
      ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans relative overflow-x-hidden">
        {/* Background Overlay */}
       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
         <MatrixBackground />
       </div>

      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading"
            >
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Force</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              Be a part of MANIT's premier Cybersecurity community. Learn, Hack, and Secure.
            </motion.p>
          </div>

          {/* Benefits Section */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.6 }}
          >
             <h2 className="text-3xl font-bold mb-10 text-center font-heading">
                Why <span className="text-sky-400">Join Us?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                <motion.div
                    key={benefit.id}
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 flex flex-col items-center text-center space-y-4 border border-white/5 hover:border-sky-500/30 transition-colors"
                >
                    <div className={`p-4 rounded-full bg-white/5 ${benefit.color} mb-2`}>
                        {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
                ))}
            </div>
          </motion.div>

           {/* Form Section */}
            <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5, duration: 0.5 }}
                 id="apply-form"
            >
                 <RecruitmentForm />
            </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recruitment;
