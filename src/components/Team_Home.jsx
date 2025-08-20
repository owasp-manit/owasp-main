"use client";
import React, { useEffect, useRef, useState } from 'react';
import UpcomingEv from './UpcomingEv';
import News from './News';
import Faqs from './Faqs';
import Events from './Events';
import Team from './Team';
import Mission from './Mission';
import Link from 'next/link';
import { Vortex } from './ui/vortex.jsx';
import Image from 'next/image';
import hero from '../../public/hack.jpg';
import ContactForm from './contactForm.jsx';
import MatrixBackground from './MatrixBackground.jsx';

// ADDITION 1: Import the Loader component
import Loader from './Loader';

const Team_Home = () => {
  const [text, setText] = useState('');
  
  // ADDITION 2: Add state to manage the loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This timer will set loading to false after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // ADDITION 3: Conditionally render the Loader while loading is true
  if (loading) {
    return <Loader />;
  }

  // Your original component code starts here
  return (
    <>
      {/* ADDITION 4: Inject the CSS for the fade-in animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
      `}</style>

      {/* ADDITION 5: Add the 'animate-fadeIn' class to your main div */}
      <div className="home-page relative bg-black text-white overflow-hidden animate-fadeIn">
        {/* <Vortex className="inset-0 z-0" children={<section className="hero-section w-full min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8"> */}
        <div className="relative w-full h-[650px]">
    <MatrixBackground />

    {/* This div adds the fade-to-black gradient overlay at the bottom */}
    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent" />

    {/* This div centers the hero text vertically and horizontally */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white mb-2">
        OWASP
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8">
        Chapter MANIT
      </p>
    </div>
  </div>
        <section
        
          className="section bg-gradient-blue"
          id="past-events"
        >
          <div className="container-custom">
            <h2 className="section-title text-white mb-12">Past Events</h2>
            <Events />

            {/* Button to go to Upcoming Events page */}
            <div className="mt-8 text-center">
            <Link
              href="/upcoming"
              className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              See Upcoming Events
            </Link>
            </div>
          </div>
        </section>
    

        {/* Projects Section */}
        {/* <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="section bg-gradient-blue py-20"
          id="projects"
        > */}
          {/* <div className="container-custom">
            <h2 className="section-title text-white mb-12">Projects</h2>
            <Projects />
          </div> */}
        {/* </motion.section> */}
            {/* Mission Section */}
        <section 
        
          className="section bg-gradient-dark py-20"
          id="mission"
        >
          <div className="container-custom gap-20 py-30">
            {/* <h2 className="section-title text-white mb-12">Our Mission</h2> */}
            <Mission />
          </div>
        </section>


        {/* News Section */}
        <section 
          className="section bg-gradient-dark rounded-2xl"
          id="news"
        >
            <h2 className="section-title text-white mb-12">Latest News</h2>
            <News />
        </section>

        {/* FAQs Section */}
        <section 
        
          className="section bg-gradient-dark py-3 rounded-2xl"
          id="faqs"
        >

            <h2 className="section-title text-white mb-12">Frequently Asked Questions</h2>
            <Faqs />
          
        </section>
        <section 
        
          className="section bg-gradient-dark py-3 rounded-2xl"
          id="faqs"
        >
          
            <ContactForm/>
          
          
        </section>
        
      </div>
    </>
  );
};

export default Team_Home;