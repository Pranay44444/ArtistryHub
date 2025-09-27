import React, {useState,useEffect,useRef} from 'react'
import {useTheme} from '../contexts/ThemeContext'
import {useArtworks} from '../contexts/ArtworksContext'
import {Link} from 'react-router-dom'
import {Eye} from 'lucide-react'
import './ArtworkGrid.css'

function ArtworkGrid({ filters, searchQuery }) {
  const {theme} = useTheme()
  const {artworks} = useArtworks()
  const [displayedArtworks,setDisplayedArtworks] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [currentPage,setCurrentPage] = useState(1)
  const gridContainer = useRef(null)

  useEffect(() => {
    let artworkList = [...artworks]
    
    if (searchQuery) {
      const searchText = searchQuery.toLowerCase()
      artworkList = artworkList.filter((artwork)=> 
          artwork.title.toLowerCase().includes(searchText) || 
          artwork.artist.toLowerCase().includes(searchText) ||
          artwork.category.toLowerCase().includes(searchText) ||
          artwork.style.toLowerCase().includes(searchText)
      )
    }    
    if (filters.categories.length > 0) {
      artworkList = artworkList.filter((artwork)=> 
        filters.categories.includes(artwork.category)
      )
    }    
    if (filters.styles.length > 0) {
      artworkList = artworkList.filter((artwork)=> 
        filters.styles.includes(artwork.style)
      )
    }    
    if (filters.sortBy=== 'recent') {
      artworkList.sort((first,second)=> new Date(second.date) - new Date(first.date))
    } else if (filters.sortBy=== 'popular') {
      artworkList.sort((first,second)=> second.likes - first.likes)
    } else if (filters.sortBy=== 'trending') {
      artworkList.sort((first,second)=> second.views - first.views)
    }
    
    setDisplayedArtworks(artworkList)
    setIsLoading(false)
    setCurrentPage(1)
  }, [searchQuery, filters, artworks])

  useEffect(() => {
    if (gridContainer.current && displayedArtworks.length > 0) {
      console.log('Grid container:',gridContainer.current)
      console.log('Grid item count:',gridContainer.current.querySelectorAll('.item').length)
      console.log('Artwork count:',displayedArtworks.length)
    }
  }, [displayedArtworks,gridContainer.current])

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (displayedArtworks.length===0){
    return(
      <div className="empty">
        <div className="emptyicon">
          <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="emptytitle">No artworks found</h3>
        <p className="emptytext">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="art-container" style={{width:'100%'}}>
      <div className="grid" ref={gridContainer} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'1.5rem'}}>
        {displayedArtworks.map(artwork => (
          <div key={artwork.id} className="item" style={{width:'100%'}}>
            <div className="card">
              <Link to={`/artwork/${artwork.id}`} className="art-link">
                <div className="imagebox">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="image"
                    loading="lazy"
                  />
                  <div className="tag">
                    {artwork.category}
                  </div>
                  <div className="art-overlay">
                    <h3 className="title">{artwork.title}</h3>
                    <p className="artist">By {artwork.artist}</p>
                    <div className="art-views">
                      <Eye size={16} /> <span>{artwork.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArtworkGrid