import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Shield,
  Search,
  Filter,
  Download,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Smartphone,
  Mail,
  Key,
  ToggleLeft,
  ToggleRight,
  Settings,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2
} from 'lucide-react';

// Mock data for 2FA management
const mockUsers2FA = [
  {
    id: 'USR-001',
    name: 'John Admin',
    email: 'john.admin@xy-cargo.com',
    role: 'Administrator',
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator_app',
    lastLogin: '2025-10-13T11:30:00Z',
    loginAttempts: 0,
    accountLocked: false,
    backupCodesGenerated: true,
    backupCodesUsed: 2,
    enrolledDate: '2025-09-01T00:00:00Z',
    recoveryEmail: 'john.admin.backup@gmail.com'
  },
  {
    id: 'USR-002',
    name: 'Sarah Manager',
    email: 'sarah.manager@xy-cargo.com',
    role: 'Operations Manager',
    twoFactorEnabled: true,
    twoFactorMethod: 'sms',
    lastLogin: '2025-10-13T11:25:00Z',
    loginAttempts: 0,
    accountLocked: false,
    backupCodesGenerated: false,
    backupCodesUsed: 0,
    enrolledDate: '2025-09-05T00:00:00Z',
    phoneNumber: '+260955123456'
  },
  {
    id: 'USR-003',
    name: 'Mike Agent',
    email: 'mike.agent@xy-cargo.com',
    role: 'Field Agent',
    twoFactorEnabled: false,
    twoFactorMethod: null,
    lastLogin: '2025-10-13T10:15:00Z',
    loginAttempts: 0,
    accountLocked: false,
    backupCodesGenerated: false,
    backupCodesUsed: 0,
    enrolledDate: null,
    phoneNumber: '+260966789012'
  },
  {
    id: 'USR-004',
    name: 'Lisa Customer',
    email: 'lisa.customer@email.com',
    role: 'Customer',
    twoFactorEnabled: true,
    twoFactorMethod: 'email',
    lastLogin: '2025-10-13T09:45:00Z',
    loginAttempts: 0,
    accountLocked: false,
    backupCodesGenerated: true,
    backupCodesUsed: 0,
    enrolledDate: '2025-09-10T00:00:00Z',
    recoveryEmail: 'lisa.backup@email.com'
  },
  {
    id: 'USR-005',
    name: 'Anna Supervisor',
    email: 'anna.supervisor@xy-cargo.com',
    role: 'Supervisor',
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator_app',
    lastLogin: '2025-10-13T09:30:00Z',
    loginAttempts: 3,
    accountLocked: false,
    backupCodesGenerated: true,
    backupCodesUsed: 1,
    enrolledDate: '2025-09-15T00:00:00Z',
    recoveryEmail: 'anna.backup@xy-cargo.com'
  },
  {
    id: 'USR-006',
    name: 'David Staff',
    email: 'david.staff@xy-cargo.com',
    role: 'Warehouse Staff',
    twoFactorEnabled: false,
    twoFactorMethod: null,
    lastLogin: '2025-10-12T16:20:00Z',
    loginAttempts: 0,
    accountLocked: false,
    backupCodesGenerated: false,
    backupCodesUsed: 0,
    enrolledDate: null,
    phoneNumber: '+260977345678'
  },
  {
    id: 'USR-007',
    name: 'Failed Login User',
    email: 'failed.user@xy-cargo.com',
    role: 'Staff',
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator_app',
    lastLogin: '2025-10-12T14:00:00Z',
    loginAttempts: 5,
    accountLocked: true,
    backupCodesGenerated: true,
    backupCodesUsed: 0,
    enrolledDate: '2025-09-20T00:00:00Z',
    lockReason: 'Multiple failed login attempts',
    lockExpires: '2025-10-13T14:00:00Z'
  }
];

