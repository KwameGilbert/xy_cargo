import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
  MapPin,
  Calendar,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const AdminShipmentTable = ({
  shipments = [],
  selectedShipments = [],
  onSelectionChange,
  onSelectShipment,
  onSelectAll,
  onViewDetails,
  onView,
  onEditShipment,
  onEdit,
  onDeleteShipment,
  onDelete,
  sortConfig = { key: 'departureDate', direction: 'desc' },
  onSort,
  onPrintManifest,
  onUpdateStatus
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const selectAllRef = useRef(null);

  // Fix: Handle indeterminate state properly
  useEffect(() => {
    if (selectAllRef.current) {
      const isIndeterminate = 
        selectedShipments.length > 0 && 
        selectedShipments.length < shipments.length;
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [selectedShipments, shipments]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Transit':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Processing':
        return <Package className="h-4 w-4 text-purple-500" />;
      case 'Delayed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-purple-100 text-purple-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Normal':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAll = (checked) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange(shipments.map(s => s.id));
      } else {
        onSelectionChange([]);
      }
    } else if (onSelectAll) {
      onSelectAll(checked);
    }
  };

  const handleSelectShipment = (shipmentId, checked) => {
    if (onSelectionChange) {
      if (checked) {
        const updatedSelection = Array.from(new Set([...selectedShipments, shipmentId]));
        onSelectionChange(updatedSelection);
      } else {
        onSelectionChange(selectedShipments.filter(id => id !== shipmentId));
      }
    } else if (onSelectShipment) {
      onSelectShipment(shipmentId, checked);
    }
  };

  const handleSort = (key) => {
    if (!onSort) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const SortableHeader = ({ label, sortKey, className = '' }) => (
    <th
      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortConfig.key === sortKey && (
          sortConfig.direction === 'asc' ?
            <ChevronUp className="h-4 w-4" /> :
            <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </th>
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const toggleDropdown = (shipmentId) => {
    setDropdownOpen(dropdownOpen === shipmentId ? null : shipmentId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Fix: Handle action calls safely
  const handleView = (shipment) => {
    if (onViewDetails) onViewDetails(shipment);
    else if (onView) onView(shipment);
  };

  const handleEdit = (shipment) => {
    if (onEditShipment) onEditShipment(shipment);
    else if (onEdit) onEdit(shipment);
  };

  const handleDelete = (shipment) => {
    if (onDeleteShipment) onDeleteShipment(shipment);
    else if (onDelete) onDelete(shipment);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Fix: Use th instead of td for header cells */}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={selectedShipments.length === shipments.length && shipments.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                aria-label="Select all shipments"
              />
            </th>
            <SortableHeader label="Shipment ID" sortKey="id" />
            <SortableHeader label="Status & Priority" sortKey="status" />
            <SortableHeader label="Route" sortKey="originCountry" />
            <SortableHeader label="Departure" sortKey="departureDate" />
            <SortableHeader label="Parcels" sortKey="totalParcels" />
            <SortableHeader label="Cost" sortKey="shippingCost" />
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedShipments.includes(shipment.id)}
                  onChange={(e) => handleSelectShipment(shipment.id, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label={`Select shipment ${shipment.id}`}
                />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {shipment.id || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {shipment.trackingNumber || 'No tracking'}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(shipment.status)}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                      {shipment.status || 'Unknown'}
                    </span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full w-fit ${getPriorityColor(shipment.priority)}`}>
                    {shipment.priority || 'Normal'}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-sm text-gray-900">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="font-medium">From:</span> {shipment.originCountry || 'Unknown'}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-900">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="font-medium">To:</span> {shipment.destinationCountry || 'Unknown'}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1 text-sm text-gray-900">
                  <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  {formatDate(shipment.departureDate)}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {shipment.totalParcels || 0}
                </div>
                <div className="text-sm text-gray-500">
                  {shipment.totalWeight || '0 kg'}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {shipment.shippingCost || '$0.00'}
                </div>
                <div className="text-sm text-gray-500">
                  Duty: {shipment.customsDuty || '$0.00'}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-900">
                  {shipment.assignedWarehouse || 'Unassigned'}
                </div>
                <div className="text-sm text-gray-500">
                  {shipment.assignedAgent || 'No agent'}
                </div>
              </td>
              <td className="px-4 py-4 text-right whitespace-nowrap">
                <div className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown(shipment.id)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                    aria-label="More actions"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  {dropdownOpen === shipment.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleView(shipment);
                            setDropdownOpen(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            handleEdit(shipment);
                            setDropdownOpen(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Shipment
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(shipment);
                            setDropdownOpen(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {shipments.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No shipments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No shipments match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminShipmentTable;