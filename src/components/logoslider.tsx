import React, { useEffect, useState, useRef } from 'react';

const LogoSlider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const logos = [
    { name: 'Mahina', url: 'https://ik.imagekit.io/6cu3kzcxt/Mahina_Logo_330x.avif?updatedAt=1749979000137' },
    { name: 'Mum & You', url: 'https://ik.imagekit.io/6cu3kzcxt/logo-mumandyoudotcom.webp?updatedAt=1749979000523' },
    { name: 'WeMust', url: 'https://ik.imagekit.io/6cu3kzcxt/We_Must_Logo_New.avif?updatedAt=1749979000620' },
    { name: 'Nicobar', url: 'https://ik.imagekit.io/6cu3kzcxt/nclogo.png?updatedAt=1749978988453' },
    { name: 'O&O', url: 'https://ik.imagekit.io/6cu3kzcxt/OO-Logo.svg?updatedAt=1749992611749' },
    { name: 'Vserv', url: 'https://ik.imagekit.io/6cu3kzcxt/without-mascot-light-bg.png?updatedAt=1749992611566' },
    { name: 'Grodd', url: 'https://ik.imagekit.io/6cu3kzcxt/download.png?updatedAt=1749992611427' },
    { name: 'Sheikh Chang Singh', url: 'https://ik.imagekit.io/6cu3kzcxt/8.9543f0ca.png?updatedAt=1749992611329' },
    { name: 'Summer Madras', url: 'https://ik.imagekit.io/6cu3kzcxt/Untitled_Artwork_122.avif?updatedAt=1749992611380' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  // UPDATED: Styles now include the pause-on-hover functionality.
  const styles = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 40s linear infinite;
    }
    .logo-slider-container:hover .animate-scroll {
      animation-play-state: paused;
    }
  `;

  return (
    <section id="logo-slider" ref={sectionRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
      <style>{styles}</style>
      
      {/* Subtle background gradients for depth */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-green-500/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/10 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Trusted by Industry <span className="text-gradient">Leaders</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            I've had the privilege of working with a diverse range of companies, from innovative startups to established brands.
          </p>
        </div>

        {/* The marquee container now has a class to enable the hover effect */}
        <div 
          className="logo-slider-container relative w-full overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)'
          }}
        >
          <div className={`flex w-max animate-scroll transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* The logos are duplicated for a seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              // NEW: Each logo is wrapped in an interactive "glass card"
              <div 
                key={index} 
                className="group flex-shrink-0 w-40 sm:w-48 mx-4 sm:mx-8 flex items-center justify-center h-24 p-4 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:!bg-white/10 hover:!border-white/20 hover:scale-105"
              >
                <img
                  src={logo.url}
                  alt={`${logo.name} logo`}
                  // NEW: Grayscale effect that turns to color on hover.
                  className="max-h-12 w-auto object-contain filter grayscale transition-all duration-300 group-hover:filter-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
