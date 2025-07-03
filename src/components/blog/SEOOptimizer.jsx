import React, { useState, useEffect } from 'react';
import slugify from 'slugify';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiLink, FiImage, FiCheckCircle, FiAlertTriangle, FiInfo } = FiIcons;

const SEOOptimizer = ({ formData, seoData, onChange }) => {
  const [seoScore, setSeoScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    calculateSEOScore();
  }, [seoData, formData]);

  const calculateSEOScore = () => {
    let score = 0;
    const newSuggestions = [];

    // Title checks
    if (seoData.metaTitle) {
      if (seoData.metaTitle.length >= 30 && seoData.metaTitle.length <= 60) {
        score += 20;
      } else {
        newSuggestions.push({
          type: 'warning',
          message: 'Meta title should be between 30-60 characters'
        });
      }
    } else {
      newSuggestions.push({
        type: 'error',
        message: 'Meta title is required for SEO'
      });
    }

    // Description checks
    if (seoData.metaDescription) {
      if (seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160) {
        score += 20;
      } else {
        newSuggestions.push({
          type: 'warning',
          message: 'Meta description should be between 120-160 characters'
        });
      }
    } else {
      newSuggestions.push({
        type: 'error',
        message: 'Meta description is required for SEO'
      });
    }

    // Slug checks
    if (seoData.slug) {
      if (seoData.slug.length <= 60 && seoData.slug.match(/^[a-z0-9-]+$/)) {
        score += 15;
      } else {
        newSuggestions.push({
          type: 'warning',
          message: 'Slug should be lowercase, use hyphens, and be under 60 characters'
        });
      }
    }

    // Content checks
    if (formData.title) {
      score += 10;
    }
    if (formData.excerpt) {
      score += 10;
    }
    if (formData.thumbnail) {
      score += 10;
    }

    // Additional checks
    if (seoData.focusKeyword) {
      score += 15;
      if (seoData.metaTitle?.toLowerCase().includes(seoData.focusKeyword.toLowerCase())) {
        score += 10;
      } else {
        newSuggestions.push({
          type: 'info',
          message: 'Consider including your focus keyword in the meta title'
        });
      }
    }

    setSeoScore(Math.min(100, score));
    setSuggestions(newSuggestions);
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = slugify(formData.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      onChange({ ...seoData, slug });
    }
  };

  const autoFillSEO = () => {
    const updates = { ...seoData };
    
    if (formData.title && !seoData.metaTitle) {
      updates.metaTitle = formData.title;
    }
    
    if (formData.excerpt && !seoData.metaDescription) {
      updates.metaDescription = formData.excerpt.substring(0, 160);
    }
    
    if (formData.title && !seoData.slug) {
      updates.slug = slugify(formData.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
    }
    
    onChange(updates);
  };

  const getSEOScoreColor = () => {
    if (seoScore >= 80) return 'text-green-600';
    if (seoScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSEOScoreBg = () => {
    if (seoScore >= 80) return 'bg-green-100';
    if (seoScore >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with Score */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <SafeIcon icon={FiSearch} className="w-5 h-5 mr-2" />
            SEO Optimization
          </h3>
          <button
            type="button"
            onClick={autoFillSEO}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Auto-fill from content
          </button>
        </div>
        
        {/* SEO Score */}
        <div className={`p-3 rounded-lg ${getSEOScoreBg()}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">SEO Score</span>
            <span className={`text-lg font-bold ${getSEOScoreColor()}`}>
              {seoScore}/100
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                seoScore >= 80 ? 'bg-green-500' : 
                seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${seoScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Focus Keyword */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Focus Keyword
          </label>
          <input
            type="text"
            value={seoData.focusKeyword || ''}
            onChange={(e) => onChange({ ...seoData, focusKeyword: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your main keyword"
          />
          <p className="text-xs text-gray-500 mt-1">
            Main keyword you want this post to rank for
          </p>
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            value={seoData.metaTitle || ''}
            onChange={(e) => onChange({ ...seoData, metaTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter meta title for search engines"
            maxLength={60}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Appears in search results and browser tabs</span>
            <span className={`${(seoData.metaTitle?.length || 0) > 60 ? 'text-red-500' : ''}`}>
              {seoData.metaTitle?.length || 0}/60
            </span>
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            rows={3}
            value={seoData.metaDescription || ''}
            onChange={(e) => onChange({ ...seoData, metaDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter meta description for search engines"
            maxLength={160}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Appears in search results below the title</span>
            <span className={`${(seoData.metaDescription?.length || 0) > 160 ? 'text-red-500' : ''}`}>
              {seoData.metaDescription?.length || 0}/160
            </span>
          </div>
        </div>

        {/* URL Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <SafeIcon icon={FiLink} className="w-4 h-4 inline mr-1" />
            URL Slug
          </label>
          <div className="flex">
            <input
              type="text"
              value={seoData.slug || ''}
              onChange={(e) => onChange({ ...seoData, slug: e.target.value })}
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
            URL: yoursite.com/blog/{seoData.slug || 'your-post-slug'}
          </p>
        </div>

        {/* Open Graph Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <SafeIcon icon={FiImage} className="w-4 h-4 inline mr-1" />
            Social Media Image (Optional)
          </label>
          <input
            type="url"
            value={seoData.ogImage || ''}
            onChange={(e) => onChange({ ...seoData, ogImage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://example.com/social-image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Custom image for social media sharing (leave empty to use post thumbnail)
          </p>
        </div>

        {/* SEO Suggestions */}
        {suggestions.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">SEO Suggestions</h4>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <SafeIcon
                    icon={
                      suggestion.type === 'error' ? FiAlertTriangle :
                      suggestion.type === 'warning' ? FiAlertTriangle :
                      FiInfo
                    }
                    className={`w-4 h-4 mt-0.5 ${
                      suggestion.type === 'error' ? 'text-red-500' :
                      suggestion.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}
                  />
                  <span className="text-sm text-gray-600">{suggestion.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Preview */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Search Engine Preview</h4>
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <div className="text-blue-600 text-lg hover:underline cursor-pointer line-clamp-1">
              {seoData.metaTitle || formData.title || 'Your Blog Post Title'}
            </div>
            <div className="text-green-600 text-sm mt-1">
              yoursite.com/blog/{seoData.slug || 'your-post-slug'}
            </div>
            <div className="text-gray-600 text-sm mt-1 line-clamp-2">
              {seoData.metaDescription || formData.excerpt || 'Your meta description will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOOptimizer;