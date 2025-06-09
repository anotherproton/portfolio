import React, { useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, ThumbsUp } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Luxe Fashion',
      company: 'Fashion E-commerce',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      rating: 5,
      text: 'Tanuj transformed our Shopify store completely. The conversion rate increased by 67% within the first month. His attention to detail and understanding of e-commerce is exceptional.',
      project: 'Complete store redesign',
      result: '+67% conversion rate'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, TechGear Pro',
      company: 'Electronics Retailer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      rating: 5,
      text: 'Working with Tanuj was a game-changer. He delivered a custom B2B solution that handles our complex pricing and inventory needs perfectly. Highly recommended!',
      project: 'B2B platform development',
      result: '+156% revenue growth'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, Botanical Beauty',
      company: 'Beauty & Wellness',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 5,
      text: 'The subscription features Tanuj built for us are incredible. Our customer retention improved dramatically, and the user experience is seamless.',
      project: 'Subscription commerce',
      result: '+89% customer retention'
    },
    {
      name: 'David Park',
      role: 'Owner, Artisan Marketplace',
      company: 'Creative Arts Platform',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      rating: 5,
      text: 'Tanuj understood our vision perfectly and created a marketplace that truly showcases our artists. The multi-vendor functionality works flawlessly.',
      project: 'Multi-vendor marketplace',
      result: '+78% artist satisfaction'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentClient = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="section-padding bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className={`${isVisible ? 'animate-fade-in-up' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what my clients say about working with me.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Testimonial */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-1' : ''} bg-black/50 rounded-2xl border border-gray-800 p-8 md:p-12 mb-12`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Quote className="w-8 h-8 text-green-500" />
                  <div className="flex gap-1">
                    {[...Array(currentClient.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6 italic">
                  "{currentClient.text}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white">{currentClient.name}</h4>
                    <p className="text-green-500 font-medium">{currentClient.role}</p>
                    <p className="text-gray-500">{currentClient.company}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Project:</div>
                    <div className="text-gray-300 font-medium mb-2">{currentClient.project}</div>
                    <div className="text-green-500 font-bold text-lg">{currentClient.result}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src={currentClient.image}
                    alt={currentClient.name}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-green-500/20"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <ThumbsUp className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-2' : ''} flex items-center justify-center gap-4 mb-12`}>
            <button
              onClick={prevTestimonial}
              className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-3' : ''} grid grid-cols-2 md:grid-cols-4 gap-6`}>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <Star className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <ThumbsUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <Quote className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-gray-400 text-sm">Repeat Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;