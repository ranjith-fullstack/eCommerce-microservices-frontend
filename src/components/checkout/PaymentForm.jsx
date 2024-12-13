import { useState } from 'react';
import { CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function PaymentForm({ formData, onChange }) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        {isSecure && (
          <div className="flex items-center text-green-600 text-sm">
            <LockClosedIcon className="h-4 w-4 mr-1" />
            <span>Secure Payment</span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="cardNumber"
              required
              value={formData.cardNumber}
              onChange={onChange}
              placeholder="1234 5678 9012 3456"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              maxLength="19"
            />
            <CreditCardIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              required
              value={formData.expiryDate}
              onChange={onChange}
              placeholder="MM/YY"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              maxLength="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="password"
              name="cvv"
              required
              value={formData.cvv}
              onChange={onChange}
              placeholder="123"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              maxLength="4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}