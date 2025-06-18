import React, { useEffect, useState, useRef } from 'react';
import { Code, Github, Linkedin, Mail, Award, Users, Terminal, Brackets, Zap, TrendingUp, Database, Layers, Globe, Rocket, Smartphone } from 'lucide-react';

// --- IMPROVED AnimatedNumber COMPONENT ---
// Now features a smoother "ease-out" animation and handles '+' suffixes.
const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const elementRef = useRef(null);

    const endValue = parseInt(value, 10);
    const isNumeric = !isNaN(endValue);
    const suffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';

    const formatValue = (val) => {
        if (!isNumeric) return value;
        return `${Math.round(val)}${suffix}`;
    };
    
    useEffect(() => {
        if (!isNumeric) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startValue = 0;
                    const startTime = Date.now();

                    const animate = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        // Ease-out function for a smooth finish
                        const easedProgress = 1 - Math.pow(1 - progress, 4);
                        const nextValue = startValue + easedProgress * (endValue - startValue);
                        setCurrentValue(nextValue);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCurrentValue(endValue);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect(); // Animate only once
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
        return <span>{value}</span>
    }

    return <span ref={elementRef}>{formatValue(currentValue)}</span>;
};


// --- The UPGRADED Hero COMPONENT ---
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isAnimatingRole, setIsAnimatingRole] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const roles = [
    'Shopify Developer',
    'Frontend Specialist',
    'E-commerce Expert',
    'Performance Optimizer'
  ];

  const codeSnippets = [
    '{% schema %}',
    'const conversionRate = 37;',
    'if (store.fast) { customer.happy(); }',
    'return <MobileFirstUX />;',
    'npm run shopify theme dev',
    'git commit -m "feat: custom theme"',
    'console.log("Hello, Shopify!");',
    'product.json.liquid',
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

    // Improved type-and-delete animation
    let snippetIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeInterval = setInterval(() => {
        const currentSnippet = codeSnippets[snippetIndex];
        if (isDeleting) {
            setTypedText(currentSnippet.substring(0, charIndex - 1));
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                snippetIndex = (snippetIndex + 1) % codeSnippets.length;
            }
        } else {
            setTypedText(currentSnippet.substring(0, charIndex + 1));
            charIndex++;
            if (charIndex === currentSnippet.length) {
                setTimeout(() => isDeleting = true, 1500);
            }
        }
    }, isDeleting ? 60 : 120);

    // Mouse parallax effect
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 40;
        const y = (clientY - window.innerHeight / 2) / 40;
        setParallaxOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(roleInterval);
      clearInterval(typeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // NEW & IMPROVED ANIMATIONS
  const animationStyles = `
    @keyframes pop-in {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-pop-in { animation: pop-in 0.6s ease-out forwards; }

    @keyframes char-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .char-animate { 
        display: inline-block; 
        animation: char-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    
    @keyframes role-slide-up-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-100%); } }
    @keyframes role-slide-up-in { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
    .role-text-anim { display: inline-block; animation-duration: 0.4s; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); animation-fill-mode: forwards; }
    .role-out { animation-name: role-slide-up-out; }
    .role-in { animation-name: role-slide-up-in; }
    
    .text-gradient { background: linear-gradient(90deg, #34d399, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  `;

  const trustMetrics = [
    { icon: Award, value: '3+', label: 'Years Experience' },
    { icon: Rocket, value: '49+', label: 'Projects Delivered' },
    { icon: Layers, value: '27+', label: 'Custom Themes' },
    { icon: Users, value: 'Top', label: 'D2C & B2B Brands' }
  ];

  const performanceMetrics = [
    { icon: TrendingUp, label: 'Conversion Boost', value: '37%', color: 'text-green-400' },
    { icon: Smartphone, label: 'Mobile Uplift', value: '30%', color: 'text-blue-400' },
    { icon: Zap, label: 'Load Time Cut', value: '45%', color: 'text-yellow-400' },
  ];
  
  const name = "Tanuj Rajput";

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black hero-bg-pattern pt-20 pb-20">
      <style>{animationStyles}</style>
      <div className="code-rain"></div>
      
      {/* --- KEPT THE ORIGINAL FLOATING ELEMENTS --- */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="floating-element absolute top-32 right-32 w-20 h-20 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center"><Brackets className="w-6 h-6 text-green-500/60" /></div>
        <div className="floating-element absolute bottom-40 left-32 w-16 h-16 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center"><Terminal className="w-5 h-5 text-green-500/60" /></div>
        <div className="floating-element absolute top-1/3 left-1/4 w-12 h-12 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center"><Code className="w-4 h-4 text-green-500/60" /></div>
        <div className="floating-element absolute top-1/4 right-1/4 w-18 h-18 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center"><Database className="w-5 h-5 text-blue-500/60" /></div>
        <div className="floating-element absolute bottom-1/3 right-1/3 w-14 h-14 bg-purple-500/10 rounded-full border border-purple-500/20 flex items-center justify-center"><Layers className="w-4 h-4 text-purple-500/60" /></div>
        <div className="floating-element absolute top-1/2 left-1/6 w-16 h-16 bg-yellow-500/10 rounded-full border border-yellow-500/20 flex items-center justify-center"><Globe className="w-5 h-5 text-yellow-500/60" /></div>
      </div>
      <div className="absolute top-28 left-20 code-snippet px-4 py-2 rounded-lg text-green-400 text-sm opacity-60 font-mono"><span className="typing-animation">{typedText}</span><span className="animate-ping">_</span></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div 
          className="max-w-4xl mx-auto"
          style={{ transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`, transition: 'transform 0.1s linear' }}
        >
          <div className={`${isVisible ? 'opacity-100' : 'opacity-0'} mb-8`}>
            {/* --- IMPROVED NAME ANIMATION --- */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              {name.split("").map((char, index) => (
                <span key={index} className="char-animate opacity-0" style={{ animationDelay: `${index * 50}ms` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            {/* --- IMPROVED ROLE ANIMATION --- */}
            <div className="h-10 md:h-12 relative overflow-hidden text-2xl md:text-3xl font-semibold">
               <span key={currentRole} className={`role-text-anim absolute w-full left-0 right-0 ${isAnimatingRole ? 'role-out' : 'role-in'} text-gradient`}>{roles[currentRole]}</span>
            </div>
            <p className={`text-base md:text-lg text-gray-400 mt-6 max-w-3xl mx-auto leading-relaxed char-animate opacity-0`} style={{ animationDelay: `${name.length * 50 + 100}ms` }}>
              Shopify expert crafting high-converting, fast-loading stores with Liquid, JavaScript, and a focus on mobile-first UX for D2C and B2B brands.
            </p>
          </div>

          {/* --- IMPROVED METRIC BOXES ANIMATION --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {trustMetrics.map((metric, index) => (
              <div key={index} className={`trust-badge bg-gray-900/50 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20 border border-gray-800 animate-pop-in opacity-0`} style={{ animationDelay: `${300 + index * 100}ms` }}>
                <metric.icon className="w-7 h-7 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1"><AnimatedNumber value={metric.value} /></div>
                <div className="text-gray-400 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* --- IMPROVED PERFORMANCE METRICS --- */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className={`flex items-center gap-3 animate-pop-in opacity-0`} style={{ animationDelay: `${700 + index * 100}ms` }}>
                <div className="p-2 bg-gray-800 rounded-md"><metric.icon className={`w-6 h-6 ${metric.color}`} /></div>
                <div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  <div className={`text-2xl font-bold text-white`}>
                      <AnimatedNumber value={metric.value} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-pop-in opacity-0`} style={{ animationDelay: '1000ms' }}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
                <Code className="w-5 h-5" />View My Work
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-lg font-semibold text-gray-300 border-2 border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />Let's Connect
            </button>
          </div>

          <div className={`flex justify-center gap-4 animate-pop-in opacity-0`} style={{ animationDelay: '1100ms' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-full border border-gray-800 hover:border-green-400 transition-colors group backdrop-blur-sm transform hover:scale-110">
              <Github className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/tanuj-rajput-9080901a5/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-full border border-gray-800 hover:border-green-400 transition-colors group backdrop-blur-sm transform hover:scale-110">
              <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
            <a href="mailto:tanujrajput.dev@gmail.com" className="p-3 bg-gray-900/50 rounded-full border border-gray-800 hover:border-green-400 transition-colors group backdrop-blur-sm transform hover:scale-110">
              <Mail className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
