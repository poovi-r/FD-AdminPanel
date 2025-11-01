import React, { useState, useEffect } from 'react';
import axiosInstance, { API_PATHS } from '../Utils/apiPaths.js';
import OrderFormModal from '../Components/Order-components/OrderFormModal.jsx';
import OrderTable from '../Components/Order-components/OrderTable.jsx';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [formData, setFormData] = useState({ user: '', products: [], totalAmount: 0 });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchUsersForForm();
    fetchProductsForForm();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ORDER.GET_ORDERS);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersForForm = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USER.GET_USERS);
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users for form');
    }
  };

  const fetchProductsForForm = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.PRODUCT.GET_PRODUCTS);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products for form');
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      console.log('Updating status for order:', orderId, 'to:', status);
      const response = await axiosInstance.put(API_PATHS.ORDER.UPDATE_ORDER(orderId), { status });
      console.log('Update response:', response.data);
      if (response.data.success) {
        fetchOrders();
      } else {
        alert(response.data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleCancel = async (orderId) => {
    if (window.confirm('Cancel this order?')) {
      try {
        console.log('Cancelling order:', orderId);
        const response = await axiosInstance.put(API_PATHS.ORDER.CANCEL_ORDER(orderId));
        console.log('Cancel response:', response.data);
        if (response.data.success) {
          fetchOrders();
        } else {
          alert(response.data.message || 'Failed to cancel');
        }
      } catch (err) {
        console.error('Cancel error:', err);
        alert(err.response?.data?.message || 'Failed to cancel');
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'products') {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, products: selected });
      const total = selected.reduce((sum, prodId) => {
        const prod = products.find(p => p._id === prodId);
        return sum + (prod ? prod.price : 0);
      }, 0);
      setFormData(prev => ({ ...prev, products: selected, totalAmount: total }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNewOrderSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      console.log('Creating order:', formData);
      const response = await axiosInstance.post(API_PATHS.ORDER.ADD_ORDER, formData);
      console.log('Create response:', response.data);
      if (response.data.success) {
        setFormSuccess('Order created successfully!');
        fetchOrders();
        setTimeout(() => setShowNewOrderForm(false), 1500);
      } else {
        setFormError(response.data.message);
      }
    } catch (err) {
      console.error('Create error:', err);
      setFormError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenNewOrderForm = () => {
    setShowNewOrderForm(true);
  };

  const handleCloseForm = () => {
    setShowNewOrderForm(false);
    setFormData({ user: '', products: [], totalAmount: 0 });
    setFormError('');
    setFormSuccess('');
  };

  if (loading) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">Loading orders...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-red-600 text-center">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <OrderTable 
        orders={orders} 
        onUpdateStatus={handleUpdateStatus} 
        onCancel={handleCancel} 
        onNewOrder={handleOpenNewOrderForm} 
      />
      <OrderFormModal
        showForm={showNewOrderForm}
        formData={formData}
        users={users}
        products={products}
        formLoading={formLoading}
        formError={formError}
        formSuccess={formSuccess}
        onClose={handleCloseForm}
        onChange={handleFormChange}
        onSubmit={handleNewOrderSubmit}
      />
    </div>
  );
};

export default OrdersList;