// components/admin/AddShoeForm.js
import React, { useState } from 'react';

const AddShoeForm = ({ onAddShoe }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    description: '',
    availableColors: ['Black', 'White'],
    inStock: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShoe = {
      ...formData,
      price: parseFloat(formData.price),
    };
    onAddShoe(newShoe);
    setFormData({
      name: '',
      brand: '',
      price: '',
      image: '',
      description: '',
      availableColors: ['Black', 'White'],
      inStock: true
    });
  };

  const handleAddColor = () => {
    const newColor = prompt("Enter new color:");
    if (newColor) {
      setFormData(prev => ({
        ...prev,
        availableColors: [...prev.availableColors, newColor]
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Brand:</label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => setFormData({...formData, brand: e.target.value})}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Image URL:</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          style={styles.textarea}
          rows="3"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Available Colors:</label>
        <div style={styles.colorsContainer}>
          {formData.availableColors.map((color, index) => (
            <div key={index} style={styles.colorTag}>
              {color}
            </div>
          ))}
          <button 
            type="button" 
            onClick={handleAddColor}
            style={styles.addColorButton}
          >
            +
          </button>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
            style={styles.checkbox}
          />
          In Stock
        </label>
      </div>

      <button type="submit" style={styles.submitButton}>
        Add Shoe
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#444',
  },
  input: {
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  colorsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    alignItems: 'center',
  },
  colorTag: {
    padding: '0.3rem 0.8rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  addColorButton: {
    width: '32px',
    height: '32px',
    backgroundColor: '#644619',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  submitButton: {
    padding: '1rem',
    backgroundColor: '#644619',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '1rem',
  },
};

export default AddShoeForm;