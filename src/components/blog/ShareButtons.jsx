import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShare2, FiHeart, FiFacebook, FiTwitter, FiLinkedin, FiCopy, FiCheck } = FiIcons;

const ShareButtons = ({ post, className = '' }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this article: ${post?.title}`;

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      
      // Store in localStorage to persist like state
      if (typeof window !== 'undefined') {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        likedPosts.push(post?.id);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
    setShowShareMenu(false);
  };

  // Check if post is already liked on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined' && post?.id) {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setLiked(likedPosts.includes(post.id));
    }
  }, [post?.id]);

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={liked}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
          liked
            ? 'bg-red-50 text-red-600 cursor-default'
            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
        }`}
      >
        <SafeIcon 
          icon={FiHeart} 
          className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} 
        />
        <span className="text-sm font-medium">{likeCount}</span>
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-all"
        >
          <SafeIcon icon={FiShare2} className="w-4 h-4" />
          <span className="text-sm font-medium">Share</span>
        </button>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[200px]">
            <button
              onClick={handleFacebookShare}
              className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiFacebook} className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Share on Facebook</span>
            </button>
            
            <button
              onClick={handleTwitterShare}
              className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiTwitter} className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Share on Twitter</span>
            </button>
            
            <button
              onClick={handleLinkedInShare}
              className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiLinkedin} className="w-4 h-4 text-blue-700" />
              <span className="text-sm">Share on LinkedIn</span>
            </button>
            
            <div className="border-t border-gray-200 my-1"></div>
            
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={copied ? FiCheck : FiCopy} className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-gray-600'}`} />
              <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ShareButtons;