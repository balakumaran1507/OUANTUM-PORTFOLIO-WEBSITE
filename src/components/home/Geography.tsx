import { useState, useEffect } from 'react'
import Globe3D from '../common/Globe3D'

const regions = [
  { name: 'AMARAVATI', cities: 'Capital Region · Guntur · Vijayawada', node: 'IN_01', status: 'ACTIVE' },
  { name: 'TAMIL NADU', cities: 'Chennai · Thanjavur · Karaikudi', node: 'IN_02', status: 'ACTIVE' },
  { name: 'KERALA', cities: 'Kochi · Trivandrum', node: 'IN_03', status: 'STABLE' },
  { name: 'KARNATAKA', cities: 'Bengaluru · Mangaluru', node: 'IN_04', status: 'STABLE' },
  { name: 'MADHYA PRADESH', cities: 'Bhopal · Indore', node: 'IN_05', status: 'STABLE' },
  { name: 'PAN-INDIA', cities: 'Government Infrastructure Grid', node: 'IN_00', status: 'ACTIVE' },
]

const Geography = () => {
  const [telemetrySeed, setTelemetrySeed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetrySeed(s => s + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="geography-section section-padding" id="geography">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">TARGET GEOGRAPHY</h2>
        </div>

        <div className="geography-grid">
          {/* Regions list card */}
          <div className="geography-regions-card">
            {/* Header removed */}

            <div className="regions-list custom-scrollbar">
              {regions.map((region, idx) => (
                <div key={idx} className="region-row">
                  <div className="region-info">
                    <div className="region-icon">
                      <div className="pulse-dot"></div>
                    </div>
                    <div className="region-main-content">
                      <div className="region-top">
                        <span className="region-name">{region.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="region-status-badge">
                    <div className="latency-box">
                      <span className="status-value">
                        {((idx * 7 + telemetrySeed) % 15) + 3}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Footer removed */}
          </div>

          {/* Globe visualization card */}
          <div className="geography-globe-card">
            <div className="globe-overlay-top"></div>

            <div className="globe-container">
              <Globe3D offsetX={0} />
            </div>

            <div className="globe-overlay-bottom"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Geography
