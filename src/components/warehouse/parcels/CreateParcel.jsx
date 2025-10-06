import React, { useState, useEffect } from 'react';
import { Plus, Minus, AlertTriangle, Search, User, Package } from 'lucide-react';
import mockCustomersData from './mockCustomerData';

const CreateParcel = ({ onSubmit, onCancel }) => {
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
    },
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
        specialPackaging: false
      }
    ],
    specialInstructions: ''
  });

  // Parse customer code and fetch customer + shipment type info
  const handleCustomerCodeSearch = () => {
    if (customerCode.trim() === '') return;
    
    // Parse the customer code (format: CUST-001-STD, CUST-001-EXP, etc.)
    const codeParts = customerCode.split('-');
    if (codeParts.length < 3) {
      // Invalid code format
      resetCustomerAndShipment();
      return;
    }
    
    const customerId = `${codeParts[0]}-${codeParts[1]}`;
    const shipmentCode = codeParts[2];
    
    // Find customer
    const customer = mockCustomersData.getCustomerById(customerId);
    if (!customer) {
      resetCustomerAndShipment();
      return;
    }
    
    // Find shipment type
    const shipmentType = mockCustomersData.getShipmentTypeByCode(shipmentCode);
    if (!shipmentType) {
      resetCustomerAndShipment();
      return;
    }
    
    setSelectedCustomer(customer);
    setSelectedShipmentType(shipmentType);
    
    const defaultAddress = mockCustomersData.getDefaultAddress(customer.id);
    setSelectedAddress(defaultAddress);
    
    setFormData({
      ...formData,
      customerDetails: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: defaultAddress ? mockCustomersData.getFormattedAddress(defaultAddress) : '',
        addressId: defaultAddress ? defaultAddress.id : ''
      },
      shipmentDetails: {
        type: shipmentType.name,
        code: shipmentType.code,
        origin: {
          warehouse: shipmentType.origin.warehouse,
          address: shipmentType.origin.address
        }
      }
    });
  };
  
  const resetCustomerAndShipment = () => {
    setSelectedCustomer(null);
    setSelectedShipmentType(null);
    setSelectedAddress(null);
    setFormData({
      ...formData,
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
    });
  };
  
  // Handle customer name search
  const handleCustomerSearch = (e) => {
    const searchTerm = e.target.value;
    setCustomerSearchTerm(searchTerm);
    
    if (searchTerm.trim() === '') {
      setFilteredCustomers([]);
      setShowCustomerResults(false);
      return;
    }
    
    const filtered = mockCustomersData.customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredCustomers(filtered);
    setShowCustomerResults(true);
  };
  
  // Handle customer selection from search results
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearchTerm(customer.name);
    setShowCustomerResults(false);
    
    const defaultAddress = mockCustomersData.getDefaultAddress(customer.id);
    setSelectedAddress(defaultAddress);
    
    // Set default shipment type if available
    const defaultShipmentType = mockCustomersData.getDefaultShipmentType();
    
    setFormData({
      ...formData,
      customerDetails: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: defaultAddress ? mockCustomersData.getFormattedAddress(defaultAddress) : '',
        addressId: defaultAddress ? defaultAddress.id : ''
      },
      shipmentDetails: defaultShipmentType ? {
        type: defaultShipmentType.name,
        code: defaultShipmentType.code,
        origin: {
          warehouse: defaultShipmentType.origin.warehouse,
          address: defaultShipmentType.origin.address
        }
      } : formData.shipmentDetails
    });
  };
  
  // Handle address selection
  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    if (!selectedCustomer) return;
    
    const address = selectedCustomer.addresses.find(addr => addr.id === addressId);
    if (address) {
      setSelectedAddress(address);
      setFormData({
        ...formData,
        customerDetails: {
          ...formData.customerDetails,
          address: mockCustomersData.getFormattedAddress(address),
          addressId: address.id
        }
      });
    }
  };

  // Handle shipment type selection
  const handleShipmentTypeChange = (e) => {
    const shipmentCode = e.target.value;
    const shipmentType = mockCustomersData.getShipmentTypeByCode(shipmentCode);
    
    if (shipmentType) {
      setSelectedShipmentType(shipmentType);
      setFormData({
        ...formData,
        shipmentDetails: {
          type: shipmentType.name,
          code: shipmentType.code,
          origin: {
            warehouse: shipmentType.origin.warehouse,
            address: shipmentType.origin.address
          }
        }
      });
    }
  };
  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updatedItems[index][parent][child] = value;
    } else {
      updatedItems[index][field] = value;
    }
    
    setFormData({
      ...formData,
      items: updatedItems
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
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
          specialPackaging: false
        }
      ]
    });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const updatedItems = [...formData.items];
      updatedItems.splice(index, 1);
      setFormData({
        ...formData,
        items: updatedItems
      });
    }
  };

  const calculateTotalWeight = () => {
    return formData.items.reduce((total, item) => {
      const weight = parseFloat(item.weight) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (weight * quantity);
    }, 0).toFixed(2);
  };

  const calculateTotalVolume = () => {
    return formData.items.reduce((total, item) => {
      const length = parseFloat(item.dimensions.length) || 0;
      const width = parseFloat(item.dimensions.width) || 0;
      const height = parseFloat(item.dimensions.height) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + ((length * width * height / 1000000) * quantity); // Convert to cubic meters
    }, 0).toFixed(3);
  };

  const calculateTotalValue = () => {
    return formData.items.reduce((total, item) => {
      const value = parseFloat(item.value) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (value * quantity);
    }, 0).toFixed(2);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add calculated totals to the form data
    const finalData = {
      ...formData,
      totalWeight: calculateTotalWeight(),
      totalVolume: calculateTotalVolume(),
      totalValue: calculateTotalValue(),
      // Generate a random parcel ID and tracking number for demo purposes
      id: `PCL-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingNumber: `TRK-${Math.floor(10000 + Math.random() * 90000)}`
    };
    
    onSubmit(finalData);
  };

  const hasSpecialPackaging = formData.items.some(item => item.specialPackaging);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Create New Parcel</h2>
        <p className="mt-1 text-sm text-gray-500">Enter the details for the new parcel</p>
        
        {/* Progress Steps */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">Customer & Shipping</div>
            </div>
            <div className="hidden sm:block w-16 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">Items</div>
            </div>
            <div className="hidden sm:block w-16 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">Review & Submit</div>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Customer & Shipping Details */}
        {currentStep === 1 && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer & Shipping Information</h3>
            
            {/* Customer Code Lookup */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Quick Lookup by Customer Code</h4>
              <div className="flex mb-4">
                <div className="flex-grow mr-2">
                  <label htmlFor="customerCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer-Shipment Code
                  </label>
                  <input
                    type="text"
                    id="customerCode"
                    value={customerCode}
                    onChange={(e) => setCustomerCode(e.target.value)}
                    placeholder="Enter customer-shipment code (e.g., CUST-001-STD)"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Format: CustomerID-ShipmentCode (e.g., CUST-001-STD, CUST-001-EXP)
                  </p>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleCustomerCodeSearch}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Find
                  </button>
                </div>
              </div>
            </div>
            
            {/* Customer Search Section */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Customer Search</h4>
              
              {/* Customer Name/Phone/Email Search */}
              <div className="mb-4 relative">
                <label htmlFor="customerSearch" className="block text-sm font-medium text-gray-700 mb-1">
                  Search by Name, Phone, or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="customerSearch"
                    value={customerSearchTerm}
                    onChange={handleCustomerSearch}
                    placeholder="Start typing to search customers..."
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {/* Search Results Dropdown */}
                {showCustomerResults && filteredCustomers.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                    <ul className="py-1">
                      {filteredCustomers.map(customer => (
                        <li
                          key={customer.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectCustomer(customer)}
                        >
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.phone} | {customer.email}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Customer Details Form */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.customerDetails.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-gray-100"
                  required
                  disabled
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.customerDetails.phone}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-gray-100"
                  required
                  disabled
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.customerDetails.email}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-gray-100"
                  disabled
                />
              </div>
              
              {/* Address Selection Dropdown */}
              {selectedCustomer && selectedCustomer.addresses.length > 0 && (
                <div>
                  <label htmlFor="addressSelect" className="block text-sm font-medium text-gray-700">
                    Select Recipient Address
                  </label>
                  <select
                    id="addressSelect"
                    value={selectedAddress ? selectedAddress.id : ''}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  >
                    {selectedCustomer.addresses.map(address => (
                      <option key={address.id} value={address.id}>
                        {address.type}: {address.street}, {address.city}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.customerDetails.address}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-gray-100"
                  required
                  disabled
                ></textarea>
              </div>
            </div>
            
            {/* Shipment Type Selection */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-md font-medium text-gray-900 mb-2">Shipment Type</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="shipmentType" className="block text-sm font-medium text-gray-700">
                    Shipping Method
                  </label>
                  <select
                    id="shipmentType"
                    value={formData.shipmentDetails.code}
                    onChange={handleShipmentTypeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    required
                  >
                    <option value="">Select a shipment type</option>
                    {mockCustomersData.shipmentTypes.map(type => (
                      <option key={type.code} value={type.code}>
                        {type.name} ({type.code})
                      </option>
                    ))}
                  </select>
                </div>
                
                {formData.shipmentDetails.origin.warehouse && (
                  <div className="bg-white p-3 rounded border">
                    <div className="flex items-center mb-2">
                      <Package className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Origin Warehouse</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">{formData.shipmentDetails.origin.warehouse}</div>
                      <div>{formData.shipmentDetails.origin.address}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Items */}
        {currentStep === 2 && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Parcel Items</h3>
            
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
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                    />
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
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.weight}
                      onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                    />
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
                      required
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
                        onChange={(e) => handleItemChange(index, 'dimensions.length', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        required
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Width"
                        value={item.dimensions.width}
                        onChange={(e) => handleItemChange(index, 'dimensions.width', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        required
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Height"
                        value={item.dimensions.height}
                        onChange={(e) => handleItemChange(index, 'dimensions.height', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <div className="flex items-center">
                      <input
                        id={`special-packaging-${index}`}
                        type="checkbox"
                        checked={item.specialPackaging}
                        onChange={(e) => handleItemChange(index, 'specialPackaging', e.target.checked)}
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
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Review & Submit */}
        {currentStep === 3 && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review & Submit</h3>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Customer Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm text-gray-900">{formData.customerDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{formData.customerDetails.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{formData.customerDetails.email || 'N/A'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-sm text-gray-900">{formData.customerDetails.address}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Shipping Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Shipment Type</p>
                  <p className="text-sm text-gray-900">{formData.shipmentDetails.type} ({formData.shipmentDetails.code})</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Origin Warehouse</p>
                  <p className="text-sm text-gray-900">{formData.shipmentDetails.origin.warehouse}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Origin Address</p>
                  <p className="text-sm text-gray-900">{formData.shipmentDetails.origin.address}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Items Summary</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dimensions
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Special
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {item.weight} kg
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {item.dimensions.length} × {item.dimensions.width} × {item.dimensions.height} cm
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          ${item.value}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {item.specialPackaging ? 'Yes' : 'No'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Parcel Totals</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Weight</p>
                  <p className="text-sm text-gray-900">{calculateTotalWeight()} kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Volume</p>
                  <p className="text-sm text-gray-900">{calculateTotalVolume()} m³</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Value</p>
                  <p className="text-sm text-gray-900">${calculateTotalValue()}</p>
                </div>
              </div>
            </div>
            
            {hasSpecialPackaging && (
              <div className="bg-red-50 p-4 rounded-md mb-6 flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Special Packaging Required</h4>
                  <p className="text-sm text-red-700 mt-1">
                    One or more items require special packaging. These items will be handled with extra care.
                  </p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions (Optional)
              </label>
              <textarea
                id="specialInstructions"
                rows="3"
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Previous
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Create Parcel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateParcel;