
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILL_DATA } from '../constants';

const SkillChart: React.FC = () => {
  return (
    <div className="w-full h-[320px] bg-black flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#fff', fontSize: 10, fontFamily: 'monospace' }} 
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#fff"
            strokeWidth={2}
            fill="#fff"
            fillOpacity={0.1}
            isAnimationActive={true}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="text-center mt-2 text-[10px] text-neutral-500 font-mono">
        // SKILL_DISTRIBUTION_MATRIX
      </div>
    </div>
  );
};

export default SkillChart;
