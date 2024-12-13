import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext'; // Your custom hook
import { HeartIcon, TrashIcon } from '@heroicons/react/24/solid'; // Assuming TrashIcon for deleting
import { toast } from 'react-hot-toast';
import api from '../utils/api';

export default function Wishlist() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0); // Track favorites count
  const { addToCart } = useCart(); // Assuming addToCart function exists
  const { user } = useAuth();
  const userId = user.userId; // Replace with dynamic userId (you can get this from context or localStorage)

  // Fetch favorites from backend using axios
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get(`http://localhost:5003/api/favorites/${userId}`);
        setFavorites(response.data); // Set the data from the API response
        setFavoritesCount(response.data.length); // Set the initial count of favorites
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [userId]);

  // Delete the product from favorites
  const handleDeleteFavorite = async (productId) => {
    try {
      // Call the API to delete the product from favorites
      await api.delete(`http://localhost:5003/api/favorites/${userId}/${productId}`);
      // Update the local state to reflect the deletion
      const updatedFavorites = favorites.filter(fav => fav.product._id !== productId);
      setFavorites(updatedFavorites);
      setFavoritesCount(updatedFavorites.length); // Update the count of favorites
      toast.success('Removed from favorites');
      window.location.reload(); // Refresh the page to reflect the changes
    } catch (error) {
      console.error('Error deleting favorite:', error);
      toast.error('Something went wrong');
    }
  };

  // Handle Add to Cart functionality
  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error('You need to log in to add items to the cart');
      return;
    }
    try {
      const response = await api.post('http://localhost:5003/api/cart/add', {
        userId: user.userId, // Use the logged-in user's ID
        product: {
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      });
      if (response.status === 200) {
        addToCart(product); // Update the local cart context
        toast.success('Added to cart');
      }
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error(error);
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            Start adding products to your wishlist by clicking the heart icon on products you love.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist ({favoritesCount})</h1> {/* Display the count here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div key={favorite.product._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={favorite.product.image}
                alt={favorite.product.name}
                className="w-full h-48 object-cover"
              />
              {/* Display delete button for favorites */}
              <button
                onClick={() => handleDeleteFavorite(favorite.product._id)} // Handle delete functionality
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <TrashIcon className="h-6 w-6 text-red-500" /> {/* Trash icon for delete */}
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{favorite.product.name}</h3>
                <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                  {favorite.product.category}
                </span>
              </div>
              <p className="text-gray-600 text-xl font-bold mb-2">${favorite.product.price}</p>
              <p className="text-sm text-gray-500 mb-4">{favorite.product.description}</p>
              <button
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
                onClick={() => handleAddToCart(favorite.product)} // Add to cart
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
