import React, {useState,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {useClerk} from '@clerk/clerk-react'
import './ResetPasswordPage.css'

const ResetPasswordPage = ()=>{
  const [email,setEmail] = useState('')
  const [code,setCode] = useState('')
  const [newPass,setNewPass] = useState('')
  const [confirmPass,setConfirmPass] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const [done,setDone] = useState(false)
  const go = useNavigate()
  const location = useLocation()
  const clerk = useClerk()
  
  useEffect(()=>{
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [location])
  useEffect(()=>{
    return ()=>{
      if (!done){
        try{
          clerk.signOut()
        } 
        catch(err){
          console.log('Cleanup sign out:',err)
        }
      }
    }
  },[clerk,done])
  
  const updateInput = (e)=>{
    const {name,value} = e.target
    switch (name){
      case 'email':setEmail(value); break
      case 'verificationCode': setCode(value); break
      case 'newPassword': setNewPass(value); break
      case 'confirmPassword': setConfirmPass(value); break
      default: break
    }
    if (error) setError('')
  }
  const submitForm = async (e)=>{
    e.preventDefault()
    if (!email.trim()){
      setError('Please enter your email address')
      return
    }
    if (!code.trim()){
      setError('Please enter the verification code')
      return
    }
    if (newPass.length<8){
      setError('Password must be at least 8 characters')
      return
    }
    if (newPass !== confirmPass){
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    
    try{
      let currentSignInAttempt = clerk.client.signIn
      if (!currentSignInAttempt){
        setError('No active reset session found. Please go back and request a new reset code.')
        setLoading(false)
        return
      }
      await currentSignInAttempt.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code
      })
      await currentSignInAttempt.resetPassword({
        password: newPass,
      })
      try{
        await clerk.signOut()
      } 
      catch(signOutError){
        console.log('Sign out after reset (expected):',signOutError)
      }
      setDone(true)
      setCode('')
      setNewPass('')
      setConfirmPass('')
      setTimeout(()=>{
        go('/login')
      },3000)
    } 
    catch(err){
      console.error('Reset password error:', err)
      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].message
        if (errorMessage.includes('Invalid code')){
          setError('Invalid verification code. Please check and try again.')
        } 
        else if (errorMessage.includes('expired')){
          setError('Verification code has expired. Please request a new one.')
        } 
        else{
          setError(errorMessage)
        }
      } 
      else if (err.message){
        setError(err.message)
      } 
      else{
        setError('Failed to reset password. Please try again.')
      }
    } 
    finally{
      setLoading(false)
    }
  }
  const resendCode = async ()=>{
    if (!email.trim()){
      setError('Please enter your email address')
      return
    }
    setLoading(true)
    setError('')
    try{
      await clerk.client.signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      })
      alert('Verification code has been resent to your email address')
    } 
    catch(err){
      console.error('Resend code error:', err)
      setError(err.errors?.[0]?.message || 'Failed to resend code. Please try again.')
    } 
    finally{
      setLoading(false)
    }
  }
  
  return(
    <div className="rsp-main">
      <div className="rsp-head">
        <h1 className="rsp-title">Create New Password</h1>
        <p className="rsp-subtitle">
          {done 
            ? 'Password reset successful!' 
            : 'Enter the verification code sent to your email'}
        </p>
      </div>
      {error && <div className="rsp-error">{error}</div>}
      {done ? (
        <div className="rsp-success">
          <p className="rsp-successmsg">Your password has been reset successfully!</p>
          <p className="rsp-redirectmsg">You will be redirected to the login page...</p>
          <Link 
            to="/login" 
            className="rsp-loginlink"
            onClick={()=>{
              try{
                clerk.signOut()
              } 
              catch(err){
                console.log('Sign out on navigation:', err)}}}>
            Go to Login
          </Link>
        </div>
      ) : (
        <form className="rsp-form" onSubmit={submitForm}>
          <div className="rsp-group">
            <label className="rsp-label">Email Address</label>
            <input
              className="rsp-input"
              type="email"
              name="email"
              value={email}
              onChange={updateInput}
              placeholder="Enter your email"
              required/>
          </div>
          <div className="rsp-group">
            <label className="rsp-label">Verification Code</label>
            <input
              className="rsp-input codeinput"
              type="text"
              name="verificationCode"
              value={code}
              onChange={updateInput}
              placeholder="Enter code from email"
              required/>
            <button 
              type="button"
              className="rsp-resendbtn"
              onClick={resendCode}
              disabled={loading}>
              Resend Code
            </button>
          </div>
          <div className="rsp-group">
            <label className="rsp-label">New Password</label>
            <input
              className="rsp-input"
              type="password"
              name="newPassword"
              value={newPass}
              onChange={updateInput}
              placeholder="Create new password"
              required/>
          </div>
          <div className="rsp-group">
            <label className="rsp-label">Confirm Password</label>
            <input
              className="rsp-input"
              type="password"
              name="confirmPassword"
              value={confirmPass}
              onChange={updateInput}
              placeholder="Confirm new password"
              required/>
          </div>
          <button 
            type="submit" 
            className="rsp-btn" 
            disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <div className="rsp-back">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </form>
      )}
    </div>
  )
}

export default ResetPasswordPage