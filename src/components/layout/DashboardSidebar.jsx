import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import GetStartedComponent from '../quest/GetStartedComponent';

const { FiHome, FiUsers, FiFileText, FiCalendar, FiEdit3, FiUser, FiPlay, FiX } = FiIcons;

const DashboardSidebar = () => {
  const location = useLocation();
  const [showGetStarted, setShowGetStarted] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/dashboard/clients', label: 'Clients', icon: FiUsers },
    { path: '/dashboard/reports', label: 'Reports', icon: FiFileText },
    { path: '/dashboard/events', label: 'Events', icon: FiCalendar },
    { path: '/dashboard/blog', label: 'Blog', icon: FiEdit3 },
    { path: '/dashboard/profile', label: 'Profile', icon: FiUser }
  ];

  const isActive = (path) => location.pathname === path;

  const handleGetStartedClick = () => {
    setShowGetStarted(true);
  };

  const handleCloseGetStarted = () => {
    setShowGetStarted(false);
  };

  return (
    <>
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
        <nav className="mt-8">
          <div className="px-4 space-y-1">
            {/* Get Started Button */}
            <button
              onClick={handleGetStartedClick}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-primary-50 text-primary-600 hover:bg-primary-100 border border-primary-200 mb-4"
            >
              <SafeIcon icon={FiPlay} className="w-5 h-5" />
              <span>Get Started Guide</span>
            </button>

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

      {/* GetStarted Modal/Overlay */}
      {showGetStarted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            <button
              onClick={handleCloseGetStarted}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-gray-600" />
            </button>
            <GetStartedComponent onClose={handleCloseGetStarted} />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;