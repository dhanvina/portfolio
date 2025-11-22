
import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Brain, Code, ChevronRight, Share2, Mail, Github, Linkedin, Layers, Workflow } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import SkillChart from './components/SkillChart';
import ProjectCard from './components/ProjectCard';
import AIDashboard from './components/AIDashboard';
import AITrainingStudio from './components/AITrainingStudio';
import MLOpsPipeline from './components/MLOpsPipeline';
import RevealOnScroll from './components/RevealOnScroll';
import { PROJECTS, EXPERIENCE, TECH_STACK } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!mounted) return <div className="bg-black h-screen w-full" />;

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-mono relative">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      
      {/* Navigation Bar - Sticky Left or Top depending on mobile */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo('home')}>
              <div className="w-3 h-3 bg-white animate-pulse group-hover:bg-green-500 transition-colors" />
              <span className="font-bold tracking-wider text-white group-hover:text-green-500 transition-colors">N_DHANVINA</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['HOME', 'ABOUT', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'AI_STUDIO', 'MLOPS', 'AI_LAB'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className={`hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/5 ${
                      activeSection === item.toLowerCase() ? 'text-white border-b-2 border-white' : 'text-neutral-500'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-16">
        {/* Section: Home / Hero */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center px-4 border-b border-neutral-900">
          <Hero onNavigate={scrollTo} />
        </section>

        {/* Section: About - Reduced Padding */}
        <section id="about" className="py-16 border-b border-neutral-900 bg-neutral-950/20">
          <About />
        </section>

        {/* Section: Projects */}
        <section id="projects" className="py-24 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="flex items-center gap-4 mb-12">
                <Cpu className="w-8 h-8 text-white" />
                <h2 className="text-3xl font-bold text-white tracking-tight">DEPLOYED_SYSTEMS</h2>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, index) => (
                <RevealOnScroll key={project.id} delay={index * 100} className="h-full">
                  <ProjectCard project={project} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Skills & Analytics */}
        <section id="skills" className="py-24 border-b border-neutral-900 bg-neutral-950/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Tech Stack Grid */}
              <div>
                <RevealOnScroll>
                   <div className="flex items-center gap-4 mb-8">
                    <Layers className="w-8 h-8 text-white" />
                    <h2 className="text-3xl font-bold text-white tracking-tight">TECH_ARSENAL</h2>
                  </div>
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                    Comprehensive stack specialized for end-to-end AI development, from <span className="text-white">data engineering</span> to <span className="text-white">model deployment</span>.
                  </p>
                </RevealOnScroll>
                
                <div className="grid grid-cols-1 gap-6">
                  {TECH_STACK.map((stack, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 100}>
                      <div className="border border-neutral-800 bg-black p-4 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.05)] transition-all duration-300 group">
                        <h3 className="text-xs font-bold text-green-500 mb-3 tracking-wider uppercase flex items-center gap-2">
                          <span className="w-1 h-1 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                          {stack.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {stack.skills.map((skill) => (
                            <span key={skill} className="text-sm text-neutral-300 bg-neutral-900 px-2 py-1 border border-neutral-800 hover:text-white hover:border-neutral-600 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
              
              {/* Radar Chart */}
              <div className="sticky top-24">
                 <RevealOnScroll delay={300}>
                   <div className="flex items-center gap-4 mb-8 lg:justify-end">
                    <Brain className="w-8 h-8 text-white" />
                    <h2 className="text-3xl font-bold text-white tracking-tight">NEURAL_MATRIX</h2>
                  </div>
                  <div className="bg-black border border-neutral-800 p-6 relative hover:border-neutral-700 transition-colors duration-500">
                    <div className="absolute top-0 left-0 bg-white text-black text-xs px-2 py-1 font-bold">FIG_1.1</div>
                    <SkillChart />
                  </div>
                </RevealOnScroll>
              </div>

            </div>
          </div>
        </section>

         {/* Section: Experience */}
         <section id="experience" className="py-24 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <RevealOnScroll>
               <div className="flex items-center gap-4 mb-12">
                <Terminal className="w-8 h-8 text-white" />
                <h2 className="text-3xl font-bold text-white tracking-tight">EXECUTION_LOG</h2>
              </div>
            </RevealOnScroll>
            
            <div className="relative border-l border-neutral-800 ml-4 space-y-12">
              {EXPERIENCE.map((job, index) => (
                <RevealOnScroll key={index} delay={index * 200}>
                  <div className="pl-8 relative group">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-neutral-500 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{job.role}</h3>
                      <span className="text-sm text-neutral-500 font-mono">{job.period}</span>
                    </div>
                    <h4 className="text-green-500 mb-4 font-mono text-sm">{job.company}</h4>
                    
                    <ul className="list-disc list-outside ml-4 space-y-2 mb-6">
                      {job.description.map((desc, i) => (
                        <li key={i} className="text-neutral-400 leading-relaxed pl-2 marker:text-neutral-600 hover:text-neutral-200 transition-colors">
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <span key={tech} className="text-xs border border-neutral-800 px-2 py-1 text-neutral-500 hover:text-white hover:border-neutral-600 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section: AI Training Studio */}
        <section id="ai_studio" className="py-24 border-b border-neutral-900 bg-neutral-950/30">
           <RevealOnScroll>
             <AITrainingStudio />
           </RevealOnScroll>
        </section>

        {/* Section: MLOps Pipeline (NEW) */}
        <section id="mlops" className="py-24 border-b border-neutral-900">
           <RevealOnScroll>
             <MLOpsPipeline />
           </RevealOnScroll>
        </section>

        {/* Section: AI Lab / Neural Operations Center */}
        <section id="ai_lab" className="py-10 border-b border-neutral-900 bg-neutral-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <RevealOnScroll>
               <div className="flex items-center gap-4 mb-6">
                <Code className="w-8 h-8 text-white" />
                <h2 className="text-3xl font-bold text-white tracking-tight">NEURAL_OPERATIONS_CENTER</h2>
              </div>
              <div className="w-full">
                <AIDashboard />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white tracking-wider hover:text-green-500 transition-colors cursor-default">N_DHANVINA</span>
              <span className="text-xs text-neutral-600">LEAD AI ENGINEER // ndhanvina07@gmail.com</span>
            </div>
            
            <div className="flex gap-6">
              <a href="https://github.com/dhanvina" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transform hover:scale-110 transition-all"><Github className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transform hover:scale-110 transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:ndhanvina07@gmail.com" className="text-neutral-500 hover:text-white transform hover:scale-110 transition-all"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
