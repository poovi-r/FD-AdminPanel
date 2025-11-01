// UsersList.jsx (Main Page)
import React, { useState, useEffect } from 'react';
import axiosInstance, { API_PATHS } from '../Utils/apiPaths';
import UserFormModal from '../Components/User-components/UserFormModal';
import UserListTable from '../Components/User-components/UserListTable';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.USER.GET_USERS);
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log('Delete clicked for user ID:', id); // Debug log
    if (window.confirm('Delete this user?')) {
      try {
        console.log('Sending delete request for:', id); // Debug log
        const response = await axiosInstance.delete(API_PATHS.USER.DELETE_USER(id));
        console.log('Delete response:', response.data); // Debug log
        if (response.data.success) {
          fetchUsers(); // Refresh
        } else {
          alert(response.data.message || 'Failed to delete user');
        }
      } catch (err) {
        console.error('Delete error:', err); // Debug log
        console.error('Full error response:', err.response); // More debug
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    } else {
      console.log('Delete cancelled by user'); // Debug log
    }
  };

  const handleEdit = (user) => {
    console.log('Edit clicked for user:', user); // Debug log
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, mobile: user.mobile });
    setShowForm(true);
  };

  const handleOpenAddForm = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', mobile: '' });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', mobile: '' });
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
      console.log('Submitting form for user:', formData, editingUser ? 'update' : 'add'); // Debug log
      if (editingUser) {
        const response = await axiosInstance.put(API_PATHS.USER.UPDATE_USER(editingUser._id), formData);
        console.log('Update response:', response.data); // Debug log
        if (response.data.success) {
          setFormSuccess('User updated successfully!');
          fetchUsers();
          setTimeout(handleCloseForm, 1500);
        } else {
          setFormError(response.data.message);
        }
      } else {
        const response = await axiosInstance.post(API_PATHS.USER.ADD_USER, formData);
        console.log('Add response:', response.data); // Debug log
        if (response.data.success) {
          setFormSuccess('User added successfully!');
          fetchUsers();
          setTimeout(() => {
            setFormData({ name: '', email: '', mobile: '' });
          }, 1500);
        } else {
          setFormError(response.data.message);
        }
      }
    } catch (err) {
      console.error('Form submit error:', err); // Debug log
      setFormError(err.response?.data?.message || 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">Loading users...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-red-600 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <UserListTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddUser={handleOpenAddForm}
      />
      <UserFormModal
        showForm={showForm}
        editingUser={editingUser}
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

export default UsersList;