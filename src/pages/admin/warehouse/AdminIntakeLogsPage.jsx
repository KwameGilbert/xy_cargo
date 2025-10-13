import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Package, Truck, Calendar, Clock, User } from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminIntakeLogsFilters from '../../../components/admin/warehouse/AdminIntakeLogsFilters';
import AdminIntakeLogsTable from '../../../components/admin/warehouse/AdminIntakeLogsTable';
import AdminIntakeLogsKPIs from '../../../components/admin/warehouse/AdminIntakeLogsKPIs';
import mockIntakeLogsData from '../../../components/admin/warehouse/mockIntakeLogsData';

const AdminIntakeLogsPage = () => {
  const navigate = useNavigate();
  const [intakeLogs, setIntakeLogs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadIntakeLogs = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setIntakeLogs(mockIntakeLogsData.intakeLogs);
        setLoading(false);
      }, 1000);
    };

    loadIntakeLogs();
  }, []);

  const filteredIntakeLogs = useMemo(() => {
    return intakeLogs.filter(log => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          log.parcelId.toLowerCase().includes(searchTerm) ||
          log.trackingNumber.toLowerCase().includes(searchTerm) ||
          log.receivedBy.toLowerCase().includes(searchTerm) ||
          log.warehouseName.toLowerCase().includes(searchTerm) ||
          log.senderName.toLowerCase().includes(searchTerm) ||
          log.recipientName.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Date range filter
      if (filters.dateFrom) {
        const logDate = new Date(log.receivedAt);
        const fromDate = new Date(filters.dateFrom);
        if (logDate < fromDate) return false;
      }

      if (filters.dateTo) {
        const logDate = new Date(log.receivedAt);
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999); // End of day
        if (logDate > toDate) return false;
      }

      // Warehouse filter
      if (filters.warehouse && filters.warehouse.length > 0) {
        if (!filters.warehouse.includes(log.warehouseId)) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(log.status)) return false;
      }

      // Shipment type filter
      if (filters.shipmentType && filters.shipmentType.length > 0) {
        if (!filters.shipmentType.includes(log.shipmentType)) return false;
      }

      return true;
    });
  }, [intakeLogs, filters]);

  const handleExportData = () => {
    // In a real app, this would export the data
    console.log('Exporting intake logs data...');
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
      <div className="py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Warehouse Intake Logs</h1>
            <p className="text-gray-600">Track and monitor parcel intake activities across all warehouses</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Logs
            </button>
          </div>
        </div>

        {/* KPIs */}
        <AdminIntakeLogsKPIs intakeLogs={intakeLogs} />

        {/* Filters */}
        <AdminIntakeLogsFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
          totalLogs={filteredIntakeLogs.length}
        />

        {/* Content */}
        {filteredIntakeLogs.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No intake logs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {intakeLogs.length === 0
                ? "No parcels have been received yet."
                : "Try adjusting your filters to find what you're looking for."
              }
            </p>
          </div>
        ) : (
          <AdminIntakeLogsTable
            intakeLogs={filteredIntakeLogs}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminIntakeLogsPage;