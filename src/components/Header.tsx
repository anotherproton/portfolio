import React, { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
           
            <span className="text-xl font-bold text-white">TanujDev</span>
          </div>

          {/* CTA Button */}
          <button 
            onClick={scrollToContact}
            className="btn-shopify px-6 py-2 rounded-lg font-semibold text-white"
          >
            Contact Me
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
