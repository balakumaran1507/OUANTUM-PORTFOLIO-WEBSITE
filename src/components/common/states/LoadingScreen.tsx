import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  title?: string;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  title = 'INITIALIZING SYSTEM', 
  message = 'ESTABLISHING DETERMINISTIC CONSENSUS...'
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
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        style={{ marginBottom: '2rem', color: '#2563EB' }}
      >
        <Loader2 size={48} />
      </motion.div>
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
        textTransform: 'uppercase'
      }}>
        {message}
      </p>
    </div>
  );
};

export default LoadingScreen;
