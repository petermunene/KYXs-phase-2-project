import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <h2 style={styles.logo}>KYXS</h2>
        <div style={styles.navLinks}>
          <Link style={styles.navLink} to="/">Home</Link>
          <Link style={styles.navLink} to="/login">Login</Link>
          <Link style={styles.navLink} to="/signup">Sign Up</Link>
          {user && <Link style={styles.navLink} to="/profile">Profile</Link>}
          {user ? (
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: 'white',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default NavBar;
