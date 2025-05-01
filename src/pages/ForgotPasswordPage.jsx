import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const clerk = useClerk();
  
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await clerk.client.signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });
      setEmailSent(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.errors?.[0]?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleContinue = () => {
    navigate('/reset-password', { state: { email } });
  };
  
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-header">
        <h1 className="forgot-password-title">Reset Your Password</h1>
        <p className="forgot-password-subtitle">
          {!emailSent 
            ? 'Enter your email to receive a verification code' 
            : `We sent a verification code to ${email}`}
        </p>
      </div>
      
      {error && <div className="error-container">{error}</div>}
      
      {!emailSent ? (
        <form className="forgot-password-form" onSubmit={handleSubmit}>
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
          <button 
            type="submit" 
            className="reset-btn" 
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
          <div className="back-to-login">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </form>
      ) : (
        <div className="verification-sent">
          <p className="verification-message">
            We've sent a verification code to your email address. 
            Please check your inbox and spam folder.
          </p>
          <button 
            className="continue-btn" 
            onClick={handleContinue}
          >
            Continue to Reset Password
          </button>
          <div className="back-to-login">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage; 