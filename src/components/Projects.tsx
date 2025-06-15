import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, TrendingUp, Zap, Eye, BarChart3, Users, Clock } from 'lucide-react';

const Projects = () => {
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

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Mahina (mahina.co)',
      category: 'D2C Brand & AOV Strategy',
      description: 'Built a fully custom theme from a Figma design, focusing on increasing the Average Order Value (AOV) through strategic upsell and bundle integrations. Also enhanced customer service with WhatsApp chat and automated order emails.',
      image: 'https://ik.imagekit.io/6cu3kzcxt/Reusable-leakproof-period-underwear-online-_-Mahina-06-15-2025_02_30_PM.png?updatedAt=1749978229279',
      technologies: ['Shopify', 'UX Design', 'AOV Strategy', 'WhatsApp Integration', 'Theme Optimization'],
      link: 'https://mahina.co',
      metrics: {
        aovBoost: '+28%',
        speedScore: '95+',
        resolutionTime: '-40%'
      },
      metricLabels: {
        aovBoost: 'AOV Boost',
        speedScore: 'PageSpeed Score',
        resolutionTime: 'Faster Resolution'
      },
      metricIcons: {
        aovBoost: TrendingUp,
        speedScore: Zap,
        resolutionTime: Clock,
      },
      featured: true,
      year: '2024',
      role: 'Lead Developer'
    },
    {
      title: 'Mum & You (mumandyou.com)',
      category: 'Magento to Shopify Migration',
      description: 'Led the large-scale migration of a UK brand from Magento to Shopify, ensuring complete data integrity and preserving SEO URLs. Developed a custom subscription model with recurring flows via Shopify APIs and built private apps to sync inventory and user data.',
      image: 'https://ik.imagekit.io/6cu3kzcxt/mum-uk-06-15-2025_02_31_PM.png?updatedAt=1749978229304',
      technologies: ['Shopify', 'Subscription Flows', 'Private Apps', 'SEO', 'Shopify API'],
      link: 'https://mum-uk.myshopify.com',
      metrics: {
        migration: 'Seamless',
        inventory: 'Live Sync',
        theme: 'Fully Custom'
      },
      metricLabels: {
        migration: 'Data Migration',
        inventory: 'Inventory',
        theme: 'Theme'
      },
      metricIcons: {
        migration: TrendingUp,
        inventory: Zap,
        theme: Star,
      },
      featured: false,
      year: '2025',
      role: 'Lead Developer'
    },
    {
      title: 'WeMust (wemust.com)',
      category: 'Automation & UX Optimization',
      description: 'Led development of a dynamic order system with a live pricing calculator. Simplified cart and pricing logic to significantly improve checkout rates and developed a custom invoice automation system to drastically reduce manual work.',
      image: 'https://ik.imagekit.io/6cu3kzcxt/Best-Custom-DTF-Transfer-Printer-in-USA-_-We-Must-06-15-2025_02_31_PM.png?updatedAt=1749978229580',
      technologies: ['Shopify', 'Liquid', 'JavaScript', 'UX Optimization', 'Automation'],
      link: 'https://wemust.com',
      metrics: {
        checkoutRate: '+20%',
        manualWork: '-90%',
        orderSystem: 'Dynamic'
      },
      metricLabels: {
        checkoutRate: 'Checkout Rate',
        manualWork: 'Manual Work',
        orderSystem: 'Order System'
      },
      metricIcons: {
        checkoutRate: BarChart3,
        manualWork: Zap,
        orderSystem: Star,
      },
      featured: false,
      year: '2024',
      role: 'Lead Developer'
    },
    {
      title: 'Nicobar (nicobar.com)',
      category: 'Performance & UX',
      description: 'Contributed to a highly visual, brand-heavy theme by optimizing loading times through script deferrals and asset compression. Built custom filtering and sorting to improve product discovery and click-through rates.',
      image: 'https://ik.imagekit.io/6cu3kzcxt/Nicobar-Modern-mindful-India-rooted-designs-06-15-2025_02_33_PM.png?updatedAt=1749978200080',
      technologies: ['Shopify', 'Liquid', 'Theme Development', 'Performance Optimization', 'UX Design'],
      link: 'https://nicobar.com',
      metrics: {
        loadTime: '-42%',
        ctr: '+12%',
        filtering: 'Custom'
      },
      metricLabels: {
        loadTime: 'Load Time',
        ctr: 'CTR',
        filtering: 'Advanced Filtering'
      },
      metricIcons: {
        loadTime: Zap,
        ctr: Eye,
        filtering: Star,
      },
      featured: false,
      year: '2024',
      role: 'Shopify Developer'
    }
  ];

  return (
    <section id="projects" className="section-padding bg-black">
      <div className="container mx-auto px-6">
        <div className={`${isVisible ? 'animate-fade-in-up' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of projects that demonstrate my passion for creating exceptional e-commerce experiences that drive results.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${isVisible ? `animate-fade-in-up delay-${index % 2 + 1}` : ''} card-hover bg-gray-900/30 rounded-2xl border border-gray-800 overflow-hidden ${project.featured ? 'ring-1 ring-green-500/30' : ''}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                    {project.year}
                  </div>
                </div>
                
                <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-green-500 text-sm font-semibold">{project.category}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500 text-sm">{project.role}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-lg">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {Object.keys(project.metrics).map((key, i) => {
                      const MetricIcon = project.metricIcons[key];
                      return (
                        <div className="text-center" key={i}>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <MetricIcon className="w-5 h-5 text-green-500" />
                            <span className="text-green-500 font-bold text-lg">{project.metrics[key]}</span>
                          </div>
                          <span className="text-gray-500 text-sm">{project.metricLabels[key]}</span>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors font-semibold">
                      <Eye className="w-4 h-4" />
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${isVisible ? 'animate-fade-in-up delay-3' : ''} text-center mt-16`}>
          <p className="text-gray-500 mb-6">Interested in seeing more of my work?</p>
          <button className="btn-shopify px-8 py-4 rounded-lg font-semibold text-white">
            View Complete Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
