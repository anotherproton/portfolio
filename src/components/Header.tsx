import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // A small threshold of 10px instead of 50px for a quicker effect
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // NEW: In-component styles for the dynamic button animations
  const styles = `
    @keyframes pulse-glow {
      0% {
        box-shadow: 0 0 5px rgba(16, 185, 129, 0.2), 0 0 10px rgba(16, 185, 129, 0.1);
      }
      50% {
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2);
      }
      100% {
        box-shadow: 0 0 5px rgba(16, 185, 129, 0.2), 0 0 10px rgba(16, 185, 129, 0.1);
      }
    }

    .btn-elevate {
      position: relative;
      background: linear-gradient(90deg, #10b981, #2563eb, #10b981);
      background-size: 200% auto;
      transition: background-position 0.5s ease-in-out, transform 0.2s ease, box-shadow 0.3s ease;
      animation: pulse-glow 4s infinite ease-in-out;
    }

    .btn-elevate:hover {
      background-position: right center;
      transform: scale(1.05);
      animation-play-state: paused; /* Pause the pulse and show a stronger glow */
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.6), 0 0 40px rgba(37, 99, 235, 0.4);
    }
  `;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      // The background appears faster and is slightly more translucent for a modern feel
      isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <style>{styles}</style>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" aria-label="Back to top" className="flex items-center gap-2">
            <img 
              src="https://ik.imagekit.io/6cu3kzcxt/logo%20Background%20Removed.png?updatedAt=1749999601697" 
              alt="Tanuj Rajput Logo" 
              className="h-10 w-auto" // Simplified size classes
            />
          </a>

          {/* --- NEW Dynamic CTA Button --- */}
          <button 
            onClick={scrollToContact}
            // The 'group' class allows us to animate child elements on button hover
            className="btn-elevate group flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white overflow-hidden"
          >
            <Rocket 
              className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45" 
            />
            <span className="relative z-10">
              Elevate Your Store
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
