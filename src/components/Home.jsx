import { useAuth } from '../Context/AuthContext';
import ShoeCategory from './ShoeCategory';
import ShoeList from './ShoesList';

export default function Home({ shoes, onAddShoeToCart }) {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome {user?.email}</h1>
      <ShoeCategory shoes={shoes} setFilteredShoes={() => {}} />
      <ShoeList shoes={shoes} onAddShoeToCart={onAddShoeToCart} />
    </div>
  );
}