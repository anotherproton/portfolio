import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, TrendingUp, Zap, Eye } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);

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
      title: 'Luxe Fashion Collective',
      category: 'E-commerce Platform',
      description: 'A premium fashion marketplace featuring custom product configurators, advanced filtering, and seamless multi-vendor management.',
      image: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg',
      technologies: ['Shopify Plus', 'React', 'GraphQL', 'Liquid', 'SCSS'],
      metrics: {
        conversion: '+67%',
        speed: '1.8s',
        revenue: '+145%'
      },
      featured: true,
      year: '2024',
      role: 'Lead Developer'
    },
    {
      title: 'Botanical Beauty Co.',
      category: 'Subscription Commerce',
      description: 'Sustainable beauty brand with subscription management, personalized product recommendations, and carbon footprint tracking.',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg',
      technologies: ['Shopify', 'JavaScript', 'Subscription APIs', 'Custom Apps'],
      metrics: {
        conversion: '+52%',
        speed: '2.1s',
        revenue: '+89%'
      },
      year: '2024',
      role: 'Full-Stack Developer'
    },
    {
      title: 'TechGear Pro',
      category: 'B2B E-commerce',
      description: 'Professional electronics store with bulk ordering, custom pricing tiers, and advanced inventory management.',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      technologies: ['Shopify Plus', 'Node.js', 'Custom APIs', 'Webhooks'],
      metrics: {
        conversion: '+73%',
        speed: '1.6s',
        revenue: '+156%'
      },
      year: '2023',
      role: 'Technical Lead'
    },
    {
      title: 'Artisan Marketplace',
      category: 'Multi-vendor Platform',
      description: 'Curated marketplace for independent artists with commission tracking, artist profiles, and custom shipping solutions.',
      image: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg',
      technologies: ['Shopify', 'Liquid', 'Custom Sections', 'Third-party Integrations'],
      metrics: {
        conversion: '+41%',
        speed: '2.3s',
        revenue: '+78%'
      },
      year: '2023',
      role: 'Frontend Developer'
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
            A showcase of projects that demonstrate my passion for creating exceptional e-commerce experiences.
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
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-green-500 font-bold text-lg">{project.metrics.conversion}</span>
                      </div>
                      <span className="text-gray-500 text-sm">Conversion Rate</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Zap className="w-5 h-5 text-green-500" />
                        <span className="text-green-500 font-bold text-lg">{project.metrics.speed}</span>
                      </div>
                      <span className="text-gray-500 text-sm">Load Time</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-5 h-5 text-green-500" />
                        <span className="text-green-500 font-bold text-lg">{project.metrics.revenue}</span>
                      </div>
                      <span className="text-gray-500 text-sm">Revenue Growth</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors font-semibold">
                      <Eye className="w-4 h-4" />
                      View Project
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors">
                      <Github className="w-4 h-4" />
                      Case Study
                    </button>
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