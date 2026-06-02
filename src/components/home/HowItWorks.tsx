import { Activity, CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

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
  { element: 'Column C-12 / B3', reading: 'RH: 32 | UPV: 3.8 km/s', code: 'IS 13311', status: 'PASS', color: '#10B981', icon: CheckCircle },
  { element: 'Slab S-04 / B3', reading: 'RH: 24 | UPV: 3.1 km/s', code: 'IS 13311', status: 'CONCERN', color: '#F59E0B', icon: AlertTriangle },
  { element: 'Column C-07 / B2', reading: 'RH: 19 | UPV: 2.7 km/s', code: 'IS 456', status: 'FAIL', color: '#EF4444', icon: XCircle },
  { element: 'Beam B-11 / B4', reading: 'RH: 34 | UPV: 4.1 km/s', code: 'IS 13311', status: 'PASS', color: '#10B981', icon: CheckCircle },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ background: '#000', padding: '120px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
            }}>
              THE FLOW
            </span>
            <h2 style={{
              fontFamily: 'var(--font-adieu)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1,
              color: '#fff',
              margin: 0
            }}>
              HOW IT WORKS
            </h2>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textAlign: 'right', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={16} color="#10B981" />
            <span>SYSTEM ARCHITECTURE OVERVIEW</span>
          </div>
        </div>

        {/* Steps Horizontal Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#000000',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {i < steps.length - 1 && (
                <ArrowRight size={20} color="rgba(255,255,255,0.2)" style={{ position: 'absolute', top: '2.5rem', right: '2.5rem' }} />
              )}

              <h3 style={{
                fontFamily: 'var(--font-adieu)',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '0.5rem',
                letterSpacing: '0.02em',
                position: 'relative',
                zIndex: 1
              }}>{step.title}</h3>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1
              }}>{step.sub}</div>

              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6,
                textTransform: 'uppercase',
                marginBottom: '2rem',
                flexGrow: 1,
                position: 'relative',
                zIndex: 1
              }}>{step.description}</p>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.8)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '1rem',
                position: 'relative',
                zIndex: 1
              }}>+ {step.detail}</div>
            </div>
          ))}
        </div>

        {/* Dashboard/Table Section */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.15)',
          background: '#000000',
          borderRadius: '24px',
          overflow: 'hidden'
        }}>
          {/* Dashboard Header */}
          <div style={{
            background: '#111',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ letterSpacing: '0.1em' }}>OUANTUM_TELEMETRY_VIEW</span>
            </div>
          </div>

          {/* Table */}
          <div className="telemetry-table-wrapper" style={{ width: '100%', overflowX: 'auto' }}>
            <table className="telemetry-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.7)'
            }}>
              <thead className="telemetry-thead">
                <tr>
                  <th style={{ padding: '1.5rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 'normal', letterSpacing: '0.1em', width: '25%' }}>ELEMENT ID</th>
                  <th style={{ padding: '1.5rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 'normal', letterSpacing: '0.1em', width: '35%' }}>TEST READINGS</th>
                  <th style={{ padding: '1.5rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 'normal', letterSpacing: '0.1em', width: '20%' }}>REFERENCE CODE</th>
                  <th style={{ padding: '1.5rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 'normal', letterSpacing: '0.1em', width: '20%' }}>AI VERDICT</th>
                </tr>
              </thead>
              <tbody className="telemetry-tbody">
                {tableRows.map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <tr className="telemetry-row" key={i} style={{ 
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                      transition: 'background 0.2s',
                    }}>
                      <td className="telemetry-cell" data-label="ELEMENT ID" style={{ padding: '1.5rem', color: '#fff' }}>{row.element}</td>
                      <td className="telemetry-cell" data-label="TEST READINGS" style={{ padding: '1.5rem', color: 'rgba(255,255,255,0.5)' }}>{row.reading}</td>
                      <td className="telemetry-cell" data-label="REFERENCE CODE" style={{ padding: '1.5rem' }}>
                        <span style={{ 
                          background: 'rgba(255,255,255,0.05)', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '2px',
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '0.8rem'
                        }}>
                          {row.code}
                        </span>
                      </td>
                      <td className="telemetry-cell" data-label="AI VERDICT" style={{ padding: '1.5rem' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '30px',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          <Icon size={14} color="#ffffff" />
                          <span style={{ fontWeight: 'normal', letterSpacing: '0.05em' }}>{row.status}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
