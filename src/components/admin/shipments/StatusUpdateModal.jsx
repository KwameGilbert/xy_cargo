import React, { useState } from 'react';
import { X, CheckCircle, Truck, Clock, Package, AlertTriangle, XCircle } from 'lucide-react';

const StatusUpdateModal = ({ isOpen, onClose, shipment, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(shipment?.status || '');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateAllParcels, setUpdateAllParcels] = useState(true);

  if (!isOpen || !shipment) return null;

  const statusOptions = [
    { value: 'Created', label: 'Created', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: Clock },
    { value: 'Pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
    { value: 'Processing', label: 'Processing', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Package },
    { value: 'In Transit', label: 'In Transit', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Truck },
    { value: 'Delivered', label: 'Delivered', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    { value: 'Delayed', label: 'Delayed', color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle },
    { value: 'Cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircle }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStatus) return;

    setIsUpdating(true);
    try {
      await onUpdateStatus({
        shipmentId: shipment.id,
        status: selectedStatus,
        notes,
        location,
        updateAllParcels,
      });
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Update Shipment Status</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{shipment.id}</p>
                <p className="text-sm text-gray-500">{shipment.trackingNumber}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Status
            </label>
            <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${statusOptions.find(s => s.value === shipment.status)?.color || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
              {shipment.status}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Status *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {statusOptions.map((status) => {
                const Icon = status.icon;
                return (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setSelectedStatus(status.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      selectedStatus === status.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{status.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter current location..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this status update..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={updateAllParcels}
                onChange={(e) => setUpdateAllParcels(e.target.checked)}
                className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 leading-relaxed">Update status for all parcels in this shipment</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedStatus || isUpdating}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;