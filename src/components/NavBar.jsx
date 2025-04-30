import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function NavBar({ cartCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#644619',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Logo/Home Link */}
      <Link 
        to={user ? "/shoes" : "/"} 
        style={{ 
        textDecoration: 'none', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem'
      }}>
        KYXs
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/shoes" style={{ 
          textDecoration: 'none', 
          color: 'white',
          fontSize: '0.9rem'
        }}>
          Shoes
        </Link>

        {/* Conditional Login/Logout */}
        {user ? (
          <>
            <Link to="/cart" style={{ 
              textDecoration: 'none', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              Cart ({cartCount})
            </Link>
            <button 
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ 
            textDecoration: 'none', 
            color: 'white',
            background: '#8d6e63',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '0.9rem'
          }}>
            Login
          </Link>
        )}

        {/* Admin Link (if admin) */}
        {user?.isAdmin && (
          <Link to="/admin" style={{ 
            textDecoration: 'none', 
            color: 'white',
            fontSize: '0.9rem'
          }}>
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;