
import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, Database, Box, Play, CheckCircle, Activity, Server, Globe, Terminal, AlertCircle, RotateCw, Cpu, ShieldCheck, XCircle } from 'lucide-react';

type StageStatus = 'pending' | 'running' | 'completed' | 'failed';

interface PipelineStage {
  id: string;
  label: string;
  icon: React.ElementType;
  command: string;
  duration: number; // ms
}

const STAGES: PipelineStage[] = [
  { id: 'source', label: 'Source Control', icon: GitBranch, command: 'git push origin main', duration: 1500 },
  { id: 'ci', label: 'CI / Build', icon: Box, command: 'docker build -t model-api:latest .', duration: 2500 },
  { id: 'data_ingest', label: 'Data Ingestion', icon: Database, command: 'dvc pull data/raw.csv', duration: 2000 },
  { id: 'data_valid', label: 'Data Validation', icon: ShieldCheck, command: 'pytest tests/test_data_schema.py', duration: 1800 },
  { id: 'train', label: 'Model Training', icon: Cpu, command: 'python train.py --epochs=50 --batch=32', duration: 3000 },
  { id: 'eval', label: 'Model Evaluation', icon: Activity, command: 'mlflow run . --entry-point evaluate', duration: 2000 },
  { id: 'deploy', label: 'Deployment', icon: Server, command: 'kubectl apply -f deployment.yaml', duration: 2500 },
  { id: 'monitor', label: 'Live Monitoring', icon: Globe, command: 'health_check --endpoint /predict', duration: 1500 },
];

