import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 'REF-01',
    title: 'AMARAVATI CAPITAL CITY',
    image: '/assets/images/project-pipeline.png',
    category: 'GOVERNMENT INFRASTRUCTURE · AP, INDIA',
    location: 'AP, INDIA',
    year: 'ONGOING',
    status: 'ADVISORY',
    scope: 'AP HIGH COURT · 4,000 RESIDENTIAL UNITS · 45-STOREY INTEGRATED SECRETARIAT. TPQM WORK BY OUR DOMAIN ADVISOR ER. KALAIMONY (IIT MADRAS CUBE) - THE METHODOLOGY BEHIND OUR REPORT GENERATION ENGINE.',
    featured: true,
  },
  {
    id: 'REF-02',
    title: 'TAMIL NADU HOUSING BOARD',
    image: '/assets/images/philosophy.png',
    category: 'HOUSING BOARD · CHENNAI',
    location: 'CHENNAI, INDIA',
    year: 'ONGOING',
    status: 'ADVISORY',
    scope: 'THIRD-PARTY QUALITY MONITORING ACROSS MULTIPLE HOUSING PROJECTS. FIELD WORKFLOW AND GOVERNMENT REPORTING FORMAT USED AS THE OPERATIONAL TEMPLATE FOR THE OUANTUM PLATFORM.',
    featured: false,
  },
  {
    id: 'REF-03',
    title: 'TNUHDB - PMAY SCHEMES',
    image: '/assets/images/contact-us-hero.jpg',
    category: 'ADB FUNDED · VALLAM & KARAIKUDI',
    location: 'VALLAM & KARAIKUDI',
    year: '2023',
    status: 'VALIDATED',
    scope: '1,869 HOUSING UNITS ACROSS 32 BLOCKS. ADB-FUNDED PROJECT. MULTI-STAGE QA PROCESS DOCUMENTED AND ENCODED INTO THE OUANTUM COMPLIANCE ENGINE.',
    featured: false,
  },
  {
    id: 'REF-04',
    title: 'KENDRIYA VIDYALAYA SCHOOLS',
    image: '/assets/images/privacy-and-security-page-hero.jpg',
    category: 'EDUCATION INFRASTRUCTURE · PAN-INDIA',
    location: 'PAN-INDIA',
    year: '2023',
    status: 'VALIDATED',
    scope: 'NPCCL SCHOOL PROJECTS ACROSS KERALA, KARNATAKA & MADHYA PRADESH. FOUR-STAGE QA MONITORING PROTOCOL - NOW EMBEDDED AS A DEFAULT WORKFLOW TEMPLATE IN THE PLATFORM.',
    featured: false,
  },
];

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="projects-section">
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <h2 className="section-title">
            WHERE IT'S BEEN TESTED
          </h2>
          <p className="section-subtitle">
            REAL INFRASTRUCTURE PROJECTS MANAGED BY OUR DOMAIN ADVISORY PARTNER - THE FIELD REALITY THAT SHAPED EVERY DECISION IN THE OUANTUM PLATFORM.
          </p>
        </motion.div>

        {/* ── FEATURED card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setHoveredId(featured.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`featured-project-card ${hoveredId === featured.id ? 'hovered' : ''}`}
        >
          <motion.div
            animate={{ scale: hoveredId === featured.id ? 1.04 : 1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="card-bg-wrapper"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="card-img"
            />
          </motion.div>

          <div className="card-overlay" />

          <div className="featured-project-content">
            <div className="project-info">
              <h3 className="project-title">
                {featured.title}
              </h3>
              <div className="project-scope">
                {featured.scope}
              </div>
            </div>
            <motion.div
              animate={{ rotate: hoveredId === featured.id ? 45 : 0, scale: hoveredId === featured.id ? 1.05 : 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="project-arrow-btn"
            >
              <ArrowUpRight size={28} />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="projects-grid">
          {rest.map((project) => (
            <motion.div
              key={project.id}
              animate={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`project-card ${hoveredId === project.id ? 'hovered' : ''}`}
            >
              <motion.div
                animate={{ scale: hoveredId === project.id ? 1.06 : 1 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="card-bg-wrapper"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-img"
                />
              </motion.div>

              <div className="card-overlay" />

              <div className="project-card-content">
                <h4 className="project-card-title">
                  {project.title}
                </h4>
                <div className="project-card-scope">
                  {project.scope}
                </div>

                <div className="project-card-footer">
                  <motion.div
                    animate={{ x: hoveredId === project.id ? 4 : 0, y: hoveredId === project.id ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight size={18} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer button ── */}
        <div className="section-footer-btn-wrapper">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="explore-btn"
            onClick={() => navigate('/case-studies')}
          >
            EXPLORE ALL CASE STUDIES
            <ArrowRight size={16} />
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default Projects;
