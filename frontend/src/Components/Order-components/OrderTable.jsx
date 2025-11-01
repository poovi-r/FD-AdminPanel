import React from 'react';
import { Link } from 'react-router-dom';

const OrderTable = ({ orders, onUpdateStatus, onCancel, onNewOrder }) => {
  return (
    <>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Orders Management</h3>
            <p className="text-sm text-gray-500 mt-1">Manage customer orders</p>
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm flex items-center space-x-2"
            onClick={onNewOrder}
          >
            <span>+</span>
            <span>New Order</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id.slice(-7)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                  {order.products?.length > 0 ? (
                    <span className="truncate block">{order.products.map(p => p.name).join(', ')}</span>
                  ) : (
                    `${order.products?.length || 0} items`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{order.totalAmount?.toFixed(2) || '0.00'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                   <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {(order.status !== 'Delivered' && order.status !== 'Cancelled') && (
                    <button 
                      className="text-red-600 hover:text-red-900 font-medium transition-colors duration-200"
                      onClick={() => onCancel(order._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📦</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h4>
          <p className="text-sm">Create your first order to get started.</p>
        </div>
      )}
    </>
  );
};

export default OrderTable;