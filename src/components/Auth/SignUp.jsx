import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    text: '',
    class: ''
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  const getPasswordStrength = (password) => {
    if (!password) return { text: '', class: 'weak' };
    if (password.length < 8) return { text: 'Weak', class: 'weak' };
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;
    
    switch(strength) {
      case 4: return { text: 'Very Strong', class: 'very-strong' };
      case 3: return { text: 'Strong', class: 'strong' };
      case 2: return { text: 'Medium', class: 'medium' };
      default: return { text: 'Weak', class: 'weak' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (passwordStrength.class === 'weak') {
      return setError('Password is too weak');
    }

    try {
      setError('');
      setLoading(true);
      await signup({ email, password });
      navigate('/login', { state: { email } }); // Redirect to login with email prefilled
    } catch (error) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Create Account</h2>
      
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
            placeholder="Create a password"
          />
          {password && (
            <div className="password-strength-meter">
              <div className={`strength-bar ${passwordStrength.class}`}></div>
              <div className={`strength-text ${passwordStrength.class}`}>
                Strength: {passwordStrength.text}
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link to="/login" className="btn-link">Log In</Link>
      </div>
    </div>
  );
}