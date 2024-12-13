import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, TruckIcon, CalculatorIcon } from '@heroicons/react/24/outline';

export default function CartSummary() {
  const { cartTotal = 0, cart = [] } = useCart(); // Provide default values
  const subtotal = cartTotal;
  const shipping = cart.length > 0 ? 10.0 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
          Order Summary
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TruckIcon className="h-5 w-5 text-green-500" />
              <span className="text-gray-600">Shipping</span>
            </div>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <CalculatorIcon className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600">Estimated Tax</span>
            </div>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-4 text-lg font-semibold">
            <span>Total</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/checkout"
            className="block w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors text-center font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Proceed to Checkout
          </Link>
          
          <Link
            to="/"
            className="block w-full text-center py-3 text-gray-600 hover:text-blue-600 transition-colors text-sm"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <p className="flex items-center gap-2">
            <TruckIcon className="h-5 w-5 text-blue-600" />
            Free shipping on orders over $100
          </p>
        </div>
      </div>
    </div>
  );
}
