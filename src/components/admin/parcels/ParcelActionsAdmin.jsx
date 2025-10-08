import React from 'react';

const ParcelActionsAdmin = ({ selectedCount, onAssignToShipment, onMarkDelivered, onBulkStatusUpdate, onExportCSV, onExportPDF, onPrintLabels }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <p className="text-sm text-gray-600 mb-2">{selectedCount} parcels selected</p>
    <div className="flex flex-wrap gap-2">
      <button onClick={onAssignToShipment} className="px-4 py-2 bg-blue-600 text-white rounded">Assign to Shipment</button>
      <button onClick={onMarkDelivered} className="px-4 py-2 bg-green-600 text-white rounded">Mark as Delivered</button>
      <select onChange={(e) => onBulkStatusUpdate(e.target.value)} className="px-4 py-2 border rounded">
        <option>Update Status</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button onClick={onExportCSV} className="px-4 py-2 bg-gray-600 text-white rounded">Export CSV</button>
      <button onClick={onExportPDF} className="px-4 py-2 bg-gray-600 text-white rounded">Export PDF</button>
      <button onClick={onPrintLabels} className="px-4 py-2 bg-gray-600 text-white rounded">Print Labels</button>
    </div>
  </div>
);

export default ParcelActionsAdmin;