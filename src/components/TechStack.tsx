import React, { useEffect, useState, useRef } from 'react';
import { Code2, Database, Palette, Zap, Globe, Smartphone, Copy, CheckCircle, BrainCircuit, Rocket, Feather } from 'lucide-react';

// --- Custom Hook 1: useTypewriter ---
const useTypewriter = (textToType, speed = 30) => {
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

// --- Custom Hook 2: useMouseGlow (for the aurora effect) ---
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

    const techCategories = [
        {
            icon: Globe, title: 'E-commerce',
            technologies: ['Shopify', 'Shopify Plus', 'Liquid', 'GraphQL', 'REST APIs'],
            code: `// Custom Shopify section with dynamic content
{% liquid
  assign products = collections[section.settings.collection].products
  assign limit = section.settings.products_limit
%}
<div class="product-grid">
  {% for product in products limit: limit %}
    {% render 'product-card', product: product %}
  {% endfor %}
</div>`
        },
        {
            icon: Code2, title: 'Frontend',
            technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'SCSS'],
            code: `// React Hook for fetching data
import { useState, useEffect } from 'react';

function useData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);

  return { data };
}`
        },
        {
            icon: Zap, title: 'Performance',
            technologies: ['Web Vitals', 'Lighthouse', 'Bundle Analysis', 'CDN'],
            code: `// Performance optimization with dynamic imports
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => 
  import('./HeavyComponent')
);

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}`
        },
        {
            icon: Database, title: 'Backend & Tools',
            technologies: ['Node.js', 'Express', 'MongoDB', 'Git', 'Vite'],
            code: `// Simple Express.js server endpoint
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/users', (req, res) => {
  // Logic to fetch users from MongoDB
  res.json({ users: [...] });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
        },
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
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        const currentSectionRef = sectionRef.current;
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
        .glow-card {
            position: relative;
            background: linear-gradient(to right, #0a0a0a, #101010);
        }
        .glow-card::before {
            content: '';
            position: absolute;
            left: 0; top: 0; width: 100%; height: 100%;
            background: radial-gradient(circle at var(--x) var(--y), rgba(34, 197, 94, 0.15), transparent 20%);
            border-radius: 1rem;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .glow-card:hover::before { opacity: 1; }
        .code-block .token-comment { color: #6a9955; }
        .code-block .token-keyword { color: #569cd6; }
        .code-block .token-string { color: #ce9178; }
        .code-block .token-function { color: #dcdcaa; }
        .code-block .token-punctuation { color: #d4d4d4; }
        .code-block .token-operator { color: #d4d4d4; }
        .code-block .token-tag { color: #4ec9b0; }
    `;

    // A simple function for basic syntax highlighting
    const highlightSyntax = (str) => {
        return str
            .replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>')
            .replace(/\b(const|let|var|function|import|from|export|return|if|else|for|of|in|require|=>|new|await|async|class|extends|module|exports)\b/g, '<span class="token-keyword">$1</span>')
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
                    <div className="space-y-4">
                        {techCategories.map((category, index) => (
                            <div
                                key={index}
                                ref={index === activeCategory ? glowCardRef : null}
                                onClick={() => setActiveCategory(index)}
                                className={`glow-card p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${activeCategory === index ? 'border-green-400/70 scale-[1.02]' : 'border-white/10'}`}
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
                            {/* --- THIS IS THE CORRECTED CODE BLOCK --- */}
                            <pre className="p-6 text-sm overflow-x-auto min-h-[300px]">
                                <code>
                                    <span dangerouslySetInnerHTML={{ __html: highlightSyntax(typedCode) }} />
                                    <span className="animate-ping">|</span>
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
