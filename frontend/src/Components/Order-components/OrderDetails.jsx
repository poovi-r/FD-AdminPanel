// OrderDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance, { API_PATHS } from '../Utils/apiPaths.js';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.ORDER.GET_ORDER_BY_ID(orderId));
      if (response.data.success) {
        setOrder(response.data.order);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">Loading order details...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-red-600 text-center">{error}</div>;
  if (!order) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">Order not found.</div>;

  // Assuming quantities are 1 per product as per current form; adjust if backend populates differently
  const productsWithQty = order.products?.map(product => ({ ...product, quantity: 1 })) || [];
  const subtotal = productsWithQty.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = order.totalAmount || subtotal; // Use stored total if available

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-7)}</h1>
            <p className="text-sm text-gray-500 mt-1">Order placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <Link
            to="/orders"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Customer Info Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Name</p>
              <p className="text-gray-900">{order.user?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <p className="text-gray-900">{order.user?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Mobile</p>
              <p className="text-gray-900">{order.user?.mobile || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Products List Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {productsWithQty.length > 0 ? (
              productsWithQty.map((item) => (
                <div key={item._id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No items in this order.</p>
            )}
          </div>
        </div>

        {/* Price Calculation Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal ({productsWithQty.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {/* Add tax, shipping if needed; assuming none for now */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax (0%)</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
          <div className="flex items-center justify-between">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {order.status}
            </span>
            <Link
              to={`/orders/${order._id}/edit`}
              className="text-blue-600 hover:text-blue-900 font-medium transition-colors duration-200"
            >
              Update Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;