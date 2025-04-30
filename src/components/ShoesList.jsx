import React from 'react';
import ShoeCard from './ShoeCard';

function ShoeList({ shoes, adminMode, onEdit, onToggleStock, onDelete }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {shoes.map(shoe => (
        <div key={shoe.id} style={{ position: 'relative' }}>
          <ShoeCard shoe={shoe} />
          {adminMode && (
            <div style={adminButtonsContainerStyle}>
              <button 
                onClick={() => onEdit(shoe)}
                style={editButtonStyle}
              >
                ✏️ Edit
              </button>
              {/* Similar for other buttons */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Define styles here or in a separate CSS file
const adminButtonsContainerStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  gap: '5px',
  padding: '10px',
  background: 'rgba(255,255,255,0.9)',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px'
};

const editButtonStyle = {
  backgroundColor: '#644619',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s ease'
};

export default ShoeList;