import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const from = location.state?.from || '/';
  
  useEffect(() => {
    if (!isLoaded) return;
    setError('');
  }, [isLoaded]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
      default: break;
    }
    if (error) setError('');
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!isLoaded) {
      setError("Authentication system is loading. Please try again.");
      setLoading(false);
      return;
    }
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate(from, { replace: true });
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].message;
        const errorCode = err.errors[0].code;
        
        if (errorCode === 'form_password_incorrect' || errorMessage.includes('password')) {
          setError('Invalid password! Try forget password');
        } else if (errorCode === 'form_identifier_not_found' || errorMessage.includes('account') || errorMessage.includes('email')) {
          setError("Can't find account. Enter valid email");
        } else if (errorMessage.includes('Invalid')) {
          setError("Can't find account. Enter valid email");
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Failed to sign in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    navigate('/forgot-password', { state: { email } });
  };
  
  
  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to ArtistryHub</p>
      </div>
      {error && <div className="error-container">{error}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="forgot-password-link">
          <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
        </div>
        <button type="submit" className="sign-in-btn" disabled={loading || !isLoaded}>{loading ? 'Signing in...' : 'Sign In'}</button>
        <div className="create-account">
          Don't have an account? <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;