
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Database, Code, Cpu, Layers, BookOpen, Globe, Activity, Terminal, 
  Search, Menu, X, ArrowUpRight, Sparkles 
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';
import { Resource } from './types';

// Data from provided HTML
const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'SQL Database Guide',
    description: 'Interactive SQL tutorial with live query editor and practical examples.',
    tags: ['Database', 'SQL'],
    icon: Database,
    accent: 'text-[#a8fbd3]' // Mint
  },
  {
    id: '2',
    title: 'Software Engineering',
    description: 'Comprehensive guide to software development methodologies and best practices.',
    tags: ['Software', 'Theory'],
    icon: Code,
    accent: 'text-[#4fb7b3]' // Teal
  },
  {
    id: '3',
    title: 'Computer Hardware',
    description: 'Essential guide to components, architecture, and how everything works together.',
    tags: ['Hardware', 'Theory'],
    icon: Cpu,
    accent: 'text-[#637ab9]' // Periwinkle
  },
  {
    id: '4',
    title: 'Data Processing Modes',
    description: 'Understand batch, online, distributed, and parallel processing strategies.',
    tags: ['Theory', 'Processing'],
    icon: Layers,
    accent: 'text-[#a8fbd3]'
  },
  {
    id: '5',
    title: 'DSE ICT Exam Prep',
    description: 'Practice questions, study tips, and comprehensive exam preparation resources.',
    tags: ['Exam', 'Practice'],
    icon: BookOpen,
    accent: 'text-fuchsia-400'
  },
  {
    id: '6',
    title: 'HTML Learning Tool',
    description: 'Interactive HTML editor with live preview and comprehensive web development guide.',
    tags: ['Web', 'HTML', 'Interactive'],
    icon: Globe,
    accent: 'text-[#4fb7b3]'
  },
  {
    id: '7',
    title: 'Python Algorithm Visualizer',
    description: 'Interactive visualizations with step-by-step explanations for classic algorithms.',
    tags: ['Algorithms', 'Visualization'],
    icon: Activity,
    accent: 'text-[#637ab9]'
  },
  {
    id: '8',
    title: 'JavaScript Interactive Course',
    description: 'Step-by-step interactive JavaScript lessons complete with progress tracking.',
    tags: ['JavaScript', 'Visualization'],
    icon: Terminal,
    accent: 'text-[#a8fbd3]'
  }
];

const FILTERS = [
  "All", "Database", "SQL", "Software", "Theory", "Hardware", 
  "Processing", "Exam", "Practice", "Web", "HTML", 
  "Interactive", "Algorithms", "Visualization", "JavaScript"
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredResources = RESOURCES.filter(resource => {
    const matchesFilter = activeFilter === "All" || resource.tags.includes(activeFilter);
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">HPCSS ICT</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Home', 'Resources', 'About'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <a 
          href="/ict-v1.1.0.apk"
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Download App
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Home', 'Resources', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <a 
              href="/ict-v1.1.0.apk"
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Download App
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative h-[90vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl"
        >
           {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-mono text-[#a8fbd3] tracking-[0.2em] uppercase mb-6 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Beta Release</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center mb-6">
            <GradientText 
              text="ICT HUB" 
              as="h1" 
              className="text-[15vw] md:text-[12vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-xl font-light max-w-2xl mx-auto text-gray-300 leading-relaxed px-4 mb-10"
          >
            Modern learning destination featuring interactive visualizations, curated study notes, and practical practice sets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
             <a href="#resources" onClick={(e) => { e.preventDefault(); scrollToSection('resources'); }} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#4fb7b3] text-black font-bold uppercase tracking-widest rounded-full hover:bg-[#a8fbd3] transition-colors shadow-[0_0_30px_rgba(79,183,179,0.3)] hover:shadow-[0_0_50px_rgba(168,251,211,0.5)] cursor-pointer" data-hover="true">
               Start Learning <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
          </motion.div>
        </motion.div>
      </header>

      {/* RESOURCES SECTION */}
      <section id="resources" className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Resources</h2>
            
            {/* Search */}
            <div className="relative max-w-lg mx-auto mb-10 group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] rounded-full blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
              <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 ring-1 ring-white/10 focus-within:ring-[#4fb7b3]/50 transition-all">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search topics..." 
                  className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500 font-mono text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                    activeFilter === filter 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                  data-hover="true"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#4fb7b3]/30 transition-all duration-300 hover:-translate-y-2"
                  data-hover="true"
                >
                  <div className="mb-6 flex justify-between items-start">
                    <div className={`p-4 rounded-xl bg-black/40 border border-white/5 ${resource.accent}`}>
                      <resource.icon className="w-8 h-8" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 font-heading leading-tight">{resource.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {resource.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredResources.length === 0 && (
             <div className="text-center py-20 text-gray-500 font-mono">
               No resources found matching your criteria.
             </div>
          )}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10">
         <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                    Master <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Complexity</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    HPCSS ICT Revision Hub centralizes curriculum-aligned resources, walkthroughs, and interactive tools so students can master computational thinking with confidence. 
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    From fundamentals to advanced algorithms, our goal is to deliver a modern-first learning experience that balances theory, applied exercises, and exam readiness across every topic strand.
                  </p>
               </div>
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4fb7b3] to-[#637ab9] rounded-2xl rotate-6 blur-2xl opacity-20" />
                  <div className="relative bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                     <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                       <Activity className="text-[#a8fbd3]" /> Live Visualization
                     </h3>
                     <p className="text-sm text-gray-400 mb-6">
                        This static preview distills the essence of the live animations. In the full platform, you'll experience GSAP-driven transitions, dynamic filters, and real-time code execution.
                     </p>
                     <div className="flex gap-4 pt-4 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">12+</div>
                          <div className="text-[10px] uppercase tracking-widest text-gray-500">Modules</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">50+</div>
                          <div className="text-[10px] uppercase tracking-widest text-gray-500">Topics</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">JavaScript</a></li>
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">Python</a></li>
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">Algorithms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">Visualizers</a></li>
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">Practice</a></li>
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">Downloads</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#4fb7b3] transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
               <div className="font-heading text-2xl font-bold text-white mb-2">HPCSS ICT</div>
               <p className="text-xs text-gray-500">
                 © 2025 HPCSS ICT Revision Hub. <br/>
                 Built for performance & accessibility.
               </p>
            </div>
          </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;
