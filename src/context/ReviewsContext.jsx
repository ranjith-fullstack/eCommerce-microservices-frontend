import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  const addReview = (productId, rating, comment) => {
    const newReview = {
      id: Date.now(),
      productId,
      userId: user.id,
      userEmail: user.email,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [...prev, newReview]);
    toast.success('Review added successfully');
  };

  const getProductReviews = (productId) => {
    return reviews.filter((review) => review.productId === productId);
  };

  const getUserReviews = (userId) => {
    return reviews.filter((review) => review.userId === userId);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getProductReviews, getUserReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
}