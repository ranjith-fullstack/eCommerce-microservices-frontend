import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewsContext';
import ReactStars from 'react-stars';
import { format } from 'date-fns';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { getProductReviews, addReview } = useReviews();
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  // In a real app, fetch product details from an API
  const product = {
    id: parseInt(id),
    name: 'Product Name',
    price: 99.99,
    description: 'Detailed product description...',
    image: 'https://example.com/image.jpg',
  };

  const reviews = getProductReviews(parseInt(id));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    addReview(product.id, newReview.rating, newReview.comment);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <div className="mt-3">
            <p className="text-3xl text-gray-900">${product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700">{product.description}</div>
          </div>

          <div className="mt-10">
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Reviews</h3>
            <div className="mt-6">
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <ReactStars
                    count={5}
                    value={newReview.rating}
                    onChange={(rating) => setNewReview({ ...newReview, rating })}
                    size={24}
                    color2="#4F46E5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Submit Review
                </button>
              </form>

              <div className="mt-8 space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-t pt-6">
                    <div className="flex items-center mb-2">
                      <ReactStars
                        count={5}
                        value={review.rating}
                        edit={false}
                        size={20}
                        color2="#4F46E5"
                      />
                      <span className="ml-2 text-sm text-gray-500">
                        {format(new Date(review.createdAt), 'PPP')}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      By {review.userEmail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}