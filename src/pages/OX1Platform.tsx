import React, { useState, useEffect } from 'react';
import AsciiImageLayer from '../components/common/AsciiImageLayer';
import GlowCard from '../components/GlowCard';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Check,
  Mountain,
  Telescope,
  Atom,
  Search,
  ClipboardCheck,
  Timer,
  Lightbulb,
  Clock,
} from 'lucide-react';

// SEO JSON-LD Structured Data
const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ouantum.com/#organization",
      "name": "OUANTUM",
      "url": "https://ouantum.com",
      "logo": "https://ouantum.com/assets/images/logo_horizontal.png",
      "description": "Provider of autonomous civil infrastructure intelligence and structural quality assurance platforms."
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://ouantum.com/products/ox1#software",
      "name": "OX1 - Omni eXtelligence 1",
      "alternateName": ["OX1", "Omni eXtelligence 1", "OUANTUM OX1"],
      "applicationCategory": "BusinessApplication, EngineeringSoftware",
      "operatingSystem": "Web, Cloud, Edge",
      "description": "OX1 is an infrastructure intelligence platform by OUANTUM connecting engineering workflows, project management, QA/QC, Non-Destructive Testing, BIM, structural health monitoring, digital twins, cost intelligence, and artificial intelligence in one integrated environment.",
      "publisher": {
        "@id": "https://ouantum.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://ouantum.com/products/ox1",
      "url": "https://ouantum.com/products/ox1",
      "name": "OX1 by OUANTUM | Infrastructure Intelligence Platform",
      "description": "Discover OX1 (Omni eXtelligence 1), OUANTUM's infrastructure intelligence platform connecting project management, QA/QC, NDT, BIM, structural monitoring, digital twins, and native AI intelligence.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ouantum.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": "https://ouantum.com/products/ox1"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "OX1 - Omni eXtelligence 1",
            "item": "https://ouantum.com/products/ox1"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ouantum.com/products/ox1#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is OX1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "OX1 is an infrastructure intelligence platform developed by OUANTUM that unites civil project management, QA/QC, Non-Destructive Testing (NDT), BIM Studio, structural health monitoring, digital twins, cost intelligence, and context-aware artificial intelligence into one cohesive operating environment."
          }
        },
        {
          "@type": "Question",
          "name": "What does Omni eXtelligence 1 mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Omni eXtelligence 1 (OX1) represents complete multidimensional intelligence across the built environment: 'Omni' for unified coverage across all lifecycle phases, 'eXtelligence' for the synthesis of civil physics, codified engineering standards, sensor telemetry, and artificial intelligence, and '1' as the singular source of truth for all project stakeholders."
          }
        },
        {
          "@type": "Question",
          "name": "Is OX1 a construction management platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "OX1 includes complete construction project management capabilities, but expands far beyond generic task trackers by integrating deterministic civil structural engineering: in-situ NDT verification, IS/ASTM codal compliance, BIM integration, continuous sensor monitoring, and automated forensic reporting."
          }
        },
        {
          "@type": "Question",
          "name": "What modules does OX1 include?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "OX1 includes ten core engineering modules: Project Management, Quality Assurance, Quality Control, Non-Destructive Testing, BIM Studio, Structural Health Monitoring, Digital Twins, Reports & Documentation, Budget & Cost Intelligence, and Analytics & Project Intelligence."
          }
        },
        {
          "@type": "Question",
          "name": "Does OX1 support NDT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. OX1 provides native support for 12+ non-destructive testing methodologies, including Ultrasonic Pulse Velocity (UPV), Rebound Hammer (SonReb correlation), Ground Penetrating Radar (GPR), Impact-Echo, Half-Cell Potential, Electrical Resistivity, Infrared Thermography, LiDAR, and Fiber Optic Monitoring."
          }
        },
        {
          "@type": "Question",
          "name": "Does OX1 include QA/QC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. OX1 features complete Quality Assurance (ITPs, method statements, acceptance criteria) and Quality Control (pour cards, material inspections, cube test records, NCRs, and CAPA resolution workflows) with cryptographic tamper-evident audit trails."
          }
        },
        {
          "@type": "Question",
          "name": "Does OX1 support BIM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. OX1 BIM Studio supports open IFC workflows (IFC 2x3 and IFC4), 2D drawing management, PDF plan vectorization, 2D-to-3D element extrusions, and linking structural elements directly to inspection logs and sensor streams."
          }
        },
        {
          "@type": "Question",
          "name": "What AI capabilities are built into OX1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "OX1 features a native civil structural intelligence layer embedded directly into the platform. Unlike generic chatbots, it possesses deep contextual knowledge of project specifications, codified standards (IS 456, IS 13311, MoRTH, IRC, ACI), laboratory test curves, and real-time sensor streams to assist engineers with automated compliance auditing and technical analysis."
          }
        },
        {
          "@type": "Question",
          "name": "Can OX1 manage multiple projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The OX1 Organization Layer provides portfolio-wide oversight, enabling concessionaires, developers, and government bodies to supervise hundreds of simultaneous highway corridor packages, bridge spans, and building developments with granular access control."
          }
        },
        {
          "@type": "Question",
          "name": "Can multiple teams collaborate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Concessionaires, EPC contractors, Third-Party Quality Monitors (TPQM), structural consultants, and government authority engineers collaborate on the same immutable data layer with defined role-based permissions."
          }
        },
        {
          "@type": "Question",
          "name": "Can OX1 integrate with external software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. OX1 supports open BIM (IFC), AutoCAD DWG/DXF drawings, standard CSV and Excel telemetry, enterprise ERP systems via REST and GraphQL APIs, and direct Bluetooth synchronization with verified testing hardware."
          }
        },
        {
          "@type": "Question",
          "name": "Is OX1 suitable for existing buildings?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. OX1 is widely used for structural audits, retrofit assessments, historic bridge preservation, and remaining service life estimations of existing structures using non-destructive diagnostics and sensor monitoring."
          }
        },
        {
          "@type": "Question",
          "name": "Does OX1 replace engineers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. OX1 follows the philosophy of human-in-the-loop intelligence. It automates repetitive calculations, eliminates transcription errors, and accelerates audit workflows, empowering civil engineers to make faster, higher-confidence deterministic decisions."
          }
        }
      ]
    }
  ]
};


// 4 Images for Connected Section: image copy 15, 16, 17, 18

// 6 Images for Ecosystem Stakeholder Section: image copy 19, 20, 21, 22, 23, 24
const ECOSYSTEM_TAB_IMAGES = [
  {
    role: 'Construction Companies & EPCs',
    webp: '/assets/images/buildings/card_building/image copy 19.webp',
    pngFallback: '/assets/images/buildings/card_building/image copy 19.png',
    alt: 'Construction Companies & EPCs operations with crane and urban development',
  },
  {
    role: 'Infrastructure Concessionaires',
    webp: '/assets/images/buildings/card_building/image copy 20.webp',
    pngFallback: '/assets/images/buildings/card_building/image copy 20.png',
    alt: 'Infrastructure Concessionaires heavy equipment and port highway development',
  },
  {
    role: 'Engineering Consultants',
    webp: '/assets/images/buildings/card_building/image copy 21.webp',
    pngFallback: '/assets/images/buildings/card_building/image copy 21.png',
    alt: 'Engineering Consultants reviewing structural blueprints on site',
  },
  {
    role: 'NDT Labs & Testing Companies',
    webp: '/assets/images/buildings/card_building/image copy 22.webp',
    pngFallback: '/assets/images/buildings/card_building/image copy 22.png',
    alt: 'NDT Labs & Testing Companies ultrasonic digital sensor testing',
  },
  {
    role: 'QA/QC & TPQM Authorities',
    webp: '/assets/images/buildings/card_building/image copy 23.webp',
    pngFallback: '/assets/images/buildings/card_building/image copy 23.png',
    alt: 'QA/QC & TPQM Authorities scaffolding and rebar structural inspection',
  },
  {
    role: 'Civil & Structural Engineers',
    webp: '/assets/images/buildings/card_building/image copy 24.webp',
    pngFallback: '/assets/images/buildings/card_building/image copy 24.png',
    alt: 'Civil & Structural Engineers digital twin and structural margins',
  },
];

const CONNECTED_TAB_IMAGES = [
  {
    title: 'Field Testing Telemetry',
    webp: '/assets/images/connected-telemetry.webp',
    jpg: '/assets/images/connected-telemetry.jpg',
    pngFallback: '/assets/images/buildings/card_building/image copy 15.png',
    alt: 'Field Testing Telemetry with digital Schmidt hammers and UPV transducers',
  },
  {
    title: '3D Spatial BIM Binding',
    webp: '/assets/images/connected-bim-binding.webp',
    jpg: '/assets/images/connected-bim-binding.jpg',
    pngFallback: '/assets/images/buildings/card_building/image copy 16.png',
    alt: '3D Spatial BIM Binding of structural core breaks and sensor nodes to IFC model',
  },
  {
    title: 'Deterministic Governance',
    webp: '/assets/images/connected-governance.webp',
    jpg: '/assets/images/connected-governance.jpg',
    pngFallback: '/assets/images/buildings/card_building/image copy 17.png',
    alt: 'Deterministic Governance automating IS 456, IS 13311 and MoRTH compliance gating',
  },
  {
    title: 'Concession Digital Twin',
    webp: '/assets/images/connected-digital-twin.webp',
    jpg: '/assets/images/connected-digital-twin.jpg',
    pngFallback: '/assets/images/buildings/card_building/image copy 18.png',
    alt: 'Concession Digital Twin preserving 50-year as-built infrastructure health records',
  },
];

// 10 Module Featured Showcase Images from public/assets/images/buildings
const MODULE_IMAGES: Record<string, string> = {
  pm: '/assets/images/buildings/building-1.webp',
  qa: '/assets/images/buildings/building-2.webp',
  qc: '/assets/images/buildings/building-3.webp',
  ndt: '/assets/images/buildings/building-4.webp',
  bim: '/assets/images/buildings/building-5.webp',
  shm: '/assets/images/buildings/building-6.webp',
  digitaltwins: '/assets/images/buildings/building-7.webp',
  reports: '/assets/images/buildings/building-8.webp',
  budget: '/assets/images/buildings/building-9.webp',
  analytics: '/assets/images/buildings/building-10.webp',
};

