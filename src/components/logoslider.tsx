import React from 'react';

const LogoSlider = () => {
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

  const styles = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .logo-slider {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      width: 100%;
      background: #fff;
      padding: 20px 0;
    }

    .slider-track {
      display: flex;
      width: calc(200%); /* Because logos are duplicated */
      animation: scroll 30s linear infinite;
    }

    .logo-item {
      flex: 0 0 auto;
      width: 160px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-item img {
      max-width: 100%;
      max-height: 60px;
      object-fit: contain;
    }

    @media (max-width: 768px) {
      .logo-item {
        width: 30vw; /* 3-4 logos in one view */
        padding: 0 10px;
      }
    }

    @media (max-width: 480px) {
      .logo-item {
        width: 40vw;
      }
    }
  `;

  return (
    <div className="logo-slider-wrapper">
      <style>{styles}</style>
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '10px' }}>
        Brands I've Worked With
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        I’ve been lucky to work with some amazing companies over the years – from scrappy startups to well-established brands.
      </p>

      <div className="logo-slider">
        <div className="slider-track">
          {[...logos, ...logos].map((logo, index) => (
            <div className="logo-item" key={index}>
              <img src={logo.url} alt={logo.name} title={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
