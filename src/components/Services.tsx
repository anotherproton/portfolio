import React, { useEffect, useState, useRef } from 'react';
import { Palette, Zap, Code2, TrendingUp, Database, Briefcase, Check, ArrowDown } from 'lucide-react';

// --- Reusable Component: ServiceCard (UPDATED) ---
// The "Learn More" button has been removed from the card.
// The card now focuses solely on presenting the service information.
const ServiceCard = ({ icon: Icon, title, description, features, isVisible, delay }) => {
  return (
    <div 
      className={`group relative flex flex-col bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 transition-all duration-500 ease-out hover:!border-green-400/50 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: delay }}
    >
      {/* The background glow effect on hover */}
      <div className="absolute top-0 left-0 h-full w-full rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10" style={{background: 'radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0) 60%)'}}></div>

      {/* Card Content */}
      <div className="mb-6">
        <div className="mb-4 inline-block p-3 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 group-hover:bg-green-500/10 group-hover:border-green-500/30 group-hover:scale-110">
          <Icon className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white/70 leading-relaxed">{description}</p>
      </div>
      
      {/* Features List */}
      <div className="space-y-3">
        {features.map((feature, featureIndex) => (
          <div key={featureIndex} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-white/80">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Main Services Component (UPDATED) ---
const Services = () => {
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

  const servicesData = [
    {
      icon: Palette,
      title: 'Custom Theme Development',
      description: 'I build custom Shopify themes from your Figma designs that look amazing and perform brilliantly. My themes consistently hit 80+ Lighthouse scores because speed matters for conversions.',
      features: ['Figma to Liquid', 'Mobile-First UX', 'Theme Optimization', 'Custom Sections'],
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Ive helped stores cut their load times by up to 45% using smart optimizations like script deferrals and asset compression. Fast sites sell more - its that simple.',
      features: ['PageSpeed Enhancement', 'Script Deferrals', 'Asset Compression', 'A/B Testing'],
    },
    {
      icon: Code2,
      title: 'Private App Development',
      description: 'I create custom Shopify apps when you need something specific that doesnt exist yet. Whether its syncing inventory in real-time or building subscription flows, Ive got you covered.',
      features: ['Shopify API Integration', 'Inventory & Data Sync', 'Subscription Flows', 'Bespoke Cart Logic'],
    },
    {
      icon: TrendingUp,
      title: 'Conversion & AOV Strategy',
      description: 'I help stores increase their average order value by up to 28% through smart UX improvements and strategic upsell placements. Every visitor should be worth more to your business.',
      features: ['AOV Strategy', 'UX Revamps', 'Upsell & Bundle Integrations', 'Checkout Customization'],
    },
    {
      icon: Database,
      title: 'Migration Services',
      description: 'Moving to Shopify from another platform? I handle everything - from preserving your SEO rankings to making sure not a single customer record gets lost in the process.',
      features: ['Magento to Shopify', 'Preserve SEO URLs', 'Data Integrity', 'Zero Downtime Strategy'],
    },
    {
      icon: Briefcase,
      title: 'Project Ownership & QA',
      description: 'I take full ownership of your project from start to finish. You will always know whats happening, when its happening, and you can trust that everything will be delivered exactly as promised',
      features: ['Client Communication', 'Requirement Gathering', 'Execution & Delivery', 'Thorough QA'],
    }
  ];

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-20 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-green-500/10 to-transparent blur-3xl"></div>
            <div className="absolute -bottom-20 -right-40 h-96 w-96 rounded-full bg-gradient-to-bl from-purple-500/10 to-transparent blur-3xl"></div>
        </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Here's how I can help your business grow. I've focused my expertise on the areas that really make a difference for Shopify stores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              isVisible={isVisible}
              delay={`${index * 150}ms`}
            />
          ))}
        </div>

        {/* --- NEW: Central Call-to-Action Button --- */}
        <div className={`mt-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '900ms' }}>
            <p className="text-xl text-white/80 mb-4">Have a project in mind?</p>
            <button
                onClick={handleScrollToContact} 
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:bg-green-500 hover:scale-105 shadow-lg shadow-green-600/20"
            >
                Let's Chat About It
                <ArrowDown className="w-5 h-5" />
            </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