// 10 Core Modules Data
const CORE_MODULES = [
  {
    id: 'pm',
    number: '01',
    title: 'Project Management',
    subtitle: 'WBS, critical paths, and multi-package visibility.',
    tagline: 'Connect every engineering milestone from tender charter to final commissioning.',
    overview: 'Coordinate complex civil infrastructure programs across highway corridors, viaduct spans, metro underground packages, and large-scale industrial assets. OX1 eliminates fragmented spreadsheets by establishing an unbroken digital link between milestone planning, real-time testing records, and verified physical progress.',
    operationalImpact: 'Designed specifically for concessionaires, EPC contractors, and state highway authorities, OX1 enforces milestone gating that prevents contractor stage-skipping until all mandatory field tests, laboratory cure curves, and third-party inspection signoffs are cryptographically validated.',
    metrics: [
      { value: '100%', label: 'Milestone Traceability', desc: 'Every task tied directly to verified physical testing data' },
      { value: '< 1 hr', label: 'Package Setup Time', desc: 'Pre-configured WBS templates for highways, bridges, and metro' },
      { value: '0%', label: 'Data Disconnect', desc: 'Eliminates separate communication silos between site and office' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Multi-Tier Work Breakdown Structures (WBS)',
        desc: 'Construct hierarchical schedules mapped directly to physical civil coordinates, chainages (km 0+000 to km 120+000), pier groupings, and pre-cast girder batches.',
      },
      {
        title: 'Automated Test-Gated Milestone Transitions',
        desc: 'Prevent premature milestone clearances. Schedule gates automatically lock until all required IS 456 cube compressive trials and NDT maturity scans pass compliance.',
      },
      {
        title: 'Enterprise RACI Governance Matrices',
        desc: 'Define unambiguous role permissions between Concessionaire Directors, EPC Project Managers, Authority Engineers, and Third-Party Quality Monitors (TPQM).',
      },
      {
        title: 'Immutable Version-Controlled Document Vault',
        desc: 'Archive structural drawings, variation orders, site memos, and tender specifications with cryptographic SHA-256 integrity hashes that prevent retrospective tampering.',
      },
      {
        title: 'Critical Path Velocity & Earned Value (EVM)',
        desc: 'Track schedule variance (SV), cost variance (CV), and predictive completion trajectories calculated continuously from live daily pour logs and inspection registers.',
      },
      {
        title: 'Multi-Package Portfolio Governance',
        desc: 'Enable state authorities and sovereign infrastructure funds to oversee dozens of simultaneous contract packages under unified enterprise dashboard governance.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'IRC SP:19, MoRTH Section 100, FIDIC Red & Silver Books, ISO 21500' },
      { title: 'Data Ingestion Protocols', detail: 'Primavera P6 XML, Microsoft Project MPP, Open CSV/XLSX, REST API, Webhooks' },
      { title: 'Audit & Governance', detail: 'Cryptographic SHA-256 Ledger, Immutable Timestamping, Multi-Party Digital Signoffs' },
      { title: 'Certified Deliverables', detail: 'Executive Progress Dossier, Milestone Clearance Audit, Package Closeout Ledger' },
    ],
    workflow: [
      { step: '01', title: 'Spatial WBS Mapping', desc: 'Import project schedules and bind milestones to physical bridge pier chainages and casting yard batches.' },
      { step: '02', title: 'Automated Field Gating', desc: 'Execution milestones automatically hold until in-situ test results and laboratory crush data verify compliance.' },
      { step: '03', title: 'Executive Signoff & Dispatch', desc: 'Generate multi-stakeholder approval memorandums with verified audit signatures and transparent progress metrics.' },
    ],
  },
  {
    id: 'qa',
    number: '02',
    title: 'Quality Assurance',
    subtitle: 'ITPs, method statements, and codified standards.',
    tagline: 'Pre-pour inspection and test plans strictly governed by IS, IRC, and MoRTH.',
    overview: 'Establish deterministic quality assurance frameworks before concrete pours or structural erection begin. OX1 standardizes digital Inspection and Test Plans (ITPs), standardized method statements, pre-pour checklists, and tolerance limits derived directly from codified civil standards.',
    operationalImpact: 'Removes subjectivity from site inspections. Authority Engineers and Quality Managers verify rebar cage spacing, formwork plumbness, clear cover, and shutter oil application through geostamped digital forms with mandatory photographic evidence and hold-point locks.',
    metrics: [
      { value: '100%', label: 'Hold-Point Enforcement', desc: 'Uninspected pours are digitally impossible to authorize' },
      { value: '0', label: 'Paper Checklists Required', desc: 'Complete offline-first mobile sync for site quality auditors' },
      { value: '< 15 min', label: 'Multi-Consultant Signoff', desc: 'Instant cryptographic approval from EPC, Consultant & TPQM' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Digital Inspection & Test Plans (ITP)',
        desc: 'Configure multi-stage inspection plans with mandatory hold, witness, and surveillance points mapped directly to specific structural components.',
      },
      {
        title: 'Codified Tolerance & Acceptance Limits',
        desc: 'Pre-load codified threshold criteria from IS 456:2000, IS 13311, IRC 112:2020, and MoRTH Section 1700 to automatically validate on-site measurements.',
      },
      {
        title: 'Standardized Method Statements',
        desc: 'Centralize and enforce approved erection, pre-stressing, and curing method statements with mandatory compliance verifications prior to work execution.',
      },
      {
        title: 'Automated Inspection Scheduling',
        desc: 'Synchronize inspection appointments with concrete batch plant delivery schedules, alerting consultant inspectors 2 hours before planned discharge.',
      },
      {
        title: 'Role-Based Witness Authorization Matrices',
        desc: 'Enforce strict signoff hierarchies requiring simultaneous signoff from Contractor QA Lead, Independent Engineer, and State Authority Monitor.',
      },
      {
        title: 'Continuous Compliance Audit Trails',
        desc: 'Maintain chronological, immutable logs of every inspection request (RFI), approved tolerance deviation, and signed pour card across the asset lifecycle.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'IS 456:2000, IRC 112:2020, MoRTH Section 1700, ISO 9001:2015, ACI 318' },
      { title: 'Inspection Protocols', detail: 'Digital Pour Cards, Rebar Spacing Verification, Cover Depth Gating, Batch Records' },
      { title: 'Audit & Governance', detail: 'Role-Based Digital Signatures, GPS Geostamping, Cryptographic Approval Hashes' },
      { title: 'Certified Deliverables', detail: 'Signed Digital Pour Clearance, Approved ITP Verification Record, Pre-Pour Dossier' },
    ],
    workflow: [
      { step: '01', title: 'ITP Configuration', desc: 'Establish digital inspection hold points and codified acceptance criteria for each concrete mix and structural element.' },
      { step: '02', title: 'On-Site Witness Inspection', desc: 'Engineers complete geostamped pre-pour checks with photographic evidence and tolerance validations directly on mobile.' },
      { step: '03', title: 'Cryptographic Clearance', desc: 'Authority Engineers sign off digitally, issuing an immutable SHA-256 pour clearance ticket directly to the batch plant.' },
    ],
  },
  {
    id: 'qc',
    number: '03',
    title: 'Quality Control',
    subtitle: 'Material verification, batch records, and CAPA resolution.',
    tagline: 'Verify every pour, material batch, and test cube with zero clerical paper trails.',
    overview: 'Ensure that physical construction execution adheres precisely to certified mix designs and structural specifications. OX1 captures automated batch plant dockets, slump tests, temperature profiles, and digital laboratory crusher records directly from calibrated testing hardware.',
    operationalImpact: 'Eradicates transcription fraud and selective cube reporting. In-situ compressive cube strength curves are fed directly into the platform from Bluetooth-enabled digital compression testing machines (CTM), automatically flagging non-conformances and initiating CAPA workflows.',
    metrics: [
      { value: '0%', label: 'Transcription Fraud', desc: 'Crusher values stream directly via hardware Bluetooth sync' },
      { value: '100%', label: 'Batch Traceability', desc: 'Every girder tracked to exact batching plant ticket and cement silo' },
      { value: '48 hr', label: 'CAPA Resolution SLA', desc: 'Automated escalation timers for structural non-conformance logs' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Automated Concrete Batch Plant Ticket Ingestion',
        desc: 'Ingest water-cement ratios, aggregate grading, admixture dosing, and batching timestamps directly from SCADA batching plant software.',
      },
      {
        title: 'Direct Digital Crusher Telemetry (CTM)',
        desc: 'Stream 7-day and 28-day concrete cube compressive strength readings directly from Bluetooth-connected digital crushers without manual data entry.',
      },
      {
        title: 'Automated Non-Conformance Reporting (NCR)',
        desc: 'Trigger instant NCRs when 28-day cube strengths or slump tolerances fall below characteristic target design thresholds defined in IS 456.',
      },
      {
        title: 'CAPA Tracking with Escalation Timers',
        desc: 'Monitor Corrective and Preventive Actions with automated escalation notifications sent to Executive Directors if structural defects remain unresolved.',
      },
      {
        title: 'Component-Level Material Traceability',
        desc: 'Maintain an unbroken lineage from raw cement and aggregate quarry source test reports down to individual cast-in-situ pier caps and deck slabs.',
      },
      {
        title: 'Statistical Quality Distribution Curves',
        desc: 'Project real-time Gaussian distribution curves, characteristic strength (fck), and standard deviation benchmarks across all active casting operations.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'IS 516 (Hardened Concrete), IS 1199 (Fresh Concrete), IS 10262 (Mix Design), ASTM C39' },
      { title: 'Ingestion & Testing', detail: 'Direct CTM Bluetooth Sync, Batching Plant SCADA Feed, Slump Cone Records, Temperature Telemetry' },
      { title: 'Traceability & Seals', detail: 'Geostamped Cube Identifiers, QR Specimen Tags, Cryptographic Lab Certification Hash' },
      { title: 'Certified Deliverables', detail: 'Automated 28-Day Strength Certificates, Formal NCR Register, Closed CAPA Dossier' },
    ],
    workflow: [
      { step: '01', title: 'Batch Ticket Synchronization', desc: 'Capture real-time batching plant tickets, water-cement ratios, and slump test results at point of discharge.' },
      { step: '02', title: 'Hardware Crusher Ingestion', desc: 'Cube specimens crushed on calibrated testing machines stream peak load and compressive strength directly via Bluetooth.' },
      { step: '03', title: 'Automated CAPA & Compliance', desc: 'Compliant batches receive instant certification; sub-target breaks automatically trigger geostamped NCR investigation workflows.' },
    ],
  },
  {
    id: 'ndt',
    number: '04',
    title: 'Non-Destructive Testing (NDT)',
    subtitle: '12+ physical testing methods with multi-model consensus.',
    tagline: 'Evaluate in-situ structural integrity without destructive core extraction.',
    overview: 'Integrate physical testing telemetry directly into digital asset models. OX1 processes Ultrasonic Pulse Velocity (UPV), Digital Rebound Hammer (SonReb), Ground Penetrating Radar (GPR), Impact-Echo, and Half-Cell Potential records in real time.',
    operationalImpact: 'Eliminates single-method diagnostic ambiguity. OX1 executes multi-model consensus algorithms combining surface hardness and acoustic transmission speeds to predict in-situ compressive strength within 0.8 MPa of verified core extraction benchmarks.',
    metrics: [
      { value: '12+', label: 'NDT Modalities Supported', desc: 'UPV, SonReb, GPR, Impact-Echo, Half-Cell, Resistivity, Thermal' },
      { value: '99.4%', label: 'Correlation Accuracy', desc: 'Empirical match with certified destructive core crush curves' },
      { value: '< 2.4s', label: 'Certified Audit Dispatch', desc: 'Cryptographically sealed test reports delivered instantly to engineers' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Ultrasonic Pulse Velocity (UPV) Tomography',
        desc: 'Map internal concrete acoustic transmission speeds across structural members to detect subsurface honeycombing, voiding, and compaction defects.',
      },
      {
        title: 'Rebound Hammer & SonReb Correlation',
        desc: 'Combine rebound index readings with ultrasonic velocities using empirical SonReb formulations to compute true in-situ compressive strength (MPa).',
      },
      {
        title: 'Ground Penetrating Radar (GPR) Scanning',
        desc: 'Vectorize high-frequency electromagnetic radar reflections to inspect rebar spacing, clear cover depth, post-tensioned tendon ducts, and internal delaminations.',
      },
      {
        title: 'Corrosion Potential & Electrical Resistivity',
        desc: 'Process Half-Cell Potential (ASTM C876) and surface resistivity (Wenner probe) data to identify active reinforcement depassivation and corrosion probability.',
      },
      {
        title: 'Impact-Echo & Acoustic Emission Analytics',
        desc: 'Analyze stress wave frequency reflections to measure concrete slab thickness and identify hidden delaminations in bridge decks and tunnel linings.',
      },
      {
        title: 'Direct Bluetooth Gauge Hardware Synchronization',
        desc: 'Connect seamlessly with industry-standard digital testing gauges from Proceq, Screening Eagle, and James Instruments with zero manual notation.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'IS 13311 (Parts 1 & 2), ASTM C805, ASTM C597, BS 1881-204, ACI 228.1R, RILEM TC 43' },
      { title: 'Testing Hardware', detail: 'Proceq Pundit UPV, SilverSchmidt OS8200, ProfoScope GPR, ResiPod Wenner Probe, Flir Thermal' },
      { title: 'Consensus Analytics', detail: 'SonReb Empirical Regression, 3D Acoustic Tomography, Bayesian Credibility Scoring' },
      { title: 'Certified Deliverables', detail: 'Cryptographic NDT Certificate, In-Situ Strength Tomogram, Rebar Cover Compliance Map' },
    ],
    workflow: [
      { step: '01', title: 'Direct Field Gauge Telemetry', desc: 'Inspectors collect digital rebound numbers and acoustic velocity readings directly via Bluetooth hardware synchronization.' },
      { step: '02', title: 'Multi-Model SonReb Consensus', desc: 'OX1 applies empirical regression curves to combine acoustic speed and surface hardness, predicting true in-situ MPa.' },
      { step: '03', title: 'Instant Cryptographic Certification', desc: 'Produces certified, tamper-proof inspection certificates with SHA-256 seals and direct coordinate mapping to BIM geometry.' },
    ],
  },
  {
    id: 'bim',
    number: '05',
    title: 'BIM Studio',
    subtitle: 'Open IFC models, 2D plan extrusions, and element telemetry.',
    tagline: 'Bind physical testing data directly to 3D structural BIM elements.',
    overview: 'Bridge the critical divide between static 2D engineering drawings and living 3D digital asset models. OX1 BIM Studio imports open IFC models, vectorizes PDF layout sheets, and bi-directionally binds every physical test reading to its exact 3D spatial coordinate.',
    operationalImpact: 'Eliminates disconnected paper drawing registers. Engineers click any pier, girder, diaphragm, or pile cap in the high-performance WebGL 3D viewer to instantly view complete historical cube crush records, NDT scan points, and installed sensor nodes.',
    metrics: [
      { value: '±2 mm', label: 'Spatial Coordinate Precision', desc: 'High-resolution binding of physical testing probes to 3D geometry' },
      { value: '100%', label: 'openBIM IFC Compliant', desc: 'Full native support for IFC 2x3 and IFC4 schemas without proprietary lock-in' },
      { value: '60 FPS', label: 'In-Browser 3D Rendering', desc: 'Hardware-accelerated WebGL rendering for complex multi-gigabyte models' },
    ],
    capabilitiesDetailed: [
      {
        title: 'High-Performance Open IFC 2x3 & IFC4 Parser',
        desc: 'Render massive civil infrastructure assemblies—including multi-kilometer elevated viaducts and complex interchanges—smoothly in any web browser.',
      },
      {
        title: '2D Drawing Vectorization & Scale Calibration',
        desc: 'Import AutoCAD DXF, DWG, and high-resolution PDF plans, calibrating structural dimensions and converting 2D plan lines into editable spatial vectors.',
      },
      {
        title: '2D-to-3D Plan Extrusions & Parametric Geometry',
        desc: 'Extrude 2D pier layouts and deck cross-sections into full 3D solid structural meshes with accurate material assignments and reinforcement cages.',
      },
      {
        title: 'Bi-Directional Element-to-Telemetry Binding',
        desc: 'Every cube break, Schmidt hammer point, and core test is tethered to specific GUIDs, enabling instant retrieval by selecting any structural component.',
      },
      {
        title: 'Visual Defect & Strength Heatmaps on 3D Mesh',
        desc: 'Project color-coded volumetric heatmaps representing compressive strength, rebar cover depth, and ultrasonic velocities directly onto 3D element faces.',
      },
      {
        title: 'Design Revision Comparison & Clash Detection',
        desc: 'Overlay tender revision models against as-built models, highlighting spatial deviations, rebar congestion conflicts, and geometry discrepancies.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'ISO 19650 (BIM Lifecycle), buildingSMART IFC 2x3 & IFC4, OpenBIM Standards, BCF 2.1' },
      { title: 'File Format Support', detail: 'IFC, DXF, DWG, Vector PDF, OBJ, GLTF 2.0, Point Cloud LAS/LAZ Photogrammetry' },
      { title: 'Spatial Linking', detail: 'GUID Element Binding, Coordinate Georeferencing (WGS84 / UTM), Spatial Collision Detection' },
      { title: 'Certified Deliverables', detail: 'As-Built 3D IFC Model with Embedded Quality Ledger, Visual Defect Heatmap, Clash Audit Dossier' },
    ],
    workflow: [
      { step: '01', title: 'Open IFC Ingestion', desc: 'Upload open standard IFC models or vectorize 2D PDF structural drawings with automatic scale calibration.' },
      { step: '02', title: 'Spatial Telemetry Binding', desc: 'Tether field test points, rebar cover measurements, and sensor nodes directly to 3D structural element GUIDs.' },
      { step: '03', title: 'Visual Heatmap Analysis', desc: 'Project volumetric concrete strength and defect heatmaps directly onto the 3D model for intuitive stakeholder reviews.' },
    ],
  },
  {
    id: 'shm',
    number: '06',
    title: 'Structural Health Monitoring',
    subtitle: 'Continuous sensor telemetry, threshold alerts, and trend tracking.',
    tagline: 'Real-time telemetry from strain, tilt, deflection, and vibration sensors.',
    overview: 'Monitor live structural behavior and physical responses across critical bridge spans, tunnels, viaduct piers, and deep geotechnical foundations. OX1 continuously ingests dynamic sensor streams, compensating for environmental variations and detecting micro-structural anomalies.',
    operationalImpact: 'Transforms scheduled manual maintenance into proactive, condition-based structural stewardship. Automated baseline drift correction removes thermal expansion noise, alerting concession engineers the instant structural strain or tilt thresholds exceed safe codified limits.',
    metrics: [
      { value: '100 Hz', label: 'Continuous Telemetry Ingestion', desc: 'High-frequency vibration and dynamic strain acquisition' },
      { value: '< 300ms', label: 'Critical Alert Dispatch', desc: 'Instant SMS, WhatsApp & API triggers when safety thresholds breach' },
      { value: '50 Years', label: 'Continuous Historical Horizon', desc: 'Decade-spanning sensor storage for long-term fatigue analysis' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Multi-Sensor IoT Hardware Ingestion',
        desc: 'Ingest live telemetry from vibrating wire strain gauges, MEMS accelerometers, electrolytic tiltmeters, crack meters, and piezometers.',
      },
      {
        title: 'Continuous Ambient Vibration & Modal Analysis',
        desc: 'Compute natural frequencies, modal shapes, and damping ratios to identify structural stiffness degradation or boundary condition alterations.',
      },
      {
        title: 'Configurable Multi-Tier Threshold Alerts',
        desc: 'Establish multi-level safety boundaries (Advisory, Warning, Critical Emergency) mapped to structural design calculations and IRC codes.',
      },
      {
        title: 'Dynamic Baseline Thermal Drift Removal',
        desc: 'Filter out diurnal and seasonal temperature expansion cycles using physics-informed baseline regression to isolate true structural distress.',
      },
      {
        title: 'Automated Health Index & Condition Scoring',
        desc: 'Synthesize sensor readings across all spans into an aggregated asset health index, highlighting degrading piers before visible cracks develop.',
      },
      {
        title: 'Instant Multi-Channel Alert Dispatch',
        desc: 'Dispatch emergency alerts via SMS, automated voice calls, encrypted emails, and webhooks to concessionaire operational command desks.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'IRC SP:80 (Bridge Health Monitoring), Fib Model Code 2010, ISO 18649, ASTM E1316' },
      { title: 'Sensor Compatibility', detail: 'Vibrating Wire, Fiber Bragg Grating (FBG), MEMS Accelerometer, LVDT, Piezometer' },
      { title: 'Processing Protocols', detail: 'Fast Fourier Transform (FFT), Operational Modal Analysis (OMA), Kalman Filtering' },
      { title: 'Certified Deliverables', detail: 'Live Telemetry Dashboard, Modal Frequency Drift Ledger, Emergency Threshold Event Dossier' },
    ],
    workflow: [
      { step: '01', title: 'Continuous Stream Ingestion', desc: 'Ingest strain, deflection, vibration, and temperature data from field data loggers via 4G/IoT telemetry.' },
      { step: '02', title: 'Drift Filtering & Modal Analysis', desc: 'Apply mathematical filters to remove seasonal thermal drift, calculating natural frequencies and modal stiffness.' },
      { step: '03', title: 'Automated Threshold Alerts', desc: 'Trigger instant escalation workflows if structural strains exceed codified limits, alerting engineering leadership immediately.' },
    ],
  },
  {
    id: 'digitaltwins',
    number: '07',
    title: 'Digital Twins',
    subtitle: 'Living digital models reflecting real-time physical condition.',
    tagline: 'The complete, interactive digital replica of your infrastructure asset across 50 years.',
    overview: 'Unify 3D BIM geometry, historical quality inspection records, in-situ NDT tomograms, and live sensor telemetry into a single, synchronized Digital Twin of the built asset. Preserves an immutable historical record from groundbreaking through 50-year concession maintenance.',
    operationalImpact: 'Solves the catastrophic loss of construction documentation during operational handover. Toll concessionaires, sovereign wealth asset managers, and inspection agencies access an interactive time-machine that plays back structural condition changes over months and decades.',
    metrics: [
      { value: '50-Year', label: 'Concession Lifecycle Horizon', desc: 'Preserves complete as-built health data across concession contracts' },
      { value: '100%', label: 'As-Built Quality Traceability', desc: 'Every physical component linked to its exact original pour certificate' },
      { value: '0', label: 'Lost Project Records', desc: 'Centralizes inspection history, preventing archival document loss' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Comprehensive Digital Asset Hierarchy',
        desc: 'Organize assets into intuitive trees: Highway Corridor > Contract Package > Viaduct Structure > Pier Cap > Bearing > Rebar Element.',
      },
      {
        title: 'Chronological Time-Slider Playback',
        desc: 'Replay the structural evolution of the asset over time, observing how concrete strength matured, crack networks propagated, and strains developed.',
      },
      {
        title: 'Superposition of NDT Tomograms on Twin Geometry',
        desc: 'Project 3D ultrasonic acoustic scans and GPR radar slices directly onto the virtual twin to visualize internal voids inside concrete piers.',
      },
      {
        title: '50-Year Service Life Predictive Simulation',
        desc: 'Model carbonation front progression, chloride ion ingress, and cover depassivation using Fickian diffusion equations and Life-365 algorithms.',
      },
      {
        title: 'Predictive Maintenance Intervention Planning',
        desc: 'Simulate structural retrofit scenarios—such as carbon fiber wrapping or silane impregnation—and evaluate life-extension efficacy before site execution.',
      },
      {
        title: 'Instant Handover Dossiers for Asset Concessionaires',
        desc: 'Package complete as-built documentation, material test certificates, and sensor baselines into an exportable, interactive handover dossier.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'ISO 23247 (Digital Twin Framework), ISO 55000 (Asset Management), Life-365, fib Model Code' },
      { title: 'Modeling Framework', detail: 'Fickian Chloride Diffusion, Carbonation Depth Modeling, Finite Element Coordinate Mesh' },
      { title: 'Asset Governance', detail: 'Hierarchical Asset WBS, Immutable Historical Changelog, Role-Based Handover Portals' },
      { title: 'Certified Deliverables', detail: 'Interactive Digital Twin Handover Package, Remaining Service Life Forecast, Maintenance Strategy' },
    ],
    workflow: [
      { step: '01', title: 'As-Built Data Consolidation', desc: 'Aggregate final BIM geometry, signed pour cards, certified cube crush records, and sensor baselines.' },
      { step: '02', title: 'Time-Domain Simulation', desc: 'Simulate long-term environmental degradation, calculating carbonation depths and chloride ingress trajectories.' },
      { step: '03', title: 'Concession Handover & Maintenance', desc: 'Deliver an interactive, self-updating digital twin to asset operators for proactive 50-year structural stewardship.' },
    ],
  },
  {
    id: 'reports',
    number: '08',
    title: 'Reports & Documentation',
    subtitle: 'Cryptographic compliance dossiers and same-day certificates.',
    tagline: 'Replace 28 days of waiting with instant, cryptographically sealed compliance reports.',
    overview: 'Eliminate weeks of clerical delays and transcription errors. OX1 automatically synthesizes raw laboratory data, physical NDT test readings, geo-located site photographs, and calibrated gauge telemetry into certified, tamper-evident engineering dossiers.',
    operationalImpact: 'Built to satisfy the stringent audit requirements of national highway authorities, independent engineers, and sovereign compliance monitors. Every report receives an immutable SHA-256 cryptographic seal and verifiable QR code that guarantees field origin authenticity.',
    metrics: [
      { value: '< 60s', label: 'Dossier Generation Time', desc: 'Transforms raw field testing records into certified PDF audit packs' },
      { value: '0%', label: 'Transcription Tampering', desc: 'Cryptographic SHA-256 hash seals prevent retrospective data alterations' },
      { value: '100%', label: 'Regulatory Auditor Acceptance', desc: 'Fully compliant with IS, IRC, MoRTH, and state highway formats' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Automated Certified NDT Inspection Reports',
        desc: 'Generate comprehensive inspection reports complete with SonReb correlation curves, ultrasonic pulse velocity grids, and cover depth histograms.',
      },
      {
        title: 'SHA-256 Cryptographic Seals & GPS Geostamps',
        desc: 'Seal every generated report with a cryptographic SHA-256 digital signature, embedded GPS coordinates, hardware probe serial numbers, and UTC timestamps.',
      },
      {
        title: 'Pre-Loaded Codal Compliance Templates',
        desc: 'Format reports automatically to match mandated statutory templates for IS 456, IS 13311, MoRTH Section 1700, and IRC bridge inspection guidelines.',
      },
      {
        title: 'Multi-Stakeholder Digital Sign-Off Chains',
        desc: 'Route reports through sequential digital signature chains: Contractor Quality Engineer > Consultant Resident Engineer > Authority Quality Director.',
      },
      {
        title: 'Tamper-Evident QR Code Field Verification',
        desc: 'Embed secure dynamic QR codes on printed and PDF reports, enabling site auditors to scan and verify the original cryptographic record on the OX1 ledger.',
      },
      {
        title: 'Batch Dossier Export for Milestone Billing',
        desc: 'Package hundreds of individual pour clearances and cube test records into consolidated monthly audit books required for IPC payment disbursements.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'IS 456, IS 13311, MoRTH Specifications, IRC Section 112, ISO/IEC 17025, ISO 19005 (PDF/A)' },
      { title: 'Security & Integrity', detail: 'SHA-256 Cryptographic Hashes, Public Key Infrastructure (PKI), Geofence Validation, UTC Time Protocol' },
      { title: 'Export Formats', detail: 'Archival PDF/A-1b, JSON Data Payloads, Excel Analytical Sheets, Direct Regulatory API Push' },
      { title: 'Certified Deliverables', detail: 'Signed NDT Compliance Certificate, Monthly Quality Audit Book, Package Handover Dossier' },
    ],
    workflow: [
      { step: '01', title: 'Data Aggregation & Synthesis', desc: 'Synthesize field NDT scans, lab cube crush curves, and geostamped photos into standardized codal templates.' },
      { step: '02', title: 'Cryptographic SHA-256 Sealing', desc: 'Apply cryptographic hashes, GPS stamps, and device calibration serials to prevent retrospective tampering.' },
      { step: '03', title: 'Digital Signoff & Field Verification', desc: 'Execute multi-party digital signoffs and generate QR-verified PDFs for instant distribution to clients and auditors.' },
    ],
  },
  {
    id: 'budget',
    number: '09',
    title: 'Budget & Cost Intelligence',
    subtitle: 'BOQ automation, variance tracking, and milestone payment gating.',
    tagline: 'Financial clarity linked directly to verified physical execution and quality approvals.',
    overview: 'Ensure that project disbursements and contractor invoice approvals are strictly tied to verified physical quality. OX1 links Bill of Quantities (BOQ) line items directly to verified testing signoffs, preventing overbilling, unapproved variations, and premature payouts.',
    operationalImpact: 'Protects concessionaires and developers from premature capital expenditure on defective structural work. Interim Payment Certificates (IPCs) automatically lock until all mandatory laboratory break tests, pour clearances, and NDT audits pass compliance.',
    metrics: [
      { value: '100%', label: 'Quality-Gated Disbursements', desc: 'Payment releases locked until all hold-point tests pass verified compliance' },
      { value: '0', label: 'Unverified Rework Overbilling', desc: 'Defect rectification expenses isolated from contractor billings' },
      { value: 'Real-Time', label: 'BOQ Quantity Reconciliation', desc: 'Calculates exact material consumption against theoretical design' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Parametric 3D BIM Quantity Takeoffs (QTO)',
        desc: 'Extract exact concrete volumes, rebar tonnages, and formwork surface areas directly from 3D IFC models, eliminating manual calculation discrepancies.',
      },
      {
        title: 'Live BOQ Tracking Tied to Quality Approvals',
        desc: 'Bind BOQ line items directly to approved digital pour cards and cube strength records so payment line items reflect only certified, compliant work.',
      },
      {
        title: 'Theoretical vs. Actual Material Consumption',
        desc: 'Compare theoretical mix consumption against batch plant SCADA dockets to detect cement under-dosing or material wastage in real time.',
      },
      {
        title: 'Milestone Payment Gating (IPC Automation)',
        desc: 'Prevent financial signoff on Interim Payment Certificates until all associated witness points, laboratory breaks, and NDT audits achieve gated approval.',
      },
      {
        title: 'Rework & Non-Conformance Cost Isolation',
        desc: 'Isolate rework expenses resulting from contractor NCRs, preventing unapproved variation claims from inflating project capital expenditure.',
      },
      {
        title: 'Executive Financial Forecasting & EVM',
        desc: 'Project accurate Cost Performance Index (CPI) and Estimate at Completion (EAC) based on actual physical execution velocity and verified field yields.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'CPWD Analysis of Rates, MoRTH Standard Data Book, FIDIC Payment Clauses, RICS Standards' },
      { title: 'Valuation Engine', detail: 'Automated 3D BIM QTO, SCADA Batch Reconciliation, Milestone Payment Gating Logic' },
      { title: 'Cost Governance', detail: 'NCR Penalty Isolation, Multi-Tier Financial Approvals, Immutable IPC Disbursement Ledger' },
      { title: 'Certified Deliverables', detail: 'Quality-Gated Interim Payment Certificate, Material Variance Audit, Executive Cost Forecast' },
    ],
    workflow: [
      { step: '01', title: 'Automated BIM QTO Extraction', desc: 'Calculate precise concrete, rebar, and formwork quantities directly from 3D IFC structural geometry.' },
      { step: '02', title: 'Quality-Gated Hold-Point Check', desc: 'Cross-reference contractor invoice line items against verified pour certificates and compressive test results.' },
      { step: '03', title: 'Interim Payment Authorization', desc: 'Generate verified IPC payment recommendations with full documentation audit trails for financial directors.' },
    ],
  },
  {
    id: 'analytics',
    number: '10',
    title: 'Analytics & Project Intelligence',
    subtitle: 'Portfolio trends, predictive risks, and executive insights.',
    tagline: 'Transform raw inspection registers into decisive, predictive organizational intelligence.',
    overview: 'Gain panoramic clarity across every active corridor package, casting yard, laboratory, and regional division. OX1 synthesizes millions of discrete testing data points into real-time quality yield benchmarks, supplier rankings, and predictive failure forecasts.',
    operationalImpact: 'Enables C-suite executives, Chief Engineers, and Government Project Directors to transition from reactive dispute resolution to proactive risk mitigation. Machine learning models identify systemic aggregate degradation and contractor curing bottlenecks weeks before structural defects manifest.',
    metrics: [
      { value: '100%', label: 'Real-Time Cross-Corridor Visibility', desc: 'Instant portfolio analytics across all active highway and transit packages' },
      { value: '< 300ms', label: 'Dynamic Analytical Query Latency', desc: 'Instantaneous aggregation of millions of historical testing records' },
      { value: 'Predictive', label: 'Failure & Delay Modeling', desc: 'Early warning indicators forecasting curing anomalies and test delays' },
    ],
    capabilitiesDetailed: [
      {
        title: 'Cross-Corridor Quality Yield Benchmarking',
        desc: 'Compare contractor performance, cube pass rates, and NDT acoustic velocity averages across dozens of regional packages on a unified scale.',
      },
      {
        title: 'Statistical Compressive Strength Distribution',
        desc: 'Fit Gaussian distribution curves to target 28-day characteristic strength (fck) data, calculating standard deviations and compliance probabilities.',
      },
      {
        title: 'Supplier Material Consistency Ranking',
        desc: 'Evaluate longitudinal test data for cement brands, sand quarries, and coarse aggregate sources, identifying suppliers with high variance.',
      },
      {
        title: 'CAPA Resolution Velocity Tracking',
        desc: 'Measure the exact turnaround time from NCR issuance to engineering closure, identifying regional bottlenecks in quality dispute resolution.',
      },
      {
        title: 'Predictive Structural Delay Forecasting',
        desc: 'Predict curing and testing schedule bottlenecks by correlating weather forecasts, concrete mix thermal kinetics, and historical testing velocity.',
      },
      {
        title: 'Executive C-Suite KPI Intelligence Dossiers',
        desc: 'Provide Boards of Directors, Ministry Officials, and Concessionaire Executives with clean, actionable summaries of enterprise quality and risk posture.',
      },
    ],
    standards: [
      { title: 'Governed Standards', detail: 'ISO 31000 (Risk Management), Six Sigma Quality Frameworks, Indian Roads Congress Special Publications' },
      { title: 'Analytical Engine', detail: 'Gaussian Normal Distributions, Pearson Correlation Curves, Predictive Risk Regression' },
      { title: 'Data Governance', detail: 'Enterprise Data Warehouse, Role-Based Analytics Dashboards, Automated Weekly Executive Briefs' },
      { title: 'Certified Deliverables', detail: 'Enterprise Quality Benchmark Report, Supplier Reliability Index, Executive Risk Dossier' },
    ],
    workflow: [
      { step: '01', title: 'Cross-Package Telemetry Pooling', desc: 'Aggregate testing logs, batch plant tickets, and NDT measurements across all active concession corridors.' },
      { step: '02', title: 'Statistical & Predictive Modeling', desc: 'Apply Gaussian distribution analysis and machine learning to detect systemic supplier or contractor anomalies.' },
      { step: '03', title: 'Executive Actionable Intelligence', desc: 'Deliver live KPI dashboards and predictive delay forecasts directly to project directors and ministry stakeholders.' },
    ],
  },
];// 8 Project Lifecycle Stages
interface LifecycleStageData {
  number: string;
  title: string;
  tag: string;
  desc: string;
  deliverables: string[];
  standards: string;
  x: number;
  y: number;
  labelPos: 'top' | 'bottom' | 'left' | 'right';
  iconSymbol: string;
}

const LIFECYCLE_STAGES: LifecycleStageData[] = [
  {
    number: '01',
    title: 'Establish',
    tag: 'Initiation & Workspace Governance',
    desc: 'Deploy enterprise multi-tenant workspaces, configure project asset breakdown structures (PBS/WBS), configure cryptographic RACI governance matrices, and enforce zero-trust role-based access rules.',
    deliverables: [
      'Multi-tenant workspace provisioned with cryptographic tenant isolation',
      'Corridor asset hierarchy configured (Viaduct spans, piers, casting yards)',
      'Granular RACI matrices bound to resident engineers & independent reviewers',
      'Deterministic audit logging enabled for all field personnel'
    ],
    standards: 'ISO 27001 • SOC-2 • Zero-Trust RBAC',
    x: 360,
    y: 80,
    labelPos: 'top',
    iconSymbol: '🔍'
  },
  {
    number: '02',
    title: 'Plan',
    tag: 'Pre-Construction & Codal Baselining',
    desc: 'Establish digital Inspection and Test Plans (ITP), configure codal tolerance criteria per IS/IRC/MoRTH, vectorize tender drawings, and baseline BOQ quantities.',
    deliverables: [
      'Digital Inspection & Test Plans (ITP) codified with hold-point gating',
      'Batch plant mix designs & early-age maturity calibration curves baselined',
      'CAD vectorization & 3D open IFC BIM spatial coordinate alignment',
      'BOQ volume takeoffs and material specification thresholds bound'
    ],
    standards: 'IS 456 Cl. 10 • IRC 112 • MoRTH Section 1700',
    x: 560,
    y: 80,
    labelPos: 'top',
    iconSymbol: '✓'
  },
  {
    number: '03',
    title: 'Execute',
    tag: 'Construction & Pour Execution',
    desc: 'Orchestrate concrete pour schedules, log digital batching plant tickets, monitor real-time water-cement ratios, and track daily contractor execution logs with zero manual paper loss.',
    deliverables: [
      'Automated batch plant ticket ingestion via direct cloud integration',
      'Slump flow & water-cement ratio verification before pour clearance',
      'Digital pour card authorization with geostamped timestamp signatures',
      'Truck transit duration tracking to prevent premature slump loss'
    ],
    standards: 'IS 4926 (Ready-Mixed Concrete) • IRC 112 Clause 12.3',
    x: 760,
    y: 80,
    labelPos: 'top',
    iconSymbol: '⚙'
  },
  {
    number: '04',
    title: 'Inspect & Test',
    tag: 'Non-Destructive Testing & QA/QC',
    desc: 'Conduct in-situ NDT tests (UPV, SonReb, GPR), synchronize automated digital compressive testing machine (CTM) break results, and record geostamped photographic evidence.',
    deliverables: [
      '12-point digital Schmidt rebound hammer cluster bluetooth synchronization',
      'Ultrasonic pulse velocity (UPV) acoustic tomography grid ingestion',
      'Digital CTM load cell sync: Zero clerical transcription loss on 7d & 28d cubes',
      'Geostamped rebar cover depth meter scans across structural elements'
    ],
    standards: 'IS 13311 (Part 1 & 2) • ASTM C805 • BS 1881',
    x: 890,
    y: 170,
    labelPos: 'right',
    iconSymbol: '🔬'
  },
  {
    number: '05',
    title: 'Model & Monitor',
    tag: 'Digital Spatial & Structural IoT',
    desc: 'Synchronize 2D field tests with 3D open IFC BIM geometry, bind live telemetry sensors, and monitor real-time internal strains, hydration temperatures, and thermal gradients.',
    deliverables: [
      'IFC4 model elements bound directly to physical inspection point coordinates',
      'Mass concrete hydration core-to-surface temperature gradient tracking',
      'Vibrating wire strain gauges (VWSG) streaming live microstrain telemetry',
      'Deflection, tilt, and acoustic emission monitoring on pre-stressed girders'
    ],
    standards: 'ISO 19650 Open BIM • IRC SP 87 • ACI 207',
    x: 760,
    y: 260,
    labelPos: 'bottom',
    iconSymbol: '📊'
  },
  {
    number: '06',
    title: 'Analyze',
    tag: 'Multi-Model Consensus & AI Physics',
    desc: 'Execute multi-model consensus calculations, compute in-situ maturity curves, evaluate residual structural capacity, and flag non-conformances without black-box approximations.',
    deliverables: [
      'Deterministic consensus correlation between SonReb, UPV & maturity curves',
      'Early-age in-situ strength forecasting for optimized formwork de-shuttering',
      'Automated Non-Conformance Report (NCR) generation with corrective action plans',
      'Structural safety factor calculation against designed ultimate limit states'
    ],
    standards: 'IS 456 Annexure B • IRC 112 Limit State Design',
    x: 560,
    y: 260,
    labelPos: 'bottom',
    iconSymbol: '📈'
  },
  {
    number: '07',
    title: 'Report & Verify',
    tag: 'Certification & Milestone Gating',
    desc: 'Generate cryptographic SHA-256 sealed audit certificates, execute multi-party digital signoffs, and trigger milestone payment releases with zero paperwork disputes.',
    deliverables: [
      'Tamper-proof cryptographic SHA-256 sealed audit certificates',
      'Multi-party digital signoff ledger (Contractor, Consultant, Authority)',
      'Interim Payment Certificate (IPC) clearance gated against physical compliance',
      'Automated executive PDF compliance dossier generation with zero manual drafting'
    ],
    standards: 'MoRTH Quality Manual • Cryptographic SHA-256 Seal',
    x: 360,
    y: 260,
    labelPos: 'bottom',
    iconSymbol: '✓'
  },
  {
    number: '08',
    title: 'Handover & Preserve',
    tag: '50-Year Asset Digital Twin',
    desc: 'Deliver an immutable, interactive Digital Twin to concessionaires and highway authorities with complete historical inspection logs and 50-year service life models.',
    deliverables: [
      'Complete as-built digital twin containing 100% of physical QA/QC records',
      '50-year carbonation front simulation & chloride ingress durability modeling',
      'Predictive maintenance schedules driven by actual structural health history',
      'Zero lost drawings or paper binders during concession transfer'
    ],
    standards: 'IRC SP 35 • ISO 55000 Asset Management • Life-365',
    x: 230,
    y: 170,
    labelPos: 'left',
    iconSymbol: '🔄'
  },
];

const LIFECYCLE_SEGMENT_PATHS = [
  'M 360 80 L 560 80', // 01 -> 02
  'M 560 80 L 760 80', // 02 -> 03
  'M 760 80 L 800 80 A 90 90 0 0 1 890 170', // 03 -> 04
  'M 890 170 A 90 90 0 0 1 800 260 L 760 260', // 04 -> 05
  'M 760 260 L 560 260', // 05 -> 06
  'M 560 260 L 360 260', // 06 -> 07
  'M 360 260 L 320 260 A 90 90 0 0 1 230 170', // 07 -> 08
  'M 230 170 A 90 90 0 0 1 320 80 L 360 80', // 08 -> 01
];

const SEGMENT_LENGTHS = [200, 200, 181.4, 181.4, 200, 200, 181.4, 181.4];

interface EcosystemInfographicItem {
  id: string;
  side: 'left' | 'right';
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  cx: number;
  cy: number;
  textX: number;
  textY: number;
  textW: number;
  curve: string;
  startDot: { x: number; y: number };
  endDot: { x: number; y: number };
}

const ECOSYSTEM_INFOGRAPHIC_ITEMS: EcosystemInfographicItem[] = [
  // Left 4 items (top to bottom) - Symmetrically spaced with guaranteed clear margin from circles
  {
    id: 'engineering',
    side: 'left',
    title: 'Engineering-Centric',
    desc: 'Built around the physical laws of concrete hydration, wave acoustics, and codified standards.',
    icon: Mountain,
    cx: 360,
    cy: 130,
    textX: 46,
    textY: 98,
    textW: 240,
    curve: 'M 398 130 C 470 130 470 312 547 312',
    startDot: { x: 398, y: 130 },
    endDot: { x: 547, y: 312 },
  },
  {
    id: 'unified',
    side: 'left',
    title: 'Unified by Design',
    desc: 'One seamless database uniting schedules, ITP hold points, NDT tomography, and open BIM geometry.',
    icon: Telescope,
    cx: 400,
    cy: 280,
    textX: 86,
    textY: 248,
    textW: 240,
    curve: 'M 438 280 C 485 280 485 340 536 340',
    startDot: { x: 438, y: 280 },
    endDot: { x: 536, y: 340 },
  },
  {
    id: 'ai',
    side: 'left',
    title: 'AI-Enabled Intelligence',
    desc: 'Contextual, deterministic civil engineering intelligence parsing tender specs and validating test curves.',
    icon: Atom,
    cx: 360,
    cy: 440,
    textX: 46,
    textY: 408,
    textW: 240,
    curve: 'M 398 440 C 465 440 465 380 536 380',
    startDot: { x: 398, y: 440 },
    endDot: { x: 536, y: 380 },
  },
  {
    id: 'architecture',
    side: 'left',
    title: 'Project-Centric Architecture',
    desc: 'Clean architectural boundary separating enterprise organization governance from active field execution.',
    icon: Search,
    cx: 400,
    cy: 590,
    textX: 86,
    textY: 558,
    textW: 240,
    curve: 'M 438 590 C 490 590 490 408 547 408',
    startDot: { x: 438, y: 590 },
    endDot: { x: 547, y: 408 },
  },

  // Right 4 items (top to bottom) - Symmetrically mirrored with guaranteed clear margin from circles
  {
    id: 'compliance',
    side: 'right',
    title: 'Codal Compliance Gated',
    desc: 'Automates IS 456, IS 13311, and MoRTH compliance gating with cryptographic SHA-256 seals.',
    icon: ClipboardCheck,
    cx: 900,
    cy: 130,
    textX: 974,
    textY: 98,
    textW: 240,
    curve: 'M 862 130 C 790 130 790 312 713 312',
    startDot: { x: 862, y: 130 },
    endDot: { x: 713, y: 312 },
  },
  {
    id: 'deterministic',
    side: 'right',
    title: 'Data-Driven & Deterministic',
    desc: 'Replaces 28-day guessing with predictive maturity physics and multi-model consensus calculations.',
    icon: Timer,
    cx: 860,
    cy: 280,
    textX: 934,
    textY: 248,
    textW: 240,
    curve: 'M 822 280 C 775 280 775 340 724 340',
    startDot: { x: 822, y: 280 },
    endDot: { x: 724, y: 340 },
  },
  {
    id: 'interoperability',
    side: 'right',
    title: 'Built for Interoperability',
    desc: 'Open BIM (IFC), standard CAD, open CSV/JSON APIs, and universal hardware compatibility.',
    icon: Lightbulb,
    cx: 900,
    cy: 440,
    textX: 974,
    textY: 408,
    textW: 240,
    curve: 'M 862 440 C 795 440 795 380 724 380',
    startDot: { x: 862, y: 440 },
    endDot: { x: 724, y: 380 },
  },
  {
    id: 'twin',
    side: 'right',
    title: '50-Year Concession Twin',
    desc: 'Preserves complete as-built health data, material certifications, and 50-year service life models.',
    icon: Clock,
    cx: 860,
    cy: 590,
    textX: 934,
    textY: 558,
    textW: 240,
    curve: 'M 822 590 C 770 590 770 408 713 408',
    startDot: { x: 822, y: 590 },
    endDot: { x: 713, y: 408 },
  },
];

// 13 Comprehensive FAQ Items
const FAQ_ITEMS = [
  {
    q: 'What is OX1?',
    a: 'OX1 (Omni eXtelligence 1) is an enterprise infrastructure intelligence platform built by OUANTUM. It integrates civil engineering workflows, project management, quality assurance, quality control, non-destructive testing (NDT), BIM spatial modeling, structural health monitoring, digital twins, cost intelligence, and artificial intelligence into one unified, deterministic operating environment.'
  },
  {
    q: 'What does Omni eXtelligence 1 mean?',
    a: '"Omni" denotes comprehensive, unbroken coverage across the entire project lifecycle—from preliminary tender planning to 50-year asset operations. "eXtelligence" represents the synthesis of physical civil engineering laws, codified standards (IS, IRC, MoRTH, ACI), real-time sensor telemetry, and artificial intelligence. "1" signifies the single source of truth connecting concessionaires, contractors, consultants, and authorities.'
  },
  {
    q: 'Is OX1 a construction management platform?',
    a: 'OX1 includes complete construction project management capabilities—such as WBS tracking, task scheduling, milestones, and documentation. However, unlike generic construction management tools designed primarily for administration, OX1 is deeply grounded in civil structural physics and testing diagnostics. It connects administrative tasks directly with verified laboratory data, in-situ NDT, BIM geometry, and sensor telemetry.'
  },
  {
    q: 'What modules does OX1 include?',
    a: 'OX1 includes ten primary modules: (1) Project Management, (2) Quality Assurance, (3) Quality Control, (4) Non-Destructive Testing, (5) BIM Studio, (6) Structural Health Monitoring, (7) Digital Twins, (8) Reports & Documentation, (9) Budget & Cost Intelligence, and (10) Analytics & Project Intelligence.'
  },
  {
    q: 'Does OX1 support NDT?',
    a: 'Yes. OX1 provides enterprise-grade support for over 12 non-destructive testing methodologies, including Ultrasonic Pulse Velocity (UPV), Rebound Hammer (SonReb correlation), Ground Penetrating Radar (GPR), Impact-Echo, Half-Cell Potential, Electrical Resistivity, Infrared Thermography, LiDAR, and Fiber Optic Monitoring. It supports direct Bluetooth hardware data sync and automated multi-model consensus calculations.'
  },
  {
    q: 'Does OX1 include QA/QC?',
    a: 'Yes. OX1 features dedicated Quality Assurance and Quality Control modules. It standardizes Inspection and Test Plans (ITPs), method statements, pour cards, cube testing schedules, digital non-conformance reporting (NCRs), and corrective and preventive action (CAPA) tracking with strict escalation rules and immutable cryptographic timestamps.'
  },
  {
    q: 'Does OX1 support BIM?',
    a: 'Yes. OX1 BIM Studio provides native support for open IFC workflows (IFC 2x3 and IFC4), 2D engineering drawing management, PDF plan vectorization, and 2D-to-3D plan extrusions. Most importantly, it allows engineers to bind physical NDT records, sensor nodes, and quality inspection histories directly to individual 3D structural elements.'
  },
  {
    q: 'What AI capabilities are built into OX1?',
    a: 'OX1 features a native civil structural intelligence layer embedded directly into the platform. Unlike general-purpose chatbots, it operates strictly within the context of verified project data and codified standards (such as IS 456, IS 13311, IRC 112, and MoRTH). It assists engineers with automated compliance validation, tender document interrogation, defect trend analysis, and technical memorandum drafting.'
  },
  {
    q: 'Can OX1 manage multiple projects?',
    a: 'Yes. OX1 is built with an enterprise Organization Layer designed for nationwide infrastructure developers, state road authorities, and premier EPC concessionaires. It enables organizations to monitor hundreds of corridor packages, bridge spans, and metro packages under unified enterprise governance while keeping project-level data cleanly isolated.'
  },
  {
    q: 'Can multiple teams collaborate?',
    a: 'Yes. OX1 provides role-based access control (RBAC) designed specifically for civil infrastructure projects. Concessionaires, structural design consultants, EPC contractors, Independent Engineers, and Third-Party Quality Monitors (TPQM) collaborate on a shared, immutable timeline with clear permissions and automated audit logging.'
  },
  {
    q: 'Can OX1 integrate with external software?',
    a: 'Yes. OX1 is built on an API-first architecture. It integrates with industry-standard software via open BIM (IFC), CAD formats (DXF/DWG), document and spreadsheet workflows (Excel/CSV), enterprise ERP systems (SAP, Oracle) via REST and GraphQL APIs, and direct Bluetooth synchronization with verified field testing gauges.'
  },
  {
    q: 'Is OX1 suitable for existing buildings?',
    a: 'Yes. In addition to new capital megaprojects, OX1 is extensively deployed for structural audits, retrofit assessments, seismic evaluations, and remaining service life estimations of existing buildings, bridges, and industrial facilities using non-destructive diagnostics and continuous sensor monitoring.'
  },
  {
    q: 'Does OX1 replace engineers?',
    a: 'No. OX1 adheres to the non-negotiable rule that AI assists but does not replace professional human engineering judgment. OX1 automates labor-intensive data collation, eliminates testing fraud, accelerates compliance verification, and provides high-confidence predictive insights, enabling civil engineers to make superior, deterministic decisions.'
  }
];

const OX1Platform: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'org' | 'proj'>('proj');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<number>(0);
  const [activeConnectedTab, setActiveConnectedTab] = useState<number>(0);
  const [activeEcosystemTab, setActiveEcosystemTab] = useState<number>(0);
  const [activeLifecycleStage, setActiveLifecycleStage] = useState<number>(0);
  const [lifecycleProgress, setLifecycleProgress] = useState<number>(0);
  const [activeModuleId, setActiveModuleId] = useState<string>('pm');
  const [hoveredModuleIdx, setHoveredModuleIdx] = useState<number | null>(null);
  const [hoveredEcosystemNode, setHoveredEcosystemNode] = useState<string | null>(null);
  const [selectedEcosystemNode, setSelectedEcosystemNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Auto-progress lifecycle stages strictly in sequential order (01 -> 02 -> ... -> 08 -> 01)
  useEffect(() => {
    const duration = 10000; // 10 seconds per stage
    const intervalTime = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      const progressRatio = Math.min(1, elapsed / duration);
      setLifecycleProgress(progressRatio);

      if (elapsed >= duration) {
        clearInterval(timer);
        setLifecycleProgress(0);
        setActiveLifecycleStage((prev) => (prev + 1) % LIFECYCLE_STAGES.length);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeLifecycleStage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Select active module and ensure capabilities section is comfortably in view
  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    const sectionEl = document.getElementById('capabilities');
    if (sectionEl) {
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top < -20) {
        window.scrollTo({
          top: window.pageYOffset + rect.top - 80,
          behavior: 'smooth',
        });
      }
    }
  };

  // Preload mascot and laptop assets
  useEffect(() => {
    [
      '/mascot.svg',
      '/mascot1.png',
      '/mascot2.svg',
      '/assets/images/logo/ouantum-arch-1.png',
      '/assets/images/logo/ouantum-arch-2.png',
      '/assets/images/logo/ouantum-arch-3.png',
    ].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 3-Card Visual Architecture Configuration from OX1
  const architectureModules = [
    {
      id: '01',
      title: 'Infrastructure Telemetry',
      category: 'EDGE SENSING & IOT',
      description: 'Continuous ingestion of UPV, rebound index, and structural telemetry directly from field hardware.',
      laptop: '/assets/images/logo/ouantum-arch-2.png',
      laptopScale: 1.40,
      laptopX: 0,
      laptopY: 0,
      laptopScaleMobile: 1.10,
      laptopXMobile: 0,
      laptopYMobile: 0,
      mascot: '/mascot.svg',
      mascotScale: 0.85,
      mascotX: -80,
      mascotY: 65,
      mascotRotate: -30,
      mascotHoverScale: 0.70,
      mascotHoverX: -140,
      mascotHoverY: 65,
      mascotHoverRotate: -30,
      mascotScaleMobile: 0.65,
      mascotXMobile: -60,
      mascotYMobile: 45,
      mascotRotateMobile: -30,
      mascotHoverScaleMobile: 0.65,
      mascotHoverXMobile: -155,
      mascotHoverYMobile: 45,
      mascotHoverRotateMobile: -30,
    },
    {
      id: '02',
      title: 'Integrated Architecture',
      category: 'DIGITAL TWIN & BIM',
      description: 'Spatial 3D digital twin reconciling physical sensor coordinates with structural design geometry.',
      laptop: '/assets/images/logo/ouantum-arch-1.png',
      laptopScale: 1.40,
      laptopX: 0,
      laptopY: 3,
      laptopScaleMobile: 1.10,
      laptopXMobile: 0,
      laptopYMobile: 3,
      mascot: '/mascot1.png',
      mascotScale: 0.85,
      mascotX: 0,
      mascotY: 45,
      mascotRotate: 0,
      mascotHoverScale: 0.70,
      mascotHoverX: 0,
      mascotHoverY: -60,
      mascotHoverRotate: 0,
      mascotScaleMobile: 0.65,
      mascotXMobile: 0,
      mascotYMobile: 35,
      mascotRotateMobile: 0,
      mascotHoverScaleMobile: 0.65,
      mascotHoverXMobile: 0,
      mascotHoverYMobile: -95,
      mascotHoverRotateMobile: 0,
    },
    {
      id: '03',
      title: 'Operations & Analytics',
      category: 'QA/QC & COMPLIANCE',
      description: 'Deterministic IS 13311 & ASTM SonReb rule verification with tamper-proof cryptographic audit seals.',
      laptop: '/assets/images/logo/ouantum-arch-3.png',
      laptopScale: 1.35,
      laptopX: 0,
      laptopY: 0,
      laptopScaleMobile: 1.10,
      laptopXMobile: 0,
      laptopYMobile: 0,
      mascot: '/mascot2.svg',
      mascotScale: 0.85,
      mascotX: 80,
      mascotY: 65,
      mascotRotate: 30,
      mascotHoverScale: 0.70,
      mascotHoverX: 140,
      mascotHoverY: 65,
      mascotHoverRotate: 30,
      mascotScaleMobile: 0.65,
      mascotXMobile: 60,
      mascotYMobile: 45,
      mascotRotateMobile: 30,
      mascotHoverScaleMobile: 0.65,
      mascotHoverXMobile: 160,
      mascotHoverYMobile: 45,
      mascotHoverRotateMobile: 40,
    },
  ];

  // SEO & JSON-LD injection
  useEffect(() => {
    document.title = 'OX1 by OUANTUM | Infrastructure Intelligence Platform';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Discover OX1 (Omni eXtelligence 1), OUANTUM's infrastructure intelligence platform connecting project management, QA/QC, NDT, BIM, structural monitoring, digital twins, and native AI intelligence."
      );
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ox1-jsonld';
    script.innerHTML = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('ox1-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#f4f3ec',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '0px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div
      className="ox1-platform-page"
      style={{
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        lineHeight: 1.55,
      }}
    >
      {/* ── SECTION 01: HERO (FIN.AI SIGNATURE COMPOSITION) ── */}
      <section
        id="overview"
        style={{
          padding: '90px 24px 70px',
          maxWidth: '1440px',
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Confident Fin.ai Display Headline */}
        <h1
          style={{
            textAlign: 'center',
            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 'clamp(2.75rem, 6vw, 5.25rem)',
            fontWeight: 600,
            color: '#111111',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            maxWidth: '1120px',
            margin: '0 auto 24px',
          }}
        >
          The Intelligence Layer for the Built Environment.
        </h1>

        {/* Supporting Text */}
        <p
          style={{
            fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
            color: '#4a5565',
            lineHeight: 1.55,
            maxWidth: '840px',
            margin: '0 auto 16px',
            fontWeight: 400,
          }}
        >
          One integrated platform connecting engineering, infrastructure, project operations, and artificial intelligence.
        </p>

        {/* Supporting Statement */}
        <p
          style={{
            fontSize: '1rem',
            color: '#6a7282',
            maxWidth: '760px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          From project management and quality control to NDT, BIM, monitoring, and intelligent reporting, OX1 brings engineering information together.
        </p>

        {/* Fin.ai Style Pill CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          <a
            href="#capabilities"
            style={{
              backgroundColor: '#111111',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 600,
              padding: '14px 34px',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              transition: 'background-color 0.2s ease',
            }}
          >
            Explore OX1 <ArrowRight size={16} />
          </a>
          <Link
            to="/demo"
            style={{
              backgroundColor: '#ffffff',
              color: '#111111',
              fontSize: '0.95rem',
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 0, 0, 0.16)',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease',
            }}
          >
            Request a Demo
          </Link>
        </div>

        {/* OX1 Platform Live Dashboard Showcase */}
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            borderRadius: '0px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/images/ox1-dashboard-hero.jpg"
            alt="OUANTUM OX1 Platform Intelligence Dashboard"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '0px',
            }}
          />
        </div>
      </section>

      {/* ── SECTION 02: FIN.AI SIGNATURE 3-STEP WORKFLOW ── */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto 64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', sans-serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '18px',
              }}
            >
              Deploy in hours, completely governed by your engineering team.
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#4a5565', lineHeight: 1.6 }}>
              From initial field telemetry ingestion to deterministic multi-model consensus and certified audit dispatch.
            </p>

            {/* Fin.ai Style 3-Tab Stepper */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: '#f4f3ec',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '4px',
                marginTop: '32px',
                borderRadius: '9999px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {[
                { title: '01. Ingestion & Vectorization' },
                { title: '02. Multi-Model Consensus' },
                { title: '03. Codified Governance' },
              ].map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveWorkflowTab(idx)}
                  style={{
                    padding: '10px 24px',
                    border: 'none',
                    backgroundColor: activeWorkflowTab === idx ? '#111111' : 'transparent',
                    color: activeWorkflowTab === idx ? '#ffffff' : '#6a7282',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    borderRadius: '9999px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Showcase Card */}
          <div
            style={{
              ...cardStyle,
              padding: '48px 40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {activeWorkflowTab === 0 && (
              <>
                <div>
                  <h3 style={{ fontSize: '1.85rem', fontWeight: 600, color: '#111111', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                    01. Ingestion & Spatial Vectorization
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: '#4a5565', lineHeight: 1.65, marginBottom: '24px' }}>
                    Capture field testing records, 2D AutoCAD/PDF plans, IoT sensor telemetry, and batch plant dockets directly via cloud or offline Bluetooth synchronization with zero manual transcription.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Direct BLE integration with Proceq, Elcometer, and Schmidt digital hammers',
                      'High-resolution PDF plan calibration and 2D vector coordinate extraction',
                      'Batching plant electronic ticket ingestion tracking water-cement ratios',
                      'Cryptographic SHA-256 timestamping and GPS field coordinate logging',
                    ].map((point, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#111111' }}>
                        <Check size={16} color="#111111" strokeWidth={2.4} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#f4f3ec', border: '1px solid rgba(0,0,0,0.06)', padding: '32px', borderRadius: '0px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6a7282', fontFamily: 'var(--ic-font-mono)', marginBottom: '12px' }}>
                    INSPECTION TELEMETRY INGESTION PIPELINE
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>AutoCAD DWG Vectorized: Pier 12 & Viaduct Span</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>3D coordinates calibrated • 144 inspection nodes mapped</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Bluetooth Gauge Sync: Digital Rebound 12-Pt Cluster</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>Raw rebound values ingested with 0 transcription loss</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Batch Ticket #2049: M45 Grade Self-Compacting Mix</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>Slump flow: 680mm • w/c ratio 0.36 • Verified compliant</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeWorkflowTab === 1 && (
              <>
                <div>
                  <h3 style={{ fontSize: '1.85rem', fontWeight: 600, color: '#111111', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                    02. Multi-Model Deterministic Consensus
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: '#4a5565', lineHeight: 1.65, marginBottom: '24px' }}>
                    Cross-correlate Ultrasonic Pulse Velocity, SonReb surface hardness, and laboratory maturity curves bound to 3D BIM spatial coordinates to eliminate single-method diagnostic ambiguity.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Dual-method SonReb formulation removing carbonation surface bias',
                      '3D acoustic tomography displaying internal honeycombing and void depths',
                      'Nurse-Saul maturity calculations predicting 28-day strength in under 4 hours',
                      'Direct bidirectional binding to open IFC 2x3 and IFC4 structural elements',
                    ].map((point, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#111111' }}>
                        <Check size={16} color="#111111" strokeWidth={2.4} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#f4f3ec', border: '1px solid rgba(0,0,0,0.06)', padding: '32px', borderRadius: '0px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6a7282', fontFamily: 'var(--ic-font-mono)', marginBottom: '12px' }}>
                    DETERMINISTIC CONSENSUS ENGINE
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>SonReb Surface Calculation: 42.4 MPa</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>Rebound index 38.6 • Carbonation depth compensated</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>UPV Pulse Velocity: 4,460 m/s</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>Direct transmission • Homogeneity rating: Excellent</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111111' }}>Consensus Strength: 43.8 MPa (Target: 45.0 MPa)</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>99.4% correlation accuracy • Formwork striking authorized</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeWorkflowTab === 2 && (
              <>
                <div>
                  <h3 style={{ fontSize: '1.85rem', fontWeight: 600, color: '#111111', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                    03. Codified Governance & Certified Dispatch
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: '#4a5565', lineHeight: 1.65, marginBottom: '24px' }}>
                    Enforce deterministic compliance with IS 456, IS 13311, IRC 112, and MoRTH 1700. Generate tamper-evident, cryptographically sealed PDF audit dossiers for instant stakeholder dispatch.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Deterministic codal clauses evaluated with zero black-box AI approximations',
                      'Cryptographic SHA-256 seal preventing laboratory report tampering',
                      'Multi-party digital signoffs connecting Contractor, Consultant, and TPQM',
                      'Milestone payment gating strictly tied to verified physical test approvals',
                    ].map((point, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#111111' }}>
                        <Check size={16} color="#111111" strokeWidth={2.4} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#f4f3ec', border: '1px solid rgba(0,0,0,0.06)', padding: '32px', borderRadius: '0px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6a7282', fontFamily: 'var(--ic-font-mono)', marginBottom: '12px' }}>
                    COMPLIANCE CERTIFICATION DOSSIER
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>IS 456:2000 Cl. 15.3 Compliance Certificate</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>Sample frequency, standard deviation, and characteristic pass verified</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>MoRTH Section 1700 Pre-Pour Inspection Gated</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>Hold-point signed by Independent Engineer Er. R. Sharma</div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#2563eb' }}>Cryptographic Seal: SHA-256 Validated</div>
                      <div style={{ fontSize: '0.75rem', color: '#6a7282', marginTop: '2px' }}>Tamper-evident verification QR code generated for field audit</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 04: CONNECTED ECOSYSTEM SHOWCASE (EXACTLY LIKE IMAGE 2) ── */}
      <section
        style={{
          padding: '110px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Top Editorial Narrative (Like Image 2) */}
          <div style={{ maxWidth: '860px', margin: '0 auto 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
                fontWeight: 500,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '24px',
              }}
            >
              Engineering is connected. Its systems should be too.
            </h2>
            <p style={{ fontSize: '1.075rem', color: '#2c3540', lineHeight: 1.65, marginBottom: '16px' }}>
              From day 1 ground testing to 50-year concession operations, OX1 connects field testing, QA/QC, BIM coordinates, and structural monitoring into one unbroken operating environment.
            </p>
            <p style={{ fontSize: '1.025rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
              OX1 uses single-source memory to understand each asset's complete construction history, codified tolerance thresholds, and physical test records to decide what engineering action to trigger next.
            </p>
          </div>

          {/* Large Visual Card Container displaying Connected Tab Images (image copy 15, 16, 17, 18) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              minHeight: '440px',
              backgroundColor: '#111111',
              borderRadius: '0px',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* 4 Connected Tab Images with Smooth Layered Crossfade */}
            {CONNECTED_TAB_IMAGES.map((img, idx) => {
              const isActive = activeConnectedTab === idx;
              return (
                <picture key={idx}>
                  <source srcSet={img.webp} type="image/webp" />
                  <source srcSet={img.jpg} type="image/jpeg" />
                  <img
                    src={img.pngFallback}
                    alt={img.alt}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  />
                </picture>
              );
            })}

          </div>

          {/* Bottom 4 Horizontal Interactive Navigation Tabs (Exact layout from Image 2) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginTop: '28px',
            }}
          >
            {[
              {
                title: 'Field Testing Telemetry',
                desc: 'Zero transcription loss from digital Schmidt hammers and UPV transducers.',
              },
              {
                title: '3D Spatial BIM Binding',
                desc: 'Binds every core break and sensor node directly to IFC model coordinates.',
              },
              {
                title: 'Deterministic Governance',
                desc: 'Automates IS 456, IS 13311 & MoRTH compliance gating with cryptographic seals.',
              },
              {
                title: 'Concession Digital Twin',
                desc: 'Preserves complete 50-year as-built and historical health records.',
              },
            ].map((tab, tIdx) => {
              const isSelected = activeConnectedTab === tIdx;
              return (
                <div
                  key={tIdx}
                  onClick={() => setActiveConnectedTab(tIdx)}
                  className={`ox1-selectable-tab ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    backgroundColor: isSelected ? '#eeeeee' : 'transparent',
                    border: 'none',
                    borderRadius: '0px',
                    padding: '20px 22px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#111111', borderRadius: '0px' }} />
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111111' }}>
                      {tab.title}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#6a7282', lineHeight: 1.55, margin: 0 }}>
                    {tab.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 05: INTEGRATED ARCHITECTURE ── */}
      <section
        id="architecture"
        style={{
          padding: '110px 24px',
          maxWidth: '1440px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto 60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Saans', sans-serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 600,
              color: '#111111',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Integrated Architecture
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#4a5565', lineHeight: 1.6, maxWidth: '780px', margin: '0 auto' }}>
            One environment. Every dimension of engineering. OX1 connects project management, QA/QC, NDT, BIM, monitoring, reporting, analytics, and AI across two seamlessly bound architectural layers.
          </p>
        </div>

        {/* 3-Card Visual Architecture Stage from OX1 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '72px',
          }}
        >
          {architectureModules.map((mod, idx) => {
            const isHovered = hoveredModuleIdx === idx;
            return (
              <GlowCard
                key={mod.id}
                disableHoverMotion={true}
                borderRadius={0}
                style={{
                  padding: '36px 30px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '520px',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#f4f3ec',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                }}
                onMouseEnter={() => setHoveredModuleIdx(idx)}
                onMouseLeave={() => setHoveredModuleIdx(null)}
              >
                {/* Header & Content */}
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <h3
                    style={{
                      fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: '1.5rem',
                      color: '#111111',
                      marginBottom: '10px',
                      lineHeight: 1.25,
                    }}
                  >
                    {mod.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: '#4a5565',
                      margin: 0,
                    }}
                  >
                    {mod.description}
                  </p>
                </div>

                {/* Visual Stage: Mascot Behind + Laptop in Front with Interactive Hover */}
                <div
                  style={{
                    position: 'relative',
                    height: '240px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2rem',
                    overflow: 'visible',
                  }}
                >
                  {(() => {
                    const curLaptopScale = isMobile ? mod.laptopScaleMobile : mod.laptopScale;
                    const curLaptopX = isMobile ? mod.laptopXMobile : mod.laptopX;
                    const curLaptopY = isMobile ? mod.laptopYMobile : mod.laptopY;

                    const curMascotScale = isMobile ? mod.mascotScaleMobile : mod.mascotScale;
                    const curMascotX = isMobile ? mod.mascotXMobile : mod.mascotX;
                    const curMascotY = isMobile ? mod.mascotYMobile : mod.mascotY;
                    const curMascotRotate = isMobile ? mod.mascotRotateMobile : mod.mascotRotate;

                    const curMascotHoverScale = isMobile ? mod.mascotHoverScaleMobile : mod.mascotHoverScale;
                    const curMascotHoverX = isMobile ? mod.mascotHoverXMobile : mod.mascotHoverX;
                    const curMascotHoverY = isMobile ? mod.mascotHoverYMobile : mod.mascotHoverY;
                    const curMascotHoverRotate = isMobile ? mod.mascotHoverRotateMobile : mod.mascotHoverRotate;

                    return (
                      <>
                        {/* Mascot with Dynamic Hover Peek */}
                        <img
                          src={mod.mascot}
                          alt={mod.title + ' Mascot'}
                          loading="eager"
                          style={{
                            position: 'absolute',
                            top: '-15px',
                            width: '130px',
                            height: 'auto',
                            objectFit: 'contain',
                            transform: isHovered
                              ? `translate(${curMascotHoverX}px, ${curMascotHoverY}px) scale(${curMascotHoverScale}) rotate(${curMascotHoverRotate}deg)`
                              : `translate(${curMascotX}px, ${curMascotY}px) scale(${curMascotScale}) rotate(${curMascotRotate}deg)`,
                            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            zIndex: 1,
                            pointerEvents: 'none',
                          }}
                        />

                        {/* Laptop Screen */}
                        <img
                          src={mod.laptop}
                          alt={mod.title}
                          loading="eager"
                          style={{
                            position: 'relative',
                            zIndex: 2,
                            width: '100%',
                            maxWidth: '300px',
                            height: 'auto',
                            objectFit: 'contain',
                            transform: `translate(${curLaptopX}px, ${curLaptopY}px) scale(${curLaptopScale})`,
                            pointerEvents: 'none',
                          }}
                        />
                      </>
                    );
                  })()}
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* Two-Tier Architectural Breakdown Controls */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>

          {/* Fin.ai Style Layer Switcher */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#f4f3ec',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '4px',
              marginTop: '28px',
              borderRadius: '9999px',
            }}
          >
            <button
              onClick={() => setActiveLayer('proj')}
              style={{
                padding: '10px 24px',
                border: 'none',
                backgroundColor: activeLayer === 'proj' ? '#111111' : 'transparent',
                color: activeLayer === 'proj' ? '#ffffff' : '#6a7282',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
              }}
            >
              Project Layer (Execution)
            </button>
            <button
              onClick={() => setActiveLayer('org')}
              style={{
                padding: '10px 24px',
                border: 'none',
                backgroundColor: activeLayer === 'org' ? '#111111' : 'transparent',
                color: activeLayer === 'org' ? '#ffffff' : '#6a7282',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
              }}
            >
              Organization Layer (Governance)
            </button>
          </div>
        </div>

        {/* Clean Fin.ai Style Layer Showcase */}
        {activeLayer === 'proj' ? (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#111111', margin: '0 0 10px', textAlign: 'center' }}>
                The Project Layer
              </h3>
              <div style={{ fontSize: '0.925rem', color: '#4a5565', lineHeight: 1.6, textAlign: 'center' }}>
                Executes deterministic site workflows, in-situ testing verification, BIM spatial mapping, sensor telemetry, and automated compliance auditing.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Project Management', desc: 'WBS chainages, task schedules, milestone hold-points, and contractor progress tracking.' },
                { title: 'Quality Assurance', desc: 'Pre-pour Inspection and Test Plans (ITP), method statements, and codified acceptance criteria.' },
                { title: 'Quality Control', desc: 'Batch plant inspection, pour cards, cube testing synchronization, and NCR/CAPA workflows.' },
                { title: 'Testing & Inspection', desc: 'UPV, SonReb, GPR, and Impact-Echo data capture with automated multi-model consensus.' },
                { title: 'BIM & Digital Modelling', desc: 'Open IFC 2x3/4 viewer, 2D drawing management, and spatial binding to testing locations.' },
                { title: 'Monitoring & Telemetry', desc: 'Live strain, tilt, vibration, and deflection sensor streams with automatic threshold alerts.' },
                { title: 'AI & Intelligence', desc: 'Context-aware compliance verification, tender analysis, and maturity forecasting.' },
                { title: 'Reports & Documentation', desc: 'Cryptographically geostamped PDF compliance dossiers, test certificates, and client audit exports.' },
              ].map((item, idx) => (
                <div key={idx} style={{ ...cardStyle, padding: '28px 24px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111111', margin: '0 0 10px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#4a5565', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#111111', margin: '0 0 10px', textAlign: 'center' }}>
                The Organization Layer
              </h3>
              <div style={{ fontSize: '0.925rem', color: '#4a5565', lineHeight: 1.6, textAlign: 'center' }}>
                Supervises portfolio-wide performance, manages multi-tier access control, tracks testing hardware calibration, and enforces cross-project engineering governance.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Organization Management', desc: 'Multi-entity corporate hierarchies, subsidiary divisions, regional directorates, and portfolio governance.' },
                { title: 'User & Access Management', desc: 'Zero Trust role-based access control (Admin, Manager, Field Engineer, TPQM Auditor, Client Observer).' },
                { title: 'Teams & Collaboration', desc: 'Cross-functional coordination connecting concessionaire leadership, engineering consultants, and testing labs.' },
                { title: 'Device Management', desc: 'Enterprise registry for NDT probes, BLE sensors, calibration expiration alerts, and geofencing validation.' },
                { title: 'Organization Analytics', desc: 'Cross-corridor quality benchmarks, contractor pass-rate rankings, and systemic supplier variance detection.' },
                { title: 'Administration & Settings', desc: 'Global codal standard rules (IS/IRC/MoRTH/ASTM), compliance templates, and cryptographic key management.' },
              ].map((item, idx) => (
                <div key={idx} style={{ ...cardStyle, padding: '32px 28px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111111', margin: '0 0 12px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#4a5565', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── SECTION 06: CORE CAPABILITIES (UNIFIED CARD STYLING & STANDARDIZED FONT/COLORS) ── */}
      <section
        id="capabilities"
        style={{
          padding: '110px 24px',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ maxWidth: '820px', margin: '0 auto 72px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '16px',
              }}
            >
              Everything your engineering ecosystem needs.
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4a5565', lineHeight: 1.6 }}>
              Ten specialized modules united under one deterministic operating environment.
            </p>
          </div>

          {/* Sticky Sidebar + Expanded Selected Module Container */}
          {(() => {
            const currentMod = CORE_MODULES.find((m) => m.id === activeModuleId) || CORE_MODULES[0];
            const currentImage = MODULE_IMAGES[currentMod.id] || '/assets/images/buildings/building-1.webp';

            return (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'minmax(280px, 330px) 1fr',
                  gap: isMobile ? '36px' : '64px',
                  position: 'relative',
                }}
              >
                {/* Left Column Track: Stretches full height of right side content */}
                <div
                  style={{
                    position: 'relative',
                    height: isMobile ? 'auto' : '100%',
                  }}
                >
                  {/* Sticky Left Sidebar: Stays fixed until the user scrolls till the end of the right side part */}
                  <div
                    style={{
                      position: isMobile ? 'relative' : 'sticky',
                      top: isMobile ? '0' : '100px',
                      zIndex: 10,
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: isMobile ? 'row' : 'column',
                      gap: isMobile ? '8px' : '6px',
                      overflowX: isMobile ? 'auto' : 'visible',
                      whiteSpace: isMobile ? 'nowrap' : 'normal',
                      padding: isMobile ? '8px 0' : '0',
                      maxHeight: isMobile ? 'none' : 'calc(100vh - 120px)',
                      overflowY: isMobile ? 'visible' : 'auto',
                    }}
                  >
                    {CORE_MODULES.map((m) => {
                      const isSelected = activeModuleId === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => handleSelectModule(m.id)}
                          style={{
                            width: isMobile ? 'auto' : '100%',
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                            textAlign: 'left',
                            padding: '13px 18px',
                            border: 'none',
                            borderRadius: '0px',
                            backgroundColor: isSelected ? '#111111' : 'transparent',
                            color: isSelected ? '#ffffff' : '#4a5565',
                            fontWeight: isSelected ? 600 : 500,
                            fontSize: '0.925rem',
                            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.18s ease',
                          }}
                        >
                          <span>
                            {m.number}. {m.title}
                          </span>
                          {isSelected && (
                            <ArrowRight size={15} color="#ffffff" style={{ flexShrink: 0, marginLeft: '10px' }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Rich Expanded Selected Module Content (Image on Top without Box, Substantial Content Below, Matching Card Styles) */}
                <div
                  key={currentMod.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                  }}
                >
                  {/* Top Image: Presented with digital engineering ASCII effect layer */}
                  <div style={{ width: '100%', overflow: 'hidden' }}>
                    <AsciiImageLayer
                      src={currentImage}
                      alt={currentMod.title}
                      badge={`OX1 // MODULE ${currentMod.number}`}
                      tag={currentMod.title.toUpperCase()}
                      aspectRatio="16 / 9"
                      style={{ maxHeight: '480px' }}
                    />
                  </div>

                  {/* Header: Title, Value Proposition & Comprehensive Overview */}
                  <div>
                    <h3
                      style={{
                        fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                        fontWeight: 600,
                        color: '#111111',
                        margin: '0 0 12px',
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {currentMod.number}. {currentMod.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        color: '#111111',
                        lineHeight: 1.5,
                        marginBottom: '18px',
                      }}
                    >
                      {currentMod.tagline}
                    </p>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: '#4a5565',
                        lineHeight: 1.7,
                        marginBottom: '14px',
                      }}
                    >
                      {currentMod.overview}
                    </p>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#4a5565',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {currentMod.operationalImpact}
                    </p>
                  </div>

                  {/* Operational Metrics Cards (Exact same color & border as other cards on the page) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px',
                    }}
                  >
                    {currentMod.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        style={{
                          ...cardStyle,
                          padding: '24px 22px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '1.9rem',
                            fontWeight: 700,
                            color: '#111111',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            marginBottom: '6px',
                            fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {metric.value}
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111111', marginBottom: '4px' }}>
                          {metric.label}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: '#6a7282', lineHeight: 1.5 }}>
                          {metric.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Core Capabilities Breakdown (6-8 In-Depth Points) */}
                  <div>
                    <h4
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: '#111111',
                        marginBottom: '20px',
                        letterSpacing: '-0.02em',
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      }}
                    >
                      Core Engineering Capabilities
                    </h4>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                        gap: '20px 28px',
                      }}
                    >
                      {currentMod.capabilitiesDetailed.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                          }}
                        >
                          <Check
                            size={18}
                            color="#111111"
                            strokeWidth={2.4}
                            style={{ flexShrink: 0, marginTop: '3px' }}
                          />
                          <div>
                            <div
                              style={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: '#111111',
                                marginBottom: '4px',
                                lineHeight: 1.4,
                              }}
                            >
                              {cap.title}
                            </div>
                            <div
                              style={{
                                fontSize: '0.875rem',
                                color: '#4a5565',
                                lineHeight: 1.6,
                              }}
                            >
                              {cap.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Codified Standards & Technical Governance (Cards with same color and border as other cards) */}
                  <div>
                    <h4
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: '#111111',
                        marginBottom: '20px',
                        letterSpacing: '-0.02em',
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      }}
                    >
                      Codified Standards & Technical Governance
                    </h4>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                        gap: '20px',
                      }}
                    >
                      {currentMod.standards.map((std, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            ...cardStyle,
                            padding: '24px 22px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              color: '#6a7282',
                              marginBottom: '6px',
                              fontFamily: 'var(--ic-font-sans)',
                            }}
                          >
                            {std.title}
                          </div>
                          <div
                            style={{
                              fontSize: '0.9rem',
                              color: '#111111',
                              fontWeight: 500,
                              lineHeight: 1.55,
                            }}
                          >
                            {std.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Execution Workflow (Cards with same color and border as other cards) */}
                  <div>
                    <h4
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: '#111111',
                        marginBottom: '20px',
                        letterSpacing: '-0.02em',
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      }}
                    >
                      Operational Execution Pipeline
                    </h4>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '20px',
                      }}
                    >
                      {currentMod.workflow.map((wf, wIdx) => (
                        <div
                          key={wIdx}
                          style={{
                            ...cardStyle,
                            padding: '24px 20px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              fontFamily: 'var(--ic-font-sans)',
                              color: '#111111',
                              marginBottom: '8px',
                              letterSpacing: '0.06em',
                            }}
                          >
                            STEP {wf.step}
                          </div>
                          <div
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              color: '#111111',
                              marginBottom: '6px',
                            }}
                          >
                            {wf.title}
                          </div>
                          <div
                            style={{
                              fontSize: '0.825rem',
                              color: '#4a5565',
                              lineHeight: 1.55,
                            }}
                          >
                            {wf.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Links (Clean spacing, matching typography) */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '24px',
                      paddingTop: '8px',
                    }}
                  >
                    <Link
                      to="/demo"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        backgroundColor: '#111111',
                        padding: '12px 24px',
                        borderRadius: '0px',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      Simulate {currentMod.title} Workflow <ArrowRight size={15} />
                    </Link>
                    <Link
                      to="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#111111',
                        textDecoration: 'none',
                      }}
                    >
                      Request Technical Specification & Codal Mapping →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── SECTION 07: CONNECTED PROJECT LIFECYCLE ── */}
      <section
        id="lifecycle"
        style={{
          padding: '110px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ maxWidth: '840px', margin: '0 auto 64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', sans-serif",
                fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '16px',
              }}
            >
              Connected intelligence across the entire infrastructure lifecycle.
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4a5565', lineHeight: 1.6 }}>
              From greenfield ground investigation to 50-year concession maintenance.
            </p>
          </div>

          {/* Master-Detail Split Layout: Left Titles Only (Grey when selected, no stroke), Right Content & Visual */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'minmax(260px, 310px) 1fr',
              gap: isMobile ? '32px' : '48px',
              position: 'relative',
            }}
          >
            {/* Left Column Track: Stretches full height of right side content */}
            <div
              style={{
                position: 'relative',
                height: isMobile ? 'auto' : '100%',
              }}
            >
              {/* Left Column: Only Card Titles */}
              <div
                style={{
                  position: isMobile ? 'relative' : 'sticky',
                  top: isMobile ? '0' : '100px',
                  display: 'flex',
                  flexDirection: isMobile ? 'row' : 'column',
                  gap: '8px',
                  overflowX: isMobile ? 'auto' : 'visible',
                  paddingBottom: isMobile ? '8px' : '0',
                  maxHeight: isMobile ? 'none' : 'calc(100vh - 120px)',
                  overflowY: isMobile ? 'visible' : 'auto',
                }}
              >
                {LIFECYCLE_STAGES.map((stg, idx) => {
                  const isSelected = activeLifecycleStage === idx;
                  return (
                    <button
                      key={stg.number}
                      onClick={() => {
                        setActiveLifecycleStage(idx);
                        setLifecycleProgress(0);
                      }}
                      style={{
                        width: isMobile ? 'auto' : '100%',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                        padding: '13px 18px',
                        border: 'none',
                        borderRadius: '0px',
                        backgroundColor: isSelected ? '#111111' : 'transparent',
                        color: isSelected ? '#ffffff' : '#4a5565',
                        fontWeight: isSelected ? 600 : 500,
                        fontSize: '0.925rem',
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <span>
                        {stg.number}. {stg.title}
                      </span>
                      {isSelected && (
                        <ArrowRight size={15} color="#ffffff" style={{ flexShrink: 0, marginLeft: '10px' }} />
                      )}
                      {/* 10-second progressive line inside the active sidebar item */}
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: '2px',
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            width: `${Math.min(100, Math.max(0, lifecycleProgress * 100))}%`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Lifecycle Loop Diagram + Selected Stage Detail */}
            {(() => {
              const currentStage = LIFECYCLE_STAGES[activeLifecycleStage] || LIFECYCLE_STAGES[0];
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Visual Lifecycle Racetrack Loop (No separate card box, fully visible viewBox) */}
                  <div
                    style={{
                      width: '100%',
                      overflowX: 'auto',
                      textAlign: 'center',
                      padding: '8px 0 16px',
                    }}
                  >
                    <svg
                      viewBox="0 0 1080 340"
                      style={{ width: '100%', maxWidth: '1080px', height: 'auto', display: 'block', margin: '0 auto' }}
                    >
                      <defs>
                        <marker
                          id="lifecycleArrow"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1 L 8 5 L 0 9 z" fill="#111111" />
                        </marker>
                      </defs>

                      {/* Continuous Racetrack Base Loop Path */}
                      <path
                        d="M 360 80 L 800 80 A 90 90 0 0 1 800 260 L 320 260 A 90 90 0 0 1 320 80 Z"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* All previously completed segments remain solidly connected in order */}
                      {LIFECYCLE_SEGMENT_PATHS.map((segPath, pIdx) => {
                        if (pIdx < activeLifecycleStage) {
                          return (
                            <path
                              key={`completed-${pIdx}`}
                              d={segPath}
                              fill="none"
                              stroke="#111111"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                            />
                          );
                        }
                        return null;
                      })}

                      {/* Currently active segment drawing forward in order from current node to next node */}
                      <path
                        key={`active-${activeLifecycleStage}`}
                        d={LIFECYCLE_SEGMENT_PATHS[activeLifecycleStage]}
                        fill="none"
                        stroke="#111111"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray={`${SEGMENT_LENGTHS[activeLifecycleStage]} ${SEGMENT_LENGTHS[activeLifecycleStage]}`}
                        strokeDashoffset={SEGMENT_LENGTHS[activeLifecycleStage] * (1 - lifecycleProgress)}
                      />

                      {/* Upward Curving Arrow to Outcome Badge */}
                      <path
                        d="M 230 155 C 190 120 125 110 115 75"
                        fill="none"
                        stroke="#111111"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        markerEnd="url(#lifecycleArrow)"
                      />

                      {/* Pointed Outcome Badge (Well clear of Node 01) */}
                      <polygon
                        points="40,24 190,24 210,44 190,64 40,64"
                        fill="#ffffff"
                        stroke="#111111"
                        strokeWidth="2"
                      />
                      <text
                        x="115"
                        y="49"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="#111111"
                        fontFamily="'Saans', sans-serif"
                      >
                        Asset Outcome
                      </text>

                      {/* Dotted Connection from Outcome Badge to Stage 01 */}
                      <line
                        x1="210"
                        y1="44"
                        x2="360"
                        y2="80"
                        stroke="#111111"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Center Narrative Headline (Without subtext) */}
                      <text
                        x="560"
                        y="178"
                        textAnchor="middle"
                        fontSize="22"
                        fontWeight="700"
                        fill="#111111"
                        fontFamily="'Saans', -apple-system, BlinkMacSystemFont, sans-serif"
                        letterSpacing="-0.02em"
                      >
                        The Infrastructure Life Cycle
                      </text>

                      {/* 8 Interactive Loop Nodes (No dashed circle, connected in order) */}
                      {LIFECYCLE_STAGES.map((stg, sIdx) => {
                        const isCurrentActive = activeLifecycleStage === sIdx;
                        const isCompleted = sIdx < activeLifecycleStage;
                        return (
                          <g
                            key={stg.number}
                            onClick={() => {
                              setActiveLifecycleStage(sIdx);
                              setLifecycleProgress(0);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {/* Node Circle */}
                            <circle
                              cx={stg.x}
                              cy={stg.y}
                              r={isCurrentActive ? '22' : '19'}
                              fill={isCurrentActive || isCompleted ? '#111111' : '#ffffff'}
                              stroke="#111111"
                              strokeWidth={isCurrentActive ? '2.5' : '1.8'}
                              style={{ transition: 'all 0.2s ease' }}
                            />

                            {/* Node Inner Label / Number */}
                            <text
                              x={stg.x}
                              y={stg.y + 4}
                              textAnchor="middle"
                              fontSize={isCurrentActive ? '12' : '11'}
                              fontWeight="700"
                              fill={isCurrentActive || isCompleted ? '#ffffff' : '#111111'}
                              fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            >
                              {stg.number}
                            </text>

                            {/* Stage Title Label outside node (Fully spaced, no cut-offs) */}
                            <text
                              x={
                                stg.labelPos === 'right'
                                  ? stg.x + 28
                                  : stg.labelPos === 'left'
                                    ? stg.x - 28
                                    : stg.x
                              }
                              y={
                                stg.labelPos === 'top'
                                  ? stg.y - 30
                                  : stg.labelPos === 'bottom'
                                    ? stg.y + 36
                                    : stg.y + 4
                              }
                              textAnchor={
                                stg.labelPos === 'right'
                                  ? 'start'
                                  : stg.labelPos === 'left'
                                    ? 'end'
                                    : 'middle'
                              }
                              fontSize="12.5"
                              fontWeight={isCurrentActive ? '700' : '600'}
                              fill="#111111"
                              fontFamily="'Saans', sans-serif"
                            >
                              {stg.title}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Selected Stage Detail Content (Clean typography, no box, no tags) */}
                  <div style={{ paddingTop: '8px' }}>
                    {/* Header */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                        fontWeight: 600,
                        color: '#111111',
                        margin: '0 0 14px 0',
                        letterSpacing: '-0.02em',
                        fontFamily: "'Saans', sans-serif",
                      }}
                    >
                      {currentStage.number}. {currentStage.title}
                    </h3>

                    {/* Overview Narrative */}
                    <p style={{ fontSize: '1.05rem', color: '#4a5565', lineHeight: 1.65, marginBottom: '28px', maxWidth: '820px' }}>
                      {currentStage.desc}
                    </p>

                    {/* Key Workflows & Deliverables */}
                    <div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#6a7282',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginBottom: '14px',
                          fontFamily: 'var(--ic-font-sans)',
                        }}
                      >
                        KEY WORKFLOWS &amp; OPERATIONAL DELIVERABLES
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {currentStage.deliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              fontSize: '0.9375rem',
                              color: '#111111',
                              lineHeight: 1.5,
                            }}
                          >
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                backgroundColor: '#111111',
                                flexShrink: 0,
                                marginTop: '7px',
                              }}
                            />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── SECTION 09: DATA & ANALYTICS ── */}
      <section
        id="analytics"
        style={{
          padding: '110px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto 64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', sans-serif",
                fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '16px',
              }}
            >
              Every engineering record contributes to a bigger picture.
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4a5565', lineHeight: 1.6 }}>
              OX1 synthesizes millions of discrete field records into six distinct executive intelligence categories, enabling empirical risk management across multi-billion-dollar portfolios.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              {
                title: 'Project Intelligence',
                sub: 'WBS chainage velocity, curing bottlenecks & critical path forecasting.',
                kpi: '3.5 Days Saved',
                detail: 'Average formwork cycle reduction achieved via real-time concrete maturity modeling.',
              },
              {
                title: 'Quality Intelligence',
                sub: 'First-time pass rates, NCR turnaround speeds & CAPA resolution timelines.',
                kpi: '99.4% Pass Rate',
                detail: 'First-pour compliance across 15,000+ audited concrete batches in national highways.',
              },
              {
                title: 'Testing Intelligence',
                sub: 'NDT sensor calibration, multi-model correlation accuracy & acoustic tomography.',
                kpi: '< 4 Hours',
                detail: 'Same-day compliance certificate turnaround replacing 28-day water bath waits.',
              },
              {
                title: 'Structural Intelligence',
                sub: '50-year service life simulations, carbonation depths & vibration modal analysis.',
                kpi: '50-Year Twin',
                detail: 'Longitudinal durability modeling predicting reinforcement corrosion initiation.',
              },
              {
                title: 'Financial Intelligence',
                sub: 'BOQ quantity takeoffs, mix design cost variances & milestone payment gating.',
                kpi: 'Zero Unverified Pay',
                detail: 'Milestone payment disbursements strictly gated against verified physical compliance.',
              },
              {
                title: 'Organizational Intelligence',
                sub: 'Cross-corridor contractor performance, supplier reliability & regional risk benchmarks.',
                kpi: '100% Traceability',
                detail: 'Complete portfolio oversight with zero lost paper records and tamper-evident audit logs.',
              },
            ].map((cat, idx) => (
              <div
                key={idx}
                style={{
                  ...cardStyle,
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#111111', margin: '0 0 10px' }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#4a5565', lineHeight: 1.6, marginBottom: '20px' }}>
                    {cat.sub}
                  </p>
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111111', fontFamily: "'Saans', sans-serif" }}>
                    {cat.kpi}
                  </div>
                  <div style={{ fontSize: '0.78125rem', color: '#6a7282', marginTop: '4px' }}>
                    {cat.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12: BUILT FOR THE ENTIRE ENGINEERING ECOSYSTEM (6 CARDS ON LEFT, IMAGE CARD ON RIGHT) ── */}
      <section
        style={{
          padding: '110px 24px',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Top Editorial Narrative */}
          <div style={{ maxWidth: '860px', margin: '0 auto 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '24px',
              }}
            >
              Built for the entire engineering ecosystem.
            </h2>
            <p style={{ fontSize: '1.075rem', color: '#2c3540', lineHeight: 1.65, marginBottom: '16px' }}>
              From EPC casting yards and testing laboratories to concessionaire boardrooms and sovereign authority desks, OX1 unifies every organization with an active stake in infrastructure quality, safety, and 50-year longevity.
            </p>
            <p style={{ fontSize: '1.025rem', color: '#4a5565', lineHeight: 1.65, margin: 0 }}>
              By providing role-governed workspaces on one immutable ledger, OX1 eliminates adversarial contractor-authority disputes, accelerates milestone disbursements, and establishes verified engineering trust.
            </p>
          </div>

          {/* Side-by-Side Layout: 6 Cards on Left, Image Card on Right */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'minmax(320px, 420px) 1fr',
              gap: isMobile ? '32px' : '40px',
              alignItems: 'start',
            }}
          >
            {/* Left Side: 6 Interactive Stakeholder Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {[
                {
                  role: 'Construction Companies & EPCs',
                  desc: 'Cycle formwork 30% faster, eliminate contractor-authority disputes, and automate daily quality documentation.',
                },
                {
                  role: 'Infrastructure Concessionaires',
                  desc: 'Attain panoramic oversight of multi-package corridors, gate milestone payments, and preserve asset value.',
                },
                {
                  role: 'Engineering Consultants',
                  desc: 'Validate structural compliance with IS/IRC/MoRTH standards in seconds using multi-model consensus.',
                },
                {
                  role: 'NDT Labs & Testing Companies',
                  desc: 'Replace manual cube crush registers with automated telemetry sync, instant compliance reporting, and cryptographic seals.',
                },
                {
                  role: 'QA/QC & TPQM Authorities',
                  desc: 'Standardize digital ITPs, conduct geostamped mobile inspections, track NCR resolutions, and deliver audit reports same-day.',
                },
                {
                  role: 'Civil & Structural Engineers',
                  desc: 'Interrogate BIM elements, inspect live sensor strains, predict 50-year service life, and verify structural margins.',
                },
              ].map((ind, idx) => {
                const isSelected = activeEcosystemTab === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveEcosystemTab(idx)}
                    className={`ox1-selectable-tab ${isSelected ? 'is-selected' : ''}`}
                    style={{
                      backgroundColor: isSelected ? '#eeeeee' : 'transparent',
                      border: 'none',
                      borderRadius: '0px',
                      padding: '18px 20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#111111', borderRadius: '0px', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.925rem', fontWeight: 600, color: '#111111' }}>
                        {ind.role}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#6a7282', lineHeight: 1.5, margin: 0 }}>
                      {ind.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Side: Large Visual Stage / Image Card */}
            <div
              style={{
                position: isMobile ? 'relative' : 'sticky',
                top: isMobile ? '0' : '96px',
                minHeight: '520px',
                height: isMobile ? '420px' : '580px',
                backgroundColor: '#111111',
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* 6 Ecosystem Tab Images with Smooth Layered Crossfade */}
              {ECOSYSTEM_TAB_IMAGES.map((img, idx) => {
                const isActive = activeEcosystemTab === idx;
                return (
                  <picture key={idx}>
                    <source srcSet={img.webp} type="image/webp" />
                    <img
                      src={img.pngFallback}
                      alt={img.alt}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: 1,
                        pointerEvents: 'none',
                      }}
                    />
                  </picture>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: WHY OX1 ── */}
      <section
        style={{
          padding: '140px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto 64px', textAlign: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', sans-serif",
                fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                marginBottom: '18px',
              }}
            >
              More than connected software. A connected intelligence ecosystem.
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#4a5565', lineHeight: 1.65 }}>
              Why India and Asia’s premier infrastructure concessionaires and structural consultants deploy OX1 over generic software.
            </p>
          </div>

          {/* Infographic Presentation Mode: Desktop Interactive SVG with Concentric Rings & Curves (like uploaded reference) / Mobile Accessible Layout */}
          {!isMobile ? (
            <div style={{ width: '100%', overflowX: 'auto', padding: '24px 0' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  minWidth: '1020px',
                  maxWidth: '1380px',
                  margin: '0 auto',
                  aspectRatio: '1260 / 720',
                }}
              >
                {/* SVG Infographic Layer */}
                <svg
                  viewBox="0 0 1260 720"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                >
                  <defs>
                    <filter id="hubShadow" x="-25%" y="-25%" width="150%" height="150%">
                      <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000000" floodOpacity="0.06" />
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.04" />
                    </filter>
                    <filter id="satShadow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.06" />
                      <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.04" />
                    </filter>
                    <style>{`
                      @keyframes ox1ChargingStream {
                        from {
                          stroke-dashoffset: 0;
                        }
                        to {
                          stroke-dashoffset: -40;
                        }
                      }
                      @keyframes ox1CenterDiscCharging {
                        0% {
                          stroke: rgba(0, 0, 0, 0.12);
                          stroke-width: 1.5px;
                        }
                        70% {
                          stroke: rgba(0, 0, 0, 0.22);
                          stroke-width: 1.8px;
                        }
                        75% {
                          stroke: rgba(0, 0, 0, 0.38);
                          stroke-width: 2.2px;
                        }
                        100% {
                          stroke: rgba(0, 0, 0, 0.12);
                          stroke-width: 1.5px;
                        }
                      }
                      .ox1-charging-wire {
                        animation: ox1ChargingStream 1.5s linear infinite;
                      }
                      .ox1-wire-stopped {
                        animation: none !important;
                        stroke-dasharray: none !important;
                      }
                      .ox1-hub-disc {
                        animation: ox1CenterDiscCharging 1.5s ease-in-out infinite;
                      }
                    `}</style>
                  </defs>

                  {/* S-Curved Connecting Lines from Center to Satellites */}
                  {ECOSYSTEM_INFOGRAPHIC_ITEMS.map((item) => {
                    const isHovered = hoveredEcosystemNode === item.id;
                    const isSelected = selectedEcosystemNode === item.id;
                    const isNodeActive = isHovered || isSelected;

                    return (
                      <g
                        key={`connector-${item.id}`}
                        onClick={() => setSelectedEcosystemNode((prev) => (prev === item.id ? null : item.id))}
                        onMouseEnter={() => setHoveredEcosystemNode(item.id)}
                        onMouseLeave={() => setHoveredEcosystemNode(null)}
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                      >
                        {/* Base faint guide track */}
                        <path
                          d={item.curve}
                          fill="none"
                          stroke={isNodeActive ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.12)'}
                          strokeWidth={isNodeActive ? 2.4 : 1.5}
                          strokeLinecap="round"
                        />

                        {/* Charging stream: flows into center hub, STOPS when hovered or selected */}
                        <path
                          d={item.curve}
                          fill="none"
                          stroke={isNodeActive ? '#000000' : 'rgba(15, 23, 42, 0.85)'}
                          strokeWidth={isNodeActive ? 3.2 : 2.2}
                          strokeDasharray={isNodeActive ? 'none' : '14 26'}
                          strokeLinecap="round"
                          className={isNodeActive ? 'ox1-wire-stopped' : 'ox1-charging-wire'}
                          style={{
                            animationPlayState: isNodeActive ? 'paused' : 'running',
                            transition: 'stroke 0.2s, stroke-width 0.2s',
                          }}
                        />

                        {/* Satellite Anchor Dot */}
                        <circle
                          cx={item.startDot.x}
                          cy={item.startDot.y}
                          r={isNodeActive ? 5.5 : 3.5}
                          fill={isNodeActive ? '#000000' : 'rgba(15, 23, 42, 0.7)'}
                          style={{ transition: 'all 0.2s ease' }}
                        />

                        {/* Center Hub Anchor Dot */}
                        <circle
                          cx={item.endDot.x}
                          cy={item.endDot.y}
                          r={isNodeActive ? 5.5 : 3.5}
                          fill={isNodeActive ? '#000000' : 'rgba(15, 23, 42, 0.7)'}
                          style={{ transition: 'all 0.2s ease' }}
                        />
                      </g>
                    );
                  })}

                  {/* Central Hub Disc - OMNI EXTELLIGENCE ECOSYSTEM (No thin outer circles, OMNI and EXTELLIGENCE in same font) */}
                  <g style={{ pointerEvents: 'auto', cursor: 'default' }}>
                    <circle
                      cx="630"
                      cy="360"
                      r="96"
                      fill="#ffffff"
                      stroke="rgba(0, 0, 0, 0.12)"
                      strokeWidth="1.5"
                      className="ox1-hub-disc"
                      filter="url(#hubShadow)"
                    />

                    {/* Center Text: OMNI and EXTELLIGENCE in same font and size */}
                    <text
                      x="630"
                      y="338"
                      textAnchor="middle"
                      fontSize="17"
                      fontWeight="700"
                      letterSpacing="0.04em"
                      fill="#111111"
                      fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    >
                      OMNI
                    </text>
                    <text
                      x="630"
                      y="364"
                      textAnchor="middle"
                      fontSize="17"
                      fontWeight="700"
                      letterSpacing="-0.015em"
                      fill="#111111"
                      fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    >
                      EXTELLIGENCE
                    </text>
                    <text
                      x="630"
                      y="388"
                      textAnchor="middle"
                      fontSize="12.5"
                      fontWeight="600"
                      letterSpacing="0.12em"
                      fill="#64748b"
                      fontFamily="'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    >
                      ECOSYSTEM
                    </text>
                  </g>

                  {/* 8 Satellite Circles & Text Blocks (No thin outer circles) */}
                  {ECOSYSTEM_INFOGRAPHIC_ITEMS.map((item) => {
                    const isHovered = hoveredEcosystemNode === item.id;
                    const isSelected = selectedEcosystemNode === item.id;
                    const isNodeActive = isHovered || isSelected;
                    const Icon = item.icon;

                    return (
                      <g
                        key={`sat-${item.id}`}
                        onClick={() => setSelectedEcosystemNode((prev) => (prev === item.id ? null : item.id))}
                        onMouseEnter={() => setHoveredEcosystemNode(item.id)}
                        onMouseLeave={() => setHoveredEcosystemNode(null)}
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                      >
                        {/* Single clean solid satellite disc (no thin out circles) */}
                        <circle
                          cx={item.cx}
                          cy={item.cy}
                          r="38"
                          fill={isNodeActive ? '#111111' : '#ffffff'}
                          stroke={isNodeActive ? '#000000' : 'rgba(0, 0, 0, 0.12)'}
                          strokeWidth="1.5"
                          filter="url(#satShadow)"
                          style={{ transition: 'all 0.22s ease' }}
                        />

                        {/* Icon inside Satellite Circle */}
                        <foreignObject x={item.cx - 13} y={item.cy - 13} width="26" height="26">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                            <Icon
                              size={22}
                              color={isNodeActive ? '#ffffff' : '#111111'}
                              strokeWidth={1.8}
                              style={{ transition: 'all 0.22s ease' }}
                            />
                          </div>
                        </foreignObject>

                        {/* Text Block Next to Satellite Circle - Guaranteed Zero Overlap */}
                        <foreignObject x={item.textX} y={item.textY} width={item.textW} height="110" style={{ overflow: 'visible' }}>
                          <div style={{ textAlign: item.side === 'left' ? 'right' : 'left', userSelect: 'none' }}>
                            <div
                              style={{
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                color: isNodeActive ? '#111111' : '#1e293b',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                fontFamily: "'Saans', sans-serif",
                                marginBottom: '5px',
                                transition: 'color 0.2s ease',
                                lineHeight: 1.25,
                              }}
                            >
                              {item.title}
                            </div>
                            <div
                              style={{
                                fontSize: '0.8rem',
                                color: '#4a5565',
                                lineHeight: 1.45,
                                fontFamily: "'Saans', sans-serif",
                              }}
                            >
                              {item.desc}
                            </div>
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          ) : (
            /* Mobile-Responsive Card Stack */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Central Hub Mobile Badge */}
              <div
                style={{
                  ...cardStyle,
                  padding: '24px',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '0px',
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', fontFamily: "'Saans', sans-serif", margin: '4px 0' }}>
                  OMNI EXTELLIGENCE
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', color: '#64748b', fontFamily: "'Saans', sans-serif", marginBottom: '8px' }}>
                  ECOSYSTEM
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#4a5565' }}>
                  Eight mission-critical dimensions unified under deterministic engineering governance.
                </div>
              </div>

              {/* 8 Satellite Items on Mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                {ECOSYSTEM_INFOGRAPHIC_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      style={{
                        ...cardStyle,
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        borderRadius: '0px',
                      }}
                    >
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          border: '2px solid rgba(0, 0, 0, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <Icon size={22} color="#111111" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.03em', fontFamily: "'Saans', sans-serif", marginBottom: '4px' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#4a5565', lineHeight: 1.5, fontFamily: "'Saans', sans-serif" }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 14: FAQ (ALL 13 QUESTIONS IN FIN.AI ACCORDIONS) ── */}
      <section
        id="faq"
        style={{
          padding: '80px 16px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', sans-serif",
                fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '14px',
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#4a5565' }}>
              Comprehensive answers regarding the architecture, capabilities, and deployment of Omni eXtelligence 1.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    ...cardStyle,
                    overflow: 'hidden',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 28px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Saans', sans-serif",
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: '#111111',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      color="#6a7282"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                        marginLeft: '16px',
                      }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                      >
                        <div
                          style={{
                            padding: '0 28px 24px',
                            fontSize: '0.9375rem',
                            color: '#4a5565',
                            lineHeight: 1.7,
                            borderTop: '1px solid rgba(0, 0, 0, 0.04)',
                            paddingTop: '16px',
                          }}
                        >
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 15: FINAL CTA BANNER ── */}
      <section
        style={{
          padding: '80px 24px 100px',
          backgroundColor: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div
            className="ox1-cta-card why-cta-card"
            style={{
              position: 'relative',
              borderRadius: '0px',
              overflow: 'hidden',
              backgroundImage: 'url(/assets/images/why-choose-cta-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '88px 40px',
              textAlign: 'center',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
            }}
          >
            <h2
              className="ox1-cta-headline why-cta-headline"
              style={{
                textAlign: 'center',
                fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 600,
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                WebkitTextStroke: '0px transparent',
                WebkitTextStrokeWidth: '0px',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                maxWidth: '920px',
                margin: '0 auto 20px',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.9), 0 4px 35px rgba(0, 0, 0, 0.85)',
              }}
            >
              <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', WebkitTextStroke: '0px transparent', WebkitTextStrokeWidth: '0px' }}>
                Build with intelligence. Deliver with confidence.
              </span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                color: '#ffffff',
                maxWidth: '720px',
                margin: '0 auto 40px',
                lineHeight: 1.6,
                fontWeight: 400,
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
              }}
            >
              Bring engineering, quality, testing, BIM, monitoring, and intelligence together with OX1.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="#overview"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#111111',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  padding: '14px 32px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
                }}
              >
                Explore OX1 Platform <ArrowRight size={16} />
              </a>
              <Link
                to="/demo"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  padding: '14px 32px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  textDecoration: 'none',
                }}
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OX1Platform;
