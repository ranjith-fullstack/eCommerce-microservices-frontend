import { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Stores user data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [triggerReload, setTriggerReload] = useState(false); // Trigger for useEffect reload
  const navigate = useNavigate();

  // Runs when the user logs in or state is triggered
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        setUser({
          email: decodedToken.email,
          userId: decodedToken.userId,
          token,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Clear invalid token
        setUser(null);
      }
    } else {
      setUser(null); // Reset user if no token exists
    }
    setLoading(false); // Mark loading as complete
  }, [triggerReload]); // Re-run when triggerReload changes

  const login = (userData) => {
    localStorage.setItem('token', userData.token); // Save the token in localStorage
    const decodedToken = jwtDecode(userData.token); // Decode the token
    setUser({
      email: decodedToken.email,
      userId: decodedToken.userId,
      token: userData.token,
    });
    setTriggerReload((prev) => !prev); // Toggle triggerReload state
    navigate('/products'); // Redirect to the products page
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear the token
    setTriggerReload((prev) => !prev); // Toggle triggerReload state
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
