import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Brain, Code, ChevronRight, Share2, Mail, Github, Linkedin } from 'lucide-react';
import Hero from './components/Hero';
import SkillChart from './components/SkillChart';
import ProjectCard from './components/ProjectCard';
import AIDashboard from './components/AIDashboard';
import { PROJECTS, EXPERIENCE } from './constants';

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
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="w-3 h-3 bg-white animate-pulse" />
              <span className="font-bold tracking-wider text-white">N_DHANVINA</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['HOME', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'AI_LAB'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className={`hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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

        {/* Section: Projects */}
        <section id="projects" className="py-24 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-12">
              <Cpu className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white tracking-tight">DEPLOYED_SYSTEMS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Section: Skills & Analytics */}
        <section id="skills" className="py-24 border-b border-neutral-900 bg-neutral-950/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="flex items-center gap-4 mb-8">
                  <Brain className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white tracking-tight">NEURAL_CAPABILITIES</h2>
                </div>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                  Specialized in designing scalable machine learning architectures. 
                  Core competencies include <span className="text-white">Computer Vision</span> (YOLO, CNNs), <span className="text-white">LLM Integration</span> (LangChain, Gemini), and production-grade <span className="text-white">MLOps</span> (Docker, MLflow).
                </p>
                
                <div className="space-y-6">
                  {['Deep Learning (PyTorch/TensorFlow)', 'MLOps (Docker, MLflow, DVC)', 'LLMs & Generative AI', 'Backend API (Django/FastAPI)'].map((skill, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-white group-hover:text-neutral-200 transition-colors">{skill}</span>
                        <span className="text-neutral-600">{(98 - idx * 3)}%</span>
                      </div>
                      <div className="w-full bg-neutral-900 h-1">
                        <div 
                          className="bg-white h-1 transition-all duration-1000 ease-out"
                          style={{ width: `${98 - idx * 3}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-black border border-neutral-800 p-6 relative">
                <div className="absolute top-0 left-0 bg-white text-black text-xs px-2 py-1 font-bold">FIG_1.1</div>
                <SkillChart />
              </div>
            </div>
          </div>
        </section>

         {/* Section: Experience */}
         <section id="experience" className="py-24 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex items-center gap-4 mb-12">
              <Terminal className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white tracking-tight">EXECUTION_LOG</h2>
            </div>
            
            <div className="relative border-l border-neutral-800 ml-4 space-y-12">
              {EXPERIENCE.map((job, index) => (
                <div key={index} className="pl-8 relative group">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-neutral-500 group-hover:bg-white transition-colors" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                    <span className="text-sm text-neutral-500 font-mono">{job.period}</span>
                  </div>
                  <h4 className="text-neutral-400 mb-4">{job.company}</h4>
                  <p className="text-neutral-500 max-w-2xl leading-relaxed mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span key={tech} className="text-xs border border-neutral-800 px-2 py-1 text-neutral-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: AI Lab / Neural Operations Center */}
        <section id="ai_lab" className="py-24 border-b border-neutral-900 bg-neutral-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex items-center gap-4 mb-12">
              <Code className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white tracking-tight">NEURAL_OPERATIONS_CENTER</h2>
            </div>
            <div className="w-full">
              <AIDashboard />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white tracking-wider">N_DHANVINA</span>
              <span className="text-xs text-neutral-600">LEAD AI ENGINEER // ndhanvina07@gmail.com</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:ndhanvina07@gmail.com" className="text-neutral-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;