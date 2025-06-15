import React, { useEffect, useState } from 'react';
import { Palette, Settings, Smartphone, ShoppingCart, Zap, Code2, Layers, Globe, Database, Briefcase, TrendingUp } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Services updated to reflect resume skills and experience
  const services = [
    {
      icon: Palette,
      title: 'Custom Theme Development',
      description: 'Building high-performing, responsive themes from scratch based on Figma designs, achieving 80+ Lighthouse scores on mobile. ',
      features: ['Figma to Liquid', 'Mobile-First UX ', 'Theme Optimization ', 'Custom Sections'],
      price: 'Contact for quote'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Proven record of reducing load times by up to 45% through script deferrals, asset compression, and achieving PageSpeed scores of 95+. ',
      features: ['PageSpeed Enhancement ', 'Script Deferrals ', 'Asset Compression ', 'A/B Testing '],
      price: 'Contact for quote'
    },
    {
      icon: Code2,
      title: 'Private App Development',
      description: 'Developing private Shopify apps to sync real-time inventory, user data, and create custom subscription models using the Shopify API. ',
      features: ['Shopify API Integration ', 'Inventory & Data Sync ', 'Subscription Flows ', 'Bespoke Cart Logic '],
      price: 'Contact for quote'
    },
    {
      icon: TrendingUp,
      title: 'Conversion & AOV Strategy',
      description: 'Boosting AOV by up to 28% and mobile conversions by 30% through strategic UX revamps, upsell integrations, and custom logic. ',
      features: ['AOV Strategy ', 'UX Revamps ', 'Upsell & Bundle Integrations ', 'Checkout Customization '],
      price: 'Contact for quote'
    },
    {
      icon: Database,
      title: 'Migration Services',
      description: 'Seamlessly migrating large-scale brands from platforms like Magento to Shopify, while preserving SEO URLs and ensuring data integrity. ',
      features: ['Magento to Shopify ', 'Preserve SEO URLs ', 'Data Integrity ', 'Zero Downtime Strategy'],
      price: 'Contact for quote'
    },
    {
        icon: Briefcase,
        title: 'Project Ownership & QA',
        description: 'Handling end-to-end project ownership, from client calls and requirement gathering to execution, quality assurance, and final delivery. ',
        features: ['Client Communication ', 'Requirement Gathering ', 'Execution & Delivery ', 'Thorough QA '],
        price: 'Contact for quote'
    }
  ];

  return (
    <section id="services" className="section-padding bg-black">
      <div className="container mx-auto px-6">
        <div className={`${isVisible ? 'animate-fade-in-up' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A suite of specialized Shopify services designed to build, optimize, and scale your e-commerce business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`${isVisible ? `animate-fade-in-up delay-${index % 3 + 1}` : ''} card-hover bg-gray-900/50 p-8 rounded-2xl border border-gray-800 group`}
              >
                <div className="mb-6">
                  <div className="p-3 bg-gradient-shopify rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: service.description }}></p>
                  <div className="text-green-500 font-bold text-lg mb-4">{service.price}</div>
                </div>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: feature }}></span>
                    </div>
                  ))}
                </div>

               
              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
};

export default Services;
