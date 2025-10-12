import React from 'react';
import { AlertTriangle, X, User } from 'lucide-react';

const DeleteStaffModal = ({
  isOpen,
  onClose,
  onConfirm,
  staff,
  isDeleting = false
}) => {
  if (!isOpen || !staff) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
    <div className="bg-white rounded-lg shadow-xl max-w-xs w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-red-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Delete Staff Member</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isDeleting}
          >
            <X className="h-3 w-3 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="text-center mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
              <User className="h-4 w-4 text-red-600" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Delete {staff.firstName} {staff.lastName}?
            </h4>
            <p className="text-gray-600 text-xs">
              This action cannot be undone. This will permanently delete the staff member from the system.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 p-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b border-white"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStaffModal;