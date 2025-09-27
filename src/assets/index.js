import React from 'react';
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
import homeHeroImage from './heroes/home-hero.jpeg';
import bottomHeroImage from './heroes/bottom-hero.png';

export {
  // Thumbnail artwork exports
  artwork1Thumbnail, artwork2Thumbnail, artwork3Thumbnail, artwork4Thumbnail,
  artwork5Thumbnail, artwork6Thumbnail, artwork7Thumbnail, artwork8Thumbnail,
  artwork9Thumbnail, artwork10Thumbnail, artwork11Thumbnail, artwork12Thumbnail,
  homeHeroImage, bottomHeroImage
};

// For avatars
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
  1: { title: "Abstract Harmony", thumbnail: artwork1Thumbnail, artist: 101 },
  2: { title: "Sunset Dreams", thumbnail: artwork2Thumbnail, artist: 102 },
  3: { title: "Urban Expressions", thumbnail: artwork3Thumbnail, artist: 103 },
  4: { title: "Digital Landscape", thumbnail: artwork4Thumbnail, artist: 104 },
  5: { title: "Neon Reflections", thumbnail: artwork5Thumbnail, artist: 105 },
  6: { title: "Watercolor Dreams", thumbnail: artwork6Thumbnail, artist: 106 },
  7: { title: "Fractured Reality", thumbnail: artwork7Thumbnail, artist: 107 },
  8: { title: "Geometric Patterns", thumbnail: artwork8Thumbnail, artist: 108 },
  9: { title: "Cityscape at Dusk", thumbnail: artwork9Thumbnail, artist: 109 },
  10: { title: "Ocean Serenity", thumbnail: artwork10Thumbnail, artist: 110 },
  11: { title: "Abstract Dreams", thumbnail: artwork11Thumbnail, artist: 111 },
  12: { title: "Nature's Beauty", thumbnail: artwork12Thumbnail, artist: 112 }
};

// Helper functions
export const getArtworkById = (id) => {
  const artworkMap = {
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
    12: artwork12Thumbnail
  };
  return artworkMap[id];
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
    artist: getArtistNameById(artwork.artist),
    artistId: artwork.artist,
    artistAvatar: artistData[artwork.artist]?.avatar
  };
};

// For backward compatibility
export const heroImages = {
  homeHero: homeHeroImage,
  bottomHero: bottomHeroImage,
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