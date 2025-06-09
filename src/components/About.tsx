import React, { useEffect, useState } from 'react';
import { Coffee, MapPin, Calendar, Heart } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`${isVisible ? 'animate-fade-in-up' : ''} text-center mb-16`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate developer who believes that great e-commerce experiences are built on the intersection of beautiful design, clean code, and deep understanding of user behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible ? 'animate-fade-in-up delay-1' : ''}`}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-green-500">My Journey</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Started as a frontend developer with a curiosity for e-commerce. Over the years, I've specialized in Shopify development, helping brands create stores that not only look stunning but also perform exceptionally.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    I love the challenge of turning complex business requirements into elegant, user-friendly solutions. Every project is an opportunity to push the boundaries of what's possible in e-commerce.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">Available for work</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">Coffee enthusiast</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">Open source lover</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isVisible ? 'animate-fade-in-up delay-2' : ''}`}>
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-green-500">What I Do Best</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-300">Shopify Development</span>
                      <span className="text-green-500">Expert</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-300">Frontend Development</span>
                      <span className="text-green-500">Advanced</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-300">UX/UI Design</span>
                      <span className="text-green-500">Proficient</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-300">Performance Optimization</span>
                      <span className="text-green-500">Advanced</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-black/50 rounded-lg border border-gray-800">
                  <p className="text-gray-400 text-sm italic">
                    "The best code is not just functional, but elegant, maintainable, and tells a story."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;