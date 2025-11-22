import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const fullText = "IDENTITY VERIFIED... N DHANVINA";
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(timer);
        setTimeout(() => setShowSub(true), 500);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
      <div className="border-l-2 border-white pl-6 md:pl-12 py-4">
        <div className="font-mono text-neutral-500 text-sm mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          SYSTEM_ONLINE // LEAD_AI_ENGINEER
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-6 break-words">
          {text}<span className="animate-blink">_</span>
        </h1>
        
        <div className={`transition-opacity duration-1000 ${showSub ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xl text-neutral-400 max-w-2xl mb-8 leading-relaxed">
            Architecting intelligent solutions. Specialized in <span className="text-white border-b border-white">Computer Vision</span>, 
            <span className="text-white border-b border-white ml-2">LLMs & NLP</span>, and 
            <span className="text-white border-b border-white ml-2">Production MLOps</span>.
            Currently building CtrlFake & CtrlThreats at F9 CYBRISK.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('projects')}
              className="group flex items-center gap-2 bg-white text-black px-6 py-3 font-bold hover:bg-neutral-200 transition-all"
            >
              ACCESS_PROJECTS
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('ai_lab')}
              className="flex items-center gap-2 border border-white text-white px-6 py-3 font-bold hover:bg-white hover:text-black transition-all"
            >
              QUERY_AI_AGENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;