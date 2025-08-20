"use client";
import React from "react";
import Header from "@/components/Header.jsx";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer.jsx";

const CyberBasicsInfo = () => {
  const images = [
    "/images/cyberbasics/1.JPG",
    "/images/cyberbasics/2.JPG",
    "/images/cyberbasics/3.JPG",
    "/images/cyberbasics/4.JPG",
    "/images/cyberbasics/6.JPG",
    "/images/cyberbasics/7.JPG",
    "/images/cyberbasics/8.png",
    "/images/cyberbasics/9.JPG",
  ];
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white px-4">
      <Header />

      <div className="max-w-5xl mx-auto py-16">
        <div className="h-15"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
          CyberBasics 1.0
        </h1>
        <p className="text-center text-white/80 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          OWASP MANIT hosted <strong>CyberBasics 1.0</strong>, an insightful
          guest lecture led by <strong>Hemraj Singh Chuhan</strong>, an
          experienced cyber security professional and consultant. The session
          covered the foundations of cybersecurity, real-world case studies, and
          essential awareness practices for budding ethical hackers and security
          enthusiasts.
        </p>

        <div className="relative w-full h-64 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl mb-10">
          <Image
            src={"/images/cyberbasics/poster.jpg"}
            alt="CyberBasics 1.0 Poster"
            className="object-cover"
            fill
          />
        </div>

        {/* Highlights */}
        <div className="bg-slate-800/50 p-8 rounded-2xl shadow-lg mb-16">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">
            Highlights
          </h2>
          <ul className="list-inside space-y-2 text-white/80 leading-relaxed">
            <li>Delivered by Hemraj Singh Chuhan (Cybersecurity Consultant)</li>
            <li>Basics of Cyber Hygiene, Phishing & Ransomware explained</li>
            <li>Real-world cyber attack case studies discussed</li>
            <li>Hosted at MANIT Bhopal Auditorium</li>
            <li>Attended by 150+ students & faculty</li>
          </ul>
        </div>

        {/* Gallery Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-purple-400 mb-6 text-center">
            Event Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((src, index) => (
              <div
                key={index}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={src}
                  alt={`CyberBasics Photo ${index + 1}`}
                  width={500}
                  height={500}
                  className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Learn More or Resources */}
        <div className="text-center mt-16">
          <Link
            href="/ComingSoon" // update link if needed
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-purple-500/30 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resources
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CyberBasicsInfo;
