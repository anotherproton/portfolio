import React, { useEffect, useState, useRef } from 'react';
// Adding more relevant icons for the new design
import { Code, Github, Linkedin, Mail, Award, Users, Terminal, Brackets, Zap, TrendingUp, Database, Layers, Globe, Rocket, Smartphone, MoveRight } from 'lucide-react';

// --- SVG Icons for Tech Logos ---
// Since lucide-react doesn't have brand icons, we'll define them as simple components.
const ReactIcon = () => <svg width="24" height="24" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400/70"><circle cx="0" cy="0" r="2.05" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>;
const JsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400/70"><path d="M0 0h24v24H0V0Z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"/><path d="M12 12h-1v4h1c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zm-2.5-4h-1v6h1V8z"/></svg>;
const CssIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400/70"><path d="m9.4 16.6 4.6-4.6-4.6-4.6L8 6l6 6-6 6-1.4-1.4z"/></svg>;

// --- IMPROVED AnimatedNumber COMPONENT ---
const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const elementRef = useRef(null);
    const endValue = parseInt(value, 10);
    const isNumeric = !isNaN(endValue);
    const suffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';

    useEffect(() => {
        if (!isNumeric) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let startValue = 0;
                const startTime = Date.now();
                const animate = () => {
                    const now = Date.now();
                    const progress = Math.min((now - startTime) / duration, 1);
                    const easedProgress = 1 - Math.pow(1 - progress, 4);
                    const nextValue = startValue + easedProgress * (endValue - startValue);
                    setCurrentValue(nextValue);
                    if (progress < 1) requestAnimationFrame(animate);
                    else setCurrentValue(endValue);
                };
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        const currentRef = elementRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [value, duration, isNumeric, endValue]);

    if (!isNumeric) return <span>{value}</span>;
    return <span ref={elementRef}>{`${Math.round(currentValue)}${suffix}`}</span>;
};

// --- Reusable Stat Card Component ---
const StatCard = ({ icon: Icon, value, label, delay }) => (
    <div className="glass-card text-center p-4 transition-all duration-300 hover:!border-green-400/60 hover:-translate-y-1 animate-pop-in opacity-0" style={{ animationDelay: delay }}>
        <div className="bg-white/5 inline-block p-3 rounded-lg mb-3">
            <Icon className="w-6 h-6 text-green-400" />
        </div>
        <div className="text-3xl font-bold text-white mb-1"><AnimatedNumber value={value} /></div>
        <div className="text-sm text-white/60">{label}</div>
    </div>
);


