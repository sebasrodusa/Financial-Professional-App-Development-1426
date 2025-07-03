import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiMail, FiMapPin, FiExternalLink } = FiIcons;

const AuthorCard = ({ author, showBio = true, size = 'default' }) => {
  const isSmall = size === 'small';
  
  return (
    <div className={`bg-gray-50 rounded-lg p-${isSmall ? '4' : '6'} border border-gray-200`}>
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <Link to={`/professionals/${author.id}`} className="flex-shrink-0">
          <img
            src={author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
            alt={author.name}
            className={`${isSmall ? 'w-12 h-12' : 'w-16 h-16'} rounded-full object-cover ring-2 ring-white shadow-lg`}
          />
        </Link>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Link
                to={`/professionals/${author.id}`}
                className={`${isSmall ? 'text-base' : 'text-lg'} font-semibold text-gray-900 hover:text-primary-600 transition-colors`}
              >
                {author.name}
              </Link>
              <p className={`${isSmall ? 'text-sm' : 'text-base'} text-gray-600`}>
                {author.title}
              </p>
              {author.company && (
                <p className="text-sm text-gray-500">{author.company}</p>
              )}
            </div>
            
            {!isSmall && (
              <Link
                to={`/professionals/${author.id}`}
                className="flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                View Profile
                <SafeIcon icon={FiExternalLink} className="w-3 h-3 ml-1" />
              </Link>
            )}
          </div>

          {/* Bio */}
          {showBio && author.bio && (
            <p className={`text-gray-600 ${isSmall ? 'text-sm' : 'text-base'} mb-3`}>
              {isSmall ? `${author.bio.substring(0, 100)}...` : author.bio}
            </p>
          )}

          {/* Specialties */}
          {!isSmall && author.specialties && author.specialties.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-700 mb-1">Specialties:</p>
              <div className="flex flex-wrap gap-1">
                {author.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
                {author.specialties.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{author.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Contact Info */}
          {!isSmall && (
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {author.location && (
                <div className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                  <span>{author.location}</span>
                </div>
              )}
              {author.email && (
                <div className="flex items-center">
                  <SafeIcon icon={FiMail} className="w-3 h-3 mr-1" />
                  <span>{author.email}</span>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {!isSmall && (
            <div className="mt-4">
              <Link
                to={`/professionals/${author.id}`}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                Connect with {author.name.split(' ')[0]}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;