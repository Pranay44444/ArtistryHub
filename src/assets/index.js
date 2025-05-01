// Import images directly 
import artwork1Original from './artworks/originals/artwork1.png';
import artwork2Original from './artworks/originals/artwork2.jpg';
import artwork3Original from './artworks/originals/artwork3.jpg';
import artwork4Original from './artworks/originals/artwork4.jpeg';
import artwork5Original from './artworks/originals/artwork5.webp';
import artwork6Original from './artworks/originals/artwork6.jpeg';
import artwork7Original from './artworks/originals/artwork7.jpg';
import artwork8Original from './artworks/originals/artwork8.webp';
import artwork9Original from './artworks/originals/artwork9.jpg';
import artwork10Original from './artworks/originals/artwork10.jpg';
import artwork11Original from './artworks/originals/artwork11.jpeg';
import artwork12Original from './artworks/originals/artwork12.jpg';

import artwork1Thumbnail from './artworks/thumbnails/artwork1.png';
import artwork2Thumbnail from './artworks/thumbnails/artwork2.jpg';
import artwork3Thumbnail from './artworks/thumbnails/artwork3.jpg';
import artwork4Thumbnail from './artworks/thumbnails/artwork4.jpeg';
import artwork5Thumbnail from './artworks/thumbnails/artwork5.webp';
import artwork6Thumbnail from './artworks/thumbnails/artwork6.jpeg';
import artwork7Thumbnail from './artworks/thumbnails/artwork7.jpg';
import artwork8Thumbnail from './artworks/thumbnails/artwork8.webp';
import artwork9Thumbnail from './artworks/thumbnails/artwork9.jpg';
import artwork10Thumbnail from './artworks/thumbnails/artwork10.jpg';
import artwork11Thumbnail from './artworks/thumbnails/artwork11.jpeg';
import artwork12Thumbnail from './artworks/thumbnails/artwork12.jpg';

import homeHeroImage from './heroes/home-hero.jpeg';
import ctaHeroImage from './heroes/bottom-hero.png';

// Define the asset objects with imported images
export const artworkOriginals = {
  artwork1: artwork1Original,
  artwork2: artwork2Original,
  artwork3: artwork3Original,
  artwork4: artwork4Original,
  artwork5: artwork5Original,
  artwork6: artwork6Original,
  artwork7: artwork7Original,
  artwork8: artwork8Original,
  artwork9: artwork9Original,
  artwork10: artwork10Original,
  artwork11: artwork11Original,
  artwork12: artwork12Original,
};

export const artworkThumbnails = {
  artwork1: artwork1Thumbnail,
  artwork2: artwork2Thumbnail,
  artwork3: artwork3Thumbnail,
  artwork4: artwork4Thumbnail,
  artwork5: artwork5Thumbnail,
  artwork6: artwork6Thumbnail,
  artwork7: artwork7Thumbnail,
  artwork8: artwork8Thumbnail,
  artwork9: artwork9Thumbnail,
  artwork10: artwork10Thumbnail,
  artwork11: artwork11Thumbnail,
  artwork12: artwork12Thumbnail,
};

export const heroImages = {
  homeHero: homeHeroImage,
  ctaHero: ctaHeroImage,
};

// For avatars, we'll use remote URLs which are always accessible
export const artistAvatars = {
  avatar1: 'https://randomuser.me/api/portraits/men/1.jpg',
  avatar2: 'https://randomuser.me/api/portraits/women/2.jpg',
  avatar3: 'https://randomuser.me/api/portraits/women/3.jpg',
  avatar4: 'https://randomuser.me/api/portraits/men/4.jpg',
  avatar5: 'https://randomuser.me/api/portraits/women/5.jpg',
  avatar6: 'https://randomuser.me/api/portraits/men/6.jpg',
  avatar7: 'https://randomuser.me/api/portraits/women/7.jpg',
  avatar8: 'https://randomuser.me/api/portraits/men/8.jpg',
  avatar9: 'https://randomuser.me/api/portraits/women/9.jpg',
  avatar10: 'https://randomuser.me/api/portraits/men/10.jpg',
  avatar11: 'https://randomuser.me/api/portraits/women/11.jpg',
  avatar12: 'https://randomuser.me/api/portraits/men/12.jpg',
};

