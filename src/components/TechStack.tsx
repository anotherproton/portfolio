import React, { useEffect, useState } from 'react';
import { Code2, Database, Palette, Zap, Globe, Smartphone } from 'lucide-react';

const TechStack = () => {
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

    const element = document.getElementById('tech-stack');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const techCategories = [
    {
      icon: Code2,
      title: 'Frontend',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'SCSS', 'JavaScript ES6+']
    },
    {
      icon: Globe,
      title: 'E-commerce',
      technologies: ['Shopify', 'Shopify Plus', 'Liquid', 'Shopify CLI', 'GraphQL', 'REST APIs']
    },
    {
      icon: Database,
      title: 'Backend & Tools',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Git', 'Webpack', 'Vite']
    },
    {
      icon: Palette,
      title: 'Design & UX',
      technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Responsive Design', 'Accessibility', 'Animation']
    },
    {
      icon: Zap,
      title: 'Performance',
      technologies: ['Web Vitals', 'Lighthouse', 'Bundle Analysis', 'Image Optimization', 'CDN', 'Caching']
    },
    {
      icon: Smartphone,
      title: 'Mobile & PWA',
      technologies: ['Progressive Web Apps', 'Mobile-First', 'Touch Optimization', 'Offline Support', 'Push Notifications']
    }
  ];

  const codeSnippet = `// Custom Shopify section with dynamic content
{% liquid
  assign products = collections[section.settings.collection].products
  assign limit = section.settings.products_limit | default: 8
%}

<div class="product-grid" data-aos="fade-up">
  {% for product in products limit: limit %}
    <div class="product-card">
      <img src="{{ product.featured_image | img_url: '400x400' }}" 
           alt="{{ product.title }}" loading="lazy">
      <h3>{{ product.title }}</h3>
      <span class="price">{{ product.price | money }}</span>
    </div>
  {% endfor %}
</div>`;

  return (
    <section id="tech-stack" className="section-padding bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className={`${isVisible ? 'animate-fade-in-up' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The tools and technologies I use to bring ideas to life and create exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className={`${isVisible ? 'animate-fade-in-up delay-1' : ''}`}>
            <h3 className="text-2xl font-bold mb-8 text-green-500">Technologies & Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="bg-black/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <Icon className="w-5 h-5 text-green-500" />
                      </div>
                      <h4 className="font-semibold text-gray-300">{category.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`${isVisible ? 'animate-fade-in-up delay-2' : ''}`}>
            <h3 className="text-2xl font-bold mb-8 text-green-500">Code Sample</h3>
            <div className="code-block">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-500 text-sm ml-2">product-grid.liquid</span>
              </div>
              <pre className="text-gray-300">
                <code>{codeSnippet}</code>
              </pre>
            </div>

            <div className="mt-8 bg-black/50 p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold mb-4 text-green-500">Current Focus</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Shopify 2.0 theme development</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Headless commerce with Hydrogen</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Performance optimization techniques</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Advanced Liquid templating</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;