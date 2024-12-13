import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../components/checkout/ShippingForm';
import ShippingConfirmation from '../components/checkout/ShippingConfirmation';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import { initializeRazorpay } from '../utils/razorpay';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import api from '../utils/api';

export default function Checkout() {
  const { user } = useAuth(); // Get user data from context
  const userId = user ? user.userId : null; // Access userId (if user is logged in)

  const { clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Include userId in the payload
        const response = await api.post('http://localhost:5003/api/orders/orderadd', {
          ...formData,
          cartTotal,
          userId, // Add userId here
        });
  
        // Ensure response data is accessed correctly
        if (response && response.data && response.data.message === 'Order placed successfully') {
          setStep('confirmation');
        } else {
          throw new Error('Failed to create order: ' + (response.data.message || 'Unknown error'));
        }
      } catch (error) {
        // Axios error handling
        console.error('Error saving order:', error.message || error.response?.data || error);
        alert('Error saving order. Please try again!');
      }
    }
  };
  
  
  const handlePayment = async () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: cartTotal * 100,
      currency: "INR",
      name: "EcoShop",
      description: "Purchase from EcoShop",
      handler: function (response) {
        clearCart();
        navigate('/');
        alert('Payment successful! Order confirmed.');
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: "#2563EB"
      }
    };

    await initializeRazorpay(options);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Checkout</h1>
      <CheckoutProgress currentStep={step} />
      <div className="mt-8">
        {step === 'shipping' ? (
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <ShippingForm 
              formData={formData} 
              onChange={handleChange}
              errors={errors}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-lg font-medium"
            >
              Continue to Confirmation
            </button>
          </form>
        ) : (
          <ShippingConfirmation 
            formData={formData}
            onProceedToPayment={handlePayment}
          />
        )}
      </div>
    </div>
  );
}
