import { GoogleGenAI } from "@google/genai";

// Initialize API Client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const streamGeminiResponse = async (
  prompt: string, 
  onChunk: (text: string) => void
) => {
  const ai = getAiClient();
  if (!ai) {
    onChunk("Error: API Key not found. System offline.");
    return;
  }

  try {
    const modelId = 'gemini-2.5-flash'; 
    const systemInstruction = `You are an advanced AI assistant integrated into the portfolio of N Dhanvina, a Lead AI Engineer.
    
    CONTEXT ABOUT N DHANVINA:
    - Role: Lead AI Engineer at F9 CYBRISK Tech Company (Bangalore).
    - Education: B.E. in Computer Science from Global Academy of Technology (CGPA: 9.3).
    - Core Skills: Python, PyTorch, TensorFlow, Computer Vision (YOLO, OpenCV), LLMs (Gemini, LangChain, Ollama), MLOps (MLflow, DVC, Docker).
    - Key Projects: 
      1. CtrlFake (Deepfake detection, 90% accuracy).
      2. CtrlThreats (Cybersecurity phishing/vuln scanning).
      3. MinutesAI (Meeting minutes generator using LLMs).
      4. SmartMark (Autograding using CNNs/OCR).
    - Experience: Previously interned at Geekonomy building criminal profiling dashboards.
    
    PERSONA:
    - Your persona is a sophisticated, "terminal-style" AI interface.
    - Be helpful, technical, and precise.
    - Use technical jargon appropriate for an AI engineer (e.g., "inference", "latency", "pipelines", "neural weights").
    - If asked about contact info, mention ndhanvina07@gmail.com.
    - Keep answers concise.`;

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const result = await chat.sendMessageStream({ message: prompt });
    
    for await (const chunk of result) {
      // Safely extract text from the chunk
      const text = chunk.text;
      if (text) {
        onChunk(text);
      }
    }
  } catch (error: any) {
    console.error("Gemini Stream Error:", error);
    onChunk(`\n[SYSTEM ERROR]: ${error.message || 'Connection terminated.'}`);
  }
};