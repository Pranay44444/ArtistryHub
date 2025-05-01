import React from 'react';
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

// Export all images directly for better bundling
export {
  // Original artwork exports
  artwork1Original, artwork2Original, artwork3Original, artwork4Original,
  artwork5Original, artwork6Original, artwork7Original, artwork8Original,
  artwork9Original, artwork10Original, artwork11Original, artwork12Original,
  
  // Thumbnail artwork exports
  artwork1Thumbnail, artwork2Thumbnail, artwork3Thumbnail, artwork4Thumbnail,
  artwork5Thumbnail, artwork6Thumbnail, artwork7Thumbnail, artwork8Thumbnail,
  artwork9Thumbnail, artwork10Thumbnail, artwork11Thumbnail, artwork12Thumbnail,
  
  // Hero images
  homeHeroImage, ctaHeroImage
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

// Artwork data with direct references to imports
export const artworkData = {
  1: { title: "Abstract Harmony", thumbnail: artwork1Thumbnail, original: artwork1Original, artist: 101 },
  2: { title: "Sunset Dreams", thumbnail: artwork2Thumbnail, original: artwork2Original, artist: 102 },
  3: { title: "Urban Expressions", thumbnail: artwork3Thumbnail, original: artwork3Original, artist: 103 },
  4: { title: "Digital Landscape", thumbnail: artwork4Thumbnail, original: artwork4Original, artist: 104 },
  5: { title: "Neon Reflections", thumbnail: artwork5Thumbnail, original: artwork5Original, artist: 105 },
  6: { title: "Watercolor Dreams", thumbnail: artwork6Thumbnail, original: artwork6Original, artist: 106 },
  7: { title: "Fractured Reality", thumbnail: artwork7Thumbnail, original: artwork7Original, artist: 107 },
  8: { title: "Geometric Patterns", thumbnail: artwork8Thumbnail, original: artwork8Original, artist: 108 },
  9: { title: "Cityscape at Dusk", thumbnail: artwork9Thumbnail, original: artwork9Original, artist: 109 },
  10: { title: "Ocean Serenity", thumbnail: artwork10Thumbnail, original: artwork10Original, artist: 110 },
  11: { title: "Abstract Dreams", thumbnail: artwork11Thumbnail, original: artwork11Original, artist: 111 },
  12: { title: "Nature's Beauty", thumbnail: artwork12Thumbnail, original: artwork12Original, artist: 112 }
};

// Helper functions
export const getArtworkById = (id, type = 'thumbnail') => {
  const artworkMap = {
    1: { thumbnail: artwork1Thumbnail, original: artwork1Original },
    2: { thumbnail: artwork2Thumbnail, original: artwork2Original },
    3: { thumbnail: artwork3Thumbnail, original: artwork3Original },
    4: { thumbnail: artwork4Thumbnail, original: artwork4Original },
    5: { thumbnail: artwork5Thumbnail, original: artwork5Original },
    6: { thumbnail: artwork6Thumbnail, original: artwork6Original },
    7: { thumbnail: artwork7Thumbnail, original: artwork7Original },
    8: { thumbnail: artwork8Thumbnail, original: artwork8Original },
    9: { thumbnail: artwork9Thumbnail, original: artwork9Original },
    10: { thumbnail: artwork10Thumbnail, original: artwork10Original },
    11: { thumbnail: artwork11Thumbnail, original: artwork11Original },
    12: { thumbnail: artwork12Thumbnail, original: artwork12Original }
  };
  
  return type === 'thumbnail' 
    ? artworkMap[id]?.thumbnail 
    : artworkMap[id]?.original;
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

// For backward compatibility
export const heroImages = {
  homeHero: homeHeroImage,
  ctaHero: ctaHeroImage,
};

// Default export
export default {
  heroImages,
  artistAvatars,
  artistData,
  artworkData,
  getArtworkById,
  getArtistAvatarById,
  getArtistNameById,
  getFullArtworkInfo
}; 