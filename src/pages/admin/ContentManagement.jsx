import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiFileText, FiCalendar, FiMessageSquare, FiEye, FiEdit2, FiTrash2, FiCheck, FiX } = FiIcons;

const ContentManagement = () => {
  const { blogPosts, events, testimonials } = useData();
  const [activeTab, setActiveTab] = useState('blog');

  const renderBlogPosts = () => (
    <div className="space-y-4">
      {blogPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex space-x-4">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                  <span>{post.readTime} min read</span>
                  {post.featured && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <SafeIcon icon={FiEye} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <SafeIcon icon={FiEdit2} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex space-x-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {event.organizer}</span>
                  <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                  <span>{event.price}</span>
                  <span>{event.registered}/{event.capacity} registered</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <SafeIcon icon={FiEye} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <SafeIcon icon={FiEdit2} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-4">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex space-x-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{testimonial.title}</p>
                <p className="text-gray-600 mb-2">"{testimonial.content}"</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiCheck}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'blog', label: 'Blog Posts', count: blogPosts.length, icon: FiFileText },
    { id: 'events', label: 'Events', count: events.length, icon: FiCalendar },
    { id: 'testimonials', label: 'Testimonials', count: testimonials.length, icon: FiMessageSquare }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600 mt-1">Review and moderate platform content</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-5 h-5" />
              <span>{tab.label}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'blog' && renderBlogPosts()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'testimonials' && renderTestimonials()}
      </div>
    </div>
  );
};

export default ContentManagement;