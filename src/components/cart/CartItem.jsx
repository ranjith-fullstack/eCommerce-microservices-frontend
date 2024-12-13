import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg w-32 h-32">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transform transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
          <button
            onClick={() => onRemove(item.productId)}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <div className="w-16 px-3 py-2 text-center bg-gray-50 rounded-lg font-medium">
              {item.quantity}
            </div>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              ${item.price.toFixed(2)} × {item.quantity}
            </div>
            <div className="text-lg font-semibold text-blue-600">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}