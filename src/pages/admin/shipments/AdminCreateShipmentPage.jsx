import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  ArrowLeft,
  Save,
  Package,
  MapPin,
  Truck,
  DollarSign,
  Calendar,
  User,
  Building,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminCreateShipmentPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Basic Information
    trackingNumber: '',
    status: 'Created',
    priority: 'Normal',

    // Origin & Destination
    originCountry: '',
    destinationCountry: '',

    // Carrier & Logistics
    carrier: '',
    departureDate: '',
    estimatedArrival: '',

    // Financial Information
    shippingCost: '',
    insuranceValue: '',
    customsDuty: '',

    // Assignment
    assignedWarehouse: '',
    assignedAgent: '',

    // Additional Information
    notes: ''
  });

  // Available options
  const statusOptions = [
    { value: 'Created', label: 'Created' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Normal', label: 'Normal' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' }
  ];

  const carrierOptions = [
    'DHL Express',
    'FedEx',
    'UPS',
    'TNT',
    'EMS',
    'Aramex',
    'USPS',
    'Royal Mail'
  ];

  const warehouseOptions = [
    'Warehouse A',
    'Warehouse B',
    'Warehouse C',
    'Central Distribution Center',
    'Regional Hub North',
    'Regional Hub South'
  ];

  const agentOptions = [
    'Agent Sarah Johnson',
    'Agent Michael Chen',
    'Agent Emma Davis',
    'Agent Robert Wilson',
    'Agent Lisa Brown',
    'Agent David Lee'
  ];

  const countryOptions = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bangladesh', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'China',
    'Colombia', 'Croatia', 'Czech Republic', 'Denmark', 'Egypt', 'Finland',
    'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'Iceland', 'India',
    'Indonesia', 'Ireland', 'Italy', 'Japan', 'Jordan', 'Kenya', 'South Korea',
    'Lebanon', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'Spain',
    'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'Vietnam'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.trackingNumber.trim()) {
      newErrors.trackingNumber = 'Tracking number is required';
    }
    if (!formData.originCountry) {
      newErrors.originCountry = 'Origin country is required';
    }
    if (!formData.destinationCountry) {
      newErrors.destinationCountry = 'Destination country is required';
    }
    if (!formData.carrier) {
      newErrors.carrier = 'Carrier is required';
    }
    if (!formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    }
    if (!formData.estimatedArrival) {
      newErrors.estimatedArrival = 'Estimated arrival date is required';
    }

    // Date validation
    if (formData.departureDate && formData.estimatedArrival) {
      const departure = new Date(formData.departureDate);
      const arrival = new Date(formData.estimatedArrival);
      if (arrival <= departure) {
        newErrors.estimatedArrival = 'Estimated arrival must be after departure date';
      }
    }

    // Financial validation
    if (formData.shippingCost && isNaN(parseFloat(formData.shippingCost.replace('$', '').replace(',', '')))) {
      newErrors.shippingCost = 'Please enter a valid shipping cost';
    }
    if (formData.insuranceValue && isNaN(parseFloat(formData.insuranceValue.replace('$', '').replace(',', '')))) {
      newErrors.insuranceValue = 'Please enter a valid insurance value';
    }
    if (formData.customsDuty && isNaN(parseFloat(formData.customsDuty.replace('$', '').replace(',', '')))) {
      newErrors.customsDuty = 'Please enter a valid customs duty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate shipment ID
      const shipmentId = `SH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

      // Prepare shipment data
      const shipmentData = {
        ...formData,
        id: shipmentId,
        totalParcels: 0,
        totalWeight: '0 kg',
        totalVolume: '0 m³',
        actualArrival: null,
        createdBy: 'Admin User', // In a real app, this would be the current user
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        customerSatisfaction: 0,
        delayReason: null,
        parcels: [],
        statusHistory: [{
          status: formData.status,
          timestamp: new Date().toISOString(),
          notes: 'Shipment created',
          updatedBy: 'Admin User'
        }]
      };

      // In a real application, this would be an API call
      console.log('Creating shipment:', shipmentData);

      // Show success message
      alert('Shipment created successfully!');

      // Navigate back to shipments list
      navigate('/admin/shipments');

    } catch (error) {
      console.error('Error creating shipment:', error);
      alert('Failed to create shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All entered data will be lost.')) {
      navigate('/admin/shipments');
    }
  };

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
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Shipments
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Create New Shipment</h1>
                  <p className="text-sm text-gray-500">Enter all shipment details below</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Package className="h-5 w-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number *
                  </label>
                  <input
                    type="text"
                    name="trackingNumber"
                    value={formData.trackingNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., XYC-SH-001234"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      errors.trackingNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.trackingNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.trackingNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Origin & Destination</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin Country *
                  </label>
                  <select
                    name="originCountry"
                    value={formData.originCountry}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      errors.originCountry ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select origin country</option>
                    {countryOptions.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.originCountry && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.originCountry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Country *
                  </label>
                  <select
                    name="destinationCountry"
                    value={formData.destinationCountry}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      errors.destinationCountry ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select destination country</option>
                    {countryOptions.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.destinationCountry && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.destinationCountry}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Carrier & Logistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Truck className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">Carrier & Logistics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carrier *
                  </label>
                  <select
                    name="carrier"
                    value={formData.carrier}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      errors.carrier ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select carrier</option>
                    {carrierOptions.map(carrier => (
                      <option key={carrier} value={carrier}>
                        {carrier}
                      </option>
                    ))}
                  </select>
                  {errors.carrier && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.carrier}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      errors.departureDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.departureDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.departureDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Arrival *
                  </label>
                  <input
                    type="date"
                    name="estimatedArrival"
                    value={formData.estimatedArrival}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      errors.estimatedArrival ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.estimatedArrival && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.estimatedArrival}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Financial Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="text"
                      name="shippingCost"
                      value={formData.shippingCost}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                        errors.shippingCost ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.shippingCost && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.shippingCost}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="text"
                      name="insuranceValue"
                      value={formData.insuranceValue}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                        errors.insuranceValue ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.insuranceValue && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.insuranceValue}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customs Duty
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="text"
                      name="customsDuty"
                      value={formData.customsDuty}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                        errors.customsDuty ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.customsDuty && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.customsDuty}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Assignment</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Warehouse
                  </label>
                  <select
                    name="assignedWarehouse"
                    value={formData.assignedWarehouse}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    <option value="">Select warehouse</option>
                    {warehouseOptions.map(warehouse => (
                      <option key={warehouse} value={warehouse}>
                        {warehouse}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Agent
                  </label>
                  <select
                    name="assignedAgent"
                    value={formData.assignedAgent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    <option value="">Select agent</option>
                    {agentOptions.map(agent => (
                      <option key={agent} value={agent}>
                        {agent}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Additional Notes</h2>
              </div>

              <div>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Enter any additional notes or special instructions..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Shipment
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateShipmentPage;