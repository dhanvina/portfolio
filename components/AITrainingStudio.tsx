
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Settings, Play, Cpu, Activity, Save, RotateCcw, Database, Layers, Download, AlertCircle, CheckCircle, Box, FileJson } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type TrainingStatus = 'idle' | 'uploading' | 'ready' | 'training' | 'completed';
type Tab = 'metrics' | 'architecture';

interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
}

const MODELS = [
  { id: 'cnn', name: 'ConvNeuralNet (CNN)', task: 'Image Classification', layers: ['Conv2D', 'MaxPool', 'Conv2D', 'Dense'] },
  { id: 'transformer', name: 'Transformer (BERT)', task: 'NLP / Text', layers: ['Embedding', 'SelfAttn', 'FeedFwd', 'Norm'] },
  { id: 'lstm', name: 'LSTM / GRU', task: 'Time Series', layers: ['Input', 'LSTM Cell', 'Dropout', 'Dense'] },
  { id: 'rf', name: 'Random Forest', task: 'Tabular Data', layers: ['Bootstrap', 'DecisionTree', 'Vote', 'Output'] },
];

const AITrainingStudio: React.FC = () => {
  const [status, setStatus] = useState<TrainingStatus>('idle');
  const [datasetName, setDatasetName] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [activeTab, setActiveTab] = useState<Tab>('metrics');
  
  // Hyperparameters
  const [epochs, setEpochs] = useState(20);
  const [learningRate, setLearningRate] = useState(0.001);
  const [batchSize, setBatchSize] = useState(32);
  
  // State
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<TrainingMetrics[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleUpload = () => {
    setStatus('uploading');
    addLog("Initiating secure upload sequence...");
    setTimeout(() => {
      setDatasetName("dataset_v1.csv (145MB)");
      setStatus('ready');
      addLog("Dataset uploaded successfully: 145MB, 50k rows.");
      addLog("Data validation passed. Schema verified.");
    }, 1500);
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const startTraining = () => {
    if (status !== 'ready' && status !== 'completed') return;
    
    setStatus('training');
    setActiveTab('metrics');
    setProgress(0);
    setMetrics([]);
    setLogs([]);
    addLog(`Initializing ${MODELS.find(m => m.id === selectedModel)?.name}...`);
    addLog(`Hyperparams: LR=${learningRate}, Batch=${batchSize}, Epochs=${epochs}`);
    addLog("Allocating GPU tensors...");

    let currentEpoch = 0;
    let currentLoss = 2.5;
    let currentAcc = 0.15;

    const interval = setInterval(() => {
      currentEpoch++;
      const progressPct = (currentEpoch / epochs) * 100;
      
      // Simulate training math
      const lossChange = (Math.random() * 0.15) + 0.05;
      const accChange = (Math.random() * 0.08) + 0.02;
      
      currentLoss = Math.max(0.1, currentLoss - lossChange * (currentLoss / 2));
      currentAcc = Math.min(0.99, currentAcc + accChange * (1 - currentAcc));

      const newMetric = {
        epoch: currentEpoch,
        loss: parseFloat(currentLoss.toFixed(4)),
        accuracy: parseFloat(currentAcc.toFixed(4))
      };

      setMetrics(prev => [...prev, newMetric]);
      setProgress(progressPct);
      
      if (currentEpoch % 5 === 0 || currentEpoch === 1) {
         addLog(`Epoch ${currentEpoch}/${epochs} - Loss: ${newMetric.loss} - Acc: ${newMetric.accuracy}`);
      }

      if (currentEpoch >= epochs) {
        clearInterval(interval);
        setStatus('completed');
        addLog("Training sequence completed successfully.");
        addLog("Model converged. Weights frozen.");
      }
    }, 500);
  };

  const downloadModel = () => {
    addLog(`Downloading ${selectedModel}_v1.h5 [240MB]...`);
    addLog("Download complete.");
  };

  const resetStudio = () => {
    setStatus('idle');
    setDatasetName(null);
    setMetrics([]);
    setLogs([]);
    setProgress(0);
    addLog("Session reset. Memory cleared.");
  };

  // Visualization of Layers
  const renderArchitecture = () => {
    const model = MODELS.find(m => m.id === selectedModel);
    if (!model) return null;

    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black opacity-50" />
        
        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
          {/* Input Layer */}
          <div className="flex flex-col items-center gap-2">
             <div className="w-24 h-8 border border-neutral-700 bg-neutral-900 rounded flex items-center justify-center text-[10px] text-neutral-400 font-mono shadow-[0_0_10px_rgba(255,255,255,0.05)]">
               INPUT_DATA
             </div>
             <div className="h-6 w-px bg-neutral-700" />
          </div>

          {/* Hidden Layers */}
          <div className="flex flex-col gap-4 w-full">
            {model.layers.map((layer, idx) => (
              <div key={idx} className="relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                 <div className="w-full h-12 border border-green-500/30 bg-green-500/5 rounded flex items-center justify-between px-4 relative overflow-hidden group hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 hover:scale-105 cursor-crosshair">
                    <div className="flex items-center gap-3">
                       <Box className="w-4 h-4 text-green-500" />
                       <span className="text-sm font-bold text-white">{layer}</span>
                    </div>
                    <span className="text-[10px] text-green-500 font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                      TX_{128 * (idx + 1)}
                    </span>
                    {status === 'training' && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 animate-pulse w-full opacity-50" />
                    )}
                 </div>
                 {idx < model.layers.length - 1 && (
                    <div className="h-4 w-px bg-green-500/30 my-1" />
                 )}
              </div>
            ))}
          </div>

           {/* Output Layer */}
           <div className="flex flex-col items-center gap-2">
             <div className="h-6 w-px bg-neutral-700" />
             <div className="w-24 h-8 border border-white/20 bg-neutral-800 rounded flex items-center justify-center text-[10px] text-white font-mono shadow-[0_0_10px_rgba(255,255,255,0.1)]">
               OUTPUT
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-sm group hover:border-green-500 transition-colors">
            <Cpu className="w-6 h-6 text-green-500 animate-pulse group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">AI_MODEL_STUDIO</h2>
            <p className="text-neutral-500 font-mono text-xs">v2.4.0 // TRAINING_ENVIRONMENT</p>
          </div>
        </div>
        {status === 'completed' && (
           <button 
             onClick={downloadModel}
             className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold tracking-wider rounded transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:-translate-y-0.5"
           >
             <Download className="w-4 h-4" /> EXPORT_MODEL
           </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Configuration */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. Dataset Upload */}
          <div className="border border-neutral-800 bg-black p-5 relative overflow-hidden group hover:border-neutral-600 transition-colors">
            {status === 'idle' || status === 'uploading' ? (
               <div 
                 onClick={handleUpload}
                 className="border-2 border-dashed border-neutral-700 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-neutral-900/50 hover:scale-[1.02] transition-all duration-300 group"
               >
                 <Upload className={`w-8 h-8 mb-3 ${status === 'uploading' ? 'text-green-500 animate-bounce' : 'text-neutral-400 group-hover:text-green-400'}`} />
                 <span className="text-neutral-300 font-mono text-sm group-hover:text-white">
                    {status === 'uploading' ? 'UPLOADING...' : 'DROP_DATASET.CSV'}
                 </span>
                 <span className="text-neutral-600 text-xs mt-1">Max size: 500MB</span>
               </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-neutral-900/50 border border-green-900/30 rounded">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-mono">{datasetName}</span>
                    <span className="text-green-500 text-[10px] uppercase flex items-center gap-1">
                       <CheckCircle className="w-3 h-3" /> Ready for Training
                    </span>
                  </div>
                </div>
                <button onClick={resetStudio} className="p-1 hover:bg-red-900/20 rounded text-neutral-500 hover:text-red-500 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* 2. Model Configuration */}
          <div className={`border border-neutral-800 bg-black p-5 transition-all duration-500 ${status === 'idle' ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
            <div className="flex items-center gap-2 mb-4 text-neutral-400 font-mono text-xs uppercase tracking-wider">
              <Settings className="w-4 h-4" /> Configuration
            </div>

            <div className="space-y-4">
              {/* Model Select */}
              <div>
                <label className="block text-neutral-500 text-xs mb-1">ARCHITECTURE</label>
                <div className="grid grid-cols-1 gap-2">
                  {MODELS.map(model => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      disabled={status === 'training'}
                      className={`text-left px-3 py-2 border text-sm font-mono transition-all duration-200 hover:scale-[1.01] ${
                        selectedModel === model.id 
                          ? 'border-green-500 bg-green-500/10 text-white' 
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300'
                      }`}
                    >
                      <div className="font-bold">{model.name}</div>
                      <div className="text-[10px] opacity-70">{model.task}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hyperparameters */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>EPOCHS</span>
                    <span className="text-white">{epochs}</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" step="10" 
                    value={epochs} onChange={(e) => setEpochs(parseInt(e.target.value))}
                    disabled={status === 'training'}
                    className="w-full accent-green-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer hover:bg-neutral-700 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>BATCH SIZE</span>
                    <span className="text-white">{batchSize}</span>
                  </div>
                  <input 
                    type="range" min="8" max="128" step="8" 
                    value={batchSize} onChange={(e) => setBatchSize(parseInt(e.target.value))}
                    disabled={status === 'training'}
                    className="w-full accent-green-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer hover:bg-neutral-700 transition-colors"
                  />
                </div>
                
                <div>
                   <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>LEARNING RATE</span>
                    <span className="text-white">{learningRate}</span>
                  </div>
                   <select 
                    value={learningRate} 
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    disabled={status === 'training'}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs p-2 rounded focus:outline-none focus:border-green-500 hover:border-neutral-600 transition-colors"
                   >
                     <option value="0.01">0.01</option>
                     <option value="0.001">0.001</option>
                     <option value="0.0001">0.0001</option>
                   </select>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={startTraining}
              disabled={status !== 'ready'}
              className={`w-full mt-6 py-3 flex items-center justify-center gap-2 font-bold text-sm tracking-widest transition-all duration-300 ${
                status === 'ready' 
                  ? 'bg-white text-black hover:bg-green-500 hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transform hover:-translate-y-0.5' 
                  : status === 'training' 
                    ? 'bg-neutral-800 text-neutral-500 cursor-wait'
                    : status === 'completed'
                      ? 'bg-green-500 text-white cursor-default'
                      : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
              }`}
            >
              {status === 'training' ? (
                <>TRAINING <Activity className="w-4 h-4 animate-spin" /></>
              ) : status === 'completed' ? (
                <>COMPLETED <CheckCircle className="w-4 h-4" /></>
              ) : (
                <>INITIATE_TRAINING <Play className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Visualization & Terminal */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* 1. Visualizer Tabs */}
          <div className="flex-grow border border-neutral-800 bg-black relative min-h-[400px] flex flex-col hover:border-neutral-700 transition-colors duration-500">
             {/* Tabs Header */}
             <div className="flex border-b border-neutral-800">
                <button 
                  onClick={() => setActiveTab('metrics')}
                  className={`px-6 py-3 text-xs font-bold tracking-wider flex items-center gap-2 transition-colors ${
                    activeTab === 'metrics' ? 'bg-neutral-900 text-green-500 border-r border-neutral-800' : 'text-neutral-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                   <Activity className="w-4 h-4" /> LIVE_METRICS
                </button>
                <button 
                  onClick={() => setActiveTab('architecture')}
                  className={`px-6 py-3 text-xs font-bold tracking-wider flex items-center gap-2 transition-colors ${
                    activeTab === 'architecture' ? 'bg-neutral-900 text-green-500 border-l border-r border-neutral-800' : 'text-neutral-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                   <Layers className="w-4 h-4" /> ARCHITECTURE
                </button>
             </div>

             {/* Tab Content */}
             <div className="flex-grow relative p-6">
               {activeTab === 'metrics' && (
                 <>
                   {metrics.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={metrics}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                          <XAxis dataKey="epoch" stroke="#555" tick={{fontSize: 10}} />
                          <YAxis stroke="#555" tick={{fontSize: 10}} domain={[0, 1]} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '12px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                          <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                   ) : (
                     <div className="flex-grow h-full flex items-center justify-center text-neutral-600 font-mono text-xs flex-col gap-2 animate-pulse">
                       <AlertCircle className="w-8 h-8 opacity-50" />
                       AWAITING_DATA_STREAM...
                     </div>
                   )}
                 </>
               )}

               {activeTab === 'architecture' && renderArchitecture()}
             </div>
          </div>

          {/* 2. Terminal Output */}
          <div className="h-48 border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs overflow-y-auto">
            <div className="mb-2 text-neutral-500 uppercase tracking-wider border-b border-neutral-800 pb-1 text-[10px] flex justify-between">
              <span>System Logs</span>
              <span className="text-neutral-600">/var/log/training.log</span>
            </div>
            <div className="space-y-1">
              {status === 'idle' && <div className="text-neutral-600">System idle. Waiting for dataset configuration...</div>}
              {logs.map((log, i) => (
                <div key={i} className="text-neutral-300 break-all">
                  <span className="text-green-900 mr-2">{'>'}</span>{log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* Progress Bar (Only visible during training) */}
          {(status === 'training' || status === 'completed') && (
             <div className="relative h-2 bg-neutral-900 w-full rounded-full overflow-hidden">
               <div 
                 className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 ease-out shadow-[0_0_10px_#22c55e]"
                 style={{ width: `${progress}%` }}
               />
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AITrainingStudio;
