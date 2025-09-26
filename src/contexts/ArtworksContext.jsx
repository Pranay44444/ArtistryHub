import React, { createContext, useContext, useState, useEffect } from 'react';
const artwork1Thumbnail = '/artworks/artwork1.png?v=1';
const artwork2Thumbnail = '/artworks/artwork2.jpg?v=1';
const artwork3Thumbnail = '/artworks/artwork3.jpg?v=1';
const artwork4Thumbnail = '/artworks/artwork4.jpeg?v=1';
const artwork5Thumbnail = '/artworks/artwork5.webp?v=1';
const artwork6Thumbnail = '/artworks/artwork6.jpeg?v=1';
const artwork7Thumbnail = '/artworks/artwork7.jpg?v=1';
const artwork8Thumbnail = '/artworks/artwork8.webp?v=1';
const artwork9Thumbnail = '/artworks/artwork9.jpg?v=1';
const artwork10Thumbnail = '/artworks/artwork10.jpg?v=1';
const artwork11Thumbnail = '/artworks/artwork11.jpeg?v=1';
const artwork12Thumbnail = '/artworks/artwork12.jpg?v=1';




const galleryArtworkCollection = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Jorge",
    artistId: 101,
    imageUrl: artwork1Thumbnail,
    fullImageUrl: artwork1Thumbnail,
    likes: 342,
    views: 1205,
    category: "Digital Art",
    style: "Abstract",
    date: "2025-04-12",
    description: "This abstract piece explores the harmony between chaos and order. I used a digital medium to create flowing patterns that represent the constant movement and balance in nature. The vibrant colors reflect emotions and energy flowing through us all.",
    price: 299,
    viewedBy: []
  },
  {
    id: 2,
    title: "Anicient Water",
    artist: "Gray",
    artistId: 102,
    imageUrl: artwork2Thumbnail,
    fullImageUrl: artwork2Thumbnail,
    likes: 287,
    views: 946,
    category: "Painting",
    style: "Minimalist",
    date: "2025-04-11",
    description: "Captured during a tranquil evening at the beach, this artwork portrays the magical moment when day transitions to night. The minimalist composition focuses on the interplay of light and color, creating a peaceful atmosphere that invites viewers to pause and reflect.",
    price: 199,
    viewedBy: []
  },
  {
    id: 3,
    title: "Urban Expressions",
    artist: "Tanya",
    artistId: 103,
    imageUrl: artwork3Thumbnail,
    fullImageUrl: artwork3Thumbnail,
    likes: 456,
    views: 1780,
    category: "Illustration",
    style: "Abstract",
    date: "2025-04-10",
    description: "An exploration of urban life through a vibrant street art style. This piece captures the energy and diversity of city living.",
    price: 349,
    viewedBy: []
  },
  {
    id: 4,
    title: "Digital Landscape",
    artist: "James",
    artistId: 104,
    imageUrl: artwork4Thumbnail,
    fullImageUrl: artwork4Thumbnail,
    likes: 189,
    views: 842,
    category: "Digital Art",
    style: "Surrealist",
    date: "2025-04-09",
    description: "A surreal landscape created using digital techniques that explores the boundary between reality and imagination.",
    price: 249,
    viewedBy: []
  },
  {
    id: 5,
    title: "Neon Reflections",
    artist: "Alex",
    artistId: 105,
    imageUrl: artwork5Thumbnail,
    fullImageUrl: artwork5Thumbnail,
    likes: 512,
    views: 2150,
    category: "Painting",
    style: "Abstract",
    date: "2025-04-08",
    description: "Urban photography with a focus on neon lighting and reflections, capturing the beauty of city nights.",
    price: 399,
    viewedBy: []
  },
  {
    id: 6,
    title: "Watercolor Dreams",
    artist: "Sophie",
    artistId: 106,
    imageUrl: artwork6Thumbnail,
    fullImageUrl: artwork6Thumbnail,
    likes: 387,
    views: 1423,
    category: "Painting",
    style: "Impressionist",
    date: "2025-04-07",
    description: "A delicate watercolor painting that captures the ethereal quality of dreams. Each brushstroke is deliberate yet flowing, creating a dreamy atmosphere.",
    price: 275,
    viewedBy: []
  },
  {
    id: 7,
    title: "Fractured Reality",
    artist: "David",
    artistId: 107,
    imageUrl: artwork7Thumbnail,
    fullImageUrl: artwork7Thumbnail,
    likes: 467,
    views: 1842,
    category: "Digital Art",
    style: "Abstract",
    date: "2025-04-06",
    description: "A fascinating exploration of reality through a fragmented lens. This mixed media artwork challenges perceptions and invites viewers to question their understanding of the physical world.",
    price: 425,
    viewedBy: []
  },
  {
    id: 8,
    title: "Painting Patterns",
    artist: "Omar",
    artistId: 108,
    imageUrl: artwork8Thumbnail,
    fullImageUrl: artwork8Thumbnail,
    likes: 412,
    views: 1689,
    category: "Painting",
    style: "Realistic",
    date: "2025-04-05",
    description: "A striking collection of geometric patterns that play with perception and dimension. This digital artwork combines mathematical precision with artistic creativity.",
    price: 320,
    viewedBy: []
  },
  {
    id: 9,
    title: "Cityscape at Dusk",
    artist: "Leo",
    artistId: 109,
    imageUrl: artwork9Thumbnail,
    fullImageUrl: artwork9Thumbnail,
    likes: 476,
    views: 1980,
    category: "Painting",
    style: "Abstract",
    date: "2025-04-04",
    description: "A stunning view of a modern cityscape as the sun sets, casting beautiful orange and purple hues across the urban landscape. The blend of natural light and city illumination creates a captivating contrast.",
    price: 385,
    viewedBy: []
  },
  {
    id: 10,
    title: "Ocean Serenity",
    artist: "Sophia",
    artistId: 110,
    imageUrl: artwork10Thumbnail,
    fullImageUrl: artwork10Thumbnail,
    likes: 355,
    views: 1280,
    category: "Digital Art",
    style: "Fantasy",
    date: "2025-04-03",
    description: "A peaceful ocean landscape that showcases the serene beauty of water. The calming blue tones and gentle waves create a sense of tranquility and relaxation.",
    price: 289,
    viewedBy: []
  },
  {
    id: 11,
    title: "Abstract Dreams",
    artist: "Jason",
    artistId: 111,
    imageUrl: artwork11Thumbnail,
    fullImageUrl: artwork11Thumbnail,
    likes: 410,
    views: 1520,
    category: "Digital Art",
    style: "Abstract",
    date: "2025-04-02",
    description: "A vibrant abstract artwork that explores the landscape of dreams. Vivid colors and fluid forms create a captivating visual experience.",
    price: 375,
    viewedBy: []
  },
  {
    id: 12,
    title: "Nature's Beauty",
    artist: "Arohan",
    artistId: 112,
    imageUrl: artwork12Thumbnail,
    fullImageUrl: artwork12Thumbnail,
    likes: 375,
    views: 1340,
    category: "Painting",
    style: "Traditional",
    date: "2025-04-01",
    description: "A breathtaking photograph that captures the intricate beauty of nature. The colors and detail highlight the wonders of the natural world.",
    price: 299,
    viewedBy: []
  }
];

