import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFileText, FiClock, FiTarget, FiTrendingUp } = FiIcons;

const WritingStats = ({ content = '', readingSpeed = 200 }) => {
  // Calculate stats
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.replace(/<[^>]*>/g, '').length;
  const charCountWithSpaces = content.replace(/<[^>]*>/g, '').length;
  const readTime = Math.max(1, Math.ceil(wordCount / readingSpeed));
  
  // Paragraphs count (approximate)
  const paragraphCount = content.split(/<\/p>|<br>/i).length - 1 || 1;
  
  // Reading level estimation (simple)
  const avgWordsPerSentence = wordCount / Math.max(1, content.split(/[.!?]+/).length - 1);
  const getReadingLevel = () => {
    if (avgWordsPerSentence <= 10) return 'Easy';
    if (avgWordsPerSentence <= 15) return 'Medium';
    return 'Advanced';
  };

  const stats = [
    {
      label: 'Words',
      value: wordCount.toLocaleString(),
      icon: FiFileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Characters',
      value: charCount.toLocaleString(),
      icon: FiTarget,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Read Time',
      value: `${readTime} min`,
      icon: FiClock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Reading Level',
      value: getReadingLevel(),
      icon: FiTrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <SafeIcon icon={FiFileText} className="w-5 h-5 mr-2" />
        Writing Statistics
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <SafeIcon icon={stat.icon} className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Stats */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Detailed Analysis</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Characters (no spaces):</span>
            <span className="font-medium">{charCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Characters (with spaces):</span>
            <span className="font-medium">{charCountWithSpaces.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Paragraphs:</span>
            <span className="font-medium">{paragraphCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg. words per sentence:</span>
            <span className="font-medium">{Math.round(avgWordsPerSentence)}</span>
          </div>
        </div>
      </div>

      {/* Content Guidelines */}
      <div className="border-t pt-4 mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Content Guidelines</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span>Blog post length:</span>
            <span className={`font-medium ${
              wordCount >= 300 && wordCount <= 2000 ? 'text-green-600' : 'text-orange-600'
            }`}>
              {wordCount < 300 ? 'Too short' : wordCount > 2000 ? 'Very long' : 'Good length'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Reading time:</span>
            <span className={`font-medium ${
              readTime >= 2 && readTime <= 10 ? 'text-green-600' : 'text-orange-600'
            }`}>
              {readTime < 2 ? 'Too quick' : readTime > 10 ? 'Long read' : 'Optimal'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingStats;