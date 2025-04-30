import React, { useState, useEffect } from 'react';
import AddShoeForm from './AddShoeForm';
import ShoeList from '../ShoesList';

const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:4000" 
  : "https://your-production-server.com";

const AdminDashboard = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editShoe, setEditShoe] = useState(null);

  // Fetch all shoes
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/shoes`);
        if (!response.ok) throw new Error('Failed to fetch shoes');
        const data = await response.json();
        setShoes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShoes();
  }, []);

  // Add new shoe
  const handleAddShoe = async (newShoe) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/shoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShoe)
      });
      
      if (!response.ok) throw new Error('Failed to add shoe');
      
      const addedShoe = await response.json();
      setShoes(prev => [...prev, addedShoe]);
      setSuccessMessage('Shoe added successfully!');
      return addedShoe;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update shoe details
  const handleUpdateShoe = async (updatedShoe) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/shoes/${updatedShoe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedShoe)
      });
      
      if (!response.ok) throw new Error('Failed to update shoe');
      
      const data = await response.json();
      setShoes(prev => prev.map(shoe => shoe.id === updatedShoe.id ? data : shoe));
      setSuccessMessage('Shoe updated successfully!');
      setEditShoe(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle stock status
  const handleToggleStock = async (shoeId) => {
    try {
      setLoading(true);
      setError(null);
      
      const shoeToUpdate = shoes.find(shoe => shoe.id === shoeId);
      if (!shoeToUpdate) throw new Error('Shoe not found');
      
      const updatedShoe = {
        ...shoeToUpdate,
        inStock: !shoeToUpdate.inStock
      };

      const response = await fetch(`${BASE_URL}/shoes/${shoeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedShoe)
      });
      
      if (!response.ok) throw new Error('Failed to update stock status');
      
      setShoes(prev => prev.map(shoe => 
        shoe.id === shoeId ? updatedShoe : shoe
      ));
      
      setSuccessMessage(`Marked ${updatedShoe.inStock ? 'IN STOCK' : 'OUT OF STOCK'}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete shoe
  const handleDeleteShoe = async (shoeId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/shoes/${shoeId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete shoe');
      
      setShoes(prev => prev.filter(shoe => shoe.id !== shoeId));
      setSuccessMessage('Shoe deleted successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.loading}>Loading inventory...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button 
          style={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </header>

      <div style={styles.content}>
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>
            {editShoe ? 'Edit Shoe' : 'Add New Shoe'}
          </h2>
          {successMessage && (
            <div style={styles.successMessage}>{successMessage}</div>
          )}
          <AddShoeForm 
            onAddShoe={handleAddShoe}
            onUpdateShoe={handleUpdateShoe}
            editShoe={editShoe}
            onCancel={() => {
              setEditShoe(null);
              setSuccessMessage(null);
            }}
          />
        </div>

        <div style={styles.listSection}>
          <div style={styles.listHeader}>
            <h2 style={styles.sectionTitle}>Current Inventory ({shoes.length})</h2>
          </div>
          
          <div style={styles.tableContainer}>
            <ShoeList 
              shoes={shoes}
              adminMode={true}
              onEdit={setEditShoe}
              onToggleStock={handleToggleStock}
              onDelete={handleDeleteShoe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    margin: 0
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#c82333'
    }
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '2rem',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: '1fr'
    }
  },
  formSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    height: 'fit-content',
    position: 'sticky',
    top: '1rem'
  },
  listSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#444',
    margin: 0
  },
  tableContainer: {
    overflowX: 'auto'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
    color: '#666'
  },
  error: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
    margin: '2rem'
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px'
  }
};

export default AdminDashboard;