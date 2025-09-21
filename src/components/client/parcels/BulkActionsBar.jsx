import React from 'react';

const BulkActionsBar = ({ bulkSelected, clearSelection }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-blue-900">
        {bulkSelected.length} parcel{bulkSelected.length !== 1 ? 's' : ''} selected
      </span>
      <div className="flex space-x-2">
        <button className="text-sm text-blue-600 hover:text-blue-800">Download Invoices</button>
        <button className="text-sm text-blue-600 hover:text-blue-800">Pay Outstanding</button>
        <button onClick={clearSelection} className="text-sm text-gray-600 hover:text-gray-800">Clear</button>
      </div>
    </div>
  </div>
);

export default BulkActionsBar;
