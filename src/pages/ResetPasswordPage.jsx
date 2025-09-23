import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const clerk = useClerk();
  
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email': setEmail(value); break;
      case 'verificationCode': setVerificationCode(value); break;
      case 'newPassword': setNewPassword(value); break;
      case 'confirmPassword': setConfirmPassword(value); break;
      default: break;
    }
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const signInAttempt = await clerk.client.signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });
      
      const emailFactor = signInAttempt.supportedFirstFactors.find(
        factor => factor.strategy === "reset_password_email_code"
      );
      
      if (!emailFactor || !emailFactor.emailAddressId) {
        throw new Error('Could not find email for verification');
      }
      
      await signInAttempt.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: verificationCode,
        emailAddressId: emailFactor.emailAddressId
      });
      
      await signInAttempt.resetPassword({
        password: newPassword,
      });
      
      setSuccess(true);
      setVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error('Reset password error:', err);
      if (err.errors && err.errors.length > 0) {
        setError(err.errors[0].message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to reset password. Please check your verification code.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await clerk.client.signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });
      alert('Verification code has been resent to your email address');
    } catch (err) {
      console.error('Resend code error:', err);
      setError(err.errors?.[0]?.message || 'Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="reset-password-page">
      <div className="reset-password-header">
        <h1 className="reset-password-title">Create New Password</h1>
        <p className="reset-password-subtitle">
          {success 
            ? 'Password reset successful!' 
            : 'Enter the verification code sent to your email'}
        </p>
      </div>
      
      {error && <div className="error-container">{error}</div>}
      
      {success ? (
        <div className="success-container">
          <p className="success-message">Your password has been reset successfully!</p>
          <p className="redirect-message">You will be redirected to the login page...</p>
          <Link to="/login" className="login-link">Go to Login</Link>
        </div>
      ) : (
        <form className="reset-password-form" onSubmit={handleSubmit}>
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
            <label className="form-label">Verification Code</label>
            <input
              className="form-input verification-code-input"
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={handleInputChange}
              placeholder="Enter code from email"
              required
            />
            <button 
              type="button"
              className="resend-code-btn"
              onClick={handleResendCode}
              disabled={loading}
            >
              Resend Code
            </button>
          </div>
          
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              className="form-input"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              placeholder="Create new password"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="reset-password-btn" 
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          
          <div className="back-to-login">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage; 