import React, { useState, useEffect } from 'react';
import { Plus, Minus, X, AlertTriangle, Calculator, Package, Truck, User, MapPin } from 'lucide-react';

const EditAdminParcel = ({ parcel, onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerCode, setCustomerCode] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [showCustomerResults, setShowCustomerResults] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedShipmentType, setSelectedShipmentType] = useState(null);

  const [formData, setFormData] = useState({
    customerDetails: {
      id: parcel.customer.id,
      name: parcel.customer.name,
      phone: parcel.customer.phone,
      email: parcel.customer.email,
      address: parcel.customer.address,
      addressId: ''
    },
    shipmentDetails: {
      type: '',
      code: '',
      origin: {
        warehouse: parcel.warehouse,
        address: ''
      }
    },
    items: parcel.items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      weight: item.weight,
      dimensions: item.dimensions,
      value: item.value.replace('$', ''),
      specialPackaging: item.specialPackaging
    })),
    specialInstructions: parcel.specialInstructions || '',
    warehouse: parcel.warehouse,
    agent: parcel.agent,
    priority: parcel.priority,
    adminNotes: parcel.adminNotes || '',
    attachments: [],
    paymentStatus: parcel.paymentStatus
  });

  const [errors, setErrors] = useState({});
  const [calculatedCost, setCalculatedCost] = useState(parseFloat(parcel.paymentAmount.replace('$', '')));

  // Mock customer data for search
  const mockCustomers = [
    { id: 'CUST-001', name: 'John Doe', phone: '+1-555-0123', email: 'john.doe@example.com' },
    { id: 'CUST-002', name: 'Jane Smith', phone: '+1-555-0124', email: 'jane.smith@example.com' },
    { id: 'CUST-003', name: 'Bob Johnson', phone: '+1-555-0125', email: 'bob.johnson@example.com' }
  ];

  // Handle customer code search
  const handleCustomerCodeSearch = () => {
    if (!customerCode.trim()) return;

    const foundCustomer = mockCustomers.find(c => c.id === customerCode.toUpperCase());
    if (foundCustomer) {
      setSelectedCustomer(foundCustomer);
      setFormData(prev => ({
        ...prev,
        customerDetails: {
          id: foundCustomer.id,
          name: foundCustomer.name,
          phone: foundCustomer.phone,
          email: foundCustomer.email,
          address: parcel.customer.address, // Keep existing address
          addressId: ''
        }
      }));
      setCustomerCode('');
    } else {
      alert('Customer not found. Please check the customer ID.');
    }
  };

  const resetCustomerAndShipment = () => {
    setSelectedCustomer(null);
    setSelectedAddress(null);
    setSelectedShipmentType(null);
    setFormData(prev => ({
      ...prev,
      customerDetails: {
        id: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        addressId: ''
      },
      shipmentDetails: {
        type: '',
        code: '',
        origin: {
          warehouse: '',
          address: ''
        }
      }
    }));
  };

  // Handle customer search
  const handleCustomerSearch = (e) => {
    const term = e.target.value;
    setCustomerSearchTerm(term);
    if (term.length > 2) {
      const filtered = mockCustomers.filter(customer =>
        customer.name.toLowerCase().includes(term.toLowerCase()) ||
        customer.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCustomers(filtered);
      setShowCustomerResults(true);
    } else {
      setShowCustomerResults(false);
    }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormData(prev => ({
      ...prev,
      customerDetails: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: parcel.customer.address, // Keep existing address
        addressId: ''
      }
    }));
    setCustomerSearchTerm('');
    setShowCustomerResults(false);
  };

  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    // Mock address selection
    const mockAddresses = {
      'ADDR-001': '123 Main St, Anytown, USA',
      'ADDR-002': '456 Oak Ave, Somewhere, USA',
      'ADDR-003': '789 Pine Rd, Elsewhere, USA'
    };

    setSelectedAddress(addressId);
    setFormData(prev => ({
      ...prev,
      customerDetails: {
        ...prev.customerDetails,
        address: mockAddresses[addressId] || '',
        addressId
      }
    }));
  };

  const handleShipmentTypeChange = (e) => {
    const type = e.target.value;
    setSelectedShipmentType(type);
    setFormData(prev => ({
      ...prev,
      shipmentDetails: {
        ...prev.shipmentDetails,
        type
      }
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    if (field === 'dimensions') {
      updatedItems[index][field] = { ...updatedItems[index][field], ...value };
    } else {
      updatedItems[index][field] = value;
    }
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: `I${Date.now()}`,
        name: '',
        quantity: 1,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        value: '',
        specialPackaging: false
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

  const calculateTotalWeight = () => {
    return formData.items.reduce((total, item) => total + (parseFloat(item.weight) * item.quantity || 0), 0);
  };

  const calculateTotalVolume = () => {
    return formData.items.reduce((total, item) => {
      const { length, width, height } = item.dimensions;
      const volume = (parseFloat(length) || 0) * (parseFloat(width) || 0) * (parseFloat(height) || 0) * item.quantity;
      return total + volume;
    }, 0) / 1000000; // Convert to m³
  };

  const calculateTotalValue = () => {
    return formData.items.reduce((total, item) => total + (parseFloat(item.value) * item.quantity || 0), 0);
  };

  const calculateCost = (data) => {
    const weight = calculateTotalWeight();
    const volume = calculateTotalVolume();
    const value = calculateTotalValue();

    // Mock cost calculation
    let baseCost = 10;
    baseCost += weight * 2;
    baseCost += volume * 1000;
    baseCost += value * 0.01;

    if (data.priority === 'high') baseCost *= 1.5;
    if (data.priority === 'urgent') baseCost *= 2;

    return Math.round(baseCost * 100) / 100;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerDetails.name) newErrors.customerName = 'Customer name is required';
    if (!formData.shipmentDetails.type) newErrors.shipmentType = 'Shipment type is required';
    if (!formData.warehouse) newErrors.warehouse = 'Warehouse selection is required';

    formData.items.forEach((item, index) => {
      if (!item.name) newErrors[`item${index}Name`] = 'Item name is required';
      if (!item.weight) newErrors[`item${index}Weight`] = 'Weight is required';
      if (!item.value) newErrors[`item${index}Value`] = 'Value is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const totalWeight = calculateTotalWeight();
      const totalVolume = calculateTotalVolume();
      const totalValue = calculateTotalValue();
      const cost = calculateCost(formData);

      const submitData = {
        ...formData,
        totalWeight,
        totalVolume,
        totalValue,
        calculatedCost: cost,
        items: formData.items.map(item => ({
          ...item,
          value: `$${item.value}`
        }))
      };

      onSubmit(submitData);
    }
  };

  const hasSpecialPackaging = formData.items.some(item => item.specialPackaging);

  // Update calculated cost when form data changes
  useEffect(() => {
    const cost = calculateCost(formData);
    setCalculatedCost(cost);
  }, [formData]);

  const steps = [
    { id: 1, name: 'Customer & Shipment', icon: User },
    { id: 2, name: 'Items & Details', icon: Package },
    { id: 3, name: 'Review & Admin', icon: Calculator }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isCompleted ? 'bg-green-500 text-white' :
                  isActive ? 'bg-red-600 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Customer & Shipment */}
        {currentStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer & Shipment Details</h2>

            {/* Customer Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer ID Search</label>
                <div className="flex">
                  <input
                    type="text"
                    value={customerCode}
                    onChange={(e) => setCustomerCode(e.target.value)}
                    placeholder="Enter customer ID"
                    className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleCustomerCodeSearch}
                    className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={customerSearchTerm}
                    onChange={handleCustomerSearch}
                    placeholder="Search by name or email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {showCustomerResults && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                      {filteredCustomers.map(customer => (
                        <div
                          key={customer.id}
                          onClick={() => handleSelectCustomer(customer)}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Details */}
            {selectedCustomer && (
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Selected Customer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm"><span className="font-medium">ID:</span> {formData.customerDetails.id}</p>
                    <p className="text-sm"><span className="font-medium">Name:</span> {formData.customerDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-medium">Phone:</span> {formData.customerDetails.phone}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {formData.customerDetails.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetCustomerAndShipment}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Change Customer
                </button>
              </div>
            )}

            {/* Address Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <select
                value={selectedAddress || ''}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select address</option>
                <option value="ADDR-001">123 Main St, Anytown, USA</option>
                <option value="ADDR-002">456 Oak Ave, Somewhere, USA</option>
                <option value="ADDR-003">789 Pine Rd, Elsewhere, USA</option>
              </select>
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Shipment Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipment Type</label>
              <select
                value={selectedShipmentType || ''}
                onChange={handleShipmentTypeChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select shipment type</option>
                <option value="standard">Standard Delivery</option>
                <option value="express">Express Delivery</option>
                <option value="overnight">Overnight</option>
                <option value="international">International</option>
              </select>
              {errors.shipmentType && <p className="mt-1 text-sm text-red-600">{errors.shipmentType}</p>}
            </div>

            {/* Warehouse Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse</label>
              <select
                value={formData.warehouse}
                onChange={(e) => setFormData(prev => ({ ...prev, warehouse: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select warehouse</option>
                <option value="Warehouse A">Warehouse A</option>
                <option value="Warehouse B">Warehouse B</option>
                <option value="Warehouse C">Warehouse C</option>
              </select>
              {errors.warehouse && <p className="mt-1 text-sm text-red-600">{errors.warehouse}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Items & Details */}
        {currentStep === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Items & Packaging Details</h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {formData.items.map((item, index) => (
                <div key={item.id || index} className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Item {index + 1}</h3>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      {errors[`item${index}Name`] && <p className="mt-1 text-sm text-red-600">{errors[`item${index}Name`]}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
                        step="0.1"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      {errors[`item${index}Weight`] && <p className="mt-1 text-sm text-red-600">{errors[`item${index}Weight`]}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                        step="0.01"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      {errors[`item${index}Value`] && <p className="mt-1 text-sm text-red-600">{errors[`item${index}Value`]}</p>}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (cm)</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Length"
                        value={item.dimensions.length}
                        onChange={(e) => handleItemChange(index, 'dimensions', { length: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <input
                        type="number"
                        placeholder="Width"
                        value={item.dimensions.width}
                        onChange={(e) => handleItemChange(index, 'dimensions', { width: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <input
                        type="number"
                        placeholder="Height"
                        value={item.dimensions.height}
                        onChange={(e) => handleItemChange(index, 'dimensions', { height: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Special Packaging */}
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.specialPackaging}
                        onChange={(e) => handleItemChange(index, 'specialPackaging', e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Requires special packaging</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Item
            </button>

            {/* Special Instructions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Any special handling instructions..."
              />
            </div>

            {/* Special Packaging Warning */}
            {hasSpecialPackaging && (
              <div className="bg-yellow-50 p-4 rounded-md mb-6">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Special Packaging Required</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      One or more items require special packaging. Additional handling fees may apply.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Review & Admin */}
        {currentStep === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Admin Settings</h2>

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Parcel Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total Weight</p>
                  <p className="text-lg font-semibold">{calculateTotalWeight().toFixed(2)} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total Volume</p>
                  <p className="text-lg font-semibold">{calculateTotalVolume().toFixed(4)} m³</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total Value</p>
                  <p className="text-lg font-semibold">${calculateTotalValue().toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Calculated Cost</p>
                  <p className="text-lg font-semibold">${calculatedCost.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Admin Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Agent</label>
                <input
                  type="text"
                  value={formData.agent}
                  onChange={(e) => setFormData(prev => ({ ...prev, agent: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Agent name"
                />
              </div>
            </div>

            {/* Admin Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
              <textarea
                value={formData.adminNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, adminNotes: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Internal notes for admin reference..."
              />
            </div>

            {/* Payment Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentStatus: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={currentStep === 1 ? onCancel : prevStep}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Update Parcel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditAdminParcel;