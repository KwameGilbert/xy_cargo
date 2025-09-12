import React from 'react';

const ConfirmDialog = ({ open, title = 'Confirm', message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs px-2 sm:px-4">
      {/* Backdrop: click to close */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onCancel}
        aria-label="Close modal"
        tabIndex={-1}
        role="presentation"
      />
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-4 sm:p-6 md:p-8 relative flex flex-col"
        style={{ minHeight: 'auto', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center">{title}</h3>
        <p className="text-sm text-gray-600 mb-6 text-center">{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-md w-full sm:w-auto">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md w-full sm:w-auto">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
