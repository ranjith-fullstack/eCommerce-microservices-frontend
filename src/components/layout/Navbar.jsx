import { Link } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              EShop
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Products
                </Link>
                <Link
                  to="/wishlist"
                  className="text-gray-700 hover:text-gray-900 relative"
                >
                  <HeartIcon className="h-6 w-6" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-gray-900 relative"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                    <UserIcon className="h-6 w-6" />
                    <span>Account</span>
                  </button>
                  <div className="absolute right-0 w-48  py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:z-10 z-[-999] transition-all duration-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
            {!user && (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 flex items-center space-x-1"
              >
                <UserIcon className="h-6 w-6" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
