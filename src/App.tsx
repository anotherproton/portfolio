import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Services from './components/Services';
import LogoSlider from './components/logoslider';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <About />
      <TechStack />
      <LogoSlider/>
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default App;
