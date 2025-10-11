import React from 'react';
import { AlertTriangle, CheckCircle, Clock, XCircle, Edit, Trash2, Eye, MapPin, Truck } from 'lucide-react';

const AdminWarehouseCard = ({
  warehouse,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Maintenance':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'Inactive':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
            <p className="text-sm text-gray-500">{warehouse.id}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(warehouse.status)}`}>
          {getStatusIcon(warehouse.status)}
          <span className="ml-1">{warehouse.status}</span>
        </span>
      </div>

      {/* Address */}
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-4 w-4 text-gray-400" />
        <div className="text-sm text-gray-900">{warehouse.address}</div>
      </div>

      {/* Shipment Type */}
      <div className="flex items-center space-x-2 mb-4">
        <Truck className="h-4 w-4 text-gray-400" />
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {warehouse.shipmentType}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onView(warehouse.id)}
            className="inline-flex items-center px-3 py-1.5 border border-blue-500 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </button>
          <button
            onClick={() => onEdit(warehouse.id)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
        </div>
        <button
          onClick={() => onDelete(warehouse.id)}
          className="inline-flex items-center px-3 py-1.5 border border-red-500 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminWarehouseCard;