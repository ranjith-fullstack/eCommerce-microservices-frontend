import { useAuth } from '../context/AuthContext';
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  // Fetch cart items on initial load when the user is logged in
  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await api.get(
            `http://localhost:5003/api/cart/${user.userId}`
          );
          setCartItems(response.data.cart.items); // Set cart items
        } catch (error) {
          console.error('Failed to fetch cart items:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]); // Clear cart for non-logged-in users
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]); 

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return;
    try {
      const response = await api.patch(
        `http://localhost:5003/api/cart/${user.userId}/items/${productId}/quantity`,
        { quantity: newQuantity }
      );
      setCartItems(response.data.cart.items); // Update cart items
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user || !productId) {
      console.error('User or product ID is missing');
      return;
    }
    try {
      const response = await api.delete(
        `http://localhost:5003/api/cart/${user.userId}/items/${productId}`
      );
      setCartItems(response.data.cart.items); // Update the cart items after removal
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + (item.quantity || 0),
    0
  );
  if (loading) {
    return null; // Show nothing or a loader until cart data is fetched
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        setCartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
