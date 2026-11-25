import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

type LegalTab = 'terms' | 'privacy' | 'security' | 'dpa' | 'acceptable-use' | 'cookies';

interface TabConfig {
  id: LegalTab;
  title: string;
  subtitle: string;
  updatedDate: string;
  badge: string;
}

const TABS: TabConfig[] = [
  {
    id: 'terms',
    title: 'Terms of Service',
    subtitle: 'The master agreement governing your access to and use of the OUANTUM platform and AI copilot services.',
    updatedDate: 'October 2026',
    badge: 'Master Agreement',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'How we collect, protect, process, and safeguard infrastructure telemetry, sensor data, and client credentials.',
    updatedDate: 'October 2026',
    badge: 'Data Protection',
  },
  {
    id: 'security',
    title: 'Security & Architecture',
    subtitle: 'Our technical, cryptographic, organizational, and physical safeguards for civil infrastructure data.',
    updatedDate: 'October 2026',
    badge: 'ISO 27001 & SOC-2',
  },
  {
    id: 'dpa',
    title: 'Data Processing Addendum (DPA)',
    subtitle: 'Contractual terms governing processor obligations, audit bundles, and statutory retention under NHAI/TPQM guidelines.',
    updatedDate: 'October 2026',
    badge: 'Compliance Addendum',
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use Policy',
    subtitle: 'Permitted conduct, anti-spoofing requirements, and professional structural engineering certification mandates.',
    updatedDate: 'October 2026',
    badge: 'Platform Rules',
  },
  {
    id: 'cookies',
    title: 'Cookie & Tracking Notice',
    subtitle: 'Transparent breakdown of necessary session tokens, cryptographic state, and analytical cookies.',
    updatedDate: 'October 2026',
    badge: 'Transparency',
  },
];

interface ClauseItem {
  id: string;
  num: string;
  heading: string;
  content: string[];
  takeaways?: string[];
  keyHighlight?: string;
}

