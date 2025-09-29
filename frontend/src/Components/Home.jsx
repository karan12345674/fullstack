import React, { useEffect, useState } from 'react';
import { Sun, Moon, Zap, Globe, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Features array
  const features = [
    {
      icon: Zap,
      title: "Bulk Messages",
      description:
        "Deliver Your Message Instantly to Everyone — Anytime, Anywhere",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Globe,
      title: "Lead Generate",
      description:
        "Smart Leads, Real Growth — Unlock New Opportunities with Every Message",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Sparkles,
      title: "AI Agent",
      description:
        "Your smart assistant that engages, responds, and converts in real-time",
      gradient: "from-pink-500 to-pink-600",
    },
  ];

  useEffect(() => {
    const globeScript = document.createElement('script');
    globeScript.type = 'module';
    globeScript.textContent = `
      import createGlobe from 'https://cdn.skypack.dev/cobe';

      let phi = 0;
      let canvas = document.getElementById("cobe");

      if (canvas && !canvas.getAttribute('data-globe-initialized')) {
        canvas.setAttribute('data-globe-initialized', 'true');
        
        const globe = createGlobe(canvas, {
          devicePixelRatio: 2,
          width: 1000,
          height: 1000,
          phi: 0,
          theta: 0,
          dark: ${isDarkMode ? 1 : 0},
          diffuse: 1.2,
          scale: 1,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: ${isDarkMode ? '[0.3, 0.3, 0.9]' : '[0.8, 0.7, 0.9]'},
          markerColor: ${isDarkMode ? '[0.9, 0.5, 1]' : '[0.7, 0.3, 0.9]'},
          glowColor: ${isDarkMode ? '[0.2, 0.2, 1]' : '[0.8, 0.6, 0.9]'},
          offset: [0, 0],
          markers: [
            { location: [37.7595, -122.4367], size: 0.03 },
            { location: [40.7128, -74.006], size: 0.1 },
            { location: [51.5074, -0.1278], size: 0.05 },
            { location: [35.6762, 139.6503], size: 0.05 },
            { location: [22.3193, 114.1694], size: 0.03 },
            { location: [-33.8688, 151.2093], size: 0.03 },
          ],
          onRender: (state) => {
            state.phi = phi;
            phi += 0.005;
          },
        });
      }
    `;
    
    document.body.appendChild(globeScript);

    return () => {
      const scripts = document.querySelectorAll('script[type="module"]');
      scripts.forEach(s => {
        if (s.textContent.includes('createGlobe')) {
          s.remove();
        }
      });
      const canvas = document.getElementById("cobe");
      if (canvas) {
        canvas.removeAttribute('data-globe-initialized');
      }
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"} font-light min-h-screen`}>
      
      {/* Toggle button */}
      <div className="flex justify-end p-6">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-purple-50 transition-all"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="h-5 w-5 text-gray-300" /> : <Moon className="h-5 w-5 text-gray-600" />}
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-br from-indigo-900/20 via-black to-black" : "bg-gradient-to-br from-purple-100/50 via-white to-white"} z-0`}></div>
        
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            
            {/* Text */}
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 leading-tight">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? "from-indigo-400 to-purple-400" : "from-purple-600 to-pink-500"}`}>SakaAI –</span> Smarter Engagement, Faster Growth
              </h1>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-xl md:text-2xl mb-8 max-w-lg font-extralight tracking-wide`}>
                No missed leads. No late replies. SakaAI talks to your clients in real-time, helping them choose and buy your products with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
    to="/freetrial"
    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-center"
  >
    Start my trial
  </Link>
                
              </div>
            </div>

            {/* Globe */}
            <div className="md:w-1/2 relative">
              <div className="relative h-[500px] w-[500px] mx-auto">
                <canvas
                  id="cobe"
                  style={{ width: '500px', height: '500px' }}
                  width="1000"
                  height="1000"
                  className="relative z-10"
                ></canvas>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-16"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">93%</p>
              <p className="text-gray-400">Faster workflow</p>
            </div>
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">Human-like</p>
              <p className="text-gray-400">conversations</p>
            </div>
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">24/7</p>
              <p className="text-gray-400">Support available</p>
            </div>
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">99.9%</p>
              <p className="text-gray-400">Uptime guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose NexusAI Section */}
      <section className="py-20 relative bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">SakaAI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your AI Agent that grows with your business
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}