// ProductList.jsx (Main Page)
import React, { useState, useEffect } from 'react';
import axiosInstance, { API_PATHS } from '../Utils/apiPaths.js';
import ProductListTable from '../Components/Product-components/ProductListTable.jsx';
import ProductFormModal from '../Components/Product-components/ProductFormModal.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.PRODUCT.GET_PRODUCTS);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.CATEGORY.GET_CATEGORIES);
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.error('Failed to fetch categories for dropdown');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        const response = await axiosInstance.delete(API_PATHS.PRODUCT.DELETE_PRODUCT(id));
        if (response.data.success) {
          fetchProducts(); // Refresh
        }
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category?._id || product.category
    });
    setShowForm(true);
  };

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', category: '' });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', category: '' });
    setFormError('');
    setFormSuccess('');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      if (editingProduct) {
        const response = await axiosInstance.put(API_PATHS.PRODUCT.UPDATE_PRODUCT(editingProduct._id), formData);
        if (response.data.success) {
          setFormSuccess('Product updated successfully!');
          fetchProducts();
          setTimeout(handleCloseForm, 1500);
        } else {
          setFormError(response.data.message);
        }
      } else {
        const response = await axiosInstance.post(API_PATHS.PRODUCT.ADD_PRODUCT, formData);
        if (response.data.success) {
          setFormSuccess('Product added successfully!');
          fetchProducts();
          setTimeout(() => {
            setFormData({ name: '', description: '', price: '', category: '' });
          }, 1500);
        } else {
          setFormError(response.data.message);
        }
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">Loading products...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-red-600 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <ProductListTable 
        products={products} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onAddProduct={handleOpenAddForm} 
      />
      <ProductFormModal
        showForm={showForm}
        editingProduct={editingProduct}
        formData={formData}
        categories={categories}
        formLoading={formLoading}
        formError={formError}
        formSuccess={formSuccess}
        onClose={handleCloseForm}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ProductList;