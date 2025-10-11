import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteCustomerModal = ({ isOpen, onClose, customer, onConfirm, loading = false }) => {
  if (!isOpen || !customer) return null;

  const handleConfirm = () => {
    onConfirm(customer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Delete Customer</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete <span className="font-medium text-gray-900">{customer.firstName} {customer.lastName}</span>?
            This action cannot be undone.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">This will permanently delete:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Customer account and profile information</li>
                  <li>All associated parcels and tracking history</li>
                  <li>Payment records and transaction history</li>
                  <li>Loyalty points and rewards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">ID:</span> {customer.id}</p>
            <p><span className="font-medium">Email:</span> {customer.email}</p>
            <p><span className="font-medium">Total Parcels:</span> {customer.totalParcels}</p>
            <p><span className="font-medium">Total Spent:</span> ZMW {customer.totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                Delete Customer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;