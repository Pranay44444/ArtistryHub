import React,{useState} from 'react'
import {Search,X} from 'lucide-react'
import ArtworkGrid from '../components/ArtworkGrid'
import './GalleryPage.css'

function GalleryPage(){
  const [search,setSearch] = useState('')
  const [open,setOpen] = useState(false)
  const [filters,setFilters] = useState({categories:[],styles:[],sortBy:'recent'})
  const types = ['Digital Art','Painting','Photography','Sculpture','Illustration','Mixed Media','Conceptual','Abstract']
  const styles = ['Modern','Contemporary','Minimalist','Surrealism','Impressionism','Pop Art','Street Art','Traditional']
  const sorts = [
    {value:'recent',label:'Most Recent'},
    {value:'popular',label:'Most Popular'},
    {value:'trending',label:'Trending'}
  ]
  const pick = (category)=>{
    setFilters(prev=>{
      if (prev.categories.includes(category)){
        return {...prev, categories: prev.categories.filter(c => c !== category)}
      } 
      else{
        return {...prev, categories: [...prev.categories, category]}
      }
    })
  }
  const select = (style)=>{
    setFilters(prev=>{
      if (prev.styles.includes(style)){
        return {...prev, styles: prev.styles.filter(s => s !== style)}
      } else {
        return {...prev, styles: [...prev.styles, style]}
      }
    })
  }
  const find = (e)=>{
    e.preventDefault()
    console.log('Searching for:',search)
  }
  const reset = ()=>{
    setFilters({categories:[],styles:[],sortBy: 'recent'})
    setSearch('')
  }

  return(
    <div className="g-main">
      <div className="g-box">
        <div className="g-head">
          <h1 className="g-title">Discover Amazing Artwork</h1>
          <p className="g-desc">
            Explore thousands of unique creations from talented artists around the world.
          </p>
        </div>
        <div className="g-bar">
            <form onSubmit={find} className="g-form">
              <div className="g-wrap">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by artwork title, artist, or keywords..."
                  className="g-input"
                title={search}/>
                <Search className="g-icon" />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="g-clear">
                    <X />
                  </button>
                )}
              </div>
            </form>
        </div>
        <ArtworkGrid filters={filters} searchQuery={search} />
      </div>
    </div>
  )
}
export default GalleryPage