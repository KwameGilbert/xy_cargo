import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminShipmentFilters from '../../../components/admin/shipments/AdminShipmentFilters';
import AdminShipmentTable from '../../../components/admin/shipments/AdminShipmentTable';
import AdminShipmentCard from '../../../components/admin/shipments/AdminShipmentCard';
import AdminShipmentActions from '../../../components/admin/shipments/AdminShipmentActions';
import AdminShipmentKPIs from '../../../components/admin/shipments/AdminShipmentKPIs';
import StatusUpdateModal from '../../../components/admin/shipments/StatusUpdateModal';
import mockShipmentsData from '../../../components/admin/shipments/mockData';
import { useMediaQuery } from 'react-responsive';
import { Plus, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const AdminAllShipments = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState(mockShipmentsData.shipments);
  const [filters, setFilters] = useState({
    status: '',
    origin: '',
    destination: '',
    carrier: '',
    priority: '',
    dateRange: { start: null, end: null },
    warehouse: '',
    agent: ''
  });
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // table, cards
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState({ isOpen: false, shipment: null });

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const { status, origin, destination, carrier, priority, dateRange, warehouse, agent } = filters;
      const shipmentDate = new Date(shipment.departureDate);

      return (
        (status ? shipment.status === status : true) &&
        (origin ? shipment.originCountry.toLowerCase().includes(origin.toLowerCase()) : true) &&
        (destination ? shipment.destinationCountry.toLowerCase().includes(destination.toLowerCase()) : true) &&
        (carrier ? shipment.carrier.toLowerCase().includes(carrier.toLowerCase()) : true) &&
        (priority ? shipment.priority === priority : true) &&
        (warehouse ? shipment.assignedWarehouse === warehouse : true) &&
        (agent ? shipment.assignedAgent === agent : true) &&
        (dateRange.start ? shipmentDate >= dateRange.start : true) &&
        (dateRange.end ? shipmentDate <= dateRange.end : true) &&
        (filters.search
          ? shipment.id.toLowerCase().includes(filters.search.toLowerCase()) ||
          shipment.trackingNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
          shipment.carrier.toLowerCase().includes(filters.search.toLowerCase())
          : true)
      );
    });
  }, [shipments, filters]);

  const handleSelectShipment = (shipmentId) => {
    setSelectedShipments((prev) =>
      prev.includes(shipmentId)
        ? prev.filter((id) => id !== shipmentId)
        : [...prev, shipmentId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedShipments(filteredShipments.map((s) => s.id));
    } else {
      setSelectedShipments([]);
    }
  };

  const handleViewDetails = (shipmentId) => {
    navigate(`/admin/shipments/${shipmentId}`);
  };

  const handleCreateShipment = () => {
    navigate('/admin/shipments/create');
  };

  const handleEditShipment = (shipmentId) => {
    navigate(`/admin/shipments/${shipmentId}/edit`);
  };

  const handleDeleteShipment = (shipmentId) => {
    if (window.confirm('Are you sure you want to delete this shipment? This action cannot be undone.')) {
      setShipments(prev => prev.filter(s => s.id !== shipmentId));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedShipments.length} shipments? This action cannot be undone.`)) {
      setShipments(prev => prev.filter(s => !selectedShipments.includes(s.id)));
      setSelectedShipments([]);
    }
  };

  const handleBulkStatusUpdate = (newStatus) => {
    setShipments(prev => prev.map(shipment =>
      selectedShipments.includes(shipment.id)
        ? { ...shipment, status: newStatus }
        : shipment
    ));
    setSelectedShipments([]);
  };

  const handleBulkPriorityUpdate = (newPriority) => {
    setShipments(prev => prev.map(shipment =>
      selectedShipments.includes(shipment.id)
        ? { ...shipment, priority: newPriority }
        : shipment
    ));
    setSelectedShipments([]);
  };

  const handleBulkWarehouseAssign = (warehouse) => {
    setShipments(prev => prev.map(shipment =>
      selectedShipments.includes(shipment.id)
        ? { ...shipment, assignedWarehouse: warehouse }
        : shipment
    ));
    setSelectedShipments([]);
  };

  const handleStatusUpdate = async (shipmentId, newStatus, notes = '') => {
    // Update shipment status
    setShipments(prev => prev.map(shipment => {
      if (shipment.id === shipmentId) {
        // Update all parcels within this shipment
        const updatedParcels = shipment.parcels?.map(parcel => ({
          ...parcel,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
          notes: notes ? `${parcel.notes || ''}\n[${new Date().toLocaleString()}] Status updated to ${newStatus}: ${notes}`.trim() : parcel.notes
        })) || [];

        return {
          ...shipment,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
          parcels: updatedParcels,
          // Update actual arrival date if delivered
          actualArrival: newStatus === 'Delivered' ? new Date().toISOString() : shipment.actualArrival,
          // Add status update notes
          statusHistory: [
            ...(shipment.statusHistory || []),
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              notes: notes,
              updatedBy: 'Admin User' // In a real app, this would be the current user
            }
          ]
        };
      }
      return shipment;
    }));

    // Close modal
    setStatusUpdateModal({ isOpen: false, shipment: null });
  };

  const openStatusUpdateModal = (shipment) => {
    setStatusUpdateModal({ isOpen: true, shipment });
  };

  // Calculate KPIs
  const kpis = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter(s => s.status === 'In Transit').length;
    const delivered = shipments.filter(s => s.status === 'Delivered').length;
    const delayed = shipments.filter(s => s.status === 'Delayed').length;
    const pending = shipments.filter(s => s.status === 'Pending').length;

    return {
      totalShipments: total,
      activeShipments: inTransit + pending,
      completedShipments: delivered,
      delayedShipments: delayed,
      onTimeDelivery: Math.round((delivered / (delivered + delayed)) * 100) || 0
    };
  }, [shipments]);

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Shipments Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Comprehensive oversight and control of all international shipments with elevated admin privileges.
              </p>
            </div>
            <button
              onClick={handleCreateShipment}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Shipment
            </button>
          </div>
        </div>

        {/* KPIs Dashboard */}
        <AdminShipmentKPIs kpis={kpis} />

        {/* View Mode Toggle */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                viewMode === 'table'
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                viewMode === 'cards'
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Card View
            </button>
          </div>
        </div>

        {/* Filters */}
        <AdminShipmentFilters
          onFiltersChange={setFilters}
          initialFilters={filters}
        />

        {/* Bulk Actions */}
        <AdminShipmentActions
          selectedCount={selectedShipments.length}
          onExportCSV={() => console.log("Export CSV:", selectedShipments)}
          onExportPDF={() => console.log("Export PDF:", selectedShipments)}
          onPrintManifests={() => console.log("Print manifests for:", selectedShipments)}
          onBulkStatusUpdate={handleBulkStatusUpdate}
          onBulkPriorityUpdate={handleBulkPriorityUpdate}
          onBulkWarehouseAssign={handleBulkWarehouseAssign}
          onBulkDelete={handleBulkDelete}
          onCreateShipment={handleCreateShipment}
        />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md mt-4">
          {isMobile || viewMode === 'cards' ? (
            <div className="p-4">
              {filteredShipments.map((shipment) => (
                <AdminShipmentCard
                  key={shipment.id}
                  shipment={shipment}
                  isSelected={selectedShipments.includes(shipment.id)}
                  onSelect={() => handleSelectShipment(shipment.id)}
                  onView={() => handleViewDetails(shipment.id)}
                  onEdit={() => handleEditShipment(shipment.id)}
                  onDelete={() => handleDeleteShipment(shipment.id)}
                  onPrintManifest={() => console.log("Print manifest:", shipment.id)}
                  onUpdateStatus={() => console.log("Update status:", shipment.id)}
                />
              ))}
            </div>
          ) : (
            <AdminShipmentTable
              shipments={filteredShipments}
              selectedShipments={selectedShipments}
              onSelectShipment={handleSelectShipment}
              onSelectAll={handleSelectAll}
              onView={handleViewDetails}
              onEdit={handleEditShipment}
              onDelete={handleDeleteShipment}
              onPrintManifest={(id) => console.log("Print manifest:", id)}
              onUpdateStatus={openStatusUpdateModal}
            />
          )}
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredShipments.length} of {shipments.length} shipments
        </div>
      </div>

      {/* Status Update Modal */}
      <StatusUpdateModal
        isOpen={statusUpdateModal.isOpen}
        onClose={() => setStatusUpdateModal({ isOpen: false, shipment: null })}
        shipment={statusUpdateModal.shipment}
        onUpdateStatus={handleStatusUpdate}
      />
    </AdminLayout>
  );
};

export default AdminAllShipments;
