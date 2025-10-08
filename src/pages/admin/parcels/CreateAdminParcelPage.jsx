import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAdminParcel from '../../../components/admin/parcels/CreateAdminParcel';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const CreateAdminParcelPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isBulk, setIsBulk] = useState(false); // NEW: Bulk creation toggle
  const [previewData, setPreviewData] = useState(null); // NEW: Preview data

  const handleSubmit = (formData) => {
    if (isBulk) {
      // Handle bulk submission (simulate)
      console.log('Bulk creating parcels:', formData);
    } else {
      setIsSubmitting(true);
      setError(null);
      setTimeout(() => {
        try {
          console.log('Creating parcel with admin data:', formData);
          setSubmitSuccess(true);
          setIsSubmitting(false);
          setTimeout(() => navigate('/admin/parcels'), 1500);
        } catch (err) {
          setError('Failed to create parcel. Please try again.');
          setIsSubmitting(false);
        }
      }, 1000);
    }
  };

  const handlePreview = (formData) => {
    setPreviewData(formData); // NEW: Set preview data
  };

  const handleCancel = () => {
    navigate('/admin/parcels');
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Parcel (Admin)</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter details and assign to warehouse/agent with admin oversight.
          </p>
          <label className="flex items-center mt-2">
            <input type="checkbox" checked={isBulk} onChange={(e) => setIsBulk(e.target.checked)} className="mr-2" />
            Enable Bulk Creation (Create multiple parcels)
          </label>
        </div>

        {/* Loading Spinner */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-center text-gray-700">Creating parcel...</p>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {submitSuccess && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-4 text-center text-gray-700">Parcel created successfully!</p>
              <p className="mt-2 text-center text-gray-500">Redirecting to parcels list...</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewData && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
              <h3 className="text-lg font-bold">Preview Parcel</h3>
              <p><strong>Customer:</strong> {previewData.customerName}</p>
              <p><strong>Weight:</strong> {previewData.totalWeight} kg</p>
              <p><strong>Value:</strong> ${previewData.declaredValue}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => { handleSubmit(previewData); setPreviewData(null); }} className="bg-red-600 text-white px-4 py-2 rounded">Confirm</button>
                <button onClick={() => setPreviewData(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Edit</button>
              </div>
            </div>
          </div>
        )}

        <CreateAdminParcel onSubmit={handleSubmit} onPreview={handlePreview} onCancel={handleCancel} isBulk={isBulk} />
      </div>
    </AdminLayout>
  );
};

export default CreateAdminParcelPage;