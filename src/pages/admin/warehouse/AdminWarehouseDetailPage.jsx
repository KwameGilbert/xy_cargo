import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import mockWarehousesData from '../../../components/admin/warehouse/mockData';

const AdminWarehouseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadWarehouse = async () => {
      setLoading(true);
      setTimeout(() => {
        const foundWarehouse = mockWarehousesData.warehouses.find(w => w.id === id);
        setWarehouse(foundWarehouse || null);
        setLoading(false);
      }, 500);
    };

    loadWarehouse();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'Maintenance':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'Inactive':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const handleEdit = () => {
    navigate(`/admin/warehouses/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this warehouse? This action cannot be undone.')) {
      // In a real app, this would make an API call
      navigate('/admin/warehouses');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!warehouse) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Warehouse not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The warehouse you're looking for doesn't exist or has been deleted.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/admin/warehouses')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Warehouses
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/warehouses')}
              className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{warehouse.name}</h1>
              <p className="text-sm text-gray-500">{warehouse.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className="mb-8">
          <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(warehouse.status)}`}>
            {getStatusIcon(warehouse.status)}
            <span className="ml-2">{warehouse.status}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Warehouse Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Warehouse Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Warehouse Name</label>
                <p className="text-lg font-medium text-gray-900">{warehouse.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-900">{warehouse.address}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Shipment Type</label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {warehouse.shipmentType}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(warehouse.status)}`}>
                  {getStatusIcon(warehouse.status)}
                  <span className="ml-1">{warehouse.status}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={handleEdit}
                className="w-full flex items-center justify-center px-4 py-3 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Warehouse
              </button>
              <button
                onClick={() => navigate('/admin/warehouses')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Package className="h-4 w-4 mr-2" />
                View All Warehouses
              </button>
              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center px-4 py-3 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Warehouse
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWarehouseDetailPage;