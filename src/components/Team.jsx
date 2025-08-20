"use client";
import React, { useState, useRef } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { useInView } from "framer-motion";
import TeamData from "../data/TeamData";
import Image from "next/image";

function Section({ children }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="w-80 sm:w-60">
      <div>{children}</div>
    </section>
  );
}

const Team = () => {
  const [showAll, setShowAll] = useState(false);
  const teamSectionRef = useRef(null);

  const handleToggle = () => {
    if (showAll) {
      teamSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll((prev) => !prev);
  };

  const displayed = showAll ? TeamData : TeamData.slice(0, 4);

  return (
    <div
      ref={teamSectionRef}
      className="relative flex flex-col items-center py-3 bg-gray-950 rounded-2xl justify-around "
    >
      <h2 className="text-4xl font-extrabold text-center text-white mb-12 p-2">
        Meet Our Team
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {displayed.map((member, idx) => (
          <Section key={idx}>
            <div className="bg-black bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 w-80 sm:w-60 h-80">
              <div className="relative w-full h-40 group">
                {/* --- MODIFICATION 1: Added blur on hover to the Image --- */}
                <Image
                  src={member.dp}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-2xl transition-all duration-300 group-hover:blur-sm"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                
                {/* --- MODIFICATION 2: Reduced overlay opacity for better visibility --- */}
                <div
                  className="absolute inset-0 bg-transparent bg-opacity-20
                             hidden sm:flex items-center justify-center gap-4 
                             opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300"
                >
                  <a
                    href={member.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full hover:bg-pink-100 transition-colors"
                  >
                    <BsInstagram className="text-xl text-pink-600" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full hover:bg-sky-100 transition-colors"
                  >
                    <FaLinkedinIn className="text-xl text-sky-600" />
                  </a>
                </div>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-gray-300">{member.role}</p>

                <div className="mt-4 flex justify-center gap-4 sm:hidden">
                  <a
                    href={member.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-full"
                  >
                    <BsInstagram className="text-xl text-pink-500" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-full"
                  >
                    <FaLinkedinIn className="text-xl text-sky-500" />
                  </a>
                </div>
              </div>
            </div>
          </Section>
        ))}
      </div>

      <button
        onClick={handleToggle}
        className="mt-8 px-8 py-4 
                   bg-white/10 backdrop-blur-lg border border-white/20 
                   hover:bg-white/20 hover:border-white/30
                   text-white font-medium rounded-2xl 
                   transition-all duration-300 ease-out
                   shadow-lg hover:shadow-xl
                   transform hover:scale-105 hover:-translate-y-0.5
                   active:scale-95 active:translate-y-0
                   relative overflow-hidden
                   before:absolute before:inset-0 
                   before:bg-gradient-to-r before:from-white/5 before:to-transparent 
                   before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 cursor-pointer"
      >
        <span className="relative z-10">
          {showAll ? "Show Less" : "Show More"}
        </span>
      </button>
    </div>
  );
};

export default Team;