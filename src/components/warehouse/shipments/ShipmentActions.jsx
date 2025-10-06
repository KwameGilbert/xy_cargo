import React, { useState } from 'react';
import { Download, Upload, Printer, FileText, CheckSquare, Globe } from 'lucide-react';

const ShipmentActions = ({ selectedCount, onExportCSV, onExportPDF, onPrintManifests, onBulkStatusUpdate }) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          {selectedCount > 0 ? (
            <span className="text-sm font-medium text-gray-700">
              {selectedCount} {selectedCount === 1 ? 'shipment' : 'shipments'} selected
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-500">
              No shipments selected
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onExportCSV}
            disabled={selectedCount === 0}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              selectedCount > 0
                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          
          <button
            onClick={onExportPDF}
            disabled={selectedCount === 0}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              selectedCount > 0
                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </button>
          
          <button
            onClick={onPrintManifests}
            disabled={selectedCount === 0}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              selectedCount > 0
                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Manifests
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              disabled={selectedCount === 0}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                selectedCount > 0
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-red-300 text-white cursor-not-allowed'
              }`}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Update Status
            </button>
            
            {showStatusDropdown && selectedCount > 0 && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onBulkStatusUpdate('Pending');
                      setShowStatusDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mark as Pending
                  </button>
                  <button
                    onClick={() => {
                      onBulkStatusUpdate('Processing');
                      setShowStatusDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mark as Processing
                  </button>
                  <button
                    onClick={() => {
                      onBulkStatusUpdate('In Transit');
                      setShowStatusDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mark as In Transit
                  </button>
                  <button
                    onClick={() => {
                      onBulkStatusUpdate('Delivered');
                      setShowStatusDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mark as Delivered
                  </button>
                  <button
                    onClick={() => {
                      onBulkStatusUpdate('International');
                      setShowStatusDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Flag as International
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => window.location.href = '/warehouse/shipments/bulk-create'}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-800 text-white hover:bg-gray-900"
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipmentActions;