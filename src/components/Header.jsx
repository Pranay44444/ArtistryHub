import React, {useState,useEffect,useRef} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import logoImage from '../assets/logo.png'
import './Header.css'
import {FiSearch,FiMenu,FiX,FiUser,FiLogOut} from 'react-icons/fi'
function Header() {
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const [scrolled,setScrolled] = useState(false)
  const [searchQuery,setSearchQuery] = useState('')
  const [showSearch,setShowSearch] = useState(false)
  const [showDropdown,setShowDropdown] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const {user,isSignedIn,signOut,getDisplayName} = useAuth()
  const searchInputRef = useRef(null)
  const isHomePage = location.pathname=== '/'
  useEffect(()=> {
    const handleScroll = ()=> {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50){
        setScrolled(true)
      } 
      else{
        setScrolled(false)
      }
    }
    if (isHomePage){
    window.addEventListener('scroll',handleScroll)
    return ()=> window.removeEventListener('scroll',handleScroll)
    } 
    else{
      setScrolled(true)
    }
  },[isHomePage])
  useEffect(()=> {
    setIsMenuOpen(false)
    setShowSearch(false)
    setShowDropdown(false)
    if (!isHomePage){
      setScrolled(true)
    }
  },[location.pathname,isHomePage])
  useEffect(()=> {
    const handleClickOutside = (event)=> {
      if (showDropdown && !event.target.closest('.user-menu')) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return () => document.removeEventListener('mousedown',handleClickOutside)
  },[showDropdown])
  useEffect(()=> {
    if (showSearch && searchInputRef.current){
      searchInputRef.current.focus()
    }
  },[showSearch])
  const handleSearch = (e)=> {
    e.preventDefault()
    if (searchQuery.trim()){
      navigate(`/gallery?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }
  const handleSignOut = async ()=> {
    try{
      await signOut()
      navigate('/')
    } 
    catch(error){
      console.error('Error signing out:',error)
    }
  }
  const toggleDropdown = ()=> {
    setShowDropdown(!showDropdown)
  }
  const displayName = isSignedIn ? getDisplayName() : ''
  const toggleMobileMenu = ()=> {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen){
      setShowSearch(false)
    }
  }
  const toggleSearch = ()=> {
    setShowSearch(!showSearch)
    if (!showSearch){
      setIsMenuOpen(false)
    }
  }
  return (
    <header className={`header ${scrolled || showSearch || !isHomePage ? 'scrolled' : ''} ${!isHomePage ? 'nonheader' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={logoImage} alt="ArtistryHub Logo" className="logo-image"/>
          </Link>
          <nav className="desktop-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/upload" className="nav-link">Upload</Link>
            <button onClick={toggleSearch} className="icon">
              <FiSearch size={20} />
            </button>
            {isSignedIn ? (
              <div className="user-menu">
                <button className="user-button" onClick={toggleDropdown}>
                  <FiUser size={20} />
                  <span>{displayName}</span>
                </button>
                {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleSignOut} className="dropdown-item">
                    <FiLogOut size={16} style={{ marginRight: '8px' }} />
                    Log Out
                  </button>
                </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="signin">Sign In</Link>
            )}
          </nav>
          <div className="mobilemenu">
            <button onClick={toggleSearch} className="icon">
              <FiSearch size={22} />
            </button>
            <button onClick={toggleMobileMenu} className="icon">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {showSearch && (
          <div className="search">
            <form onSubmit={handleSearch}>
              <div className="search-input-container">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e)=> setSearchQuery(e.target.value)}
                  placeholder="Search artworks, artists, or tags..."
                  className="search-input"
                  autoFocus
                />
                <FiSearch className="search-icon" size={18} />
              </div>
            </form>
          </div>
        )}
        {isMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link">Home</Link>
            <Link to="/gallery" className="mobile-nav-link">Gallery</Link>
            <Link to="/upload" className="mobile-nav-link">Upload</Link>
            {isSignedIn ? (
              <>
                <button 
                  className="mobile-nav-link text-left" 
                  onClick={()=> {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}>
                  Log Out
                </button>
              </>
            ) : (<Link to="/login" className="mobilesign" onClick={() => setIsMenuOpen(false)}>Sign In</Link>)}
          </nav>
        )}
      </div>
    </header>
  )
}
export default Header