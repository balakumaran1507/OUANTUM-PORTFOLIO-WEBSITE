import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessScreenProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  title = 'VALIDATION COMPLETE', 
  message = 'SYSTEM HAS REACHED CONSENSUS. NO ANOMALIES DETECTED.',
  actionText = 'CONTINUE WORKFLOW',
  onAction
}) => {
  return (
    <div className="animated-silver-bg" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: '4rem',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
      width: '100%'
    }}>
      <div style={{ marginBottom: '2rem', color: '#10B981' }}>
        <CheckCircle size={56} />
      </div>
      <h3 style={{ 
        fontFamily: 'var(--font-adieu)', 
        fontSize: '1.5rem', 
        color: '#fff', 
        marginBottom: '1rem',
        letterSpacing: '0.1em'
      }}>
        {title}
      </h3>
      <p style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '0.85rem', 
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '2.5rem'
      }}>
        {message}
      </p>
      
      {onAction && (
        <button 
          onClick={onAction}
          style={{ 
            background: '#2563EB', 
            color: '#fff', 
            border: 'none',
            padding: '1rem 2rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.8rem', 
            letterSpacing: '0.1em', 
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseOver={e => e.currentTarget.style.background = '#1D4ED8'}
          onMouseOut={e => e.currentTarget.style.background = '#2563EB'}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default SuccessScreen;
