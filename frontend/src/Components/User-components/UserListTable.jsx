import React from 'react';

const UserListTable = ({ users, onEdit, onDelete, onAddUser }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Users Management</h3>
            <p className="text-sm text-gray-500 mt-1">Manage user accounts</p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm flex items-center space-x-2"
            onClick={onAddUser}
          >
            <span>+</span>
            <span>Add User</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="bg-white rounded-lg p-6 border border-gray-200 relative hover:shadow-sm transition-shadow duration-200 group">
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="group">
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">{user.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-1">{user.email}</p>
                  <p className="text-gray-600 text-sm">{user.mobile}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">👥</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">No users yet</h4>
            <p className="text-sm">Add your first user to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListTable;