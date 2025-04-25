import { Link } from 'react-router-dom';

function ErrorPage({ errorMessage }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f8d7da'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#721c24', marginBottom: '1rem' }}>Oops! Something went wrong</h1>
      <p style={{ fontSize: '1.2rem', color: '#856404', marginBottom: '2rem' }}>{errorMessage}</p>
      <Link to="/" style={{
        padding: '10px 20px',
        backgroundColor: '#721c24',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none'
      }}>
        Return to Home
      </Link>
    </div>
  );
}

export default ErrorPage;