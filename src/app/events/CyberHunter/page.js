"use client";
import React from "react";
import Header from "@/components/Header.jsx";
import Image from "next/image";
import Link from "next/link";

const CyberHunterInfo = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white px-4">
      <Header />

      <div className="max-w-5xl mx-auto py-16">
        <div className="h-15"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-lime-500 text-transparent bg-clip-text">
          Cyber Hunter
        </h1>
        <p className="text-center text-white/80 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          <strong>Cyber Hunter</strong> was a thrilling offline game organized by OWASP MANIT at the LRC, where participants cracked riddles, solved programming questions, and strategized their way through multiple missions — all to earn bullets for an epic showdown: a simulated gunfight!
        </p>

        {/* Banner */}
        <div className="relative w-full h-64 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl mb-10">
          <Image
            src="/images/ch/poster.jpg" // Replace with actual path
            alt="Cyber Hunter Event Poster"
            fill
            className="object-cover"
          />
        </div>

        {/* Highlights */}
        <div className="bg-zinc-800/50 p-8 rounded-2xl shadow-lg mb-16">
          <h2 className="text-2xl font-semibold text-lime-400 mb-4">
            Event Highlights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-white/80 leading-relaxed">
            <li>Teams solved cyber riddles, logic puzzles & code problems</li>
            <li>Each correct answer rewarded bullets for the final showdown</li>
            <li>The finale was a team-based gunfight (with toy guns) in LRC arena</li>
            <li>Winners earned exclusive OWASP swags & reputation points</li>
            <li>30+ teams competed in this tactical + technical hybrid game</li>
          </ul>
        </div>

        {/* Event Format */}
        <div className="bg-gradient-to-br from-lime-900/20 to-black p-8 rounded-2xl mb-16 border border-lime-700/30">
          <h2 className="text-2xl font-semibold text-lime-400 mb-4">
            How the Game Worked
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Participants competed in teams of 2–4. They had to solve a series of cybersecurity-related puzzles, riddles, and programming challenges. For every correct answer, teams earned a number of "bullets" (points). These bullets were then used in the final arena round — a toy-gun battle in the Learning Resource Centre (LRC), MANIT.
          </p>
          <p className="text-white/80 leading-relaxed">
            The more bullets you earned in the quiz phase, the more ammo your team had during the face-off. Strategy, speed, and brainpower — all mattered.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-lime-400 mb-6 text-center">
            Event Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/images/ch/1.jpg",
              "/images/ch/cyberhntr.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={src}
                  alt={`Cyber Hunter Photo ${index + 1}`}
                  width={500}
                  height={500}
                  className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/ComingSoon" // replace with actual results link
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-lime-400/30 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Results / Play Again
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
    </div>
  );
};

export default CyberHunterInfo;
