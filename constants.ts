
import { Project, Job, SkillData, TechCategory } from './types';

export const TECH_STACK: TechCategory[] = [
  {
    category: "AI/ML CORE",
    skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "Numpy", "OpenCV", "YOLO", "XGBoost", "ONNX", "TFLite"]
  },
  {
    category: "GEN AI & LLMs",
    skills: ["OpenAI", "LangChain", "Hugging Face", "Ollama", "Gemini"]
  },
  {
    category: "BACKEND & DATABASE",
    skills: ["Django", "Flask", "FastAPI", "PostgreSQL", "MySQL", "MongoDB"]
  },
  {
    category: "CLOUD & DEVOPS",
    skills: ["AWS", "Azure", "GCP", "Docker", "GitHub Actions", "MLflow", "DVC", "Celery", "Redis", "Render", "Vercel"]
  },
  {
    category: "MOBILE & TOOLS",
    skills: ["Flutter", "Dart", "Jupyter", "Kaggle", "Colab", "Streamlit", "Postman", "VS Code", "Git"]
  }
];

export const ABOUT = {
  intro: "Welcome! I'm Dhanvina, a passionate AI Engineer and Tech Visionary. My mission is to harness the power of technology to create smarter, scalable, and impactful solutions for the challenges of tomorrow. With a love for cutting-edge innovation and a strong belief in the transformative potential of AI, I specialize in building systems that bridge creativity and intelligence.",
  bullets: [
    { title: "AI Enthusiast", desc: "Focused on shaping smarter algorithms and predictive models." },
    { title: "Software Architect", desc: "Designing modern, scalable backend systems for production." },
    { title: "Tech Visionary", desc: "Committed to ethical and sustainable AI development." }
  ],
  funFact: "Artificial Intelligence is like a painter with infinite brushes—every stroke creates something new and revolutionary."
};

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
    status: 'LIVE',
    link: 'https://github.com/dhanvina/CtrlFake'
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
    status: 'LIVE',
    link: 'https://github.com/dhanvina/MinutesAI'
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
    status: 'LIVE',
    link: 'https://github.com/dhanvina/CtrlThreats'
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
    status: 'ARCHIVED',
    link: 'https://github.com/dhanvina/SmartMark'
  },
  {
    id: 'SYS_005',
    title: 'Phishing Detection',
    description: 'End-to-end platform using Django, Celery, and PostgreSQL. Engineered 34+ feature extraction pipeline with ensemble ML classifiers (XGBoost, Random Forest).',
    tech: ['Django', 'XGBoost', 'Docker'],
    metrics: [
      { label: 'Features', value: '34+' },
      { label: 'CI/CD', value: 'Docker' }
    ],
    status: 'LIVE',
    link: 'https://github.com/dhanvina/Phishing-Detection'
  }
];

export const EXPERIENCE: Job[] = [
  {
    role: 'Lead AI Engineer',
    company: 'F9 CYBRISK Tech Company',
    period: 'JUNE 2024 - PRESENT',
    description: [
      "Spearheaded the design and deployment of CtrlFake, an AI-driven platform to detect deepfake content in videos/images, achieving >90% accuracy.",
      "Designed and directed the development of CtrlThreats, a robust cybersecurity solution for phishing detection and automated vulnerability scanning using NLP and ML models, reducing manual analysis by 60%.",
      "Built production-ready MLOps pipelines using Docker, MLflow, and GitHub Actions for model versioning, continuous training, and deployment.",
      "Developed professional YOLO MLOps pipeline for seal verification with DVC data versioning, MLflow experiment tracking, and Streamlit testing interface.",
      "Built end-to-end Phishing Detection platform using Django, Celery, PostgreSQL; engineered 34+ feature extraction pipeline with ensemble ML classifiers."
    ],
    stack: ['PyTorch', 'MLflow', 'AWS', 'Docker', 'YOLO', 'Django', 'NLP']
  },
  {
    role: 'Application Developer Intern',
    company: 'Geekonomy',
    period: 'APRIL 2024 - JUNE 2024',
    description: [
      "Designed a cross-platform criminal profiling dashboard in Flutter, integrating 20+ APIs from government and criminal databases to automate case workflows.",
      "Optimized API data pipelines to ensure smooth synchronization and real-time updates between various law enforcement data systems."
    ],
    stack: ['Flutter', 'REST APIs', 'Data Pipelines', 'Dart']
  }
];

export const SKILL_DATA: SkillData[] = [
  { subject: 'Deep Learning', A: 145, fullMark: 150 },
  { subject: 'LLMs & GenAI', A: 140, fullMark: 150 },
  { subject: 'MLOps/DevOps', A: 135, fullMark: 150 },
  { subject: 'Python/Backend', A: 150, fullMark: 150 },
  { subject: 'Cloud (AWS/GCP)', A: 120, fullMark: 150 },
  { subject: 'Mobile (Flutter)', A: 110, fullMark: 150 },
];