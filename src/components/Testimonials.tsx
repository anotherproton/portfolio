import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, ThumbsUp, Briefcase } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // useRef to hold the interval ID, so it doesn't get reset on every render
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      name: 'Asha Mewara',
      role: 'Shopify Project Manager',
      company: 'Mahina.co',
      logo: 'https://ik.imagekit.io/6cu3kzcxt/Mahina_Logo_330x.avif?updatedAt=1749979000137',
      rating: 5,
      text: "Tanuj's expertise in theme development is remarkable. He took our Figma designs and turned them into a high-performing, beautiful theme. The new upsell and bundle features have directly contributed to our AOV growth.",
      project: 'Custom Theme & AOV Strategy',
      result: '+28% Average Order Value'
    },
    {
      name: 'Sarah Slate',
      role: 'Head of E-Commerce',
      company: 'Mum & You',
      logo: 'https://ik.imagekit.io/6cu3kzcxt/logo-mumandyoudotcom.webp?updatedAt=1749979000523',
      rating: 5,
      text: "The migration from Magento to Shopify was a massive undertaking, and Tanuj handled it flawlessly. His work on our custom subscription model has been a game-changer for customer retention. A brilliant and reliable developer.",
      project: 'Magento to Shopify Migration',
      result: 'Custom Subscription Model'
    },
    {
      name: 'Amit Kumar',
      role: 'Founder',
      company: 'WeMust.com',
      logo: 'https://ik.imagekit.io/6cu3kzcxt/We_Must_Logo_New.avif?updatedAt=1749979000620',
      rating: 5,
      text: "The custom automation system Tanuj built for us has saved countless hours of manual work. His ability to understand complex requirements and deliver an elegant, effective solution is exactly what we needed.",
      project: 'Dynamic Order & Invoice Automation',
      result: '-90% Manual Work'
    },
    {
      name: 'Kavya Sethi',
      role: 'Manager of E-commerce',
      company: 'Nicobar.com',
      logo: 'https://ik.imagekit.io/6cu3kzcxt/nclogo.png?updatedAt=1749978988453',
      rating: 5,
      text: "Tanuj's performance optimizations had a direct impact on our site's speed and user experience. The custom filtering he implemented improved product discovery and our click-through rate saw a significant lift.",
      project: 'Performance & UX Optimization',
      result: '+12% Click-Through Rate'
    }
  ];

  // Function to start the auto-scroll timer
  const startSlider = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Set a new interval
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000); // 3 seconds
  };

  // Function to stop the auto-scroll timer
  const stopSlider = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Start the slider when the component mounts
  useEffect(() => {
    startSlider();
    // Clean up the interval when the component unmounts
    return () => stopSlider();
  }, []);


  const handleNavClick = (index: number) => {
    setCurrentTestimonial(index);
    // Restart the timer whenever user manually navigates
    startSlider();
  };
  
  const nextTestimonial = () => {
     handleNavClick((currentTestimonial + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
     handleNavClick((currentTestimonial - 1 + testimonials.length) % testimonials.length);
  };


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

    return () => {
        if(element) observer.unobserve(element)
    };
  }, []);
  
  const currentClient = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="section-padding bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className={`${isVisible ? 'animate-fade-in-up' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what my clients say about our collaboration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div 
            className={`${isVisible ? 'animate-fade-in-up delay-1' : ''} bg-black/50 rounded-2xl border border-gray-800 p-8 md:p-12 mb-12`}
            onMouseEnter={stopSlider}
            onMouseLeave={startSlider}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Quote className="w-8 h-8 text-green-500" />
                <div className="flex gap-1">
                  {[...Array(currentClient.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6 italic min-h-[150px] md:min-h-[120px]">
                "{currentClient.text}"
              </blockquote>
              
              {/* This is the responsive container that was fixed */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img src={currentClient.logo} alt={`${currentClient.company} logo`} className="h-12 w-auto bg-white/10 p-2 rounded-lg object-contain" />
                  <div>
                    <h4 className="text-xl font-bold text-white">{currentClient.name}</h4>
                    <p className="text-green-500 font-medium">{currentClient.role}</p>
                  </div>
                </div>
                
                <div className="text-left md:text-right">
                  <div className="text-sm text-gray-500 mb-1">Project Focus:</div>
                  <div className="text-gray-300 font-medium mb-2">{currentClient.project}</div>
                  <div className="text-green-500 font-bold text-lg">{currentClient.result}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-2' : ''} flex items-center justify-center gap-4 mb-12`}>
            <button
              onClick={prevTestimonial}
              className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-3' : ''} grid grid-cols-2 md:grid-cols-4 gap-6`}>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">3+</div>
              <div className="text-gray-400 text-sm">Years of Experience</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <Briefcase className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">49+</div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <ThumbsUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">27+</div>
              <div className="text-gray-400 text-sm">Custom Stores Built</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-gray-800 text-center">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">5/5</div>
              <div className="text-gray-400 text-sm">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
