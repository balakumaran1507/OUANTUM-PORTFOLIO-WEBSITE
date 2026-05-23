

const steps = [
  {
    num: '01',
    title: 'FIELD DATA IN',
    sub: 'MOBILE ENTRY · STRUCTURED INTAKE',
    description: 'Field engineer opens Ouantum on-site. Selects project → block → structural element. Enters test readings - rebound values, UPV transit times, carbonation depths - tied to the exact location.',
    detail: 'Works on 4G. No paper. No back-office transcription.',
  },
  {
    num: '02',
    title: 'AI ANALYSIS',
    sub: 'IS CODE · MULTI-MODEL CONSENSUS',
    description: 'Deterministic calculations run instantly - SonReb correlation, carbonation service life, chloride diffusion. Three AI models independently validate against IS codes and structural context.',
    detail: 'All three must agree. Disagreement triggers expert review.',
  },
  {
    num: '03',
    title: 'REPORT OUT',
    sub: 'GOVERNMENT-FORMAT · SAME DAY',
    description: 'Full government-format PDF auto-generated. Element findings, IS code compliance status, condition grading, and recommendations. Ready for senior engineer review and digital sign-off within the hour.',
    detail: 'Amaravati format. TNHB format. ADB format. Auto-selected.',
  },
];

const tableRows = [
  { element: 'Column C-12 / B3', reading: 'RH: 32 | UPV: 3.8 km/s', code: 'IS 13311', status: 'PASS', color: '#10B981' },
  { element: 'Slab S-04 / B3', reading: 'RH: 24 | UPV: 3.1 km/s', code: 'IS 13311', status: 'CONCERN', color: '#F59E0B' },
  { element: 'Column C-07 / B2', reading: 'RH: 19 | UPV: 2.7 km/s', code: 'IS 456', status: 'FAIL', color: '#EF4444' },
  { element: 'Beam B-11 / B4', reading: 'RH: 34 | UPV: 4.1 km/s', code: 'IS 13311', status: 'PASS', color: '#10B981' },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ background: '#000', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
          }}>
            THE FLOW
          </span>
          <h2 style={{
            fontFamily: 'var(--font-adieu)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
          }}>
            HOW IT WORKS
          </h2>
        </div>

        <div className="how-it-works-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Vertical Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                borderLeft: '1px solid rgba(255,255,255,0.2)',
                paddingLeft: '2rem',
                paddingBottom: '2rem',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-16px',
                  top: '0',
                  background: '#000',
                  padding: '4px 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)'
                }}>{step.num}</div>

                <h3 style={{
                  fontFamily: 'var(--font-adieu)',
                  fontSize: '1.25rem',
                  color: '#fff',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.02em'
                }}>{step.title}</h3>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '1rem'
                }}>{step.sub}</div>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}>{step.description}</p>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: '#fff',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '1rem'
                }}>{step.detail}</div>
              </div>
            ))}
          </div>

          {/* Stark Data Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <thead>
                <tr style={{ background: '#111111' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', letterSpacing: '0.1em' }}>ELEMENT</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', letterSpacing: '0.1em' }}>READING</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', letterSpacing: '0.1em' }}>IS CODE</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#fff', letterSpacing: '0.1em' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: i % 2 === 0 ? '#000' : '#050505' }}>
                    <td style={{ padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>{row.element}</td>
                    <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.5)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>{row.reading}</td>
                    <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.5)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>{row.code}</td>
                    <td style={{ padding: '1rem', color: row.color, fontWeight: 'bold' }}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
