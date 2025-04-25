import React from "react";

function ShoeFilter({ shoes, setFilteredShoes }) {
  function handleFilter(input) {
    const updated = shoes.filter((shoe) => 
      shoe.price.toString().includes(input) ||
      shoe.name.toLowerCase().includes(input.toLowerCase()) ||
      shoe.brand.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredShoes(updated);
  }

  return (
    <div style={{ margin: '20px 0' }}>
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
          maxWidth: 540
        }} 
      />
    </div>
  );
}

export default ShoeFilter;