import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { API_PATHS } from '../Utils/apiPaths.js';
import StatsGrid from '../Components/Dash-components/StatsGrid.jsx';
import RecentOrders from '../Components/Dash-components/RecentOrders.jsx';


const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [deliveredRevenue, setDeliveredRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
    fetchRecentOrders();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD);
      if (response.data.success) {
        setDashboardData(response.data.dashboardData);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ORDER.GET_ORDERS);
      if (response.data.success) {
        const fullOrders = response.data.orders;
        const calculatedDeliveredRevenue = fullOrders.reduce((sum, order) => {
          if (order.status === 'Delivered') {
            return sum + order.totalAmount;
          }
          return sum;
        }, 0);
        setDeliveredRevenue(calculatedDeliveredRevenue);
        const sortedOrders = fullOrders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentOrders(sortedOrders);
      }
    } catch (err) {
      console.error('Failed to fetch recent orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="space-y-6 p-4">Loading dashboard...</div>;
  if (error) return <div className="space-y-6 p-4 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <StatsGrid 
        dashboardData={dashboardData} 
        deliveredRevenue={deliveredRevenue} 
      />
      <RecentOrders 
        recentOrders={recentOrders} 
        onViewAll={() => navigate('/orders')} 
      />
    </div>
  );
};

export default Dashboard;