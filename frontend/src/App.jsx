import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './Components/AdminLayout';
import Dashboard from './Pages/Dashboard';
import ProductList from './Pages/ProductList';
import UsersList from './Pages/UsersList';
import CategoryList from './Pages/CategoriesList';
import OrdersList from './Pages/OrdersList';


function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/products" element={<ProductList />} /> {/* For add/edit, pass id via URL params if edit */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;