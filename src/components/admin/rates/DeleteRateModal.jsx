import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteRateModal = ({ isOpen, onClose, rate, onConfirm }) => {
  if (!isOpen || !rate) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Delete Rate</h2>
          </div>

          <p className="text-gray-700 mb-6">
            Are you sure you want to delete the rate <strong>"{rate.name}"</strong>?
            This action cannot be undone and may affect existing shipments.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <div className="text-sm text-yellow-800">
                <strong>Warning:</strong> Deleting this rate may impact pricing calculations for future shipments.
                Consider deactivating the rate instead.
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(rate.id);
                onClose();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Rate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRateModal;