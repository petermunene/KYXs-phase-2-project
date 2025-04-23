import { useAuth } from '../Context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}