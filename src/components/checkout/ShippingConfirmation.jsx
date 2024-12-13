import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ShippingConfirmation({ formData, onProceedToPayment }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircleIcon className="h-8 w-8 text-green-500" />
        <h3 className="text-lg font-semibold">Confirm Shipping Details</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{formData.email}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Shipping Address</p>
          <p className="font-medium">
            {formData.address}<br />
            {formData.city}, {formData.state} {formData.zipCode}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Phone</p>
          <p className="font-medium">{formData.phone}</p>
        </div>
        
        <button
          onClick={onProceedToPayment}
          className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}