import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext"; // Import useAuth for accessing the user context
import api from "../utils/api"; // Adjust the path as per your project structure

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0); // Track the count of favorite products
  const { user } = useAuth(); // Get the logged-in user from AuthContext

  useEffect(() => {
    // Fetch the initial list of favorites and set the count
    if (user) {
      api
        .get(`http://localhost:5003/api/favorites/${user.userId}`)
        .then((response) => {
          setFavorites(response.data);
          setFavoriteCount(response.data.length); // Set the initial count based on the fetched data
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  const toggleFavorite = async (product) => {
    if (!user) {
      toast.error("You need to log in to manage favorites");
      return;
    }

    if (!product || !product._id) {
      toast.error("Invalid product");
      return;
    }

    try {
      const isAlreadyFavorite = favorites.some(
        (item) => item._id === product._id
      );
      if (isAlreadyFavorite) {
        // Remove from favorites
        await api.delete(
          `http://localhost:5003/api/favorites/${user.userId}/${product._id}`
        );
        const updatedFavorites = favorites.filter(
          (item) => item._id !== product._id
        );
        setFavorites(updatedFavorites);
        setFavoriteCount(updatedFavorites.length); // Update the favorite count immediately
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const response = await api.post(
          "http://localhost:5003/api/favorites/add",
          {
            userId: user.userId,
            product,
          }
        );
        if (response.status === 200) {
          const updatedFavorites = [...favorites, product];
          setFavorites(updatedFavorites);
          setFavoriteCount(updatedFavorites.length); // Update the favorite count immediately
          toast.success("Added to favorites");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Already added to favorites");
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item._id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoriteCount, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
