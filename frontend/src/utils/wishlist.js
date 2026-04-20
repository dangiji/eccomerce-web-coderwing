const WISHLIST_KEY = 'wishlist';

export const getWishlistIds = () => {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveWishlistIds = (ids) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
};

export const addToWishlist = (productId) => {
  console.log('Adding to wishlist:', productId);
  productId = String(productId); // Ensure it's a string
  const wishlist = getWishlistIds();
  console.log('Current wishlist:', wishlist);
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveWishlistIds(wishlist);
    console.log('Updated wishlist:', wishlist);
    return true;
  }
  console.log('Already in wishlist');
  return false;
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlistIds().filter((id) => id !== productId);
  saveWishlistIds(wishlist);
  return wishlist;
};


export const isInWishlist = (productId) => {
  return getWishlistIds().includes(productId);
};
