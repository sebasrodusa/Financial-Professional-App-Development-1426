import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTag, FiFolderPlus, FiPlus, FiX, FiEdit2, FiTrash2, FiCheck } = FiIcons;

const CategoryTagManager = ({ selectedCategories = [], selectedTags = [], onChange }) => {
  const { blogCategories = [], blogTags = [], addBlogCategory, addBlogTag, deleteBlogCategory, deleteBlogTag } = useData();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');
  const [newTagName, setNewTagName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTag, setEditingTag] = useState(null);

  const predefinedColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
  ];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        slug: newCategoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        color: newCategoryColor,
        postCount: 0
      };
      
      addBlogCategory(category);
      setNewCategoryName('');
      setNewCategoryColor('#3B82F6');
      setShowAddCategory(false);
    }
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const tag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        slug: newTagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        postCount: 0
      };
      
      addBlogTag(tag);
      setNewTagName('');
      setShowAddTag(false);
    }
  };

  const handleCategoryToggle = (category) => {
    const isSelected = selectedCategories.some(cat => cat.id === category.id);
    let newCategories;
    
    if (isSelected) {
      newCategories = selectedCategories.filter(cat => cat.id !== category.id);
    } else {
      newCategories = [...selectedCategories, category];
    }
    
    onChange({ categories: newCategories, tags: selectedTags });
  };

  const handleTagToggle = (tag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    let newTags;
    
    if (isSelected) {
      newTags = selectedTags.filter(t => t.id !== tag.id);
    } else {
      newTags = [...selectedTags, tag];
    }
    
    onChange({ categories: selectedCategories, tags: newTags });
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteBlogCategory(categoryId);
      // Remove from selected if it was selected
      const newCategories = selectedCategories.filter(cat => cat.id !== categoryId);
      onChange({ categories: newCategories, tags: selectedTags });
    }
  };

  const handleDeleteTag = (tagId) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      deleteBlogTag(tagId);
      // Remove from selected if it was selected
      const newTags = selectedTags.filter(t => t.id !== tagId);
      onChange({ categories: selectedCategories, tags: newTags });
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <SafeIcon icon={FiFolderPlus} className="w-5 h-5 mr-2" />
            Categories
          </h3>
          <button
            type="button"
            onClick={() => setShowAddCategory(true)}
            className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Add Category Form */}
        {showAddCategory && (
          <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                <div className="flex space-x-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCategoryColor(color)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        newCategoryColor === color ? 'border-gray-600' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryName('');
                    setNewCategoryColor('#3B82F6');
                  }}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {blogCategories.map((category) => {
            const isSelected = selectedCategories.some(cat => cat.id === category.id);
            return (
              <div
                key={category.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  isSelected 
                    ? 'border-primary-300 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleCategoryToggle(category)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({category.postCount || 0} posts)
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {isSelected && (
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-primary-600" />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <SafeIcon icon={FiTrash2} className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
          
          {blogCategories.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No categories created yet. Add your first category above.
            </p>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <SafeIcon icon={FiTag} className="w-5 h-5 mr-2" />
            Tags
          </h3>
          <button
            type="button"
            onClick={() => setShowAddTag(true)}
            className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Tag</span>
          </button>
        </div>

        {/* Add Tag Form */}
        {showAddTag && (
          <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Tag name"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-primary-600 text-white rounded text-sm hover:bg-primary-700"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddTag(false);
                  setNewTagName('');
                }}
                className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tags List */}
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
          {blogTags.map((tag) => {
            const isSelected = selectedTags.some(t => t.id === tag.id);
            return (
              <div
                key={tag.id}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  isSelected 
                    ? 'border-primary-300 bg-primary-100 text-primary-700' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                <span className="text-sm">#{tag.name}</span>
                <span className="text-xs text-gray-500">({tag.postCount || 0})</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTag(tag.id);
                  }}
                  className="text-gray-400 hover:text-red-600"
                >
                  <SafeIcon icon={FiX} className="w-3 h-3" />
                </button>
              </div>
            );
          })}
          
          {blogTags.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4 w-full">
              No tags created yet. Add your first tag above.
            </p>
          )}
        </div>
      </div>

      {/* Selected Summary */}
      {(selectedCategories.length > 0 || selectedTags.length > 0) && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected for this post</h4>
          <div className="space-y-2">
            {selectedCategories.length > 0 && (
              <div>
                <span className="text-xs text-gray-600">Categories:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCategories.map((category) => (
                    <span
                      key={category.id}
                      className="px-2 py-1 text-xs rounded-full flex items-center space-x-1"
                      style={{ 
                        backgroundColor: `${category.color}20`,
                        color: category.color 
                      }}
                    >
                      <span>{category.name}</span>
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle(category)}
                        className="hover:opacity-70"
                      >
                        <SafeIcon icon={FiX} className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {selectedTags.length > 0 && (
              <div>
                <span className="text-xs text-gray-600">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full flex items-center space-x-1"
                    >
                      <span>#{tag.name}</span>
                      <button
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className="hover:opacity-70"
                      >
                        <SafeIcon icon={FiX} className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTagManager;