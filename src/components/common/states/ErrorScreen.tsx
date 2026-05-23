import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ 
  title = 'RUNTIME EXCEPTION', 
  message = 'SYSTEM DETECTED CRITICAL ANOMALIES. UNABLE TO ESTABLISH CONSENSUS.',
  actionText = 'RETRY OPERATION',
  onAction
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: '4rem',
      borderRadius: '24px',
      border: '1px solid rgba(239,68,68,0.2)',
      background: 'linear-gradient(135deg, rgba(17,17,17,1) 0%, rgba(30,10,10,1) 50%, rgba(17,17,17,1) 100%)',
      textAlign: 'center',
      width: '100%'
    }}>
      <div style={{ marginBottom: '2rem', color: '#EF4444' }}>
        <AlertTriangle size={56} />
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
        color: 'rgba(239,68,68,0.7)',
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
            color: '#EF4444', 
            border: '1px solid #EF4444',
            padding: '1rem 2rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.8rem', 
            letterSpacing: '0.1em', 
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#EF4444';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#EF4444';
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default ErrorScreen;
