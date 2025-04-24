import React,{useState} from "react";
function ShoeCard({shoe}){
    const [showForm, setShowForm] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [deliveryOption, setDeliveryOption] = useState("pickup");

const handleSubmit = (e) => {
 alert("Submission Succesful!")
  e.preventDefault();
  const order = {
    ...shoe,
    quantity,
    color,
    deliveryOption,
    totalPrice: shoe.price * quantity
  };

  fetch("http://localhost:4000/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });
};

    return(

        <div>
        
                <div  id="card"
                style={
                    {display:"flex",
                    flexDirection:'column',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    padding:10, backgroundColor:"white", 
                    width:250,
                    borderRadius:10,
                    justifyContent:"space-between",
                    
                    
                    }}>
                    <img src={shoe.image} height={250}/>
                    <h2>{shoe.name}</h2>
                    <b>{shoe.brand}</b>
                    <h3>Price: ${shoe.price}</h3>
                    <button id="button" onClick={() => setShowForm(true)}style={{backgroundColor:"#644619", borderRadius:10, color:"White",padding:10}}>Add to cart</button>

                </div>
                {showForm && (
                <form id="form" onMouseLeave={() => setShowForm(false)} onSubmit={handleSubmit} style={{position: "absolute", background: "brown", padding: 20 ,borderRadius:20}}   >
                    <img src={shoe.image} height={250} />
                    <div>
                    <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                    {quantity}
                    <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>
                    <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" />
                    <select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
                    <option value="pickup">Pick up</option>
                    <option value="delivery">Delivery</option>
                    </select>
                    <p>Total: {shoe.price * quantity}</p>
                    <button type="submit">Submit Order</button>
                </form>
                )}
      </div>
        
    )

}
export default ShoeCard