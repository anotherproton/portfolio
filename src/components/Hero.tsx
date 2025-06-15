import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Code, Github, Linkedin, Mail, Star, Award, Users, Coffee, Terminal, Brackets, Zap, TrendingUp, BarChart3, PieChart, Database, Layers, Globe } from 'lucide-react';

// A new component to handle the number animation
const AnimatedNumber = ({ value, duration = 1500 }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const elementRef = useRef(null);

    const formatValue = (val) => {
        // This function handles both percentages and raw numbers
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
                    const endValue = parseInt(value);
                    const startTime = Date.now();

                    const animate = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const nextValue = startValue + progress * (endValue - startValue);
                        setCurrentValue(nextValue);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.1 }
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
  const [isAnimating, setIsAnimating] = useState(false);

  const roles = [
    'Shopify Developer',
    'Frontend Specialist',
    'E-commerce Expert',
    'Performance Optimizer'
  ];

  // More code snippets added
  const codeSnippets = [
    '{% schema %}',
    'const conversionRate = 37;',
    'if (store.fast) { customer.happy(); }',
    'return <MobileFirstUX />;',
    'npm run shopify theme dev',
    'git commit -m "feat: custom theme"',
    'console.log("Hello, World!");',
    'theme.liquid.render()',
    'product.json'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const roleInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    let currentSnippet = 0;
    let currentChar = 0;
    const typeInterval = setInterval(() => {
      if (currentChar < codeSnippets[currentSnippet].length) {
        setTypedText(codeSnippets[currentSnippet].substring(0, currentChar + 1));
        currentChar++;
      } else {
        setTimeout(() => {
          currentSnippet = (currentSnippet + 1) % codeSnippets.length;
          currentChar = 0;
          setTypedText('');
        }, 2000);
      }
    }, 100);

    return () => {
      clearInterval(roleInterval);
      clearInterval(typeInterval);
    };
  }, []);

  const animationStyles = `
    @keyframes slide-fade-in {
      from { opacity: 0; transform: translateY(1em); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-fade-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-1em); }
    }
    .role-text {
      display: inline-block;
      transition: all 0.5s ease-in-out;
      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }
    .fade-in { animation-name: slide-fade-in; }
    .fade-out { animation-name: slide-fade-out; }
  `;

  const trustMetrics = [
    { icon: Award, value: '3+', label: 'Years Experience', color: 'text-yellow-400' },
    { icon: Code, value: '49+', label: 'Projects Delivered', color: 'text-blue-400' },
    { icon: Star, value: '27+', label: 'Custom Stores Built', color: 'text-green-400' },
    { icon: Users, value: 'Top', label: 'D2C & B2B Brands', color: 'text-purple-400' }
  ];

  const performanceMetrics = [
    { label: 'Conversion Boost', value: '37%', color: 'text-green-400' },
    { label: 'Mobile Uplift', value: '30%', color: 'text-blue-400' },
    { label: 'Load Time Cut', value: '45%', color: 'text-yellow-400' },
    { label: 'Bounce Rate Drop', value: '22%', color: 'text-purple-400' }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black hero-bg-pattern pt-20">
      <style>{animationStyles}</style>
      <div className="code-rain"></div>
      
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="floating-element absolute top-32 right-32 w-20 h-20 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center"><Brackets className="w-6 h-6 text-green-500/60" /></div>
        <div className="floating-element absolute bottom-40 left-32 w-16 h-16 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center"><Terminal className="w-5 h-5 text-green-500/60" /></div>
        <div className="floating-element absolute top-1/3 left-1/4 w-12 h-12 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center"><Code className="w-4 h-4 text-green-500/60" /></div>
        <div className="floating-element absolute top-1/4 right-1/4 w-18 h-18 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center"><Database className="w-5 h-5 text-blue-500/60" /></div>
        <div className="floating-element absolute bottom-1/3 right-1/3 w-14 h-14 bg-purple-500/10 rounded-full border border-purple-500/20 flex items-center justify-center"><Layers className="w-4 h-4 text-purple-500/60" /></div>
        <div className="floating-element absolute top-1/2 left-1/6 w-16 h-16 bg-yellow-500/10 rounded-full border border-yellow-500/20 flex items-center justify-center"><Globe className="w-5 h-5 text-yellow-500/60" /></div>
      </div>

      <div className="absolute top-28 left-20 code-snippet px-4 py-2 rounded-lg text-green-400 text-sm floating-element opacity-60"><span className="typing-animation">{typedText}</span></div>
      <div className="absolute top-40 right-24 code-snippet px-3 py-2 rounded-lg text-blue-400 text-xs floating-element opacity-50">shopify theme dev</div>
      <div className="absolute bottom-32 left-24 code-snippet px-3 py-2 rounded-lg text-purple-400 text-xs floating-element opacity-50">liquid.render()</div>

      <div className="container mx-auto px-6 text-center relative z-10 pt-12">
        <div className="max-w-6xl mx-auto">
          <div className={`${isVisible ? 'animate-fade-in-up' : ''} mb-12`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Tanuj Rajput</h1>
            <div className="h-12 mb-8 relative overflow-hidden">
               <h2 className={`text-xl md:text-3xl font-medium text-gradient absolute w-full left-0 right-0 role-text ${isAnimating ? 'fade-out' : 'fade-in'}`}>{roles[currentRole]}</h2>
            </div>
            <p className="text-base md:text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">Shopify expert crafting high-converting, fast-loading stores with Liquid, JavaScript, and a focus on mobile-first UX for D2C and B2B brands.</p>
          </div>

          {/* Trust Metrics with hover effect */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-1' : ''} grid grid-cols-2 md:grid-cols-4 gap-6 mb-8`}>
            {trustMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="trust-badge p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20">
                  <Icon className={`w-6 h-6 ${metric.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </div>
              );
            })}
          </div>

          {/* Performance Metrics with animated numbers */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-2' : ''} flex flex-wrap justify-center gap-8 mb-12`}>
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-lg font-bold ${metric.color} mb-1`}>
                    <AnimatedNumber value={metric.value} />
                </div>
                <div className="text-gray-500 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className={`${isVisible ? 'animate-fade-in-up delay-3' : ''} flex flex-col sm:flex-row gap-4 justify-center mb-12`}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-shopify px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2"><Code className="w-5 h-5" />View My Work</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-lg font-semibold text-white border-2 border-gray-800 hover:border-green-500 transition-colors flex items-center justify-center gap-2"><Mail className="w-5 h-5" />Let's Connect</button>
          </div>

          <div className={`${isVisible ? 'animate-fade-in-up delay-4' : ''} flex justify-center gap-6 mb-16`}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-green-500 transition-colors backdrop-blur-sm"><Github className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" /></a>
            <a href="https://linkedin.com/in/tanuj-rajput-9080901a5/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-green-500 transition-colors backdrop-blur-sm"><Linkedin className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" /></a>
            <a href="mailto:tanujrajput.dev@gmail.com" className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-green-500 transition-colors backdrop-blur-sm"><Mail className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
