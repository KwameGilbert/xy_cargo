import React, { useState } from 'react';
import {
  Download,
  Printer,
  Trash2,
  Edit,
  CheckCircle,
  AlertTriangle,
  Package,
  Building,
  User,
  MoreHorizontal
} from 'lucide-react';

const AdminShipmentActions = ({
  selectedShipments = [],
  selectedCount,
  onBulkStatusUpdate,
  onBulkPriorityUpdate,
  onBulkWarehouseUpdate,
  onBulkWarehouseAssign,
  onBulkAgentUpdate,
  onBulkDelete,
  onExport,
  onExportCSV,
  onPrint,
  onPrintManifests,
  onCreateShipment
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showWarehouseDropdown, setShowWarehouseDropdown] = useState(false);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);

  // Use selectedCount if provided, otherwise calculate from selectedShipments
  const count = selectedCount !== undefined ? selectedCount : selectedShipments.length;

  const statusOptions = [
    { value: 'Pending', label: 'Mark as Pending', color: 'text-yellow-600' },
    { value: 'Processing', label: 'Mark as Processing', color: 'text-purple-600' },
    { value: 'In Transit', label: 'Mark as In Transit', color: 'text-blue-600' },
    { value: 'Delivered', label: 'Mark as Delivered', color: 'text-green-600' },
    { value: 'Delayed', label: 'Mark as Delayed', color: 'text-red-600' },
    { value: 'Cancelled', label: 'Mark as Cancelled', color: 'text-gray-600' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Set Low Priority', color: 'text-gray-600' },
    { value: 'Normal', label: 'Set Normal Priority', color: 'text-blue-600' },
    { value: 'High', label: 'Set High Priority', color: 'text-orange-600' },
    { value: 'Urgent', label: 'Set Urgent Priority', color: 'text-red-600' }
  ];

  const warehouseOptions = [
    { value: 'Warehouse A', label: 'Assign to Warehouse A' },
    { value: 'Warehouse B', label: 'Assign to Warehouse B' },
    { value: 'Warehouse C', label: 'Assign to Warehouse C' }
  ];

  const agentOptions = [
    { value: 'Agent Sarah Johnson', label: 'Assign to Sarah Johnson' },
    { value: 'Agent Michael Chen', label: 'Assign to Michael Chen' },
    { value: 'Agent David Wilson', label: 'Assign to David Wilson' }
  ];

  const handleBulkStatusUpdate = (status) => {
    onBulkStatusUpdate(selectedShipments, status);
    setShowStatusDropdown(false);
  };

  const handleBulkPriorityUpdate = (priority) => {
    onBulkPriorityUpdate(selectedShipments, priority);
    setShowPriorityDropdown(false);
  };

  const handleBulkWarehouseUpdate = (warehouse) => {
    if (onBulkWarehouseUpdate) {
      onBulkWarehouseUpdate(selectedShipments, warehouse);
    } else if (onBulkWarehouseAssign) {
      onBulkWarehouseAssign(warehouse);
    }
    setShowWarehouseDropdown(false);
  };

  const handleBulkAgentUpdate = (agent) => {
    if (onBulkAgentUpdate) {
      onBulkAgentUpdate(selectedShipments, agent);
    }
    setShowAgentDropdown(false);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${count} shipment(s)? This action cannot be undone.`)) {
      onBulkDelete(selectedShipments);
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else if (onExportCSV) {
      onExportCSV();
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else if (onPrintManifests) {
      onPrintManifests();
    }
  };

  if (count === 0) {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="text-sm text-gray-600">
          Select shipments to perform bulk actions
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export All
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Printer className="h-4 w-4" />
            Print All
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border-b border-blue-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-blue-900">
            {count} shipment{count > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={() => setShowBulkActions(!showBulkActions)}
            className="text-sm text-blue-700 hover:text-blue-800 font-medium"
          >
            {showBulkActions ? 'Hide' : 'Show'} bulk actions
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200"
          >
            <Download className="h-4 w-4" />
            Export Selected
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200"
          >
            <Printer className="h-4 w-4" />
            Print Selected
          </button>
        </div>
      </div>

      {showBulkActions && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* Status Update */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <CheckCircle className="h-4 w-4" />
              Update Status
              <MoreHorizontal className="h-4 w-4 ml-auto" />
            </button>
            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  {statusOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleBulkStatusUpdate(option.value)}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 ${option.color}`}
                    >
                      <CheckCircle className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Priority Update */}
          <div className="relative">
            <button
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <AlertTriangle className="h-4 w-4" />
              Set Priority
              <MoreHorizontal className="h-4 w-4 ml-auto" />
            </button>
            {showPriorityDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  {priorityOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleBulkPriorityUpdate(option.value)}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 ${option.color}`}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Warehouse Assignment */}
          <div className="relative">
            <button
              onClick={() => setShowWarehouseDropdown(!showWarehouseDropdown)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Building className="h-4 w-4" />
              Assign Warehouse
              <MoreHorizontal className="h-4 w-4 ml-auto" />
            </button>
            {showWarehouseDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  {warehouseOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleBulkWarehouseUpdate(option.value)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Building className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Agent Assignment */}
          <div className="relative">
            <button
              onClick={() => setShowAgentDropdown(!showAgentDropdown)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <User className="h-4 w-4" />
              Assign Agent
              <MoreHorizontal className="h-4 w-4 ml-auto" />
            </button>
            {showAgentDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  {agentOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleBulkAgentUpdate(option.value)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Edit Selected */}
          <button
            onClick={() => {/* TODO: Implement bulk edit */}}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit className="h-4 w-4" />
            Edit Selected
          </button>

          {/* Delete Selected */}
          <button
            onClick={handleBulkDelete}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-lg hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
          </button>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showStatusDropdown || showPriorityDropdown || showWarehouseDropdown || showAgentDropdown) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowStatusDropdown(false);
            setShowPriorityDropdown(false);
            setShowWarehouseDropdown(false);
            setShowAgentDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminShipmentActions;