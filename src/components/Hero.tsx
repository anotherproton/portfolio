import React, { useEffect, useState, useRef } from 'react';
import { Code, Github, Linkedin, Mail, Award, Users, Terminal, Zap, TrendingUp, Layers, Smartphone, Rocket, Database } from 'lucide-react';

// --- Reusable Component 1: AnimatedNumber ---
// This component handles the countdown/count-up animation for numbers.
// It now gracefully handles non-numeric values (like "Top") and has a smoother animation.
const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const elementRef = useRef(null);
    
    const endValue = parseInt(value, 10);
    const isNumeric = !isNaN(endValue);

    const formatValue = (val) => {
        if (!isNumeric) return value; // Return original string if not numeric
        if (typeof value === 'string' && value.includes('%')) {
            return `${Math.round(val)}%`;
        }
        if (typeof value === 'string' && value.includes('+')) {
            return `${Math.round(val)}+`;
        }
        return Math.round(val);
    };

    useEffect(() => {
        if (!isNumeric) return; // Don't run effect if value isn't a number

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startValue = 0;
                    const startTime = Date.now();

                    const animate = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart for a smooth stop
                        const nextValue = startValue + easedProgress * (endValue - startValue);
                        
                        setCurrentValue(nextValue);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCurrentValue(endValue);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = elementRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [value, duration, isNumeric, endValue]);

    if (!isNumeric) {
        return <span>{value}</span>;
    }

    return <span ref={elementRef}>{formatValue(currentValue)}</span>;
};


// --- Reusable Component 2: MetricCard ---
// This new component creates the stylish, interactive cards for your metrics.
// It includes hover effects, glow, and a modern layout.
const MetricCard = ({ icon: Icon, value, label, color, shadowColor, sublabel }) => {
    return (
        <div className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 transition-all duration-300 hover:!border-white/30 hover:-translate-y-2 hover:shadow-2xl">
            {/* The colored glow effect on hover */}
            <div className={`absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${shadowColor}`} />
            
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 rounded-lg bg-white/5 p-3">
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className="flex-1 text-left">
                    <div className="text-sm text-white/60">{label}</div>
                    <div className="text-2xl font-bold text-white">
                        <AnimatedNumber value={value} />
                        {sublabel && <span className="ml-1 text-base font-medium text-white/50">{sublabel}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Component: Hero ---
// This is the primary component for the hero section.
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isAnimatingRole, setIsAnimatingRole] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const roles = [
    'Shopify Theme Developer',
    'Frontend Specialist',
    'E-commerce Expert',
    'Performance Optimizer'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Role cycling animation
    const roleInterval = setInterval(() => {
      setIsAnimatingRole(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsAnimatingRole(false);
      }, 300);
    }, 4000);

    // Mouse parallax effect handler
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 30;
        const y = (clientY - window.innerHeight / 2) / 30;
        setParallaxOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(roleInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Unified data structure for all metrics, used by MetricCard
  const allMetrics = [
    { icon: Award, value: '3+', label: 'Years Experience', color: 'text-green-400', shadowColor: 'shadow-green-500/20' },
    { icon: Rocket, value: '49+', label: 'Projects Delivered', color: 'text-blue-400', shadowColor: 'shadow-blue-500/20' },
    { icon: Layers, value: '27+', label: 'Custom Themes Built', color: 'text-purple-400', shadowColor: 'shadow-purple-500/20' },
    { icon: Users, value: 'Top', label: 'D2C & B2B Brands', color: 'text-yellow-400', shadowColor: 'shadow-yellow-500/20' },
    { icon: TrendingUp, value: '37%', label: 'Conversion Boost', color: 'text-green-400', shadowColor: 'shadow-green-500/20' },
    { icon: Smartphone, value: '30%', label: 'Mobile-First UX', sublabel: "Uplift", color: 'text-blue-400', shadowColor: 'shadow-blue-500/20' },
    { icon: Zap, value: '45%', label: 'Load Time Cut', color: 'text-yellow-400', shadowColor: 'shadow-yellow-500/20' },
  ];

  // In-component CSS for complex animations and backgrounds
  const newStyles = `
    .hero-bg {
      background-color: #050505;
      background-image: 
        radial-gradient(circle at center, rgba(38, 166, 154, 0.08) 0%, transparent 40%),
        radial-gradient(circle at top left, rgba(79, 70, 229, 0.08) 0%, transparent 30%),
        radial-gradient(circle at bottom right, rgba(217, 70, 239, 0.08) 0%, transparent 35%);
    }
    .grid-bg {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      width: 100%; height: 100%;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 4rem 4rem;
      mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%);
      animation: pan-grid 20s linear infinite;
    }
    @keyframes pan-grid { from { background-position: 0 0; } to { background-position: -4rem -4rem; } }
    
    @keyframes role-slide-up-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-100%); } }
    @keyframes role-slide-up-in { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
    .role-text-anim { display: inline-block; animation-duration: 0.4s; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); animation-fill-mode: forwards; }
    .role-out { animation-name: role-slide-up-out; }
    .role-in { animation-name: role-slide-up-in; }

    .text-gradient { background: linear-gradient(90deg, #34d399, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    
    .btn-primary-glow { background: linear-gradient(90deg, #10b981, #2563eb); background-size: 200% 200%; transition: background-position 0.5s ease; }
    .btn-primary-glow:hover { background-position: right center; box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); }
  `;
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg py-20">
      <style>{newStyles}</style>
      <div className="grid-bg"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div 
          className="max-w-6xl mx-auto flex flex-col items-center"
          style={{ transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`, transition: 'transform 0.1s linear' }}
        >
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} mb-12 text-center`}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-100 mb-4 tracking-tighter">Tanuj Rajput</h1>
              <div className="h-10 md:h-12 relative overflow-hidden text-2xl md:text-3xl font-semibold">
                 <span className={`role-text-anim absolute w-full left-0 right-0 ${isAnimatingRole ? 'role-out' : 'role-in'} text-gradient`}>{roles[currentRole]}</span>
              </div>
              <p className="text-base md:text-lg text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
                I build high-performance, conversion-focused Shopify stores that captivate users and drive growth for ambitious D2C & B2B brands.
              </p>
          </div>

          <div className={`${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 w-full`}>
            {allMetrics.slice(0, 4).map((metric, index) => (
                <MetricCard 
                    key={index}
                    icon={metric.icon}
                    value={metric.value}
                    label={metric.label}
                    color={metric.color}
                    shadowColor={metric.shadowColor}
                    sublabel={metric.sublabel}
                />
            ))}
          </div>
          <div className={`${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 w-full lg:max-w-4xl`}>
            {allMetrics.slice(4).map((metric, index) => (
                <MetricCard 
                    key={index + 4}
                    icon={metric.icon}
                    value={metric.value}
                    label={metric.label}
                    color={metric.color}
                    shadowColor={metric.shadowColor}
                    sublabel={metric.sublabel}
                />
            ))}
          </div>

          <div className={`${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'} flex flex-col sm:flex-row gap-4 justify-center items-center`}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary-glow px-8 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
              <Code className="w-5 h-5" />View My Work
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-lg font-semibold text-gray-300 border-2 border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />Let's Connect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
