import React, { useEffect, useState, useRef } from 'react';
// Updated icon imports for the new design
import { Code, Github, Linkedin, Mail, Award, Users, Terminal, Zap, TrendingUp, Layers, Globe, Smartphone, Rocket, BarChart3, PieChart, Database } from 'lucide-react';

// The AnimatedNumber component is well-written and will be kept as is.
const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const elementRef = useRef(null);

    const formatValue = (val) => {
        if (typeof value === 'string' && value.includes('%')) {
            return `${Math.round(val)}%`;
        }
        return Math.round(val);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startValue = 0;
                    const endValue = parseInt(value, 10);
                    const startTime = Date.now();

                    const animate = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        // Using an easing function for a more natural animation
                        const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                        const nextValue = startValue + easedProgress * (endValue - startValue);
                        
                        setCurrentValue(nextValue);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            // Ensure the final value is exact
                            setCurrentValue(endValue);
                        }
                    };
                    requestAnimationFrame(animate);
                    // Disconnect the observer after animation starts to prevent re-triggering
                    observer.disconnect();
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [value, duration]);

    return <span ref={elementRef}>{formatValue(currentValue)}</span>;
};


const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isAnimatingRole, setIsAnimatingRole] = useState(false);
  
  // NEW: State for mouse parallax effect
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const roles = [
    'Shopify Theme Developer',
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
      }, 300); // Shorter transition time
    }, 4000);

    // Typing effect for code snippets
    let currentSnippetIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeTimeout;

    const type = () => {
      const currentSnippet = codeSnippets[currentSnippetIndex];
      let delay = isDeleting ? 60 : 120;

      if (isDeleting) {
        setTypedText(currentSnippet.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentSnippet.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentSnippet.length) {
        delay = 2000; // Pause at the end of a word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentSnippetIndex = (currentSnippetIndex + 1) % codeSnippets.length;
        delay = 500; // Pause before typing new word
      }

      typeTimeout = setTimeout(type, delay);
    };

    type(); // Start the typing effect

    // Mouse parallax effect handler
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 30; // Divide by a factor to reduce movement
        const y = (clientY - window.innerHeight / 2) / 30;
        setParallaxOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(roleInterval);
      clearTimeout(typeTimeout); // Clear the typing timeout
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // NEW & IMPROVED: In-component CSS for animations and background
  const newStyles = `
    .hero-bg {
      background-color: #050505;
      background-image: 
        radial-gradient(circle at center, rgba(38, 166, 154, 0.1) 0%, transparent 40%),
        radial-gradient(circle at top left, rgba(79, 70, 229, 0.1) 0%, transparent 30%),
        radial-gradient(circle at bottom right, rgba(217, 70, 239, 0.1) 0%, transparent 35%);
    }
    .grid-bg {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100%; height: 100%;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 4rem 4rem;
      mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%);
      animation: pan-grid 20s linear infinite;
    }
    @keyframes pan-grid {
      from { background-position: 0 0; }
      to { background-position: -4rem -4rem; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    .floating-element {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes role-slide-up-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-100%); }
    }
    @keyframes role-slide-up-in {
      from { opacity: 0; transform: translateY(100%); }
      to { opacity: 1; transform: translateY(0); }
    }
    .role-text-anim {
      display: inline-block;
      animation-duration: 0.4s;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
      animation-fill-mode: forwards;
    }
    .role-out { animation-name: role-slide-up-out; }
    .role-in { animation-name: role-slide-up-in; }

    .text-gradient {
      background: linear-gradient(90deg, #34d399, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .btn-primary-glow {
        background: linear-gradient(90deg, #10b981, #2563eb);
        background-size: 200% 200%;
        transition: background-position 0.5s ease;
    }
    .btn-primary-glow:hover {
        background-position: right center;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
    }
  `;

  // UPDATED: Redesigned trust and performance metrics
  const trustMetrics = [
    { icon: Award, value: '3+', label: 'Years Experience' },
    { icon: Rocket, value: '49+', label: 'Projects Delivered' },
    { icon: Layers, value: '27+', label: 'Custom Themes Built' },
    { icon: Users, value: 'Top', label: 'D2C & B2B Brands' }
  ];

  const performanceMetrics = [
    { icon: TrendingUp, label: 'Conversion Boost', value: '37%', color: 'text-green-400' },
    { icon: Smartphone, label: 'Mobile-First UX', value: '30%', color: 'text-blue-400', sublabel: "Uplift" },
    { icon: Zap, label: 'Load Time Cut', value: '45%', color: 'text-yellow-400' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg pt-20">
      <style>{newStyles}</style>
      <div className="grid-bg"></div>
      
      {/* Background Decor Elements */}
      <div className="absolute inset-0 z-0" style={{ transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)` }}>
        <div className="floating-element absolute top-1/4 left-[15%] w-16 h-16 bg-green-500/5 border border-green-500/10 rounded-full flex items-center justify-center" style={{animationDelay: '0s'}}><Code className="w-6 h-6 text-green-400/70" /></div>
        <div className="floating-element absolute bottom-1/4 right-[15%] w-20 h-20 bg-blue-500/5 border border-blue-500/10 rounded-full flex items-center justify-center" style={{animationDelay: '-2s'}}><Database className="w-8 h-8 text-blue-400/70" /></div>
        <div className="floating-element absolute top-1/2 left-[30%] w-12 h-12 bg-purple-500/5 border border-purple-500/10 rounded-xl flex items-center justify-center" style={{animationDelay: '-4s'}}><Terminal className="w-5 h-5 text-purple-400/70" /></div>
      </div>
      
      {/* Dynamic Code Snippets */}
      <div className="absolute top-24 left-10 md:left-20 code-snippet px-4 py-2 rounded-lg text-green-400 text-sm opacity-50 font-mono select-none" style={{ transform: `translate(-${parallaxOffset.x * 0.5}px, -${parallaxOffset.y * 0.5}px)` }}>
        {/* THIS IS THE FIX: Using {' > '} to render the character as a string literal */}
        {'> '}
        <span className="typing-animation">{typedText}</span>
        <span className="animate-ping">_</span>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div 
          className="max-w-4xl mx-auto flex flex-col items-center"
          // Parallax effect on the main content block
          style={{ transform: `translate(-${parallaxOffset.x}px, -${parallaxOffset.y}px)`, transition: 'transform 0.1s linear' }}
        >
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} mb-8`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-100 mb-4 tracking-tighter">Tanuj Rajput</h1>
            <div className="h-10 md:h-12 relative overflow-hidden text-2xl md:text-3xl font-semibold">
               <span className={`role-text-anim absolute w-full left-0 right-0 ${isAnimatingRole ? 'role-out' : 'role-in'} text-gradient`}>{roles[currentRole]}</span>
            </div>
            <p className="text-base md:text-lg text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
              I build high-performance, conversion-focused Shopify stores that captivate users and drive growth for ambitious D2C & B2B brands.
            </p>
          </div>

          {/* REDESIGNED: Trust Metrics as badges */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'} grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 w-full max-w-3xl`}>
            {trustMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/80 hover:-translate-y-1">
                <metric.icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{metric.value}</div>
                <div className="text-gray-400 text-xs md:text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
          
          {/* REDESIGNED: Performance Metrics as stat cards */}
           <div className={`${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'} flex flex-wrap justify-center gap-4 md:gap-6 mb-12`}>
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                <div className={`p-2 bg-gray-800 rounded-md`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                  <div className="text-gray-400 text-sm leading-tight">{metric.label}</div>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber value={metric.value} />
                    {metric.sublabel && <span className="text-base font-medium text-gray-500 ml-1">{metric.sublabel}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'} flex flex-col sm:flex-row gap-4 justify-center items-center mb-12`}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary-glow px-8 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
              <Code className="w-5 h-5" />View My Work
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-lg font-semibold text-gray-300 border-2 border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />Let's Connect
            </button>
          </div>

          <div className={`${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'} flex justify-center gap-4`}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-full border border-gray-800 hover:border-green-400 transition-colors group">
              <Github className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/tanuj-rajput-9080901a5/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-full border border-gray-800 hover:border-green-400 transition-colors group">
              <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
            <a href="mailto:tanujrajput.dev@gmail.com" className="p-3 bg-gray-900/50 rounded-full border border-gray-800 hover:border-green-400 transition-colors group">
              <Mail className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
