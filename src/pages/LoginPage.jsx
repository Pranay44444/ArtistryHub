import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSignIn, useClerk } from '@clerk/clerk-react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const clerk = useClerk();
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
      case 'verificationCode': setVerificationCode(value); break;
      case 'newPassword': setNewPassword(value); break;
      case 'confirmPassword': setConfirmPassword(value); break;
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
      setError(err.errors?.[0]?.message || 'Failed to sign in. Please check your credentials.');
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
    setLoading(true);
    setError('');
    try {
      await clerk.client.signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });
      setView('resetPassword');
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.errors?.[0]?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
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
      setView('login');
      setPassword('');
      setVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        alert('Password reset successful! You can now sign in with your new password.');
      }, 100);
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
  
  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="login-title">{view === 'login' ? 'Welcome Back' : view === 'forgotPassword' ? 'Reset Password' : 'Create New Password'}</h1>
        <p className="login-subtitle">
          {view === 'login' ? 'Sign in to continue to ArtistryHub' : 
            view === 'forgotPassword' ? 'Enter your email to receive a verification code' : 
            `Enter the verification code sent to ${email}`}
        </p>
      </div>
      {error && <div className="error-container">{error}</div>}
      {view === 'login' && (
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
      )}
      {view === 'forgotPassword' && (
        <form className="login-form" onSubmit={handleForgotPassword}>
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
          <button type="submit" className="sign-in-btn" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Code'}</button>
          <div className="create-account">
            <a href="#" onClick={e => { e.preventDefault(); setView('login'); }}>Back to Sign In</a>
          </div>
        </form>
      )}
      {view === 'resetPassword' && (
        <form className="login-form verification-section" onSubmit={handleResetPassword}>
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
          <button type="submit" className="sign-in-btn verification-button" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
          <div className="create-account">
            <a href="#" onClick={e => { e.preventDefault(); setView('login'); }} className="resend-code">Back to Sign In</a>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPage;