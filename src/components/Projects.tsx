import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Github, Eye, Zap, TrendingUp, Briefcase, Sparkles, Wand2, CheckCircle, Clock } from 'lucide-react';

// --- Reusable Component 1: Key Metric Badge ---
// A small, graphical component to highlight an impressive result.
const KeyMetric = ({ icon: Icon, value, label, isVisible, delay }) => (
  <div className={`flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: delay }}>
    <div className="flex-shrink-0 bg-green-500/10 p-2 rounded-full">
      <Icon className="w-5 h-5 text-green-400" />
    </div>
    <div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/60">{label}</p>
    </div>
  </div>
);

// --- Reusable Component 2: Project Detail Item ---
// A component to display the Challenge, Action, and Result sections.
const ProjectDetailItem = ({ icon: Icon, title, children, isVisible, delay }) => (
  <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: delay }}>
    <div className="flex items-center gap-3 mb-3">
      <Icon className="w-6 h-6 text-green-400" />
      <h4 className="text-xl font-bold text-white">{title}</h4>
    </div>
    <div className="pl-9 text-white/70 leading-relaxed">
      {children}
    </div>
  </div>
);


// --- Main Projects Component ---
const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // UPDATED: The data structure is now much more detailed and narrative-driven.
  const projects = [
    {
      title: 'Mahina',
      category: 'D2C Brand & AOV Strategy',
      timeline: 'Jan 2024 – May 2024',
      image: 'https://ik.imagekit.io/6cu3kzcxt/Reusable-leakproof-period-underwear-online-_-Mahina-06-15-2025_02_30_PM.png?updatedAt=1749978229279',
      link: 'https://mahina.co',
      challenge: "Mahina was growing fast, but they needed help boosting their average order value and making customer support more efficient. The challenge was doing this without compromising their brand experience.",
      action: "I built them a completely custom Shopify theme based on their Figma designs. The key was strategically placing upsell and cross-sell opportunities throughout the customer journey, plus integrating WhatsApp support so customers could get help instantly.",
      results: "The results spoke for themselves - not only did we see a solid boost in revenue, but customer satisfaction improved too. It's always rewarding when you can help a brand grow while making their customers happier.",
      keyMetrics: [
        { icon: TrendingUp, value: '+28%', label: 'AOV Boost' },
        { icon: Zap, value: '95+', label: 'PageSpeed Score' },
        { icon: Clock, value: '-40%', label: 'Resolution Time' },
      ],
      technologies: ['Shopify', 'AOV Strategy', 'Theme Optimization', 'WhatsApp API'],
    },
    {
      title: 'WeMust',
      category: 'Automation & UX Optimization',
      timeline: 'Sep 2024 - Feb 2025',
      image: 'https://ik.imagekit.io/6cu3kzcxt/Best-Custom-DTF-Transfer-Printer-in-USA-_-We-Must-06-15-2025_02_31_PM.png?updatedAt=1749978229580',
      link: 'https://wemust.com',
      challenge: "WeMust had a problem - their custom printing ordering process was so complex that customers were abandoning their carts, and the team was drowning in manual invoicing work.",
      action: "I built them a smart ordering system with live pricing calculations, completely rewrote their cart logic, and created an automated invoicing system that handles everything behind the scenes.",
      results: "The difference was night and day, customers could finally complete their orders easily, and the team could focus on growing the business instead of manual paperwork",
       keyMetrics: [
        { icon: CheckCircle, value: '+20%', label: 'Checkout Rate' },
        { icon: TrendingUp, value: '-90%', label: 'Manual Work' },
      ],
      technologies: ['Shopify', 'JavaScript', 'UX Optimization', 'Automation'],
    },
    {
      title: 'Mum & You',
      category: 'Magento to Shopify Migration',
      timeline: 'Apr 2025 – Jun 2025',
      image: 'https://ik.imagekit.io/6cu3kzcxt/mum-uk-06-15-2025_02_31_PM.png?updatedAt=1749978229304',
      link: 'https://mum-uk.myshopify.com',
      challenge: "Mum & You needed to move their entire UK operation from Magento to Shopify Plus - a massive undertaking that couldn't afford to lose any customer data, SEO rankings, or disrupt their subscription business.",
      action: "I handled the complete migration, built a custom subscription system using Shopify APIs, and developed specialized apps to keep everything synced in real-time.",
      results: "The migration went off without a hitch - they now have a more powerful platform that can scale with their growth, plus subscription features that work exactly how they need them to.",
       keyMetrics: [
        { icon: CheckCircle, value: 'Seamless', label: 'Data Migration' },
        { icon: TrendingUp, value: 'Custom', label: 'Subscription Flow' },
      ],
      technologies: ['Shopify Plus', 'Subscription APIs', 'Private Apps', 'SEO'],
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-green-500/10 to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-full w-1/2 bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl"></div>
        </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Here are some projects I'm really proud of. Each one came with its own unique challenges, and I loved finding creative solutions that actually moved the needle for these businesses.
          </p>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image Column */}
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/30 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm">
                        <Eye className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold">View Live Site</span>
                    </div>
                </div>
              </a>

              {/* Content Column */}
              <div className="flex flex-col">
                <p className="text-green-400 font-semibold mb-1">{project.category}</p>
                <h3 className="text-4xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-white/50 mb-6">{project.timeline}</p>
                
                <div className="space-y-6">
                    <ProjectDetailItem title="The Challenge" icon={Sparkles} isVisible={isVisible} delay={`${index * 200 + 300}ms`}>
                        <p>{project.challenge}</p>
                    </ProjectDetailItem>
                    <ProjectDetailItem title="The Action" icon={Wand2} isVisible={isVisible} delay={`${index * 200 + 400}ms`}>
                        <p>{project.action}</p>
                    </ProjectDetailItem>
                     <ProjectDetailItem title="The Results" icon={CheckCircle} isVisible={isVisible} delay={`${index * 200 + 500}ms`}>
                        <p className="mb-4">{project.results}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {project.keyMetrics.map((metric, i) => (
                                <KeyMetric key={i} {...metric} isVisible={isVisible} delay={`${index * 200 + 600 + i * 100}ms`} />
                            ))}
                        </div>
                    </ProjectDetailItem>
                </div>
                
                 <div className="flex flex-wrap gap-2 mt-8">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-white/5 text-green-300 rounded-full text-sm border border-white/10">{tech}</span>
                    ))}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
