import React, { useEffect, useState, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Briefcase, Award, ThumbsUp } from 'lucide-react';

// --- Reusable Component 1: AnimatedNumber (for stats) ---
const AnimatedNumber = ({ value }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const elementRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let startValue = 0;
                const endValue = parseInt(value, 10);
                const duration = 1500;
                const startTime = Date.now();
                const animate = () => {
                    const now = Date.now();
                    const progress = Math.min((now - startTime) / duration, 1);
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    const nextValue = startValue + easedProgress * (endValue - startValue);
                    setCurrentValue(nextValue);
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [value]);

    return <span ref={elementRef}>{Math.round(currentValue)}{value.includes('+') ? '+' : ''}</span>;
};


// --- Main Testimonials Component ---
const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

 const testimonials = [
  { 
    name: 'Rajesh Verma', 
    role: 'Digital Marketing Head', 
    company: 'Nicobar.com', 
    logo: 'https://ik.imagekit.io/6cu3kzcxt/nclogo.png?updatedAt=1749978988453', 
    text: "Working with Tanuj was a breath of fresh air. He completely revamped our product filtering system and the results were immediate. Our customers can now find exactly what they're looking for, and our conversion rates have never been better.", 
    result: '+15% Conversions' 
  },
  { 
    name: 'Priya Malhotra', 
    role: 'E-commerce Manager', 
    company: 'O&O', 
    logo: 'https://ik.imagekit.io/6cu3kzcxt/OO-Logo.svg?updatedAt=1749992611749', 
    text: "Tanuj didn't just build us a theme - he built us a solution. His understanding of our brand and customer journey was spot-on. The mobile experience he created has been a game-changer for our sales.", 
    result: '+32% Mobile Sales' 
  },
  { 
    name: 'Arjun Kapoor', 
    role: 'Founder', 
    company: 'Vserv', 
    logo: 'https://ik.imagekit.io/6cu3kzcxt/without-mascot-light-bg.png?updatedAt=1749992611566', 
    text: "I've worked with several developers before, but Tanuj's approach is different. He actually listens to what you need and delivers exactly that. The custom checkout flow he built for us has reduced our cart abandonment significantly.", 
    result: '-25% Cart Abandonment' 
  },
  { 
    name: 'Kavya Singh', 
    role: 'Brand Manager', 
    company: 'Summer Madras', 
    logo: 'https://ik.imagekit.io/6cu3kzcxt/Untitled_Artwork_122.avif?updatedAt=1749992611380', 
    text: "Tanuj transformed our slow, clunky store into something we're actually proud to show customers. The performance improvements speak for themselves, but what I love most is how easy it is for our team to manage everything now.", 
    result: '40% Faster Load Times' 
  },
  { 
    name: 'Rohit Sharma', 
    role: 'Operations Head', 
    company: 'Grodd', 
    logo: 'https://ik.imagekit.io/6cu3kzcxt/download.png?updatedAt=1749992611427', 
    text: "The inventory management system Tanuj built has been a lifesaver. We were drowning in manual updates before, but now everything syncs automatically. It's given us back hours every week to focus on growing the business.", 
    result: 'Real-time Sync' 
  }
];
  
  // CONSOLIDATED STATS for a cleaner mobile layout
  const statsData = [
    { icon: Award, title: 'Experience & Scale', metrics: [{ value: '3+', label: 'Years Experience' }, { value: '49+', label: 'Projects Delivered' }] },
    { icon: ThumbsUp, title: 'Client Satisfaction', metrics: [{ value: '27+', label: 'Custom Stores' }, { value: '93%', label: 'Positive Feedback' }] }
  ];

  const startSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Increased interval for better readability
  };

  const stopSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startSlider();
    return () => stopSlider();
  }, [testimonials.length]);

  const navigate = (direction) => {
    const newIndex = direction === 'next' 
        ? (current === testimonials.length - 1 ? 0 : current + 1)
        : (current === 0 ? testimonials.length - 1 : current - 1);
    setCurrent(newIndex);
    startSlider(); // Restart timer on manual navigation
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
       <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 h-full w-1/2 bg-gradient-to-r from-green-500/10 to-transparent blur-3xl"></div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 h-full w-1/2 bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl"></div>
        </div>

     <div className="container mx-auto px-4 lg:px-[25rem] relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients say about our collaboration.
          </p>
        </div>

        {/* --- NEW Carousel Container --- */}
        <div 
            className="relative h-[480px] md:h-[420px] mb-16"
            onMouseEnter={stopSlider}
            onMouseLeave={startSlider}
        >
          {testimonials.map((testimonial, index) => {
            const offset = index - current;
            const isVisibleOnMobile = index === current;
            const style = {
                transform: `translateX(${offset * 100}%) scale(${index === current ? 1 : 0.8})`,
                opacity: index === current ? 1 : 0.4,
                zIndex: testimonials.length - Math.abs(offset),
            };

            return (
              <div 
                key={index} 
                className={`absolute w-full h-full transition-all duration-500 ease-in-out p-2 ${!isVisibleOnMobile && 'hidden md:block'}`}
                style={style}
              >
                <div className="h-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                  <div>
                    <Quote className="w-10 h-10 text-green-400 mb-4" />
                    <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img src={testimonial.logo} alt={`${testimonial.company} logo`} className="h-12 w-12 bg-white/10 p-1.5 rounded-full object-contain" />
                      <div>
                        <p className="font-bold text-white text-lg">{testimonial.name}</p>
                        <p className="text-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-semibold px-3 py-1.5 rounded-full">
                      Result: {testimonial.result}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
           {/* Navigation Arrows */}
          <button onClick={() => navigate('prev')} className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all" aria-label="Previous testimonial">
              <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={() => navigate('next')} className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all" aria-label="Next testimonial">
              <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* --- NEW Consolidated Stats Section --- */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {statsData.map((statGroup, index) => (
            <div key={index} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <statGroup.icon className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">{statGroup.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {statGroup.metrics.map((metric, i) => (
                  <div key={i}>
                    <p className="text-4xl font-bold text-green-400"><AnimatedNumber value={metric.value} /></p>
                    <p className="text-white/60">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
