import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BulkUpdate from '../../../components/warehouse/parcels/BulkUpdate';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';


const BulkUpdatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setError(null);
    
    // In a real app, this would be an API call to process the bulk update
    // For demo purposes, we'll simulate a successful API call
    setTimeout(() => {
      try {
        console.log('Bulk update completed');
        
        // Simulate successful update
        setSubmitSuccess(true);
        setIsSubmitting(false);
        
        // After a brief delay, navigate to the parcels list
        setTimeout(() => {
          navigate('/warehouse/parcels');
        }, 1500);
      } catch (err) {
        setError('Failed to process bulk update. Please try again.');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/warehouse/parcels');
  };

  return (
    <WarehouseLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Bulk Update Parcels</h1>
            <p className="mt-1 text-sm text-gray-500">
            Upload a CSV file to update multiple parcels at once.
            </p>
        </div>
        
        {isSubmitting && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-center text-gray-700">Processing bulk update...</p>
            </div>
            </div>
        )}
        
        {submitSuccess && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                </div>
                <p className="mt-4 text-center text-gray-700">Bulk update completed successfully!</p>
                <p className="mt-2 text-center text-gray-500">Redirecting to parcels list...</p>
            </div>
            </div>
        )}
        
        {error && (
            <div className="mb-6 bg-red-50 p-4 rounded-md">
            <div className="flex">
                <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                </div>
                <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                    {error}
                </h3>
                </div>
            </div>
            </div>
        )}
        
        <BulkUpdate onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
    </WarehouseLayout>
  );
};

export default BulkUpdatePage;