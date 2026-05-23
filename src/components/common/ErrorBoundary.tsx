import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          background: '#000', 
          color: '#fff', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-adieu)', fontSize: '2rem', marginBottom: '1rem', color: '#ff3333' }}>
              SYSTEM DIAGNOSTIC FAILURE
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              A critical error occurred in the front-end rendering cycle. <br/><br/>
              <span style={{ color: '#ff3333', fontSize: '0.8rem' }}>{this.state.errorMsg}</span>
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: '#fff',
                background: '#ff3333',
                padding: '12px 24px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              INITIATE REBOOT
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
