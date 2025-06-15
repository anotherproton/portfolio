import React, { useEffect, useState } from 'react';
import { ChevronDown, Code, Github, Linkedin, Mail, Star, Award, Users, Coffee, Terminal, Brackets, Zap, TrendingUp, BarChart3, PieChart, Database, Layers, Globe } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [typedText, setTypedText] = useState('');

  // Roles updated to reflect resume summary
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
    'git commit -m "feat: custom theme"'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    // Typing animation for code snippets
    let currentSnippet = 0;
    let currentChar = 0;
    const typeInterval = setInterval(() => {
      if (currentChar < codeSnippets[currentSnippet].length) {
        setTypedText(codeSnippets[currentSnippet].substring(0, currentChar + 1));
        currentChar++;
      } else {
        // Pause at the end of a snippet before clearing
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

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Metrics updated based on the provided resume
  const trustMetrics = [
    { icon: Award, value: '3+', label: 'Years Experience', color: 'text-yellow-400' }, // 
    { icon: Code, value: '49+', label: 'Projects Delivered', color: 'text-blue-400' }, // 
    { icon: Star, value: '27+', label: 'Custom Stores Built', color: 'text-green-400' }, // 
    { icon: Users, value: 'Top', label: 'D2C & B2B Brands', color: 'text-purple-400' } // 
  ];

  const performanceMetrics = [
    { label: 'Conversion Boost', value: '37%', color: 'text-green-400' }, // 
    { label: 'Mobile Uplift', value: '30%', color: 'text-blue-400' }, // 
    { label: 'Load Time Cut', value: '45%', color: 'text-yellow-400' }, // 
    { label: 'Bounce Rate Drop', value: '22%', color: 'text-purple-400' } // 
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black hero-bg-pattern pt-20">
      {/* Animated code rain background */}
      <div className="code-rain"></div>
      
      {/* Enhanced floating code elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="floating-element absolute top-32 right-32 w-20 h-20 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center">
          <Brackets className="w-6 h-6 text-green-500/60" />
        </div>
        <div className="floating-element absolute bottom-40 left-32 w-16 h-16 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center">
          <Terminal className="w-5 h-5 text-green-500/60" />
        </div>
        <div className="floating-element absolute top-1/3 left-1/4 w-12 h-12 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center">
          <Code className="w-4 h-4 text-green-500/60" />
        </div>
        <div className="floating-element absolute top-1/4 right-1/4 w-18 h-18 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center">
          <Database className="w-5 h-5 text-blue-500/60" />
        </div>
        <div className="floating-element absolute bottom-1/3 right-1/3 w-14 h-14 bg-purple-500/10 rounded-full border border-purple-500/20 flex items-center justify-center">
          <Layers className="w-4 h-4 text-purple-500/60" />
        </div>
        <div className="floating-element absolute top-1/2 left-1/6 w-16 h-16 bg-yellow-500/10 rounded-full border border-yellow-500/20 flex items-center justify-center">
          <Globe className="w-5 h-5 text-yellow-500/60" />
        </div>
      </div>

      {/* Multiple floating code snippets */}
      <div className="absolute top-28 left-20 code-snippet px-4 py-2 rounded-lg text-green-400 text-sm floating-element opacity-60">
        <span className="typing-animation">{typedText}</span>
      </div>
      
      <div className="absolute top-40 right-24 code-snippet px-3 py-2 rounded-lg text-blue-400 text-xs floating-element opacity-50">
        shopify theme dev
      </div>
      
      <div className="absolute bottom-32 left-24 code-snippet px-3 py-2 rounded-lg text-purple-400 text-xs floating-element opacity-50">
        liquid.render()
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className={`${isVisible ? 'animate-fade-in-up' : ''} mb-12`}>
            
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Tanuj Rajput
            </h1>
            
            <div className="h-12 mb-8">
              <h2 className="text-xl md:text-3xl font-medium text-gradient transition-all duration-500">
                {roles[currentRole]}
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Shopify expert crafting high-converting, fast-loading stores with Liquid, JavaScript, and a focus on mobile-first UX for D2C and B2B brands. 
            </p>
          </div>

          {/* Trust Metrics */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-1' : ''} grid grid-cols-2 md:grid-cols-4 gap-6 mb-8`}>
            {trustMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="trust-badge p-6 rounded-xl text-center">
                  <Icon className={`w-6 h-6 ${metric.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </div>
              );
            })}
          </div>

          {/* Performance Metrics */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-2' : ''} flex justify-center gap-8 mb-12`}>
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-lg font-bold ${metric.color} mb-1`}>{metric.value}</div>
                <div className="text-gray-500 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Buttons - Moved below metrics */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-3' : ''} flex flex-col sm:flex-row gap-4 justify-center mb-12`}>
  <button
    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
    className="btn-shopify px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
  >
    <Code className="w-5 h-5" />
    View My Work
  </button>
  <button
    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
    className="px-8 py-4 rounded-lg font-semibold text-white border-2 border-gray-800 hover:border-green-500 transition-colors flex items-center justify-center gap-2"
  >
    <Mail className="w-5 h-5" />
    Let's Connect
  </button>
</div>

          {/* Social Links - Updated with resume info */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-4' : ''} flex justify-center gap-6 mb-16`}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-green-500 transition-colors backdrop-blur-sm">
              <Github className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/tanuj-rajput-9080901a5/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-green-500 transition-colors backdrop-blur-sm">
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" />
            </a>
            <a href="mailto:tanujrajput.dev@gmail.com" className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-green-500 transition-colors backdrop-blur-sm">
              <Mail className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" />
            </a>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Hero;
