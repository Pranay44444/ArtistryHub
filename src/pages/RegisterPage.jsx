import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignUp, useClerk } from '@clerk/clerk-react';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const clerk = useClerk();

  useEffect(() => {
    setError('');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.email.includes('@')) return "Please enter a valid email address";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 8) return "Password must be at least 8 characters";
    if (!agreeToTerms) return "You must agree to the Terms and Privacy Policy";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verifying) {
      await verifyEmail();
      return;
    }
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!isLoaded) {
      setError("Registration system is loading. Please try again.");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(/\s+/);
      let firstName = nameParts[0] || '';
      let lastName = nameParts.slice(1).join(' ') || '';
      const signUpResult = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName,
        lastName
      });
      try {
        await signUpResult.prepareVerification({
          strategy: "email_code"
        });
        setVerifying(true);
        setLoading(false);
      } catch (verifyErr) {
        console.log("Email verification may not be required:", verifyErr);
        completeSignUp(signUpResult);
      }
    } catch (err) {
      console.error('Sign up error:', err);
      if (err.errors?.[0]?.code === 'form_password_pwned') {
        setError('This password has been found in a data breach. Please choose a different, more secure password.');
      } else if (err.errors?.[0]?.code === 'form_password_validation_failed') {
        setError('Password is too weak. Please use a mix of letters, numbers, and special characters.');
      } else if (err.errors?.[0]?.code === 'form_identifier_exists') {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setError(err.errors?.[0]?.message || 'Failed to create account. Please try again.');
      }
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code from your email');
      return;
    }
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      });
      await completeSignUp(result);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.errors?.[0]?.message || 'Failed to verify email. Please check the code and try again.');
      setLoading(false);
    }
  };

  const completeSignUp = async (signUpResult) => {
    if (signUpResult.status === 'complete') {
      try {
        const { createdSessionId } = signUpResult;
        if (createdSessionId) {
          await setActive({ session: createdSessionId });
          navigate('/');
        } else {
          navigate('/login');
        }
      } catch (activeErr) {
        console.error('Error setting active session:', activeErr);
        navigate('/login');
      }
    } else {
      setError('Sign up incomplete. Please try again or contact support.');
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="register-page">
        <div className="register-header">
          <h1 className="verification-title">Verify Your Email</h1>
          <p className="verification-subtitle">We've sent a verification code to {formData.email}</p>
        </div>
        {error && (
          <div className="error-container">
            <ErrorOutlineIcon fontSize="small" />
            <span>{error}</span>
          </div>
        )}
        <form className="register-form verification-section" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Verification Code</label>
            <input
              className="form-input verification-code-input"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              placeholder="Enter code from email"
            />
          </div>
          <button
            type="submit"
            className="register-btn verification-button"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
          <a href="#" className="resend-code" onClick={(e) => {
            e.preventDefault();
            alert('Resend functionality will be implemented in the future.');
          }}>
            Didn't receive a code? Resend
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-header">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Join ArtistryHub and share your work with the world</p>
      </div>
      {error && (
        <div className="error-container">
          <ErrorOutlineIcon fontSize="small" />
          <span>{error}</span>
        </div>
      )}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
          />
          <p className="form-info">Password must be at least 8 characters</p>
        </div>
        <div className="terms-checkbox">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
          />
          <span className="terms-text">I agree</span>
        </div>
        <button
          type="submit"
          className="register-btn"
          disabled={loading || !isLoaded}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <div className="login-redirect">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage; 