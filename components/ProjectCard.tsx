import React from 'react';
import { ExternalLink, GitFork } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative border border-neutral-800 bg-black hover:border-white transition-colors duration-300 flex flex-col h-full">
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="w-5 h-5 text-white" />
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className={`w-2 h-2 rounded-full ${project.status === 'LIVE' ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span className="text-xs text-neutral-500 font-mono tracking-widest">{project.id} // {project.status}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:underline decoration-1 underline-offset-4">
          {project.title}
        </h3>
        
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 border-t border-neutral-900 pt-4">
          {project.metrics.map((metric, idx) => (
            <div key={idx}>
              <div className="text-xs text-neutral-600 uppercase">{metric.label}</div>
              <div className="text-white font-mono">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-neutral-900 bg-neutral-950">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs text-neutral-300 bg-neutral-900 px-2 py-1 border border-neutral-800">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;