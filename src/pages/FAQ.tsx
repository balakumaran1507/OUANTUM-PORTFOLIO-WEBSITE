import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const BASE_URL = 'https://ouantum.com';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: 'AI in Construction',
    items: [
      {
        id: 1,
        question: 'How Can AI Reduce Rework Costs in Construction Projects?',
        answer:
          'AI reduces rework costs in construction projects by identifying defects, design conflicts, and quality issues before they become expensive problems. Through computer vision, predictive analytics, and real-time monitoring, AI can detect construction errors early, allowing project teams to take corrective action immediately. AI-powered quality assurance systems also compare actual site conditions with project specifications and BIM models to ensure compliance. By reducing human error, improving inspection accuracy, and accelerating issue detection, AI helps contractors minimize material waste, labor costs, project delays, and costly reconstruction work.',
      },
      {
        id: 2,
        question: 'What Is the ROI of AI-Powered Construction Quality Assurance?',
        answer:
          'The return on investment (ROI) of AI-powered construction quality assurance comes from reduced rework, improved productivity, faster inspections, and lower operational costs. AI automates defect detection, compliance verification, and documentation processes, enabling teams to identify issues earlier than traditional inspections. Organizations implementing AI-driven quality assurance often experience fewer project delays, reduced maintenance costs, and better resource utilization. The long-term benefits include higher construction quality, increased client satisfaction, and improved project profitability.',
      },
      {
        id: 3,
        question: 'How Does Computer Vision Improve Construction Inspections?',
        answer:
          'Computer vision improves construction inspections by automatically analyzing images and videos to identify defects, safety hazards, and quality deviations. Unlike manual inspections, computer vision systems can continuously monitor construction activities and provide consistent, objective assessments. These systems can detect cracks, surface damage, alignment issues, corrosion, and structural irregularities with high accuracy. By automating visual inspections, construction companies can improve quality control, reduce inspection time, and enhance project safety.',
      },
      {
        id: 4,
        question: 'How Can AI Improve Construction Project Delivery?',
        answer:
          'AI improves construction project delivery by optimizing schedules, predicting risks, monitoring progress, and supporting data-driven decision-making. Machine learning algorithms analyze project data to identify potential delays, resource shortages, and cost overruns before they occur. AI also improves communication between stakeholders by providing real-time project insights. As a result, projects can be completed more efficiently, with improved quality, reduced risks, and better overall performance.',
      },
      {
        id: 5,
        question: 'What Are the Biggest Benefits of AI in Construction?',
        answer:
          'The biggest benefits of AI in construction include improved quality assurance, enhanced safety, increased productivity, predictive maintenance, and reduced project costs. AI helps construction teams automate repetitive tasks, identify risks early, and make informed decisions based on real-time data. It also supports better resource management, reduces rework, and improves project visibility. As construction projects become more complex, AI provides the tools needed to deliver projects faster and more efficiently.',
      },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      {
        id: 6,
        question: 'How Can AI Improve Infrastructure Asset Management?',
        answer:
          'AI improves infrastructure asset management by continuously monitoring asset conditions, predicting maintenance needs, and supporting lifecycle planning. Using sensor data, computer vision, and predictive analytics, AI can identify deterioration patterns and forecast future performance. This enables infrastructure owners to prioritize maintenance activities, reduce operational costs, and extend asset lifespan. AI-driven asset management improves reliability, safety, and long-term infrastructure sustainability.',
      },
      {
        id: 7,
        question: 'What Technologies Are Transforming Infrastructure Maintenance?',
        answer:
          'Technologies transforming infrastructure maintenance include artificial intelligence, digital twins, IoT sensors, drones, robotics, and predictive analytics. These technologies provide real-time insights into infrastructure performance and condition. By automating inspections and enabling predictive maintenance, organizations can reduce downtime, improve safety, and optimize maintenance budgets. Smart infrastructure technologies are rapidly becoming essential for modern asset management strategies.',
      },
      {
        id: 8,
        question: 'How Does Predictive Maintenance Reduce Infrastructure Failures?',
        answer:
          'Predictive maintenance reduces infrastructure failures by identifying potential issues before they become critical. AI algorithms analyze sensor data, historical records, and operational conditions to predict when maintenance is required. This proactive approach minimizes unexpected breakdowns, extends asset lifespan, and improves reliability. Predictive maintenance also helps organizations reduce repair costs and improve infrastructure resilience.',
      },
      {
        id: 9,
        question: 'What Is the Future of Smart Infrastructure?',
        answer:
          'The future of smart infrastructure involves the integration of AI, IoT, digital twins, and advanced analytics to create intelligent, self-monitoring systems. Smart infrastructure can continuously assess its condition, optimize operations, and predict maintenance requirements. These technologies will improve sustainability, reduce operational costs, and support more resilient cities and transportation networks. Smart infrastructure is expected to become a key component of future urban development.',
      },
      {
        id: 10,
        question: 'How Can AI Improve Bridge and Building Monitoring?',
        answer:
          'AI improves bridge and building monitoring by analyzing structural data, sensor readings, and visual inspections to detect signs of deterioration or damage. AI-powered monitoring systems provide continuous oversight, enabling engineers to identify issues such as cracks, corrosion, settlement, and deformation at an early stage. This improves safety, reduces maintenance costs, and supports informed infrastructure management decisions.',
      },
    ],
  },
  {
    title: 'BIM & Digital Twins',
    items: [
      {
        id: 11,
        question: 'How Does BIM Improve Construction Quality Control?',
        answer:
          'Building Information Modeling (BIM) improves construction quality control by providing a centralized digital representation of project specifications, geometry, and construction requirements. BIM enables project teams to detect design conflicts, verify compliance, and monitor construction progress. By improving coordination and reducing errors, BIM helps ensure that projects meet quality standards while minimizing rework and delays.',
      },
      {
        id: 12,
        question: 'What Are the Benefits of BIM for Large Infrastructure Projects?',
        answer:
          'BIM offers significant benefits for large infrastructure projects, including improved collaboration, enhanced project visualization, reduced design conflicts, and better lifecycle management. BIM supports efficient planning, scheduling, and resource allocation while improving communication among stakeholders. These advantages contribute to higher project quality, reduced costs, and improved operational performance throughout the asset lifecycle.',
      },
      {
        id: 13,
        question: 'How Do Digital Twins Support Infrastructure Management?',
        answer:
          'Digital twins support infrastructure management by creating virtual replicas of physical assets that continuously receive real-time operational data. Engineers can use digital twins to monitor asset performance, predict failures, evaluate maintenance strategies, and optimize operations. This technology improves decision-making, reduces maintenance costs, and enhances infrastructure reliability.',
      },
      {
        id: 14,
        question: 'BIM vs Digital Twins: What Is the Difference?',
        answer:
          'BIM and digital twins are both digital representations of physical assets, but they serve different purposes. BIM primarily focuses on design, construction, and project coordination, while digital twins provide real-time operational insights throughout an asset\'s lifecycle. BIM creates the foundation for project development, whereas digital twins continuously update using live data to support monitoring, maintenance, and performance optimization.',
      },
      {
        id: 15,
        question: 'How Can AI Enhance BIM Workflows?',
        answer:
          'AI enhances BIM workflows by automating model analysis, clash detection, compliance checking, progress tracking, and risk assessment. AI-powered BIM solutions help engineers identify design issues, optimize construction planning, and improve project efficiency. By reducing manual tasks and improving data analysis, AI increases the value of BIM throughout the project lifecycle.',
      },
    ],
  },
  {
    title: 'Structural Engineering',
    items: [
      {
        id: 16,
        question: 'Can AI Detect Structural Defects More Accurately Than Manual Inspections?',
        answer:
          'AI can detect many structural defects more consistently and efficiently than manual inspections by analyzing images, videos, and sensor data with advanced machine learning models. AI systems can identify cracks, corrosion, spalling, settlement, and surface deterioration with high accuracy. While engineering expertise remains essential for final decision-making, AI significantly improves inspection speed, consistency, and defect detection capabilities.',
      },
      {
        id: 17,
        question: 'How Does AI Improve Structural Health Monitoring?',
        answer:
          'AI improves structural health monitoring by continuously analyzing data collected from sensors, cameras, and monitoring systems. Machine learning algorithms identify patterns associated with deterioration, stress, or damage and generate alerts when abnormal conditions are detected. This allows engineers to take proactive measures that improve structural safety, reduce maintenance costs, and extend asset lifespan.',
      },
      {
        id: 18,
        question: 'What Is the Future of Structural Auditing?',
        answer:
          'The future of structural auditing will be driven by artificial intelligence, digital twins, drones, computer vision, and real-time monitoring systems. These technologies will enable more accurate assessments, automated defect detection, predictive maintenance, and data-driven decision-making. Future structural audits will be faster, more comprehensive, and more reliable than traditional inspection methods.',
      },
      {
        id: 19,
        question: 'How Can Engineers Use AI for Structural Assessments?',
        answer:
          'Engineers can use AI for structural assessments by analyzing inspection data, monitoring structural performance, identifying defects, and predicting deterioration trends. AI supports evidence-based decision-making by providing detailed insights into asset condition and risk levels. This improves assessment accuracy, maintenance planning, and overall infrastructure reliability.',
      },
      {
        id: 20,
        question: 'What Technologies Are Improving Structural Safety?',
        answer:
          'Technologies improving structural safety include artificial intelligence, structural health monitoring systems, digital twins, IoT sensors, drones, robotics, and advanced data analytics. These technologies provide continuous monitoring, early defect detection, and predictive insights that help engineers prevent failures and improve infrastructure resilience.',
      },
    ],
  },
  {
    title: 'Construction Management',
    items: [
      {
        id: 21,
        question: 'How Can AI Reduce Construction Delays?',
        answer:
          'AI reduces construction delays by analyzing schedules, resource availability, weather conditions, and project performance data to identify potential risks before they impact timelines. Predictive analytics helps project managers take proactive actions to maintain schedules and improve project delivery performance.',
      },
      {
        id: 22,
        question: 'What Is AI-Powered Construction Project Management?',
        answer:
          'AI-powered construction project management uses artificial intelligence to support planning, scheduling, budgeting, resource allocation, risk management, and progress tracking. AI helps project managers make informed decisions by providing real-time insights and predictive recommendations that improve project efficiency and performance.',
      },
      {
        id: 23,
        question: 'How Can Data Analytics Improve Construction Decision-Making?',
        answer:
          'Data analytics improves construction decision-making by transforming project data into actionable insights. Construction teams can analyze performance trends, identify risks, optimize resource allocation, and improve project forecasting. Data-driven decision-making enhances productivity, reduces uncertainty, and supports better project outcomes.',
      },
      {
        id: 24,
        question: 'What Are the Biggest Risks Facing Construction Projects Today?',
        answer:
          'The biggest risks facing construction projects today include labor shortages, project delays, cost overruns, safety incidents, supply chain disruptions, quality issues, and regulatory challenges. Advanced technologies such as AI, predictive analytics, and digital project management tools help organizations identify and mitigate these risks more effectively.',
      },
      {
        id: 25,
        question: 'How Can Construction Companies Improve Productivity Using AI?',
        answer:
          'Construction companies can improve productivity using AI by automating inspections, optimizing schedules, improving resource allocation, reducing rework, and enhancing project visibility. AI enables teams to focus on higher-value activities while minimizing inefficiencies and operational bottlenecks.',
      },
    ],
  },
  {
    title: 'Future Engineering',
    items: [
      {
        id: 26,
        question: 'Will AI Replace Civil Engineers?',
        answer:
          'AI will not replace civil engineers. Instead, AI will augment engineering capabilities by automating repetitive tasks, analyzing large datasets, and providing decision support. Civil engineers will continue to play a critical role in design, problem-solving, leadership, innovation, and project management.',
      },
      {
        id: 27,
        question: 'How Will AI Transform Civil Engineering by 2035?',
        answer:
          'By 2035, AI is expected to transform civil engineering through intelligent design systems, automated inspections, predictive maintenance, smart infrastructure management, and data-driven decision-making. Engineers will use AI to improve efficiency, sustainability, and infrastructure resilience while addressing increasingly complex engineering challenges.',
      },
      {
        id: 28,
        question: 'What Skills Should Future Civil Engineers Learn?',
        answer:
          'Future civil engineers should develop skills in artificial intelligence, BIM, digital twins, data analytics, programming, automation, sustainability, and smart infrastructure technologies. Combining technical engineering knowledge with digital skills will be essential for success in the evolving construction industry.',
      },
      {
        id: 29,
        question: 'What Is Construction 4.0 and Why Does It Matter?',
        answer:
          'Construction 4.0 refers to the digital transformation of the construction industry through technologies such as AI, BIM, IoT, robotics, cloud computing, and advanced analytics. It matters because it improves productivity, quality, safety, sustainability, and project performance while enabling smarter construction processes.',
      },
      {
        id: 30,
        question: 'How Can Civil Engineers Prepare for Industry 5.0?',
        answer:
          'Civil engineers can prepare for Industry 5.0 by embracing human-centered technologies, continuous learning, AI-driven workflows, sustainable engineering practices, and digital transformation. Industry 5.0 focuses on collaboration between humans and intelligent systems, creating opportunities for more innovative, efficient, and resilient infrastructure development.',
      },
    ],
  },
  {
    title: 'Careers & Opportunities',
    items: [
      {
        id: 31,
        question: 'What Roles Is OUANTUM Currently Hiring For?',
        answer:
          'OUANTUM is actively expanding its core engineering team across Autonomous Systems, Computer Vision Research, Structural QA Engineering, Embedded Edge Compute, and Full-Stack Systems Architecture. We recruit passionate engineers and researchers looking to deploy production AI to large-scale civil infrastructure.',
      },
      {
        id: 32,
        question: 'What Is the Engineering Culture at OUANTUM?',
        answer:
          'Our engineering culture is rooted in rigorous empirical validation, extreme ownership, and deterministic design. We bridge real-world physical site conditions with state-of-the-art neural architectures. We believe in rapid prototyping, autonomous decision-making, and delivering zero-defect safety-critical infrastructure technologies.',
      },
      {
        id: 33,
        question: 'How Can Civil Engineers and Computer Scientists Collaborate Here?',
        answer:
          'At OUANTUM, structural engineers collaborate daily with computer vision scientists and machine learning engineers. Civil domain specialists define deterministic inspection thresholds, fracture mechanics, and code compliance standards, while AI engineers develop real-time volumetric point cloud reconstruction and edge defect detection algorithms.',
      },
      {
        id: 34,
        question: 'What Does the Interview and Selection Process Involve?',
        answer:
          'Our evaluation process is transparent and hands-on: an initial technical discussion, a practical domain assessment or architecture challenge reflecting our actual problems, and a cultural alignment session with engineering leadership. We evaluate first-principles reasoning and execution speed over memorized trivia.',
      },
      {
        id: 35,
        question: 'Does OUANTUM Support Internships and Research Fellowships?',
        answer:
          'Yes. We offer intensive engineering internships and graduate research fellowships for talented students and researchers in robotics, computer vision, structural engineering, and edge AI compute. High-performing fellows regularly transition into full-time core engineering roles.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.flatMap((section) =>
    section.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  ),
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OUANTUM',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/company/ouantum/'],
};

