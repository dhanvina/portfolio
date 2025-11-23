
// LOCAL SIMULATION SERVICE
// Replaces external API calls with a local, rule-based response engine.

import { PROJECTS, EXPERIENCE, TECH_STACK, SOCIAL_LINKS } from '../constants';

const SYSTEM_DELAY_MS = 30; // Speed of typing effect

/**
 * Generates a response based on keywords in the prompt.
 */
const generateLocalResponse = (prompt: string): string => {
  const p = prompt.toLowerCase();

  // 1. Identity / About
  if (p.includes('who are you') || p.includes('your name') || p.includes('about')) {
    return `I am the Neural Interface for Dhanvina's portfolio. 
    
Dhanvina is a Chief AI Officer and Lead AI Engineer specializing in Deep Learning, MLOps, and scalable backend architecture. I can provide details on her Projects, Experience, or Tech Stack.`;
  }

  // 2. Projects
  if (p.includes('project') || p.includes('build') || p.includes('work')) {
    const projectList = PROJECTS.map(proj => `- ${proj.title}: ${proj.description} [${proj.status}]`).join('\n');
    return `Accessing Project Database...\n\nHere are some key deployed systems:\n${projectList}\n\nWould you like specific details on 'CtrlFake' or 'MinutesAI'?`;
  }

  // 3. Experience
  if (p.includes('experience') || p.includes('job') || p.includes('career') || p.includes('company')) {
    const job = EXPERIENCE[0]; // Current job
    return `Current Role: ${job.role} at ${job.company} (${job.period}).\n\nKey Achievements:\n${job.description.join('\n')}\n\nType 'full experience' to see the complete log.`;
  }

  // 4. Skills / Tech
  if (p.includes('skill') || p.includes('tech') || p.includes('stack') || p.includes('language')) {
    return `Analyzing Tech Arsenal...\n\n- AI/ML Core: Python, PyTorch, TensorFlow, YOLO.\n- GenAI: LangChain, Ollama, Gemini.\n- Backend: Django, FastAPI, Docker.\n- Cloud: AWS, GCP, Azure.\n\nDhanvina specializes in end-to-end MLOps pipelines.`;
  }

  // 5. Contact
  if (p.includes('contact') || p.includes('email') || p.includes('hire') || p.includes('linkedin')) {
    return `Communication Channels Open:\n\n- LinkedIn: ${SOCIAL_LINKS.linkedin}\n- Email: ${SOCIAL_LINKS.email}\n- GitHub: ${SOCIAL_LINKS.github}\n\nPriority is given to professional inquiries via LinkedIn.`;
  }

  // 6. Specific Project Queries
  if (p.includes('ctrlfake')) return "CtrlFake is a Deepfake Detection platform achieving >90% accuracy using PyTorch and Computer Vision techniques.";
  if (p.includes('minutesai')) return "MinutesAI automates meeting documentation using LangChain and Ollama, offering modular output formats (PDF/JSON).";
  if (p.includes('ctrlthreats')) return "CtrlThreats utilizes NLP for cybersecurity threat detection, reducing manual review time by 60%.";

  // Default / Fallback
  return `Command not recognized by local index. 
  
Try asking about:
- "Projects"
- "Experience"
- "Tech Stack"
- "Contact Info"
- "About Dhanvina"

System is running in Offline Simulation Mode.`;
};

/**
 * Simulates a streaming response by breaking text into chunks and emitting them over time.
 */
export const streamGeminiResponse = async (
  prompt: string, 
  onChunk: (text: string) => void
) => {
  // Simulate network latency (initial "thinking" time)
  await new Promise(resolve => setTimeout(resolve, 600));

  const responseText = generateLocalResponse(prompt);
  
  // Split into small chunks to simulate token generation
  const chunkSize = 4; // chars per tick
  let currentIndex = 0;

  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (currentIndex >= responseText.length) {
        clearInterval(interval);
        resolve();
        return;
      }

      const nextChunk = responseText.slice(currentIndex, currentIndex + chunkSize);
      onChunk(nextChunk); // Send the actual text chunk, not the accumulated text
      currentIndex += chunkSize;
    }, SYSTEM_DELAY_MS);
  });
};
