import React, { useState, useEffect } from 'react';
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts';
import { Activity, Wifi, Server, Shield, Zap } from 'lucide-react';
import AIChat from './AIChat';

// --- Sub-Component: System Heartbeat Graph ---
const SystemHeartbeat: React.FC = () => {
  const [data, setData] = useState<{ time: number; value: number }[]>([]);

  useEffect(() => {
    // Initialize data
    const initialData = Array.from({ length: 30 }, (_, i) => ({
      time: i,
      value: 40 + Math.random() * 20
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData(prev => {
        const nextTime = prev[prev.length - 1].time + 1;
        const nextValue = Math.max(20, Math.min(95, prev[prev.length - 1].value + (Math.random() * 20 - 10)));
        return [...prev.slice(1), { time: nextTime, value: nextValue }];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
        <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
          <Activity className="w-3 h-3 text-green-500" />
          TENSOR_LOAD
        </div>
        <div className="text-xs text-green-500 font-mono">
          {Math.round(data[data.length - 1]?.value || 0)}%
        </div>
      </div>
      <div className="flex-grow bg-black relative overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <YAxis domain={[0, 100]} hide />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#fff" 
              strokeWidth={1}
              fill="#333" 
              fillOpacity={0.3}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      </div>
    </div>
  );
};

// --- Sub-Component: Network Visualizer ---
const NetworkVisualizer: React.FC = () => {
  return (
    <div className="h-full w-full bg-black relative overflow-hidden flex flex-col">
      <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-900/50 flex justify-between">
        <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
          <Wifi className="w-3 h-3 text-white" />
          ACTIVE_NODES
        </div>
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{animationDelay: `${i*0.2}s`}}/>)}
        </div>
      </div>
      
      <div className="flex-grow relative flex items-center justify-center">
        {/* Simple SVG Animation for Network */}
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
           <defs>
             <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
               <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#smallGrid)" />
           
           {/* Random Nodes */}
           {[
             {x: 30, y: 50}, {x: 70, y: 20}, {x: 100, y: 80}, {x: 140, y: 40}, {x: 170, y: 60}
           ].map((node, i) => (
             <g key={i}>
               <circle cx={node.x} cy={node.y} r="3" fill="white" className="animate-pulse">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2+i%3}s`} repeatCount="indefinite" />
               </circle>
               {/* Connect to next node */}
               {i < 4 && (
                 <line 
                   x1={node.x} y1={node.y} 
                   x2={[70, 100, 140, 170][i]} y2={[20, 80, 40, 60][i]} 
                   stroke="rgba(255,255,255,0.2)" 
                   strokeWidth="1"
                 />
               )}
             </g>
           ))}
        </svg>
      </div>
    </div>
  );
};

// --- Sub-Component: Header Status Item with Tooltip ---
interface HeaderStatusProps {
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  textColor?: string;
}

const HeaderStatus: React.FC<HeaderStatusProps> = ({ icon, label, tooltip, textColor }) => (
  <div className="group relative flex items-center gap-1 cursor-help transition-colors hover:text-neutral-300">
    {icon}
    <span className={textColor}>{label}</span>
    {/* Tooltip */}
    <div className="absolute top-full right-0 mt-2 w-56 p-2 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[60]">
      <div className="text-[10px] font-bold text-neutral-500 mb-1 border-b border-neutral-800 pb-1 flex justify-between">
        <span>SYSTEM_METRIC</span>
        <span className="text-green-500">●</span>
      </div>
      <div className="text-xs text-white leading-snug font-sans">{tooltip}</div>
    </div>
  </div>
);

const AIDashboard: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto border border-neutral-800 bg-neutral-950/80 shadow-2xl relative overflow-hidden">
      {/* CRT Scanline Overlay */}
      <div className="scanline absolute inset-0 pointer-events-none z-50">
        <div className="scanline-bar"></div>
      </div>

      {/* Dashboard Header */}
      <div className="h-10 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-900 relative z-20">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-400 animate-pulse" />
          </div>
          <span className="text-xs font-mono text-neutral-400 tracking-widest">NEURAL_OPERATIONS_CENTER</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
          <HeaderStatus 
            icon={<Server className="w-3 h-3" />} 
            label="US-EAST-1" 
            tooltip="Primary inference node online. Latency: 12ms." 
          />
          <HeaderStatus 
            icon={<Shield className="w-3 h-3" />} 
            label="SECURE" 
            tooltip="End-to-end encryption active. Firewall: ENABLED." 
          />
          <HeaderStatus 
            icon={<Zap className="w-3 h-3 text-yellow-500" />} 
            label="98% PWR" 
            textColor="text-yellow-500"
            tooltip="GPU Utilization: 98%. Power efficiency: OPTIMAL." 
          />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-[450px]">
        
        {/* Left Sidebar: Metrics & Viz (3 cols) */}
        <div className="lg:col-span-3 border-r border-neutral-800 flex flex-col">
          <div className="h-1/2 border-b border-neutral-800">
            <SystemHeartbeat />
          </div>
          <div className="h-1/2">
            <NetworkVisualizer />
          </div>
        </div>

        {/* Main Content: Terminal Chat (9 cols) */}
        <div className="lg:col-span-9 bg-black relative flex flex-col">
          {/* Terminal Header */}
          <div className="absolute top-2 right-4 z-10 text-[10px] font-mono text-neutral-600">
            SESSION_ID: 0x8F2A9C
          </div>
          <AIChat />
        </div>
      </div>

      {/* Dashboard Footer */}
      <div className="h-8 border-t border-neutral-800 bg-neutral-900 flex items-center px-4 justify-between">
         <div className="text-[10px] font-mono text-neutral-500">
            MEM: 64GB / 128GB | GPU: RTX 4090 [ACTIVE]
         </div>
         <div className="text-[10px] font-mono text-neutral-500 animate-pulse">
            WAITING_FOR_INPUT...
         </div>
      </div>
    </div>
  );
};

export default AIDashboard;