export const artistData = {
  101: { name: "Elena Kim", avatar: artistAvatars.avatar1 },
  102: { name: "Marcus Chen", avatar: artistAvatars.avatar2 },
  103: { name: "Tanya Rodriguez", avatar: artistAvatars.avatar3 },
  104: { name: "Jamie Wong", avatar: artistAvatars.avatar4 },
  105: { name: "Alex Kowalski", avatar: artistAvatars.avatar5 },
  106: { name: "Sophie Bennett", avatar: artistAvatars.avatar6 },
  107: { name: "David Park", avatar: artistAvatars.avatar7 },
  108: { name: "Omar Hassan", avatar: artistAvatars.avatar8 },
  109: { name: "Leo Chen", avatar: artistAvatars.avatar9 },
  110: { name: "Sophia Lee", avatar: artistAvatars.avatar10 },
  111: { name: "Jason Kim", avatar: artistAvatars.avatar11 },
  112: { name: "Emma Wilson", avatar: artistAvatars.avatar12 }
};

export const artworkData = {
  1: { title: "Abstract Harmony", thumbnail: artworkThumbnails.artwork1, original: artworkOriginals.artwork1, artist: 101 },
  2: { title: "Sunset Dreams", thumbnail: artworkThumbnails.artwork2, original: artworkOriginals.artwork2, artist: 102 },
  3: { title: "Urban Expressions", thumbnail: artworkThumbnails.artwork3, original: artworkOriginals.artwork3, artist: 103 },
  4: { title: "Digital Landscape", thumbnail: artworkThumbnails.artwork4, original: artworkOriginals.artwork4, artist: 104 },
  5: { title: "Neon Reflections", thumbnail: artworkThumbnails.artwork5, original: artworkOriginals.artwork5, artist: 105 },
  6: { title: "Watercolor Dreams", thumbnail: artworkThumbnails.artwork6, original: artworkOriginals.artwork6, artist: 106 },
  7: { title: "Fractured Reality", thumbnail: artworkThumbnails.artwork7, original: artworkOriginals.artwork7, artist: 107 },
  8: { title: "Geometric Patterns", thumbnail: artworkThumbnails.artwork8, original: artworkOriginals.artwork8, artist: 108 },
  9: { title: "Cityscape at Dusk", thumbnail: artworkThumbnails.artwork9, original: artworkOriginals.artwork9, artist: 109 },
  10: { title: "Ocean Serenity", thumbnail: artworkThumbnails.artwork10, original: artworkOriginals.artwork10, artist: 110 },
  11: { title: "Abstract Dreams", thumbnail: artworkThumbnails.artwork11, original: artworkOriginals.artwork11, artist: 111 },
  12: { title: "Nature's Beauty", thumbnail: artworkThumbnails.artwork12, original: artworkOriginals.artwork12, artist: 112 }
};

export const getArtworkById = (id, type = 'thumbnail') => {
  const key = `artwork${id}`;
  return type === 'thumbnail' 
    ? artworkThumbnails[key] 
    : artworkOriginals[key];
};

export const getArtistAvatarById = (id) => {
  const key = `avatar${id.toString().replace('10', '')}`;
  return artistAvatars[key] || null;
};

export const getArtistNameById = (id) => {
  return artistData[id]?.name || "Unknown Artist";
};

export const getFullArtworkInfo = (id) => {
  const artwork = artworkData[id];
  if (!artwork) return null;
  return {
    id,
    title: artwork.title,
    imageUrl: artwork.thumbnail,
    fullImageUrl: artwork.original,
    artist: getArtistNameById(artwork.artist),
    artistId: artwork.artist,
    artistAvatar: artistData[artwork.artist]?.avatar
  };
};

export default {
  artworkOriginals,
  artworkThumbnails,
  heroImages,
  artistAvatars,
  artistData,
  artworkData,
  getArtworkById,
  getArtistAvatarById,
  getArtistNameById,
  getFullArtworkInfo
}; 