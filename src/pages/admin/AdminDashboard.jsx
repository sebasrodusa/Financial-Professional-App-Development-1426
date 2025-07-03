import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiUsers, FiFileText, FiCalendar, FiEdit3, FiTrendingUp, FiActivity, FiEye, FiMessageSquare } = FiIcons;

const AdminDashboard = () => {
  const { professionals, blogPosts, events, testimonials } = useData();

  const stats = [
    {
      title: 'Total Professionals',
      value: professionals.length,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+5%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Blog Posts',
      value: blogPosts.length,
      icon: FiFileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Events',
      value: events.length,
      icon: FiCalendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Testimonials',
      value: testimonials.length,
      icon: FiMessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+15%',
      changeColor: 'text-green-600'
    }
  ];

  const recentActivity = [
    { type: 'user', message: 'New professional registered', time: '2 hours ago' },
    { type: 'blog', message: 'Blog post published', time: '4 hours ago' },
    { type: 'event', message: 'Event created', time: '6 hours ago' },
    { type: 'testimonial', message: 'New testimonial submitted', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage your platform's performance and content.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">System Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.changeColor} flex items-center`}>
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all">
              <SafeIcon icon={FiUsers} className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium">Manage Users</span>
            </button>
            <button className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all">
              <SafeIcon icon={FiFileText} className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium">Review Content</span>
            </button>
            <button className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all">
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium">View Analytics</span>
            </button>
            <button className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all">
              <SafeIcon icon={FiEye} className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium">Site Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">98.5%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">4.8/5</div>
            <div className="text-sm text-gray-600">User Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;