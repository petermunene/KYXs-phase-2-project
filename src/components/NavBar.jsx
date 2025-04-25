import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function NavBar({ cartCount }) {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      backgroundColor: '#a1887f',
      padding: '10px 20px',
      color: 'white',
      position: 'fixed',
     
      top: 0,
      
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
       
        margin: '0 auto',
        width:"100%"
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3e2723' }}>KYXS</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#efebe9', textDecoration: 'none' }}>Home</Link>
          {!user && <Link to="/login" style={{ color: '#efebe9', textDecoration: 'none' }}>Login</Link>}
          {!user && <Link to="/signup" style={{ color: '#efebe9', textDecoration: 'none' }}>Sign Up</Link>}
          {user && <Link to="/profile" style={{ color: '#efebe9', textDecoration: 'none' }}>Profile</Link>}
          {user && (
            <button 
              onClick={logout} 
              style={{
                backgroundColor: '#8d6e63',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '8px'
              }}
            >
              Logout
            </button>
          )}
          <Link 
            to="/cart" 
            style={{
              backgroundColor: '#6d4c41',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}
