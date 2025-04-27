# KYXS Shoe Store - E-Commerce Platform

## 📌 Overview
KYXS is a modern e-commerce platform specializing in premium footwear. This React-based application features user authentication, product browsing, cart functionality, and a seamless checkout experience. The app showcases shoes from top brands like Nike, Adidas, Converse, and more.

## ✨ Features

### 🔐 Authentication System
- User login/signup with form validation
- Password strength meter
- Protected routes
- Session persistence

### 🛍️ Product Catalog
- Filterable shoe listings
- Detailed product pages
- Stock availability indicators
- Color selection options

### 🛒 Shopping Cart
- Add/remove items
- Quantity adjustment
- Color preferences
- Delivery options
- Real-time total calculation

### 🎨 UI Components
- Responsive design
- Interactive product cards
- Modal forms
- Loading states
- Error handling

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- Context API (State Management)
- CSS Modules
- Axios (HTTP Client)

### Backend (Mock)
- JSON Server
- LocalStorage (Persistence)

## 📂 Project Structure

```
src/
├── components/
│   ├── Auth/               # Authentication components
│   ├── Cart/               # Cart-related components
│   ├── Shoes/              # Product display components
│   └── UI/                 # Reusable UI elements
├── context/
│   └── AuthContext.jsx     # Authentication state
├── pages/
│   ├── Home.jsx            # Main product page
│   ├── ShoeDetail.jsx      # Single product view
│   └── ...                 # Other pages
├── styles/
│   ├── auth.css            # Auth page styles
│   └── main.css            # Global styles
├── App.jsx                 # Main app component
└── index.jsx               # Entry point
```

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kxys-shoe-store.git
   cd kxys-shoe-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run the mock API server (in separate terminal)**
   ```bash
   npm run server
   ```

## 🌐 API Endpoints

The app uses a mock API with these endpoints:

- `GET /shoes` - Get all shoes
- `POST /cart` - Add to cart
- `DELETE /cart/:id` - Remove from cart

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_DEFAULT_TIMEOUT=5000
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
