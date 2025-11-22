
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Terminal, Command, Cpu, Hash, Eye } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

// --- SUB-COMPONENT: Scramble Text Effect ---
const ScrambleText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    
    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayedText(prev => 
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // Slower decode for dramatic effect
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={className}>{displayedText}</span>;
};

// --- SUB-COMPONENT: Neural Network Canvas Background ---
const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(100, (canvas.width * canvas.height) / 9000); // Density based on screen size
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 150)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.fillStyle = '#fff';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.globalAlpha = 0.5 + Math.random() * 0.5; // Twinkle effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />;
};

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col justify-center overflow-hidden bg-black py-10 md:py-0">
      {/* 1. Complex Neural Background */}
      <NeuralBackground />

      {/* 2. Decorative HUD Overlay Elements */}
      <div className="absolute inset-0 pointer-events-none select-none z-10">
        {/* Corner Brackets - Hidden on small screens to save space */}
        <div className={`hidden sm:block absolute top-10 left-10 w-12 h-12 border-l-2 border-t-2 border-neutral-700 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-10 -translate-y-10'}`} />
        <div className={`hidden sm:block absolute top-10 right-10 w-12 h-12 border-r-2 border-t-2 border-neutral-700 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-10 -translate-y-10'}`} />
        <div className={`hidden sm:block absolute bottom-10 left-10 w-12 h-12 border-l-2 border-b-2 border-neutral-700 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-10 translate-y-10'}`} />
        <div className={`hidden sm:block absolute bottom-10 right-10 w-12 h-12 border-r-2 border-b-2 border-neutral-700 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-10 translate-y-10'}`} />

        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan-vertical pointer-events-none" />
        
        {/* Random Data Stream (Left Side) */}
        <div className="hidden md:flex flex-col absolute top-1/2 left-8 -translate-y-1/2 space-y-2 text-[10px] font-mono text-neutral-600 opacity-50">
          {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
              0x{Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0')}
            </div>
          ))}
        </div>

         {/* Random Data Stream (Right Side) */}
         <div className="hidden md:flex flex-col absolute top-1/2 right-8 -translate-y-1/2 space-y-2 text-[10px] font-mono text-neutral-600 opacity-50 text-right">
          {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
              RUN_THREAD_{i} [OK]
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-3 px-3 py-1 border border-neutral-800 bg-black/50 backdrop-blur-sm mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400">
            SYSTEM_ONLINE <span className="text-neutral-600 mx-2">||</span> AI_ENGINEER
          </span>
        </div>

        {/* Identity Verification & Name */}
        <div className="mb-6">
          <div className={`text-xs sm:text-sm font-mono text-neutral-500 mb-2 flex items-center gap-2 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-600" />
            <ScrambleText text="IDENTITY VERIFIED..." delay={500} />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-none relative group cursor-default">
             {/* Name Scramble */}
             <ScrambleText text="DHANVINA" className="block" delay={1200} />
             
             {/* Glitch clone behind (visible on hover) */}
             <span className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-50 text-green-500 animate-glitch translate-x-[2px]">
                DHANVINA
             </span>
             <span className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-50 text-red-500 animate-glitch translate-x-[-2px]" style={{ animationDelay: '0.1s'}}>
                DHANVINA
             </span>
          </h1>
        </div>

        {/* Bio & Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Bio Text */}
          <div className="md:col-span-7 relative pl-4 md:pl-6 border-l-2 border-neutral-800">
             <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
                I build <span className="text-white font-medium">AI-powered systems</span> with robust <span className="text-white font-medium">backend architecture</span>, optimized for <span className="text-white font-medium">production</span>.
             </p>
             <p className="mt-3 text-sm md:text-base text-neutral-500 font-mono leading-relaxed">
                Welcome! I'm Dhanvina, a passionate AI Engineer and Tech Visionary. My mission is to harness the power of technology to create smarter, scalable, and impactful solutions.
             </p>
             <p className="mt-3 text-xs sm:text-sm text-green-500 font-mono">
               Current Focus: Building Next-Gen AI Agents & Advancing GenAI Systems.
             </p>
          </div>

          {/* Quick Stats Box */}
          <div className="md:col-span-5 flex flex-col justify-end">
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-neutral-900/30 border border-neutral-800 p-3 backdrop-blur-sm hover:border-white/20 transition-colors group">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1 text-[10px] sm:text-xs font-mono uppercase">
                    <Cpu className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-green-500 transition-colors" />
                    Projects
                  </div>
                  <div className="text-base sm:text-xl font-bold text-white">5+ Deployed</div>
                </div>
                <div className="bg-neutral-900/30 border border-neutral-800 p-3 backdrop-blur-sm hover:border-white/20 transition-colors group">
                   <div className="flex items-center gap-2 text-neutral-500 mb-1 text-[10px] sm:text-xs font-mono uppercase">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-green-500 transition-colors" />
                    Experience
                  </div>
                  <div className="text-base sm:text-xl font-bold text-white">Lead Engineer</div>
                </div>
             </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => onNavigate('projects')}
            className="group bg-white text-black px-6 py-3 font-bold text-xs sm:text-sm tracking-wide hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            ACCESS_PROJECTS
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => onNavigate('ai_lab')}
            className="group border border-neutral-700 text-white px-6 py-3 font-bold text-xs sm:text-sm tracking-wide hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 backdrop-blur-md w-full sm:w-auto"
          >
            <Command className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            INITIALIZE_CHAT
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;
