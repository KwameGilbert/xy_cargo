import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminParcelDetail from '../../../components/admin/parcels/AdminParcelDetail';

// Mock data for parcel details (extended for admin)
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

const AdminParcelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
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

  const handleBack = () => {
    navigate('/admin/parcels');
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
            <button onClick={handleBack} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
              Back to Parcels
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
          <button onClick={handleBack} className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            &larr; Back to Parcels
          </button>
        </div>
        <AdminParcelDetail parcel={parcel} />
      </div>
    </AdminLayout>
  );
};

export default AdminParcelDetailPage;