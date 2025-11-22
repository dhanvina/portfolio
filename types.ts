
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  link?: string;
  status: 'LIVE' | 'DEV' | 'ARCHIVED';
}

export interface Job {
  role: string;
  company: string;
  period: string;
  description: string[]; // Changed to array of strings for bullet points
  stack: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface TechCategory {
  category: string;
  skills: string[];
}
