import { useAuth } from '../Context/AuthContext';
import ShoeFilter from './ShoeFilter';
import ShoeList from './ShoeList';

export default function Home({ shoes, filteredShoes, setFilteredShoes, onAddShoeToCart }) {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome {user?.email}</h1>
      <div className="content">
        <ShoeFilter 
          shoes={shoes} 
          setFilteredShoes={setFilteredShoes} 
        />
        <ShoeList 
          shoes={filteredShoes} 
          onAddShoeToCart={onAddShoeToCart} 
        />
      </div>
    </div>
  );
}