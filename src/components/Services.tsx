import React, { useEffect, useState, useRef } from 'react';
import { Palette, Zap, Code2, TrendingUp, Database, Briefcase, Check, ArrowRight } from 'lucide-react';

// --- Reusable Component: ServiceCard ---
// A dedicated component for the service cards to encapsulate the complex styling and animation.
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
      <div className="space-y-3 mb-8">
        {features.map((feature, featureIndex) => (
          <div key={featureIndex} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-white/80">{feature}</span>
          </div>
        ))}
      </div>

      {/* Spacer to push button to the bottom */}
      <div className="flex-grow"></div> 

      {/* Action Button */}
      <button className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-white/5 border border-white/20 rounded-lg text-white font-semibold transition-all duration-300 group-hover:bg-green-500 group-hover:text-black group-hover:border-green-500">
        Learn More <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};


// --- Main Services Component ---
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
      description: 'Building high-performing, responsive themes from scratch based on Figma designs, achieving 80+ Lighthouse scores.',
      features: ['Figma to Liquid', 'Mobile-First UX', 'Theme Optimization', 'Custom Sections'],
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Proven record of reducing load times by up to 45% through script deferrals, asset compression, and achieving 95+ PageSpeed scores.',
      features: ['PageSpeed Enhancement', 'Script Deferrals', 'Asset Compression', 'A/B Testing'],
    },
    {
      icon: Code2,
      title: 'Private App Development',
      description: 'Developing private Shopify apps to sync real-time inventory and create custom subscription models using the Shopify API.',
      features: ['Shopify API Integration', 'Inventory & Data Sync', 'Subscription Flows', 'Bespoke Cart Logic'],
    },
    {
      icon: TrendingUp,
      title: 'Conversion & AOV Strategy',
      description: 'Boosting AOV by up to 28% and mobile conversions by 30% through strategic UX revamps and upsell integrations.',
      features: ['AOV Strategy', 'UX Revamps', 'Upsell & Bundle Integrations', 'Checkout Customization'],
    },
    {
      icon: Database,
      title: 'Migration Services',
      description: 'Seamlessly migrating brands from platforms like Magento to Shopify, preserving SEO URLs and ensuring complete data integrity.',
      features: ['Magento to Shopify', 'Preserve SEO URLs', 'Data Integrity', 'Zero Downtime Strategy'],
    },
    {
      icon: Briefcase,
      title: 'Project Ownership & QA',
      description: 'Handling end-to-end project ownership, from client communication and requirement gathering to execution and final delivery.',
      features: ['Client Communication', 'Requirement Gathering', 'Execution & Delivery', 'Thorough QA'],
    }
  ];

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
            A suite of specialized Shopify services designed to build, optimize, and scale your e-commerce business.
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
      </div>
    </section>
  );
};

export default Services;
