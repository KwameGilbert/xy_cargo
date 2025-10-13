import React, { useEffect, useRef } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Eye, Edit, Trash2, User } from 'lucide-react';

const AdminStaffTable = ({
  staff,
  selectedStaff,
  onSelectStaff,
  onSelectAll,
  onViewStaff,
  onEditStaff,
  onDeleteStaff
}) => {
  const selectAllRef = useRef(null);

  useEffect(() => {
    if (selectAllRef.current) {
      const allSelected = staff.length > 0 && staff.every(member => selectedStaff.includes(member.id));
      const noneSelected = staff.every(member => !selectedStaff.includes(member.id));
      selectAllRef.current.indeterminate = !allSelected && !noneSelected;
    }
  }, [staff, selectedStaff]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'On Leave':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <User className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(salary);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-12 px-4 sm:w-16 sm:px-6">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  aria-label="Select all staff"
                  aria-checked={staff.length > 0 && staff.every(member => selectedStaff.includes(member.id)) ? "true" : (staff.some(member => selectedStaff.includes(member.id)) ? "mixed" : "false")}
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 sm:left-6"
                  checked={staff.length > 0 && staff.every(member => selectedStaff.includes(member.id))}
                  onChange={onSelectAll}
                />
              </th>
              <th scope="col" className="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff Member
              </th>
              <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="w-20 px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id} className={selectedStaff.includes(member.id) ? 'bg-red-50' : 'hover:bg-gray-50'}>
                <td className="w-12 px-4 sm:w-16 sm:px-6">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 sm:left-6"
                    checked={selectedStaff.includes(member.id)}
                    onChange={() => onSelectStaff(member.id)}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-xs mr-3">
                      {member.firstName[0]}{member.lastName[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {member.firstName} {member.lastName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{member.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.role} ({member.shift})</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{member.department}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {getStatusIcon(member.status)}
                    <span className="ml-1">{member.status}</span>
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-1">
                    <button
                      onClick={() => onViewStaff(member.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditStaff(member.id)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteStaff(member.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStaffTable;