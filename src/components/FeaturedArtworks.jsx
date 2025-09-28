import React, {useState,useEffect} from 'react'
import {ChevronLeft,ChevronRight,Visibility} from '@mui/icons-material'
import {motion,AnimatePresence} from 'framer-motion'
const artwork1Thumbnail = '/artworks/artwork1.png?v=1'
const artwork3Thumbnail = '/artworks/artwork3.jpg?v=1'
const artwork7Thumbnail = '/artworks/artwork7.jpg?v=1'
const artwork8Thumbnail = '/artworks/artwork8.webp?v=1'
const artwork9Thumbnail = '/artworks/artwork9.jpg?v=1'
import {Link} from 'react-router-dom'
import './FeaturedArtworks.css'

const artworkList = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Jorge",
    artistId: 101,
    imageUrl: artwork1Thumbnail,
    views: 1205
  },
  {
    id: 9,
    title: "Cityscape at Dusk",
    artist: "Leo",
    artistId: 109,
    imageUrl: artwork9Thumbnail,
    views: 1980
  },
  {
    id: 3,
    title: "Urban Expressions",
    artist: "Tanya",
    artistId: 103,
    imageUrl: artwork3Thumbnail,
    views: 1780
  },
  {
    id: 7,
    title: "Fractured Reality",
    artist: "David",
    artistId: 107,
    imageUrl: artwork7Thumbnail,
    views: 1842
  },
  {
    id: 8,
    title: "Painting Patterns",
    artist: "Omar",
    artistId: 108,
    imageUrl: artwork8Thumbnail,
    views: 1689
  }
]

function FeaturedArtworks() {
  const [activeSlide,setActiveSlide] = useState(0)
  const [isMoving,setIsMoving] = useState(false)
  
  const goToNext = ()=> {
    if (!isMoving) {
      setIsMoving(true)
      setActiveSlide((current)=> (current+1) % artworkList.length)
      setTimeout(() => setIsMoving(false),500)
    }
  };
  
  const goToPrev = ()=> {
    if (!isMoving){
      setIsMoving(true)
      setActiveSlide((current)=> (current-1 + artworkList.length) % artworkList.length)
      setTimeout(()=> setIsMoving(false),500)
    }
  }
  
  useEffect(()=> {
    const autoPlay = setInterval(()=> {
      goToNext()
    },5000)
    return ()=> clearInterval(autoPlay)
  }, [activeSlide])
  
  return (
    <div className="slider-main">
      <div className="slider-box">
        <AnimatePresence mode="wait">
          {artworkList.map((artwork,index)=> (
            <motion.div
              key={artwork.id}
              className={`slide ${index === activeSlide ? 'active' : ''}`}
              initial={{opacity: 0, x: 100}}
              animate={{opacity: index === activeSlide ? 1 : 0, x: index === activeSlide ? 0 : -100 }}
              exit={{opacity: 0, x: -100}}
              transition={{duration: 0.5}}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="img"
              />
              <div className="overlay"></div>
              <div className="info">
                <h3 className="name">{artwork.title}</h3>
                <p className="artist">
                  By {artwork.artist}
                </p>
                <div className="actions">
                  <button className="views">
                    <Visibility fontSize="small"/> {artwork.views}
                  </button>
                  <Link
                    to={`/artwork/${artwork.id}`}
                    className="btn"
                  >
                    View Artwork
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={goToPrev}
        className="nav prev"
        disabled={isMoving}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={goToNext}
        className="nav next"
        disabled={isMoving}
      >
        <ChevronRight />
      </button>
      <div className="dots">
        {artworkList.map((_,index)=> (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`dot ${index=== activeSlide ? 'active' : ''}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default FeaturedArtworks