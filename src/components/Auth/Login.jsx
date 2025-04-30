import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  // Pre-fill email if coming from signup
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password, isAdminLogin);
    } catch (error) {
      setError(error.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
  <label>
    <input
      type="checkbox"
      checked={isAdminLogin}
      onChange={(e) => setIsAdminLogin(e.target.checked)}
    />
    Admin Login
  </label>
</div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="forgot-password-container">
          <Link to="/reset-password" className="btn-link">
            Forgot Password?
          </Link>
        </div>
      </form>

      <div className="auth-footer">
        Don't have an account?{' '}
        <Link to="/signup" className="btn-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
}