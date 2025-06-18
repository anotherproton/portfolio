import React, { useEffect, useState, useRef } from 'react';
import { Coffee, MapPin, Calendar, Heart, GraduationCap, Briefcase, Zap, Code, BarChart, Palette, Rocket } from 'lucide-react';

// --- Reusable Component 1: Animated Skill Bar ---
// This component creates a progress bar that animates when it becomes visible.
const SkillBar = ({ skill, percentage, level, isVisible, delay }) => {
  return (
    <div className={`transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: delay }}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-white/90">{skill}</span>
        <span className="text-sm font-medium text-green-400">{level}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-400 to-teal-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
};


// --- Reusable Component 2: Timeline Item ---
// This component structures each event in the "My Journey" timeline.
const TimelineItem = ({ icon: Icon, title, date, description, isVisible, delay }) => {
  return (
    <div className={`relative pl-12 pb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: delay }}>
      {/* The dot and line for the timeline */}
      <div className="absolute left-0 top-1.5 h-full w-px bg-white/10"></div>
      <div className="absolute left-[-5px] top-[5px] h-3 w-3 rounded-full bg-green-500 ring-4 ring-black"></div>
      
      <div className="absolute left-[-22px] top-0 bg-green-500/10 p-2 rounded-full">
        <Icon className="w-5 h-5 text-green-400" />
      </div>
      
      <p className="font-bold text-lg text-white/90">{title}</p>
      <p className="text-sm text-white/50 mb-2">{date}</p>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};


// --- Main Component: About ---
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // We can unobserve after it's visible to prevent re-triggering
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillsData = [
    { skill: 'Shopify Theme & App Dev', percentage: 95, level: 'Expert' },
    { skill: 'Frontend Performance', percentage: 90, level: 'Advanced' },
    { skill: 'JavaScript (React & Vanilla)', percentage: 92, level: 'Advanced' },
    { skill: 'UX & Conversion Optimization', percentage: 85, level: 'Proficient' },
  ];

  const journeyData = [
    { icon: GraduationCap, title: "B.Tech in Computer Science", date: "Foundation", description: "My journey began with a solid foundation in computer science, sparking a deep curiosity for web technologies and e-commerce." },
    { icon: Code, title: "Specialized in E-commerce", date: "Focus", description: "I quickly gravitated towards the dynamic world of e-commerce, honing my skills in Shopify and WordPress to build scalable, user-centric online stores." },
    { icon: Rocket, title: "Delivering High-Impact Solutions", date: "Growth", description: "Today, I partner with D2C & B2B brands, turning complex requirements into elegant, high-converting digital experiences that drive measurable results." }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-t from-green-500/20 to-transparent blur-3xl"></div>
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            I craft high-performance e-commerce experiences where beautiful design, clean code, and user-centric strategy converge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Column: My Journey (Timeline) */}
          <div className="lg:col-span-2">
            <h3 className={`text-3xl font-bold mb-8 text-white transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>My Journey</h3>
            <div className="relative">
              {/* The main timeline bar that will be "drawn" */}
              <div className={`absolute left-[1px] top-0 h-full w-px bg-white/10 transition-all duration-1000 ease-out ${isVisible ? 'scale-y-100' : 'scale-y-0'}`} style={{transformOrigin: 'top'}}></div>
              {journeyData.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  {...item}
                  isVisible={isVisible}
                  delay={`${index * 200 + 300}ms`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Skills & Details */}
          <div className="lg:col-span-3">
             {/* Glass Card for Skills */}
            <div className={`bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '200ms'}}>
              <h3 className="text-3xl font-bold mb-8 text-white">What I Do Best</h3>
              <div className="space-y-6">
                {skillsData.map((skill, index) => (
                  <SkillBar 
                    key={index}
                    {...skill}
                    isVisible={isVisible}
                    delay={`${index * 150 + 500}ms`}
                  />
                ))}
              </div>
            </div>
            
            {/* Personal Details Card */}
            <div className={`mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '400ms'}}>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/70">Noida/Delhi, India</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Calendar className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/70">Available for work</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Coffee className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/70">Fueled by Coffee</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Heart className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/70">Open Source Lover</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
