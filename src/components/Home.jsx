import { useAuth } from '../Context/AuthContext';
import ShoeFilter from './ShoeCategory';
import ShoeList from './ShoesList';

export default function Home({ shoes, onAddShoeToCart }) {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome {user?.email}</h1>
      <ShoeFilter shoes={shoes} setFilteredShoes={() => {}} />
      <ShoeList shoes={shoes} onAddShoeToCart={onAddShoeToCart} />
    </div>
  );
}
