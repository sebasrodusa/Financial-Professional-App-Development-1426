import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiTrendingUp, FiUsers, FiFileText, FiCalendar, FiEye, FiMessageSquare, FiActivity, FiBarChart } = FiIcons;

const Analytics = () => {
  const { professionals, blogPosts, events, testimonials } = useData();

  const analyticsData = [
    {
      title: 'Total Users',
      value: professionals.length,
      change: '+12%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'Content Published',
      value: blogPosts.length,
      change: '+8%',
      changeType: 'positive',
      icon: FiFileText,
      color: 'green'
    },
    {
      title: 'Events Created',
      value: events.length,
      change: '+25%',
      changeType: 'positive',
      icon: FiCalendar,
      color: 'purple'
    },
    {
      title: 'User Engagement',
      value: '4.8/5',
      change: '+5%',
      changeType: 'positive',
      icon: FiActivity,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor platform performance and user engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <p className={`text-sm mt-1 ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${getColorClasses(metric.color)}`}>
                <SafeIcon icon={metric.icon} className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <SafeIcon icon={FiBarChart} className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </motion.div>

        {/* Content Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiFileText} className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Blog Posts</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{blogPosts.length} published</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiCalendar} className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Events</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{events.length} created</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Testimonials</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{testimonials.length} received</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiEye} className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">Page Views</span>
              </div>
              <span className="text-sm font-medium text-gray-900">12,345 this month</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">New professional registered</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Blog post published</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Event created</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Testimonial submitted</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">145ms</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Active Issues</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;