const FAQ: React.FC = () => {
  useSEO({
    title: 'Knowledge Base & FAQ | OUANTUM',
    description:
      'Answers to common questions about AI in construction, predictive maintenance, BIM, structural engineering, and civil infrastructure innovation.',
    keywords:
      'AI construction FAQ, BIM questions, civil engineering careers, OUANTUM jobs, predictive maintenance, structural engineering AI',
    canonicalPath: '/faq',
    jsonLd: [organizationSchema, faqSchema],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 1: true });

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = useMemo(() => ['All', ...faqData.map((s) => s.title)], []);

  const displayedSections = useMemo(() => {
    if (activeCategory === 'All') return faqData;
    return faqData.filter((s) => s.title === activeCategory);
  }, [activeCategory]);

  return (
    <main
      className="subpage-wrapper"
      style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', paddingBottom: '0' }}
    >
      <style>{`
        .subpage-wrapper .ic-hero-section h1,
        .subpage-wrapper .ic-hero-headline,
        .subpage-wrapper .ic-hero-headline span {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
          font-family: 'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-weight: 400 !important;
          color: #111111 !important;
          letter-spacing: -0.03em !important;
          line-height: 1.05 !important;
          -webkit-text-fill-color: #111111 !important;
          -webkit-text-stroke: 0px transparent !important;
        }
      `}</style>

      {/* =========================================================================
          1. HERO SECTION (2-Column Layout matching Solution Detail)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 76px) 16px 40px',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                color: '#111111',
                letterSpacing: '-0.025em',
                margin: '0 0 16px 0',
                textAlign: 'left',
              }}
            >
              Frequently Asked Technical Questions
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: '0 0 28px 0',
                textAlign: 'left',
              }}
            >
              Technical answers for EPC concessionaires, structural audit teams, government TPQM monitors, and civil engineering consultants adopting AI QA systems.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <Link
                to="/contact?subject=Engineering%20Inquiry"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 26px',
                  borderRadius: 0,
                  background: '#111111',
                  color: '#ffffff',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Ask Our Engineers
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/capabilities"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 24px',
                  borderRadius: 0,
                  background: '#ffffff',
                  color: '#111111',
                  border: '1px solid #111111',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Explore Capabilities
              </Link>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div
            style={{
              position: 'relative',
              borderRadius: 0,
              overflow: 'hidden',
              background: '#f4f3ec',
              aspectRatio: '16 / 10',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src="/assets/images/buildings/building-9.png"
              alt="OUANTUM Engineering FAQ & Structural Standards Knowledge Base"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Container - Standardized to 1440px matching Header, Footer & Site Standards */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px 70px' }}>
        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '3rem',
            justifyContent: 'center',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                  background: isActive ? '#111111' : '#ffffff',
                  color: isActive ? '#ffffff' : '#4a5565',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQ Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {displayedSections.map((section, sIdx) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: sIdx * 0.05 }}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 0,
                padding: 'clamp(28px, 4vw, 44px) clamp(24px, 4vw, 48px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.6rem)',
                  fontWeight: 400,
                  color: '#111111',
                  letterSpacing: '-0.015em',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                {section.title}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {section.items.map((item, itemIdx) => {
                  const isOpen = !!openItems[item.id];
                  const isLast = itemIdx === section.items.length - 1;
                  return (
                    <div
                      key={item.id}
                      style={{
                        borderBottom: isLast ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                        padding: '1.35rem 0',
                      }}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '20px',
                          padding: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            fontSize: 'clamp(1.05rem, 1.6vw, 1.18rem)',
                            lineHeight: 1.4,
                            fontWeight: 600,
                            color: '#111111',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {item.question}
                        </span>
                        <span
                          style={{
                            flexShrink: 0,
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#111111',
                            background: isOpen ? '#f1f5f9' : '#ffffff',
                            transition: 'background 0.2s, border-color 0.2s',
                          }}
                        >
                          {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p
                              style={{
                                fontFamily: 'var(--ic-font-sans)',
                                fontSize: '1rem',
                                lineHeight: 1.75,
                                color: '#4a5565',
                                marginTop: '1.15rem',
                                marginBottom: '0.5rem',
                                paddingRight: 'clamp(1rem, 4vw, 3rem)',
                              }}
                            >
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Careers & Engineering Link Card */}
        <section style={{ marginTop: '2.5rem' }}>
          <div
            style={{
              background: '#faf9f6',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: 0,
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(1.25rem, 2vw, 1.45rem)',
                  fontWeight: 400,
                  color: '#111111',
                  letterSpacing: '-0.015em',
                  marginBottom: '8px',
                }}
              >
                Looking for technical careers or research?
              </h3>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#4a5565',
                  margin: 0,
                }}
              >
                Explore openings in Chennai across computer vision, civil AI, and systems architecture.
              </p>
            </div>

            <Link to="/careers" className="ic-btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
              <span>View Open Roles</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
      </div>


    </main>
  );
};

export default FAQ;
