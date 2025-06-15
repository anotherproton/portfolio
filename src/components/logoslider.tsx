import React from 'react';

const LogoSlider = () => {
  // Array of logos updated with the URLs you provided.
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

  // This style block contains the animation keyframes.
  // Using a style tag is a reliable way to ensure animations work in various environments.
  const styles = `
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .animate-scroll {
      animation: scroll 30s linear infinite;
    }
  `;

  return (
    <section id="logo-slider" className="section-padding bg-black">
      <style>{styles}</style>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Industry <span className="text-gradient">Leaders</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            I've had the privilege of working with a diverse range of companies, from innovative startups to established brands.
          </p>
        </div>

        {/* The marquee effect is created by having a container with 'overflow-hidden' 
          and an inner track that contains two sets of the logos. 
          The animation slides the track horizontally.
        */}
        <div 
          className="relative w-full overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)'
          }}
        >
          <div className="flex w-max animate-scroll">
            {/* The logos are duplicated to create a seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-48 mx-4 flex items-center justify-center h-20">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-12 w-auto object-contain transition-all duration-300"
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