const LEGAL_DOCUMENTS: Record<LegalTab, ClauseItem[]> = {
  terms: [
    {
      id: 'terms-definitions',
      num: '1',
      heading: 'Definitions & Scope of Agreement',
      content: [
        'These Terms of Service ("Agreement") govern the subscription, access, and use of OUANTUM Technologies Inc. ("OUANTUM", "we", "us", or "our") cloud platforms, edge terminal firmware (including OX1 Edge Copilot), automated non-destructive testing (NDT) analysis engines, and related services by you ("Customer", "Concessionaire", or "Consultant").',
        'By executing an Order Form, registering an administrative account, or accessing the OUANTUM platform, you confirm that you have read, understood, and agreed to be legally bound by this Agreement. If you are entering into this Agreement on behalf of a company, governmental entity, concessionaire, or joint venture, you represent that you possess the full legal authority to bind that entity.',
        '"Customer Data" means all field telemetry, rebound hammer test readings, ultrasonic pulse velocity (UPV) propagation transit times, core compression test results, geospatial coordinates, photogrammetric logs, BIM model geometries, and project documents ingested into the platform.',
      ],
      keyHighlight:
        'OUANTUM provides software and hardware intelligence for civil infrastructure quality assurance. Access is limited to authorized structural engineers and accredited audit teams.',
    },
    {
      id: 'terms-services',
      num: '2',
      heading: 'Platform Services & License Grant',
      content: [
        'Subject to the terms and conditions of this Agreement and timely payment of applicable subscription fees, OUANTUM grants Customer a non-exclusive, non-transferable, non-sublicensable worldwide license during the Subscription Term to access and utilize the OUANTUM platform for statutory civil quality auditing, NDT interpretation, and infrastructure health monitoring.',
        'OUANTUM continuously updates, enhances, and patches its cloud services and AI inference pipelines to incorporate updated Indian Standard (IS 456, IS 13311, IS 516), IRC, and MoRTH codes without additional license fees.',
        'High-Availability SLA: OUANTUM commits to maintaining at least 99.9% platform availability across monthly billing cycles, excluding scheduled maintenance announced 72 hours in advance.',
      ],
      takeaways: [
        'Commercial subscription includes automatic codal updates (IS 456, IRC:SP:51, MoRTH Section 1700)',
        'Guaranteed 99.9% availability backed by enterprise SLA service credits',
        'Offline edge-caching allows continuous data acquisition even in remote tunnel/highway terrains',
      ],
    },
    {
      id: 'terms-data-obligations',
      num: '3',
      heading: 'Customer Data & Quality Obligations',
      content: [
        'Customer retains exclusive ownership of and all intellectual property rights in Customer Data. OUANTUM claims zero proprietary ownership over your concrete test specimens, structural drawings, or failure analysis reports.',
        'Customer represents and warrants that all field data uploaded to OUANTUM represents bona fide measurements acquired using calibrated instruments adhering to relevant calibration certificates (NABL accredited laboratories).',
        'Anti-Tampering: Any intentional spoofing of geospatial coordinates, manipulation of raw UPV transit times, or injection of falsified rebound readings is strictly prohibited and constitutes a material breach entitling immediate account suspension.',
      ],
      keyHighlight:
        'You retain 100% intellectual property ownership of your civil projects and sensor datasets.',
    },
    {
      id: 'terms-ai-liability',
      num: '4',
      heading: 'Deterministic AI Reasoning & Structural Engineering Liability',
      content: [
        'OUANTUM utilizes deterministic physics-informed algorithms and triple-model consensus architectures to identify concrete strength anomalies and calculate compliance. These algorithms operate deterministically without generative hallucination.',
        'Crucial Professional Disclaimer: OUANTUM is an engineering decision-support tool. It does not replace the statutory authority of the Senior Structural Consultant, Chief Project Director, or accredited Third-Party Quality Monitor (TPQM). Final certification, structural commissioning, and approval of remedial repairs must be signed and authorized by an accredited human engineer.',
        'To the maximum extent permitted by applicable law, OUANTUM shall not be liable for structural catastrophic failures, contractor execution defects, or foundation settlements resulting from real-world site construction departures.',
      ],
      takeaways: [
        'Calculations follow deterministic mathematical equations grounded in IS and ASTM codes',
        'Final statutory sign-off remains with the accredited Professional Structural Engineer',
        'Cryptographic audit trails record which human engineer approved each calculation bundle',
      ],
    },
    {
      id: 'terms-billing',
      num: '5',
      heading: 'Subscription Term, Invoicing & Payment',
      content: [
        'Subscriptions are billed per project concession package, corridor mileage, or enterprise tier as specified in the Order Form. Invoices are payable within thirty (30) days of issue.',
        'Late payments shall bear interest at the rate of 1.5% per month or the maximum rate allowed by law. Failure to settle outstanding balances within 60 days may result in account restriction after formal notice.',
        'Taxes: All fees are exclusive of GST, VAT, withholding taxes, or other statutory duties applicable in the Republic of India or Customer’s jurisdiction.',
      ],
    },
    {
      id: 'terms-termination',
      num: '6',
      heading: 'Term, Suspension & Orderly Transition',
      content: [
        'This Agreement commences on the Effective Date and continues until all Order Forms have expired or been terminated.',
        'Either party may terminate this Agreement upon thirty (30) days written notice if the other party materially breaches any provision and fails to cure such breach within that period.',
        'Post-Termination Data Access: Upon request within sixty (60) days of termination, OUANTUM will provide Customer with complete, decrypted export bundles of all field logs, audit calculations, and inspection archives in standardized CSV/PDF/JSON formats.',
      ],
    },
  ],

  privacy: [
    {
      id: 'privacy-collection',
      num: '1',
      heading: 'Infrastructure Telemetry & Field Data Collection',
      content: [
        'OUANTUM collects and ingests field measurement datasets required for civil quality assurance. These include ultrasonic pulse velocity transit times, rebound hammer R-values, core compressive strength metrics, carbonation depths, half-cell potential voltages, and high-resolution crack imagery.',
        'We enforce strict data minimization: we do not collect personal consumer information or sensitive individual health data. User records are strictly limited to accredited engineer credentials (name, institutional email, professional council registration, and timestamped digital signatures).',
        'Geospatial Telemetry: When an engineer logs a field test via the OX1 terminal or mobile companion app, precise GPS coordinates and device timestamp attestations are recorded to prevent site location spoofing and guarantee audit authenticity.',
      ],
      keyHighlight:
        'Data collection is strictly restricted to structural parameters, test telemetry, and accredited engineer credentials.',
    },
    {
      id: 'privacy-no-training',
      num: '2',
      heading: 'Zero Foundational Model Training on Proprietary Data',
      content: [
        'Your structural drawings, reinforcement schedules, mix design formulas, and project vulnerability reports remain strictly confidential. OUANTUM explicitly guarantees that Customer Data is never pooled, transferred, or used to train public foundation models or shared with competing infrastructure concessionaires.',
        'Algorithmic processing operates inside dedicated, isolated tenant spaces. Statistical telemetry is processed deterministically according to statutory equations without leaking confidential corridor geometry.',
        'Audit integrity: All calculations are reproducible and verifiable against published national standards (e.g. IS 13311 Part 1 & Part 2).',
      ],
      takeaways: [
        'Guaranteed zero training of external or public AI models on your structural drawings or logs',
        'Isolated tenant databases with separate cryptographic encryption per infrastructure project',
        'Zero cross-contamination between state highway packages, rail viaducts, and private concessions',
      ],
    },
    {
      id: 'privacy-retention',
      num: '3',
      heading: 'Statutory Retention for Government TPQM Audits',
      content: [
        'Under guidelines issued by the National Highways Authority of India (NHAI), Ministry of Road Transport and Highways (MoRTH), and state Public Works Departments (PWD), structural quality logs must remain auditable for the entire concession lifecycle.',
        'OUANTUM stores raw sensor inputs, mathematical consensus logs, and signed verification certificates in an immutable, append-only repository for a statutory baseline of ten (10) years or the duration of the infrastructure concession contract.',
        'Any request for premature record erasure is subject to statutory audit holds and government contractual disclosure obligations.',
      ],
      keyHighlight:
        'Append-only 10-year archival safeguards concessionaires against retroactive audit disputes.',
    },
    {
      id: 'privacy-rights',
      num: '4',
      heading: 'Data Custody & Customer Rights',
      content: [
        'Customer administrators retain full custody over their project repositories. Project Directors can export data anytime in standard, open formats (JSON, CSV, PDF, and IFC BIM metadata).',
        'You have the right to request access, correction of engineer credentials, audit logs of platform access, and orderly decommissioning upon contract termination.',
        'Contact our Data Protection Officer: Inquiries regarding compliance, government subpoenas, or data custody may be submitted directly to legal@ouantum.com.',
      ],
    },
  ],

  security: [
    {
      id: 'security-zero-trust',
      num: '1',
      heading: 'Zero-Trust Architecture & Role-Based Access Control (RBAC)',
      content: [
        'OUANTUM is built on a zero-trust security paradigm: default access is denied until explicit programmatic permission is granted. Every API request, edge terminal sync, and dashboard query is authenticated, authorized, and logged.',
        'Role-Based Access Control (RBAC) tiers ensure separation of duties across Admin (System), Manager (Oversight), Field Engineer (Execution), and Third-Party Auditor (Read-Only). Field personnel cannot alter calibrated master equations or delete historical test points.',
        'Multi-Factor Authentication (MFA) is strictly mandatory for all administrative actions, bulk report exports, and cryptographic report sign-offs.',
      ],
      takeaways: [
        'Explicit zero-trust authorization on every edge sync and microservice endpoint',
        'Strict separation of duties between field test technicians and certifying structural engineers',
        'MFA required for statutory sign-offs and report certification generation',
      ],
    },
    {
      id: 'security-encryption',
      num: '2',
      heading: 'Cryptographic Standards & Data Encryption',
      content: [
        'Data in Transit: All communications between the OX1 edge hardware, field companion apps, and OUANTUM cloud services are encrypted using Transport Layer Security (TLS 1.3) with perfect forward secrecy.',
        'Data at Rest: All relational databases, object storage buckets, and backup snapshots are encrypted using AES-256 with encryption keys managed by dedicated Hardware Security Modules (HSMs) adhering to FIPS 140-2 Level 3.',
        'Immutable Digital Hashing: Every generated test certificate is stamped with a SHA-256 cryptographic hash anchored to the exact millisecond of upload, preventing post-facto alteration.',
      ],
      keyHighlight:
        'FIPS 140-2 Level 3 HSM key management and AES-256 encryption safeguard all telemetry at rest.',
    },
    {
      id: 'security-datacenter',
      num: '3',
      heading: 'Domestic Sovereign Infrastructure & Uptime SLAs',
      content: [
        'All OUANTUM production workloads, databases, and structural archives are deployed exclusively within Tier-4 datacenters located in the Republic of India (Mumbai and Chennai Availability Zones).',
        'Physical Security: Datacenters feature biometric access controls, 24/7 armed security, continuous CCTV monitoring, and multi-tier power redundancy.',
        'Business Continuity & Disaster Recovery: Automated real-time replication guarantees a Recovery Point Objective (RPO) under fifteen (15) minutes and a Recovery Time Objective (RTO) under one (1) hour.',
      ],
    },
    {
      id: 'security-audit',
      num: '4',
      heading: 'Vulnerability Management & Independent Audits',
      content: [
        'OUANTUM undergoes regular third-party penetration testing and vulnerability assessments conducted by CERT-In empaneled cybersecurity auditors.',
        'Automated static and dynamic application security testing (SAST/DAST) is integrated directly into our continuous integration pipeline.',
        'Security Incident Response: OUANTUM maintains a 24/7 dedicated Security Operations Center. In the unlikely event of a security incident affecting Customer Data, affected customers will be notified within twenty-four (24) hours.',
      ],
    },
  ],

  dpa: [
    {
      id: 'dpa-roles',
      num: '1',
      heading: 'Scope, Roles & Data Processing Terms',
      content: [
        'This Data Processing Addendum ("DPA") supplements the OUANTUM Terms of Service. Under applicable data protection frameworks (including India’s Digital Personal Data Protection Act and international standards), Customer acts as the Data Controller, and OUANTUM acts as the Data Processor.',
        'OUANTUM shall process Customer Data exclusively on behalf of and in accordance with documented lawful instructions received from Customer, and never for unauthorized third-party commercial uses.',
        'Categories of data include project engineer credentials, digital signatures, telemetry coordinates, and structural quality documentation.',
      ],
      keyHighlight:
        'OUANTUM acts solely as a Data Processor under Customer’s documented instructions.',
    },
    {
      id: 'dpa-subprocessors',
      num: '2',
      heading: 'Subprocessor Governance & Approved Vendors',
      content: [
        'Customer grants general authorization for OUANTUM to engage trusted cloud infrastructure providers (e.g. AWS Asia-Pacific Mumbai, Google Cloud India) to host platform workloads.',
        'All subprocessors are bound by written agreements imposing data protection standards no less protective than those contained in this DPA.',
        'OUANTUM publishes an active directory of subprocessors and notifies Customer at least thirty (30) days prior to onboarding any new cloud subprocessor.',
      ],
      takeaways: [
        'Subprocessors are restricted to sovereign cloud providers with Tier-4 certified facilities',
        '30-day advance notice for any infrastructure vendor additions',
        'Strict liability for any subprocessor failure to meet compliance standards',
      ],
    },
    {
      id: 'dpa-audits',
      num: '3',
      heading: 'Government TPQM Audits & Statutory Inquiries',
      content: [
        'In the event of an official quality audit by NHAI, Ministry of Railways, MoRTH, or multilateral funding institutions (World Bank, ADB), OUANTUM shall cooperate with Customer by generating verifiable compliance packages.',
        'Cryptographic audit packages include raw sensor dumps, calibration timestamps, algorithm version identifiers, and mathematical consensus logs.',
      ],
    },
  ],

  'acceptable-use': [
    {
      id: 'aup-standards',
      num: '1',
      heading: 'Permitted Infrastructure Audit Uses',
      content: [
        'The OUANTUM platform is designed exclusively for professional quality monitoring, non-destructive testing verification, crack characterization, and structural asset lifecycle estimation for bridges, expressways, tunnels, metro viaducts, and high-rise structures.',
        'All users must maintain valid accredited engineering credentials or operate under the direct supervision of an accredited Project Quality Manager.',
      ],
    },
    {
      id: 'aup-prohibitions',
      num: '2',
      heading: 'Strict Prohibitions & Anti-Tampering Rules',
      content: [
        'Users shall not: (a) deliberately input falsified rebound numbers or artificial acoustic wave velocities; (b) spoof device GPS coordinates to fabricate test locations; (c) attempt to reverse-engineer, decompile, or extract the weights of proprietary neural consensus models; (d) deploy automated scraping bots against the platform API without written authorization.',
        'Any attempt to circumvent cryptographic verification stamps or alter published audit certificates will result in permanent account termination and formal reporting to project concession authorities.',
      ],
      keyHighlight:
        'Zero tolerance for falsified field measurements or sensor data spoofing.',
    },
  ],

  cookies: [
    {
      id: 'cookies-overview',
      num: '1',
      heading: 'Cookie Categories & Telemetry Tracking',
      content: [
        'OUANTUM uses strictly necessary cookies to maintain secure sessions, store CSRF tokens, and remember user role permissions. These cookies are essential for the operation of the web dashboard.',
        'We do not employ third-party advertising cookies, cross-site trackers, or behavioral profiling scripts.',
        'Performance & Diagnostics: Aggregated performance telemetry (such as page load latencies and edge sync durations) is collected to ensure reliable operation on slow remote construction 4G connections.',
      ],
      takeaways: [
        'Zero third-party advertising or cross-site tracking cookies',
        'Essential cookies only used for secure authentication and CSRF defense',
        'Performance metrics measure network latency to improve field sync reliability',
      ],
    },
  ],
};

