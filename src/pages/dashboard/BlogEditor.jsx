import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiSave, FiArrowLeft, FiImage, FiVideo, FiEye } = FiIcons;

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { blogPosts, addBlogPost, updateBlogPost } = useData();
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const isEditing = !!id;
  const currentPost = isEditing ? blogPosts.find(post => post.id === id) : null;

  useEffect(() => {
    if (isEditing && currentPost) {
      reset({
        title: currentPost.title,
        excerpt: currentPost.excerpt,
        thumbnail: currentPost.thumbnail
      });
      setContent(currentPost.content);
      setSelectedTags(currentPost.tags || []);
    }
  }, [isEditing, currentPost, reset]);

  const availableTags = [
    'Financial Planning', 'Investment', 'Retirement', 'Tax Strategy', 
    'Insurance', 'Estate Planning', 'Market Analysis', 'Savings',
    'Debt Management', 'Real Estate', 'Cryptocurrency', 'Economics'
  ];

  const onSubmit = async (data) => {
    try {
      const postData = {
        ...data,
        content,
        tags: selectedTags,
        author: user.name,
        authorId: user.id,
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        readTime: Math.ceil(content.split(' ').length / 200) // Estimate reading time
      };

      if (isEditing) {
        updateBlogPost(id, postData);
        toast.success('Blog post updated successfully');
      } else {
        addBlogPost(postData);
        toast.success('Blog post created successfully');
      }

      navigate('/dashboard/blog');
    } catch (error) {
      toast.error('An error occurred while saving the post');
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const insertContent = (type) => {
    const textarea = document.getElementById('content-editor');
    const cursorPos = textarea.selectionStart;
    let insertText = '';

    switch (type) {
      case 'image':
        insertText = '\n![Image Alt Text](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop)\n';
        break;
      case 'video':
        insertText = '\n<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>\n';
        break;
      default:
        return;
    }

    const newContent = content.slice(0, cursorPos) + insertText + content.slice(cursorPos);
    setContent(newContent);
  };

  const renderPreview = () => {
    return (
      <div className="prose max-w-none">
        <h1>{watch('title') || 'Blog Post Title'}</h1>
        <p className="text-gray-600 italic">{watch('excerpt') || 'Blog post excerpt...'}</p>
        {watch('thumbnail') && (
          <img src={watch('thumbnail')} alt="Thumbnail" className="w-full h-64 object-cover rounded-lg mb-4" />
        )}
        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/blog')}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Update your blog post' : 'Share your insights with your audience'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4" />
            <span>{preview ? 'Edit' : 'Preview'}</span>
          </button>
          <button
            form="blog-form"
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>{isEditing ? 'Update' : 'Publish'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {preview ? (
              <div className="min-h-96">
                {renderPreview()}
              </div>
            ) : (
              <form id="blog-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your blog post title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    {...register('excerpt', { required: 'Excerpt is required' })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Write a brief description of your post"
                  />
                  {errors.excerpt && (
                    <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
                  )}
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Image URL
                  </label>
                  <input
                    {...register('thumbnail', { required: 'Thumbnail is required' })}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>
                  )}
                </div>

                {/* Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => insertContent('image')}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Insert Image"
                      >
                        <SafeIcon icon={FiImage} className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertContent('video')}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Insert Video"
                      >
                        <SafeIcon icon={FiVideo} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    id="content-editor"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                    placeholder="Write your blog post content here. You can use HTML tags for formatting."
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Publishing Options */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Status</span>
                <span className="text-sm font-medium text-green-600">
                  {isEditing ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Author</span>
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-700">Estimated read time</span>
                <p className="text-sm font-medium text-gray-900">
                  {Math.ceil(content.split(' ').length / 200)} min read
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-700">Word count</span>
                <p className="text-sm font-medium text-gray-900">
                  {content.split(' ').length} words
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;