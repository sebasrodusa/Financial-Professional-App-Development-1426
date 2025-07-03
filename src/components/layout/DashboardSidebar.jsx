import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiUsers, FiFileText, FiCalendar, FiEdit3, FiUser } = FiIcons;

const DashboardSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/dashboard/clients', label: 'Clients', icon: FiUsers },
    { path: '/dashboard/reports', label: 'Reports', icon: FiFileText },
    { path: '/dashboard/events', label: 'Events', icon: FiCalendar },
    { path: '/dashboard/blog', label: 'Blog', icon: FiEdit3 },
    { path: '/dashboard/profile', label: 'Profile', icon: FiUser }
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
                  ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
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

export default DashboardSidebar;