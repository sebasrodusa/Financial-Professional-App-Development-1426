import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRole } from '../../contexts/RoleContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLock } = FiIcons;

const RoleGuard = ({ 
  children, 
  permissions = [], 
  roles = [], 
  requireAll = false,
  fallback = null 
}) => {
  const { user } = useAuth();
  const { hasPermission, hasAnyPermission, hasAllPermissions, getUserRole } = useRole();

  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <SafeIcon icon={FiLock} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please log in to access this content</p>
        </div>
      </div>
    );
  }

  const userRole = getUserRole(user.id);

  // Check role-based access
  if (roles.length > 0) {
    const hasRequiredRole = roles.includes(userRole?.id);
    if (!hasRequiredRole) {
      return fallback || (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <SafeIcon icon={FiLock} className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-600">You don't have the required role to access this content</p>
            <p className="text-sm text-gray-500 mt-2">Required roles: {roles.join(', ')}</p>
          </div>
        </div>
      );
    }
  }

  // Check permission-based access
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(user.id, permissions)
      : hasAnyPermission(user.id, permissions);

    if (!hasAccess) {
      return fallback || (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <SafeIcon icon={FiLock} className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-600">You don't have permission to access this content</p>
            <p className="text-sm text-gray-500 mt-2">
              Required permissions: {permissions.join(', ')}
            </p>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default RoleGuard;