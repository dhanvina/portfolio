import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamGeminiResponse } from '../services/geminiService';

// Typewriter Component for character-by-character reveal
const Typewriter: React.FC<{ text: string; onUpdate?: () => void }> = ({ text, onUpdate }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    // If displayed text is shorter than target text, append next char
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
        onUpdate?.();
      }, 10); // 10ms delay for rapid terminal feel
      return () => clearTimeout(timeout);
    }
  }, [text, displayed, onUpdate]);

  // Reset if text prop changes drastically (e.g. cleared) or is shorter
  useEffect(() => {
    if (text.length < displayed.length) {
      setDisplayed(text);
    }
  }, [text]);

  return <span className="whitespace-pre-wrap leading-relaxed">{displayed}</span>;
};

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'System initialized. Neural Interface v4.0 ready.\nExecute "help" for available commands or query system parameters directly.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const cmd = input.trim();
    if (!cmd || isLoading) return;

    // --- LOCAL COMMAND HANDLING ---

    // 1. CLEAR
    if (cmd.toLowerCase() === 'clear') {
      setMessages([
        { role: 'model', text: 'Terminal history cleared.\nSystem Interface v4.0 ready.' }
      ]);
      setInput('');
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    // Standard Message Processing
    const userMessage: ChatMessage = { role: 'user', text: cmd };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add placeholder for response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    // 2. HELP & INFO COMMANDS
    const lowerCmd = cmd.toLowerCase();
    if (['help', 'status', 'whoami', 'contact'].includes(lowerCmd)) {
      let responseText = '';
      
      switch (lowerCmd) {
        case 'help':
          responseText = `AVAILABLE COMMANDS:
  -------------------
  help        : Show this command list
  status      : Display system diagnostics & core health
  contact     : Retrieve communication channels
  whoami      : Display current session privileges
  clear       : Clear terminal output buffer

  > Or simply ask a question to query the Neural Engine directly.`;
          break;
        
        case 'status':
          responseText = `SYSTEM DIAGNOSTICS:
  -------------------
  CORE MODEL  : Gemini-2.5-Flash [OPTIMIZED]
  LATENCY     : 12ms (Nominal)
  MEMORY      : 64GB / 128GB Allocated
  ENCRYPTION  : AES-256-GCM [ACTIVE]
  MODULES     : [Vision, NLP, MLOps] ONLINE`;
          break;

        case 'contact':
          responseText = `COMMUNICATION CHANNELS:
  -------------------
  EMAIL       : ndhanvina07@gmail.com
  LINKEDIN    : [Link in Footer]
  GITHUB      : [Link in Footer]
  MODE        : Async/Sync Available`;
          break;

        case 'whoami':
          responseText = `USER SESSION:
  -------------------
  ID          : GUEST_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
  PRIVILEGE   : READ_ONLY
  ACCESS      : PUBLIC_INTERFACE
  IP_MASK     : ENABLED`;
          break;
      }

      // Simulate processing delay for realism
      setTimeout(() => {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.text = responseText;
          return newMessages;
        });
        setIsLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 500);
      
      return;
    }

    // --- API HANDLING (Gemini) ---
    try {
      let fullText = '';
      await streamGeminiResponse(cmd, (chunk) => {
        fullText += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.text = fullText;
          }
          return newMessages;
        });
      });
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = "ERROR: Connection to Neural Core failed. Check API configuration.";
          return newMessages;
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-black font-mono text-sm relative" onClick={() => inputRef.current?.focus()}>
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className="break-words">
            {msg.role === 'user' ? (
              <div className="text-white">
                <span className="text-green-500 mr-2">root@dhanvina:~$</span>
                <span>{msg.text}</span>
              </div>
            ) : (
              <div className="text-neutral-300 pl-4 border-l-2 border-neutral-800 relative">
                {/* 
                  Use Typewriter only for the very last message if it's from the model.
                  This ensures history is static (perf) but active response is animated.
                */}
                {idx === messages.length - 1 && msg.role === 'model' ? (
                   <Typewriter text={msg.text} onUpdate={() => scrollToBottom("auto")} />
                ) : (
                   <span className="whitespace-pre-wrap leading-relaxed">{msg.text}</span>
                )}
                
                {/* Blinking Block Cursor - shows during typing or loading */}
                {idx === messages.length - 1 && (
                   <span className="inline-block w-2.5 h-5 bg-green-500 align-middle ml-1 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-green-500 flex-shrink-0">root@dhanvina:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-grow bg-transparent border-none text-white focus:outline-none focus:ring-0 p-0 font-mono placeholder-neutral-700"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          {isLoading && <span className="text-xs text-neutral-500 animate-pulse">[PROCESSING]</span>}
        </div>
      </div>
    </div>
  );
};

export default AIChat;