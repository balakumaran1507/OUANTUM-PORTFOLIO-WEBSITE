export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  datePublished: string; // ISO 8601
  author: string;
  authorRole: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  tags: string[];
  content: BlogSection[];
  takeaways: string[];
  references: { name: string; url?: string }[];
}

interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'quote' | 'list';
  text?: string;
  items?: string[];
}

export const CATEGORIES = [
  'All',
  'Quality Assurance',
  'Infrastructure Inspection',
  'Structural Assessment',
  'Engineering Standards',
  'Industry Insights',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const blogPosts: BlogPost[] = [
  // ─── QUALITY ASSURANCE ────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'how-ai-reduces-rework-costs-in-construction',
    title: 'How Can AI Reduce Rework Costs in Construction Projects?',
    category: 'Quality Assurance',
    date: 'June 5, 2026',
    datePublished: '2026-06-05T09:00:00+05:30',
    author: 'BALAKUMARAN D',
    authorRole: 'President',
    excerpt:
      'AI identifies defects, design conflicts, and quality issues before they become expensive problems. Through computer vision, predictive analytics, and real-time monitoring, AI enables project teams to take corrective action immediately.',
    coverImage: '/assets/images/blog_images/mixboard-image (2).png',
    coverImageAlt: 'Amaravati project showing AI defect detection in action',
    tags: ['AI', 'rework', 'construction costs', 'quality assurance', 'computer vision'],
    takeaways: [
      'Early defect detection at the design or initial construction stage prevents exponential repair costs later in the project lifecycle.',
      'Computer vision and automated sensor data comparison against BIM models reduce human inspection error.',
      'Real-time digital alerting systems allow project managers to halt defective work instantly, minimizing material and labor waste.'
    ],
    references: [
      { name: 'IS 456:2000 - Plain and Reinforced Concrete - Code of Practice', url: 'https://bis.gov.in' },
      { name: 'National Building Code of India (NBC) 2016', url: 'https://bis.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'AI reduces rework costs in construction projects by identifying defects, design conflicts, and quality issues before they become expensive problems. Through computer vision, predictive analytics, and real-time monitoring, AI can detect construction errors early, allowing project teams to take corrective action immediately.',
      },
      {
        type: 'heading',
        text: 'Early Detection Through Computer Vision',
      },
      {
        type: 'paragraph',
        text: 'AI-powered quality assurance systems compare actual site conditions with project specifications and BIM models to ensure compliance. By reducing human error, improving inspection accuracy, and accelerating issue detection, AI helps contractors minimize material waste, labor costs, project delays, and costly reconstruction work.',
      },
      {
        type: 'heading',
        text: 'Predictive Analytics for Risk Prevention',
      },
      {
        type: 'paragraph',
        text: 'Machine learning models trained on historical project data can predict where rework is most likely to occur before the work even begins. These systems analyze patterns from thousands of completed projects to surface risk factors that human reviewers might miss.',
      },
      {
        type: 'list',
        items: [
          'Real-time defect detection using camera feeds and sensor data',
          'Automated comparison of as-built conditions against BIM models',
          'Predictive risk scoring for each construction activity',
          'Immediate alert systems that notify supervisors of deviations',
        ],
      },
      {
        type: 'heading',
        text: 'The ROI of Prevention',
      },
      {
        type: 'paragraph',
        text: 'Industry data consistently shows that identifying a defect at design stage costs roughly 1x to fix. The same defect identified during construction costs 10x. Identified post-completion, it costs 100x or more. AI moves the detection point earlier, compressing that cost curve dramatically.',
      },
      {
        type: 'quote',
        text: 'Every hour spent on AI-powered quality monitoring during construction can save 10 to 100 hours of rework after completion.',
      },
    ],
  },
  {
    id: 2,
    slug: 'roi-of-ai-powered-construction-quality-assurance',
    title: 'What Is the ROI of AI-Powered Construction Quality Assurance?',
    category: 'Quality Assurance',
    date: 'May 28, 2026',
    datePublished: '2026-05-28T09:00:00+05:30',
    author: 'RAHUL',
    authorRole: 'CEO',
    excerpt:
      'The return on investment of AI-powered QA comes from reduced rework, improved productivity, faster inspections, and lower operational costs. Organizations implementing AI-driven QA often experience fewer project delays and better resource utilization.',
    coverImage: '/assets/images/blog_images/mixboard-image (3).png',
    coverImageAlt: 'Engineer reviewing AI-generated quality assurance report',
    tags: ['ROI', 'quality assurance', 'AI', 'construction productivity'],
    takeaways: [
      'AI-driven quality assurance typically achieves full ROI in less than six months by cutting manual QA overhead and rework.',
      'Automated reporting saves senior engineers 20 to 40 hours per project fortnight, freeing them for critical supervision tasks.',
      'Objective, machine-readable records mitigate dispute risks and speed up government sign-offs.'
    ],
    references: [
      { name: 'Guidelines on Quality Systems for Road Bridges (IRC:SP:47-1998)', url: 'https://irc.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'The return on investment (ROI) of AI-powered construction quality assurance comes from reduced rework, improved productivity, faster inspections, and lower operational costs. AI automates defect detection, compliance verification, and documentation processes, enabling teams to identify issues earlier than traditional inspections.',
      },
      {
        type: 'heading',
        text: 'Where the Value Comes From',
      },
      {
        type: 'list',
        items: [
          'Rework reduction: typically 30 to 60% fewer defect-driven corrections',
          'Inspection speed: AI-assisted inspection is 5 to 10x faster than manual review',
          'Documentation: automated report generation saves 20 to 40 hours per project fortnight',
          'Compliance: real-time IS code verification eliminates costly post-submission corrections',
        ],
      },
      {
        type: 'heading',
        text: 'Quantifying the Returns',
      },
      {
        type: 'paragraph',
        text: 'Organizations implementing AI-driven quality assurance often experience fewer project delays, reduced maintenance costs, and better resource utilization. The long-term benefits include higher construction quality, increased client satisfaction, and improved project profitability.',
      },
      {
        type: 'paragraph',
        text: 'For a medium-sized infrastructure project handling 200 data points per bi-weekly visit, AI-assisted QA typically delivers a payback period of less than six months when factoring in reduced rework, faster inspections, and eliminated manual documentation hours.',
      },
      {
        type: 'quote',
        text: 'AI quality assurance is not a technology cost, it is a risk mitigation investment with a measurable, compounding return.',
      },
    ],
  },

  // ─── INFRASTRUCTURE INSPECTION ─────────────────────────────────────────────
  {
    id: 6,
    slug: 'how-ai-improves-infrastructure-asset-management',
    title: 'How Can AI Improve Infrastructure Asset Management?',
    category: 'Infrastructure Inspection',
    date: 'April 28, 2026',
    datePublished: '2026-04-28T09:00:00+05:30',
    author: 'RAGHU',
    authorRole: 'CMO',
    excerpt:
      'AI improves infrastructure asset management by continuously monitoring asset conditions, predicting maintenance needs, and supporting lifecycle planning using sensor data, computer vision, and predictive analytics.',
    coverImage: '/assets/images/blog_images/mixboard-image (4).png',
    coverImageAlt: 'Kendriya Vidyalaya infrastructure asset monitoring',
    tags: ['asset management', 'infrastructure', 'AI', 'lifecycle planning'],
    takeaways: [
      'AI shifts infrastructure asset management from reactive or calendar-based maintenance to data-driven predictive maintenance.',
      'Fusion of IoT vibration sensors and camera feeds provides continuous assessment of structural health.',
      'Predictive analytics extend asset lifespan and optimize public repair budgets by targeting deteriorating zones early.'
    ],
    references: [
      { name: 'IS 13311 (Part 1):1992 - Non-destructive Testing of Concrete - Ultrasonic Pulse Velocity', url: 'https://bis.gov.in' },
      { name: 'IS 13311 (Part 2):1992 - Non-destructive Testing of Concrete - Rebound Hammer', url: 'https://bis.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'AI improves infrastructure asset management by continuously monitoring asset conditions, predicting maintenance needs, and supporting lifecycle planning. Using sensor data, computer vision, and predictive analytics, AI can identify deterioration patterns and forecast future performance.',
      },
      {
        type: 'heading',
        text: 'Continuous Condition Monitoring',
      },
      {
        type: 'paragraph',
        text: 'This enables infrastructure owners to prioritize maintenance activities, reduce operational costs, and extend asset lifespan. AI-driven asset management improves reliability, safety, and long-term infrastructure sustainability.',
      },
      {
        type: 'list',
        items: [
          'IoT sensor networks providing 24/7 structural health data',
          'Computer vision systems detecting surface deterioration at scale',
          'Machine learning models forecasting remaining useful life',
          'Automated work order generation based on condition thresholds',
        ],
      },
      {
        type: 'heading',
        text: 'Lifecycle Cost Optimization',
      },
      {
        type: 'paragraph',
        text: 'Traditional asset management relies on time-based or failure-based maintenance schedules. AI enables condition-based maintenance, which means infrastructure owners only intervene when the data indicates it is necessary, reducing unnecessary interventions while preventing failures before they occur.',
      },
    ],
  },
  {
    id: 7,
    slug: 'technologies-transforming-infrastructure-maintenance',
    title: 'What Technologies Are Transforming Infrastructure Maintenance?',
    category: 'Infrastructure Inspection',
    date: 'April 20, 2026',
    datePublished: '2026-04-20T09:00:00+05:30',
    author: 'SABARI RAJA',
    authorRole: 'CFO',
    excerpt:
      'Technologies transforming infrastructure maintenance include AI, digital twins, IoT sensors, drones, robotics, and predictive analytics, providing real-time insights that reduce downtime and optimize maintenance budgets.',
    coverImage: '/assets/images/blog_images/mixboard-image (5).png',
    coverImageAlt: 'Drone inspecting infrastructure for maintenance assessment',
    tags: ['infrastructure', 'maintenance technology', 'drones', 'IoT', 'digital twins'],
    takeaways: [
      'Digital twins, drones, and IoT sensors work together to automate visual and structural inspections in hazardous environments.',
      'Machine learning algorithms detect microscopic surface cracks and corrosion markers before they affect structural load capacity.',
      'Integrating drone photogrammetry with BIM models enables comprehensive as-built vs. as-designed monitoring.'
    ],
    references: [
      { name: 'IRC:119-2015 - Guidelines for Design and Construction of Bridge Substructure and Foundations', url: 'https://irc.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Technologies transforming infrastructure maintenance include artificial intelligence, digital twins, IoT sensors, drones, robotics, and predictive analytics. These technologies provide real-time insights into infrastructure performance and condition.',
      },
      {
        type: 'heading',
        text: 'Key Technology Categories',
      },
      {
        type: 'list',
        items: [
          'Artificial intelligence for pattern recognition and anomaly detection',
          'Digital twins for virtual simulation and scenario planning',
          'IoT sensor networks for continuous structural monitoring',
          'Drone-based visual inspections for hard-to-access areas',
          'Robotics for automated repetitive inspection tasks',
          'Predictive analytics for maintenance scheduling optimization',
        ],
      },
      {
        type: 'heading',
        text: 'The Integration Advantage',
      },
      {
        type: 'paragraph',
        text: 'By automating inspections and enabling predictive maintenance, organizations can reduce downtime, improve safety, and optimize maintenance budgets. Smart infrastructure technologies are rapidly becoming essential for modern asset management strategies, particularly for aging infrastructure networks across India.',
      },
    ],
  },

  // ─── STRUCTURAL ASSESSMENT ───────────────────────────────────────────────
  {
    id: 11,
    slug: 'how-bim-improves-construction-quality-control',
    title: 'How Does BIM Improve Construction Quality Control?',
    category: 'Structural Assessment',
    date: 'March 20, 2026',
    datePublished: '2026-03-20T09:00:00+05:30',
    author: 'BALAKUMARAN D',
    authorRole: 'President',
    excerpt:
      'BIM improves construction quality control by providing a centralized digital representation of project specifications, geometry, and construction requirements, enabling teams to detect design conflicts and verify compliance.',
    coverImage: '/assets/images/blog_images/mixboard-image (6).png',
    coverImageAlt: 'BIM model being used for construction project pipelines',
    tags: ['BIM', 'quality control', 'construction', 'clash detection'],
    takeaways: [
      'BIM serves as a single source of truth that coordinates structural, MEP, and architectural designs to prevent clashes before construction.',
      'Combining 3D laser scans with BIM models provides objective, high-precision progress checks.',
      'Embedding QA checklists directly in the BIM workflow ensures all field tests map to their precise structural elements.'
    ],
    references: [
      { name: 'IS 1893 (Part 1):2016 - Criteria for Earthquake Resistant Design of Structures', url: 'https://bis.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Building Information Modeling (BIM) improves construction quality control by providing a centralized digital representation of project specifications, geometry, and construction requirements. BIM enables project teams to detect design conflicts, verify compliance, and monitor construction progress.',
      },
      {
        type: 'heading',
        text: 'Clash Detection Before Construction',
      },
      {
        type: 'paragraph',
        text: 'By improving coordination and reducing errors, BIM helps ensure that projects meet quality standards while minimizing rework and delays. Automated clash detection in BIM can identify thousands of spatial conflicts in hours, work that would take weeks of manual coordination reviews.',
      },
      {
        type: 'list',
        items: [
          'Automated clash detection between structural, MEP, and architectural models',
          'Visual progress monitoring by comparing as-built with BIM specifications',
          'Quality checklist integration directly within the BIM environment',
          'Compliance verification against applicable codes and standards',
        ],
      },
      {
        type: 'heading',
        text: 'Site-to-Model Comparison',
      },
      {
        type: 'paragraph',
        text: 'Advanced BIM workflows use photogrammetry and point cloud scanning to compare actual constructed conditions against the design model, providing an objective, measurable assessment of construction quality at every stage.',
      },
    ],
  },
  {
    id: 12,
    slug: 'benefits-of-bim-for-large-infrastructure-projects',
    title: 'What Are the Benefits of BIM for Large Infrastructure Projects?',
    category: 'Structural Assessment',
    date: 'March 12, 2026',
    datePublished: '2026-03-12T09:00:00+05:30',
    author: 'RAHUL',
    authorRole: 'CEO',
    excerpt:
      'BIM offers significant benefits for large infrastructure including improved collaboration, enhanced project visualization, reduced design conflicts, and better lifecycle management throughout the asset lifespan.',
    coverImage: '/assets/images/blog_images/mixboard-image (7).png',
    coverImageAlt: 'Large infrastructure BIM model displayed in a project review meeting',
    tags: ['BIM', 'infrastructure', 'lifecycle management', 'collaboration'],
    takeaways: [
      'For mega-projects with 50+ year lifespans, construction-phase BIM data serves as a critical asset operation manual.',
      '4D BIM scheduling visualizes the sequence of construction to optimize resource allocation and prevent spatial bottlenecks.',
      'BIM reduces change orders and design errors, keeping projects within budget constraints.'
    ],
    references: [
      { name: 'IS 13920:2016 - Ductile Design and Detailing of Reinforced Concrete Structures Subjected to Seismic Forces', url: 'https://bis.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'BIM offers significant benefits for large infrastructure projects, including improved collaboration, enhanced project visualization, reduced design conflicts, and better lifecycle management. BIM supports efficient planning, scheduling, and resource allocation while improving communication among stakeholders.',
      },
      {
        type: 'heading',
        text: 'Collaboration Across Disciplines',
      },
      {
        type: 'list',
        items: [
          'A single source of truth accessible to all project stakeholders',
          'Real-time model updates reflecting design changes instantly',
          'Integrated cost estimation linked directly to model elements',
          'Schedule visualization showing construction sequencing in 4D',
          'Sustainability analysis embedded in the design model',
        ],
      },
      {
        type: 'heading',
        text: 'Lifecycle Value',
      },
      {
        type: 'paragraph',
        text: 'These advantages contribute to higher project quality, reduced costs, and improved operational performance throughout the asset lifecycle. For large infrastructure assets with 50+ year design lives, the operational data captured in a BIM model during construction becomes an invaluable asset management resource for decades after handover.',
      },
    ],
  },

  // ─── ENGINEERING STANDARDS ────────────────────────────────────────────────
  {
    id: 16,
    slug: 'can-ai-detect-structural-defects-more-accurately-than-manual',
    title: 'Can AI Detect Structural Defects More Accurately Than Manual Inspections?',
    category: 'Engineering Standards',
    date: 'February 10, 2026',
    datePublished: '2026-02-10T09:00:00+05:30',
    author: 'RAGHU',
    authorRole: 'CMO',
    excerpt:
      'AI can detect many structural defects more consistently and efficiently than manual inspections by analyzing images, videos, and sensor data with advanced machine learning models trained on thousands of real defect examples.',
    coverImage: '/assets/images/blog_images/mixboard-image (8).png',
    coverImageAlt: 'AI system analyzing structural defect in a concrete beam',
    tags: ['structural defects', 'AI detection', 'manual inspection', 'accuracy'],
    takeaways: [
      'AI detects surface cracks, spalling, and corrosion current trends with consistent precision, eliminating human fatigue.',
      'While engineers make the final engineering decisions, AI screens thousands of components to flag anomalies.',
      'Combining cover meter readings and vision analysis yields highly accurate structural health ratings.'
    ],
    references: [
      { name: 'ASTM C876-22 - Standard Test Method for Corrosion Potentials of Uncoated Reinforcing Steel in Concrete', url: 'https://astm.org' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'AI can detect many structural defects more consistently and efficiently than manual inspections by analyzing images, videos, and sensor data with advanced machine learning models. AI systems can identify cracks, corrosion, spalling, settlement, and surface deterioration with high accuracy.',
      },
      {
        type: 'heading',
        text: 'Accuracy vs. Consistency',
      },
      {
        type: 'paragraph',
        text: 'While engineering expertise remains essential for final decision-making, AI significantly improves inspection speed, consistency, and defect detection capabilities. The key advantage of AI is not greater raw accuracy on any single defect, it is the elimination of inconsistency across hundreds or thousands of elements.',
      },
      {
        type: 'list',
        items: [
          'Crack width measurement with sub-millimeter accuracy',
          'Corrosion severity classification from photographic evidence',
          'Spalling depth estimation using stereo imaging techniques',
          'Settlement detection using comparative image analysis over time',
          'Rebar cover measurement through cover meter data integration',
        ],
      },
      {
        type: 'quote',
        text: 'A skilled engineer seeing the 300th element of a site visit is not performing at the same standard as the first. AI is.',
      },
    ],
  },
  {
    id: 17,
    slug: 'how-ai-improves-structural-health-monitoring',
    title: 'How Does AI Improve Structural Health Monitoring?',
    category: 'Engineering Standards',
    date: 'February 2, 2026',
    datePublished: '2026-02-02T09:00:00+05:30',
    author: 'SABARI RAJA',
    authorRole: 'CFO',
    excerpt:
      'AI improves structural health monitoring by continuously analyzing data from sensors, cameras, and monitoring systems, identifying patterns associated with deterioration and generating alerts when abnormal conditions are detected.',
    coverImage: '/assets/images/blog_images/mixboard-image (9).png',
    coverImageAlt: 'Structural health monitoring sensors installed on a concrete structure at PMAY site',
    tags: ['structural health monitoring', 'SHM', 'AI', 'sensors', 'anomaly detection'],
    takeaways: [
      'Real-time AI alerts detect crack propagation through acoustic emission and dynamic strain measurements.',
      'Sensor fusion processes massive arrays of structural data that would take engineers days to compile manually.',
      'Early anomaly alerts allow agencies to plan preventive reinforcement and avoid catastrophic infrastructure failures.'
    ],
    references: [
      { name: 'IS 516 (Part 5/Sec 1):2018 - Methods of Testing Strength of Concrete - Non-destructive Testing', url: 'https://bis.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'AI improves structural health monitoring by continuously analyzing data collected from sensors, cameras, and monitoring systems. Machine learning algorithms identify patterns associated with deterioration, stress, or damage and generate alerts when abnormal conditions are detected.',
      },
      {
        type: 'heading',
        text: 'Pattern Recognition at Scale',
      },
      {
        type: 'paragraph',
        text: 'This allows engineers to take proactive measures that improve structural safety, reduce maintenance costs, and extend asset lifespan. The sheer volume of data generated by modern SHM sensor arrays is beyond human capacity to process manually, AI is what makes that data actionable.',
      },
      {
        type: 'list',
        items: [
          'Vibration signature analysis to detect mode shape changes indicating damage',
          'Acoustic emission monitoring for active crack propagation',
          'Strain pattern analysis to identify overloading or settlement',
          'Corrosion current monitoring with electrochemical modelling',
          'Multi-sensor fusion for robust damage state assessment',
        ],
      },
    ],
  },

  // ─── INDUSTRY INSIGHTS ────────────────────────────────────────────────────
  {
    id: 21,
    slug: 'how-ai-reduces-construction-delays',
    title: 'How Can AI Reduce Construction Delays?',
    category: 'Industry Insights',
    date: 'January 2, 2026',
    datePublished: '2026-01-02T09:00:00+05:30',
    author: 'BALAKUMARAN D',
    authorRole: 'President',
    excerpt:
      'AI reduces construction delays by analyzing schedules, resource availability, weather conditions, and project performance data to identify potential risks before they impact timelines, enabling proactive project management.',
    coverImage: '/assets/images/blog_images/mixboard-image (10).png',
    coverImageAlt: 'TNHB site with AI-powered construction delay prediction dashboard',
    tags: ['construction delays', 'AI', 'schedule optimization', 'risk management'],
    takeaways: [
      'AI analyzes weather schedules, procurement leads, and labor trends to predict project delays before they impact milestones.',
      'Predictive scheduling alerts project teams of downstream hold points, keeping inspections on track.',
      'Data-driven schedule optimization improves subcontractor coordination and resource allocation.'
    ],
    references: [
      { name: 'IRC:SP:57-2000 - Guidelines for Quality System for Road Construction', url: 'https://irc.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'AI reduces construction delays by analyzing schedules, resource availability, weather conditions, and project performance data to identify potential risks before they impact timelines. Predictive analytics helps project managers take proactive actions to maintain schedules and improve project delivery performance.',
      },
      {
        type: 'heading',
        text: 'Delay Drivers AI Can Predict',
      },
      {
        type: 'list',
        items: [
          'Material delivery bottlenecks based on procurement lead time analysis',
          'Labour availability gaps identified from workforce scheduling data',
          'Weather-related work disruptions predicted from historical site climate data',
          'Quality inspection hold points that risk delaying downstream activities',
          'Subcontractor performance trends that signal upcoming delays',
        ],
      },
      {
        type: 'heading',
        text: 'Proactive vs. Reactive Management',
      },
      {
        type: 'paragraph',
        text: 'Traditional project management is inherently reactive, delays are identified after they have already impacted the schedule. AI enables project managers to shift to proactive management, addressing risk factors before they become delay events.',
      },
    ],
  },
  {
    id: 22,
    slug: 'what-is-ai-powered-construction-project-management',
    title: 'What Is AI-Powered Construction Project Management?',
    category: 'Industry Insights',
    date: 'December 26, 2025',
    datePublished: '2025-12-26T09:00:00+05:30',
    author: 'RAHUL',
    authorRole: 'CEO',
    excerpt:
      'AI-powered construction project management uses artificial intelligence to support planning, scheduling, budgeting, resource allocation, risk management, and progress tracking for better project efficiency and outcomes.',
    coverImage: '/assets/images/blog_images/mixboard-image (11).png',
    coverImageAlt: 'Construction project manager reviewing AI-powered project management dashboard',
    tags: ['project management', 'AI', 'construction', 'planning', 'scheduling'],
    takeaways: [
      'AI-powered project management platforms compile diverse field data into real-time dashboards.',
      'Machine learning algorithms predict budget overruns and schedule risks based on daily site progress inputs.',
      'Consolidating QA checks, safety audits, and scheduling metrics improves transparency for public owners.'
    ],
    references: [
      { name: 'IS 15883 (Part 1):2009 - Construction Project Management - Guidelines', url: 'https://bis.gov.in' }
    ],
    content: [
      {
        type: 'paragraph',
        text: 'AI-powered construction project management uses artificial intelligence to support planning, scheduling, budgeting, resource allocation, risk management, and progress tracking. AI helps project managers make informed decisions by providing real-time insights and predictive recommendations that improve project efficiency and performance.',
      },
      {
        type: 'heading',
        text: 'Core Capabilities',
      },
      {
        type: 'list',
        items: [
          'Schedule analytics: AI-generated critical path analysis and delay forecasting',
          'Budget monitoring: real-time cost tracking with predictive overrun alerts',
          'Resource optimization: AI-recommended allocation based on activity requirements',
          'Risk management: automated risk scoring and mitigation recommendation',
          'Progress monitoring: comparison of planned vs. actual performance with AI insights',
        ],
      },
      {
        type: 'quote',
        text: 'AI-powered project management does not make decisions, it ensures project managers have the right information to make better decisions, faster.',
      },
    ],
  },
];