const TermsAndPolicies: React.FC<{ initialTab?: LegalTab }> = ({ initialTab = 'terms' }) => {
  const location = useLocation();

  // Determine active tab from URL query, hash, or prop
  const activeTab: LegalTab = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const queryTab = params.get('tab') as LegalTab;
    if (queryTab && TABS.some((t) => t.id === queryTab)) return queryTab;

    const hash = location.hash.replace('#', '') as LegalTab;
    if (hash && TABS.some((t) => t.id === hash)) return hash;

    // Check pathname: /privacy -> privacy, /security -> security
    if (location.pathname.includes('/privacy')) return 'privacy';
    if (location.pathname.includes('/security')) return 'security';
    if (location.pathname.includes('/dpa')) return 'dpa';

    return initialTab;
  }, [location, initialTab]);

  const [currentTab, setCurrentTab] = useState<LegalTab>(activeTab);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  const activeDocConfig = TABS.find((t) => t.id === currentTab) || TABS[0];
  const activeClauses = LEGAL_DOCUMENTS[currentTab] || [];

  // Filter clauses by search term
  const filteredClauses = useMemo(() => {
    if (!searchFilter.trim()) return activeClauses;
    const q = searchFilter.toLowerCase();
    return activeClauses.filter(
      (c) =>
        c.heading.toLowerCase().includes(q) ||
        c.content.some((p) => p.toLowerCase().includes(q)) ||
        c.takeaways?.some((t) => t.toLowerCase().includes(q))
    );
  }, [activeClauses, searchFilter]);

  useSEO({
    title: `${activeDocConfig.title} | OUANTUM Legal & Compliance Hub`,
    description: activeDocConfig.subtitle,
    keywords:
      'OUANTUM legal terms, terms of service, privacy policy, security standards, ISO 27001, civil infrastructure compliance, NHAI audit terms',
    canonicalPath: '/legal/terms-and-policies',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <main
      className="subpage-wrapper"
      style={{
        background: '#ffffff',
        color: '#111111',
        minHeight: '100vh',
        paddingBottom: '0',
      }}
    >
      {/* =========================================================================
          TOP HEADER (Intercom style breadcrumb + clean bold title)
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(120px, 14vw, 150px)',
          paddingBottom: 'clamp(28px, 4vw, 40px)',
          background: '#ffffff',
          borderBottom: 'none',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--ic-font-sans)',
              fontSize: '0.85rem',
              color: '#6a7282',
              marginBottom: '16px',
            }}
          >
            <Link to="/" style={{ color: '#6a7282', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ color: '#111111', fontWeight: 500 }}>Legal & Policies</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#111111',
                  margin: '0 0 12px 0',
                }}
              >
                Terms and Policies
              </h1>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                  lineHeight: 1.5,
                  color: '#4a5565',
                  margin: 0,
                  maxWidth: '720px',
                }}
              >
                Clear, transparent terms governing our civil infrastructure intelligence platform, <span className="ic-text-highlight">data protection</span>, and <span className="ic-text-highlight">security architecture</span>.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handlePrint}
                className="ic-btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '9px 18px',
                  fontSize: '0.85rem',
                  borderRadius: 0,
                }}
                title="Print or save as PDF"
              >
                <span>Print Document</span>
              </button>

              <a
                href="mailto:legal@ouantum.com?subject=Legal%20Inquiry%20-%20OUANTUM"
                className="ic-btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '9px 20px',
                  fontSize: '0.85rem',
                  borderRadius: 0,
                }}
              >
                <span>Contact Legal</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN TWO-COLUMN LEGAL HUB (Intercom signature: Sticky Left Nav + Content Right)
          ========================================================================= */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 16px 100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 4vw, 56px)',
            alignItems: 'flex-start',
          }}
        >
          {/* =====================================================================
              LEFT SIDEBAR: STICKY POLICIES NAVIGATION
              ===================================================================== */}
          <aside
            style={{
              gridColumn: 'span 4',
              position: 'sticky',
              top: '100px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            className="legal-sidebar-col"
          >
            {/* Search Box */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Search clauses or terms..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.85rem',
                  border: 'none',
                  borderRadius: 0,
                  background: '#f8f8f6',
                  color: '#111111',
                  outline: 'none',
                  transition: 'background 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = '#f0f0ed';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = '#f8f8f6';
                }}
              />
            </div>

            {/* Document Navigation Tabs */}
            <nav
              aria-label="Legal policies list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                background: '#f8f8f6',
                padding: '8px',
                borderRadius: 0,
                border: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#6a7282',
                  padding: '8px 12px 4px',
                  display: 'block',
                }}
              >
                All Policies & Agreements
              </span>

              {TABS.map((tab) => {
                const isSelected = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setCurrentTab(tab.id);
                      setSearchFilter('');
                      window.history.replaceState(null, '', `?tab=${tab.id}`);
                    }}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 0,
                      border: 'none',
                      background: isSelected ? '#ffffff' : 'transparent',
                      color: isSelected ? '#111111' : '#4a5565',
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '0.925rem',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: 'none',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                        e.currentTarget.style.color = '#111111';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#4a5565';
                      }
                    }}
                  >
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Contact & Audit Trust Box */}
            <div
              style={{
                background: '#f8f8f6',
                border: 'none',
                borderRadius: 0,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#111111',
                  }}
                >
                  Statutory Trust
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.5,
                  color: '#6a7282',
                  margin: 0,
                }}
              >
                Compliant with IS 456, IS 13311, MoRTH Section 1700, and domestic Tier-4 data sovereignty requirements.
              </p>
              <a
                href="mailto:legal@ouantum.com"
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#111111',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                legal@ouantum.com
              </a>
            </div>
          </aside>

          {/* =====================================================================
              RIGHT COLUMN: ACTIVE POLICY DOCUMENT
              ===================================================================== */}
          <section
            style={{
              gridColumn: 'span 8',
              minWidth: 0,
            }}
            className="legal-content-col"
          >
            {/* Document Header */}
            <div
              style={{
                paddingBottom: '32px',
                marginBottom: '36px',
                borderBottom: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#111111',
                    background: '#f4f3ec',
                    padding: '4px 10px',
                    borderRadius: 0,
                  }}
                >
                  {activeDocConfig.badge}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--ic-font-sans)',
                    fontSize: '0.85rem',
                    color: '#6a7282',
                  }}
                >
                  Last Updated: {activeDocConfig.updatedDate}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  color: '#111111',
                  margin: '0 0 12px 0',
                }}
              >
                {activeDocConfig.title}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: '#4a5565',
                  margin: 0,
                }}
              >
                {activeDocConfig.subtitle}
              </p>
            </div>

            {/* Clauses List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {filteredClauses.map((clause) => (
                <article
                  key={clause.id}
                  id={clause.id}
                  style={{
                    scrollMarginTop: '120px',
                    paddingBottom: '24px',
                    borderBottom: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ic-font-sans)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#111111',
                        opacity: 0.4,
                      }}
                    >
                      {clause.num}.
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: '1.5rem',
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                        lineHeight: 1.25,
                        color: '#111111',
                        margin: 0,
                      }}
                    >
                      {clause.heading}
                    </h3>
                  </div>

                  {/* Body Paragraphs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
                    {clause.content.map((p, idx) => (
                      <p
                        key={idx}
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          color: '#334155',
                          margin: 0,
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Key Callout Highlight */}
                  {clause.keyHighlight && (
                    <div
                      style={{
                        background: '#f4f3ec',
                        padding: '16px 20px',
                        borderRadius: 0,
                        border: 'none',
                        marginBottom: '18px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--ic-font-sans)',
                          fontSize: '0.925rem',
                          lineHeight: 1.6,
                          fontWeight: 600,
                          color: '#111111',
                          display: 'block',
                        }}
                      >
                        {clause.keyHighlight}
                      </span>
                    </div>
                  )}

                  {/* Bullet Takeaways */}
                  {clause.takeaways && clause.takeaways.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginTop: '16px',
                        padding: '16px',
                        background: '#f8f8f6',
                        border: 'none',
                        borderRadius: 0,
                      }}
                    >
                      {clause.takeaways.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              fontFamily: 'var(--ic-font-sans)',
                              fontSize: '0.9rem',
                              lineHeight: 1.55,
                              color: '#334155',
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}

              {filteredClauses.length === 0 && (
                <div
                  style={{
                    padding: '60px 16px',
                    textAlign: 'center',
                    background: '#f8f8f6',
                    borderRadius: 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--ic-font-sans)',
                      fontSize: '1rem',
                      color: '#6a7282',
                      margin: '0 0 16px',
                    }}
                  >
                    No clauses matched your search query "{searchFilter}".
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchFilter('')}
                    className="ic-btn-secondary"
                    style={{ padding: '8px 18px', fontSize: '0.875rem', borderRadius: 0 }}
                  >
                    Reset search
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Escalation & Support */}
            <div
              style={{
                marginTop: '64px',
                padding: '32px',
                background: '#f4f3ec',
                borderRadius: 0,
                border: 'none',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Saans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontSize: '1.35rem',
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  color: '#111111',
                  margin: '0 0 8px 0',
                }}
              >
                Questions or Custom Enterprise DPA Requests?
              </h3>
              <p
                style={{
                  fontFamily: 'var(--ic-font-sans)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#4a5565',
                  margin: '0 0 20px 0',
                }}
              >
                For highway concessionaires, metro rail authorities, or TPQM agencies requiring customized compliance addenda, please contact our legal counsel.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="mailto:legal@ouantum.com"
                  className="ic-btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.9rem', borderRadius: 0 }}
                >
                  Email legal@ouantum.com
                </a>
                <Link
                  to="/contact"
                  className="ic-btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: 0 }}
                >
                  Contact Quality Team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsAndPolicies;
