
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const CardContent = () => (
    <>
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-all duration-300 z-10">
        <ExternalLink className="w-5 h-5 text-white transform group-hover:text-green-400 group-hover:rotate-45 transition-transform duration-300 ease-out" />
      </div>
      
      <div className="p-6 flex-grow flex flex-col relative z-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${project.status === 'LIVE' ? 'bg-green-500' : 'bg-yellow-500'} shadow-[0_0_8px_currentColor] animate-pulse`} />
            <span className="text-xs text-neutral-500 font-mono tracking-widest group-hover:text-neutral-300 transition-colors">{project.id} // {project.status}</span>
          </div>
          <Github className="w-4 h-4 text-neutral-700 group-hover:text-white transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow group-hover:text-neutral-300 transition-colors">
          {project.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 border-t border-neutral-900 pt-4 group-hover:border-neutral-800 transition-colors">
          {project.metrics.map((metric, idx) => (
            <div key={idx}>
              <div className="text-[10px] text-neutral-600 uppercase tracking-wider group-hover:text-neutral-500">{metric.label}</div>
              <div className="text-white font-mono text-sm group-hover:text-green-100 transition-colors">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-neutral-900 bg-neutral-950/30 group-hover:bg-neutral-900/80 transition-colors duration-300">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] text-neutral-400 bg-neutral-900/50 px-2 py-1 border border-neutral-800/50 rounded-sm font-mono group-hover:text-green-400 group-hover:border-green-500/30 transition-all duration-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (project.link) {
    return (
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group relative border border-neutral-800 bg-black/50 backdrop-blur-sm hover:scale-[1.02] hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-300 ease-out flex flex-col h-full block cursor-pointer overflow-hidden rounded-sm"
      >
         {/* Subtle background glow element */}
         <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent />
      </a>
    );
  }

  return (
    <div className="group relative border border-neutral-800 bg-black/50 backdrop-blur-sm hover:scale-[1.01] hover:border-neutral-600 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden rounded-sm">
      <CardContent />
    </div>
  );
};

export default ProjectCard;
