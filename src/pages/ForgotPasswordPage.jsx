import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useClerk} from '@clerk/clerk-react'
import './ForgotPasswordPage.css'

const ForgotPasswordPage = ()=>{
  const [email,setEmail] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const [sent,setSent] = useState(false)
  const go = useNavigate()
  const clerk = useClerk()
  const update = (e)=>{
    setEmail(e.target.value)
    if (error) setError('')
  }
  
  const send = async (e)=>{
    e.preventDefault()
    if (!email.trim()){
      setError('Please enter your email address')
      return
    }
    if (!email.includes('@')){
      setError('Please enter a valid email address')
      return
    }
    setLoading(true)
    setError('')
    try{
      await clerk.client.signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      })
      setSent(true)
    } 
    catch(err){
      console.error('Password reset error:', err)
      setError(err.errors?.[0]?.message || 'Failed to send reset code. Please try again.')
    } 
    finally{
      setLoading(false)
    }
  }
  const reset = ()=>{
    go('/reset-password',{state:{email:email}})
  }
  
  return(
    <div className="fp-main">
      <div className="fp-head">
        <h1 className="fp-title">Reset Your Password</h1>
        <p className="fp-sub">
          {!sent 
            ? 'Enter your email to receive a verification code' 
            : `We sent a verification code to ${email}`}
        </p>
      </div>
      {error && <div className="fp-error">{error}</div>}
      {!sent ? (
        <form className="fp-form" onSubmit={send}>
          <div className="fp-field">
            <label className="fp-label">Email Address</label>
            <input
              className="fp-input"
              type="email"
              name="email"
              value={email}
              onChange={update}
              placeholder="Enter your email"
              required/>
          </div>
          <button 
            type="submit" 
            className="fp-btn" 
            disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
          <div className="fp-back">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </form>
      ) : (
        <div className="fp-sent">
          <p className="fp-msg">
            We've sent a verification code to your email address. 
            Please check your inbox and spam folder.
          </p>
          <button 
            className="fp-continue" 
            onClick={reset}
          >
            Continue to Reset Password
          </button>
          <div className="fp-back">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordPage 