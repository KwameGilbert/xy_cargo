import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminParcelDetail from '../../../components/admin/parcels/AdminParcelDetail';
import mockParcelData from '../../../components/admin/parcels/mockData'; // Assuming mock data is available
import ParcelActionsAdmin from '../../../components/admin/parcels/ParcelActionsAdmin';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';

const AdminParcelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    try {
      const timer = setTimeout(() => {
        const parcelData = mockParcelData.find(parcel => parcel.id === id); // Fetching specific parcel by ID
        
        if (parcelData) {
          setParcel(parcelData);
          setLoading(false);
        } else {
          setError('Parcel not found');
          setLoading(false);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to load parcel details');
      setLoading(false);
    }
  }, [id]);

  const handleBack = () => {
    navigate('/admin/parcels');
  };

  if (loading) {
    return (
      <WarehouseLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
      </WarehouseLayout>
    );
  }

  if (error) {
    return (
      <WarehouseLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="bg-red-50 p-4 rounded-md">
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
          <div className="mt-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Back to Parcels
            </button>
          </div>
        </div>
      </WarehouseLayout>
    );
  }

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            &larr; Back to Parcels
          </button>
        </div>
        
        <ParcelActionsAdmin parcel={parcel} />
        <AdminParcelDetail parcel={parcel} />
      </div>
    </WarehouseLayout>
  );
};

export default AdminParcelDetailPage;