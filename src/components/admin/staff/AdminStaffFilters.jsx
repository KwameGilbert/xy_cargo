import React, { useState } from 'react';
import { Search, Filter, X, Building, UserCheck, Clock } from 'lucide-react';

const AdminStaffFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalStaff
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'Active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'On Leave', label: 'On Leave', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Inactive', label: 'Inactive', color: 'bg-red-100 text-red-800' }
  ];

  const departmentOptions = [
    { value: 'Operations', label: 'Operations' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Security', label: 'Security' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Quality Assurance', label: 'Quality Assurance' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Facilities', label: 'Facilities' },
    { value: 'IT', label: 'IT' }
  ];

  const shiftOptions = [
    { value: 'Day', label: 'Day Shift' },
    { value: 'Night', label: 'Night Shift' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const handleStatusChange = (status) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];

    handleFilterChange('status', newStatuses);
  };

  const handleDepartmentChange = (department) => {
    const currentDepartments = filters.department || [];
    const newDepartments = currentDepartments.includes(department)
      ? currentDepartments.filter(d => d !== department)
      : [...currentDepartments, department];

    handleFilterChange('department', newDepartments);
  };

  const handleShiftChange = (shift) => {
    const currentShifts = filters.shift || [];
    const newShifts = currentShifts.includes(shift)
      ? currentShifts.filter(s => s !== shift)
      : [...currentShifts, shift];

    handleFilterChange('shift', newShifts);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status?.length > 0) count += filters.status.length;
    if (filters.department?.length > 0) count += filters.department.length;
    if (filters.shift?.length > 0) count += filters.shift.length;
    if (filters.warehouse) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by name, email, or ID..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
            activeFiltersCount > 0
              ? 'border-red-500 text-red-700 bg-red-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-6 space-y-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <UserCheck className="h-4 w-4 inline mr-2" />
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.status?.includes(option.value)
                      ? option.color + ' ring-2 ring-offset-1 ring-red-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Department
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {departmentOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDepartmentChange(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-center ${
                    filters.department?.includes(option.value)
                      ? 'bg-red-100 text-red-800 ring-2 ring-offset-1 ring-red-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shift Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Clock className="h-4 w-4 inline mr-2" />
              Shift
            </label>
            <div className="flex gap-2">
              {shiftOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleShiftChange(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.shift?.includes(option.value)
                      ? 'bg-red-100 text-red-800 ring-2 ring-offset-1 ring-red-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Warehouse Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Building className="h-4 w-4 inline mr-2" />
              Warehouse
            </label>
            <select
              value={filters.warehouse || ''}
              onChange={(e) => handleFilterChange('warehouse', e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Warehouses</option>
              <option value="WH-001">Accra Main Warehouse</option>
              <option value="WH-002">Tema Port Facility</option>
              <option value="WH-003">Kumasi Distribution Center</option>
              <option value="WH-004">Takoradi Harbor Warehouse</option>
              <option value="WH-005">Cape Coast Transit Hub</option>
              <option value="WH-006">Tamale Regional Depot</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
        <span>Showing {totalStaff} staff members</span>
        {activeFiltersCount > 0 && (
          <span className="text-red-600 font-medium">
            {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminStaffFilters;