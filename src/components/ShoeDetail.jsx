import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ShoeDetail() {
  const { state } = useLocation();
  const { shoe } = state || {};
  const navigate = useNavigate();

  if (!shoe) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2>Shoe not found</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#644619',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Default values if not provided
  const description = shoe.description || "This premium shoe combines comfort and style, perfect for everyday wear.";
  const availableColors = shoe.availableColors || ["Black", "White", "Navy"];
  const inStock = shoe.inStock !== undefined ? shoe.inStock : true;

  return (
    <div style={{
      display: 'flex',
      flexDirection: ['column', 'row'], // Responsive layout
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      gap: '2rem'
    }}>
      {/* Image Section */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <img 
          src={shoe.image} 
          alt={shoe.name} 
          style={{ 
            width: '100%', 
            maxHeight: '500px', 
            objectFit: 'contain',
            borderRadius: '4px'
          }} 
        />
      </div>

      {/* Details Section */}
      <div style={{ flex: 1, padding: '0 1rem' }}>
        <h1 style={{ 
          margin: '0 0 0.5rem 0',
          fontSize: '2rem',
          color: '#333'
        }}>
          {shoe.name}
        </h1>
        
        <h2 style={{ 
          margin: '0 0 1rem 0',
          fontSize: '1.5rem',
          color: '#666',
          fontWeight: 'normal'
        }}>
          {shoe.brand}
        </h2>
        
        <p style={{ 
          fontSize: '1.8rem', 
          fontWeight: 'bold',
          margin: '1rem 0',
          color: '#644619'
        }}>
          ${shoe.price.toFixed(2)}
        </p>
        
        <div style={{ 
          display: 'inline-block',
          padding: '0.3rem 0.8rem',
          backgroundColor: inStock ? '#e8f5e9' : '#ffebee',
          color: inStock ? '#2e7d32' : '#c62828',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: '1rem',
          margin: '0.5rem 0 1.5rem 0'
        }}>
          {inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </div>
        
        {/* Description Section */}
        <div style={{ margin: '2rem 0' }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.3rem',
            color: '#444'
          }}>
            Product Description
          </h3>
          <p style={{ 
            lineHeight: '1.6',
            color: '#555',
            margin: 0
          }}>
            {description}
          </p>
        </div>
        
        {/* Color Options Section */}
        <div style={{ margin: '2rem 0' }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.3rem',
            color: '#444'
          }}>
            Available Colors
          </h3>
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem'
          }}>
            {availableColors.map(color => (
              <div 
                key={color}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontWeight: '500'
                }}
              >
                {color}
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#644619',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#8d6e63'
            }
          }}
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
}

export default ShoeDetail;