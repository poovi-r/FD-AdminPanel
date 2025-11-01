// StatsGrid.jsx
import React from 'react';

const StatsGrid = ({ dashboardData, deliveredRevenue }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100">
            <span className="text-blue-600">📦</span>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalOrders || 0}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100">
            <span className="text-green-600">₹</span>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Revenue (Delivered)</h3>
            <p className="text-2xl font-bold text-gray-900">₹{deliveredRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100">
            <span className="text-purple-600">👥</span>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalUsers || 0}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100">
            <span className="text-yellow-600">⏳</span>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{dashboardData?.pendingOrders || 0}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100">
            <span className="text-green-600">✅</span>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Delivered Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{dashboardData?.deliveredOrders || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;