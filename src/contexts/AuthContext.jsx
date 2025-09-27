import React,{createContext,useContext,useEffect,useState} from 'react'
import {useClerk,useUser,useAuth as useClerkAuth} from '@clerk/clerk-react'

const AuthContext = createContext()
export const useAuth = ()=> {
  const context = useContext(AuthContext)
  if (!context){
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
export const AuthProvider = ({children}) => {
  const {user,isLoaded,isSignedIn} = useUser()
  const {signOut} = useClerk()
  const {getToken} = useClerkAuth()
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  useEffect(()=> {
    if (isLoaded){
      setLoading(false)
    }
  },[isLoaded])
  useEffect(()=> {
    if (isSignedIn !== undefined){
      setError(null)
    }
  },[isSignedIn])

  const logOut = async ()=>{
    try{
      setLoading(true)
      await signOut()
    } 
    catch(error){
      console.error('Sign out failed:', error.message)
      setError('Failed to sign out. Please try again.')
    } 
    finally{
      setLoading(false)
    }
  }

  const getUserToken = async ()=>{
    try{
      return await getToken()
    } 
    catch(error){
      console.error('Failed to get user token:',error)
      setError('Failed to authenticate. Please sign in again.')
      return null
    }
  }

  const getUserName = ()=>{
    if (!user) return ''
    if (user.firstName) return user.firstName
    if (user.username) return user.username
    if (user.emailAddresses && user.emailAddresses.length > 0){
      const email = user.emailAddresses[0].emailAddress
      return email.split('@')[0]
    }
    return 'User'
  }

  const value = {
    user,
    isSignedIn,
    loading: loading,
    authError: error,
    signOut: logOut,
    getToken: getUserToken,
    getDisplayName: getUserName
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}