import React, { useState } from 'react';
import { Plus, Minus, AlertTriangle, Search, User, Package } from 'lucide-react';
import mockCustomersData from '../../warehouse/parcels/mockCustomerData'; // Assume this exists or create it

const CreateAdminParcel = ({ onSubmit, onPreview, onCancel, isBulk }) => {
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
    specialInstructions: '',
    // Admin-specific fields
    warehouse: '',
    agent: '',
    priority: 'normal',
    adminNotes: '',
    attachments: [],
    paymentStatus: 'Pending'
  });

  const [errors, setErrors] = useState({});
  const [calculatedCost, setCalculatedCost] = useState(0);

  // Handle customer code search (same as provided)
  const handleCustomerCodeSearch = () => {
    if (customerCode.trim() === '') return;
    const codeParts = customerCode.split('-');
    if (codeParts.length < 3) {
      resetCustomerAndShipment();
      return;
    }
    const customerId = `${codeParts[0]}-${codeParts[1]}`;
    const shipmentCode = codeParts[2];
    const customer = mockCustomersData.getCustomerById(customerId);
    if (!customer) {
      resetCustomerAndShipment();
      return;
    }
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

  // Handle customer search (same as provided)
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

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearchTerm(customer.name);
    setShowCustomerResults(false);
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
      shipmentDetails: mockCustomersData.getDefaultShipmentType() ? {
        type: mockCustomersData.getDefaultShipmentType().name,
        code: mockCustomersData.getDefaultShipmentType().code,
        origin: {
          warehouse: mockCustomersData.getDefaultShipmentType().origin.warehouse,
          address: mockCustomersData.getDefaultShipmentType().origin.address
        }
      } : formData.shipmentDetails
    });
  };

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
    setFormData({ ...formData, items: updatedItems });
    calculateCost({ ...formData, items: updatedItems });
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
          dimensions: { length: '', width: '', height: '' },
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
      setFormData({ ...formData, items: updatedItems });
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
      return total + ((length * width * height / 1000000) * quantity);
    }, 0).toFixed(3);
  };

  const calculateTotalValue = () => {
    return formData.items.reduce((total, item) => {
      const value = parseFloat(item.value) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (value * quantity);
    }, 0).toFixed(2);
  };

  const calculateCost = (data) => {
    const baseCost = 10;
    const weightCost = parseFloat(calculateTotalWeight()) * 2;
    const priorityCost = data.priority === 'urgent' ? 20 : data.priority === 'high' ? 10 : 0;
    setCalculatedCost(baseCost + weightCost + priorityCost);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerDetails.name) newErrors.customerName = 'Required';
    if (parseFloat(calculateTotalWeight()) > 50) newErrors.weight = 'Total weight exceeds limit';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const finalData = {
        ...formData,
        totalWeight: calculateTotalWeight(),
        totalVolume: calculateTotalVolume(),
        totalValue: calculateTotalValue(),
        id: `PCL-${Math.floor(1000 + Math.random() * 9000)}`,
        trackingNumber: `TRK-${Math.floor(10000 + Math.random() * 90000)}`
      };
      onPreview(finalData);
    }
  };

  const hasSpecialPackaging = formData.items.some(item => item.specialPackaging);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Create New Parcel (Admin)</h2>
        <p className="mt-1 text-sm text-gray-500">Enter the details for the new parcel with admin oversight.</p>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <div className="ml-2 text-sm font-medium text-gray-900">Customer & Shipping</div>
            </div>
            <div className="hidden sm:block w-16 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
              <div className="ml-2 text-sm font-medium text-gray-900">Items</div>
            </div>
            <div className="hidden sm:block w-16 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
              <div className="ml-2 text-sm font-medium text-gray-900">Review & Submit</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Customer & Shipping */}
        {currentStep === 1 && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer & Shipping Information</h3>
            {/* Customer Code Lookup */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Quick Lookup by Customer Code</h4>
              <div className="flex mb-4">
                <input type="text" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} placeholder="Enter customer-shipment code" className="flex-grow mr-2 border p-2 rounded" />
                <button type="button" onClick={handleCustomerCodeSearch} className="px-4 py-2 bg-red-600 text-white rounded">Find</button>
              </div>
            </div>
            {/* Customer Search */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Customer Search</h4>
              <div className="relative">
                <input type="text" value={customerSearchTerm} onChange={handleCustomerSearch} placeholder="Search customers..." className="w-full border p-2 pl-10 rounded" />
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                {showCustomerResults && filteredCustomers.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border max-h-60 overflow-auto">
                    {filteredCustomers.map(customer => (
                      <div key={customer.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectCustomer(customer)}>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.phone} | {customer.email}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Customer Details */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
              <input type="text" value={formData.customerDetails.name} disabled className="border p-2 rounded bg-gray-100" placeholder="Customer Name" />
              <input type="tel" value={formData.customerDetails.phone} disabled className="border p-2 rounded bg-gray-100" placeholder="Phone" />
              <input type="email" value={formData.customerDetails.email} disabled className="border p-2 rounded bg-gray-100" placeholder="Email" />
              {selectedCustomer && selectedCustomer.addresses.length > 0 && (
                <select value={selectedAddress ? selectedAddress.id : ''} onChange={handleAddressChange} className="border p-2 rounded">
                  {selectedCustomer.addresses.map(address => (
                    <option key={address.id} value={address.id}>{address.type}: {address.street}, {address.city}</option>
                  ))}
                </select>
              )}
              <textarea value={formData.customerDetails.address} disabled className="sm:col-span-2 border p-2 rounded bg-gray-100" rows="3" placeholder="Address" />
            </div>
            {/* Shipment Type */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">Shipment Type</h4>
              <select value={formData.shipmentDetails.code} onChange={handleShipmentTypeChange} className="w-full border p-2 rounded mb-4">
                <option value="">Select shipment type</option>
                {mockCustomersData.shipmentTypes.map(type => (
                  <option key={type.code} value={type.code}>{type.name} ({type.code})</option>
                ))}
              </select>
              {formData.shipmentDetails.origin.warehouse && (
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center mb-2">
                    <Package className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm font-medium">Origin Warehouse</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{formData.shipmentDetails.origin.warehouse}</div>
                    <div>{formData.shipmentDetails.origin.address}</div>
                  </div>
                </div>
              )}
            </div>
            {/* Admin Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
              <select value={formData.warehouse} onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })} className="border p-2 rounded">
                <option value="">Select Warehouse</option>
                <option value="Warehouse A">Warehouse A</option>
                <option value="Warehouse B">Warehouse B</option>
                <option value="Warehouse C">Warehouse C</option>
              </select>
              <select value={formData.agent} onChange={(e) => setFormData({ ...formData, agent: e.target.value })} className="border p-2 rounded">
                <option value="">Assign Agent</option>
                <option value="Agent 1">Agent 1</option>
                <option value="Agent 2">Agent 2</option>
                <option value="Agent 3">Agent 3</option>
              </select>
              <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="border p-2 rounded">
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <select value={formData.paymentStatus} onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })} className="border p-2 rounded">
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onCancel} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="button" onClick={nextStep} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">Next</button>
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
                  <h4 className="text-md font-medium">Item {index + 1}</h4>
                  {formData.items.length > 1 && (
                    <button type="button" onClick={() => removeItem(index)} className="text-red-600 hover:text-red-800">
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input type="text" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} placeholder="Item Name" className="border p-2 rounded" required />
                  <input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} placeholder="Quantity" className="border p-2 rounded" required />
                  <input type="number" step="0.01" min="0" value={item.weight} onChange={(e) => handleItemChange(index, 'weight', e.target.value)} placeholder="Weight (kg)" className="border p-2 rounded" required />
                  <input type="number" step="0.01" min="0" value={item.value} onChange={(e) => handleItemChange(index, 'value', e.target.value)} placeholder="Value ($)" className="border p-2 rounded" required />
                  <div className="sm:col-span-2 flex space-x-2">
                    <input type="number" min="0" placeholder="Length (cm)" value={item.dimensions.length} onChange={(e) => handleItemChange(index, 'dimensions.length', e.target.value)} className="border p-2 rounded flex-1" required />
                    <input type="number" min="0" placeholder="Width (cm)" value={item.dimensions.width} onChange={(e) => handleItemChange(index, 'dimensions.width', e.target.value)} className="border p-2 rounded flex-1" required />
                    <input type="number" min="0" placeholder="Height (cm)" value={item.dimensions.height} onChange={(e) => handleItemChange(index, 'dimensions.height', e.target.value)} className="border p-2 rounded flex-1" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={item.specialPackaging} onChange={(e) => handleItemChange(index, 'specialPackaging', e.target.checked)} className="mr-2" />
                      Requires Special Packaging
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addItem} className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Item
            </button>
            <div className="mt-6 flex justify-between">
              <button type="button" onClick={prevStep} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
              <button type="button" onClick={nextStep} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {currentStep === 3 && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review & Submit</h3>
            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium mb-2">Customer Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><p className="text-sm font-medium text-gray-500">Name</p><p>{formData.customerDetails.name}</p></div>
                <div><p className="text-sm font-medium text-gray-500">Phone</p><p>{formData.customerDetails.phone}</p></div>
                <div><p className="text-sm font-medium text-gray-500">Email</p><p>{formData.customerDetails.email || 'N/A'}</p></div>
                <div className="sm:col-span-2"><p className="text-sm font-medium text-gray-500">Address</p><p>{formData.customerDetails.address}</p></div>
              </div>
            </div>
            {/* Shipping Info */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium mb-2">Shipping Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><p className="text-sm font-medium text-gray-500">Shipment Type</p><p>{formData.shipmentDetails.type}</p></div>
                <div><p className="text-sm font-medium text-gray-500">Warehouse</p><p>{formData.warehouse}</p></div>
                <div><p className="text-sm font-medium text-gray-500">Agent</p><p>{formData.agent}</p></div>
                <div><p className="text-sm font-medium text-gray-500">Priority</p><p>{formData.priority}</p></div>
              </div>
            </div>
            {/* Items Summary */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium mb-2">Items Summary</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm">{item.name}</td>
                      <td className="px-4 py-2 text-sm">{item.quantity}</td>
                      <td className="px-4 py-2 text-sm">{item.weight} kg</td>
                      <td className="px-4 py-2 text-sm">${item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Totals */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium mb-2">Parcel Totals</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><p className="text-sm font-medium text-gray-500">Total Weight</p><p>{calculateTotalWeight()} kg</p></div>
                <div><p className="text-sm font-medium text-gray-500">Total Volume</p><p>{calculateTotalVolume()} m³</p></div>
                <div><p className="text-sm font-medium text-gray-500">Total Value</p><p>${calculateTotalValue()}</p></div>
              </div>
              <div className="mt-4"><p className="text-sm font-medium text-gray-500">Estimated Cost</p><p>${calculatedCost.toFixed(2)}</p></div>
            </div>
            {hasSpecialPackaging && (
              <div className="bg-red-50 p-4 rounded-md mb-6 flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <div><h4 className="text-sm font-medium text-red-800">Special Packaging Required</h4><p className="text-sm text-red-700">Items will be handled with extra care.</p></div>
              </div>
            )}
            <textarea value={formData.specialInstructions} onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })} placeholder="Special Instructions" className="w-full border p-2 rounded mb-4" rows="3" />
            <textarea value={formData.adminNotes} onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })} placeholder="Admin Notes" className="w-full border p-2 rounded mb-4" rows="3" />
            <input type="file" multiple onChange={(e) => setFormData({ ...formData, attachments: Array.from(e.target.files) })} className="w-full border p-2 rounded mb-4" />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">Preview & Create</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateAdminParcel;