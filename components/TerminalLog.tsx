import React, { useState, useEffect } from 'react';

const LOGS = [
  "Connecting to server 192.168.X.X...",
  "Handshake successful.",
  "Loading weights from ./checkpoints/v2...",
  "Optimizing kernel params...",
  "CUDA cores detected: 8940",
  "Allocating tensor memory...",
  "System health: NOMINAL",
  "Monitoring throughput...",
  "Scanning for anomalies...",
  "Inference latency: 12ms",
  "Update available: patch-4.5.2",
  "Garbage collection initiated...",
  "Neural network stabilized."
];

const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = LOGS[Math.floor(Math.random() * LOGS.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const newLine = `[${timestamp}] ${randomLog}`;
      
      setLines(prev => {
        const newLines = [...prev, newLine];
        if (newLines.length > 12) newLines.shift();
        return newLines;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs text-neutral-500 space-y-1 overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="truncate">
          <span className="text-neutral-700 mr-2">{'>'}</span>
          {line}
        </div>
      ))}
      <div className="animate-pulse text-neutral-700">{'>'} _</div>
    </div>
  );
};

export default TerminalLog;