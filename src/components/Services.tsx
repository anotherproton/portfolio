import React, { useEffect, useState } from 'react';
import { Palette, Settings, Smartphone, ShoppingCart, Zap, Code2, Layers, Globe, Database, Headphones } from 'lucide-react';

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

  const services = [
    {
      icon: Palette,
      title: 'Custom Theme Development',
      description: 'Create unique, brand-focused Shopify themes that stand out from the competition and drive conversions.',
      features: ['Responsive Design', 'Custom Sections', 'SEO Optimized', 'Brand Integration'],
      price: 'From $2,500'
    },
    {
      icon: Settings,
      title: 'Store Setup & Configuration',
      description: 'Complete Shopify store setup with payment gateways, shipping, taxes, and essential app integrations.',
      features: ['Payment Setup', 'Shipping Config', 'Tax Configuration', 'App Integration'],
      price: 'From $1,200'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimization',
      description: 'Ensure your store provides an exceptional experience across all devices with mobile-first design.',
      features: ['Mobile-First Design', 'Touch Optimization', 'Fast Loading', 'Responsive Layout'],
      price: 'From $800'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Strategy',
      description: 'Develop comprehensive e-commerce strategies to maximize sales and improve customer retention.',
      features: ['Conversion Optimization', 'User Experience', 'Sales Funnels', 'Customer Journey'],
      price: 'From $1,500'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Speed up your store with advanced optimization techniques for better user experience and SEO.',
      features: ['Page Speed', 'Image Optimization', 'Code Minification', 'CDN Integration'],
      price: 'From $1,000'
    },
    {
      icon: Code2,
      title: 'Custom App Development',
      description: 'Build custom Shopify apps to extend functionality and meet specific business requirements.',
      features: ['API Integration', 'Custom Features', 'Third-party Sync', 'Automation Tools'],
      price: 'From $3,500'
    },
    {
      icon: Layers,
      title: 'Headless Commerce',
      description: 'Modern headless solutions using Shopify as backend with React/Next.js frontend for ultimate flexibility.',
      features: ['React/Next.js', 'GraphQL APIs', 'Custom Frontend', 'Scalable Architecture'],
      price: 'From $5,000'
    },
    {
      icon: Database,
      title: 'Migration Services',
      description: 'Seamlessly migrate your existing store to Shopify with zero downtime and data integrity.',
      features: ['Data Migration', 'SEO Preservation', 'Zero Downtime', 'Testing & QA'],
      price: 'From $2,000'
    },
    {
      icon: Headphones,
      title: 'Ongoing Support',
      description: 'Continuous maintenance, updates, and support to keep your store running smoothly.',
      features: ['24/7 Support', 'Regular Updates', 'Bug Fixes', 'Performance Monitoring'],
      price: 'From $500/month'
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
            Comprehensive Shopify development services to help your business thrive in the digital marketplace.
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
                  <p className="text-gray-400 leading-relaxed mb-4">{service.description}</p>
                  <div className="text-green-500 font-bold text-lg mb-4">{service.price}</div>
                </div>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 px-6 py-3 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:border-green-500 hover:text-green-500 transition-colors">
                  Learn More
                </button>
              </div>
            );
          })}
        </div>

        <div className={`${isVisible ? 'animate-fade-in-up delay-3' : ''} text-center mt-16`}>
          <div className="bg-gradient-shopify p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Start Your Project?</h3>
            <p className="text-gray-200 mb-6">Let's discuss your requirements and create something amazing together.</p>
            <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;