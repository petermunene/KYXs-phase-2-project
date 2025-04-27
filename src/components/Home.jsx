import { useAuth } from '../Context/AuthContext';
import ShoeCategory from './ShoeCategory';
import ShoeList from './ShoesList';

export default function Home({allShoes, shoes, onAddShoeToCart ,setFilteredShoes}) {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome</h1>
      <ShoeCategory shoes={allShoes} setFilteredShoes={setFilteredShoes}/>
      <ShoeList shoes={shoes} onAddShoeToCart={onAddShoeToCart} />
    </div>
  );
}