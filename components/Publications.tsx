
import React from 'react';
import { FileText, BookOpen, Calendar, Bookmark, ExternalLink } from 'lucide-react';
import { PUBLICATIONS } from '../constants';

const Publications: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">RESEARCH_ARCHIVE</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PUBLICATIONS.map((pub, index) => (
          <a 
            key={index}
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative bg-black border border-neutral-800 p-6 transition-all duration-300 flex flex-col h-full ${pub.link ? 'hover:border-green-500/50 cursor-pointer' : ''}`}
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-neutral-800 group-hover:border-r-green-500/50 transition-colors duration-300" />

            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors leading-snug">
                {pub.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 mb-4 border-b border-neutral-900 pb-4">
              <div className="flex items-center gap-1.5">
                <Bookmark className="w-3 h-3" />
                <span className="uppercase tracking-wider">{pub.publisher}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{pub.date}</span>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed flex-grow">
              {pub.description}
            </p>

            <div className="mt-4 flex justify-end items-center">
               {pub.link ? (
                 <span className="text-[10px] font-mono text-green-500 flex items-center gap-1.5 group-hover:underline">
                    ACCESS_DOCUMENT <ExternalLink className="w-3 h-3" />
                 </span>
               ) : (
                 <span className="text-[10px] font-mono text-neutral-600 group-hover:text-green-500 transition-colors">
                   // INDEXED_IN_DB
                 </span>
               )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Publications;
