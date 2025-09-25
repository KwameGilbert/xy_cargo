import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, X } from 'lucide-react';

const BulkUpdate = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState('upload'); // upload, preview, results
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [results, setResults] = useState({
    success: 0,
    errors: 0,
    details: []
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadError(null);
    
    // For demo purposes, we'll simulate parsing a CSV file
    if (selectedFile) {
      // In a real app, you would parse the actual file
      // Here we're just creating mock data
      const mockData = [
        {
          id: 'PCL-001',
          trackingNumber: 'TRK-12345',
          customerName: 'John Doe',
          status: 'Pending',
          action: 'Update Status to In Transit'
        },
        {
          id: 'PCL-002',
          trackingNumber: 'TRK-12346',
          customerName: 'Jane Smith',
          status: 'In Transit',
          action: 'Update Status to Delivered'
        },
        {
          id: 'PCL-003',
          trackingNumber: 'TRK-12347',
          customerName: 'Robert Johnson',
          status: 'Pending',
          action: 'Update Status to In Transit'
        },
        {
          id: 'PCL-004',
          trackingNumber: 'TRK-12348',
          customerName: 'Sarah Williams',
          status: 'Pending',
          action: 'Mark as Special Handling'
        },
        {
          id: 'PCL-005',
          trackingNumber: 'TRK-12349',
          customerName: 'Michael Brown',
          status: 'In Transit',
          action: 'Update Status to Delivered'
        }
      ];
      
      setFileData(mockData);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }
    
    setStep('preview');
  };

  const handleConfirm = () => {
    // Simulate processing the bulk update
    // In a real app, this would send the data to the server
    
    // Mock results
    const mockResults = {
      success: 4,
      errors: 1,
      details: [
        {
          id: 'PCL-001',
          trackingNumber: 'TRK-12345',
          status: 'Success',
          message: 'Status updated to In Transit'
        },
        {
          id: 'PCL-002',
          trackingNumber: 'TRK-12346',
          status: 'Success',
          message: 'Status updated to Delivered'
        },
        {
          id: 'PCL-003',
          trackingNumber: 'TRK-12347',
          status: 'Success',
          message: 'Status updated to In Transit'
        },
        {
          id: 'PCL-004',
          trackingNumber: 'TRK-12348',
          status: 'Success',
          message: 'Marked as Special Handling'
        },
        {
          id: 'PCL-005',
          trackingNumber: 'TRK-12349',
          status: 'Error',
          message: 'Parcel not found in system'
        }
      ]
    };
    
    setResults(mockResults);
    setStep('results');
  };

  const downloadTemplate = () => {
    // In a real app, this would download a CSV template
    alert('Downloading template...');
  };

  const renderUploadStep = () => (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Update Parcels</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 mb-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Upload a CSV file with parcel updates
            </p>
            <p className="text-xs text-gray-500 mt-1">
              CSV file should include parcel ID, tracking number, and the action to perform
            </p>
          </div>
          <div className="mt-4">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Select File
            </label>
          </div>
          {file && (
            <div className="mt-4 flex items-center justify-center">
              <FileText className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{file.name}</span>
            </div>
          )}
          {uploadError && (
            <div className="mt-2 text-sm text-red-600">
              {uploadError}
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={downloadTemplate}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download Template
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start">
        <AlertTriangle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-blue-800">Bulk Update Instructions</h4>
          <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
            <li>Prepare your CSV file with the required columns</li>
            <li>Each row should represent one parcel update</li>
            <li>Required columns: Parcel ID, Tracking Number, Action</li>
            <li>Supported actions: Update Status, Mark as Special, Update Payment</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            file ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
        >
          Preview Updates
        </button>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Preview Updates</h3>
      
      <div className="bg-yellow-50 p-4 rounded-md mb-6 flex items-start">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-yellow-800">Please Review Before Confirming</h4>
          <p className="text-sm text-yellow-700 mt-1">
            The following updates will be applied to {fileData.length} parcels. Please review carefully before confirming.
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcel ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fileData.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.trackingNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep('upload')}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Confirm Updates
        </button>
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Update Results</h3>
      
      <div className="bg-green-50 p-4 rounded-md mb-6 flex items-start">
        <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-green-800">Bulk Update Completed</h4>
          <p className="text-sm text-green-700 mt-1">
            Successfully updated {results.success} parcels. {results.errors} errors occurred.
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcel ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.details.map((result, index) => (
              <tr key={index} className={result.status === 'Error' ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {result.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.trackingNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    result.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep('upload')}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Upload Another File
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Bulk Update Parcels</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {step === 'upload' && renderUploadStep()}
      {step === 'preview' && renderPreviewStep()}
      {step === 'results' && renderResultsStep()}
    </div>
  );
};

export default BulkUpdate;