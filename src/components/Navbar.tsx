"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2 bg-black/90 backdrop-blur-md' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
          MyPortfolio
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="#home" className="text-white hover:text-cyan-400 transition-colors">Home</Link>
          <Link href="#portfolio" className="text-white hover:text-cyan-400 transition-colors">Portfolio</Link>
          <Link href="#about" className="text-white hover:text-cyan-400 transition-colors">About</Link>
          <Link href="#contact" className="text-white hover:text-cyan-400 transition-colors">Contact</Link>
        </div>
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}