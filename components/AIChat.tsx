import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamGeminiResponse } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'System initialized. Neural Interface v4.0 ready.\nExecute "help" or query system parameters directly.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create a placeholder for the model response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      let fullText = '';
      await streamGeminiResponse(input, (chunk) => {
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
    } finally {
      setIsLoading(false);
      // Focus input after response
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
      <div className="flex-grow overflow-y-auto p-4 space-y-2 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className="break-words">
            {msg.role === 'user' ? (
              <div className="text-white">
                <span className="text-green-500 mr-2">root@dhanvina:~$</span>
                <span>{msg.text}</span>
              </div>
            ) : (
              <div className="text-neutral-300 mt-1 mb-3 pl-4 border-l-2 border-neutral-800">
                {msg.text.split('\n').map((line, i) => (
                   <div key={i} className="min-h-[1.2em]">{line}</div>
                ))}
                {isLoading && idx === messages.length - 1 && (
                   <span className="inline-block w-2 h-4 bg-white animate-blink" />
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
            className="flex-grow bg-transparent border-none text-white focus:outline-none focus:ring-0 p-0 font-mono"
            autoFocus
          />
          {isLoading && <span className="text-xs text-neutral-500 animate-pulse">[PROCESSING]</span>}
        </div>
      </div>
    </div>
  );
};

export default AIChat;