// --- REDESIGNED Hero COMPONENT ---
const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentRole, setCurrentRole] = useState(0);
    const [isAnimatingRole, setIsAnimatingRole] = useState(false);
    const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

    const roles = ['Shopify Developer', 'Frontend Specialist', 'E-commerce Expert', 'Performance Optimizer'];
    const name = "Tanuj Rajput";

    useEffect(() => {
        setIsVisible(true);
        const roleInterval = setInterval(() => {
            setIsAnimatingRole(true);
            setTimeout(() => {
                setCurrentRole((prev) => (prev + 1) % roles.length);
                setIsAnimatingRole(false);
            }, 300);
        }, 4000);
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setParallaxOffset({ x: (clientX - window.innerWidth / 2) / 40, y: (clientY - window.innerHeight / 2) / 40 });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            clearInterval(roleInterval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // --- All new styles for background, animations, and glassmorphism ---
    const newStyles = `
        .hero-bg-pattern {
            background-color: #030712; /* Dark Navy */
        }
        .mesh-gradient {
            position: absolute; inset: 0;
            background-image:
                radial-gradient(at 20% 25%, hsla(160, 100%, 75%, 0.1) 0px, transparent 50%),
                radial-gradient(at 80% 30%, hsla(240, 100%, 80%, 0.1) 0px, transparent 50%),
                radial-gradient(at 50% 80%, hsla(280, 100%, 80%, 0.1) 0px, transparent 50%);
            animation: move-gradient 20s alternate infinite;
        }
        @keyframes move-gradient {
            from { transform: translate(0, 0) scale(1); }
            to { transform: translate(20px, 50px) scale(1.2); }
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
        .floating-element { animation: float 6s ease-in-out infinite; }
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
        }
        @keyframes pop-in { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-pop-in { animation: pop-in 0.6s ease-out forwards; }
        @keyframes char-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .char-animate { display: inline-block; animation: char-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes role-slide-up-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-100%); } }
        @keyframes role-slide-up-in { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
        .role-text-anim { display: inline-block; animation-duration: 0.4s; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); animation-fill-mode: forwards; }
        .role-out { animation-name: role-slide-up-out; }
        .role-in { animation-name: role-slide-up-in; }
        .text-gradient { background: linear-gradient(90deg, #34d399, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-primary-glow {
            background: linear-gradient(90deg, #10b981, #2563eb);
            background-size: 200% 200%; transition: background-position 0.5s ease, box-shadow 0.3s ease;
        }
        .btn-primary-glow:hover {
            background-position: right center; box-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
        }
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

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg-pattern py-28">
            <style>{newStyles}</style>
            <div className="mesh-gradient"></div>
            
            {/* --- Dynamic Background Elements with Glassmorphism --- */}
            <div className="absolute inset-0 z-0" style={{ transform: `translate(${parallaxOffset.x * 2}px, ${parallaxOffset.y * 2}px)`, transition: 'transform 0.2s ease-out' }}>
                <div className="floating-element absolute top-[15%] left-[10%] p-3 glass-card" style={{animationDelay: '0s'}}><ReactIcon /></div>
                <div className="floating-element absolute top-[20%] right-[12%] p-2 glass-card" style={{animationDelay: '-1s'}}><Terminal className="w-4 h-4 text-white/70" /></div>
                <div className="floating-element absolute bottom-[25%] left-[20%] p-2.5 glass-card" style={{animationDelay: '-2s'}}><JsIcon /></div>
                <div className="floating-element absolute bottom-[15%] right-[15%] p-3 glass-card" style={{animationDelay: '-3s'}}><Database className="w-5 h-5 text-purple-400/70" /></div>
                <div className="floating-element absolute top-[50%] left-[30%] p-2 glass-card hidden md:flex" style={{animationDelay: '-4s'}}><CssIcon /></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="max-w-4xl mx-auto" style={{ transform: `translate(-${parallaxOffset.x}px, -${parallaxOffset.y}px)`, transition: 'transform 0.1s linear' }}>
                    <div className={`${isVisible ? 'opacity-100' : 'opacity-0'} mb-10`}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tighter">
                            {name.split("").map((char, i) => (
                                <span key={i} className="char-animate opacity-0" style={{ animationDelay: `${i * 50}ms` }}>{char === " " ? "\u00A0" : char}</span>
                            ))}
                        </h1>
                        <div className="h-10 md:h-12 relative overflow-hidden text-2xl md:text-3xl font-semibold">
                            <span key={currentRole} className={`role-text-anim absolute w-full left-0 right-0 ${isAnimatingRole ? 'role-out' : 'role-in'} text-gradient`}>{roles[currentRole]}</span>
                        </div>
                        <p className={`text-base md:text-lg text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed char-animate opacity-0`} style={{ animationDelay: `${name.length * 50 + 100}ms` }}>
                            I craft high-performance, conversion-focused Shopify stores that captivate users and drive growth for ambitious brands.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {trustMetrics.map((metric, index) => (
                            <StatCard key={index} {...metric} delay={`${500 + index * 100}ms`} />
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
                        {performanceMetrics.map((metric, index) => (
                            <div key={index} className={`flex items-center gap-3 animate-pop-in opacity-0`} style={{ animationDelay: `${900 + index * 100}ms` }}>
                                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                                <span className="text-white/80">{metric.label}</span>
                                <span className="font-bold text-white text-lg"><AnimatedNumber value={metric.value} /></span>
                            </div>
                        ))}
                    </div>

                    <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-pop-in opacity-0`} style={{ animationDelay: '1200ms' }}>
                        <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary-glow px-8 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:scale-105">
                            View My Work <MoveRight className="w-5 h-5" />
                        </button>
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-lg font-semibold text-white/80 border-2 border-white/20 hover:border-white/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                            Let's Connect
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
