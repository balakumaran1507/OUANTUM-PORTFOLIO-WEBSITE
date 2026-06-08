export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  publishedTime: string; // ISO 8601
  author: string;
  authorRole: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  readingTime: string;
  tags: string[];
  content: BlogSection[];
}

interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'quote' | 'list';
  text?: string;
  items?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-sonreb-correlation-transforms-ndt-analysis',
    title: 'Why SonReb Correlation Transforms NDT Analysis for Indian Construction',
    date: 'June 5, 2026',
    publishedTime: '2026-06-05T09:00:00+05:30',
    author: 'Balakumaran D',
    authorRole: 'President, Ouantum',
    excerpt:
      'Manual NDT analysis forces engineers to treat Rebound Hammer and UPV readings as isolated data points. The SonReb method unifies both, delivering a statistically stronger concrete strength estimate — and Ouantum runs it automatically, in the field, on every element.',
    coverImage: '/assets/images/bg2.jpg',
    coverImageAlt: 'NDT field engineer running ultrasonic pulse velocity test on concrete column at an Indian infrastructure site',
    readingTime: '7 min read',
    tags: ['NDT', 'SonReb', 'IS 13311', 'concrete strength', 'quality assurance'],
    content: [
      {
        type: 'paragraph',
        text: 'Every civil quality engineer in India knows the frustration: you run a Rebound Hammer test on a column, get a value of 34, and then spend the next hour debating whether the reading is valid given the surface carbonation, the curing age, and the specified grade. Then you run a Ultrasonic Pulse Velocity test and get a conflicting signal. Which reading do you trust?',
      },
      {
        type: 'heading',
        text: 'The Problem with Isolated NDT Readings',
      },
      {
        type: 'paragraph',
        text: 'IS 13311 (Part 1 and Part 2) governs both UPV and Rebound Hammer testing in India. What the standard does not automate is the synthesis. A Rebound Hammer reading of 32 on a 90-day-old M30 column in a coastal exposure zone means something entirely different from the same reading on a freshly cast M25 column inland. Age, exposure condition, cement type, curing quality — all of these are required context before a single reading can be meaningfully interpreted.',
      },
      {
        type: 'paragraph',
        text: 'The consequence of ignoring this context is not just imprecision. It is structural risk. Engineers who work from tables and rules of thumb — even good engineers — cannot hold six interdependent variables in mind simultaneously across 300 data points per bi-weekly site visit.',
      },
      {
        type: 'heading',
        text: 'What SonReb Actually Does',
      },
      {
        type: 'paragraph',
        text: 'The SonReb method, developed by Gasparik and refined through decades of European and Indian structural research, combines Rebound Hammer (R) and Ultrasonic Pulse Velocity (V) readings into a single, more reliable estimate of in-situ concrete compressive strength. The general form is:',
      },
      {
        type: 'quote',
        text: 'fc = a · V^b · R^c — where a, b, and c are empirically calibrated coefficients that account for cement type, aggregate characteristics, and curing conditions.',
      },
      {
        type: 'paragraph',
        text: 'The key insight is that UPV is sensitive to concrete density and homogeneity, while Rebound is sensitive to surface hardness and near-surface properties. Neither alone gives you the full picture. Together, calibrated against IS standards and the specific concrete mix design, they produce a combined estimate that is statistically superior to either test in isolation — reducing the standard error from approximately ±25% to ±15% when properly calibrated.',
      },
      {
        type: 'heading',
        text: 'The Calibration Problem — and How Ouantum Solves It',
      },
      {
        type: 'paragraph',
        text: 'The reason SonReb has not been widely adopted in Indian construction practice is not conceptual resistance — it is the calibration burden. The coefficients a, b, and c are not universal. They depend on the cement type, water-cement ratio, aggregate grading, and curing regime. Developing project-specific calibration curves requires destructive core testing and lab verification — a process that is expensive and time-consuming when done manually.',
      },
      {
        type: 'paragraph',
        text: 'Ouantum\'s NDT Analysis Engine automates the calibration selection. Based on the context fields entered at data collection — concrete grade, cement type, exposure condition, age of element — the engine selects the appropriate coefficient set from a calibrated database built in collaboration with NABL-accredited lab partners. This means every field engineer using Ouantum gets a calibrated SonReb estimate without needing to understand the underlying regression model.',
      },
      {
        type: 'heading',
        text: 'What This Means in Practice',
      },
      {
        type: 'list',
        items: [
          'An M25 column with RH = 34 and UPV = 3.8 km/s at 28 days gets a SonReb estimate of approximately 26.3 MPa — below the characteristic strength, flagged immediately.',
          'The same readings on an M20 column at 90 days map to a different calibration curve and produce a different result — context-aware from the first data entry.',
          'Outlier readings (RH too high relative to UPV, suggesting surface carbonation) are flagged separately, with a recommendation for core sampling.',
          'All three values — RH, UPV, and SonReb estimate — are logged against the specific element, floor, block, and project, creating a complete audit trail.',
        ],
      },
      {
        type: 'heading',
        text: 'The Compliance Connection',
      },
      {
        type: 'paragraph',
        text: 'For Third-Party Quality Monitors (TPQM) working on government and ADB-funded projects, the audit trail is as important as the finding itself. The Tamil Nadu Housing Board, Amaravati Capital Region Development Authority, and ADB project formats all require documented IS code references alongside test findings. Ouantum generates these automatically — the SonReb estimate, the applicable IS code clause, and the pass/concern/fail classification — in the exact government report format required.',
      },
      {
        type: 'paragraph',
        text: 'The result is a structural finding that is not just technically defensible but legally and procedurally compliant — ready for engineer sign-off within the same day as the site visit.',
      },
    ],
  },
  {
    slug: 'from-manual-chaos-to-same-day-reports-tpqm-workflow',
    title: 'From Manual Chaos to Same-Day Reports: Transforming the TPQM Workflow',
    date: 'May 28, 2026',
    publishedTime: '2026-05-28T09:00:00+05:30',
    author: 'Rahul',
    authorRole: 'Chief Executive Officer, Ouantum',
    excerpt:
      'A bi-weekly site visit on a 4,000-unit government housing project generates 150–300 data points. Manually processing these into a compliant TPQM report takes 40–60 hours. Here is exactly what that process looks like — and how Ouantum collapses it to under 4 hours.',
    coverImage: '/assets/images/bg4.jpg',
    coverImageAlt: 'Civil engineer reviewing government format quality assurance report on a large housing project site in Tamil Nadu',
    readingTime: '9 min read',
    tags: ['TPQM', 'government reporting', 'workflow', 'Amaravati', 'Tamil Nadu Housing Board'],
    content: [
      {
        type: 'paragraph',
        text: 'Third-Party Quality Monitoring (TPQM) is the backbone of accountability in India\'s government-funded construction sector. Whether it\'s PMAY housing funded by the Asian Development Bank, the Amaravati Capital City development, or Tamil Nadu Housing Board\'s multi-block residential complexes, every major government project mandates an independent TPQM consultant whose bi-weekly reports are the record of quality across the life of the build.',
      },
      {
        type: 'heading',
        text: 'The Manual Reality',
      },
      {
        type: 'paragraph',
        text: 'Here is what a standard bi-weekly site visit on a 4,000-unit project looks like today — before Ouantum.',
      },
      {
        type: 'list',
        items: [
          'Day 1–2 (Site): Field engineers visit each block and element. Readings — Rebound Hammer, UPV, carbonation depth, chloride content, half-cell potential, slump, cube strength — are recorded on paper forms or, if the team is progressive, an Excel template on a tablet.',
          'Day 3–5 (Lab): Paper forms are sent to a NABL-accredited lab. Lab technicians transcribe readings, run calculations, and return preliminary results. Data from different blocks arrives at different times.',
          'Day 6–10 (Analysis): A senior engineer manually cross-references every reading against the applicable IS codes. IS 456 for concrete, IS 13311 for NDT, IS 1786 for rebar. Each value is checked individually. Non-conformances are noted in a separate log.',
          'Day 11–14 (Report): The report is assembled in Microsoft Word. Element-wise findings are written manually. IS code references are typed. Photos are inserted one by one. The report is reviewed, formatted, and sent for digital sign-off.',
        ],
      },
      {
        type: 'paragraph',
        text: 'On a project with 150–300 data points per visit, this process consumes 40–60 hours of qualified senior engineer time per fortnight. On a project with 13 blocks and bi-weekly visits, you are looking at over 1,200 person-hours per year — just for documentation.',
      },
      {
        type: 'heading',
        text: 'Where It Breaks Down',
      },
      {
        type: 'paragraph',
        text: 'The manual process doesn\'t just waste time. It introduces structural risk at four specific points.',
      },
      {
        type: 'list',
        items: [
          'Data entry errors: Handwritten readings are misread during transcription. A rebound value of 34 becomes 24 or 43. These errors are rarely caught before the report is submitted.',
          'IS code misapplication: Senior engineers know the main clauses of IS 456. But knowing whether clause 16.1 or 17.3 applies to a specific reading under a specific exposure condition — for all 300 data points — is a different challenge. Values that are borderline get a pass because the lookup is slow and the engineer is pressured to complete the report.',
          'No cross-element pattern detection: If a specific contractor is consistently borderline on column concrete grade across three blocks, the manual review process will not surface it. The reviewer looks at one report at a time, not at longitudinal trends.',
          'Government format compliance: Each authority — TNHB, APCRDA, ADB — has a specific report format. Field labels differ. Section order differs. Required IS code references differ. Assembling these formats manually is time-consuming and error-prone.',
        ],
      },
      {
        type: 'heading',
        text: 'How Ouantum Changes the Workflow',
      },
      {
        type: 'paragraph',
        text: 'The Ouantum platform restructures the TPQM workflow at the point of data collection — not at the reporting stage. This is the key design decision.',
      },
      {
        type: 'paragraph',
        text: 'When a field engineer opens the Ouantum mobile interface on-site, they do not open a form. They open a project structure: project → block → structural element. Every reading is tied to a specific element from the moment of entry. The context — concrete grade specified, age, exposure condition, cement type — is entered once per element and flows through to every subsequent calculation.',
      },
      {
        type: 'quote',
        text: 'Data is structured at the point of collection, not reconstructed after the fact. This is the difference between a 4-hour report and a 14-day report.',
      },
      {
        type: 'heading',
        text: 'The Processing Layer',
      },
      {
        type: 'paragraph',
        text: 'Once data is entered, Ouantum\'s calculation engine runs immediately. SonReb correlation for NDT readings. Carbonation service life via the Tuutti model. Chloride diffusion coefficient. Half-cell probability mapping per ASTM C876. Every result is checked against the applicable IS code clause — automatically, without the engineer opening a standard.',
      },
      {
        type: 'paragraph',
        text: 'Three AI models then independently assess the computed findings. Model A checks hard IS code limits. Model B evaluates structural safety margin in context. Model C compares against historical data from the same project, contractor, and material batch. All three must reach consensus before a result is confirmed. Disagreements are flagged for senior engineer review — not silently passed.',
      },
      {
        type: 'heading',
        text: 'The Report',
      },
      {
        type: 'paragraph',
        text: 'The government-format PDF is auto-generated at the end of the site visit. Element-wise findings, IS code references, condition grading (Good / Satisfactory / Poor / Critical), photographic placeholders, and recommendations are assembled automatically in the exact format required by the relevant authority. The lead engineer reviews, makes any expert amendments, and applies a digital signature — the same day as the site visit.',
      },
      {
        type: 'list',
        items: [
          'Total time for 300 data points: under 4 hours, including site travel.',
          'Zero manual IS code lookup required.',
          'Complete audit trail: every reading timestamped, every AI inference logged, every engineer override recorded.',
          'Pattern intelligence: contractor trends and material batch anomalies surface automatically across the project lifecycle.',
        ],
      },
      {
        type: 'heading',
        text: 'Proven at Scale',
      },
      {
        type: 'paragraph',
        text: 'This workflow has been validated on the Amaravati Capital City project — covering the AP High Court building, 4,000 residential units, and the 45-storey Integrated Secretariat complex. It has been used for Tamil Nadu Housing Board projects and ADB-funded PMAY schemes across multiple construction stages. The methodology embedded in Ouantum was developed by Er. Kalaimony, who personally led TPQM operations on these projects over a 23-year career at TANGEDCO and IIT Madras CUBE.',
      },
      {
        type: 'paragraph',
        text: 'The manual TPQM workflow is not a knowledge problem. The engineers are good. It is a systems problem. Ouantum is the system.',
      },
    ],
  },
];
