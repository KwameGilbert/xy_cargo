import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Package } from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminWarehouseFilters from '../../../components/admin/warehouse/AdminWarehouseFilters';
import AdminWarehouseCard from '../../../components/admin/warehouse/AdminWarehouseCard';
import AdminWarehouseKPIs from '../../../components/admin/warehouse/AdminWarehouseKPIs';
import mockWarehousesData from '../../../components/admin/warehouse/mockData';

const AdminAllWarehouses = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadWarehouses = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setWarehouses(mockWarehousesData.warehouses);
        setLoading(false);
      }, 1000);
    };

    loadWarehouses();
  }, []);

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter(warehouse => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          warehouse.name.toLowerCase().includes(searchTerm) ||
          warehouse.id.toLowerCase().includes(searchTerm) ||
          warehouse.address.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(warehouse.status)) return false;
      }

      // Shipment type filter
      if (filters.shipmentType && filters.shipmentType.length > 0) {
        if (!filters.shipmentType.includes(warehouse.shipmentType)) return false;
      }

      return true;
    });
  }, [warehouses, filters]);

  const handleSelectWarehouse = (warehouseId) => {
    setSelectedWarehouses(prev =>
      prev.includes(warehouseId)
        ? prev.filter(id => id !== warehouseId)
        : [...prev, warehouseId]
    );
  };

  const handleViewWarehouse = (warehouseId) => {
    navigate(`/admin/warehouses/${warehouseId}`);
  };

  const handleEditWarehouse = (warehouseId) => {
    navigate(`/admin/warehouses/${warehouseId}/edit`);
  };

  const handleDeleteWarehouse = (warehouseId) => {
    if (window.confirm('Are you sure you want to delete this warehouse?')) {
      setWarehouses(prev => prev.filter(w => w.id !== warehouseId));
      setSelectedWarehouses(prev => prev.filter(id => id !== warehouseId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedWarehouses.length === 0) return;

    if (window.confirm(`Are you sure you want to delete ${selectedWarehouses.length} warehouse(s)?`)) {
      setWarehouses(prev => prev.filter(w => !selectedWarehouses.includes(w.id)));
      setSelectedWarehouses([]);
    }
  };

  const handleCreateWarehouse = () => {
    navigate('/admin/warehouses/create');
  };

  const handleExportData = () => {
    // In a real app, this would export the data
    console.log('Exporting warehouse data...');
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Warehouse Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and monitor all warehouses in your network
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportData}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={handleCreateWarehouse}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Warehouse
            </button>
          </div>
        </div>

        {/* KPIs */}
        <AdminWarehouseKPIs warehouses={warehouses} />

        {/* Filters */}
        <AdminWarehouseFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
          totalWarehouses={warehouses.length}
        />

        {/* Bulk Actions */}
        {selectedWarehouses.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">
              {selectedWarehouses.length} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center px-4 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Delete Selected ({selectedWarehouses.length})
            </button>
          </div>
        )}

        {/* Content */}
        {filteredWarehouses.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No warehouses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {warehouses.length === 0
                ? "Get started by creating your first warehouse."
                : "Try adjusting your filters to find what you're looking for."
              }
            </p>
            {warehouses.length === 0 && (
              <div className="mt-6">
                <button
                  onClick={handleCreateWarehouse}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Warehouse
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWarehouses.map(warehouse => (
              <AdminWarehouseCard
                key={warehouse.id}
                warehouse={warehouse}
                isSelected={selectedWarehouses.includes(warehouse.id)}
                onSelect={() => handleSelectWarehouse(warehouse.id)}
                onView={handleViewWarehouse}
                onEdit={handleEditWarehouse}
                onDelete={handleDeleteWarehouse}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAllWarehouses;