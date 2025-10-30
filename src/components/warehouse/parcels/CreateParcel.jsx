import React, { useState } from 'react';
import { Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { getApiBaseUrl } from '../../../services/warehouse/authService';

const CreateParcel = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState('form'); // 'form' or 'summary'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    client_id: '',
    shipment_id: '',
    description: '',
    weight: '',
    dimensions: '',
    declared_value: '',
    shipping_cost: '',
    payment_status: 'unpaid',
    category: '',
    notes: '',
    tags: '',
    items: [
      {
        name: '',
        quantity: 1,
        weight: '',
        dimensions: {
          length: '',
          width: '',
          height: ''
        },
        value: '',
        special_packaging: false
      }
    ]
  });

  const [clientInfo, setClientInfo] = useState(null);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientError, setClientError] = useState(null);

  const [shipmentInfo, setShipmentInfo] = useState(null);
  const [shipmentLoading, setShipmentLoading] = useState(false);
  const [shipmentError, setShipmentError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const fetchClientById = async (id) => {
    setClientInfo(null);
    setClientError(null);

    const parsed = parseInt(id, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setClientError('Please enter a valid client ID');
      return;
    }

    setClientLoading(true);
    try {
      // Adjust the base path if your API is proxied under /api or similar
      const res = await fetch(`${getApiBaseUrl()}/clients/${parsed}`, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok || data.status === 'error') {
        const msg = data.message || 'Client not found';
        setClientError(msg);
        setClientInfo(null);
      } else {
        setClientInfo(data.client || null);
        setClientError(null);
      }
    } catch (err) {
      console.error('Failed to fetch client:', err);
      setClientError('Failed to fetch client.');
      setClientInfo(null);
    } finally {
      setClientLoading(false);
    }
  };

  const fetchShipmentById = async (id) => {
    setShipmentInfo(null);
    setShipmentError(null);

    const parsed = parseInt(id, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setShipmentError('Please enter a valid shipment ID');
      return;
    }

    setShipmentLoading(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/shipments/${parsed}`, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok || data.status === 'error') {
        const msg = data.message || 'Shipment not found';
        setShipmentError(msg);
        setShipmentInfo(null);
      } else {
        setShipmentInfo(data.shipment || data || null);
        setShipmentError(null);
      }
    } catch (err) {
      console.error('Failed to fetch shipment:', err);
      setShipmentError('Failed to fetch shipment.');
      setShipmentInfo(null);
    } finally {
      setShipmentLoading(false);
    }
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleDimensionChange = (index, dimension, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? {
          ...item,
          dimensions: { ...item.dimensions, [dimension]: value }
        } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        name: '',
        quantity: 1,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        value: '',
        special_packaging: false
      }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.client_id.trim()) {
      newErrors.client_id = 'Client ID is required';
    }

    if (!formData.shipment_id.trim()) {
      newErrors.shipment_id = 'Shipment ID is required';
    }

    // Validate items
    formData.items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`item_${index}_name`] = 'Item name is required';
      }
      if (!item.weight || item.weight <= 0) {
        newErrors[`item_${index}_weight`] = 'Valid weight is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Fetch shipment info if shipment_id is provided
    if (formData.shipment_id) {
      fetchShipmentById(formData.shipment_id);
    }

    // Go to summary page
    setCurrentStep('summary');
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Prepare data for API
      const submitData = {
        ...formData,
        client_id: parseInt(formData.client_id),
        shipment_id: formData.shipment_id ? parseInt(formData.shipment_id) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        declared_value: formData.declared_value ? parseFloat(formData.declared_value) : null,
        shipping_cost: formData.shipping_cost ? parseFloat(formData.shipping_cost) : null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,
        items: formData.items.map(item => ({
          ...item,
          quantity: parseInt(item.quantity),
          weight: parseFloat(item.weight),
          value: item.value ? parseFloat(item.value) : null,
          height: item.dimensions.height ? parseFloat(item.dimensions.height) : null,
          width: item.dimensions.width ? parseFloat(item.dimensions.width) : null,
          length: item.dimensions.length ? parseFloat(item.dimensions.length) : null,
          fragile: item.special_packaging,
          special_packaging: item.special_packaging
        }))
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Create New Parcel</h2>
        <p className="mt-1 text-sm text-gray-500">
          {currentStep === 'form' ? 'Enter the details for the new parcel' : 'Review your parcel information'}
        </p>

        {/* Progress Steps */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'form' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                1
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">Enter Details</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'summary' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">Review & Submit</div>
            </div>
          </div>
        </div>
      </div>

      {currentStep === 'form' ? (
        <form onSubmit={handleFormSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
                    Client ID *
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="client_id"
                      value={formData.client_id}
                      onChange={(e) => {
                        handleInputChange('client_id', e.target.value);
                        // clear client info when id changes
                        if (clientInfo) setClientInfo(null);
                        if (clientError) setClientError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          fetchClientById(e.target.value);
                        }
                      }}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                        errors.client_id ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => fetchClientById(formData.client_id)}
                      className="ml-2 mt-1 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white hover:bg-gray-50"
                    >
                      {clientLoading ? '...' : 'Find'}
                    </button>
                  </div>
                  {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}
                  {clientError && <p className="mt-1 text-sm text-red-600">{clientError}</p>}
              </div>

              <div>
                <label htmlFor="shipment_id" className="block text-sm font-medium text-gray-700">
                  Shipment ID *
                </label>
                <input
                  type="number"
                  id="shipment_id"
                  value={formData.shipment_id}
                  onChange={(e) => {
                    handleInputChange('shipment_id', e.target.value);
                    // Clear shipment info when id changes
                    if (shipmentInfo) setShipmentInfo(null);
                    if (shipmentError) setShipmentError(null);
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      fetchShipmentById(e.target.value);
                    }
                  }}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                    errors.shipment_id ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.shipment_id && <p className="mt-1 text-sm text-red-600">{errors.shipment_id}</p>}
                {shipmentError && <p className="mt-1 text-sm text-red-600">{shipmentError}</p>}
              </div>

              {/* Non-editable shipment info display */}
              {shipmentInfo && (
                <div className="sm:col-span-2 bg-blue-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Shipment Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {shipmentInfo.tracking_number && (
                      <div>
                        <p className="text-xs text-gray-500">Tracking Number</p>
                        <p className="text-sm text-gray-900">{shipmentInfo.tracking_number}</p>
                      </div>
                    )}
                    {shipmentInfo.status && (
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-sm text-gray-900 capitalize">{shipmentInfo.status.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500">Origin - Destination</p>
                      <p className="text-sm text-gray-900">{shipmentInfo.origin_country || 'N/A'} → {shipmentInfo.destination_country || 'N/A'}</p>
                    </div>
                    {shipmentInfo.expected_delivery && (
                      <div>
                        <p className="text-xs text-gray-500">Expected Delivery</p>
                        <p className="text-sm text-gray-900">{new Date(shipmentInfo.expected_delivery).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Non-editable client info display */}
              {clientInfo && (
                <div className="sm:col-span-2 bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Client</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm text-gray-900">{(clientInfo.firstName || '') + ' ' + (clientInfo.lastName || '')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">{clientInfo.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{clientInfo.email || 'N/A'}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm text-gray-900">{clientInfo.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Total Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                  Dimensions
                </label>
                <input
                  type="text"
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                  placeholder="e.g., 30x20x10 cm"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="declared_value" className="block text-sm font-medium text-gray-700">
                  Declared Value ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="declared_value"
                  value={formData.declared_value}
                  onChange={(e) => handleInputChange('declared_value', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="shipping_cost" className="block text-sm font-medium text-gray-700">
                  Shipping Cost ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="shipping_cost"
                  value={formData.shipping_cost}
                  onChange={(e) => handleInputChange('shipping_cost', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="payment_status" className="block text-sm font-medium text-gray-700">
                  Payment Status
                </label>
                <select
                  id="payment_status"
                  value={formData.payment_status}
                  onChange={(e) => handleInputChange('payment_status', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="fragile, electronics, documents"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Items</h3>

            {formData.items.map((item, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-900">Item {index + 1}</h4>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                        errors[`item_${index}_name`] ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors[`item_${index}_name`] && <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_name`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Weight (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.weight}
                      onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                        errors[`item_${index}_weight`] ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors[`item_${index}_weight`] && <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_weight`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Value ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.value}
                      onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Dimensions (cm)
                    </label>
                    <div className="mt-1 flex space-x-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="Length"
                        value={item.dimensions.length}
                        onChange={(e) => handleDimensionChange(index, 'length', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Width"
                        value={item.dimensions.width}
                        onChange={(e) => handleDimensionChange(index, 'width', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Height"
                        value={item.dimensions.height}
                        onChange={(e) => handleDimensionChange(index, 'height', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center">
                      <input
                        id={`special-packaging-${index}`}
                        type="checkbox"
                        checked={item.special_packaging}
                        onChange={(e) => handleItemChange(index, 'special_packaging', e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`special-packaging-${index}`} className="ml-2 block text-sm text-gray-900">
                        Requires Special Packaging
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Item
            </button>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Review & Submit
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      ) : (
        /* Summary Page */
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Parcel Summary</h3>

            {/* Basic Information Summary */}
            {/* Client Information Summary */}
            {clientInfo && (
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Client Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Client ID</p>
                    <p className="text-sm text-gray-900">{formData.client_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-sm text-gray-900">{(clientInfo.firstName || '') + ' ' + (clientInfo.lastName || '')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{clientInfo.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{clientInfo.email || 'N/A'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-900">{clientInfo.address || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Basic Information Summary */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">Basic Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Client ID</p>
                  <p className="text-sm text-gray-900">{formData.client_id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Shipment ID</p>
                  <p className="text-sm text-gray-900">{formData.shipment_id || 'Not specified'}</p>
                </div>
                {formData.description && (
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-sm text-gray-900">{formData.description}</p>
                  </div>
                )}
                {formData.weight && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Weight</p>
                    <p className="text-sm text-gray-900">{formData.weight} kg</p>
                  </div>
                )}
                {formData.dimensions && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dimensions</p>
                    <p className="text-sm text-gray-900">{formData.dimensions}</p>
                  </div>
                )}
                {formData.declared_value && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Declared Value</p>
                    <p className="text-sm text-gray-900">${formData.declared_value}</p>
                  </div>
                )}
                {formData.shipping_cost && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Shipping Cost</p>
                    <p className="text-sm text-gray-900">${formData.shipping_cost}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Status</p>
                  <p className="text-sm text-gray-900 capitalize">{formData.payment_status}</p>
                </div>
                {formData.category && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="text-sm text-gray-900">{formData.category}</p>
                  </div>
                )}
                {formData.tags && (
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Tags</p>
                    <p className="text-sm text-gray-900">{formData.tags}</p>
                  </div>
                )}
                {formData.notes && (
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-sm text-gray-900">{formData.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shipment Information Summary */}
                  {shipmentInfo && (
                    <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Shipment Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {shipmentInfo.tracking_number && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tracking Number</p>
                        <p className="text-sm text-gray-900">{shipmentInfo.tracking_number}</p>
                      </div>
                      )}
                      {shipmentInfo.origin_country && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Origin Country</p>
                        <p className="text-sm text-gray-900">{shipmentInfo.origin_country}</p>
                      </div>
                      )}
                      {shipmentInfo.destination_country && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Destination Country</p>
                        <p className="text-sm text-gray-900">{shipmentInfo.destination_country}</p>
                      </div>
                      )}
                      {shipmentInfo.departure_date && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Departure Date</p>
                        <p className="text-sm text-gray-900">{new Date(shipmentInfo.departure_date).toLocaleDateString()}</p>
                      </div>
                      )}
                      {shipmentInfo.expected_delivery && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Expected Delivery</p>
                        <p className="text-sm text-gray-900">{new Date(shipmentInfo.expected_delivery).toLocaleDateString()}</p>
                      </div>
                      )}
                      {shipmentInfo.arrival_date && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Arrival Date</p>
                        <p className="text-sm text-gray-900">{new Date(shipmentInfo.arrival_date).toLocaleDateString()}</p>
                      </div>
                      )}
                      {shipmentInfo.status && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className="text-sm text-gray-900 capitalize">{shipmentInfo.status.toLowerCase().split('_').map(word =>word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      </div>
                      )}
                      {shipmentInfo.priority && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Priority</p>
                        <p className="text-sm text-gray-900 capitalize">{shipmentInfo.priority}</p>
                      </div>
                      )}
                      {shipmentInfo.notes && (
                      <div className="sm:col-span-2">
                        <p className="text-sm font-medium text-gray-500">Notes</p>
                        <p className="text-sm text-gray-900">{shipmentInfo.notes}</p>
                      </div>
                      )}
                    </div>
                    </div>
                  )}

                  {/* Show loading or error for shipment */}
            {shipmentLoading && (
              <div className="bg-yellow-50 p-4 rounded-md mb-6">
                <p className="text-sm text-yellow-800">Loading shipment information...</p>
              </div>
            )}
            {shipmentError && (
              <div className="bg-red-50 p-4 rounded-md mb-6">
                <p className="text-sm text-red-800">{shipmentError}</p>
              </div>
            )}

            {/* Items Summary */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">Items ({formData.items.length})</h4>
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-900 mb-2">Item {index + 1}: {item.name}</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-500">Quantity:</span>
                        <span className="ml-1 text-gray-900">{item.quantity}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Weight:</span>
                        <span className="ml-1 text-gray-900">{item.weight} kg</span>
                      </div>
                      {item.value && (
                        <div>
                          <span className="font-medium text-gray-500">Value:</span>
                          <span className="ml-1 text-gray-900">${item.value}</span>
                        </div>
                      )}
                      {item.special_packaging && (
                        <div>
                          <span className="font-medium text-gray-500">Special Packaging:</span>
                          <span className="ml-1 text-gray-900">Yes</span>
                        </div>
                      )}
                    </div>
                    {(item.dimensions.length || item.dimensions.width || item.dimensions.height) && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium text-gray-500">Dimensions:</span>
                        <span className="ml-1 text-gray-900">
                          {item.dimensions.length || 0} × {item.dimensions.width || 0} × {item.dimensions.height || 0} cm
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={goBackToForm}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Edit
            </button>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Parcel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateParcel;