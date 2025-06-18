import React, { useEffect, useState, useRef } from 'react';
import { Code2, Database, Palette, Zap, Globe, Smartphone, Copy, CheckCircle, BrainCircuit, Rocket, Feather } from 'lucide-react';

// --- Custom Hook 1: useTypewriter ---
const useTypewriter = (textToType, speed = 25) => {
    const [typedText, setTypedText] = useState('');
    
    useEffect(() => {
        setTypedText('');
        if (textToType) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < textToType.length) {
                    setTypedText(prev => prev + textToType.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [textToType, speed]);

    return typedText;
};

// --- Custom Hook 2: useMouseGlow ---
const useMouseGlow = (ref) => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ref.current.style.setProperty('--x', `${x}px`);
                ref.current.style.setProperty('--y', `${y}px`);
            }
        };
        const currentRef = ref.current;
        if (currentRef) {
            currentRef.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [ref]);
};


// --- Main TechStack Component ---
const TechStack = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0);
    const [copied, setCopied] = useState(false);
    const sectionRef = useRef(null);

    // --- UPDATED: Restored the full, detailed tech stack with new code snippets ---
    const techCategories = [
        {
            icon: Globe, title: 'E-commerce',
            technologies: ['Shopify', 'Shopify Plus', 'Liquid', 'Shopify CLI', 'GraphQL', 'REST APIs'],
            code: `// Shopify Liquid: Fetching and displaying products
{% liquid
  assign collection = collections[section.settings.collection]
  assign product_limit = section.settings.limit | default: 4
%}
<div class="product-grid">
  {% for product in collection.products limit: product_limit %}
    {% render 'product-card', product: product %}
  {% endfor %}
</div>`
        },
        {
            icon: Code2, title: 'Frontend',
            technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'SCSS', 'JavaScript ES6+'],
            code: `// React Hook for responsive screen size
import { useState, useEffect } from 'react';

export const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};`
        },
         {
            icon: Zap, title: 'Performance',
            technologies: ['Web Vitals', 'Lighthouse', 'Bundle Analysis', 'Image Optimization', 'CDN', 'Caching'],
            code: `// Using Intersection Observer for lazy loading
const images = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
});

images.forEach(img => observer.observe(img));`
        },
        {
            icon: Database, title: 'Backend & Tools',
            technologies: ['Node.js', 'Express', 'MongoDB', 'Git', 'Webpack', 'Vite'],
            code: `// Node.js: Creating a simple API endpoint
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`
        },
        {
            icon: Palette, title: 'Design & UX',
            technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Responsive Design', 'Accessibility', 'Animation'],
            code: `/* CSS for a smooth, accessible focus ring */
:focus-visible {
  outline: 3px solid #34d399;
  outline-offset: 2px;
  box-shadow: 0 0 0 5px rgba(52, 211, 153, 0.2);
  border-radius: 4px;
  transition: outline 0.2s ease, box-shadow 0.2s ease;
}`
        },
        {
            icon: Smartphone, title: 'Mobile & PWA',
            technologies: ['Progressive Web Apps', 'Mobile-First', 'Touch Optimization', 'Offline Support'],
            code: `// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered! Scope: ', registration.scope);
      })
      .catch(err => {
        console.log('Service Worker registration failed: ', err);
      });
  });
}`
        }
    ];

    const currentFocusItems = [
        { icon: Feather, text: "Shopify 2.0 theme architecture" },
        { icon: Rocket, text: "Headless commerce with Hydrogen" },
        { icon: BrainCircuit, text: "Advanced performance optimization" }
    ];

    const typedCode = useTypewriter(techCategories[activeCategory].code, 20);
    const glowCardRef = useRef(null);
    useMouseGlow(glowCardRef);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1 });
        const currentSectionRef = sectionRef.current;
        if (currentSectionRef) observer.observe(currentSectionRef);
        return () => {
            if (currentSectionRef) observer.unobserve(currentSectionRef);
        };
    }, []);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(techCategories[activeCategory].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const newStyles = `
        .glow-card::before {
            content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            background: radial-gradient(circle at var(--x) var(--y), rgba(34, 197, 94, 0.15), transparent 20%);
            border-radius: 1rem; opacity: 0; transition: opacity 0.3s;
        }
        .glow-card:hover::before { opacity: 1; }
        .code-block .token-comment { color: #6a9955; }
        .code-block .token-keyword { color: #569cd6; }
        .code-block .token-string { color: #ce9178; }
        .code-block .token-function { color: #dcdcaa; }
        .code-block .token-tag { color: #4ec9b0; }
        .code-block .token-property { color: #9cdcfe; }
        .code-block .token-punctuation { color: #d4d4d4; }
    `;

    const highlightSyntax = (str) => {
        return str
            .replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>')
            .replace(/\b(const|let|var|function|import|from|export|return|if|else|for|of|in|require|=>|new|await|async|class|extends|module|exports|document|window|console|process|__dirname)\b/g, '<span class="token-keyword">$1</span>')
            .replace(/(\w+)(?=\()/g, '<span class="token-function">$1</span>')
            .replace(/('.*?'|".*?"|`.*?`)/gs, '<span class="token-string">$1</span>');
    };

    return (
        <section id="tech-stack" ref={sectionRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
            <style>{newStyles}</style>
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-gray-900/50 to-transparent -z-10"></div>
            
            <div className="container mx-auto px-4">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        My Digital <span className="text-gradient">Toolkit</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-3xl mx-auto">
                        The tools and technologies I use to architect, build, and optimize exceptional digital experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Left Column: Interactive Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {techCategories.map((category, index) => (
                            <div
                                key={index}
                                ref={index === activeCategory ? glowCardRef : null}
                                onClick={() => setActiveCategory(index)}
                                className={`glow-card relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 h-full ${activeCategory === index ? 'border-green-400/70 scale-[1.02] bg-[#111]' : 'border-white/10 bg-[#0d1117]'}`}
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className={`p-2 rounded-lg transition-colors duration-300 ${activeCategory === index ? 'bg-green-500/10' : 'bg-white/5'}`}>
                                        <category.icon className={`w-6 h-6 transition-colors duration-300 ${activeCategory === index ? 'text-green-400' : 'text-white/70'}`} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">{category.title}</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.technologies.map((tech) => (
                                        <span key={tech} className={`px-2.5 py-1 rounded-full text-xs transition-colors duration-300 ${activeCategory === index ? 'bg-green-500/10 text-green-300' : 'bg-white/5 text-white/60'}`}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Code Display and Focus */}
                    <div className="sticky top-28">
                         <div className="code-block bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl shadow-black/40">
                            <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#fc625d] rounded-full"></div>
                                    <div className="w-3 h-3 bg-[#fdbc40] rounded-full"></div>
                                    <div className="w-3 h-3 bg-[#35cd4b] rounded-full"></div>
                                </div>
                                 <button onClick={handleCopy} className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                                    {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <pre className="p-6 text-sm overflow-x-auto min-h-[300px]">
                                <code>
                                    <span dangerouslySetInnerHTML={{ __html: highlightSyntax(typedCode) }} />
                                    <span className="animate-ping text-white/80">|</span>
                                </code>
                            </pre>
                        </div>
                        <div className="mt-6 bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10">
                             <h4 className="text-xl font-bold mb-4 text-white">Current Focus</h4>
                             <div className="space-y-3">
                                {currentFocusItems.map(item => (
                                    <div key={item.text} className="flex items-center gap-3">
                                        <div className="p-1.5 bg-green-500/10 rounded-full">
                                            <item.icon className="w-4 h-4 text-green-400" />
                                        </div>
                                        <span className="text-white/80">{item.text}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
