import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import AuthorCard from '../../components/blog/AuthorCard';
import ShareButtons from '../../components/blog/ShareButtons';

const { FiArrowLeft, FiClock, FiUser, FiTag, FiCalendar } = FiIcons;

const BlogPost = () => {
  const { id } = useParams();
  const { blogPosts, professionals } = useData();
  
  const post = blogPosts.find(p => p.id === id);
  const author = professionals.find(p => p.id === post?.authorId);

  if (!post) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 pb-6">
            {/* Categories & Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories?.map((category) => (
                <span
                  key={category.value}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium"
                >
                  {category.label}
                </span>
              ))}
              {post.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag.value}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag.label}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiUser} className="w-4 h-4" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiClock} className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons post={post} className="mb-6" />
          </div>

          {/* Featured Image */}
          <div className="aspect-video">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="px-8 pb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <SafeIcon icon={FiTag} className="w-4 h-4 mr-1" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.value}
                    to={`/blog?tag=${tag.value}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    #{tag.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Section */}
          {author && (
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
              <AuthorCard author={author} />
            </div>
          )}

          {/* Share Again */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Enjoyed this article?</h3>
                <p className="text-gray-600">Share it with your network</p>
              </div>
              <ShareButtons post={post} />
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video">
                    <img
                      src={relatedPost.thumbnail}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>{relatedPost.author}</span>
                      <span>{format(new Date(relatedPost.publishedAt), 'MMM d, yyyy')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;