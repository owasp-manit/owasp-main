"use client";
import React from "react";
import Header from "@/components/Header.jsx";

const ComingSoon = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col items-center justify-center px-6 text-center">
      <Header />

      <div className="mt-24 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold my-15 bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text mb-6">
          Something Awesome is Coming
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
          We're working on something exciting for the OWASP Chapter MANIT community.
          Stay tuned for updates on upcoming events, workshops, and more.
        </p>
      </div>

      {/* Decorative circles and blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
    </div>
  );
};

export default ComingSoon;
