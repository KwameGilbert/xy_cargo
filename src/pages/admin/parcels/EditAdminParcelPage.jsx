import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditAdminParcel from '../../../components/admin/parcels/EditAdminParcel';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

// Mock data for parcel details (same as AdminParcelDetailPage)
const mockParcelDetail = {
  id: 'P001',
  trackingNumber: 'XYC-123456',
  status: 'In Transit',
  customer: {
    id: 'CUST-001',
    name: 'John Doe',
    phone: '+1-555-0123',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA'
  },
  warehouse: 'Warehouse A',
  agent: 'Agent 1',
  priority: 'normal',
  paymentStatus: 'Paid',
  paymentAmount: '$150.00',
  dateCreated: '2023-10-01',
  estimatedDelivery: '2023-10-05',
  items: [
    {
      id: 'I001',
      name: 'Laptop',
      quantity: 1,
      weight: 2.5,
      dimensions: { length: 35, width: 25, height: 2 },
      value: '$1000.00',
      specialPackaging: false
    },
    {
      id: 'I002',
      name: 'Mouse',
      quantity: 1,
      weight: 0.2,
      dimensions: { length: 10, width: 5, height: 3 },
      value: '$50.00',
      specialPackaging: false
    }
  ],
  totalWeight: 2.7,
  totalVolume: 0.002,
  totalValue: '$1050.00',
  specialInstructions: 'Handle with care',
  adminNotes: 'Priority customer',
  statusTimeline: [
    { status: 'Created', date: '2023-10-01 09:00', location: 'Warehouse A' },
    { status: 'In Transit', date: '2023-10-02 14:30', location: 'Distribution Center' },
    { status: 'Out for Delivery', date: '2023-10-04 10:15', location: 'Local Hub' }
  ]
};

const EditAdminParcelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch parcel data
    const fetchParcel = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setParcel(mockParcelDetail);
        setLoading(false);
      } catch (err) {
        setError('Failed to load parcel details');
        setLoading(false);
      }
    };
    fetchParcel();
  }, [id]);

  const handleSubmit = (formData) => {
    setIsSubmitting(true);
    setError(null);
    setTimeout(() => {
      try {
        console.log('Updating parcel with admin data:', formData);
        setSubmitSuccess(true);
        setIsSubmitting(false);
        setTimeout(() => navigate(`/admin/parcels/${id}`), 1500);
      } catch (err) {
        setError('Failed to update parcel. Please try again.');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handleCancel = () => {
    navigate(`/admin/parcels/${id}`);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={handleCancel} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
              Back to Parcel Details
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Parcel Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            Modify parcel information with admin privileges. Parcel ID: {parcel.id}
          </p>
        </div>

        {/* Loading Spinner */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-center text-gray-700">Updating parcel...</p>
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
              <p className="mt-4 text-center text-gray-700">Parcel updated successfully!</p>
              <p className="mt-2 text-center text-gray-500">Redirecting to parcel details...</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <EditAdminParcel parcel={parcel} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </AdminLayout>
  );
};

export default EditAdminParcelPage;