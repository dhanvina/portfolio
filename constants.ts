
import { Project, Job, SkillData, TechCategory, EducationItem, Publication } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com/dhanvina",
  linkedin: "https://www.linkedin.com/in/ndhanvina/",
  email: "ndhanvina07@gmail.com"
};

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
    skills: ["Flutter", "Dart", "Figma", "UI/UX", "Jupyter", "Postman", "VS Code", "Git", "Streamlit"]
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

export const EDUCATION: EducationItem[] = [
  {
    institution: "Global Academy of Technology",
    degree: "B.E. Computer Science & Engineering",
    period: "JUL 2020 - JUL 2024",
    grade: "9.2 CGPA",
    desc: "Developed a robust technical foundation in Data Structures, Algorithms, Machine Learning, and Deep Learning. Collaborated with technical teams to drive innovative product development solutions.",
    skills: ["Computer Vision", "Machine Learning", "Deep Learning", "Django", "Flutter", "Project Management"]
  },
  {
    institution: "Sri Chaitanya College of Education",
    degree: "Pre-University (Computer Science)",
    period: "JUN 2018 - JUN 2020",
    grade: "A Grade",
    skills: ["Computer Science", "Mathematics", "Physics"]
  },
  {
    institution: "Sindhi High School",
    degree: "High School Education",
    period: "Completed 2018",
    grade: "Distinction"
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    title: "Investigation of Machine Learning Algorithms in Detecting Chronic Kidney Disorder",
    publisher: "SPRINGER",
    date: "JUN 7, 2025",
    description: "A non-trivial effort made in the direction of advancement in machine learning (ML) through the past decade has brought us much ahead in clinical and research settings. This research explores traditional ML algorithms for improving of diagnosis and prognosis of chronic kidney disease (CKD). We study decision trees, support vector machines, and Naive Bayes to arrive at an accurate, robust, and explainable model for predicting the progression of CKD. The comparative study invokes analysis of the proposed models in uncovering patterns, extracting vital components from the diverse patient information and medical imaging to generate accurate prognostic insights.",
    link: "https://link.springer.com/chapter/10.1007/978-981-96-4241-0_11"
  },
  {
    title: "AI Powered Resource Management System",
    publisher: "IEEE",
    date: "JAN 15, 2025",
    description: "The ongoing problem of manual data entry in education has a novel answer in the form of the AI-Powered Resource Management System. Through the use of cutting-edge technologies and deep learning, it transforms the processing of invoices while lowering errors and streamlining operations. The Vosk speech recognition toolkit makes voice querying simple, increasing automation and accessibility. The system additionally incorporates liveness detection using OpenCV for authentication in order to guarantee robust security.",
    link: "https://ieeexplore.ieee.org/document/10837375/references#references"
  },
  {
    title: "Speech-enabled machine learning-based automated attendance monitoring system through face recognition",
    publisher: "IEEE",
    date: "SEP 30, 2023",
    description: "Verification, and validation are important issues in computerized systems for security in almost every domain. Face recognition plays a huge role in authenticity. To make this attendance monitoring system more hassle-free, in this paper, we have proposed and implemented an automated speech-recognized attendance monitoring system primarily based on image processing, speech recognition, and the machine learning algorithm LBPH. Our proposed system has been tested robust and efficient in automating the monitoring task.",
    link: "https://ieeexplore.ieee.org/document/10263205"
  },
  {
    title: "Survey of Regression-Driven Stock-Market-Price-Predictors",
    publisher: "International Journal of Scientific Research in Science, Engineering and Technology",
    date: "JUN 17, 2022",
    description: "The Stock market price prediction is a sophisticated task intrinsically involving the company’s earnings, the market competition, demand, and stability apart from the extrinsic parameters. Thus, multiple algorithms have been written to predict the non-linear and fluctuating Stock price sensitized by the market emotions. Different algorithms have different principles and varying degrees of accuracy.",
    link: "https://ijsrset.com/IJSRSET22991540"
  }
];

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
    role: 'Chief AI Officer',
    company: 'F9 Cybrisk Tech Private Limited',
    period: 'MAY 2024 - PRESENT',
    description: [
      "Designed and deployed CtrlFake (ctrlfake.com), an AI-driven platform for deepfake detection achieving >90% accuracy.",
      "Directed the development of CtrlThreats (ctrlthreats.com), a cybersecurity NLP/ML solution that reduced manual threat review by 60%.",
      "Architected production-grade MLOps pipelines utilizing Docker, MLflow, and CI/CD workflows for automated model training and deployment.",
      "Led engineering efforts on multi-class object detection systems using specialized YOLO models."
    ],
    stack: ['PyTorch', 'MLOps', 'Docker', 'GenAI', 'YOLO', 'AWS']
  },
  {
    role: 'App Developer Intern',
    company: 'Geekonomy Technology',
    period: 'APR 2024 - JUN 2024',
    description: [
      "Designed a cross-platform criminal profiling dashboard in Flutter, integrating 20+ APIs from government databases.",
      "Automated complex case workflows, successfully reducing manual data entry overhead by 80%.",
      "Optimized real-time data pipelines ensuring smooth synchronization between disparate law enforcement systems."
    ],
    stack: ['Flutter', 'Dart', 'REST APIs', 'Data Pipelines']
  },
  {
    role: 'Team Lead & Backend Developer',
    company: 'Global Academy of Technology (Incubation)',
    period: 'JUN 2023 - JAN 2024',
    description: [
      "Led a team in developing a comprehensive inventory & asset management system using Django.",
      "Implemented Role-Based Access Control (RBAC) and JWT authentication for secure, fine-grained access management.",
      "Streamlined the tracking of software and hardware assets, significantly improving operational utilization."
    ],
    stack: ['Django', 'Python', 'PostgreSQL', 'JWT', 'RBAC']
  },
  {
    role: 'App Developer Intern',
    company: 'DezyNation',
    period: 'MAR 2023 - APR 2023',
    description: [
      "Led the integration of 25+ APIs into a finance money transfer Flutter application, ensuring robust data validation.",
      "Implemented secure authentication methods including OTP and MPIN, enhancing user trust and app reliability.",
      "Directed rigorous live testing procedures to ensure API responsiveness and seamless user experience."
    ],
    stack: ['Flutter', 'Dart', 'REST APIs', 'Mobile Security']
  },
  {
    role: 'Web Developer Intern',
    company: 'Varuth',
    period: 'OCT 2022 - NOV 2022',
    description: [
      "Optimized website design workflows using Figma, increasing team productivity and design consistency.",
      "Conducted user research and implemented design improvements impacting 500+ international visitors.",
      "Employed data-driven insights to refine content strategy and enhance overall user engagement."
    ],
    stack: ['Figma', 'HTML5', 'CSS', 'UI/UX']
  },
  {
    role: 'ML Summer School Mentee',
    company: 'Amazon',
    period: 'JUL 2022',
    description: [
      "Selected for Amazon's intensive ML Summer School focused on advanced AI topics.",
      "Gained expertise in Deep Neural Networks, Probabilistic Graphical Models, Reinforcement Learning, and Causal Inference."
    ],
    stack: ['Deep Learning', 'Reinforcement Learning', 'Math']
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
