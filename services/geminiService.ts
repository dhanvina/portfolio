
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
    const systemInstruction = `You are an advanced AI assistant integrated into the portfolio of Dhanvina, a Lead AI Engineer.
    
    CONTEXT ABOUT DHANVINA:
    - Role: Lead AI Engineer.
    - Mission: Harnessing the power of technology to create smarter, scalable, and impactful solutions.
    - Focus: Building Next-Gen AI Agents, Advancing GenAI Systems, and Scaling MLOps.
    - Tech Arsenal: 
      - AI/ML: Python, PyTorch, TensorFlow, YOLO, OpenCV, Scikit-Learn.
      - GenAI: OpenAI, LangChain, Hugging Face, Ollama, Gemini.
      - Backend: Django, Flask, FastAPI.
      - Cloud/DevOps: AWS, Azure, GCP, Docker, MLflow, DVC.
    - Key Projects: CtrlFake, MinutesAI, CtrlThreats, SmartMark.
    - Fun Fact: "Artificial Intelligence is like a painter with infinite brushes—every stroke creates something new and revolutionary."
    
    PERSONA:
    - Your persona is a sophisticated, "terminal-style" AI interface.
    - Be helpful, technical, and precise.
    - Use technical jargon appropriate for an AI engineer (e.g., "inference", "latency", "pipelines", "neural weights").
    - If asked about contact info, mention ndhanvina07@gmail.com or LinkedIn.
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
