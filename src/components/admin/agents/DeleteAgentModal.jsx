import React, { useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const DeleteAgentModal = ({ isOpen, onClose, agent, onConfirm }) => {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !agent) return null;

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Deleting agent:', agent.id);
      // In a real app, this would make an API call to delete the agent

      onConfirm(agent.id);
      onClose();
    } catch (error) {
      console.error('Error deleting agent:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-sm w-full mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Agent</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100 mb-3">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <h4 className="text-base font-medium text-gray-900 mb-2">
              Delete {agent.firstName} {agent.lastName}?
            </h4>
            <p className="text-sm text-gray-600">
              This action cannot be undone. All agent data and records will be permanently removed.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {deleting ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAgentModal;