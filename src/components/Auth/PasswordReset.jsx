import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage(`Password reset link sent to ${email}`);
    } catch {
      setMessage('Failed to send reset link');
    }
    setLoading(false);
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Reset Password</h2>
      
      {message && (
        <div className={message.includes('Failed') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

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
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        Remember your password? <Link to="/login" className="btn-link">Log In</Link>
      </div>
    </div>
  );
}