const MLOpsPipeline: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(-1);
  const [stageStatuses, setStageStatuses] = useState<Record<string, StageStatus>>({});
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string, type: 'info' | 'success' | 'cmd' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let prefix = '';
    if (type === 'cmd') prefix = '$ ';
    if (type === 'success') prefix = '✓ ';
    if (type === 'error') prefix = '✗ ';
    
    setLogs(prev => [...prev, `[${timestamp}] ${prefix}${msg}`]);
  };

  const resetPipeline = () => {
    setActiveStageIndex(-1);
    setStageStatuses({});
    setLogs([]);
    setIsRunning(false);
    addLog("Pipeline state reset. Ready for trigger.");
  };

  const runPipeline = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setStageStatuses({});
    setLogs([]);
    setActiveStageIndex(-1);
    
    addLog("Initializing MLOps Workflow Orchestrator...");
    
    // Iterate through stages sequentially
    for (let i = 0; i < STAGES.length; i++) {
      const stage = STAGES[i];
      setActiveStageIndex(i);
      
      // Update status to running
      setStageStatuses(prev => ({ ...prev, [stage.id]: 'running' }));
      addLog(`Starting Stage: ${stage.label}...`);
      addLog(stage.command, 'cmd');

      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, stage.duration));

      // Update status to completed
      setStageStatuses(prev => ({ ...prev, [stage.id]: 'completed' }));
      addLog(`${stage.label} completed successfully.`, 'success');
    }

    setActiveStageIndex(-1);
    setIsRunning(false);
    addLog("----------------------------------------");
    addLog("PIPELINE EXECUTION COMPLETED: SUCCESS");
    addLog("Model deployed to Production (v2.4.1)");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       {/* Header */}
       <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-sm group hover:border-green-500 transition-colors">
            <RotateCw className={`w-6 h-6 text-green-500 ${isRunning ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">MLOPS_PIPELINE</h2>
            <p className="text-neutral-500 font-mono text-xs">CI/CD // AUTOMATION // OBSERVABILITY</p>
          </div>
        </div>
        
        <div className="flex gap-3">
           {isRunning ? (
             <button disabled className="flex items-center gap-2 px-6 py-2 bg-neutral-800 text-neutral-500 text-xs font-bold tracking-wider rounded cursor-wait">
               EXECUTING...
             </button>
           ) : (
             <button 
               onClick={runPipeline}
               className="flex items-center gap-2 px-6 py-2 bg-white hover:bg-green-500 text-black hover:text-white text-xs font-bold tracking-wider rounded transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
             >
               <Play className="w-4 h-4" /> TRIGGER_PIPELINE
             </button>
           )}
           <button 
              onClick={resetPipeline} 
              className="p-2 border border-neutral-800 hover:bg-neutral-800 rounded text-neutral-400 transition-colors"
              title="Reset Pipeline"
            >
              <RotateCw className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Visual Workflow */}
        <div className="lg:col-span-7">
           <div className="relative border border-neutral-800 bg-black p-8 min-h-[600px] flex flex-col justify-center overflow-hidden">
              
              <div className="space-y-0 relative z-10">
                {STAGES.map((stage, index) => {
                  const status = stageStatuses[stage.id] || 'pending';
                  const isActive = activeStageIndex === index;
                  const isPast = activeStageIndex > index || status === 'completed';
                  
                  return (
                    <div key={stage.id} className="relative">
                      {/* Connecting Line */}
                      {index < STAGES.length - 1 && (
                        <div 
                          className={`absolute left-6 top-12 h-8 w-0.5 -ml-[1px] transition-colors duration-500 delay-100 z-0
                            ${isPast ? 'bg-green-500' : 'bg-neutral-800'}
                          `} 
                        />
                      )}

                      <div className={`flex items-center gap-6 py-2 transition-all duration-500 ${isActive ? 'translate-x-2' : ''} ${status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>
                        
                        {/* Icon Node */}
                        <div className={`
                          w-12 h-12 rounded-full border-2 flex-shrink-0 flex items-center justify-center bg-black z-10 transition-all duration-300
                          ${status === 'completed' ? 'border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 
                            status === 'running' ? 'border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 
                            status === 'failed' ? 'border-red-500 text-red-500' :
                            'border-neutral-800 text-neutral-600'}
                        `}>
                          {status === 'completed' ? <CheckCircle className="w-5 h-5" /> : 
                           status === 'failed' ? <XCircle className="w-5 h-5" /> :
                           status === 'running' ? <Activity className="w-5 h-5 animate-spin" /> :
                           <stage.icon className="w-5 h-5" />}
                        </div>

                        {/* Stage Card */}
                        <div className={`
                          flex-grow p-4 border rounded-sm flex items-center justify-between transition-all duration-300 relative overflow-hidden
                          ${status === 'running' ? 'bg-neutral-900 border-white transform scale-[1.02]' : 
                            status === 'completed' ? 'bg-green-500/5 border-green-500/30' : 
                            status === 'failed' ? 'bg-red-500/10 border-red-500/30' :
                            'bg-neutral-950 border-neutral-800'}
                        `}>
                          {/* Running Progress Bar Background */}
                          {status === 'running' && (
                            <div className="absolute bottom-0 left-0 h-0.5 bg-white animate-[scan_2s_linear_infinite] w-full" />
                          )}

                          <div>
                            <h4 className={`font-bold text-sm flex items-center gap-2 ${
                              status === 'completed' ? 'text-green-400' : 
                              status === 'failed' ? 'text-red-400' :
                              status === 'running' ? 'text-white' : 
                              'text-neutral-400'
                            }`}>
                              {stage.label}
                              {status === 'running' && <span className="text-[10px] px-1.5 py-0.5 bg-white text-black rounded-sm animate-pulse">RUNNING</span>}
                            </h4>
                            <div className="text-[10px] font-mono text-neutral-500 mt-1 truncate max-w-[250px] sm:max-w-md">
                               {status === 'running' ? '>> Executing process...' : stage.command}
                            </div>
                          </div>
                          
                          <div className={`text-[10px] font-mono ${status === 'completed' ? 'text-green-600' : 'text-neutral-600'}`}>
                             {status === 'completed' ? `${(stage.duration/1000).toFixed(1)}s` : '---'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Spacer for line */}
                      {index < STAGES.length - 1 && <div className="h-8" />}
                    </div>
                  );
                })}
              </div>
           </div>
        </div>

        {/* RIGHT: Terminal & Status */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Status Monitor */}
          <div className="border border-neutral-800 bg-neutral-900/20 p-6">
             <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Server className="w-4 h-4" /> Pipeline Status
             </h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black border border-neutral-800">
                   <div className="text-[10px] text-neutral-500 mb-1">BUILD STATUS</div>
                   <div className={`font-mono font-bold ${isRunning ? 'text-yellow-500' : stageStatuses['deploy'] === 'completed' ? 'text-green-500' : 'text-neutral-300'}`}>
                      {isRunning ? 'IN_PROGRESS' : stageStatuses['deploy'] === 'completed' ? 'PASSING' : 'IDLE'}
                   </div>
                </div>
                <div className="p-4 bg-black border border-neutral-800">
                   <div className="text-[10px] text-neutral-500 mb-1">LAST DEPLOY</div>
                   <div className="font-mono font-bold text-white">v2.4.1</div>
                </div>
                <div className="p-4 bg-black border border-neutral-800">
                   <div className="text-[10px] text-neutral-500 mb-1">ACTIVE CLUSTER</div>
                   <div className="font-mono font-bold text-green-500">US-EAST-1</div>
                </div>
                <div className="p-4 bg-black border border-neutral-800">
                   <div className="text-[10px] text-neutral-500 mb-1">HEALTH CHECK</div>
                   <div className="font-mono font-bold text-green-500">99.9% UP</div>
                </div>
             </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-grow flex flex-col border border-neutral-800 bg-black min-h-[300px] shadow-2xl">
             <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-900 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                   <Terminal className="w-3 h-3" />
                   <span>pipeline_logs.txt</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-neutral-700" />
                   <div className="w-2 h-2 rounded-full bg-neutral-700" />
                </div>
             </div>
             
             <div className="p-4 font-mono text-xs space-y-1 overflow-y-auto flex-grow h-64 custom-scrollbar">
                {logs.length === 0 && <div className="text-neutral-600 italic">Waiting for pipeline trigger...</div>}
                {logs.map((log, i) => (
                   <div key={i} className={`break-all ${log.includes('✓') ? 'text-green-400' : log.includes('✗') ? 'text-red-500' : log.includes('$') ? 'text-yellow-500' : 'text-neutral-300'}`}>
                      {log}
                   </div>
                ))}
                <div ref={logsEndRef} />
                {isRunning && (
                   <div className="animate-pulse text-green-500">_</div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MLOpsPipeline;
