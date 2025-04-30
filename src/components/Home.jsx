import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  // Featured Shoes Data
  const featuredShoes = [
    {
      "id": "1",
      "name": "Air Max 270",
      "brand": "Nike",
      "price": 150,
      "inStock": true,
      "image": "https://images.pexels.com/photos/10657971/pexels-photo-10657971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "description": "Experience ultimate comfort with Nike's iconic Air Max 270, featuring the tallest Air unit yet for all-day cushioning. Perfect for casual wear with a bold, statement-making design.",
      "availableColors": [
        "Black/White",
        "Pure Platinum",
        "Hot Punch",
        "Photo Blue"
      ]
    },
    {
      "id": "2",
      "name": "Air Force 1",
      "brand": "Nike",
      "price": 120,
      "inStock": true,
      "image": "https://images.pexels.com/photos/11946042/pexels-photo-11946042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "description": "The classic white-on-white Nike Air Force 1 revolutionized basketball footwear and streetwear culture. Timeless style meets durable leather construction.",
      "availableColors": [
        "White",
        "Black",
        "University Red",
        "Sail"
      ]
    },
    {
      "id": "3",
      "name": "Nike Dunk Low",
      "brand": "Nike",
      "price": 100,
      "inStock": false,
      "image": "https://images.pexels.com/photos/20298289/pexels-photo-20298289/free-photo-of-nike-dunk-low-medium-olive-sneakers-lying-on-satin-fabric.png?auto=compress&cs=tinysrgb&w=600",
      "description": "Originally designed for the hardwood, the Dunk Low returns with classic colors and throwback hoops flair. Premium leather offers durability and comfort.",
      "availableColors": [
        "Medium Olive",
        "Black/White",
        "University Red",
        "Panda"
      ]
    },
    {
      "id": "4",
      "name": "Nike Pegasus 39",
      "brand": "Nike",
      "price": 130,
      "inStock": true,
      "image": "https://images.pexels.com/photos/6540973/pexels-photo-6540973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "description": "A workhorse with wings, the Pegasus 39 offers responsive cushioning for your daily runs. Updated midsole foam provides softer landings and explosive takeoffs.",
      "availableColors": [
        "Black/Volt",
        "White/Red",
        "Eclipse/Blue",
        "Bright Crimson"
      ]
    },
    {
      "id": "5",
      "name": "Nike React Infinity",
      "brand": "Nike",
      "price": 160,
      "inStock": true,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReC6biA9PhezJav65Va8VQ7Vu5h5KTCsyNgA&s",
      "description": "Designed to help reduce injury and keep you running, the React Infinity features plush cushioning and a wide platform for stability on long distances.",
      "availableColors": [
        "Black/White",
        "Pure Platinum",
        "Racer Blue",
        "Bright Crimson"
      ]
    },
    {
      "id": "6",
      "name": "Ultraboost 22",
      "brand": "Adidas",
      "price": 180,
      "inStock": true,
      "image": "https://www.badeqshop.co.ke/cdn/shop/products/Ultraboost22_300x300.jpg?v=1639837850",
      "description": "Adidas Ultraboost 22 combines responsive Boost cushioning with a Primeknit+ upper that adapts to your foot's shape for a precision fit.",
      "availableColors": [
        "Black/Solar Red",
        "Core Black",
        "Legend Ink",
        "Cloud White"
      ]
    },
    {
      "id": "7",
      "name": "Adidas Superstar",
      "brand": "Adidas",
      "price": 90,
      "inStock": true,
      "image": "https://m.media-amazon.com/images/I/716Inzq-uoL._AC_SL1500_.jpg",
      "description": "The iconic shell-toe design that became a hip-hop legend. The Superstar features a durable leather upper and classic serrated 3-Stripes.",
      "availableColors": [
        "White/Black",
        "Black/White",
        "Gold Metallic",
        "Collegiate Green"
      ]
    },
    {
      "id": "8",
      "name": "NMD_R1",
      "brand": "Adidas",
      "price": 140,
      "inStock": false,
      "image": "https://cdn-images.farfetch-contents.com/17/07/62/87/17076287_34334629_600.jpg",
      "description": "The NMD_R1 combines retro running style with modern comfort. Features responsive Boost cushioning and signature color-blocked plugs.",
      "availableColors": [
        "Core Black",
        "White/Trace Pink",
        "Glory Blue",
        "Signal Coral"
      ]
    }
  ];

  // Categories Data
  const categories = [
    { name:"Adidas", icon: "🏁", path: "/shoes?type=Adidas" },
    { name: "Asics", icon: "🌀", path: "/shoes?type=Asics" },
    { name: "Crocs", icon: "🐊", path: "/shoes?type=Crocs" },
    { name: "Converse", icon: "⭐", path: "/shoes?type=Converse" },
  ];

  // Testimonials Data
  const testimonials = [
    { name: "Alex M.", text: "Best sneakers I've ever bought!", rating: "⭐️⭐️⭐️⭐️⭐️" },
    { name: "Jamie L.", text: "Fast shipping and great quality.", rating: "⭐️⭐️⭐️⭐️⭐️" },
    { name: "Taylor R.", text: "Huge selection, fair prices.", rating: "⭐️⭐️⭐️⭐️⭐️" },
  ];

  return (
    <div style={{
      maxWidth: '100%',
      padding: '0 10px',
      margin: '0 auto'
    }}>
      {/* Hero Section - Compact */}
      <section style={{
        background: "#ffffff",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        textAlign: "center",
        marginBottom: "20px",
        borderRadius: "8px"
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Step Into Style</h1>
        <p style={{ fontSize: "1rem", marginBottom: "20px" }}>Discover 2024's hottest sneakers</p>
        <Link to="/shoes" style={{
          background: "#644619",
          color: "white",
          padding: "10px 25px",
          borderRadius: "25px",
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          Shop Now
        </Link>
      </section>

      {/* Categories Row */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: "10px",
        padding: "10px 0",
        marginBottom: "20px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" }
      }}>
        {categories.map((cat) => (
          <Link 
            key={cat.name}
            to={cat.path}
            style={{
              flex: "0 0 auto",
              width: "120px",
              height: "120px",
              background: "white",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
              color: "#333",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <span style={{ fontSize: "2rem" }}>{cat.icon}</span>
            <span style={{ marginTop: "5px" }}>{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* ===== FEATURED SHOES ===== */}
      <section style={{ padding: "50px 20px", textAlign: "center" }}>
        <h2>Trending Now🔥</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          marginTop: "30px"
        }}>
          {featuredShoes.map((shoe) => (
            <div key={shoe.id} style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s"
            }}>
              <img src={shoe.image} alt={shoe.name} style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "5px"
              }} />
              <h3>{shoe.name}</h3>
              <p>${shoe.price}</p>
              <Link 
              to="/shoedetail" 
              state={{ shoe }}  // Pass the shoe object as state
              style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "8px 20px",
              background: "#644619",
              color: "white",
              borderRadius: "5px",
              textDecoration: "none"
            }}>
  View Details
</Link>
            </div>
          ))}
        </div>
      </section>


     {/* Testimonials Row */}
     <section style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 15px 5px" }}>What Customers Say</h2>
        <div style={{
          display: "flex",
          overflowX: "auto",
          gap: "15px",
          padding: "10px 0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" }
        }}>
          {testimonials.map((review, index) => (
            <div 
              key={index}
              style={{
                flex: "0 0 auto",
                width: "250px",
                background: "white",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <p style={{ 
                fontStyle: "italic",
                marginBottom: "10px",
                fontSize: "0.9rem"
              }}>"{review.text}"</p>
              <p style={{ 
                color: "gold",
                marginBottom: "5px",
                fontSize: "0.9rem"
              }}>{review.rating}</p>
              <p style={{ 
                fontWeight: "bold",
                color: "#555",
                fontSize: "0.8rem"
              }}>— {review.name}</p>
            </div>
          ))}
        </div>
      </section>

     {/* Newsletter - Compact */}
     <section style={{
        background: "#644619",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        <h2 style={{ margin: "0 0 10px", fontSize: "1.2rem" }}>Stay Updated</h2>
        <p style={{ margin: "0 0 15px", fontSize: "0.9rem" }}>Get exclusive deals straight to your inbox</p>
        <form style={{
          display: "flex",
          maxWidth: "400px",
          margin: "0 auto"
        }}>
          <input 
            type="email" 
            placeholder="Your email" 
            style={{
              flex: 1,
              padding: "8px 15px",
              border: "none",
              borderRadius: "20px 0 0 20px",
              fontSize: "0.9rem"
            }}
          />
          <button 
            type="submit"
            style={{
              padding: "8px 15px",
              background: "#8d6e63",
              color: "white",
              border: "none",
              borderRadius: "0 20px 20px 0",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        padding: "20px",
        textAlign: "center",
        background: "#644619",
        color: "white"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "10px"
        }}>
        </div>
        <p>© 2025 KYXs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;