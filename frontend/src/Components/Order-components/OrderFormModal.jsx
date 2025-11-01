// OrderFormModal.jsx
import React from 'react';

const OrderFormModal = ({ 
  showForm, 
  formData, 
  users, 
  products, 
  formLoading, 
  formError, 
  formSuccess, 
  onClose, 
  onChange, 
  onSubmit 
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 border border-gray-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">New Order</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        {formError && <p className="text-red-600 mb-4 text-sm bg-red-50 p-3 rounded-md border border-red-200">{formError}</p>}
        {formSuccess && <p className="text-green-600 mb-4 text-sm bg-green-50 p-3 rounded-md border border-green-200">{formSuccess}</p>}
        <form onSubmit={onSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
              <select
                name="user"
                value={formData.user}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={formLoading}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
              <select
                name="products"
                multiple
                value={formData.products}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                disabled={formLoading}
              >
                {products.map(prod => (
                  <option key={prod._id} value={prod._id}>{prod.name} - ₹{prod.price}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
              <input
                type="number"
                value={formData.totalAmount}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed"
                placeholder="Total Amount (auto-calculated)"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-200"
              disabled={formLoading || !formData.user || formData.products.length === 0}
            >
              {formLoading ? 'Creating...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;