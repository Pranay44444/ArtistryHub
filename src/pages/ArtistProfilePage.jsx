import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaBehance, FaGlobe, FaUserPlus, FaShareAlt } from 'react-icons/fa';
import { 
  GridView, 
  ViewColumn, 
  Chat, 
  NotificationsNone, 
  Group, 
  Favorite, 
  EmojiEvents, 
  Collections, 
  Dashboard 
} from '@mui/icons-material';

const artistData = {
  101: {
    id: 101,
    name: "Elena Kim",
    username: "elenakim",
    bio: "Digital artist exploring abstract forms and vibrant color combinations. My work is inspired by nature, music, and human emotions.",
    location: "Seoul, South Korea",
    website: "elenakim.art",
    followers: 2438,
    following: 187,
    artworksCount: 124,
    memberSince: "2019-04-15",
    verified: true,
    tags: ["digital art", "abstract", "colorful", "nft artist", "modern"]
  }
};

function ArtistProfilePage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('artworks');
  const [layout, setLayout] = useState('grid');
  const [following, setFollowing] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (id && artistData[parseInt(id)]) {
        setArtist(artistData[parseInt(id)]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    document.title = `${artist?.name} • ArtistryHub`;
    window.scrollTo(0, 0);
  }, [artist?.name]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  if (!artist) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Artist Not Found</h2>
          <p className="text-gray-600 mb-6">The artist profile you're looking for doesn't exist.</p>
          <Link to="/gallery" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200">
            Explore Gallery
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative -mt-24 mb-8">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="mt-4 md:mt-0 md:ml-6 md:flex-grow text-center md:text-left">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="md:flex md:items-center md:justify-between mb-4">
                  <div>
                    <div className="flex items-center justify-center md:justify-start">
                      <h1 className="text-3xl font-bold text-gray-900">{artist.name}</h1>
                      {artist.verified && (
                        <div className="ml-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600">@{artist.username}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-2">
                    <button
                      onClick={() => setFollowing(!following)}
                      className={`px-6 py-2 rounded-full ${
                        following
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-gradient-to-r from-purple-600 to-teal-500 text-white'
                      } font-medium transition-all`}
                    >
                      {following ? 'Following' : 'Follow'}
                    </button>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notifications
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <NotificationsNone />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
                      <Chat />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{artist.artworksCount}</p>
                    <p className="text-sm text-gray-600">Artworks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{artist.followers}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{artist.following}</p>
                    <p className="text-sm text-gray-600">Following</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{artist.bio}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  {artist.location && (
                    <div className="flex items-center text-gray-600">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {artist.location}
                    </div>
                  )}
                  {artist.website && (
                    <div className="flex items-center text-purple-600">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <a 
                        href={`https://${artist.website}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {new URL(artist.website).hostname}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <EmojiEvents className="mr-1 h-4 w-4" />
                    Member since {new Date(artist.memberSince).getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-16">
          {activeTab === 'artworks' && (
            <div>
              <div className={`grid ${
                layout === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
                  : 'grid-cols-1 sm:grid-cols-2 gap-6'
              }`}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <Link key={index} to={`/artwork/${index + 1}`} className="group">
                    <div className="rounded-xl overflow-hidden shadow-md bg-gray-100">
                      <div className={`${layout === 'grid' ? 'aspect-[4/5]' : 'aspect-[16/9]'} overflow-hidden relative`}>
                        <img
                          src={`/src/assets/artworks/thumbnails/artwork${(index % 12) + 1}.jpg`}
                          alt="Artwork"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-10 text-center">
                <button className="px-6 py-3 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-50">
                  Load More Artworks
                </button>
              </div>
            </div>
          )}
          {activeTab === 'collections' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden group">
                  <div className="relative h-48">
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
                      <div className="overflow-hidden">
                        <img 
                          src={`/src/assets/artworks/thumbnails/artwork${(index * 2) % 12 + 1}.jpg`}
                          alt="Collection artwork" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <img 
                          src={`/src/assets/artworks/thumbnails/artwork${(index * 2 + 1) % 12 + 1}.jpg`}
                          alt="Collection artwork" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <img 
                          src={`/src/assets/artworks/thumbnails/artwork${(index * 2 + 2) % 12 + 1}.jpg`}
                          alt="Collection artwork" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden relative">
                        <img 
                          src={`/src/assets/artworks/thumbnails/artwork${(index * 2 + 3) % 12 + 1}.jpg`}
                          alt="Collection artwork" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                          +{Math.floor(Math.random() * 10) + 4}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Collection {index + 1}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {Math.floor(Math.random() * 20) + 5} artworks
                    </p>
                    <p className="text-gray-700 line-clamp-2">
                      A collection of {['abstract', 'landscape', 'portrait', 'conceptual', 'minimal', 'expressive'][index % 6]} artworks showcasing the artist's unique style and vision.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'about' && (
            <div className="max-w-3xl">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About {artist.name}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {artist.bio}
                </p>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {artist.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Connect</h3>
                <div className="flex space-x-4">
                  {['twitter', 'instagram', 'youtube', 'linkedin'].map(platform => (
                    <a
                      key={platform}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-200"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistProfilePage;
