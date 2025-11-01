import React, { useState, useEffect } from 'react';
import axiosInstance, { API_PATHS } from '../Utils/apiPaths.js';
import CategoryListTable from '../Components/Category-components/CategoryListTable.jsx';
import CategoryFormModal from '../Components/Category-components/CategoryFormModal.jsx';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.CATEGORY.GET_CATEGORIES);
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        const response = await axiosInstance.delete(API_PATHS.CATEGORY.DELETE_CATEGORY(id));
        if (response.data.success) {
          fetchCategories();
        }
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete');
      }
    }
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description });
    setShowForm(true);
  };

  const handleOpenAddForm = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
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
      if (editingCategory) {
        const response = await axiosInstance.put(API_PATHS.CATEGORY.UPDATE_CATEGORY(editingCategory._id), formData);
        if (response.data.success) {
          setFormSuccess('Category updated successfully!');
          fetchCategories();
          setTimeout(handleCloseForm, 1500);
        } else {
          setFormError(response.data.message);
        }
      } else {
        const response = await axiosInstance.post(API_PATHS.CATEGORY.ADD_CATEGORY, formData);
        if (response.data.success) {
          setFormSuccess('Category added successfully!');
          fetchCategories();
          setTimeout(() => {
            setFormData({ name: '', description: '' });
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

  if (loading) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">Loading categories...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-red-600 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <CategoryListTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddCategory={handleOpenAddForm}
      />
      <CategoryFormModal
        showForm={showForm}
        editingCategory={editingCategory}
        formData={formData}
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

export default CategoryList;