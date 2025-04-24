import React from "react";

function ActionButtons({ shoe }) {
    return (
      <div className="mt-4 p-2 border-t">
        <p>Actions for: {shoe.name}</p>
        <button onClick={() => alert(`Added ${shoe.name} to cart`)}>
          Remove From Cart
        </button>
        <button onClick={() => alert(`Bought ${shoe.name}`)}>
          Buy
        </button>
      </div>
    );
  }
  

export default ActionButtons;