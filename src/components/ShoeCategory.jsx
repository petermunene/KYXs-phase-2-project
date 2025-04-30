import React, { useState } from "react";
import { Link } from "react-router-dom";

function ShoeCategory({ shoes, setFilteredShoes }) {
  
  // Extract all unique colors from shoes
  const allColors = [...new Set(
    shoes.flatMap(shoe => shoe.availableColors.map(c => c.toLowerCase()))
  )];

  function handleFilter(input) {
    const updated = shoes.filter((shoe) => {
      const matchesSearch = 
        shoe.price.toString().includes(input) ||
        shoe.name.toLowerCase().includes(input.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(input.toLowerCase());
      
      return matchesSearch;
    });
    
    setFilteredShoes(updated);
  }

  return (
    <div style={{ margin: '20px 0' }}>
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="What are you looking for..."
        onChange={(e) => handleFilter(e.target.value)} 
        style={{
          height: 40,
          width: '100%',
          padding: '0 15px',
          borderRadius: 20,
          fontSize: 16,
          fontFamily: "sans-serif",
          maxWidth: 540,
          marginBottom: '20px'
        }} 
      />
    </div>
  );
}

export default ShoeCategory;