import React from 'react'
import heroImage from '../assets/about-hero.jpg'
import './AboutPage.css'
function AboutPage(){
  return (
    <div className="about-main">
      <section className="intro">
        <div className="container">
          <div className="content">
            <h1 className="title">About ArtistryHub</h1>
            <p className="text">
              ArtistryHub empowers artists to showcase, share, and connect through their creative work.
              We are a community-driven platform focused on elevating artistic voices from around the globe.
            </p>
          </div>
        </div>
      </section>
      <section className="mission">
        <div className="container">
          <div className="ab-grid">
            <div className="ab-info">
              <h2 className="heading">Our Mission</h2>
              <p className="desc">
                At ArtistryHub, we believe in the power of art to inspire, transform, and connect us all. 
                Our platform serves as a global gallery where artists of all backgrounds can find their audience 
                and art enthusiasts can discover new perspectives.
              </p>
              <p className="desc">
                We're dedicated to creating a supportive ecosystem where creativity thrives and artists receive 
                the recognition they deserve. Through innovative technology and thoughtful community building, 
                we're making art more accessible than ever before.
              </p>
            </div>
            <div className="imgbox">
              <img 
                src={heroImage}
                alt="Artists collaborating" 
                className="img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AboutPage;