const AdminTwoFactorAuthPage = () => {
  const [users, setUsers] = useState(mockUsers2FA);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'enabled' && user.twoFactorEnabled) ||
        (statusFilter === 'disabled' && !user.twoFactorEnabled) ||
        (statusFilter === 'locked' && user.accountLocked);

      const matchesMethod = methodFilter === 'all' || user.twoFactorMethod === methodFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesMethod && matchesRole;
    });
  }, [users, searchTerm, statusFilter, methodFilter, roleFilter]);

  // Get method icon
  const getMethodIcon = (method) => {
    switch (method) {
      case 'authenticator_app':
        return Smartphone;
      case 'sms':
        return Mail; // Using Mail for SMS as well
      case 'email':
        return Mail;
      default:
        return Key;
    }
  };

  // Get method display name
  const getMethodDisplayName = (method) => {
    switch (method) {
      case 'authenticator_app':
        return 'Authenticator App';
      case 'sms':
        return 'SMS';
      case 'email':
        return 'Email';
      default:
        return 'Not Set';
    }
  };

  // Toggle 2FA for user
  const toggle2FA = (userId, enabled) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? {
            ...user,
            twoFactorEnabled: enabled,
            twoFactorMethod: enabled ? 'authenticator_app' : null,
            enrolledDate: enabled ? new Date().toISOString() : null
          }
        : user
    ));
  };

  // Reset 2FA for user
  const reset2FA = (userId) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? {
            ...user,
            twoFactorEnabled: false,
            twoFactorMethod: null,
            enrolledDate: null,
            backupCodesGenerated: false,
            backupCodesUsed: 0
          }
        : user
    ));
    setShowResetModal(false);
    setSelectedUser(null);
  };

  // Unlock account
  const unlockAccount = (userId) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? {
            ...user,
            accountLocked: false,
            loginAttempts: 0,
            lockReason: null,
            lockExpires: null
          }
        : user
    ));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get unique values for filters
  const uniqueMethods = [...new Set(users.filter(u => u.twoFactorMethod).map(u => u.twoFactorMethod))];
  const uniqueRoles = [...new Set(users.map(u => u.role))];

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    twoFactorEnabled: users.filter(u => u.twoFactorEnabled).length,
    twoFactorDisabled: users.filter(u => !u.twoFactorEnabled).length,
    accountsLocked: users.filter(u => u.accountLocked).length
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h1>
            <p className="text-gray-600 mt-1">Manage 2FA settings and user authentication</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">2FA Enabled</p>
                <p className="text-2xl font-bold text-green-600">{stats.twoFactorEnabled}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">2FA Disabled</p>
                <p className="text-2xl font-bold text-red-600">{stats.twoFactorDisabled}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Locked Accounts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.accountsLocked}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Global Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Global 2FA Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-700">Require 2FA for Admins</span>
                <p className="text-xs text-gray-500">Force 2FA for administrator accounts</p>
              </div>
              <ToggleRight className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-700">Allow SMS Backup</span>
                <p className="text-xs text-gray-500">Enable SMS as backup method</p>
              </div>
              <ToggleRight className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-700">Auto-lock on Failures</span>
                <p className="text-xs text-gray-500">Lock accounts after failed attempts</p>
              </div>
              <ToggleRight className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="enabled">2FA Enabled</option>
                <option value="disabled">2FA Disabled</option>
                <option value="locked">Account Locked</option>
              </select>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Methods</option>
                {uniqueMethods.map(method => (
                  <option key={method} value={method}>
                    {getMethodDisplayName(method)}
                  </option>
                ))}
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2FA Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const MethodIcon = getMethodIcon(user.twoFactorMethod);
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">{user.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.twoFactorEnabled ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <span className={`text-sm font-medium ${user.twoFactorEnabled ? 'text-green-700' : 'text-red-700'}`}>
                            {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        {user.twoFactorEnabled && user.enrolledDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            Enrolled: {formatDate(user.enrolledDate)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.twoFactorMethod ? (
                          <div className="flex items-center">
                            <MethodIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {getMethodDisplayName(user.twoFactorMethod)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not Set</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.accountLocked ? (
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            <div>
                              <span className="text-sm font-medium text-red-700">Locked</span>
                              <div className="text-xs text-gray-500">
                                Expires: {formatDate(user.lockExpires)}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm font-medium text-green-700">Active</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggle2FA(user.id, !user.twoFactorEnabled)}
                            className={`text-xs px-2 py-1 rounded ${
                              user.twoFactorEnabled
                                ? 'text-red-700 bg-red-100 hover:bg-red-200'
                                : 'text-green-700 bg-green-100 hover:bg-green-200'
                            }`}
                          >
                            {user.twoFactorEnabled ? 'Disable' : 'Enable'}
                          </button>
                          {user.twoFactorEnabled && (
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowResetModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200"
                            >
                              Reset
                            </button>
                          )}
                          {user.accountLocked && (
                            <button
                              onClick={() => unlockAccount(user.id)}
                              className="text-orange-600 hover:text-orange-900 text-xs px-2 py-1 rounded bg-orange-100 hover:bg-orange-200"
                            >
                              Unlock
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Reset 2FA Modal */}
        {showResetModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Reset 2FA</h2>
                </div>

                <p className="text-gray-700 mb-6">
                  Are you sure you want to reset two-factor authentication for <strong>{selectedUser.name}</strong>?
                  They will need to set it up again on their next login.
                </p>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <div className="text-sm text-orange-800">
                      <strong>Warning:</strong> This will disable 2FA for this user until they re-enroll.
                      They may be prompted to set up 2FA again immediately.
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowResetModal(false);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => reset2FA(selectedUser.id)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Reset 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTwoFactorAuthPage;