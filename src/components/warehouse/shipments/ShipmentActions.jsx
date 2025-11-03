import React from 'react';
import { Download, Upload, FileText, Printer, Plus } from 'lucide-react';

const ShipmentActions = ({ onExportCSV, onExportPDF, onPrintManifests, onCreateShipment }) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">
            Shipment Actions
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onExportCSV}
              className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>

            <button
              onClick={onExportPDF}
              className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <button
              onClick={onPrintManifests}
              className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              <Printer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Print Manifests</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onCreateShipment}
              className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Create Shipment</span>
              <span className="sm:hidden">Create</span>
            </button>
            <button
              onClick={() => window.location.href = '/warehouse/shipments/bulk-create'}
              className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md bg-gray-800 text-white hover:bg-gray-900"
            >
              <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Bulk Create</span>
              <span className="sm:hidden">Bulk</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentActions;