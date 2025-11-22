
import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { EDUCATION } from '../constants';

const Education: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-white" />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">ACADEMIC_DATABANKS</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {EDUCATION.map((edu, index) => (
          <div 
            key={index} 
            className="relative border-l-2 border-neutral-800 pl-6 pb-2 group"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-neutral-600 rounded-full group-hover:border-green-500 group-hover:scale-110 transition-all duration-300" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                  {edu.institution}
                </h3>
                <div className="text-green-500 font-mono text-sm flex items-center gap-2 mt-1">
                   <BookOpen className="w-3 h-3" />
                   {edu.degree}
                </div>
              </div>
              
              <div className="flex flex-col items-start md:items-end gap-1">
                <div className="text-xs text-neutral-500 font-mono flex items-center gap-1.5 bg-neutral-900/50 px-2 py-1 rounded border border-neutral-800">
                  <Calendar className="w-3 h-3" />
                  {edu.period}
                </div>
                {edu.grade && (
                  <div className="text-xs text-yellow-500 font-mono flex items-center gap-1.5 bg-neutral-900/50 px-2 py-1 rounded border border-neutral-800">
                    <Award className="w-3 h-3" />
                    {edu.grade}
                  </div>
                )}
              </div>
            </div>

            {edu.desc && (
              <p className="text-neutral-400 text-sm leading-relaxed mt-3 mb-4 max-w-3xl">
                {edu.desc}
              </p>
            )}

            {edu.skills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {edu.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-[10px] font-mono text-neutral-500 bg-neutral-900/30 border border-neutral-800 px-2 py-0.5 rounded hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
