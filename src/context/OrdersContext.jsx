import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const createOrder = (cartItems, total) => {
    const newOrder = {
      id: Date.now(),
      userId: user.id,
      items: cartItems,
      total,
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    toast.success('Order placed successfully');
    return newOrder;
  };

  const getUserOrders = () => {
    return orders.filter((order) => order.userId === user.id);
  };

  return (
    <OrdersContext.Provider value={{ orders, createOrder, getUserOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}