import React from 'react';
import { Database } from 'lucide-react';

interface EmptyScreenProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ 
  title = 'NO DATA INGESTED', 
  message = 'AWAITING FIELD DATA IMPORTS. THE SYSTEM REMAINS IN STANDBY.',
  actionText = 'INITIALIZE AUDIT',
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
      border: '1px dashed rgba(255,255,255,0.2)',
      textAlign: 'center',
      width: '100%'
    }}>
      <div style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.3)' }}>
        <Database size={56} />
      </div>
      <h3 style={{ 
        fontFamily: 'var(--font-adieu)', 
        fontSize: '1.5rem', 
        color: 'rgba(255,255,255,0.7)', 
        marginBottom: '1rem',
        letterSpacing: '0.1em'
      }}>
        {title}
      </h3>
      <p style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '0.85rem', 
        color: 'rgba(255,255,255,0.4)',
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
            background: 'transparent', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '1rem 2rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.8rem', 
            letterSpacing: '0.1em', 
            cursor: 'pointer',
            transition: 'border-color 0.3s, color 0.3s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = '#fff';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyScreen;
