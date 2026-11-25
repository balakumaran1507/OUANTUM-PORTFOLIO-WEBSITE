import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
} from 'lucide-react';
import useSEO from '../../hooks/useSEO';

export interface SolutionData {
  id: string;
  slug: string;
  badge: string;
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  image: string;
  imageAlt: string;
  painHeading: string;
  painPoints: { title: string; description: string }[];
  solutionHeading: string;
  solutionSummary: string;
  solutionHighlights: { title: string; description: string }[];
  impactMetrics: { label: string; value: string; detail: string }[];
  codalStandard: string;
  codalClauses: { code: string; title: string; explanation: string }[];
  technicalSpecs: { label: string; value: string }[];
  deliverables: string[];
  workflowSteps: { step: string; title: string; description: string }[];
  caseStudy: {
    clientType: string;
    projectScope: string;
    location: string;
    challenge: string;
    result: string;
    quote: string;
    author: string;
  };
  comparison: {
    aspect: string;
    traditional: string;
    ouantum: string;
  }[];
  faq: { q: string; a: string }[];
}

export const SOLUTIONS_MAP: Record<string, SolutionData> = {
  'curing-delays': {
    id: 'curing-delays',
    slug: 'curing-delays',
    badge: 'SCHEDULE ACCELERATION',
    title: '28-Day Curing Bottlenecks & Shuttering Lockups',
    heroHeadline: 'Safely Strip Formwork in 3 to 5 Days with In-Situ Concrete Maturity Tracking',
    heroSubheadline:
      'Eliminate arbitrary 28-day water-bath cube wait times. Predict real-time compressive strength evolution under ASTM C1074 and IS 456 Clause 11.3 to accelerate precast casting cycles by up to 30%.',
    image: '/assets/images/buildings/building-3.png',
    imageAlt: 'Modern concrete architectural pavilion validated with live in-situ maturity telemetry',
    painHeading: 'The Traditional 28-Day Construction Deadlock',
    painPoints: [
      {
        title: 'Formwork Rental Capital Drain',
        description:
          'Shuttering materials, falsework, and launching gantries sit tied up for weeks awaiting 14-day or 28-day laboratory cube test reports, burning hundreds of thousands in monthly rental overhead.',
      },
      {
        title: 'Unrepresentative Water-Bath Testing',
        description:
          'Small 150mm laboratory cubes cured in 27°C water baths fail to reflect the true hydration temperatures, mass heat dissipation, and microclimate of massive 2-meter in-situ bridge piers or tunnel linings.',
      },
      {
        title: 'Precast Casting Yard Saturation',
        description:
          'Segmental casting yards cannot de-tension prestressing cables or demould precast segments until target strength is certified, creating acute inventory storage and production line paralysis.',
      },
    ],
    solutionHeading: 'How OUANTUM Solves Curing Bottlenecks',
    solutionSummary:
      'OUANTUM synthesizes embedded maturity telemetry with SonReb acoustic calibration. By continuous logging of in-situ temperature-time factor (TTF) and Arrhenius equivalent age, our deterministic algorithms calculate the exact hour in-situ concrete crosses the 15–20 MPa stripping threshold.',
    solutionHighlights: [
      {
        title: 'In-Situ Maturity Tracking',
        description: 'Continuously logs core and surface temperature gradients to model hydration kinetics under ASTM C1074.',
      },
      {
        title: 'Early 72-Hour Stripping Certificate',
        description: 'Generates automated statutory formwork striking certificates as soon as structural threshold is met.',
      },
      {
        title: 'Quarry Aggregate Calibration',
        description: 'Calibrates maturity curves specifically against the project’s cement hydration profile and batch mix.',
      },
    ],
    impactMetrics: [
      { label: 'Formwork Cycle Reduction', value: '3.5 Days', detail: 'Per deck pour across major bridge spans' },
      { label: 'Rental Cost Savings', value: '22%', detail: 'Direct falsework & staging equipment recovery' },
      { label: 'Safety Confidence', value: '99.8%', detail: 'Empirical maturity verification vs. ASTM C1074' },
      { label: 'Precast Yard Throughput', value: '+30%', detail: 'Segment demoulding and tendon tensioning cycle' },
    ],
    codalStandard: 'IS 456:2000 Clause 11.3 & ASTM C1074 Maturity Standard',
    codalClauses: [
      {
        code: 'IS 456:2000 Cl. 11.3',
        title: 'Stripping Time of Formwork',
        explanation: 'Permits early removal of formwork provided actual in-situ compressive strength achieves structural requirements.',
      },
      {
        code: 'ASTM C1074',
        title: 'Standard Practice for Estimating Concrete Strength by Maturity',
        explanation: 'Governs mathematical computation of Nurse-Saul temperature-time factor and Arrhenius equivalent age for in-place concrete strength.',
      },
      {
        code: 'IRC:SP:51:2025',
        title: 'Guidelines for NDT & In-Situ Quality Certification',
        explanation: 'Mandates correlated non-destructive testing verification before post-tensioning or formwork release on highway bridges.',
      },
    ],
    technicalSpecs: [
      { label: 'Sampling Frequency', value: '1 reading / 15 mins' },
      { label: 'Sensor Temperature Range', value: '-20°C to +85°C (±0.5°C)' },
      { label: 'Telemetry Standard', value: 'BLE 5.2 + LoRaWAN 865 MHz' },
      { label: 'Maturity Function', value: 'Arrhenius + Nurse-Saul TTF' },
      { label: 'Compliance Audit', value: 'SHA-256 Tamper-Proof Cryptographic Hash' },
    ],
    deliverables: [
      'Real-time temperature and Arrhenius equivalent age dashboard',
      'Automated formwork stripping authorization report with digital signature',
      'Batch-mix maturity calibration database tied to quarry aggregates',
      'Continuous thermal gradient monitoring to prevent micro-cracking in mass pours',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Quarry Mix Calibration',
        description: 'Batch cylinders tested in laboratory at 1, 3, 7, and 28 days to build project-specific datum temperature and Arrhenius curve.',
      },
      {
        step: '02',
        title: 'Digital Sensor Embedding',
        description: 'Sacrificial digital thermal probes secured to reinforcement rebar before concrete placement at critical mass core and edge nodes.',
      },
      {
        step: '03',
        title: 'Continuous BLE Logging',
        description: 'OX1 edge hardware or BLE smartphone syncs logs automatically every 15 minutes, transmitting hydration data to local AI engine.',
      },
      {
        step: '04',
        title: 'Automated Stripping Sign-Off',
        description: 'System automatically issues certified striking report the moment target MPa is crossed, notifying site engineers and consultants.',
      },
    ],
    caseStudy: {
      clientType: 'Metro Viaduct EPC Contractor',
      projectScope: 'Precast Segmental Viaduct Construction (28.4 km)',
      location: 'Western Dedicated Freight Corridor',
      challenge: 'Casting yard bottleneck with 14-day cube crush requirements limiting gantry launches to only 6 spans per month.',
      result: 'Enabled 4-day segment demoulding and prestressing, reducing cycle time by 42% and recovering ₹3.2 Crore in formwork rentals.',
      quote: 'OUANTUM eliminated the guesswork between 7-day lab cubes and real mass hydration. We stripped forms 5 days earlier on every pier cap with full independent engineer approval.',
      author: 'Chief Project Manager, Tier-1 Infrastructure Concessionaire',
    },
    comparison: [
      { aspect: 'Determination Method', traditional: 'Destructive 150mm laboratory cubes', ouantum: 'In-situ continuous Arrhenius maturity' },
      { aspect: 'Stripping Decision Time', traditional: '14 to 28 days arbitrary wait', ouantum: '72 to 120 hours calculated' },
      { aspect: 'Thermal Gradient Tracking', traditional: 'None (risk of delayed thermal cracking)', ouantum: 'Continuous core vs. ambient tracking' },
      { aspect: 'Engineer Sign-Off', traditional: 'Manual paper log sheets', ouantum: 'Digitally signed automated certificate' },
    ],
    faq: [
      {
        q: 'Does IS 456:2000 legally recognize in-situ maturity for stripping formwork?',
        a: 'Yes. IS 456 Clause 11.3 clearly states formwork striking times can be reduced if test cylinders cured under similar conditions or direct in-situ tests prove the required concrete strength has been attained.',
      },
      {
        q: 'How does OUANTUM calibrate maturity against different cement brands?',
        a: 'Prior to project casting, 15 laboratory cylinders are monitored with temperature probes and crushed at 1, 3, 7, 14, and 28 days to establish the exact activation energy and datum temperature for that specific mix design.',
      },
      {
        q: 'What hardware is required on-site?',
        a: 'Sacrificial embedded dual-temperature cable probes cast into the pour, paired with either our autonomous OX1 site terminal or standard field smartphones over Bluetooth Low Energy.',
      },
    ],
  },

  'data-tampering': {
    id: 'data-tampering',
    slug: 'data-tampering',
    badge: 'FIELD DATA INTEGRITY',
    title: 'Testing Fraud & Unverified Field Logs',
    heroHeadline: 'Direct BLE Sensor Sync with Tamper-Evident Cryptographic Audit Trails',
    heroSubheadline:
      'Eliminate handwritten log manipulation, fraudulent cube substitutions, and disputed rebound hammer readings with zero manual transcription and SHA-256 encrypted verification.',
    image: '/assets/images/buildings/building-11.png',
    imageAlt: 'High-precision modern infrastructure with encrypted field quality verification',
    painHeading: 'The Crisis of Field Testing Fraud',
    painPoints: [
      {
        title: 'Manual Transcription Tampering',
        description: 'Rebound hammer values and UPV velocities are routinely altered on clipboards before entering formal inspection reports.',
      },
      {
        title: 'Casting Cube Substitution',
        description: 'Substandard on-site pours masked by casting separate lab-only cubes with richer mix designs and higher cement content.',
      },
      {
        title: 'Government Vigilance Audits',
        description: 'TPQM inspections and government vigilance audits trigger expensive re-testing and frozen bills when log integrity is contested.',
      },
    ],
    solutionHeading: 'How OUANTUM Secures Field Test Data',
    solutionSummary:
      'OUANTUM ingests raw sensor readings directly over Bluetooth BLE from digital Schmidt hammers and UPV probes. Every reading is stamped with GPS coordinates, device serial numbers, and an immutable cryptographic SHA-256 seal.',
    solutionHighlights: [
      {
        title: 'Direct BLE Ingestion',
        description: 'Eliminates paper logs by reading directly from digital non-destructive test equipment without human touch.',
      },
      {
        title: 'Cryptographic SHA-256 Seal',
        description: 'Each test log is hashed and time-stamped. Any post-measurement modification immediately invalidates the signature.',
      },
      {
        title: 'Chainage & GPS Stamping',
        description: 'Every reading is geotagged to the exact pier, span, and chainage coordinate on the CAD/BIM model.',
      },
    ],
    impactMetrics: [
      { label: 'Data Authenticity', value: '100%', detail: 'Cryptographically sealed & tamper-evident' },
      { label: 'Audit Verification Time', value: '< 60 Sec', detail: 'Instant statutory QR code verification' },
      { label: 'Transcription Error', value: '0%', detail: 'Zero manual data entry from sensor to report' },
      { label: 'Billing Approval Velocity', value: '4x Faster', detail: 'Independent engineers verify with 1-click' },
    ],
    codalStandard: 'IS 13311 (Part 1 & 2) & ISO 9001:2015 Clause 8.5.2',
    codalClauses: [
      {
        code: 'IS 13311:1992 Part 2',
        title: 'Rebound Hammer Testing Standard',
        explanation: 'Defines mandatory calibration testing on standard steel anvils and rebound index calculation protocols.',
      },
      {
        code: 'ISO 9001:2015 Cl. 8.5.2',
        title: 'Identification & Traceability',
        explanation: 'Requires continuous auditable provenance of all inspection and test status throughout project life-cycle.',
      },
      {
        code: 'IRC:SP:51:2025',
        title: 'Digital Quality Audit Protocols',
        explanation: 'Specifies direct digital data logging to prevent intermediate record falsification on NHAI corridors.',
      },
    ],
    technicalSpecs: [
      { label: 'Encryption Algorithm', value: 'SHA-256 + ECDSA Public Key Signatures' },
      { label: 'Geolocation Accuracy', value: 'RTK GPS ±10cm accuracy' },
      { label: 'Probe Connectivity', value: 'BLE 5.0, USB-C Mass Storage, Modbus' },
      { label: 'Offline Capability', value: 'Local SQLite offline buffer with sync' },
      { label: 'Audit Trail Standard', value: 'RFC 3161 Trusted Timestamping' },
    ],
    deliverables: [
      'Tamper-evident digital quality dossier for each structural component',
      'Statutory QR code inspection certificate verified on public ledger',
      'GIS-mapped inspection logs linked directly to BIM model elements',
      'Real-time anomaly alerts notifying QA/QC heads of out-of-spec readings',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Device Pairing',
        description: 'Digital Schmidt hammer or ultrasonic probe pairs via Bluetooth Low Energy to the OX1 mobile interface.',
      },
      {
        step: '02',
        title: 'Live Acquisition',
        description: 'Field engineer fires the probe; raw velocity and rebound numbers stream instantly into the terminal.',
      },
      {
        step: '03',
        title: 'Cryptographic Hashing',
        description: 'Timestamp, device serial, GPS coordinates, and raw readings are sealed with a cryptographic signature.',
      },
      {
        step: '04',
        title: 'Instant Authority Verification',
        description: 'Independent Engineer and Client scan the certificate QR code to inspect raw telemetry and calibration state.',
      },
    ],
    caseStudy: {
      clientType: 'National Expressways Authority',
      projectScope: '8-Lane Access Controlled Expressway (114 km)',
      location: 'Delhi-Mumbai Expressway Spur',
      challenge: 'TPQM vigilance audit flagged 4,200 handwritten cube and rebound logs for suspected copying and fictitious data.',
      result: 'Deployed OUANTUM across 12 EPC packages. Over 85,000 BLE tests logged with zero disputes, clearing ₹240 Crore in stalled escrow payments.',
      quote: 'OUANTUM restored trust between our concessionaires and TPQM monitors. When every sensor reading has an immutable cryptographic hash, disputes disappear.',
      author: 'Superintending Quality Engineer, National Highway Division',
    },
    comparison: [
      { aspect: 'Data Entry', traditional: 'Handwritten on field clipboard', ouantum: 'Direct BLE wireless sensor sync' },
      { aspect: 'Audit Traceability', traditional: 'Easily disputed paper sheets', ouantum: 'SHA-256 cryptographic proof' },
      { aspect: 'Location Verification', traditional: 'Subjective self-reported notes', ouantum: 'RTK GPS and BIM element coordinate' },
      { aspect: 'Audit Readiness', traditional: 'Weeks of manual file hunting', ouantum: 'Instant QR code scan verification' },
    ],
    faq: [
      {
        q: 'Can an inspector edit readings if the hammer misfires?',
        a: 'Readings can be flagged with a field exception note explaining equipment misfire or rough aggregate contact, but the raw measurement remains indelibly in the audit trail.',
      },
      {
        q: 'What happens if there is no internet cellular connection on site?',
        a: 'The OX1 application operates completely offline. All readings are signed and encrypted locally. As soon as the device reconnects to Wi-Fi or 4G/5G, the ledger synchronizes automatically.',
      },
      {
        q: 'Does this integrate with Procore, Autodesk Construction Cloud, or Primavera?',
        a: 'Yes, OUANTUM provides bi-directional webhooks and REST APIs to sync verified testing certificates directly into Autodesk BIM 360, Procore, and Bentley ProjectWise.',
      },
    ],
  },

  'milestone-disputes': {
    id: 'milestone-disputes',
    slug: 'milestone-disputes',
    badge: 'DISPUTE RESOLUTION',
    title: 'Contractor-Authority Milestone & Escrow Disputes',
    heroHeadline: 'Zero-Dispute Consensus for IS 456, IS 13311 & MoRTH Milestones',
    heroSubheadline:
      'Unify contractor and Independent Engineer interpretations. Replace contradictory cube crush reports with deterministic, quarry-calibrated mathematical consensus.',
    image: '/assets/images/buildings/building-2.png',
    imageAlt: 'Modern structural bridge pier and deck evaluated with codified consensus AI',
    painHeading: 'The Multi-Crore Milestone Stalemate',
    painPoints: [
      {
        title: 'Conflicting Test Results',
        description: 'Contractor cube crushes show 38 MPa while authority independent hammer tests read 29 MPa, paralyzing milestone approvals.',
      },
      {
        title: 'Escrow Billing Paralysis',
        description: 'Interim payment certificates (IPC) freeze for months awaiting third-party institutional testing from IIT or CRRI.',
      },
      {
        title: 'Protracted Arbitration Costs',
        description: 'Disputed structural acceptance escalates to legal arbitration and NHAI dispute resolution boards, costing crores in idle overhead.',
      },
    ],
    solutionHeading: 'How OUANTUM Resolves Disputes',
    solutionSummary:
      'OUANTUM translates complex Indian Standards (IS 456, IS 13311, MoRTH Section 1700) into deterministic mathematical algorithms. Both contractor and Independent Engineer log into a shared consensus model calibrated to project aggregates.',
    solutionHighlights: [
      {
        title: 'Deterministic Codal Logic',
        description: 'Codifies clauses 15 and 16 of IS 456 so both parties run the exact same statistical acceptance logic.',
      },
      {
        title: 'Dual-Party Consensus Portal',
        description: 'Contractor and Independent Engineer sign off on identical sensor telemetry with simultaneous cryptographic keys.',
      },
      {
        title: 'Quarry Aggregate Curve Matching',
        description: 'Harmonizes rebound and UPV curves to local river-sand or M-sand properties to remove testing variance.',
      },
    ],
    impactMetrics: [
      { label: 'Milestone Approval Speed', value: '85% Faster', detail: 'From 42 days average to under 6 days' },
      { label: 'Arbitration Prevention', value: '₹1.4 Cr', detail: 'Saved per 100km highway contract' },
      { label: 'Codal Consensus', value: '100%', detail: 'Zero divergence on IS 456 acceptance criteria' },
      { label: 'Escrow Release Velocity', value: '3.2x', detail: 'Instant milestone verification for banks' },
    ],
    codalStandard: 'MoRTH Section 1700 & IS 456:2000 Clause 15 & 16',
    codalClauses: [
      {
        code: 'IS 456:2000 Cl. 15',
        title: 'Sampling and Acceptance Criteria',
        explanation: 'Prescribes mandatory statistical standard deviation and characteristic compressive strength verification.',
      },
      {
        code: 'IS 456:2000 Cl. 16',
        title: 'Acceptance of Structure',
        explanation: 'Provides specific non-destructive core and SonReb testing protocols when standard cubes fail compliance limits.',
      },
      {
        code: 'MoRTH Section 1700',
        title: 'Structural Concrete & Tolerances',
        explanation: 'Defines strict workmanship tolerances and milestone billing sign-off conditions for national highway structures.',
      },
    ],
    technicalSpecs: [
      { label: 'Consensus Engine', value: 'Deterministic Multi-Party Mathematical Verification' },
      { label: 'Statistical Model', value: 'Gaussian Distribution + Student t-Test' },
      { label: 'Multi-Signature Auth', value: 'Contractor + Consultant + Client Triple Key' },
      { label: 'Standards Pre-Loaded', value: 'IS 456, IS 13311, MoRTH, IRC 112, ASTM' },
      { label: 'Export Format', value: 'Statutory PDF/A-1b with Embedded XML Metadata' },
    ],
    deliverables: [
      'Joint contractor-authority consensus certificate for milestone billing',
      'Statutory compliance score calculation under MoRTH Section 1700',
      'Quarry-specific SonReb calibration curve with statistical uncertainty bounds',
      'Complete digital audit trail for Dispute Resolution Board (DRB) immunity',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Joint Mix Calibration',
        description: 'Both contractor and Independent Engineer witness the initial 28-day quarry calibration test matrix.',
      },
      {
        step: '02',
        title: 'Shared Field Ingestion',
        description: 'Test results stream simultaneously to both contractor and client dashboards with zero time disparity.',
      },
      {
        step: '03',
        title: 'Algorithmic Acceptance',
        description: 'The platform evaluates IS 456 Cl. 15 & 16 statistical requirements, highlighting exact clause satisfaction.',
      },
      {
        step: '04',
        title: 'Escrow IPC Release',
        description: 'Dual digital signatures trigger automatic milestone completion certificate, unblocking bank escrow disbursement.',
      },
    ],
    caseStudy: {
      clientType: 'Major Bridge EPC Contractor',
      projectScope: '4-Lane Cable-Stayed River Bridge (3.6 km)',
      location: 'Brahmaputra River Crossing',
      challenge: '₹22 Crore escrow milestone frozen for 7 months due to contradictory rebound hammer interpretations on pylon concrete.',
      result: 'OUANTUM calibrated local quarry aggregates into a unified SonReb correlation, proving 42 MPa in-situ strength and releasing billing in 72 hours.',
      quote: 'When the algorithm is deterministic and based on codal clauses, there is nothing for the contractor and consultant to fight over. OUANTUM resolved a 7-month dispute in 3 days.',
      author: 'Vice President of Projects, Tier-1 Infrastructure Conglomerate',
    },
    comparison: [
      { aspect: 'Acceptance Criterion', traditional: 'Subjective consultant interpretation', ouantum: 'Deterministic algorithmic codal logic' },
      { aspect: 'Dispute Resolution', traditional: 'Months of third-party core drilling', ouantum: 'Instant empirical aggregate correlation' },
      { aspect: 'Billing IPC Sign-off', traditional: 'Average 30 to 60 days delay', ouantum: 'Under 72 hours automated release' },
      { aspect: 'Audit Readiness', traditional: 'Conflicting paper dossiers', ouantum: 'Shared cryptographic consensus ledger' },
    ],
    faq: [
      {
        q: 'Can the Independent Engineer reject the OUANTUM consensus report?',
        a: 'The report adheres strictly to the exact mathematical formulas in IS 456 and MoRTH. All calculations, standard deviations, and raw data are transparently laid out, giving the engineer complete audit confidence.',
      },
      {
        q: 'Does this replace destructive core testing entirely?',
        a: 'In over 80% of disputed cases, OUANTUM’s calibrated SonReb methodology provides sufficient statistical certainty under IS 456 Clause 16.3 to avoid destructive core extraction.',
      },
      {
        q: 'How are multi-party digital signatures authenticated?',
        a: 'Using Aadhaar eSign or Class-3 DSC digital certificates compliant with the Information Technology Act, ensuring full legal validity in Indian courts and arbitration proceedings.',
      },
    ],
  },

  'subsurface-voids': {
    id: 'subsurface-voids',
    slug: 'subsurface-voids',
    badge: 'STRUCTURAL INTEGRITY',
    title: 'Hidden Voids & Honeycombing in Post-Tensioned Ducts',
    heroHeadline: 'Acoustic UPV Tomography Resolving Internal Defects and Tendon Duct Voids',
    heroSubheadline:
      'Detect catastrophic grout voids, honeycombing, and cold joints before bridge deck post-tensioning. Synthetic aperture acoustic imaging provides sub-centimeter internal defect mapping.',
    image: '/assets/images/buildings/building-12.png',
    imageAlt: 'High-tech concrete bridge girder undergoing ultrasonic pulse velocity tomography',
    painHeading: 'The Invisible Threat of Uncompacted Concrete',
    painPoints: [
      {
        title: 'Uncompacted Concrete Behind Rebar',
        description: 'Dense rebar cages prevent visual inspection; severe honeycombing and large voids remain hidden beneath a 25mm surface skin.',
      },
      {
        title: 'Un-Grouted Post-Tensioned Ducts',
        description: 'Trapped air in prestressing cable ducts leads to rapid tendon corrosion, causing catastrophic bridge collapses years after handover.',
      },
      {
        title: 'Destructive Re-Drilling Damage',
        description: 'Blind core drilling to check for voids risks severing high-tensile prestressing strands and permanently weakening the structure.',
      },
    ],
    solutionHeading: 'How OUANTUM Detects Subsurface Voids',
    solutionSummary:
      'OUANTUM pairs ultrasonic pulse velocity (UPV) arrays with Synthetic Aperture Focusing Technique (SAFT) tomography to construct high-resolution cross-sectional slices through 2-meter thick concrete elements.',
    solutionHighlights: [
      {
        title: 'Synthetic Aperture Tomography',
        description: 'Transforms multi-channel ultrasonic pulse echoes into 3D volumetric images of internal rebar and void geometry.',
      },
      {
        title: 'Duct Grout Integrity Grading',
        description: 'Classifies tendon duct fill status into Full, Partially Grouted, or Critical Void with exact volume estimation.',
      },
      {
        title: 'Non-Destructive Defect Mapping',
        description: 'Identifies internal honeycombing down to 15mm resolution without cutting or core-drilling structurally sensitive zones.',
      },
    ],
    impactMetrics: [
      { label: 'Defect Resolution', value: '15 mm', detail: 'Sub-centimeter acoustic void detection' },
      { label: 'Penetration Depth', value: 'Up to 2.5 m', detail: 'Through heavily reinforced mass concrete' },
      { label: 'Grout Void Detection', value: '99.4%', detail: 'Accuracy on post-tensioned tendon ducts' },
      { label: 'Repair Cost Savings', value: '80%', detail: 'Localized grouting vs. full deck demolition' },
    ],
    codalStandard: 'IS 13311 (Part 1):1992 & ACI 228.2R Non-Destructive Testing',
    codalClauses: [
      {
        code: 'IS 13311:1992 Part 1',
        title: 'Ultrasonic Pulse Velocity',
        explanation: 'Classifies concrete quality based on acoustic velocity (>4.5 km/sec = Excellent, 3.5-4.5 km/sec = Good, <3.0 km/sec = Doubtful).',
      },
      {
        code: 'ACI 228.2R',
        title: 'NDT Methods for Concrete in Structures',
        explanation: 'Details ultrasonic pulse-echo and impact-echo techniques for void detection and internal thickness measurement.',
      },
      {
        code: 'IRC 112:2020',
        title: 'Code of Practice for Concrete Road Bridges',
        explanation: 'Requires full verification of prestressing duct grouting integrity prior to opening structures to live traffic.',
      },
    ],
    technicalSpecs: [
      { label: 'Acoustic Frequency', value: '50 kHz to 500 kHz ultrasonic transducers' },
      { label: 'Imaging Algorithm', value: 'Synthetic Aperture Focusing Technique (SAFT)' },
      { label: 'Scan Resolution', value: 'Grid spacing: 50mm x 50mm' },
      { label: 'Data Ingestion', value: 'Proceq Pundit, ACS A1040 Mira, or custom BLE probes' },
      { label: 'Volumetric Export', value: 'Open standard 3D point cloud & IFC format' },
    ],
    deliverables: [
      '3D B-scan and C-scan acoustic tomographic slices of concrete elements',
      'Tendon duct grout fill integrity certification report',
      'Grouting repair injection coordinates for targeted micro-cement filling',
      'CAD overlay indicating exact depth and boundary of internal honeycombing',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Surface Grid Layout',
        description: 'Standard 100mm x 100mm inspection grid mapped onto concrete surface using chalk or laser projection.',
      },
      {
        step: '02',
        title: 'Acoustic Array Scanning',
        description: 'Ultrasonic transducer array passes along grid lines; pulse-echo transit times captured via BLE.',
      },
      {
        step: '03',
        title: 'Tomographic Inversion',
        description: 'OUANTUM SAFT engine processes acoustic reflection delays, reconstructing internal acoustic impedance boundaries.',
      },
      {
        step: '04',
        title: 'Targeted Remediation',
        description: 'Identified voids mapped with millimeter precision, allowing targeted grout injection without structural damage.',
      },
    ],
    caseStudy: {
      clientType: 'High-Speed Rail Corporation',
      projectScope: 'Prestressed Concrete Box Girder Bridge (18.6 km)',
      location: 'Ahmedabad-Mumbai Bullet Train Corridor',
      challenge: 'Grout bleed and trapped air suspected in internal tendon ducts of 40-meter box girders prior to track installation.',
      result: 'Scanned 120 girder spans non-destructively; pinpointed 14 localized duct voids and guided vacuum re-grouting with 100% verification.',
      quote: 'OUANTUM’s acoustic tomography gave us X-ray vision inside 2-meter thick girder webs. We saved months of destructive testing and guaranteed a 100-year design life.',
      author: 'Chief Engineer (Structures), High Speed Rail Project',
    },
    comparison: [
      { aspect: 'Inspection Approach', traditional: 'Blind surface tapping and destructive cores', ouantum: '3D acoustic synthetic aperture tomography' },
      { aspect: 'Tendon Duct Verification', traditional: 'Unreliable visual bleed port inspection', ouantum: 'Empirical ultrasonic velocity mapping' },
      { aspect: 'Structural Risk', traditional: 'High risk of cutting prestressed cables', ouantum: '100% non-destructive and non-invasive' },
      { aspect: 'Repair Method', traditional: 'Costly widespread demolition', ouantum: 'Precision micro-injection coordinates' },
    ],
    faq: [
      {
        q: 'Can UPV tomography penetrate through dense rebar grids?',
        a: 'Yes. By utilizing lower frequencies (50–100 kHz) and SAFT signal-processing algorithms, OUANTUM filters out the high-frequency rebar reflections to see deeper honeycombing and duct anomalies.',
      },
      {
        q: 'How fast can a field team scan a typical bridge pier?',
        a: 'Using a multi-channel shear wave dry-point-contact array, a 2-meter x 3-meter surface can be scanned and processed into a 3D tomogram in under 45 minutes.',
      },
      {
        q: 'Does this work on asphalt overlays or painted concrete?',
        a: 'Dry-point contact sensors require no messy liquid couplant and can scan through thin paints and coatings. Heavy asphalt overlays should be bypassed or coupled directly.',
      },
    ],
  },

  'structural-corrosion': {
    id: 'structural-corrosion',
    slug: 'structural-corrosion',
    badge: 'DURABILITY MODELING',
    title: '50-Year Structural Corrosion & Carbonation Risk',
    heroHeadline: 'Fickian Chloride Diffusion & Reinforcement Carbonation Risk Simulation',
    heroSubheadline:
      'Predict remaining service life under harsh marine, coastal, and industrial chemical environments. Simulate cover concrete degradation 50 years ahead with half-cell potential and resistivity mapping.',
    image: '/assets/images/buildings/building-10.png',
    imageAlt: 'Marine coastal concrete viaduct and port terminal inspected for electrochemical corrosion',
    painHeading: 'The Catastrophic Cost of Silent Corrosion',
    painPoints: [
      {
        title: 'Chloride Ion Migration in Marine Air',
        description: 'Coastal flyovers and marine jetties suffer unseen chloride penetration, depassivating rebar and causing sudden structural spalling.',
      },
      {
        title: 'Carbonation Front Penetration',
        description: 'Atmospheric CO2 lowers concrete alkalinity from pH 13 to below pH 9, triggering rapid rust expansion that cracks concrete from within.',
      },
      {
        title: 'Premature Multi-Crore Rehabilitation',
        description: 'Without predictive durability modeling, structures designed for 100 years require emergency retrofitting in just 15 to 20 years.',
      },
    ],
    solutionHeading: 'How OUANTUM Predicts Service Life',
    solutionSummary:
      'OUANTUM executes non-linear finite element diffusion simulations using Fick’s Second Law combined with real-time half-cell potential telemetry and surface electrical resistivity logging to forecast corrosion initiation decades in advance.',
    solutionHighlights: [
      {
        title: 'Fick’s Second Law Diffusion Engine',
        description: 'Models non-steady-state chloride ingress based on ambient salinity, cement fly-ash blending, and temperature.',
      },
      {
        title: 'Half-Cell Potential Contour Mapping',
        description: 'Maps ASTM C876 corrosion probability across 2D structural surfaces with automated probability grading.',
      },
      {
        title: '50-Year Service Life Prediction',
        description: 'Forecasts the exact year cover cracking and cross-section loss will occur, guiding proactive cathodic protection.',
      },
    ],
    impactMetrics: [
      { label: 'Forecast Horizon', value: '50+ Years', detail: 'Fickian non-linear chloride diffusion modeling' },
      { label: 'Life-Cycle Cost Reduction', value: '64%', detail: 'Proactive silane/migrating inhibitor coating vs. jacketing' },
      { label: 'Corrosion Detection', value: 'ASTM C876', detail: 'Electrochemical half-cell mapping accuracy' },
      { label: 'Asset Life Extension', value: '+25 Years', detail: 'Targeted cathodic and surface protection' },
    ],
    codalStandard: 'IS 456 Cl. 8 (Durability) & ASTM C876 Half-Cell Standard',
    codalClauses: [
      {
        code: 'IS 456:2000 Cl. 8',
        title: 'Durability Requirements for Environmental Exposure',
        explanation: 'Mandates minimum cement content, maximum water-cement ratio, and cover depth based on mild, moderate, severe, and extreme exposure.',
      },
      {
        code: 'ASTM C876',
        title: 'Standard Test Method for Corrosion Potentials of Uncoated Steel',
        explanation: 'Establishes numerical boundaries for rebar corrosion probability (more negative than -350mV = >90% active corrosion probability).',
      },
      {
        code: 'fib Model Code 2010',
        title: 'Service Life Design of Concrete Structures',
        explanation: 'Governs probabilistic durability design against reinforcement carbonation and chloride-induced depassivation.',
      },
    ],
    technicalSpecs: [
      { label: 'Simulation Engine', value: 'Non-linear 2D/3D Fickian finite element diffusion' },
      { label: 'Half-Cell Standard', value: 'Copper-Copper Sulfate (CSE) & Ag/AgCl reference electrodes' },
      { label: 'Resistivity Range', value: 'Wenner 4-point probe: 1 kΩ-cm to 1000 kΩ-cm' },
      { label: 'Calibration Parameters', value: 'Water-binder ratio, supplementary cementitious materials (fly ash, GGBS, silica fume)' },
      { label: 'Dossier Output', value: 'ISO 15686 compliant Asset Service Life Plan' },
    ],
    deliverables: [
      '50-year service life degradation curve and remaining design life forecast',
      'Half-cell electrochemical corrosion potential heat map (ASTM C876)',
      'Concrete surface electrical resistivity classification map (AASHTO T358)',
      'Recommended protective coating and cathodic intervention timeline',
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Microclimate Ingestion',
        description: 'Ambient humidity, coastal salinity zone, and concrete mix proportions loaded into the durability engine.',
      },
      {
        step: '02',
        title: 'Electrochemical Field Survey',
        description: 'Field engineer records half-cell potential voltages and Wenner electrical resistivity across the structural grid.',
      },
      {
        step: '03',
        title: 'Diffusion Modeling',
        description: 'OUANTUM computes the chloride diffusion coefficient (D_cl) and simulates the time-to-corrosion initiation curve.',
      },
      {
        step: '04',
        title: 'Preventive Intervention',
        description: 'Asset managers receive automated alerts indicating optimal year to apply silane sealers or sacrificial anodes.',
      },
    ],
    caseStudy: {
      clientType: 'Port & Harbor Maritime Authority',
      projectScope: 'Container Terminal Wharf & Marine Piles (3.2 km shoreline)',
      location: 'Jawaharlal Nehru Port Trust (JNPT)',
      challenge: 'Severe tidal spray causing visible rust staining and spalling on RC piles after only 11 years of service.',
      result: 'OUANTUM modeled remaining life across 840 piles, pinpointed 82 critical units for sacrificial anode protection, saving ₹18 Crore in full pile replacements.',
      quote: 'OUANTUM shifted our port asset management from reactive emergency patch-ups to 30-year predictive durability science.',
      author: 'Chief Marine Engineer, Coastal Port Infrastructure Authority',
    },
    comparison: [
      { aspect: 'Durability Assessment', traditional: 'Waiting for visual spalling and rust bleed', ouantum: 'Predictive 50-year Fickian diffusion modeling' },
      { aspect: 'Testing Metric', traditional: 'Carbonation phenolphthalein drill tests only', ouantum: 'Half-cell potential + electrical resistivity contours' },
      { aspect: 'Asset Life Plan', traditional: 'Ad-hoc emergency concrete jacketing', ouantum: 'Optimized cathodic & silane maintenance schedules' },
      { aspect: 'Codal Compliance', traditional: 'Broad prescriptive assumptions', ouantum: 'Empirical fib Model Code 2010 compliance' },
    ],
    faq: [
      {
        q: 'Can this model account for slag (GGBS) and fly ash in the mix?',
        a: 'Yes. The diffusion engine includes specific binding capacity coefficients for Portland Pozzolana Cement (PPC), GGBS (up to 70%), and silica fume additions.',
      },
      {
        q: 'How does half-cell potential identify corrosion before cracking occurs?',
        a: 'Electrochemical voltage drops occur as soon as the passive protective oxide film breaks down on the rebar—often 3 to 7 years before physical rust expansion causes external spalling.',
      },
      {
        q: 'What standard governs this service life prediction methodology?',
        a: 'The calculations are grounded in fib Model Code for Concrete Structures (Bulletin 65/66), ISO 15686, and IS 456 Clause 8 guidelines.',
      },
    ],
  },
};

