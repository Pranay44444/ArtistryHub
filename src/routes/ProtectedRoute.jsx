import React from 'react'
import {Navigate,useLocation} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import '../styles/ProtectedRoute.css'
const ProtectedRoute = ({children})=>{
  const {isSignedIn,loading} = useAuth()
  const location = useLocation()
  if (loading){
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    )
  }
  if (!isSignedIn){
    return <Navigate to="/login" state={{from:location.pathname}} replace />
  }
  return children
}
export default ProtectedRoute