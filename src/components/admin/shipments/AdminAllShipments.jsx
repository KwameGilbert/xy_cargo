import React, { useState, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, List, BarChart3, Plus, RefreshCw } from 'lucide-react';

// Import components
import AdminShipmentFilters from './AdminShipmentFilters';
import AdminShipmentTable from './AdminShipmentTable';
import AdminShipmentCard from './AdminShipmentCard';
import AdminShipmentActions from './AdminShipmentActions';
import AdminShipmentKPIs from './AdminShipmentKPIs';
import AdminShipmentCharts from './AdminShipmentCharts';
import mockShipmentsData from './mockData';

const AdminAllShipments = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table', 'cards', 'analytics'
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'departureDate', direction: 'desc' });

  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Use mock data
  const { shipments, kpiData, statusDistribution, weeklyShipmentTrend, carrierPerformance } = mockShipmentsData;

  // Filter and sort shipments
  const filteredAndSortedShipments = useMemo(() => {
    let filtered = shipments.filter(shipment => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          shipment.id.toLowerCase().includes(searchTerm) ||
          shipment.trackingNumber.toLowerCase().includes(searchTerm) ||
          shipment.originCountry.toLowerCase().includes(searchTerm) ||
          shipment.destinationCountry.toLowerCase().includes(searchTerm) ||
          shipment.carrier.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && shipment.status !== filters.status) return false;

      // Priority filter
      if (filters.priority && shipment.priority !== filters.priority) return false;

      // Country filters
      if (filters.originCountry && shipment.originCountry !== filters.originCountry) return false;
      if (filters.destinationCountry && shipment.destinationCountry !== filters.destinationCountry) return false;

      // Carrier filter
      if (filters.carrier && shipment.carrier !== filters.carrier) return false;

      // Warehouse filter
      if (filters.assignedWarehouse && shipment.assignedWarehouse !== filters.assignedWarehouse) return false;

      // Agent filter
      if (filters.assignedAgent && shipment.assignedAgent !== filters.assignedAgent) return false;

      // Date range filter
      if (filters.dateFrom) {
        const shipmentDate = new Date(shipment.departureDate);
        const filterDate = new Date(filters.dateFrom);
        if (shipmentDate < filterDate) return false;
      }
      if (filters.dateTo) {
        const shipmentDate = new Date(shipment.departureDate);
        const filterDate = new Date(filters.dateTo);
        if (shipmentDate > filterDate) return false;
      }

      return true;
    });

    // Sort shipments
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [shipments, filters, sortConfig]);

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleSelectionChange = (shipmentIds) => {
    setSelectedShipments(shipmentIds);
  };

  const handleViewDetails = (shipment) => {
    console.log('View shipment details:', shipment);
    // TODO: Navigate to shipment detail page
  };

  const handleEditShipment = (shipment) => {
    console.log('Edit shipment:', shipment);
    // TODO: Navigate to edit page or open modal
  };

  const handleDeleteShipment = (shipment) => {
    console.log('Delete shipment:', shipment);
    // TODO: Show confirmation and delete
  };

  // Bulk operations
  const handleBulkStatusUpdate = (shipmentIds, status) => {
    console.log('Bulk status update:', shipmentIds, status);
    // TODO: Implement bulk status update
  };

  const handleBulkPriorityUpdate = (shipmentIds, priority) => {
    console.log('Bulk priority update:', shipmentIds, priority);
    // TODO: Implement bulk priority update
  };

  const handleBulkWarehouseUpdate = (shipmentIds, warehouse) => {
    console.log('Bulk warehouse update:', shipmentIds, warehouse);
    // TODO: Implement bulk warehouse update
  };

  const handleBulkAgentUpdate = (shipmentIds, agent) => {
    console.log('Bulk agent update:', shipmentIds, agent);
    // TODO: Implement bulk agent update
  };

  const handleBulkDelete = (shipmentIds) => {
    console.log('Bulk delete:', shipmentIds);
    // TODO: Implement bulk delete
  };

  const handleExport = () => {
    console.log('Export shipments');
    // TODO: Implement export functionality
  };

  const handlePrint = () => {
    console.log('Print shipments');
    // TODO: Implement print functionality
  };

  const handleCreateShipment = () => {
    console.log('Create new shipment');
    // TODO: Navigate to create shipment page
  };

  const handleRefresh = () => {
    console.log('Refresh shipments');
    // TODO: Refresh data
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Shipments</h1>
          <p className="text-gray-600">Manage and monitor all international shipments</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={handleCreateShipment}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Shipment
          </button>
        </div>
      </div>

      {/* KPIs */}
      <AdminShipmentKPIs kpiData={kpiData} />

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
        <button
          onClick={() => setViewMode('table')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'table'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <List className="h-4 w-4" />
          Table
        </button>
        <button
          onClick={() => setViewMode('cards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'cards'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Grid className="h-4 w-4" />
          Cards
        </button>
        <button
          onClick={() => setViewMode('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'analytics'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Analytics
        </button>
      </div>

      {/* Filters */}
      <AdminShipmentFilters onFiltersChange={handleFiltersChange} />

      {/* Bulk Actions */}
      <AdminShipmentActions
        selectedShipments={selectedShipments}
        onBulkStatusUpdate={handleBulkStatusUpdate}
        onBulkPriorityUpdate={handleBulkPriorityUpdate}
        onBulkWarehouseUpdate={handleBulkWarehouseUpdate}
        onBulkAgentUpdate={handleBulkAgentUpdate}
        onBulkDelete={handleBulkDelete}
        onExport={handleExport}
        onPrint={handlePrint}
      />

      {/* Content based on view mode */}
      {viewMode === 'analytics' ? (
        <AdminShipmentCharts
          chartData={{
            statusDistribution,
            weeklyShipmentTrend,
            carrierPerformance
          }}
        />
      ) : (
        <>
          {/* Results count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredAndSortedShipments.length} of {shipments.length} shipments
          </div>

          {/* Table View */}
          {viewMode === 'table' && !isMobile && (
            <AdminShipmentTable
              shipments={filteredAndSortedShipments}
              selectedShipments={selectedShipments}
              onSelectionChange={handleSelectionChange}
              onViewDetails={handleViewDetails}
              onEditShipment={handleEditShipment}
              onDeleteShipment={handleDeleteShipment}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          )}

          {/* Cards View or Mobile */}
          {(viewMode === 'cards' || isMobile) && (
            <div className="space-y-4">
              {filteredAndSortedShipments.map(shipment => (
                <AdminShipmentCard
                  key={shipment.id}
                  shipment={shipment}
                  isSelected={selectedShipments.includes(shipment.id)}
                  onSelectionChange={(id, checked) => {
                    if (checked) {
                      setSelectedShipments([...selectedShipments, id]);
                    } else {
                      setSelectedShipments(selectedShipments.filter(sid => sid !== id));
                    }
                  }}
                  onViewDetails={handleViewDetails}
                  onEditShipment={handleEditShipment}
                  onDeleteShipment={handleDeleteShipment}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminAllShipments;