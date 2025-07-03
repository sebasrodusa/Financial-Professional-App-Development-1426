import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiUsers, FiFileText, FiBarChart3 } = FiIcons;

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: FiHome },
    { path: '/admin/users', label: 'User Management', icon: FiUsers },
    { path: '/admin/content', label: 'Content Management', icon: FiFileText },
    { path: '/admin/analytics', label: 'Analytics', icon: FiBarChart3 }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-red-50 text-red-600 border-r-2 border-red-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
              }`}
            >
              <SafeIcon icon={item.icon} className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;