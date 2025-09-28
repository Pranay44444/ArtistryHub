import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {TypeAnimation} from 'react-type-animation'
import {ChevronRight} from '@mui/icons-material'
import FeaturedArtworks from '../components/FeaturedArtworks'
import topImage from '../assets/heroes/home-hero.jpeg'
import bottomImage from '../assets/heroes/bottom-hero.png'
import {useAuth} from '../contexts/AuthContext'
import './HomePage.css'

function HomePage(){
  const {isSignedIn} = useAuth()
  const go = useNavigate()
  const numberStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1.5rem',
    display: 'inline-block',
    position: 'relative',
    zIndex: 10,
    padding: '0 10px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
  }
  const start = (e)=>{
    e.preventDefault()
    if (isSignedIn){
      go('/upload')
    } else {
      go('/login')
    }
  }

  return(
    <div className="hp-main">
      <section className="hp-hero">
        <div className="hp-bg">
          <div className="hp-over"></div>
          <img 
            src={topImage}
            alt="Creative artwork" 
            className="hp-img"
          />
        </div>
        <div className="container">
          <div className="hp-content">
            <h1 className="hp-title">
              Where Art Meets
              <span className="hp-anim">
                <TypeAnimation
                  sequence={['Passion',2000,'Inspiration',2000,'Community',2000,'Discovery',2000,]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="gradient-text"
                />
              </span>
            </h1>
            <p className="hp-desc">
              Upload, showcase, and discover extraordinary artwork from talented 
              creators around the world.
            </p>
            <div className="hp-btns">
              <Link to="/gallery" className="hp-explore">
                Explore Gallery <ChevronRight />
              </Link>
              <Link to="/upload" className="hp-upload">
                Upload Artwork
              </Link>
            </div>
          </div>
        </div>
        <div className="hp-scroll">
          <div className="hpscroll-btn">
            <ChevronRight className="hpscroll-icon" />
          </div>
        </div>
      </section>
      <section className="hp-featured">
        <div className="container">
          <div className="hp-head">
            <h2 className="hpsec-title">Featured Artworks</h2>
            <p className="hpsec-desc">
              Explore our handpicked selection of extraordinary creations from talented artists around the world.
            </p>
          </div>
          <FeaturedArtworks />
          <div className="hp-foot">
            <Link to="/gallery" className="hp-view-all">
              View all artworks <ChevronRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="hp-steps">
        <div className="container">
          <div className="hp-head">
            <h2 className="hpsec-title">How It Works</h2>
            <p className="hpsec-desc">
              Join our community in three simple steps and start sharing your creative vision with the world.
            </p>
          </div>
          <div className="hp-grid">
            <div className="hp-card">
              <div style={numberStyle}>1</div>
              <h3 className="hpcard-title">Create an Account</h3>
              <p className="hpcard-desc">
                Sign up for free and build your artistic profile to showcase your creative journey.
              </p>
            </div>
            <div className="hp-card">
              <div style={numberStyle}>2</div>
              <h3 className="hpcard-title">Upload Your Artwork</h3>
              <p className="hpcard-desc">
                Share your masterpieces with our community through our easy-to-use upload system.
              </p>
            </div>
            <div className="hp-card">
              <div style={numberStyle}>3</div>
              <h3 className="hpcard-title">Connect & Grow</h3>
              <p className="hpcard-desc">
                Engage with fellow artists, receive feedback, and gain exposure for your creative work.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hp-bottom">
        <div className="hpb-bg">
          <div className="hpb-over"></div>
          <img 
            src={bottomImage}
            alt="Creative space" 
            className="bimg"
          />
        </div>
        <div className="container">
          <div className="bcontent">
            <h2 className="btitle">
              Ready to Share Your Artistic Vision?
            </h2>
            <p className="bdesc">
              Join thousands of artists who have found their creative community on ArtistryHub.
            </p>
            <a href="#" onClick={start} className="bbtn">
              Get Started Now <ChevronRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage