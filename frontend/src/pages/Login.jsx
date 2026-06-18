import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation (replace with real auth later)
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // Dummy authentication – replace with API call
    if (email === 'demo@example.com' && password === 'password') {
      alert('Login successful! Redirecting to dashboard...');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try demo@example.com / password');
    }
    
  };

  return (
    
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
         
          <i className="fas fa-sign-in-alt"></i>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@example.com"
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <Button type="submit">
            <i className="fas fa-arrow-right-to-bracket"></i> Sign In
          </Button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
          <p><Link to="/forgot-password">Forgot password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;


//forgot password page and registerpage are not created yet.