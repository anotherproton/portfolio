import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

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
            <img 
              src="https://ik.imagekit.io/6cu3kzcxt/logo%20Background%20Removed%20(1).png?updatedAt=1749999648669" 
              alt="Website Logo" 
              className="h-10 w-16" 
            />
          </div>

          {/* Animated CTA Button */}
          <button 
            onClick={scrollToContact}
            className="btn-shopify flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
          >
            <Rocket className="w-4 h-4" />
            Elevate Your Store
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
