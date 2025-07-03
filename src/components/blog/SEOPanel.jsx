import React from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiLink, FiImage, FiFileText } = FiIcons;

const SEOPanel = ({ data = {}, onChange }) => {
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      metaTitle: data.metaTitle || '',
      metaDescription: data.metaDescription || '',
      slug: data.slug || '',
      ogImage: data.ogImage || '',
      ...data
    }
  });

  const watchedValues = watch();

  React.useEffect(() => {
    onChange(watchedValues);
  }, [watchedValues, onChange]);

  const generateSlug = () => {
    const title = watchedValues.title || '';
    const slug = slugify(title, { lower: true, strict: true });
    setValue('slug', slug);
  };

  const autoFillSEO = () => {
    const title = watchedValues.title || '';
    const excerpt = watchedValues.excerpt || '';
    
    if (title && !watchedValues.metaTitle) {
      setValue('metaTitle', title);
    }
    
    if (excerpt && !watchedValues.metaDescription) {
      setValue('metaDescription', excerpt.substring(0, 160));
    }
    
    if (title && !watchedValues.slug) {
      generateSlug();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiSearch} className="w-5 h-5 mr-2" />
          SEO Settings
        </h3>
        <button
          type="button"
          onClick={autoFillSEO}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Auto-fill from content
        </button>
      </div>

      <div className="space-y-4">
        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <SafeIcon icon={FiFileText} className="w-4 h-4 inline mr-1" />
            Meta Title
          </label>
          <input
            {...register('metaTitle')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter meta title for search engines"
            maxLength={60}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Optimal length: 50-60 characters</span>
            <span>{watchedValues.metaTitle?.length || 0}/60</span>
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            {...register('metaDescription')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter meta description for search engines"
            maxLength={160}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Optimal length: 150-160 characters</span>
            <span>{watchedValues.metaDescription?.length || 0}/160</span>
          </div>
        </div>

        {/* Custom Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <SafeIcon icon={FiLink} className="w-4 h-4 inline mr-1" />
            URL Slug
          </label>
          <div className="flex">
            <input
              {...register('slug')}
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="custom-url-slug"
            />
            <button
              type="button"
              onClick={generateSlug}
              className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 text-sm"
            >
              Generate
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            URL: /blog/{watchedValues.slug || 'your-post-slug'}
          </p>
        </div>

        {/* OG Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <SafeIcon icon={FiImage} className="w-4 h-4 inline mr-1" />
            Open Graph Image (Optional)
          </label>
          <input
            {...register('ogImage')}
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Override thumbnail for social media sharing"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to use the post thumbnail for social media sharing
          </p>
        </div>

        {/* Preview */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Search Engine Preview</h4>
          <div className="border border-gray-200 rounded p-3 bg-gray-50">
            <div className="text-blue-600 text-sm hover:underline cursor-pointer">
              {watchedValues.metaTitle || 'Your Blog Post Title'}
            </div>
            <div className="text-green-600 text-xs mt-1">
              yoursite.com/blog/{watchedValues.slug || 'your-post-slug'}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {watchedValues.metaDescription || 'Your meta description will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOPanel;