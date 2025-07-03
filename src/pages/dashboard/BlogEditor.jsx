import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import AdvancedEditor from '../../components/blog/AdvancedEditor';
import SEOOptimizer from '../../components/blog/SEOOptimizer';
import CategoryTagManager from '../../components/blog/CategoryTagManager';
import PublishingControlPanel from '../../components/blog/PublishingControlPanel';

const { FiArrowLeft, FiSave, FiEye, FiImage } = FiIcons;

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { blogPosts, addBlogPost, updateBlogPost } = useData();

  // Form and content state
  const [content, setContent] = useState('');
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    slug: '',
    ogImage: '',
    focusKeyword: ''
  });
  const [categoryTagData, setCategoryTagData] = useState({
    categories: [],
    tags: []
  });

  // Editor state
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('draft');

  const isEditing = !!id;
  const currentPost = isEditing ? blogPosts.find(post => post.id === id) : null;

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      excerpt: '',
      thumbnail: '',
      featured: false
    }
  });

  const formData = watch();

  // Load existing post data
  useEffect(() => {
    if (isEditing && currentPost) {
      reset({
        title: currentPost.title || '',
        excerpt: currentPost.excerpt || '',
        thumbnail: currentPost.thumbnail || '',
        featured: currentPost.featured || false
      });
      
      setContent(currentPost.content || '');
      setCurrentStatus(currentPost.status || 'draft');
      
      setSeoData({
        metaTitle: currentPost.metaTitle || currentPost.title || '',
        metaDescription: currentPost.metaDescription || currentPost.excerpt || '',
        slug: currentPost.slug || '',
        ogImage: currentPost.ogImage || '',
        focusKeyword: currentPost.focusKeyword || ''
      });
      
      setCategoryTagData({
        categories: currentPost.categories || [],
        tags: currentPost.tags || []
      });
    }
  }, [isEditing, currentPost, reset]);

  // Auto-save functionality
  useEffect(() => {
    if (formData.title || content) {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
      
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 10000); // Auto-save every 10 seconds
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [formData, content, seoData, categoryTagData]);

  // Draft recovery
  useEffect(() => {
    if (!isEditing) {
      const savedDraft = localStorage.getItem('blogEditorDraft');
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          if (window.confirm('A draft was found. Would you like to recover it?')) {
            reset(draft.formData);
            setContent(draft.content);
            setSeoData(draft.seoData);
            setCategoryTagData(draft.categoryTagData);
            setLastSaved(new Date(draft.savedAt));
          } else {
            localStorage.removeItem('blogEditorDraft');
          }
        } catch (error) {
          console.error('Error recovering draft:', error);
          localStorage.removeItem('blogEditorDraft');
        }
      }
    }
  }, [isEditing, reset]);

  const handleAutoSave = () => {
    const draftData = {
      formData,
      content,
      seoData,
      categoryTagData,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('blogEditorDraft', JSON.stringify(draftData));
    setLastSaved(new Date());
  };

  const handleSaveDraft = (publishData = {}) => {
    try {
      const postData = createPostData({
        ...publishData,
        action: 'draft',
        status: 'draft'
      });

      if (isEditing) {
        updateBlogPost(id, postData);
        toast.success('Draft updated successfully');
      } else {
        const newPost = addBlogPost(postData);
        toast.success('Draft saved successfully');
        navigate(`/dashboard/blog/edit/${newPost.id}`);
      }

      setCurrentStatus('draft');
      localStorage.removeItem('blogEditorDraft');
    } catch (error) {
      toast.error('Failed to save draft');
    }
  };

  const handlePublish = (publishData = {}) => {
    if (!validateForm()) return;

    try {
      const postData = createPostData({
        ...publishData,
        action: 'publish',
        status: 'published',
        publishedAt: new Date().toISOString()
      });

      if (isEditing) {
        updateBlogPost(id, postData);
        toast.success('Post updated successfully');
      } else {
        addBlogPost(postData);
        toast.success('Post published successfully');
        localStorage.removeItem('blogEditorDraft');
      }

      setCurrentStatus('published');
      navigate('/dashboard/blog');
    } catch (error) {
      toast.error('Failed to publish post');
    }
  };

  const handleSchedule = (publishData = {}) => {
    if (!validateForm()) return;

    try {
      const postData = createPostData({
        ...publishData,
        action: 'schedule',
        status: 'scheduled'
      });

      if (isEditing) {
        updateBlogPost(id, postData);
        toast.success('Post rescheduled successfully');
      } else {
        addBlogPost(postData);
        toast.success('Post scheduled successfully');
        localStorage.removeItem('blogEditorDraft');
      }

      setCurrentStatus('scheduled');
      navigate('/dashboard/blog');
    } catch (error) {
      toast.error('Failed to schedule post');
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    // In a real app, this would open a preview modal or new tab
    toast.info('Preview functionality would open here');
  };

  const createPostData = (publishData) => {
    const baseData = {
      ...formData,
      content,
      ...seoData,
      categories: categoryTagData.categories,
      tags: categoryTagData.tags,
      author: user?.name || 'Unknown',
      authorId: user?.id || 'unknown',
      readTime: calculateReadTime(content),
      updatedAt: new Date().toISOString()
    };

    if (publishData.scheduledAt) {
      baseData.scheduledAt = publishData.scheduledAt.toISOString();
    }

    if (publishData.status) {
      baseData.status = publishData.status;
    }

    if (publishData.visibility) {
      baseData.visibility = publishData.visibility;
    }

    if (publishData.publishedAt) {
      baseData.publishedAt = publishData.publishedAt;
    }

    return baseData;
  };

  const validateForm = () => {
    if (!formData.title?.trim()) {
      toast.error('Title is required');
      return false;
    }
    
    if (!formData.excerpt?.trim()) {
      toast.error('Excerpt is required');
      return false;
    }
    
    if (!content?.trim()) {
      toast.error('Content is required');
      return false;
    }
    
    return true;
  };

  const calculateReadTime = (htmlContent) => {
    const text = htmlContent.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Never';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now - lastSaved) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return lastSaved.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard/blog')}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-white"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEditing ? 'Update your blog post content and settings' : 'Create engaging content for your audience'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleSaveDraft()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              <button
                type="button"
                onClick={handlePreview}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Post Information</h2>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter an engaging title for your post"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    {...register('excerpt', { required: 'Excerpt is required' })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Write a compelling summary of your post (150-160 characters recommended)"
                    maxLength={200}
                  />
                  {errors.excerpt && (
                    <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.excerpt?.length || 0}/200 characters
                  </p>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiImage} className="w-4 h-4 inline mr-1" />
                    Featured Image URL *
                  </label>
                  <input
                    {...register('thumbnail', { required: 'Featured image is required' })}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>
                  )}
                  
                  {/* Image Preview */}
                  {formData.thumbnail && (
                    <div className="mt-3">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    {...register('featured')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-900">
                    Mark as featured post
                  </label>
                  <span className="text-xs text-gray-500">(Featured posts appear prominently on the blog)</span>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
              <AdvancedEditor
                value={content}
                onChange={setContent}
                placeholder="Start writing your blog post..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Controls */}
            <PublishingControlPanel
              onPublish={handlePublish}
              onSaveDraft={handleSaveDraft}
              onSchedule={handleSchedule}
              onPreview={handlePreview}
              isEditing={isEditing}
              currentStatus={currentStatus}
              lastSaved={formatLastSaved()}
            />

            {/* Categories & Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <CategoryTagManager
                selectedCategories={categoryTagData.categories}
                selectedTags={categoryTagData.tags}
                onChange={setCategoryTagData}
              />
            </div>

            {/* SEO Optimizer */}
            <SEOOptimizer
              formData={formData}
              seoData={seoData}
              onChange={setSeoData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;