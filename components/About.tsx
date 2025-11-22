
import React from 'react';
import { User, Terminal, Cpu } from 'lucide-react';
import { ABOUT } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <User className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-bold text-white tracking-tight">ABOUT_PROFILE</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image Column - Compact & Fixed Height */}
        <div className="w-full md:w-64 flex-shrink-0 relative group mx-auto md:mx-0">
          {/* Glitch/Glow Effect Container */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-neutral-800 rounded-sm blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
          
          <div className="relative h-64 w-full md:w-64 bg-black border border-neutral-800 overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-green-500 z-20"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-green-500 z-20"></div>
            
            {/* Profile Image - Using GitHub Avatar as reliable fallback */}
            <img 
              src="https://github.com/dhanvina.png" 
              alt="Dhanvina" 
              className="w-full h-full object-cover filter grayscale contrast-125 hover:contrast-100 hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                // Fallback if GitHub image fails (though unlikely for valid user)
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Dhanvina&background=0F1624&color=fff&size=512";
              }}
            />
            
            {/* Overlay Data */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-3 z-10">
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="font-mono text-green-500 text-[10px] tracking-widest">ID: DHANVINA</span>
              </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 z-10"></div>
          </div>
        </div>

        {/* Text Column - Expanded */}
        <div className="flex-grow space-y-6">
          <div className="relative border-l-2 border-neutral-800 pl-4">
            <p className="text-base text-neutral-300 leading-relaxed font-light">
              {ABOUT.intro}
            </p>
          </div>
          
          {/* Compact Bullet Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ABOUT.bullets.map((item, i) => (
              <div key={i} className="group p-3 border border-neutral-800 bg-neutral-950/30 hover:border-neutral-600 hover:bg-neutral-900 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                   <Terminal className="w-4 h-4 text-green-500" />
                   <h4 className="text-white font-bold text-xs tracking-wide group-hover:text-green-400 transition-colors">{item.title}</h4>
                </div>
                <p className="text-neutral-500 text-[10px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer Quote */}
          <div className="flex items-center gap-3 p-3 bg-neutral-900/50 border-t border-neutral-800 rounded-sm">
             <Cpu className="w-4 h-4 text-neutral-500" />
             <div className="italic text-neutral-400 text-xs font-mono">
              "{ABOUT.funFact}"
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
