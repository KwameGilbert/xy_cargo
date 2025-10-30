// WarehouseParcelDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ParcelDetail from '../../../components/warehouse/parcels/ParcelDetail';
import { getParcelById } from '../../../services/warehouse/parcelService';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';

const WarehouseParcelDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadParcel = async () => {
            setLoading(true);
            setError(null);
            try {
                // FIX: getParcelById returns a { success, data, message } object
                const result = await getParcelById(id);
                
                if (result.success) {
                    // Use the raw parcel data from the API response
                    setParcel(result.data.parcel); 
                } else {
                    setError(result.message || 'Parcel not found or API error.');
                }
            } catch (err) {
                setError('Failed to load parcel details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadParcel();
        }
    }, [id]);

    const handleBack = () => {
        navigate('/warehouse/parcels');
    };

    if (loading) {
        return (
            <WarehouseLayout>
                <div className="p-6 bg-gray-50 min-h-screen">
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white/10 p-8 rounded-xl shadow-2xl border border-red-100/20 backdrop-blur-md">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-100 border-t-red-600 mx-auto"></div>
                                <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-red-400/20"></div>
                            </div>
                            <p className="mt-6 text-center text-white font-medium text-shadow">Loading parcel details...</p>
                        </div>
                    </div>
                </div>
            </WarehouseLayout>
        );
    }

    if (error || !parcel) {
        // ... (Error state component remains the same) ...
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
                                {error || 'Parcel data is missing.'}
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
            
            {/* CORRECT USAGE: Pass the transformed parcel object as 'parcelData' */}
            <ParcelDetail parcelData={parcel} />
        </div>
        </WarehouseLayout>
    );
};

export default WarehouseParcelDetailPage;