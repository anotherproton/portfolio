import React, { useEffect, useState } from 'react';
import { Mail, MessageCircle, Calendar, Coffee, Send, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      content: 'alex@alexchen.dev',
      description: 'Drop me a line anytime',
      link: 'mailto:alex@alexchen.dev'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      content: 'alexchen#1234',
      description: 'Let\'s chat in real-time',
      link: null
    },
    {
      icon: Calendar,
      title: 'Schedule a Call',
      content: 'Book 30 min',
      description: 'Discuss your project',
      link: '#'
    },
    {
      icon: Coffee,
      title: 'Coffee Chat',
      content: 'San Francisco',
      description: 'If you\'re in the area',
      link: null
    }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
  ];

  return (
    <section id="contact" className="section-padding bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className={`${isVisible ? 'animate-fade-in-up' : ''} text-center mb-16`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Create Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-1' : ''} lg:col-span-1`}>
            <h3 className="text-2xl font-bold mb-8 text-green-500">Get In Touch</h3>
            
            <div className="space-y-6 mb-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const content = method.link ? (
                  <a href={method.link} className="text-gray-300 hover:text-green-500 transition-colors font-medium">
                    {method.content}
                  </a>
                ) : (
                  <span className="text-gray-300 font-medium">{method.content}</span>
                );

                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <Icon className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">{method.title}</h4>
                      {content}
                      <p className="text-gray-500 text-sm mt-1">{method.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-black/50 p-6 rounded-2xl border border-gray-800">
              <h4 className="font-bold mb-4 text-green-500">Follow My Work</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                    </a>
                  );
                })}
              </div>
              <p className="text-gray-500 text-sm mt-4">
                I share insights about Shopify development, web performance, and the latest in e-commerce tech.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-fade-in-up delay-2' : ''} lg:col-span-2`}>
            <div className="bg-black/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-green-500">Start a Conversation</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-2 text-white">Message Sent!</h4>
                  <p className="text-gray-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-white placeholder-gray-500 resize-none"
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-shopify px-6 py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className={`${isVisible ? 'animate-fade-in-up delay-3' : ''} text-center mt-16 pt-8 border-t border-gray-800`}>
          <p className="text-gray-500">
            © 2024 Alex Chen. Built with React, TypeScript, and lots of ☕
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;