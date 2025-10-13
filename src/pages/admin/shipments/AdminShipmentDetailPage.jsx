import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import mockShipmentsData from '../../../components/admin/shipments/mockData';
import StatusUpdateModal from '../../../components/admin/shipments/StatusUpdateModal';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Truck,
  Package,
  DollarSign,
  User,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Download,
  Printer,
  Plus,
  X
} from 'lucide-react';

const AdminShipmentDetailPage = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAddParcelModalOpen, setIsAddParcelModalOpen] = useState(false);
  const [parcelToAdd, setParcelToAdd] = useState('');

  useEffect(() => {
    // Find the shipment by ID
    const foundShipment = mockShipmentsData.shipments.find(s => s.id === shipmentId);
    if (foundShipment) {
      setShipment(foundShipment);
    }
    setLoading(false);
  }, [shipmentId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'In Transit':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Processing':
        return <Package className="h-5 w-5 text-purple-500" />;
      case 'Delayed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date: Something went wrong...: ' + error.message;
    }
  };

  const handleEdit = () => {
    navigate(`/admin/shipments/${shipmentId}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this shipment? This action cannot be undone.')) {
      // Handle delete logic here
      navigate('/admin/shipments');
    }
  };

  const handlePrintManifest = () => {
    navigate(`/admin/shipments/${shipmentId}/manifest`);
  };

  const handleExportData = () => {
    // Handle export logic here
    console.log('Export shipment data');
  };

  const handleUpdateStatus = async (updateData) => {
    try {
      // In a real application, this would be an API call
      const updatedShipment = {
        ...shipment,
        status: updateData.status,
        statusHistory: [
          {
            status: updateData.status,
            location: updateData.location,
            notes: updateData.notes,
            timestamp: new Date().toISOString(),
          },
          ...(shipment.statusHistory || []),
        ],
      };
      
      setShipment(updatedShipment);
      setIsStatusModalOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
      // Show error toast or message
    }
  };

  const handleAddParcel = () => {
    if (!parcelToAdd.trim()) return;

    // In a real application, you would fetch the parcel data from an API
    // For now, we'll create a mock parcel
    const newParcel = {
      id: parcelToAdd,
      description: `Parcel ${parcelToAdd}`,
      customerName: 'Customer Name',
      customerContact: '+1234567890',
      weight: '2.5 kg',
      dimensions: '30x20x15 cm',
      paymentStatus: 'Pending',
      specialHandling: false,
      declaredValue: '$150.00'
    };

    const updatedShipment = {
      ...shipment,
      parcels: [...(shipment.parcels || []), newParcel],
      totalParcels: (shipment.totalParcels || 0) + 1,
      lastUpdated: new Date().toISOString()
    };

    setShipment(updatedShipment);
    setParcelToAdd('');
    setIsAddParcelModalOpen(false);
  };

  const handleRemoveParcel = (parcelId) => {
    if (!window.confirm('Are you sure you want to remove this parcel from the shipment?')) {
      return;
    }

    const updatedShipment = {
      ...shipment,
      parcels: shipment.parcels.filter(parcel => parcel.id !== parcelId),
      totalParcels: Math.max(0, (shipment.totalParcels || 0) - 1),
      lastUpdated: new Date().toISOString()
    };

    setShipment(updatedShipment);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!shipment) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Shipment not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The shipment you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/admin/shipments')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shipments
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/admin/shipments')}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Shipments
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{shipment.id}</h1>
                  <p className="text-sm text-gray-500">{shipment.trackingNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsStatusModalOpen(true)}
                  className="inline-flex items-center px-3 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Update Status
                </button>
                <button
                  onClick={() => navigate(`/admin/shipments/${shipmentId}/manifest`)}
                  className="inline-flex items-center px-3 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Manifest
                </button>
                <button
                  onClick={handlePrintManifest}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Manifest
                </button>
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Status Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Shipment Overview</h2>
              <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                {getStatusIcon(shipment.status)}
                <span className="ml-2">{shipment.status}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Origin</p>
                  <p className="text-sm text-gray-500">{shipment.originCountry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Destination</p>
                  <p className="text-sm text-gray-500">{shipment.destinationCountry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Carrier</p>
                  <p className="text-sm text-gray-500">{shipment.carrier}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Departure</p>
                  <p className="text-sm text-gray-500">{formatDate(shipment.departureDate)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Package className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{shipment.totalParcels}</p>
                <p className="text-sm text-gray-500">Total Parcels</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{shipment.shippingCost}</p>
                <p className="text-sm text-gray-500">Shipping Cost</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Package className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{shipment.totalWeight}</p>
                <p className="text-sm text-gray-500">Total Weight</p>
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Priority</dt>
                  <dd className="text-sm text-gray-900">{shipment.priority}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Total Volume</dt>
                  <dd className="text-sm text-gray-900">{shipment.totalVolume}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Insurance Value</dt>
                  <dd className="text-sm text-gray-900">{shipment.insuranceValue}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Customs Duty</dt>
                  <dd className="text-sm text-gray-900">{shipment.customsDuty}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Created By</dt>
                  <dd className="text-sm text-gray-900">{shipment.createdBy}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="text-sm text-gray-900">{formatDate(shipment.createdAt)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="text-sm text-gray-900">{formatDate(shipment.lastUpdated)}</dd>
                </div>
              </dl>
            </div>

            {/* Assignment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Information</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Warehouse</dt>
                  <dd className="text-sm text-gray-900">{shipment.assignedWarehouse || 'Unassigned'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Agent</dt>
                  <dd className="text-sm text-gray-900">{shipment.assignedAgent || 'Unassigned'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Estimated Arrival</dt>
                  <dd className="text-sm text-gray-900">{formatDate(shipment.estimatedArrival)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Actual Arrival</dt>
                  <dd className="text-sm text-gray-900">{shipment.actualArrival ? formatDate(shipment.actualArrival) : 'Not arrived'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Customer Satisfaction</dt>
                  <dd className="text-sm text-gray-900">{shipment.customerSatisfaction}/5</dd>
                </div>
                {shipment.delayReason && (
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Delay Reason</dt>
                    <dd className="text-sm text-red-600">{shipment.delayReason}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Parcels */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Parcels ({shipment.parcels?.length || 0})</h3>
              <button
                onClick={() => setIsAddParcelModalOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Parcel
              </button>
            </div>
            <div className="space-y-4">
              {shipment.parcels?.map((parcel, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">{parcel.id}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        parcel.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {parcel.paymentStatus}
                      </span>
                      <button
                        onClick={() => handleRemoveParcel(parcel.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Remove parcel from shipment"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{parcel.description}</p>
                      <p className="text-gray-500">{parcel.customerName}</p>
                      <p className="text-gray-500">{parcel.customerContact}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Weight:</span> {parcel.weight}</p>
                      <p><span className="font-medium">Dimensions:</span> {parcel.dimensions}</p>
                      <p><span className="font-medium">Declared Value:</span> {parcel.declaredValue}</p>
                    </div>
                  </div>
                  {parcel.specialHandling && (
                    <div className="mt-2">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        Special Handling Required
                      </span>
                    </div>
                  )}
                </div>
              )) || (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">No parcels in this shipment</p>
                  <button
                    onClick={() => setIsAddParcelModalOpen(true)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Parcel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {shipment.notes && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
              <p className="text-gray-700">{shipment.notes}</p>
            </div>
          )}

          {/* Status Update Modal */}
          <StatusUpdateModal
            isOpen={isStatusModalOpen}
            onClose={() => setIsStatusModalOpen(false)}
            shipment={shipment}
            onUpdateStatus={handleUpdateStatus}
          />

          {/* Add Parcel Modal */}
          {isAddParcelModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Add Parcel to Shipment</h3>
                  <button
                    onClick={() => setIsAddParcelModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parcel ID
                    </label>
                    <input
                      type="text"
                      value={parcelToAdd}
                      onChange={(e) => setParcelToAdd(e.target.value)}
                      placeholder="Enter parcel ID (e.g., WP-2024-001)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter the parcel ID to add to this shipment
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsAddParcelModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddParcel}
                      disabled={!parcelToAdd.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Parcel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminShipmentDetailPage;