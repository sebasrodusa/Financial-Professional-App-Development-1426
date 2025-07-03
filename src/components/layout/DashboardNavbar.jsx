import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import GetStartedComponent from '../quest/GetStartedComponent';

const { FiBell, FiSettings, FiLogOut, FiChevronDown, FiPlay, FiX } = FiIcons;

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);

  const handleGetStartedClick = () => {
    setShowGetStarted(true);
  };

  const handleCloseGetStarted = () => {
    setShowGetStarted(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FinancePro</span>
            </Link>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Get Started Button */}
              <button
                onClick={handleGetStartedClick}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-4 h-4" />
                <span className="hidden sm:inline">Get Started</span>
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                <SafeIcon icon={FiBell} className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-500" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      <SafeIcon icon={FiSettings} className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

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

export default DashboardNavbar;