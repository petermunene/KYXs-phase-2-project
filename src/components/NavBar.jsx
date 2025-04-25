import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function NavBar({ cartCount }) {
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
          {/* Cart Link */}
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
    backgroundColor: '#a1887f', // warm brown
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
    color: '#3e2723',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: '#efebe9',
    textDecoration: 'none',
    fontSize: '16px',
  },
  cartLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#6d4c41',
    padding: '8px 16px',
    borderRadius: '8px',
  },
  logoutButton: {
    backgroundColor: '#8d6e63',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '8px',
  },
};

export default NavBar;
