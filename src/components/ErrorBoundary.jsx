import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #FFF8F0 0%, #E8F0E8 100%)',
          padding: 24,
        }}>
          <div style={{
            maxWidth: 440,
            width: '100%',
            background: 'white',
            borderRadius: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            padding: '48px 36px',
            textAlign: 'center',
            border: '1px solid #E8E0D8',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>😔</div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2D3A35', marginBottom: 12 }}>
              משהו השתבש
            </h1>
            <p style={{ color: '#8A9A8E', lineHeight: 1.7, marginBottom: 24 }}>
              אירעה שגיאה בלתי צפויה. נסו לרענן את הדף.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: '#5B7B6A',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                רענון הדף
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  background: 'transparent',
                  color: '#5B7B6A',
                  border: '2px solid #5B7B6A',
                  borderRadius: 12,
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                נסו שוב
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
