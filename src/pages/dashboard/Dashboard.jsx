import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiUsers, FiFileText, FiCalendar, FiEdit3, FiTrendingUp, FiDollarSign, FiTarget, FiAward } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { clients, reports, events, blogPosts } = useData();

  const stats = [
    {
      title: 'Total Clients',
      value: clients.length,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Reports Generated',
      value: reports.length,
      icon: FiFileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Upcoming Events',
      value: events.length,
      icon: FiCalendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+3%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Blog Posts',
      value: blogPosts.length,
      icon: FiEdit3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+5%',
      changeColor: 'text-green-600'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Client',
      description: 'Onboard a new client to your practice',
      icon: FiUsers,
      href: '/dashboard/clients',
      color: 'bg-blue-600'
    },
    {
      title: 'Create Report',
      description: 'Generate a financial analysis report',
      icon: FiFileText,
      href: '/dashboard/reports',
      color: 'bg-green-600'
    },
    {
      title: 'Schedule Event',
      description: 'Plan a new event or meeting',
      icon: FiCalendar,
      href: '/dashboard/events',
      color: 'bg-purple-600'
    },
    {
      title: 'Write Blog Post',
      description: 'Share insights with your audience',
      icon: FiEdit3,
      href: '/dashboard/blog/new',
      color: 'bg-orange-600'
    }
  ];

  const recentActivity = [
    { type: 'client', message: 'New client John Doe added', time: '2 hours ago' },
    { type: 'report', message: 'Financial analysis report generated', time: '4 hours ago' },
    { type: 'event', message: 'Investment seminar scheduled', time: '1 day ago' },
    { type: 'blog', message: 'New blog post published', time: '2 days ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your practice today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Today's Date</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString()}
              </p>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={action.href}
                className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className={`${action.color} p-2 rounded-lg`}>
                    <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Revenue Growth</span>
              </div>
              <span className="text-sm font-semibold text-green-600">+15.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTarget} className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Client Satisfaction</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">4.8/5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiAward} className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Goal Achievement</span>
              </div>
              <span className="text-sm font-semibold text-purple-600">87%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;