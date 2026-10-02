import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import ScrollReveal from '@/components/common/ScrollReveal'

interface DifferenceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Difference = () => {
  const [activeId, setActiveId] = useState<string>('1');

  const items: DifferenceItem[] = [
    {
      id: '1',
      title: 'NOT A DATA PROBLEM',
      description: "Most AI tools treat construction testing as a data problem. It isn't. It's a contextual judgment problem requiring multi-variable structural validation.",
      image: '/assets/images/cards_images/1.png',
    },
    {
      id: '2',
      title: 'CONTEXT IS EVERYTHING',
      description: "A reading of 32 means something completely different on a 30-year-old coastal building versus a freshly cast M25 column inland.",
      image: '/assets/images/cards_images/2.png',
    },
    {
      id: '3',
      title: 'VARIABLES REQUIRED',
      description: "Every variable is a required input. The system refuses to give you a result without the context that makes the result meaningful.",
      image: '/assets/images/cards_images/3.png',
    },
    {
      id: '4',
      title: 'EMBEDDED EXPERTISE',
      description: "That's not a software decision. That's a 30-year-structural-engineer decision, embedded directly into standard compliance workflows.",
      image: '/assets/images/cards_images/4.png',
    },
  ];

  return (
    <section id="difference" className="difference section-padding" style={{ background: '#000000', color: '#ffffff' }}>
      <div className="container">
        <h2
          className="section-title"
          style={{
            fontFamily: 'var(--font-geist)',
            fontWeight: 200,
            lineHeight: 0.9,
            color: '#ffffff',
            marginBottom: '4rem',
            textTransform: 'none',
          }}
        >
          Why Choose<br />OUANTUM
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  transition: 'background 0.3s ease',
                }}
              >
                {/* Header Row */}
                <button
                  onClick={() => setActiveId(isOpen ? '' : item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-geist)',
                        fontSize: 'clamp(1.75rem, 3.8vw, 3.2rem)',
                        fontWeight: 200,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        margin: 0,
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                      color: isOpen ? '#000000' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {isOpen ? (
                      <ArrowDown size={22} />
                    ) : (
                      <ArrowUpRight size={22} />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingTop: '20px', paddingLeft: '0px' }}>
                        <ScrollReveal
                          textColor="#ffffff"
                          baseOpacity={0.35}
                          style={{
                            fontFamily: 'var(--font-main)',
                            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                            lineHeight: 1.6,
                            maxWidth: '720px',
                            marginBottom: '32px',
                          }}
                        >
                          {item.description}
                        </ScrollReveal>

                        <div
                          style={{
                            width: '100%',
                            maxHeight: '480px',
                            borderRadius: '0px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              maxHeight: '480px',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </div>
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
  );
};

export default Difference;


