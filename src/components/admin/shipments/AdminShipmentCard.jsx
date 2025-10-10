import React from 'react';
import {
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
  XCircle,
  DollarSign,
  Building,
  User
} from 'lucide-react';

const AdminShipmentCard = ({
  shipment,
  isSelected,
  onSelectionChange,
  onViewDetails,
  onEditShipment,
  onDeleteShipment,
  onUpdateStatus
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'In Transit':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Processing':
        return <Package className="h-5 w-5 text-purple-500" />;
      case 'Delayed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 p-4 mb-4 ${
      isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
    }`}>
      {/* Header with checkbox and status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectionChange(shipment.id, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {shipment.id}
            </h3>
            <p className="text-sm text-gray-500">
              {shipment.trackingNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(shipment.status)}
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>
      </div>

      {/* Priority */}
      <div className="mb-3">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(shipment.priority)}`}>
          {shipment.priority} Priority
        </span>
      </div>

      {/* Route */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">From</p>
            <p className="text-sm font-medium text-gray-900">{shipment.originCountry}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">To</p>
            <p className="text-sm font-medium text-gray-900">{shipment.destinationCountry}</p>
          </div>
        </div>
      </div>

      {/* Carrier and Dates */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Carrier</p>
            <p className="text-sm font-medium text-gray-900">{shipment.carrier}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Departure</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(shipment.departureDate)}</p>
          </div>
        </div>
      </div>

      {/* Package Info and Cost */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Parcels</p>
            <p className="text-sm font-medium text-gray-900">
              {shipment.totalParcels} ({shipment.totalWeight})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Cost</p>
            <p className="text-sm font-medium text-gray-900">{shipment.shippingCost}</p>
          </div>
        </div>
      </div>

      {/* Assignment Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Warehouse</p>
            <p className="text-sm font-medium text-gray-900">{shipment.assignedWarehouse}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Agent</p>
            <p className="text-sm font-medium text-gray-900">{shipment.assignedAgent}</p>
          </div>
        </div>
      </div>

      {/* Delay Reason (if applicable) */}
      {shipment.delayReason && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Delay Reason</p>
              <p className="text-sm text-red-700">{shipment.delayReason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={() => onViewDetails(shipment)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Eye className="h-4 w-4" />
          View
        </button>
        <button
          onClick={() => onEditShipment(shipment)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Edit className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={() => onDeleteShipment(shipment)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminShipmentCard;