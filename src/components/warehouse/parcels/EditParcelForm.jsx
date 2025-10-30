// EditParcelForm.jsx

import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';
import ShipmentInfo from './ShipmentInfo';

const EditParcelForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        description: '',
        weight: '',
        dimensions: '',
        declared_value: '',
        shipping_cost: '',
        category: '',
        notes: '',
        tags: [],
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
                fragile: false,
                special_packaging: false
            }
        ]
    });

    useEffect(() => {
        if (initialData) {
            // Transform dimensions string "123x53x56cm" to object if needed
            let dimensionsObj = {};
            if (initialData.dimensions && typeof initialData.dimensions === 'string') {
                const [length, width, height] = initialData.dimensions
                    .toLowerCase()
                    .replace('cm', '')
                    .split('x')
                    .map(dim => dim.trim());
                dimensionsObj = { length, width, height };
            }

            setFormData({
                description: initialData.description || '',
                weight: initialData.weight || '',
                dimensions: initialData.dimensions || '',
                declared_value: initialData.declared_value || '',
                shipping_cost: initialData.shipping_cost || '',
                category: initialData.category || '',
                notes: initialData.notes || '',
                tags: initialData.tags || [],
                items: initialData.items?.length > 0 
                    ? initialData.items.map(item => ({
                        name: item.name || '',
                        quantity: item.quantity || 1,
                        weight: item.weight || '',
                        dimensions: item.dimensions || {
                            length: '',
                            width: '',
                            height: ''
                        },
                        value: item.value || '',
                        fragile: item.fragile || false,
                        special_packaging: item.special_packaging || false
                    }))
                    : [{
                        name: '',
                        quantity: 1,
                        weight: '',
                        dimensions: {
                            length: '',
                            width: '',
                            height: ''
                        },
                        value: '',
                        fragile: false,
                        special_packaging: false
                    }]
            });
        }
    }, [initialData]);

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...formData.items];
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            updatedItems[index][parent] = {
                ...updatedItems[index][parent],
                [child]: value
            };
        } else {
            updatedItems[index][field] = value;
        }
        setFormData(prev => ({ ...prev, items: updatedItems }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, {
                name: '',
                quantity: 1,
                weight: '',
                dimensions: {
                    length: '',
                    width: '',
                    height: ''
                },
                value: '',
                fragile: false,
                special_packaging: false
            }]
        }));
    };

    const removeItem = (index) => {
        if (formData.items.length > 1) {
            const updatedItems = formData.items.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, items: updatedItems }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipment Information (Read-only) */}
            {initialData?.shipment && <ShipmentInfo shipment={initialData.shipment} />}
            
            {/* Basic Parcel Information */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                            <input
                                type="text"
                                name="dimensions"
                                value={formData.dimensions}
                                onChange={handleInputChange}
                                placeholder="LxWxH (cm)"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Declared Value ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="declared_value"
                            value={formData.declared_value}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shipping Cost ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="shipping_cost"
                            value={formData.shipping_cost}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>
                </div>
            </div>

            {/* Items */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Items</h3>
                    <button
                        type="button"
                        onClick={addItem}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Item
                    </button>
                </div>

                {formData.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-sm font-medium text-gray-900">Item #{index + 1}</h4>
                            {formData.items.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <MinusIcon className="h-4 w-4 mr-1" />
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.weight}
                                    onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Value ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.value}
                                    onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Length"
                                        value={item.dimensions.length}
                                        onChange={(e) => handleItemChange(index, 'dimensions.length', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Width"
                                        value={item.dimensions.width}
                                        onChange={(e) => handleItemChange(index, 'dimensions.width', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Height"
                                        value={item.dimensions.height}
                                        onChange={(e) => handleItemChange(index, 'dimensions.height', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="flex space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.fragile}
                                            onChange={(e) => handleItemChange(index, 'fragile', e.target.checked)}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-sm text-gray-700">Fragile</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.special_packaging}
                                            onChange={(e) => handleItemChange(index, 'special_packaging', e.target.checked)}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-sm text-gray-700">Special Packaging</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default EditParcelForm;