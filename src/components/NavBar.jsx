import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function NavBar({ cartCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <h2 style={styles.logo}>KYXs</h2>
        <div style={styles.navLinks}>
          <Link style={styles.navLink} to="/">Home</Link>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
          <Link style={styles.cartLink} to="/cart">
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}


const styles = {
  navbar: {
    backgroundColor: '#a1887f',
    padding: '10px 20px',
    color: 'white',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3e2723',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    color: '#efebe9',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    backgroundColor: '#8d6e63',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default NavBar;