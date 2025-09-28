import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useSignUp,useClerk} from '@clerk/clerk-react'
import {ErrorOutline as ErrorOutlineIcon} from '@mui/icons-material'
import './RegisterPage.css'

const RegisterPage = ()=>{
  const [userData,setUserData] = useState({fullName: '',email: '',password: '',})
  const [acceptTerms,setAcceptTerms] = useState(false)
  const [errorMsg,setErrorMsg] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const [needsVerify,setNeedsVerify] = useState(false)
  const [codeInput,setCodeInput] = useState('')
  const goTo = useNavigate()
  const {isLoaded,signUp,setActive} = useSignUp()
  const clerk = useClerk()

  useEffect(()=>{
    setErrorMsg('')
  },[])

  const updateForm = (e)=>{
    const {name,value} = e.target
    setUserData(prev => ({...prev,[name]:value}))
    if (errorMsg){
      setErrorMsg('')
    }
  }
  const checkForm = ()=>{
    if (!userData.fullName.trim()) return "Full name is required"
    if (!userData.email.trim()) return "Email is required"
    if (!userData.email.includes('@')) return "Please enter a valid email address"
    if (!userData.password) return "Password is required"
    if (userData.password.length < 8) return "Password must be at least 8 characters"
    if (!acceptTerms) return "You must agree to the Terms and Privacy Policy"
    return null
  }
  const submitForm = async (e)=>{
    e.preventDefault()
    if (needsVerify){
      await checkEmail()
      return
    }
    const validationError = checkForm()
    if (validationError){
      setErrorMsg(validationError)
      return
    }
    if (!isLoaded){
      setErrorMsg("Registration system is loading. Please try again.")
      return
    }
    setErrorMsg('')
    setIsLoading(true)
    try{
      const nameParts = userData.fullName.trim().split(/\s+/)
      let firstName = nameParts[0] || ''
      let lastName = nameParts.slice(1).join(' ') || ''
      const signUpResult = await signUp.create({
        emailAddress: userData.email,
        password: userData.password,
        firstName,
        lastName
      })
      try{
        await signUpResult.prepareVerification({
          strategy: "email_code"
        })
        setNeedsVerify(true)
        setIsLoading(false)
      } catch (verifyErr){
        console.log("Email verification may not be required:", verifyErr)
        finishSignUp(signUpResult)
      }
    } catch(err){
      console.error('Sign up error:', err)
      if (err.errors?.[0]?.code === 'form_password_pwned'){
        setErrorMsg('This password has been found in a data breach. Please choose a different, more secure password.')
      } else if (err.errors?.[0]?.code === 'form_password_validation_failed'){
        setErrorMsg('Password is too weak. Please use a mix of letters, numbers, and special characters.')
      } else if (err.errors?.[0]?.code === 'form_identifier_exists'){
        setErrorMsg('An account with this email already exists. Please sign in instead.')
      } else {
        setErrorMsg(err.errors?.[0]?.message || 'Failed to create account. Please try again.')
      }
      setIsLoading(false)
    }
  }
  const checkEmail = async ()=>{
    if (!codeInput.trim()){
      setErrorMsg('Please enter the verification code from your email')
      return
    }
    setIsLoading(true)
    try{
      const result = await signUp.attemptEmailAddressVerification({
        code: codeInput
      })
      await finishSignUp(result)
    } catch(err){
      console.error('Verification error:', err)
      setErrorMsg(err.errors?.[0]?.message || 'Failed to verify email. Please check the code and try again.')
      setIsLoading(false)
    }
  }
  const finishSignUp = async (signUpResult)=>{
    if (signUpResult.status === 'complete'){
      try{
        const {createdSessionId} = signUpResult
        if (createdSessionId){
          await setActive({session: createdSessionId})
          goTo('/')
        } else {
          goTo('/login')
        }
      } catch(activeErr){
        console.error('Error setting active session:', activeErr)
        goTo('/login')
      }
    } 
    else{
      setErrorMsg('Sign up incomplete. Please try again or contact support.')
      setIsLoading(false)
    }
  }

  if (needsVerify){
    return(
      <div className="rp-main">
        <div className="rp-head">
          <h1 className="rp-title">Verify Your Email</h1>
          <p className="rp-subtitle">We've sent a verification code to {userData.email}</p>
        </div>
        {errorMsg && (
          <div className="rp-error">
            <ErrorOutlineIcon fontSize="small" />
            <span>{errorMsg}</span>
          </div>
        )}
        <form className="rp-form" onSubmit={submitForm}>
          <div className="rp-group">
            <label className="rp-label">Verification Code</label>
            <input
              className="rp-input"
              type="text"
              value={codeInput}
              onChange={(e)=> setCodeInput(e.target.value)}
              required
              placeholder="Enter code from email"
            />
          </div>
          <button
            type="submit"
            className="rp-btn"
            disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
          <a href="#" className="rp-resend" onClick={(e)=>{
            e.preventDefault()
            alert('Resend functionality will be implemented in the future.')
          }}>
            Didn't receive a code? Resend
          </a>
        </form>
      </div>
    )
  }
  return(
    <div className="rp-main">
      <div className="rp-head">
        <h1 className="rp-title">Create Account</h1>
        <p className="rp-subtitle">Join ArtistryHub and share your work with the world</p>
      </div>
      {errorMsg && (
        <div className="rp-error">
          <ErrorOutlineIcon fontSize="small" />
          <span>{errorMsg}</span>
        </div>
      )}
      <form className="rp-form" onSubmit={submitForm}>
        <div className="rp-group">
          <label className="rp-label">Full Name</label>
          <input
            className="rp-input"
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={updateForm}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="rp-group">
          <label className="rp-label">Email Address</label>
          <input
            className="rp-input"
            type="email"
            name="email"
            value={userData.email}
            onChange={updateForm}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="rp-group">
          <label className="rp-label">Password</label>
          <input
            className="rp-input"
            type="password"
            name="password"
            value={userData.password}
            onChange={updateForm}
            required
            placeholder="Create a password"
          />
          <p className="rp-info">Password must be at least 8 characters</p>
        </div>
        <div className="termsc">
          <input
            type="checkbox"
            className="cinput"
            checked={acceptTerms}
            onChange={(e)=> setAcceptTerms(e.target.checked)}
            required
          />
          <span className="termst">I agree</span>
        </div>
        <button
          type="submit"
          className="rp-btn"
          disabled={isLoading || !isLoaded}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        <div className="redirect">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage 