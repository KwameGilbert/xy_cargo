import React, { useState, useMemo, useCallback } from 'react';
import { Plus, Minus, AlertTriangle, Search, User, Package, ChevronRight, Check } from 'lucide-react';

// --- MOCK DATA (REPLACE WITH REAL API CALLS) ---
// In a real application, you would fetch this data
const mockCustomersData = {
    customers: [
        { id: 1, name: 'Gilbert Elikplim Kukah', phone: '0541436414', email: 'gilbert@example.com', addresses: [{ id: 101, type: 'Home', street: 'CI-1785-2738', city: 'Gomoa Eshiem' }] },
        { id: 2, name: 'Ama Kweku', phone: '0240000000', email: 'ama@example.com', addresses: [{ id: 102, type: 'Office', street: 'Accra Road', city: 'Accra' }] },
    ],
    shipmentTypes: [
        { code: 'STD', name: 'Standard Ground', rate: 10, origin: { warehouse: 'Warehouse 1 (NY)', address: '123 Main St, New York' } },
        { code: 'EXP', name: 'Express Air', rate: 50, origin: { warehouse: 'Warehouse 2 (LA)', address: '456 Elm St, Los Angeles' } },
    ]
};
// ------------------------------------------------

const initialItem = {
    name: '',
    quantity: 1,
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    value: '',
    special_packaging: false
};

