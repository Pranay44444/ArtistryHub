import React, {useState,useEffect,useRef} from 'react'
import {Link,useParams,useNavigate} from 'react-router-dom'
import './ArtworkDetailPage.css'
import {ChevronRight,Close} from '@mui/icons-material'
import {useArtworks} from '../contexts/ArtworksContext'
import {useAuth} from '../contexts/AuthContext'

function ArtworkDetailPage(){
  const {id} = useParams()
  const {getArtwork,trackView} = useArtworks()
  const {isSignedIn,user,getDisplayName} = useAuth()
  const [artwork,setArtwork] = useState(null)
  const [loading,setLoading] = useState(true)
  const [isFullscreenView,setIsFullscreenView] = useState(false)
  const [showPurchaseModal,setShowPurchaseModal] = useState(false)
  const [viewCountUpdated,setViewCountUpdated] = useState(false)
  const prevViewsRef = useRef(0)
  const navigate = useNavigate()

  useEffect(()=>{
    const numericId = parseInt(id)
    const foundArtwork = getArtwork(numericId)
    if (foundArtwork){
      if (prevViewsRef.current > 0 && prevViewsRef.current < foundArtwork.views) {
        setViewCountUpdated(true)
        setTimeout(()=> setViewCountUpdated(false),2000)
      }
      prevViewsRef.current = foundArtwork.views
      setArtwork(foundArtwork)
      if (isSignedIn && user){
        const userId = user.id || user.email || getDisplayName()
        trackView(numericId,userId)
      }
    }
    setLoading(false)
    window.scrollTo(0,0)
  },[id,getArtwork,isSignedIn,user,trackView,getDisplayName])

  const toggleFullscreen = ()=>{
    setIsFullscreenView((prev) => !prev)
  };
  const handleBuyNow = ()=>{
    setShowPurchaseModal(true)
  };
  const handleClosePurchaseModal = ()=>{
    setShowPurchaseModal(false)
  }

  if (loading){
    return(
      <div className="lcontainer">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!artwork){
    return(
      <div className="notcontainer">
        <div className="notcontent">
          <h2 className="nottitle">Artwork Not Found</h2>
          <p className="notmessage">The artwork you're looking for doesn't exist or has been removed.</p>
          <Link to="/gallery" className="notlink">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {}
      {isFullscreenView && (
        <div className="modal">
          <button onClick={toggleFullscreen} className="close"><Close /></button>
          <img
            src={artwork.fullImageUrl || artwork.imageUrl}
            alt={artwork.title}
            className="fullimage"/>
        </div>
      )}
      {showPurchaseModal && (
        <div className="purchasemodal">
          <div className="modalcontent">
            <button onClick={handleClosePurchaseModal} className="closem"><Close /></button>
            <h2 className="mtitle">Complete Your Purchase</h2>
            <div className="pdetails">
              <img src={artwork.imageUrl} alt={artwork.title} className="pthumbnail"/>
              <div className="pinfo">
                <h3>{artwork.title}</h3>
                <p>By {artwork.artist}</p>
                <p className="pprice">₹{artwork.price ? Math.round(artwork.price): '299'}</p>
              </div>
            </div>
            <div className="pactions">
              <button className="pbutton">Proceed to Payment</button>
              <button onClick={handleClosePurchaseModal} className="cancelb">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="artwork-detail">
        <div className="container">
          <div className="breadcrumbs">
            <nav className="breadcrumbs-nav">
              <ol className="blist">
                <li>
                  <Link to="/" className="blink">Home</Link>
                </li>
                <li>
                  <ChevronRight className="bseparator" />
                  <Link to="/gallery" className="blink">Gallery</Link>
                </li>
                <li>
                  <ChevronRight className="bseparator" />
                  <span className="bcurrent">{artwork.title}</span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="artworkgrid">
            <div className="maincontent">
              <div className="imagesec">
                <div className="wrapper" onClick={toggleFullscreen}>
                  <img src={artwork.imageUrl} alt={artwork.title} className="aimage"/>
                </div>
              </div>
            </div>
            <div className="asidebar">
              <div className="ascard">
                <h3 className="artist-name">By {artwork.artist}</h3>
              </div>
              <div className="ainfocard">
                <h1 className="atitle">{artwork.title}</h1>
                <p className="adescription">{artwork.description}</p>
                <div className="ametadata">
                  <div className="metaitem">
                    <span className="metalabel">Category:</span>
                    <span className="metavalue">{artwork.category}</span>
                  </div>
                  <div className="metaitem">
                    <span className="metalabel">Style:</span>
                    <span className="metavalue">{artwork.style}</span>
                  </div>
                  <div className="metaitem">
                    <span className="metalabel">Date:</span>
                    <span className="metavalue">
                      {new Date(artwork.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="metaitem">
                    <span className="metalabel">Views:</span>
                    <span className={`metavalue ${viewCountUpdated ? 'countupdated' : ''}`}>
                      {artwork.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="buys">
                <div className="pricec">
                  <span className="pricelabel">Price</span>
                  <span className="price-value">₹{artwork.price ? Math.round(artwork.price) : '299'}</span>
                </div>
                <div className="buy-actions">
                  <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtworkDetailPage