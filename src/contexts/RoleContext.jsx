import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    initializeRoleSystem();
  }, []);

  const initializeRoleSystem = () => {
    // Default permissions
    const defaultPermissions = [
      // User Management
      { id: 'users.view', name: 'View Users', category: 'User Management', description: 'View user profiles and listings' },
      { id: 'users.create', name: 'Create Users', category: 'User Management', description: 'Create new user accounts' },
      { id: 'users.edit', name: 'Edit Users', category: 'User Management', description: 'Edit user profiles and information' },
      { id: 'users.delete', name: 'Delete Users', category: 'User Management', description: 'Delete user accounts' },
      { id: 'users.roles', name: 'Manage User Roles', category: 'User Management', description: 'Assign and modify user roles' },
      
      // Client Management
      { id: 'clients.view', name: 'View Clients', category: 'Client Management', description: 'View client profiles and data' },
      { id: 'clients.create', name: 'Create Clients', category: 'Client Management', description: 'Add new clients' },
      { id: 'clients.edit', name: 'Edit Clients', category: 'Client Management', description: 'Modify client information' },
      { id: 'clients.delete', name: 'Delete Clients', category: 'Client Management', description: 'Remove client records' },
      { id: 'clients.financial', name: 'Manage Financial Data', category: 'Client Management', description: 'Access and modify client financial data' },
      
      // Reports & Analytics
      { id: 'reports.view', name: 'View Reports', category: 'Reports & Analytics', description: 'View generated reports' },
      { id: 'reports.create', name: 'Create Reports', category: 'Reports & Analytics', description: 'Generate new reports' },
      { id: 'reports.export', name: 'Export Reports', category: 'Reports & Analytics', description: 'Export reports to various formats' },
      { id: 'analytics.view', name: 'View Analytics', category: 'Reports & Analytics', description: 'Access analytics dashboard' },
      
      // Content Management
      { id: 'blog.view', name: 'View Blog Posts', category: 'Content Management', description: 'View blog posts and articles' },
      { id: 'blog.create', name: 'Create Blog Posts', category: 'Content Management', description: 'Create new blog posts' },
      { id: 'blog.edit', name: 'Edit Blog Posts', category: 'Content Management', description: 'Edit blog posts and articles' },
      { id: 'blog.delete', name: 'Delete Blog Posts', category: 'Content Management', description: 'Remove blog posts' },
      { id: 'blog.publish', name: 'Publish Content', category: 'Content Management', description: 'Publish and unpublish content' },
      
      // Event Management
      { id: 'events.view', name: 'View Events', category: 'Event Management', description: 'View events and workshops' },
      { id: 'events.create', name: 'Create Events', category: 'Event Management', description: 'Create new events' },
      { id: 'events.edit', name: 'Edit Events', category: 'Event Management', description: 'Modify event details' },
      { id: 'events.delete', name: 'Delete Events', category: 'Event Management', description: 'Remove events' },
      
      // System Administration
      { id: 'system.settings', name: 'System Settings', category: 'System Administration', description: 'Access system configuration' },
      { id: 'system.backup', name: 'System Backup', category: 'System Administration', description: 'Perform system backups' },
      { id: 'system.logs', name: 'View System Logs', category: 'System Administration', description: 'Access system logs and audit trails' },
      { id: 'roles.manage', name: 'Manage Roles', category: 'System Administration', description: 'Create and modify user roles' },
    ];

    // Default roles with permissions
    const defaultRoles = [
      {
        id: 'super-admin',
        name: 'Super Administrator',
        description: 'Full system access with all permissions',
        color: '#DC2626',
        isSystemRole: true,
        permissions: defaultPermissions.map(p => p.id),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Administrative access with most permissions',
        color: '#EA580C',
        isSystemRole: true,
        permissions: defaultPermissions.filter(p => !p.id.includes('system')).map(p => p.id),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'manager',
        name: 'Manager',
        description: 'Management level access to users and content',
        color: '#CA8A04',
        isSystemRole: true,
        permissions: [
          'users.view', 'users.edit',
          'clients.view', 'clients.create', 'clients.edit', 'clients.financial',
          'reports.view', 'reports.create', 'reports.export',
          'blog.view', 'blog.create', 'blog.edit', 'blog.publish',
          'events.view', 'events.create', 'events.edit',
          'analytics.view'
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: 'professional',
        name: 'Financial Professional',
        description: 'Standard professional access for financial advisors',
        color: '#0284C7',
        isSystemRole: true,
        permissions: [
          'clients.view', 'clients.create', 'clients.edit', 'clients.financial',
          'reports.view', 'reports.create', 'reports.export',
          'blog.view', 'blog.create', 'blog.edit',
          'events.view', 'events.create', 'events.edit'
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: 'editor',
        name: 'Content Editor',
        description: 'Content creation and editing permissions',
        color: '#7C3AED',
        isSystemRole: true,
        permissions: [
          'blog.view', 'blog.create', 'blog.edit', 'blog.publish',
          'events.view', 'events.create', 'events.edit'
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: 'viewer',
        name: 'Viewer',
        description: 'Read-only access to most content',
        color: '#059669',
        isSystemRole: true,
        permissions: [
          'users.view',
          'clients.view',
          'reports.view',
          'blog.view',
          'events.view',
          'analytics.view'
        ],
        createdAt: new Date().toISOString(),
      }
    ];

    setPermissions(defaultPermissions);
    setRoles(defaultRoles);

    // Load user roles from localStorage
    const savedUserRoles = localStorage.getItem('userRoles');
    if (savedUserRoles) {
      setUserRoles(JSON.parse(savedUserRoles));
    }
  };

  // Role Management Functions
  const createRole = (roleData) => {
    const newRole = {
      id: uuidv4(),
      ...roleData,
      isSystemRole: false,
      createdAt: new Date().toISOString(),
    };
    setRoles(prev => [...prev, newRole]);
    return newRole;
  };

  const updateRole = (roleId, updates) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId ? { ...role, ...updates, updatedAt: new Date().toISOString() } : role
    ));
  };

  const deleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystemRole) {
      throw new Error('Cannot delete system roles');
    }
    
    setRoles(prev => prev.filter(role => role.id !== roleId));
    // Remove role assignments
    setUserRoles(prev => prev.filter(ur => ur.roleId !== roleId));
  };

  // User Role Assignment Functions
  const assignUserRole = (userId, roleId) => {
    const existingAssignment = userRoles.find(ur => ur.userId === userId);
    
    if (existingAssignment) {
      // Update existing role
      setUserRoles(prev => prev.map(ur => 
        ur.userId === userId 
          ? { ...ur, roleId, assignedAt: new Date().toISOString() }
          : ur
      ));
    } else {
      // Create new assignment
      const newAssignment = {
        id: uuidv4(),
        userId,
        roleId,
        assignedAt: new Date().toISOString(),
      };
      setUserRoles(prev => [...prev, newAssignment]);
    }

    // Save to localStorage
    const updatedUserRoles = userRoles.map(ur => 
      ur.userId === userId 
        ? { ...ur, roleId, assignedAt: new Date().toISOString() }
        : ur
    );
    if (!userRoles.find(ur => ur.userId === userId)) {
      updatedUserRoles.push({
        id: uuidv4(),
        userId,
        roleId,
        assignedAt: new Date().toISOString(),
      });
    }
    localStorage.setItem('userRoles', JSON.stringify(updatedUserRoles));
  };

  const removeUserRole = (userId) => {
    setUserRoles(prev => prev.filter(ur => ur.userId !== userId));
    const updatedUserRoles = userRoles.filter(ur => ur.userId !== userId);
    localStorage.setItem('userRoles', JSON.stringify(updatedUserRoles));
  };

  const getUserRole = (userId) => {
    const userRole = userRoles.find(ur => ur.userId === userId);
    if (!userRole) return null;
    
    return roles.find(role => role.id === userRole.roleId);
  };

  const getUserPermissions = (userId) => {
    const userRole = getUserRole(userId);
    if (!userRole) return [];
    
    return userRole.permissions || [];
  };

  const hasPermission = (userId, permission) => {
    const userPermissions = getUserPermissions(userId);
    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (userId, permissionList) => {
    const userPermissions = getUserPermissions(userId);
    return permissionList.some(permission => userPermissions.includes(permission));
  };

  const hasAllPermissions = (userId, permissionList) => {
    const userPermissions = getUserPermissions(userId);
    return permissionList.every(permission => userPermissions.includes(permission));
  };

  // Permission Management
  const createPermission = (permissionData) => {
    const newPermission = {
      id: uuidv4(),
      ...permissionData,
      createdAt: new Date().toISOString(),
    };
    setPermissions(prev => [...prev, newPermission]);
    return newPermission;
  };

  const updatePermission = (permissionId, updates) => {
    setPermissions(prev => prev.map(permission => 
      permission.id === permissionId 
        ? { ...permission, ...updates, updatedAt: new Date().toISOString() }
        : permission
    ));
  };

  const deletePermission = (permissionId) => {
    setPermissions(prev => prev.filter(permission => permission.id !== permissionId));
    // Remove permission from all roles
    setRoles(prev => prev.map(role => ({
      ...role,
      permissions: role.permissions.filter(p => p !== permissionId)
    })));
  };

  // Utility Functions
  const getRolesByUser = (userId) => {
    return userRoles.filter(ur => ur.userId === userId).map(ur => 
      roles.find(role => role.id === ur.roleId)
    ).filter(Boolean);
  };

  const getUsersByRole = (roleId) => {
    return userRoles.filter(ur => ur.roleId === roleId);
  };

  const getPermissionsByCategory = () => {
    const categories = {};
    permissions.forEach(permission => {
      const category = permission.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(permission);
    });
    return categories;
  };

  const value = {
    // State
    roles,
    permissions,
    userRoles,
    
    // Role Management
    createRole,
    updateRole,
    deleteRole,
    
    // User Role Assignment
    assignUserRole,
    removeUserRole,
    getUserRole,
    getUserPermissions,
    
    // Permission Checking
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Permission Management
    createPermission,
    updatePermission,
    deletePermission,
    
    // Utility Functions
    getRolesByUser,
    getUsersByRole,
    getPermissionsByCategory,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};