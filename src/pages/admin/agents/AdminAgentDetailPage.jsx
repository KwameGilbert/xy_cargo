import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  CreditCard,
  FileText,
  Award
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { agents } from '../../../../public/data/agents.json.js';

const AdminAgentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    const foundAgent = agents.find(a => a.id === id);
    if (foundAgent) {
      setAgent(foundAgent);
    }
    setLoading(false);
  }, [id]);

  const handleDeleteAgent = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, this would make an API call
    console.log('Deleting agent:', agent.id);
    navigate('/admin/agents');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgentTypeColor = (type) => {
    return type === 'Business' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'commission':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'customer':
        return <Users className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!agent) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Agent Not Found</h2>
            <p className="text-gray-600 mb-4">The agent you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/admin/agents')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Back to Agents
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/agents')}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold">
                  {agent.firstName[0]}{agent.lastName[0]}
                </div>
                {agent.firstName} {agent.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{agent.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/admin/agents/${agent.id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Edit className="h-4 w-4" />
              Edit Agent
            </button>
            <button
              onClick={handleDeleteAgent}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete Agent
            </button>
          </div>
        </div>

        {/* Status and Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(agent.status)}`}>
                  {agent.status}
                </span>
              </div>
              <User className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{agent.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(agent.totalEarnings)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Performance Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(agent.performanceRating)}
                  <span className="text-lg font-bold text-gray-900 ml-1">
                    {agent.performanceRating}
                  </span>
                </div>
              </div>
              <Star className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <p className="text-gray-900">{agent.firstName} {agent.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent ID</label>
                    <p className="text-gray-900">{agent.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {agent.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {agent.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <p className="text-gray-900">{formatDate(agent.dateOfBirth)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <p className="text-gray-900">{agent.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Type</label>
                    <p className="text-gray-900">{agent.agentType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate</label>
                    <p className="font-medium text-green-600">{agent.commissionRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{agent.address.street}</p>
                    <p className="text-gray-900">{agent.address.city}, {agent.address.state}</p>
                    <p className="text-gray-900">{agent.address.zipCode}, {agent.address.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{agent.totalParcels}</div>
                    <div className="text-sm text-gray-600">Total Parcels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(agent.totalCommissions)}</div>
                    <div className="text-sm text-gray-600">Total Commissions</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {renderStars(agent.performanceRating)}
                    </div>
                    <div className="text-sm text-gray-600">Performance Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                {agent.recentActivity && agent.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {agent.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="mt-0.5">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.description}</p>
                          {activity.amount && (
                            <p className="text-sm font-medium text-green-600">
                              +{formatCurrency(activity.amount)}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(activity.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No recent activity found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Details */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Account Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(agent.registrationDate)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {formatDate(agent.lastLogin)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent Type</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getAgentTypeColor(agent.agentType)}`}>
                    {agent.agentType}
                  </span>
                </div>
              </div>
            </div>

            {/* Banking Information */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Banking Information</h3>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <p className="text-gray-900">{agent.bankDetails.bankName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <p className="text-gray-900 font-mono">{agent.bankDetails.accountNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                  <p className="text-gray-900">{agent.bankDetails.accountName}</p>
                </div>
              </div>
            </div>

            {/* Documents Status */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Documents Status</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">ID Card</span>
                  {agent.documents.idCard ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Business License</span>
                  {agent.documents.businessLicense ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Tax Certificate</span>
                  {agent.documents.taxCertificate ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {agent.notes && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{agent.notes}</p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => navigate(`/admin/agents/${agent.id}/commissions`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <DollarSign className="h-4 w-4" />
                  View Commissions
                </button>
                <button
                  onClick={() => navigate(`/admin/agents/${agent.id}/customers`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  View Customers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Agent</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {agent.firstName} {agent.lastName}?
                This action cannot be undone and will also delete all associated commissions and customer relationships.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Agent
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAgentDetailPage;