export const artworkOriginals = {
  artwork1: '/src/assets/artworks/originals/artwork1.png',
  artwork2: '/src/assets/artworks/originals/artwork2.jpg',
  artwork3: '/src/assets/artworks/originals/artwork3.jpg',
  artwork4: '/src/assets/artworks/originals/artwork4.jpeg',
  artwork5: '/src/assets/artworks/originals/artwork5.webp',
  artwork6: '/src/assets/artworks/originals/artwork6.jpeg',
  artwork7: '/src/assets/artworks/originals/artwork7.jpg',
  artwork8: '/src/assets/artworks/originals/artwork8.webp',
  artwork9: '/src/assets/artworks/originals/artwork9.jpg',
  artwork10: '/src/assets/artworks/originals/artwork10.jpg',
  artwork11: '/src/assets/artworks/originals/artwork11.jpeg',
  artwork12: '/src/assets/artworks/originals/artwork12.jpg',
};
export const artworkThumbnails = {
  artwork1: '/src/assets/artworks/thumbnails/artwork1.png',
  artwork2: '/src/assets/artworks/thumbnails/artwork2.jpg',
  artwork3: '/src/assets/artworks/thumbnails/artwork3.jpg',
  artwork4: '/src/assets/artworks/thumbnails/artwork4.jpeg',
  artwork5: '/src/assets/artworks/thumbnails/artwork5.webp',
  artwork6: '/src/assets/artworks/thumbnails/artwork6.jpeg',
  artwork7: '/src/assets/artworks/thumbnails/artwork7.jpg',
  artwork8: '/src/assets/artworks/thumbnails/artwork8.webp',
  artwork9: '/src/assets/artworks/thumbnails/artwork9.jpg',
  artwork10: '/src/assets/artworks/thumbnails/artwork10.jpg',
  artwork11: '/src/assets/artworks/thumbnails/artwork11.jpeg',
  artwork12: '/src/assets/artworks/thumbnails/artwork12.jpg',
};
export const heroImages = {
  homeHero: '/src/assets/heroes/home-hero.jpeg',
  ctaHero: '/src/assets/heroes/bottom-hero.png',
};
export const artistAvatars = {
  avatar1: '/src/assets/avatars/avatar1.jpeg',
  avatar2: '/src/assets/avatars/avatar2.jpeg',
  avatar3: '/src/assets/avatars/avatar3.jpeg',
  avatar4: '/src/assets/avatars/avatar4.jpeg',
  avatar5: '/src/assets/avatars/avatar5.jpeg',
  avatar6: '/src/assets/avatars/avatar6.jpeg',
  avatar7: '/src/assets/avatars/avatar7.jpeg',
  avatar8: '/src/assets/avatars/avatar8.jpeg',
  avatar9: '/src/assets/avatars/avatar9.jpeg',
  avatar10: '/src/assets/avatars/avatar10.jpeg',
  avatar11: '/src/assets/avatars/avatar11.jpeg',
  avatar12: '/src/assets/avatars/avatar12.jpeg',
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