export const SOLUTIONS_LIST = Object.values(SOLUTIONS_MAP);

interface SolutionDetailProps {
  initialSlug?: string;
  solutionSlug?: string;
}

const SolutionDetail: React.FC<SolutionDetailProps> = ({ initialSlug, solutionSlug }) => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const activeSlug = solutionSlug || initialSlug || routeSlug || 'curing-delays';
  const solution = SOLUTIONS_MAP[activeSlug];

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSlug]);

  useSEO({
    title: solution
      ? `${solution.title} | OUANTUM Civil Engineering Solutions`
      : 'Civil Infrastructure Solutions | OUANTUM',
    description: solution
      ? solution.heroSubheadline
      : 'Deterministic AI platforms eliminating concrete bottlenecks, testing fraud, and milestone disputes.',
    canonicalPath: `/solutions/${activeSlug}`,
  });

  if (!solution) {
    return <Navigate to="/solutions/curing-delays" replace />;
  }

  const currentIndex = SOLUTIONS_LIST.findIndex((s) => s.slug === activeSlug);
  const prevSolution =
    SOLUTIONS_LIST[(currentIndex - 1 + SOLUTIONS_LIST.length) % SOLUTIONS_LIST.length];
  const nextSolution = SOLUTIONS_LIST[(currentIndex + 1) % SOLUTIONS_LIST.length];

  const currentWorkflowStep = solution.workflowSteps[activeStepIndex] || solution.workflowSteps[0];

  return (
    <main
      style={{
        background: '#ffffff',
        color: '#111111',
        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        minHeight: '100vh',
      }}
    >
      {/* ── HERO SECTION ── */}
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
              }}
            >
              {solution.title}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: '0 0 28px 0',
              }}
            >
              {solution.heroSubheadline}
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
                to="/products/ox1"
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
                Brief OX1 on This Solution
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
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
                Schedule Site Demonstration
              </Link>
            </div>
          </div>

          {/* Hero Visual Card (Matching site card styling) */}
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
              src={solution.image}
              alt={solution.imageAlt}
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

      {/* ── KEY PERFORMANCE IMPACT METRICS (Cards Grid with Warm Cream Bg #f4f3ec) ── */}
      <section
        style={{
          padding: '24px 16px 40px',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {solution.impactMetrics.map((metric, i) => (
            <div
              key={i}
              style={{
                padding: '28px 24px',
                borderRadius: 0,
                border: '1px solid rgba(0, 0, 0, 0.07)',
                background: '#f4f3ec',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                  fontWeight: 400,
                  color: '#111111',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: '10px',
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#111111',
                  marginBottom: '6px',
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  lineHeight: 1.45,
                }}
              >
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM VS SOLUTION DEEP DIVE (Cards Structure with #f4f3ec) ── */}
      <section
        style={{
          padding: '40px 16px 56px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {/* The Industry Pain Points Card */}
            <div
              style={{
                padding: '36px',
                borderRadius: 0,
                background: '#f4f3ec',
                border: '1px solid rgba(0, 0, 0, 0.07)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.65rem',
                  fontWeight: 400,
                  color: '#111111',
                  lineHeight: 1.25,
                  margin: '0 0 24px 0',
                }}
              >
                {solution.painHeading}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {solution.painPoints.map((p, idx) => (
                  <div key={idx} style={{ padding: '4px 0' }}>
                    <h3
                      style={{
                        fontSize: '1.025rem',
                        fontWeight: 600,
                        color: '#111111',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: '#4b5563',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* How OUANTUM Solves It Card */}
            <div
              style={{
                padding: '36px',
                borderRadius: 0,
                background: '#f4f3ec',
                border: '1px solid rgba(0, 0, 0, 0.07)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.65rem',
                  fontWeight: 400,
                  color: '#111111',
                  lineHeight: 1.25,
                  margin: '0 0 16px 0',
                }}
              >
                {solution.solutionHeading}
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#4b5563',
                  lineHeight: 1.6,
                  margin: '0 0 24px 0',
                }}
              >
                {solution.solutionSummary}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {solution.solutionHighlights.map((h, idx) => (
                  <div key={idx} style={{ padding: '4px 0' }}>
                    <div
                      style={{
                        fontSize: '1.025rem',
                        fontWeight: 600,
                        color: '#111111',
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Check size={16} color="#111111" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span>{h.title}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.55, paddingLeft: '24px' }}>
                      {h.description}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE WORKFLOW PROTOCOL COMPONENT (Left Title Click -> Right Content Display) ── */}
      <section
        style={{
          padding: '40px 16px 56px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '780px', margin: '0 0 32px 0' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.2,
                margin: '0 0 12px 0',
              }}
            >
              How It Operates on Your Job Site
            </h2>
            <p style={{ fontSize: '0.975rem', color: '#4b5563', lineHeight: 1.55, margin: 0 }}>
              Select a stage from the left to inspect its site verification parameters, telemetry workflow, and compliance output.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {/* Left Column: Interactive Title List */}
            <div
              style={{
                gridColumn: 'span 4',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {solution.workflowSteps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    style={{
                      padding: '20px 22px',
                      background: isActive ? '#111111' : '#f4f3ec',
                      color: isActive ? '#ffffff' : '#111111',
                      border: '1px solid rgba(0, 0, 0, 0.07)',
                      borderRadius: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: isActive ? 600 : 500,
                        lineHeight: 1.35,
                      }}
                    >
                      {step.title}
                    </span>
                    <ArrowRight
                      size={16}
                      color={isActive ? '#ffffff' : '#6b7280'}
                      style={{
                        transform: isActive ? 'translateX(4px)' : 'none',
                        transition: 'transform 0.15s ease',
                        flexShrink: 0,
                        marginLeft: '12px',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Content Display Card */}
            <div
              style={{
                gridColumn: 'span 8',
                background: '#f4f3ec',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                borderRadius: 0,
                padding: 'clamp(28px, 4vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '340px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{ width: '100%' }}
                >
                  <h3
                    style={{
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                      fontWeight: 500,
                      color: '#111111',
                      lineHeight: 1.25,
                      margin: '0 0 14px 0',
                    }}
                  >
                    {currentWorkflowStep.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#4b5563',
                      lineHeight: 1.65,
                      margin: '0 0 24px 0',
                    }}
                  >
                    {currentWorkflowStep.description}
                  </p>

                  {/* Verification Checklist with Bare Tick Icon (No Circle) */}
                  <div
                    style={{
                      paddingTop: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <Check size={18} color="#111111" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.925rem', color: '#374151' }}>
                          Complies with {solution.codalStandard}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <Check size={18} color="#111111" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.925rem', color: '#374151' }}>
                          Synchronizes raw field readings directly over BLE with zero transcription tampering
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <Check size={18} color="#111111" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.925rem', color: '#374151' }}>
                          Permanently seals every reading with GPS coordinates and SHA-256 cryptographic proof
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE VS AFTER EVALUATION (Structured HTML Table) ── */}
      <section
        style={{
          padding: '40px 16px 56px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 2.6vw, 2.2rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Traditional Job Site vs. OUANTUM Civil AI
            </h2>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: 0, background: '#f4f3ec' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#ebeae3', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.825rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Evaluation Aspect
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.825rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Traditional Job Site Practice
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '0.825rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    OUANTUM Civil AI Standard
                  </th>
                </tr>
              </thead>
              <tbody>
                {solution.comparison.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: idx === solution.comparison.length - 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                      background: idx % 2 === 0 ? '#ffffff' : '#faf9f3',
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontSize: '0.9rem', fontWeight: 600, color: '#111111' }}>
                      {row.aspect}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.55 }}>
                      {row.traditional}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#15803d', fontWeight: 500, lineHeight: 1.55 }}>
                      {row.ouantum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (Accordion Cards with #f4f3ec) ── */}
      <section
        style={{
          padding: '40px 16px 56px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 2.6vw, 2.2rem)',
                fontWeight: 400,
                color: '#111111',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Engineering & Operational FAQ
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {solution.faq.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: 0,
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  background: '#f4f3ec',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: '#f4f3ec',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#111111',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 24px 20px',
                          fontSize: '0.925rem',
                          color: '#4b5563',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT SOLUTION PAGER ── */}
      <section
        style={{
          padding: '28px 16px',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Link
            to={`/solutions/${prevSolution.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.925rem',
              fontWeight: 600,
              color: '#111111',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            <span>Previous: {prevSolution.title}</span>
          </Link>
          <Link
            to="/solutions"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#6b7280',
              textDecoration: 'none',
            }}
          >
            View All 5 Solutions
          </Link>
          <Link
            to={`/solutions/${nextSolution.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.925rem',
              fontWeight: 600,
              color: '#111111',
              textDecoration: 'none',
            }}
          >
            <span>Next: {nextSolution.title}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── BOTTOM ENTERPRISE CTA (No filter in card bg, pure white text fill properly) ── */}
      <section
        className="ic-bottom-cta-section deploy-cta-section"
        style={{
          padding: '24px 16px 80px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div
            className="deploy-cta-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/buildings/card_building/image.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 0,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: 'clamp(64px, 8vw, 100px) 24px',
              textAlign: 'center',
              color: '#ffffff',
              filter: 'none',
            }}
          >
            <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div
                role="heading"
                aria-level={2}
                className="deploy-cta-heading"
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  margin: '0 auto 16px',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  WebkitTextStroke: '0px transparent',
                  WebkitTextStrokeWidth: '0px',
                  textAlign: 'center',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 4px 28px rgba(0, 0, 0, 0.9)',
                }}
              >
                Deploy OUANTUM on Your Next Pour
              </div>
              <p
                className="deploy-cta-paragraph"
                style={{
                  fontSize: 'clamp(0.95rem, 1.25vw, 1.1rem)',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  lineHeight: 1.6,
                  margin: '0 auto 36px',
                  textAlign: 'center',
                  maxWidth: '680px',
                  textShadow: '0 1px 8px rgba(0, 0, 0, 0.9)',
                }}
              >
                Brief our autonomous civil engineer OX1, connect your digital probes over BLE, and eliminate compliance bottlenecks across every highway, metro, and bridge contract.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <Link
                  to="/products/ox1"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: 0,
                    background: '#ffffff',
                    color: '#111111',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Explore OX1 Platform
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: 0,
                    background: '#000000',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: '1px solid #ffffff',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Request Field Demonstration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SolutionDetail;
