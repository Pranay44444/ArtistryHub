import React,{useState,useEffect} from 'react'
import {useNavigate,Link,useLocation} from 'react-router-dom'
import {useSignIn} from '@clerk/clerk-react'
import './LoginPage.css'

const LoginPage = ()=>{
  const [userEmail,setUserEmail] = useState('')
  const [userPassword,setUserPassword] = useState('')
  const [errorMsg,setErrorMsg] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const goTo = useNavigate()
  const currentLocation = useLocation()
  const {signIn,setActive,isLoaded} = useSignIn()
  const redirectTo = currentLocation.state?.from || '/'
  
  useEffect(()=>{
    if (!isLoaded) return
    setErrorMsg('')
  },[isLoaded])
  
  const updateInput = (e)=>{
    const {name,value} = e.target
    switch (name){
      case 'email': setUserEmail(value); break
      case 'password': setUserPassword(value); break
      default: break
    }
    if (errorMsg) setErrorMsg('')
  }
  const loginUser = async (e)=>{
    e.preventDefault()
    setErrorMsg('')
    setIsLoading(true)
    if (!isLoaded){
      setErrorMsg("Authentication system is loading. Please try again.")
      setIsLoading(false)
      return
    }
    try{
      const result = await signIn.create({identifier:userEmail,password:userPassword})
      if (result.status=== 'complete'){
        await setActive({session:result.createdSessionId})
        goTo(redirectTo,{replace:true})
      } else {
        setErrorMsg('Login failed. Please check your credentials and try again.')
      }
    } 
    catch(err){
      if (err.errors && err.errors.length > 0){
        const errorMessage = err.errors[0].message
        const errorCode = err.errors[0].code
        if (errorCode=== 'form_password_incorrect' || errorMessage.includes('password')){
          setErrorMsg('Invalid password! Try forget password')
        } else if (errorCode === 'form_identifier_not_found' || errorMessage.includes('account') || errorMessage.includes('email')){
          setErrorMsg("Can't find account. Enter valid email")
        } else if (errorMessage.includes('Invalid')){
          setErrorMsg("Can't find account. Enter valid email")
        } else {
          setErrorMsg(errorMessage)
        }
      } 
      else{
        setErrorMsg('Failed to sign in. Please check your credentials.')
      }
    } finally{
      setIsLoading(false)
    }
  }
  const resetPassword = async (e)=>{
    e.preventDefault()
    if (!userEmail.trim()){
      setErrorMsg('Please enter your email address')
      return
    }
    goTo('/forgot-password',{state:{email:userEmail}})
  }
  
  return(
    <div className="lp-main">
      <div className="lp-head">
        <h1 className="lp-title">Welcome Back</h1>
        <p className="lp-subtitle">Sign in to continue to ArtistryHub</p>
      </div>
      {errorMsg && <div className="lp-error">{errorMsg}</div>}
      <form className="lp-form" onSubmit={loginUser}>
        <div className="lp-group">
          <label className="lp-label">Email Address</label>
          <input
            className="lp-input"
            type="email"
            name="email"
            value={userEmail}
            onChange={updateInput}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="lp-group">
          <label className="lp-label">Password</label>
          <input
            className="lp-input"
            type="password"
            name="password"
            value={userPassword}
            onChange={updateInput}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="lp-forgot-link">
          <Link to="/forgot-password" className="lp-forgot">Forgot password?</Link>
        </div>
        <button type="submit" className="lp-btn" disabled={isLoading || !isLoaded}>{isLoading ? 'Signing in...' : 'Sign In'}</button>
        <div className="lp-create">
          Don't have an account? <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage