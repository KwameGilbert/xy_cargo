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
  Clock,
  Building,
  Award,
  Heart,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import DeleteStaffModal from '../../../components/admin/staff/DeleteStaffModal';
import mockStaffData from '../../../components/admin/staff/mockData';

const AdminStaffDetailPage = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false
  });

  useEffect(() => {
    // Simulate API call
    const loadStaff = async () => {
      setLoading(true);
      setTimeout(() => {
        const foundStaff = mockStaffData.staff.find(s => s.id === staffId);
        setStaff(foundStaff || null);
        setLoading(false);
      }, 500);
    };

    loadStaff();
  }, [staffId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'On Leave':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'Inactive':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <User className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent':
        return 'text-green-600 bg-green-50';
      case 'Good':
        return 'text-blue-600 bg-blue-50';
      case 'Average':
        return 'text-yellow-600 bg-yellow-50';
      case 'Poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(salary);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEdit = () => {
    navigate(`/admin/staff/${staffId}/edit`);
  };

  const handleDelete = () => {
    setDeleteModal({ isOpen: true, isDeleting: false });
  };

  const confirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would make an API call
      navigate('/admin/staff');
    }, 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!staff) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Staff member not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The staff member you're looking for doesn't exist or has been deleted.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/admin/staff')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Staff
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/staff')}
              className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-lg">
                  {staff.firstName[0]}{staff.lastName[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {staff.firstName} {staff.lastName}
                  </h1>
                  <p className="text-sm text-gray-500">{staff.id}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className="mb-8">
          <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(staff.status)}`}>
            {getStatusIcon(staff.status)}
            <span className="ml-2">{staff.status}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <User className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  <p className="text-lg font-medium text-gray-900">{staff.firstName} {staff.lastName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Staff ID</label>
                  <p className="text-lg font-medium text-gray-900">{staff.id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900">{staff.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900">{staff.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Employment Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Role/Position</label>
                  <p className="text-lg font-medium text-gray-900">{staff.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                  <p className="text-sm text-gray-900">{staff.department}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Warehouse</label>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900">{staff.warehouseName}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Shift</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900">{staff.shift} Shift</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Monthly Salary</label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">{formatSalary(staff.salary)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Hire Date</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900">{formatDate(staff.hireDate)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Performance Rating</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(staff.performance)}`}>
                    <Award className="h-4 w-4 mr-1" />
                    {staff.performance}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(staff.status)}`}>
                    {getStatusIcon(staff.status)}
                    <span className="ml-1">{staff.status}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Skills & Competencies */}
            {staff.skills && staff.skills.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Skills & Competencies</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {staff.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            {staff.emergencyContact && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Emergency Contact</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <p className="text-sm text-gray-900">{staff.emergencyContact.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-900">{staff.emergencyContact.phone}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Relationship</label>
                    <p className="text-sm text-gray-900">{staff.emergencyContact.relationship}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center justify-center px-4 py-3 border border-red-500 rounded-lg shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Staff Member
                </button>
                <button
                  onClick={() => navigate('/admin/staff')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-4 w-4 mr-2" />
                  View All Staff
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center px-4 py-3 border border-red-500 rounded-lg shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Staff Member
                </button>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Current Rating</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(staff.performance)}`}>
                    {staff.performance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Employment Status</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                    {staff.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Department</span>
                  <span className="text-sm text-gray-900">{staff.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Shift</span>
                  <span className="text-sm text-gray-900">{staff.shift}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteStaffModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, isDeleting: false })}
          onConfirm={confirmDelete}
          staff={staff}
          isDeleting={deleteModal.isDeleting}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminStaffDetailPage;