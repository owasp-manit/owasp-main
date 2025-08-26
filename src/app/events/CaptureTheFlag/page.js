"use client";
import React from "react";
import Header from "@/components/Header.jsx";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer.jsx";

const CTFInfo = () => {
  const images = [
    "/images/ctf/ctf.jpg",
    "/images/ctf/ctf2.jpg",
    "/images/ctf/ctf3.jpg",
    "/images/ctf/ctf4.jpg",
  ];
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white px-4">
      <Header />
      <div className="h-15"></div>

      <div className="max-w-5xl mx-auto py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text">
          OWASP MANIT CTF 2024
        </h1>
        {/* Banner */}
        <div className="relative w-full h-64 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl mb-10">
          <Image
            src="/images/ctf/poster.jpg" // Replace with actual path
            alt="CTF Event Poster"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center text-white/80 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          The OWASP MANIT Chapter hosted its inaugural Capture The Flag (CTF)
          cybersecurity competition at MANIT Bhopal. The event saw enthusiastic
          participation from students across various engineering institutions
          from Bhopal, diving deep into the world of web security, reverse
          engineering, cryptography, and more.
        </p>

        {/* Gallery Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={image}
                  alt={`CTF Event Photo ${index + 1}`}
                  priority={true}
                  width={500}
                  height={500}
                  className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-2xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-sky-400 mb-4">
            Highlights
          </h2>
          <ul className="list-inside space-y-2 text-white/80 leading-relaxed">
            <li>3-hour Jeopardy-style CTF with 30+ custom challenges</li>
            <li>Categories: Web Exploitation, Crypto, Forensics, Reversing</li>
            <li>Prizes worth ₹10,000 for top teams</li>
            <li>Beginner-friendly challenges to encourage learning</li>
          </ul>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/ComingSoon"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-sky-500/30 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View CTF Challenges & Writeups
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

export default CTFInfo;
