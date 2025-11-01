import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './Components/AdminLayout';
import Dashboard from './Pages/Dashboard';
import ProductList from './Pages/ProductList';
import UsersList from './Pages/UsersList';
import CategoryList from './Pages/CategoriesList';
import OrdersList from './Pages/OrdersList';
import Login from './Auth/Login';
import Register from './Auth/Register';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {isLoggedIn ? (
        <AdminLayout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AdminLayout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;