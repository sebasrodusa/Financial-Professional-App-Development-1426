import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiPlus, FiEdit2, FiTrash2, FiEye, FiClock, FiTag, FiSearch } = FiIcons;

const MyBlog = () => {
  const { blogPosts, deleteBlogPost } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter posts by current user
  const myPosts = blogPosts.filter(post => post.authorId === user?.id);

  // Apply search and status filters
  const filteredPosts = myPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'featured' && post.featured) ||
                         (filterStatus === 'regular' && !post.featured);
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage your published articles and insights</p>
        </div>
        <Link
          to="/dashboard/blog/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Posts</option>
            <option value="featured">Featured</option>
            <option value="regular">Regular</option>
          </select>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {post.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link
                  to={`/dashboard/blog/edit/${post.id}`}
                  className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <SafeIcon icon={FiEdit2} className="w-4 h-4 text-gray-600" />
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                </div>
                <span>{post.readTime} min read</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                <Link
                  to={`/blog/${post.id}`}
                  className="flex-1 bg-primary-50 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-100 transition-colors text-center text-sm flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                  <span>View Live</span>
                </Link>
                <Link
                  to={`/dashboard/blog/edit/${post.id}`}
                  className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-center text-sm flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                  <span>Edit</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiEdit2} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm || filterStatus !== 'all' ? 'No posts match your filters' : 'No blog posts yet'}
          </p>
          <p className="text-gray-400">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first blog post to get started'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBlog;