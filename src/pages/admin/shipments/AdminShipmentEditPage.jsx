import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import mockShipmentsData from '../../../components/admin/shipments/mockData';
import {
  ArrowLeft,
  Save,
  MapPin,
  Calendar,
  Truck,
  Package,
  DollarSign,
  User,
  Building,
  AlertTriangle
} from 'lucide-react';

const AdminShipmentEditPage = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
    priority: '',
    carrier: '',
    assignedWarehouse: '',
    assignedAgent: '',
    shippingCost: '',
    customsDuty: '',
    notes: ''
  });

  useEffect(() => {
    // Find the shipment by ID
    const foundShipment = mockShipmentsData.shipments.find(s => s.id === shipmentId);
    if (foundShipment) {
      setShipment(foundShipment);
      setFormData({
        status: foundShipment.status || '',
        priority: foundShipment.priority || '',
        carrier: foundShipment.carrier || '',
        assignedWarehouse: foundShipment.assignedWarehouse || '',
        assignedAgent: foundShipment.assignedAgent || '',
        shippingCost: foundShipment.shippingCost || '',
        customsDuty: foundShipment.customsDuty || '',
        notes: foundShipment.notes || ''
      });
    }
    setLoading(false);
  }, [shipmentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the shipment in mock data (this won't persist)
      const updatedShipment = {
        ...shipment,
        ...formData,
        lastUpdated: new Date().toISOString()
      };

      console.log('Updated shipment:', updatedShipment);

      // Navigate back to the shipment detail page
      navigate(`/admin/shipments/${shipmentId}`);
    } catch (error) {
      console.error('Error updating shipment:', error);
      alert('Error updating shipment. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!shipment) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Shipment not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The shipment you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/admin/shipments')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Shipments
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/admin/shipments/${shipmentId}`)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shipment
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Shipment</h1>
                <p className="mt-1 text-sm text-gray-500">
                  {shipment.id} - {shipment.trackingNumber}
                </p>
              </div>
            </div>
            <button
              type="submit"
              form="shipment-form"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form id="shipment-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Created">Created</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Carrier</label>
                  <select
                    name="carrier"
                    value={formData.carrier}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Carrier</option>
                    <option value="DHL Express">DHL Express</option>
                    <option value="FedEx">FedEx</option>
                    <option value="UPS">UPS</option>
                    <option value="TNT">TNT</option>
                    <option value="EMS">EMS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Shipping Cost</label>
                  <input
                    type="text"
                    name="shippingCost"
                    value={formData.shippingCost}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="$0.00"
                  />
                </div>
              </div>
            </div>

            {/* Assignment Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assignment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned Warehouse</label>
                  <select
                    name="assignedWarehouse"
                    value={formData.assignedWarehouse}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Warehouse</option>
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                    <option value="Warehouse C">Warehouse C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned Agent</label>
                  <select
                    name="assignedAgent"
                    value={formData.assignedAgent}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Agent</option>
                    <option value="Agent Sarah Johnson">Agent Sarah Johnson</option>
                    <option value="Agent Michael Chen">Agent Michael Chen</option>
                    <option value="Agent Emma Davis">Agent Emma Davis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Customs Duty</label>
                  <input
                    type="text"
                    name="customsDuty"
                    value={formData.customsDuty}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="$0.00"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any additional notes..."
              />
            </div>
          </form>
        </div>

        {/* Read-only Information */}
        <div className="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Details (Read-only)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Origin</p>
                <p className="text-sm text-gray-600">{shipment.originCountry}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Destination</p>
                <p className="text-sm text-gray-600">{shipment.destinationCountry}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Departure Date</p>
                <p className="text-sm text-gray-600">{new Date(shipment.departureDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Total Parcels</p>
                <p className="text-sm text-gray-600">{shipment.totalParcels}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Total Weight</p>
                <p className="text-sm text-gray-600">{shipment.totalWeight}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Created By</p>
                <p className="text-sm text-gray-600">{shipment.createdBy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminShipmentEditPage;