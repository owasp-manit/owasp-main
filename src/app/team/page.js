"use client";
import React from "react";
import Header from "@/components/Header.jsx";
import Image from "next/image";
import Link from "next/link";
import Team from "@/components/Team.jsx";
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
      <div className="h-30"></div>

      <Team />
      <Footer />
    </div>
  );
};

export default CTFInfo;
