// EditWarehouseParcelPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditParcelForm from '../../../components/warehouse/parcels/EditParcelForm';
import { getParcelById, updateParcel } from '../../../services/warehouse/parcelService';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import { useToast } from '../../../contexts/ToastContext';

const EditWarehouseParcelPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParcel = async () => {
            try {
                const result = await getParcelById(id);
                if (result.success) {
                    setParcel(result.data.parcel);
                } else {
                    setError(result.message || 'Failed to load parcel details');
                    showToast({
                        type: 'error',
                        message: 'Failed to load parcel details'
                    });
                }
            } catch (err) {
                setError(err.message || 'Error fetching parcel details');
                showToast({
                    type: 'error',
                    message: 'Failed to load parcel details'
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchParcel();
        }
    }, [id, showToast]);

    const handleSubmit = async (formData) => {
        try {
            const result = await updateParcel(id, formData);
            if (result.success) {
                showToast({
                    type: 'success',
                    message: 'Parcel updated successfully'
                });
                navigate(`/warehouse/parcels/${id}`);
            } else {
                showToast({
                    type: 'error',
                    message: result.message || 'Error updating parcel'
                });
            }
        } catch (err) {
            showToast({
                type: 'error',
                message: err.message || 'Error updating parcel'
            });
        }
    };

    const handleCancel = () => {
        navigate(`/warehouse/parcels/${id}`);
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
                            onClick={() => navigate('/warehouse/parcels')}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Return to Parcels
                        </button>
                    </div>
                </div>
            </WarehouseLayout>
        );
    }

    return (
        <WarehouseLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Parcel</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Update the parcel information below
                    </p>
                </div>

                <EditParcelForm
                    initialData={parcel}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </WarehouseLayout>
    );
};

export default EditWarehouseParcelPage;