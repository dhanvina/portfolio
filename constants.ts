import { Project, Job, SkillData } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'SYS_001',
    title: 'CtrlFake',
    description: 'AI-driven platform designed to detect deepfake content in videos and images. Achieved >90% accuracy using advanced deep learning architectures.',
    tech: ['PyTorch', 'Computer Vision', 'Deep Learning'],
    metrics: [
      { label: 'Accuracy', value: '>90%' },
      { label: 'Type', value: 'Detection' }
    ],
    status: 'LIVE'
  },
  {
    id: 'SYS_002',
    title: 'MinutesAI',
    description: 'Automated meeting minutes generator using LangChain & Ollama. Features modular OOP architecture, multi-format output (PDF/JSON), and CLI/Streamlit interfaces.',
    tech: ['LangChain', 'Ollama', 'Streamlit'],
    metrics: [
      { label: 'Outputs', value: 'PDF/JSON' },
      { label: 'Arch', value: 'Modular' }
    ],
    status: 'LIVE'
  },
  {
    id: 'SYS_003',
    title: 'CtrlThreats',
    description: 'Cybersecurity solution for phishing detection and automated vulnerability scanning using NLP and ML models. Reduced manual analysis by 60%.',
    tech: ['NLP', 'MLOps', 'Scikit-learn'],
    metrics: [
      { label: 'Efficiency', value: '+60%' },
      { label: 'Domain', value: 'Security' }
    ],
    status: 'LIVE'
  },
  {
    id: 'SYS_004',
    title: 'SmartMark',
    description: 'Deep learning solution to autograde handwritten answer sheets using CNNs and OCR. Trained EfficientNet variants for character recognition.',
    tech: ['CNNs', 'OCR', 'EfficientNet'],
    metrics: [
      { label: 'Time Saved', value: '70%' },
      { label: 'Task', value: 'Vision' }
    ],
    status: 'ARCHIVED'
  },
  {
    id: 'SYS_005',
    title: 'Phishing Detection Platform',
    description: 'End-to-end platform using Django, Celery, and PostgreSQL. Engineered 34+ feature extraction pipeline with ensemble ML classifiers (XGBoost, Random Forest).',
    tech: ['Django', 'XGBoost', 'Docker'],
    metrics: [
      { label: 'Features', value: '34+' },
      { label: 'CI/CD', value: 'Docker' }
    ],
    status: 'LIVE'
  }
];

export const EXPERIENCE: Job[] = [
  {
    role: 'Lead AI Engineer',
    company: 'F9 CYBRISK Tech Company',
    period: 'JUNE 2024 - PRESENT',
    description: 'Spearheading deepfake detection (CtrlFake) and cybersecurity solutions (CtrlThreats). Building production-ready MLOps pipelines using Docker, MLflow, and DVC for continuous training and deployment.',
    stack: ['PyTorch', 'MLflow', 'AWS', 'Docker', 'YOLO']
  },
  {
    role: 'Application Developer Intern',
    company: 'Geekonomy',
    period: 'APRIL 2024 - JUNE 2024',
    description: 'Designed a cross-platform criminal profiling dashboard in Flutter integrating 20+ APIs. Optimized data pipelines for real-time updates between law enforcement systems.',
    stack: ['Flutter', 'APIs', 'Data Pipelines']
  }
];

export const SKILL_DATA: SkillData[] = [
  { subject: 'Computer Vision', A: 145, fullMark: 150 },
  { subject: 'LLMs & NLP', A: 140, fullMark: 150 },
  { subject: 'MLOps/Docker', A: 135, fullMark: 150 },
  { subject: 'Python/Backend', A: 150, fullMark: 150 },
  { subject: 'Cloud (AWS/GCP)', A: 120, fullMark: 150 },
  { subject: 'Deep Learning', A: 140, fullMark: 150 },
];