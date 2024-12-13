import { useAuth } from '../../context/AuthContext';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
 
  const { user } = useAuth(); // Get the current logged-in user's data

  const handleAddToCart = async () => {
   
    if (!user) {
      toast.error('You need to log in to add items to the cart');
      return;
    }
    try {
      const response = await api.post('http://localhost:5003/api/cart/add', {
        userId: user.userId,// Use the logged-in user's ID
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

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          {isFavorite(product._id) ? (
            <HeartSolidIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 text-xl font-bold mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        <button
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}