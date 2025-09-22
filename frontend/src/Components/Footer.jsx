import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export default function Footer() {
  const productLinks = [
    { name: 'Features', to: '/feature' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Templates', to: '' },
  ];

  const companyLinks = [
    { name: 'About Us', to: '/about' },
    { name: 'Careers', to: '' },
    { name: 'Partners', to: '/about' },
  ];

  const supportLinks = [
    { name: 'Help Center', to: '/contact' },
    { name: 'Contact Us', to: '/contact' },
    { name: 'Privacy Policy', to: '/privacy' },
    { name: 'Terms of Service', to: '/terms-of-service' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">SakaAI</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Automate your business communication with AI-powered WhatsApp messaging. 
              Perfect for gyms, restaurants, shops, and service businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 group">
                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 group">
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 group">
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 group">
                <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Product</h3>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}