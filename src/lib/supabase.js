import { createClient } from '@supabase/supabase-js';
const dbUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const dbKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
const isDemo = dbUrl === 'https://placeholder-supabase-url.supabase.co';
if (isDemo) {
  console.warn('⚠️ Using placeholder Supabase credentials. Mock data will be used for demo purposes.');
}
export const supabase = createClient(dbUrl, dbKey);
const demoUsers = [
  { id: '1', username: 'artist1', full_name: 'Artist One', email: 'artist1@example.com', avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', username: 'artist2', full_name: 'Artist Two', email: 'artist2@example.com', avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg' },
];
const demoArt = [
  { id: '1', title: 'Abstract Harmony', description: 'An exploration of color and form.', user_id: '1', image_url: 'https://picsum.photos/800/600?random=1', created_at: '2023-05-15', likes_count: 24, views_count: 102, category: 'Digital Art', style: 'Abstract' },
  { id: '2', title: 'Urban Landscape', description: 'A digital representation of modern city life.', user_id: '2', image_url: 'https://picsum.photos/800/600?random=2', created_at: '2023-05-10', likes_count: 18, views_count: 89, category: 'Photography', style: 'Urban' },
];
export const signUp = async ({ email, password, username, fullName }) => {
  if (isDemo) {
    return { user: { id: Math.random().toString(), email, username } };
  }
  try {
    const { data: user, error: userError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (userError) throw userError;
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.user.id,
          username,
          full_name: fullName,
          email,
        },
      ]);
    if (profileError) throw profileError;
    return user;
  } catch (error) {
    console.error('Sign up error:', error.message);
    throw error;
  }
};
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
};
export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  if (error) throw error;
  return data;
};
export const getArtworks = async ({ category, style, sortBy, page = 1, limit = 12 }) => {
  if (isDemo) {
    let filtered = [...demoArt];
    if (category) {
      filtered = filtered.filter(art => art.category === category);
    }
    if (style) {
      filtered = filtered.filter(art => art.style === style);
    }
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes_count - a.likes_count);
        break;
      case 'trending':
        filtered.sort((a, b) => b.views_count - a.views_count);
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    const artWithUsers = filtered.map(artwork => {
      const profile = demoUsers.find(p => p.id === artwork.user_id);
      return {
        ...artwork,
        profiles: profile
      };
    });
    return { 
      data: artWithUsers,
      count: filtered.length
    };
  }
  try {
    let query = supabase
      .from('artworks')
      .select(`
        *,
        profiles:user_id (username, avatar_url),
        tags:artwork_tags (tags (*))
      `);
    if (category) {
      query = query.eq('category', category);
    }
    if (style) {
      query = query.eq('style', style);
    }
    switch (sortBy) {
      case 'recent':
        query = query.order('created_at', { ascending: false });
        break;
      case 'popular':
        query = query.order('likes_count', { ascending: false });
        break;
      case 'trending':
        query = query.order('views_count', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await query
      .range(from, to)
      .limit(limit);
    if (error) throw error;
    return { data, count };
  } catch (error) {
    console.error('Error fetching artworks:', error.message);
    return { data: [], count: 0 };
  }
};
export const getArtwork = async (artworkId) => {
  if (isDemo) {
    const artwork = demoArt.find(a => a.id === artworkId);
    if (!artwork) {
      return null;
    }
    const profile = demoUsers.find(p => p.id === artwork.user_id);
    return {
      ...artwork,
      profiles: profile,
      tags: []
    };
  }
  try {
    const { data, error } = await supabase
      .from('artworks')
      .select(`
        *,
        profiles:user_id (
          id,
          username,
          full_name,
          avatar_url,
          bio
        ),
        tags:artwork_tags (
          tags (*)
        )
      `)
      .eq('id', artworkId)
      .single();
    if (error) throw error;
    await supabase.rpc('increment_view_count', { artwork_id: artworkId });
    return data;
  } catch (error) {
    console.error('Error fetching artwork:', error.message);
    return null;
  }
};
export const createArtwork = async (artwork) => {
  const { data, error } = await supabase
    .from('artworks')
    .insert([artwork])
    .select()
    .single();
  if (error) throw error;
  return data;
};
export const updateArtwork = async (artworkId, updates) => {
  const { data, error } = await supabase
    .from('artworks')
    .update(updates)
    .eq('id', artworkId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
export const deleteArtwork = async (artworkId) => {
  const { error } = await supabase
    .from('artworks')
    .delete()
    .eq('id', artworkId);
  if (error) throw error;
};
export const getComments = async (artworkId) => {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq('artwork_id', artworkId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};
export const createComment = async (comment) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .single();
  if (error) throw error;
  return data;
};
export const deleteComment = async (commentId) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);
  if (error) throw error;
};
export const toggleLike = async (artworkId, userId) => {
  const { data: existingLike } = await supabase
    .from('likes')
    .select()
    .eq('artwork_id', artworkId)
    .eq('user_id', userId)
    .single();
  if (existingLike) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id);
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from('likes')
      .insert([{ artwork_id: artworkId, user_id: userId }]);
    if (error) throw error;
    return true;
  }
};
export const checkLiked = async (artworkId, userId) => {
  const { data, error } = await supabase
    .from('likes')
    .select()
    .eq('artwork_id', artworkId)
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
};
export const getCollections = async (userId) => {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      items:collection_items (
        artworks (
          id,
          title,
          thumbnail_url
        )
      )
    `)
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
export const createCollection = async (collection) => {
  const { data, error } = await supabase
    .from('collections')
    .insert([collection])
    .select()
    .single();
  if (error) throw error;
  return data;
};
export const addToCollection = async (collectionId, artworkId) => {
  const { error } = await supabase
    .from('collection_items')
    .insert([{ collection_id: collectionId, artwork_id: artworkId }]);
  if (error) throw error;
};
export const removeFromCollection = async (collectionId, artworkId) => {
  const { error } = await supabase
    .from('collection_items')
    .delete()
    .eq('collection_id', collectionId)
    .eq('artwork_id', artworkId);
  if (error) throw error;
};
export const getTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');
  if (error) throw error;
  return data;
};
export const createTag = async (tag) => {
  const { data, error } = await supabase
    .from('tags')
    .insert([tag])
    .select()
    .single();
  if (error) throw error;
  return data;
};
export const uploadImage = async (file, path) => {
  const ext = file.name.split('.').pop();
  const name = `${Math.random().toString(36).substring(2)}.${ext}`;
  const fullPath = `${path}/${name}`;
  const { error: uploadError } = await supabase.storage
    .from('artworks')
    .upload(fullPath, file);
  if (uploadError) throw uploadError;
  const { data: { publicUrl } } = supabase.storage
    .from('artworks')
    .getPublicUrl(fullPath);
  return publicUrl;
};
export const deleteImage = async (path) => {
  const { error } = await supabase.storage
    .from('artworks')
    .remove([path]);
  if (error) throw error;
};