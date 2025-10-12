import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Grid, List, Download, Users, Trash2 } from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminStaffFilters from '../../../components/admin/staff/AdminStaffFilters';
import AdminStaffTable from '../../../components/admin/staff/AdminStaffTable';
import AdminStaffCard from '../../../components/admin/staff/AdminStaffCard';
import AdminStaffKPIs from '../../../components/admin/staff/AdminStaffKPIs';
import DeleteStaffModal from '../../../components/admin/staff/DeleteStaffModal';
import mockStaffData from '../../../components/admin/staff/mockData';

const AdminAllStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('table'); // 'card' or 'table'
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    staff: null,
    isDeleting: false
  });

  useEffect(() => {
    // Simulate API call
    const loadStaff = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setStaff(mockStaffData.staff);
        setLoading(false);
      }, 1000);
    };

    loadStaff();
  }, []);

  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          member.firstName.toLowerCase().includes(searchTerm) ||
          member.lastName.toLowerCase().includes(searchTerm) ||
          member.email.toLowerCase().includes(searchTerm) ||
          member.id.toLowerCase().includes(searchTerm) ||
          member.role.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(member.status)) return false;
      }

      // Department filter
      if (filters.department && filters.department.length > 0) {
        if (!filters.department.includes(member.department)) return false;
      }

      // Shift filter
      if (filters.shift && filters.shift.length > 0) {
        if (!filters.shift.includes(member.shift)) return false;
      }

      // Warehouse filter
      if (filters.warehouse && filters.warehouse !== member.warehouse) {
        return false;
      }

      return true;
    });
  }, [staff, filters]);

  // Clear selected staff when filters change to avoid inconsistent selection state
  useEffect(() => {
    const filteredIds = filteredStaff.map(member => member.id);
    setSelectedStaff(prev => prev.filter(id => filteredIds.includes(id)));
  }, [filteredStaff]);

  const handleSelectStaff = (staffId) => {
    setSelectedStaff(prev =>
      prev.includes(staffId)
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStaff.length === filteredStaff.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(filteredStaff.map(s => s.id));
    }
  };

  const handleViewStaff = (staffId) => {
    navigate(`/admin/staff/${staffId}`);
  };

  const handleEditStaff = (staffId) => {
    navigate(`/admin/staff/${staffId}/edit`);
  };

  const handleDeleteStaff = (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    setDeleteModal({
      isOpen: true,
      staff: staffMember,
      isDeleting: false
    });
  };

  const confirmDeleteStaff = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));

    // Simulate API call
    setTimeout(() => {
      setStaff(prev => prev.filter(s => s.id !== deleteModal.staff.id));
      setSelectedStaff(prev => prev.filter(id => id !== deleteModal.staff.id));
      setDeleteModal({ isOpen: false, staff: null, isDeleting: false });
    }, 1500);
  };

  const handleBulkDelete = () => {
    if (selectedStaff.length === 0) return;

    if (window.confirm(`Are you sure you want to delete ${selectedStaff.length} staff member(s)?`)) {
      setStaff(prev => prev.filter(s => !selectedStaff.includes(s.id)));
      setSelectedStaff([]);
    }
  };

  const handleCreateStaff = () => {
    navigate('/admin/staff/create');
  };

  const handleExportData = () => {
    // In a real app, this would export the data
    console.log('Exporting staff data...');
  };

  const handleClearFilters = () => {
    setFilters({});
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

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Warehouse Staff Management</h1>
            <p className="text-gray-600">Manage and monitor all warehouse staff members</p>
          </div>
          <div className="flex gap-3">
            <div className="flex border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
                Table
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'card'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-4 h-4" />
                Cards
              </button>
            </div>
            <button
              onClick={handleCreateStaff}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Staff
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* KPIs */}
        <AdminStaffKPIs staff={staff} />

        {/* Filters */}
        <AdminStaffFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
          totalStaff={filteredStaff.length}
        />

        {/* Bulk Actions */}
        {selectedStaff.length > 0 && (
          <div className="flex items-center justify-between mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filteredStaff.length > 0 && filteredStaff.every(member => selectedStaff.includes(member.id))}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-900">
                  {selectedStaff.length} selected
                </span>
              </div>
            </div>
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center px-4 py-2 border border-red-500 rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedStaff.length})
            </button>
          </div>
        )}

        {/* Content */}
        {filteredStaff.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No staff members found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {staff.length === 0
                ? "Get started by adding your first staff member."
                : "Try adjusting your filters to find what you're looking for."
              }
            </p>
            {staff.length === 0 && (
              <div className="mt-6">
                <button
                  onClick={handleCreateStaff}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff Member
                </button>
              </div>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <AdminStaffTable
            staff={filteredStaff}
            selectedStaff={selectedStaff}
            onSelectStaff={handleSelectStaff}
            onSelectAll={handleSelectAll}
            onViewStaff={handleViewStaff}
            onEditStaff={handleEditStaff}
            onDeleteStaff={handleDeleteStaff}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map(member => (
              <AdminStaffCard
                key={member.id}
                staff={member}
                isSelected={selectedStaff.includes(member.id)}
                onSelect={() => handleSelectStaff(member.id)}
                onView={handleViewStaff}
                onEdit={handleEditStaff}
                onDelete={handleDeleteStaff}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteStaffModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, staff: null, isDeleting: false })}
          onConfirm={confirmDeleteStaff}
          staff={deleteModal.staff}
          isDeleting={deleteModal.isDeleting}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAllStaff;