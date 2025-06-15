import React from 'react';

const LogoSlider = () => {
  // Array of 24 placeholder logos. 
  // For real-world use, replace these URLs with your actual client or technology logos.
  const logos = [
    { name: 'Client 1', url: 'https://placehold.co/150x80/gray/white?text=Logo1' },
    { name: 'Client 2', url: 'https://placehold.co/150x80/gray/white?text=Logo2' },
    { name: 'Client 3', url: 'https://placehold.co/150x80/gray/white?text=Logo3' },
    { name: 'Client 4', url: 'https://placehold.co/150x80/gray/white?text=Logo4' },
    { name: 'Client 5', url: 'https://placehold.co/150x80/gray/white?text=Logo5' },
    { name: 'Client 6', url: 'https://placehold.co/150x80/gray/white?text=Logo6' },
    { name: 'Client 7', url: 'https://placehold.co/150x80/gray/white?text=Logo7' },
    { name: 'Client 8', url: 'https://placehold.co/150x80/gray/white?text=Logo8' },
    { name: 'Client 9', url: 'https://placehold.co/150x80/gray/white?text=Logo9' },
    { name: 'Client 10', url: 'https://placehold.co/150x80/gray/white?text=Logo10' },
    { name: 'Client 11', url: 'https://placehold.co/150x80/gray/white?text=Logo11' },
    { name: 'Client 12', url: 'https://placehold.co/150x80/gray/white?text=Logo12' },
    { name: 'Client 13', url: 'https://placehold.co/150x80/gray/white?text=Logo13' },
    { name: 'Client 14', url: 'https://placehold.co/150x80/gray/white?text=Logo14' },
    { name: 'Client 15', url: 'https://placehold.co/150x80/gray/white?text=Logo15' },
    { name: 'Client 16', url: 'https://placehold.co/150x80/gray/white?text=Logo16' },
    { name: 'Client 17', url: 'https://placehold.co/150x80/gray/white?text=Logo17' },
    { name: 'Client 18', url: 'https://placehold.co/150x80/gray/white?text=Logo18' },
    { name: 'Client 19', url: 'https://placehold.co/150x80/gray/white?text=Logo19' },
    { name: 'Client 20', url: 'https://placehold.co/150x80/gray/white?text=Logo20' },
    { name: 'Client 21', url: 'https://placehold.co/150x80/gray/white?text=Logo21' },
    { name: 'Client 22', url: 'https://placehold.co/150x80/gray/white?text=Logo22' },
    { name: 'Client 23', url: 'https://placehold.co/150x80/gray/white?text=Logo23' },
    { name: 'Client 24', url: 'https://placehold.co/150x80/gray/white?text=Logo24' },
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
      animation: scroll 40s linear infinite;
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
              <div key={index} className="flex-shrink-0 w-48 mx-4 flex items-center justify-center">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
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