const GalleryArtworkContext = createContext();

export const useArtworks = () => {
  const artworkContext = useContext(GalleryArtworkContext);
  if (!artworkContext) {
    throw new Error('useArtworks must be used within an ArtworksProvider');
  }
  return artworkContext;
};

export const ArtworksProvider = ({ children }) => {
  
  const [artworkCollection, setArtworkCollection] = useState(() => {
    localStorage.removeItem('artworkCollection');
    return galleryArtworkCollection;
  });
  
  
  useEffect(() => {
    localStorage.setItem('artworkCollection', JSON.stringify(artworkCollection));
  }, [artworkCollection]);

  
  const createNewArtwork = (artworkDetails) => {
    
    const highestId = artworkCollection.reduce(
      (maxId, artwork) => Math.max(maxId, artwork.id),
      0
    );
    
    
    const completeArtwork = {
      ...artworkDetails,
      id: highestId + 1,
      likes: 0,
      views: 0,
      date: new Date().toISOString().split('T')[0],
      viewedBy: []
    };
    
    
    setArtworkCollection(prevCollection => [...prevCollection, completeArtwork]);
    
    
    return completeArtwork.id;
  };

  
  const findArtworkById = (artworkId) => {
    return artworkCollection.find(artwork => artwork.id === Number(artworkId));
  };

  
  const recordArtworkView = (artworkId, userId) => {
    if (!userId) return;
    
    setArtworkCollection(prevCollection => 
      prevCollection.map(artwork => {
        if (artwork.id === Number(artworkId) && !artwork.viewedBy.includes(userId)) {
          return {
            ...artwork,
            views: artwork.views + 1,
            viewedBy: [...artwork.viewedBy, userId]
          };
        }
        return artwork;
      })
    );
  };

  
  const toggleArtworkLike = (artworkId, userId) => {
    if (!userId) return;
    
    setArtworkCollection(prevCollection => 
      prevCollection.map(artwork => {
        if (artwork.id === Number(artworkId)) {
          const userLikedIndex = artwork.likedBy ? artwork.likedBy.indexOf(userId) : -1;
          
          if (userLikedIndex === -1) {
            
            return {
              ...artwork,
              likes: artwork.likes + 1,
              likedBy: [...(artwork.likedBy || []), userId]
            };
          } else {
            
            const updatedLikedBy = [...artwork.likedBy];
            updatedLikedBy.splice(userLikedIndex, 1);
            
            return {
              ...artwork,
              likes: artwork.likes - 1,
              likedBy: updatedLikedBy
            };
          }
        }
        return artwork;
      })
    );
  };

  
  const hasUserLikedArtwork = (artworkId, userId) => {
    if (!userId) return false;
    
    const artwork = findArtworkById(artworkId);
    return artwork && artwork.likedBy && artwork.likedBy.includes(userId);
  };

  
  const searchArtworksByTerm = (searchTerm, categoryFilters = [], styleFilters = []) => {
    if (!searchTerm && categoryFilters.length === 0 && styleFilters.length === 0) {
      return artworkCollection;
    }
    
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    return artworkCollection.filter(artwork => {
      
      const matchesSearchTerm = !searchTerm || 
        artwork.title.toLowerCase().includes(normalizedSearchTerm) ||
        artwork.artist.toLowerCase().includes(normalizedSearchTerm) ||
        artwork.description.toLowerCase().includes(normalizedSearchTerm);
      
      
      const matchesCategory = categoryFilters.length === 0 || 
        categoryFilters.includes(artwork.category);
      
      
      const matchesStyle = styleFilters.length === 0 || 
        styleFilters.includes(artwork.style);
      
      return matchesSearchTerm && matchesCategory && matchesStyle;
    });
  };

  
  const contextValue = {
    artworks: artworkCollection,
    addArtwork: createNewArtwork,
    getArtwork: findArtworkById,
    trackView: recordArtworkView,
    toggleLike: toggleArtworkLike,
    hasUserLiked: hasUserLikedArtwork,
    searchArtworks: searchArtworksByTerm
  };

  return (
    <GalleryArtworkContext.Provider value={contextValue}>
      {children}
    </GalleryArtworkContext.Provider>
  );
};

export const getArtworkById = (id) => {
  const artworkData = {
    1: artwork1Thumbnail,
    2: artwork2Thumbnail,
    3: artwork3Thumbnail,
    4: artwork4Thumbnail,
    5: artwork5Thumbnail,
    6: artwork6Thumbnail,
    7: artwork7Thumbnail,
    8: artwork8Thumbnail,
    9: artwork9Thumbnail,
    10: artwork10Thumbnail,
    11: artwork11Thumbnail,
    12: artwork12Thumbnail,
  };
  
  return artworkData[id];
}; 