import React from 'react';
import { Mail, Phone, MapPin, Calendar, DollarSign, Clock, Award, Edit, Trash2, Eye, User } from 'lucide-react';

const AdminStaffCard = ({
  staff,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <div className="h-3 w-3 bg-green-500 rounded-full"></div>;
      case 'On Leave':
        return <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>;
      case 'Inactive':
        return <div className="h-3 w-3 bg-red-500 rounded-full"></div>;
      default:
        return <div className="h-3 w-3 bg-gray-400 rounded-full"></div>;
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
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="h-4 w-4 mt-1 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-lg">
              {staff.firstName[0]}{staff.lastName[0]}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {staff.firstName} {staff.lastName}
              </h3>
              <p className="text-sm text-gray-500">{staff.id}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(staff.status)}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
            {staff.status}
          </span>
        </div>
      </div>

      {/* Role and Department */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-900">{staff.role}</p>
          <p className="text-xs text-gray-500">{staff.department}</p>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(staff.performance)}`}>
            <Award className="h-3 w-3 mr-1" />
            {staff.performance}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="truncate">{staff.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="h-4 w-4 text-gray-400" />
          <span>{staff.phone}</span>
        </div>
      </div>

      {/* Salary and Hire Date */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{formatSalary(staff.salary)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Hired {formatDate(staff.hireDate)}</span>
        </div>
      </div>

      {/* Skills */}
      {staff.skills && staff.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-700 mb-2">Key Skills</p>
          <div className="flex flex-wrap gap-1">
            {staff.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {skill}
              </span>
            ))}
            {staff.skills.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                +{staff.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onView(staff.id)}
            className="inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </button>
          <button
            onClick={() => onEdit(staff.id)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
        </div>
        <button
          onClick={() => onDelete(staff.id)}
          className="inline-flex items-center px-3 py-1.5 border border-red-500 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminStaffCard;