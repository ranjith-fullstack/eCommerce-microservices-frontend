import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait until loading is complete before rendering
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected route if the user is authenticated
  return children;
}
