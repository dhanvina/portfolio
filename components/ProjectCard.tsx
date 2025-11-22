import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const CardContent = () => (
    <>
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <ExternalLink className="w-5 h-5 text-white" />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${project.status === 'LIVE' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
            <span className="text-xs text-neutral-500 font-mono tracking-widest">{project.id} // {project.status}</span>
          </div>
          <Github className="w-4 h-4 text-neutral-700 group-hover:text-white transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 border-t border-neutral-900 pt-4">
          {project.metrics.map((metric, idx) => (
            <div key={idx}>
              <div className="text-[10px] text-neutral-600 uppercase tracking-wider">{metric.label}</div>
              <div className="text-white font-mono text-sm">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-neutral-900 bg-neutral-950/50">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] text-neutral-300 bg-neutral-900 px-2 py-1 border border-neutral-800 rounded-sm font-mono">
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
        className="group relative border border-neutral-800 bg-black hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all duration-300 flex flex-col h-full block cursor-pointer"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div className="group relative border border-neutral-800 bg-black hover:border-neutral-700 transition-colors duration-300 flex flex-col h-full">
      <CardContent />
    </div>
  );
};

export default ProjectCard;