const CreateParcel = ({ onSubmit, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // State for Customer Search/Selection
    const [customerSearchTerm, setCustomerSearchTerm] = useState('');
    const [showCustomerResults, setShowCustomerResults] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [formData, setFormData] = useState({
        // Step 1: Client & Shipment Details
        client_id: '',
        shipment_id: '1', // Mock shipment ID (will be calculated or selected)
        description: '',
        weight: '', // Overall parcel weight (can be calculated)
        dimensions: '', // Overall parcel dimensions (can be summarized)
        declared_value: '', // Overall declared value (can be calculated)
        shipping_cost: '', // Calculated shipping cost
        payment_status: 'unpaid',
        category: '',
        notes: '',
        tags: '',

        // Data needed for Step 1 UI but not directly in the final API payload
        customerDetails: { name: '', phone: '', email: '', address: '' },
        shipmentDetails: {
            type: '',
            code: '',
            origin: { warehouse: '', address: '' }
        },
        specialInstructions: '', // Collected in Step 3

        // Step 2: Items
        items: [initialItem],
    });

    // --- Handlers for Form Data and State ---

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    }, [errors]);

    const handleCustomerDetailChange = useCallback((field, value) => {
        setFormData(prev => ({ 
            ...prev, 
            customerDetails: { ...prev.customerDetails, [field]: value } 
        }));
    }, []);

    const handleItemChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map((item, i) =>
                i === index ? { 
                    ...item, 
                    // Handle nested dimension changes within handleItemChange
                    ...(field.startsWith('dimensions.') ? {} : { [field]: value }),
                    ...(field === 'dimensions.length' ? { dimensions: { ...item.dimensions, length: value } } : {}),
                    ...(field === 'dimensions.width' ? { dimensions: { ...item.dimensions, width: value } } : {}),
                    ...(field === 'dimensions.height' ? { dimensions: { ...item.dimensions, height: value } } : {}),
                } : item
            )
        }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { ...initialItem }]
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

    // --- Handlers for Customer Search ---

    const handleCustomerSearch = (e) => {
        setCustomerSearchTerm(e.target.value);
        setShowCustomerResults(e.target.value.length > 0);
    };

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
        setSelectedAddress(customer.addresses[0] || null);
        setShowCustomerResults(false);
        setCustomerSearchTerm(customer.name);

        setFormData(prev => ({
            ...prev,
            client_id: customer.id,
            customerDetails: {
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.addresses[0]?.street ? `${customer.addresses[0].street}, ${customer.addresses[0].city}` : ''
            }
        }));
    };

    const handleAddressChange = (e) => {
        const addressId = parseInt(e.target.value);
        const address = selectedCustomer.addresses.find(addr => addr.id === addressId);
        setSelectedAddress(address);

        setFormData(prev => ({
            ...prev,
            customerDetails: {
                ...prev.customerDetails,
                address: address ? `${address.street}, ${address.city}` : ''
            }
        }));
    };
    
    // --- Handlers for Shipment Type ---

    const handleShipmentTypeChange = (e) => {
        const selectedCode = e.target.value;
        const type = mockCustomersData.shipmentTypes.find(t => t.code === selectedCode);
        
        // Calculate/update shipping cost based on type or use a complex calculation logic
        const newShippingCost = type ? parseFloat(type.rate).toFixed(2) : '';

        setFormData(prev => ({
            ...prev,
            shipping_cost: newShippingCost,
            shipmentDetails: {
                type: type?.name || '',
                code: type?.code || '',
                origin: type?.origin || { warehouse: '', address: '' }
            }
        }));
    };

    // --- Validation and Step Navigation ---

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.client_id) {
                newErrors.client_id = 'A customer must be selected.';
            }
            if (!formData.customerDetails.address.trim()) {
                newErrors.address = 'A valid address is required.';
            }
            if (!formData.shipmentDetails.code) {
                newErrors.shipmentType = 'Shipment type is required.';
            }
        } else if (step === 2) {
            let hasItemErrors = false;
            formData.items.forEach((item, index) => {
                if (!item.name.trim()) {
                    newErrors[`item_${index}_name`] = 'Name required';
                    hasItemErrors = true;
                }
                if (!item.quantity || parseFloat(item.quantity) <= 0) {
                    newErrors[`item_${index}_quantity`] = 'Valid quantity required';
                    hasItemErrors = true;
                }
                if (!item.weight || parseFloat(item.weight) <= 0) {
                    newErrors[`item_${index}_weight`] = 'Valid weight required';
                    hasItemErrors = true;
                }
                // Check dimensions
                const dims = item.dimensions;
                if (!dims.length || !dims.width || !dims.height) {
                     newErrors[`item_${index}_dimensions`] = 'L/W/H required';
                     hasItemErrors = true;
                }
            });
            // If there are specific item errors, flag the items step generically
            if (hasItemErrors) newErrors.items = 'Please fix errors in the item list.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            // Recalculate totals before moving to review step
            if (currentStep === 2) {
                setFormData(prev => ({
                    ...prev,
                    weight: calculateTotalWeight(),
                    declared_value: calculateTotalValue(),
                    dimensions: calculateTotalVolumeString()
                }));
            }
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    // --- Submission ---

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) { // Validate final data state
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare data for API
            const submitData = {
                client_id: parseInt(formData.client_id),
                shipment_id: parseInt(formData.shipment_id), // Using mock ID
                description: formData.description,
                weight: parseFloat(formData.weight),
                dimensions: formData.dimensions,
                declared_value: parseFloat(formData.declared_value),
                shipping_cost: parseFloat(formData.shipping_cost),
                payment_status: formData.payment_status,
                category: formData.category,
                notes: formData.specialInstructions,
                tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,
                
                items: formData.items.map(item => ({
                    ...item,
                    quantity: parseInt(item.quantity),
                    weight: parseFloat(item.weight),
                    value: item.value ? parseFloat(item.value) : null,
                    // Dimensions need to be flattened if the API expects them this way
                    length: parseFloat(item.dimensions.length) || null,
                    width: parseFloat(item.dimensions.width) || null,
                    height: parseFloat(item.dimensions.height) || null,
                    // API uses 'fragile' or 'special_packaging'
                    fragile: item.special_packaging,
                    special_packaging: item.special_packaging 
                }))
            };

            await onSubmit(submitData);
            
        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({ general: 'An error occurred during creation. Please check console.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Memoized/Calculated Values for Review Step ---

    const filteredCustomers = useMemo(() => {
        if (!customerSearchTerm) return [];
        return mockCustomersData.customers.filter(c => 
            c.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
            c.phone.includes(customerSearchTerm) ||
            c.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
        );
    }, [customerSearchTerm]);
    
    const calculateTotalWeight = () => {
        return formData.items.reduce((total, item) => 
            total + (parseFloat(item.weight) || 0) * (parseInt(item.quantity) || 0), 0).toFixed(2);
    };

    const calculateTotalValue = () => {
        return formData.items.reduce((total, item) => 
            total + (parseFloat(item.value) || 0) * (parseInt(item.quantity) || 0), 0).toFixed(2);
    };
    
    const hasSpecialPackaging = useMemo(() => {
        return formData.items.some(item => item.special_packaging);
    }, [formData.items]);

    const calculateTotalVolumeString = () => {
        // Simple volumetric weight calculation for display (L*W*H * 167 kg/m3)
        // Or simply state 'Mixed'
        return 'Calculated by Server'; 
    }
    
    // --- Step UI Configuration ---
    
    const stepLabels = [
        { id: 1, label: 'Customer & Shipment', icon: User },
        { id: 2, label: 'Items & Dimensions', icon: Package },
        { id: 3, label: 'Review & Submit', icon: Check },
    ];
    
    const StepIndicator = ({ step }) => (
        <div className="flex items-center space-x-2">
            <span className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-colors duration-300
                ${step.id === currentStep ? 'bg-red-600' : 
                  step.id < currentStep ? 'bg-green-600' : 'bg-gray-400'}`}>
                {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
            </span>
            <span className={`text-sm font-medium ${step.id === currentStep ? 'text-red-600' : 'text-gray-500'}`}>
                {step.label}
            </span>
        </div>
    );
    
    // --- Render Component ---

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 bg-gray-100 border-b">
                <h2 className="text-xl font-bold text-gray-900">Create New Parcel</h2>
            </div>
            
            {/* Step Progress Bar */}
            <div className="px-6 py-4 border-b">
                <div className="flex justify-between">
                    {stepLabels.map(step => (
                        <StepIndicator key={step.id} step={step} />
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                {/* General Errors */}
                {errors.general && (
                    <div className="bg-red-50 p-4">
                        <p className="text-sm font-medium text-red-800 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            {errors.general}
                        </p>
                    </div>
                )}
                
                {/* Step 1: Customer & Shipment */}
                {currentStep === 1 && (
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">1. Customer & Recipient</h3>
                        
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
                                        onFocus={() => setShowCustomerResults(customerSearchTerm.length > 0)}
                                        onBlur={() => setTimeout(() => setShowCustomerResults(false), 200)}
                                        placeholder="Start typing to search customers..."
                                        className={`block w-full border rounded-md shadow-sm py-2 pl-10 pr-3 sm:text-sm ${errors.client_id ? 'border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'}`}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    {errors.client_id && <p className="mt-1 text-xs text-red-600">{errors.client_id}</p>}
                                </div>
                                
                                {/* Search Results Dropdown */}
                                {showCustomerResults && filteredCustomers.length > 0 && (
                                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                                        <ul className="py-1">
                                            {filteredCustomers.map(customer => (
                                                <li
                                                    key={customer.id}
                                                    className="px-4 py-2 hover:bg-red-50 cursor-pointer"
                                                    onMouseDown={() => handleSelectCustomer(customer)} // Use onMouseDown to capture click before onBlur fires
                                                >
                                                    <div className="font-medium flex items-center">
                                                        <User className='h-4 w-4 mr-2 text-red-600' />
                                                        {customer.name}
                                                    </div>
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
                                    Customer Name (Selected)
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.customerDetails.name}
                                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm bg-gray-100"
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
                                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm bg-gray-100"
                                    disabled
                                />
                            </div>
                            
                            <div className="sm:col-span-2">
                                {/* Address Selection Dropdown */}
                                {selectedCustomer && selectedCustomer.addresses.length > 1 && (
                                    <div className="mb-4">
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
                                
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows="3"
                                    value={formData.customerDetails.address}
                                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm bg-gray-100 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    disabled
                                ></textarea>
                                {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                            </div>
                        </div>
                        
                        {/* Shipment Type Selection */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">2. Shipping Details</h3>
                            
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="shipmentType" className="block text-sm font-medium text-gray-700">
                                        Shipping Method
                                    </label>
                                    <select
                                        id="shipmentType"
                                        value={formData.shipmentDetails.code}
                                        onChange={handleShipmentTypeChange}
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm ${errors.shipmentType ? 'border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'}`}
                                    >
                                        <option value="">Select a shipment type</option>
                                        {mockCustomersData.shipmentTypes.map(type => (
                                            <option key={type.code} value={type.code}>
                                                {type.name} ({type.code}) - ${type.rate}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.shipmentType && <p className="mt-1 text-xs text-red-600">{errors.shipmentType}</p>}
                                </div>
                                
                                {formData.shipmentDetails.origin.warehouse && (
                                    <div className="bg-white p-3 rounded border border-gray-300">
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
                                Next <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Step 2: Items */}
                {currentStep === 2 && (
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">2. Parcel Items</h3>
                        {errors.items && <p className="mb-4 text-sm text-red-600 flex items-center"><AlertTriangle className='h-4 w-4 mr-1'/> {errors.items}</p>}
                        
                        {formData.items.map((item, index) => (
                            <div key={index} className={`mb-6 p-4 border rounded-md ${errors[`item_${index}_name`] ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
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
                                
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                    <div className='sm:col-span-2'>
                                        <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm ${errors[`item_${index}_name`] ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors[`item_${index}_name`] && <p className="mt-1 text-xs text-red-600">{errors[`item_${index}_name`]}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm ${errors[`item_${index}_quantity`] ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={item.weight}
                                            onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
                                            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm ${errors[`item_${index}_weight`] ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    
                                    <div className="sm:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">Dimensions (cm) - L / W / H</label>
                                        <div className="mt-1 flex space-x-2">
                                            <input
                                                type="number" min="0.1" placeholder="Length"
                                                value={item.dimensions.length}
                                                onChange={(e) => handleItemChange(index, 'dimensions.length', e.target.value)}
                                                className={`block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm ${errors[`item_${index}_dimensions`] ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            <input
                                                type="number" min="0.1" placeholder="Width"
                                                value={item.dimensions.width}
                                                onChange={(e) => handleItemChange(index, 'dimensions.width', e.target.value)}
                                                className={`block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm ${errors[`item_${index}_dimensions`] ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            <input
                                                type="number" min="0.1" placeholder="Height"
                                                value={item.dimensions.height}
                                                onChange={(e) => handleItemChange(index, 'dimensions.height', e.target.value)}
                                                className={`block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm ${errors[`item_${index}_dimensions`] ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Value ($)</label>
                                        <input
                                            type="number" step="0.01" min="0"
                                            value={item.value}
                                            onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                                        />
                                    </div>
                                    
                                    <div className="sm:col-span-2 flex items-end pb-1">
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
                                Next <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Step 3: Review & Submit */}
                {currentStep === 3 && (
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">3. Review & Submit</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column: Customer & Shipping */}
                            <div>
                                <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900 mb-2 border-b pb-2">Customer & Recipient</h4>
                                    <div className="space-y-3 pt-2">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Name</p>
                                            <p className="text-sm text-gray-900">{formData.customerDetails.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Address</p>
                                            <p className="text-sm text-gray-900">{formData.customerDetails.address}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Shipment Type</p>
                                            <p className="text-sm text-gray-900">{formData.shipmentDetails.type} ({formData.shipmentDetails.code})</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Origin Warehouse</p>
                                            <p className="text-sm text-gray-900">{formData.shipmentDetails.origin.warehouse}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900 mb-2 border-b pb-2">Parcel Totals</h4>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Total Weight</p>
                                            <p className="text-lg font-bold text-gray-900">{formData.weight} kg</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Total Value</p>
                                            <p className="text-lg font-bold text-red-600">${formData.declared_value}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Shipping Cost</p>
                                            <p className="text-lg font-bold text-gray-900">${formData.shipping_cost}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Payment Status</p>
                                            <p className={`text-lg font-bold ${formData.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{formData.payment_status.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Column: Items Summary */}
                            <div>
                                <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900 mb-2 border-b pb-2">Items Summary</h4>
                                    <div className="overflow-x-auto pt-2">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Qty</th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Special</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {formData.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-3 py-2 whitespace-nowrap text-gray-900">{item.name}</td>
                                                        <td className="px-3 py-2 whitespace-nowrap text-center text-gray-500">{item.quantity}</td>
                                                        <td className="px-3 py-2 whitespace-nowrap text-gray-500">{item.weight} kg</td>
                                                        <td className="px-3 py-2 whitespace-nowrap text-gray-500">
                                                            {item.special_packaging ? 'Yes' : 'No'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {hasSpecialPackaging && (
                                    <div className="bg-red-50 p-3 rounded-md mb-6 flex items-start border border-red-300">
                                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium text-red-800">Special Handling required for fragile items.</p>
                                    </div>
                                )}
                                
                                <div className="mb-6">
                                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                                        Special Instructions (Notes)
                                    </label>
                                    <textarea
                                        id="specialInstructions"
                                        rows="3"
                                        value={formData.specialInstructions}
                                        onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                    ></textarea>
                                </div>
                            </div>
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
                                disabled={isSubmitting}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Parcel'}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateParcel;