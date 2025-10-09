"use client";
import React, { useState, useEffect } from 'react'
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { GoChevronDown } from "react-icons/go";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { throttle } from 'lodash';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [events, setEvents] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

useEffect(() => {
  const throttled = throttle(() => {
    const pastThreshold = window.scrollY > 20;
    if (pastThreshold !== scrolled) {
      setScrolled(pastThreshold);
    }
  }, 50);

  window.addEventListener('scroll', throttled, { passive: true });
  return () => {
    window.removeEventListener('scroll', throttled);
  };
}, [scrolled]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbar && !e.target.closest('.navbar-container')) {
        setNavbar(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [navbar]);

  useEffect(() => {
    setNavbar(false);
    setEvents(false);
  }, [pathname]);

  return (
    <div className='flex justify-center items-center'>
    <header className={`navbar-container fixed top-0 w-300 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      
        <div className={`glass-card ${scrolled ? 'shadow-lg' : ''}`}>
          <nav className="flex items-center justify-between px-4 py-3">
            <Link href={"/"} className="flex items-center">
            <div className="flex items-center">
              <div className="logo h-10 w-10 rounded-full mr-3"></div>
              <span className="text-white font-bold text-xl hidden sm:block">Cybersecurity OWASP Consortium</span>
            </div>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-1">
          
              <li><Link href="/" className={`nav-link ${pathname === '/mission' ? 'active' : ''}`}>Home</Link></li>
              <li className="relative">
                
                <button 
                  className={`nav-link flex items-center ${pathname.includes('/events') || pathname.includes('/upcoming') ? 'active' : ''}`}
                  onClick={() => setEvents(!events)}
                >
                  Events
                  <GoChevronDown className={`ml-1 transition-transform duration-300 ${events ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${events ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className="glass-card py-1">
                    <Link href="/events" className="block px-4 py-2 text-white hover:bg-white/10 transition-colors">Past Events</Link>
                    <Link href="/upcoming" className="block px-4 py-2 text-white hover:bg-white/10 transition-colors">Upcoming Events</Link>
                  </div>
                </div>
              </li>
              
              <li><Link href="/contact" className={`nav-link ${pathname === '/mission' ? 'active' : ''}`}>Contact Us</Link></li>
              <li><Link href="/team" className={`nav-link ${pathname === '/mission' ? 'active' : ''}`}>Team</Link></li>
              
            </ul>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white p-2 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setNavbar(!navbar);
                setEvents(false);
              }}
            >
              {navbar ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={`glass-card lg:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
            navbar ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 px-6">
            <ul className="space-y-4">
              <li><Link href="/" className="block text-white py-2">Home</Link></li>
              <li><Link href="/team" className="block text-white py-2">Team</Link></li>
              
              <li>
                <button 
                  className="flex items-center justify-between w-full text-white py-2"
                  onClick={() => setEvents(!events)}
                >
                  Events
                  <GoChevronDown className={`transition-transform duration-300 ${events ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 pl-4 ${events ? 'max-h-20 mt-2' : 'max-h-0'}`}>
                  <Link href="/events" className="block text-white py-2">Past Events</Link>
                  <Link href="/upcoming" className="block text-white py-2">Upcoming Events</Link>
                  
                </div>
              </li>
              
            </ul>
          </nav>
        </div>
      
    </header>
    </div>
  );
};

export default Header;