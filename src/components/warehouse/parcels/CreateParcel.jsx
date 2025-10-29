import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState, useEffect } from 'react';

import { Plus, Minus } from 'lucide-react';

import { Plus, Minus, AlertTriangle } from 'lucide-react';import { Plus, Minus, AlertTriangle, Search, User, Package } from 'lucide-react';

const CreateParcel = ({ onSubmit, onCancel }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

const CreateParcel = ({ onSubmit, onCancel }) => {const CreateParcel = ({ onSubmit, onCancel }) => {

  const [formData, setFormData] = useState({

    client_id: '',  const [isSubmitting, setIsSubmitting] = useState(false);  const [isSubmitting, setIsSubmitting] = useState(false);

    shipment_id: '',

    description: '',  const [errors, setErrors] = useState({});  const [errors, setErrors] = useState({});

    weight: '',

    dimensions: '',

    declared_value: '',

    shipping_cost: '',  const [formData, setFormData] = useState({  const [formData, setFormData] = useState({

    payment_status: 'unpaid',

    category: '',    client_id: '',    client_id: '',

    notes: '',

    tags: '',    shipment_id: '',    shipment_id: '',

    items: [

      {    description: '',    description: '',

        name: '',

        quantity: 1,    weight: '',    weight: '',

        weight: '',

        dimensions: {    dimensions: '',    dimensions: '',

          length: '',

          width: '',    declared_value: '',    declared_value: '',

          height: ''

        },    shipping_cost: '',    shipping_cost: '',

        value: '',

        special_packaging: false    payment_status: 'unpaid',    payment_status: 'unpaid',

      }

    ]    category: '',    category: '',

  });

    notes: '',    notes: '',

  const handleInputChange = (field, value) => {

    setFormData(prev => ({    tags: '',    tags: '',

      ...prev,

      [field]: value    items: [    items: [

    }));

    // Clear error when user starts typing      {      {

    if (errors[field]) {

      setErrors(prev => ({        name: '',        name: '',

        ...prev,

        [field]: null        quantity: 1,        quantity: 1,

      }));

    }        weight: '',        weight: '',

  };

        dimensions: {        dimensions: {

  const handleItemChange = (index, field, value) => {

    setFormData(prev => ({          length: '',          length: '',

      ...prev,

      items: prev.items.map((item, i) =>          width: '',          width: '',

        i === index ? { ...item, [field]: value } : item

      )          height: ''          height: ''

    }));

  };        },        },



  const handleDimensionChange = (index, dimension, value) => {        value: '',        value: '',

    setFormData(prev => ({

      ...prev,        special_packaging: false        special_packaging: false

      items: prev.items.map((item, i) =>

        i === index ? {      }      }

          ...item,

          dimensions: { ...item.dimensions, [dimension]: value }    ]    ]

        } : item

      )  });  });

    }));

  };



  const addItem = () => {  const handleInputChange = (field, value) => {  const handleInputChange = (field, value) => {

    setFormData(prev => ({

      ...prev,    setFormData(prev => ({    setFormData(prev => ({

      items: [...prev.items, {

        name: '',      ...prev,      ...prev,

        quantity: 1,

        weight: '',      [field]: value      [field]: value

        dimensions: { length: '', width: '', height: '' },

        value: '',    }));    }));

        special_packaging: false

      }]    // Clear error when user starts typing    // Clear error when user starts typing

    }));

  };    if (errors[field]) {    if (errors[field]) {



  const removeItem = (index) => {      setErrors(prev => ({      setErrors(prev => ({

    if (formData.items.length > 1) {

      setFormData(prev => ({        ...prev,        ...prev,

        ...prev,

        items: prev.items.filter((_, i) => i !== index)        [field]: null        [field]: null

      }));

    }      }));      }));

  };

    }    }

  const validateForm = () => {

    const newErrors = {};  };  };



    if (!formData.client_id.trim()) {

      newErrors.client_id = 'Client ID is required';

    }  const handleItemChange = (index, field, value) => {  const handleItemChange = (index, field, value) => {

    if (!formData.shipment_id.trim()) {

      newErrors.shipment_id = 'Shipment ID is required';    setFormData(prev => ({    setFormData(prev => ({

    }

      ...prev,      ...prev,

    // Validate items

    formData.items.forEach((item, index) => {      items: prev.items.map((item, i) =>      items: prev.items.map((item, i) =>

      if (!item.name.trim()) {

        newErrors[`item_${index}_name`] = 'Item name is required';        i === index ? { ...item, [field]: value } : item        i === index ? { ...item, [field]: value } : item

      }

      if (!item.weight || item.weight <= 0) {      )      )

        newErrors[`item_${index}_weight`] = 'Valid weight is required';

      }    }));    }));

    });

  };  };

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleDimensionChange = (index, dimension, value) => {  const handleDimensionChange = (index, dimension, value) => {

  const handleSubmit = async (e) => {

    e.preventDefault();    setFormData(prev => ({    setFormData(prev => ({



    if (!validateForm()) {      ...prev,      ...prev,

      return;

    }      items: prev.items.map((item, i) =>      items: prev.items.map((item, i) =>



    setIsSubmitting(true);        i === index ? {        i === index ? {



    try {          ...item,          ...item,

      // Prepare data for API

      const submitData = {          dimensions: { ...item.dimensions, [dimension]: value }          dimensions: { ...item.dimensions, [dimension]: value }

        ...formData,

        client_id: parseInt(formData.client_id),        } : item        } : item

        shipment_id: parseInt(formData.shipment_id),

        weight: formData.weight ? parseFloat(formData.weight) : null,      )      )

        declared_value: formData.declared_value ? parseFloat(formData.declared_value) : null,

        shipping_cost: formData.shipping_cost ? parseFloat(formData.shipping_cost) : null,    }));    }));

        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,

        items: formData.items.map(item => ({  };  };

          ...item,

          quantity: parseInt(item.quantity),

          weight: parseFloat(item.weight),

          value: item.value ? parseFloat(item.value) : null,  const addItem = () => {  const addItem = () => {

          height: item.dimensions.height ? parseFloat(item.dimensions.height) : null,

          width: item.dimensions.width ? parseFloat(item.dimensions.width) : null,    setFormData(prev => ({    setFormData(prev => ({

          length: item.dimensions.length ? parseFloat(item.dimensions.length) : null,

          fragile: item.special_packaging,      ...prev,      ...prev,

          special_packaging: item.special_packaging

        }))      items: [...prev.items, {      items: [...prev.items, {

      };

        name: '',        name: '',

      await onSubmit(submitData);

    } catch (error) {        quantity: 1,        quantity: 1,

      console.error('Form submission error:', error);

    } finally {        weight: '',        weight: '',

      setIsSubmitting(false);

    }        dimensions: { length: '', width: '', height: '' },        dimensions: { length: '', width: '', height: '' },

  };

        value: '',        value: '',

  return (

    <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">        special_packaging: false        special_packaging: false

      <div className="p-6 border-b border-gray-200">

        <h2 className="text-2xl font-bold text-gray-900">Create New Parcel</h2>      }]      }]

        <p className="mt-1 text-sm text-gray-500">Enter the details for the new parcel</p>

      </div>    }));    }));



      <form onSubmit={handleSubmit} className="p-6">  };  };

        {/* Basic Information */}

        <div className="mb-8">

          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">  const removeItem = (index) => {  const removeItem = (index) => {

            <div>

              <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">    if (formData.items.length > 1) {    if (formData.items.length > 1) {

                Client ID *

              </label>      setFormData(prev => ({      setFormData(prev => ({

              <input

                type="number"        ...prev,        ...prev,

                id="client_id"

                value={formData.client_id}        items: prev.items.filter((_, i) => i !== index)        items: prev.items.filter((_, i) => i !== index)

                onChange={(e) => handleInputChange('client_id', e.target.value)}

                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${      }));      }));

                  errors.client_id ? 'border-red-300' : 'border-gray-300'

                }`}    }    }

                required

              />  };  };

              {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}

            </div>



            <div>  const validateForm = () => {  const validateForm = () => {

              <label htmlFor="shipment_id" className="block text-sm font-medium text-gray-700">

                Shipment ID *    const newErrors = {};    const newErrors = {};

              </label>

              <input

                type="number"

                id="shipment_id"    if (!formData.client_id.trim()) {    if (!formData.client_id.trim()) {

                value={formData.shipment_id}

                onChange={(e) => handleInputChange('shipment_id', e.target.value)}      newErrors.client_id = 'Client ID is required';      newErrors.client_id = 'Client ID is required';

                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${

                  errors.shipment_id ? 'border-red-300' : 'border-gray-300'    }    }

                }`}

                required    if (!formData.shipment_id.trim()) {    if (!formData.shipment_id.trim()) {

              />

              {errors.shipment_id && <p className="mt-1 text-sm text-red-600">{errors.shipment_id}</p>}      newErrors.shipment_id = 'Shipment ID is required';      newErrors.shipment_id = 'Shipment ID is required';

            </div>

    }    }

            <div className="sm:col-span-2">

              <label htmlFor="description" className="block text-sm font-medium text-gray-700">

                Description

              </label>    // Validate items    // Validate items

              <input

                type="text"    formData.items.forEach((item, index) => {    formData.items.forEach((item, index) => {

                id="description"

                value={formData.description}      if (!item.name.trim()) {      if (!item.name.trim()) {

                onChange={(e) => handleInputChange('description', e.target.value)}

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"        newErrors[`item_${index}_name`] = 'Item name is required';        newErrors[`item_${index}_name`] = 'Item name is required';

              />

            </div>      }      }



            <div>      if (!item.weight || item.weight <= 0) {      if (!item.weight || item.weight <= 0) {

              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">

                Total Weight (kg)        newErrors[`item_${index}_weight`] = 'Valid weight is required';        newErrors[`item_${index}_weight`] = 'Valid weight is required';

              </label>

              <input      }      }

                type="number"

                step="0.01"    });    });

                min="0"

                id="weight"

                value={formData.weight}

                onChange={(e) => handleInputChange('weight', e.target.value)}    setErrors(newErrors);    setErrors(newErrors);

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

              />    return Object.keys(newErrors).length === 0;    return Object.keys(newErrors).length === 0;

            </div>

  };  };

            <div>

              <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">

                Dimensions

              </label>  const handleSubmit = async (e) => {  const handleSubmit = async (e) => {

              <input

                type="text"    e.preventDefault();    e.preventDefault();

                id="dimensions"

                value={formData.dimensions}

                onChange={(e) => handleInputChange('dimensions', e.target.value)}

                placeholder="e.g., 30x20x10 cm"    if (!validateForm()) {    if (!validateForm()) {

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

              />      return;      return;

            </div>

    }    }

            <div>

              <label htmlFor="declared_value" className="block text-sm font-medium text-gray-700">

                Declared Value ($)

              </label>    setIsSubmitting(true);    setIsSubmitting(true);

              <input

                type="number"

                step="0.01"

                min="0"    try {    try {

                id="declared_value"

                value={formData.declared_value}      // Prepare data for API      // Prepare data for API

                onChange={(e) => handleInputChange('declared_value', e.target.value)}

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"      const submitData = {      const submitData = {

              />

            </div>        ...formData,        ...formData,



            <div>        client_id: parseInt(formData.client_id),        client_id: parseInt(formData.client_id),

              <label htmlFor="shipping_cost" className="block text-sm font-medium text-gray-700">

                Shipping Cost ($)        shipment_id: parseInt(formData.shipment_id),        shipment_id: parseInt(formData.shipment_id),

              </label>

              <input        weight: formData.weight ? parseFloat(formData.weight) : null,        weight: formData.weight ? parseFloat(formData.weight) : null,

                type="number"

                step="0.01"        declared_value: formData.declared_value ? parseFloat(formData.declared_value) : null,        declared_value: formData.declared_value ? parseFloat(formData.declared_value) : null,

                min="0"

                id="shipping_cost"        shipping_cost: formData.shipping_cost ? parseFloat(formData.shipping_cost) : null,        shipping_cost: formData.shipping_cost ? parseFloat(formData.shipping_cost) : null,

                value={formData.shipping_cost}

                onChange={(e) => handleInputChange('shipping_cost', e.target.value)}        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

              />        items: formData.items.map(item => ({        items: formData.items.map(item => ({

            </div>

          ...item,          ...item,

            <div>

              <label htmlFor="payment_status" className="block text-sm font-medium text-gray-700">          quantity: parseInt(item.quantity),          quantity: parseInt(item.quantity),

                Payment Status

              </label>          weight: parseFloat(item.weight),          weight: parseFloat(item.weight),

              <select

                id="payment_status"          value: item.value ? parseFloat(item.value) : null,          value: item.value ? parseFloat(item.value) : null,

                value={formData.payment_status}

                onChange={(e) => handleInputChange('payment_status', e.target.value)}          height: item.dimensions.height ? parseFloat(item.dimensions.height) : null,          height: item.dimensions.height ? parseFloat(item.dimensions.height) : null,

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

              >          width: item.dimensions.width ? parseFloat(item.dimensions.width) : null,          width: item.dimensions.width ? parseFloat(item.dimensions.width) : null,

                <option value="unpaid">Unpaid</option>

                <option value="paid">Paid</option>          length: item.dimensions.length ? parseFloat(item.dimensions.length) : null,          length: item.dimensions.length ? parseFloat(item.dimensions.length) : null,

                <option value="pending">Pending</option>

              </select>          fragile: item.special_packaging,          fragile: item.special_packaging,

            </div>

          special_packaging: item.special_packaging          special_packaging: item.special_packaging

            <div>

              <label htmlFor="category" className="block text-sm font-medium text-gray-700">        }))        }))

                Category

              </label>      };      };

              <input

                type="text"

                id="category"

                value={formData.category}      await onSubmit(submitData);      await onSubmit(submitData);

                onChange={(e) => handleInputChange('category', e.target.value)}

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"    } catch (error) {    } catch (error) {

              />

            </div>      console.error('Form submission error:', error);      console.error('Form submission error:', error);



            <div className="sm:col-span-2">    } finally {    } finally {

              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">

                Tags (comma-separated)      setIsSubmitting(false);      setIsSubmitting(false);

              </label>

              <input    }    }

                type="text"

                id="tags"  };  };

                value={formData.tags}

                onChange={(e) => handleInputChange('tags', e.target.value)}    if (customerCode.trim() === '') return;

                placeholder="fragile, electronics, documents"

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"  return (    

              />

            </div>    <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">    // Parse the customer code (format: CUST-001-STD, CUST-001-EXP, etc.)



            <div className="sm:col-span-2">      <div className="p-6 border-b border-gray-200">    const codeParts = customerCode.split('-');

              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">

                Notes        <h2 className="text-2xl font-bold text-gray-900">Create New Parcel</h2>    if (codeParts.length < 3) {

              </label>

              <textarea        <p className="mt-1 text-sm text-gray-500">Enter the details for the new parcel</p>      // Invalid code format

                id="notes"

                rows="3"      </div>      resetCustomerAndShipment();

                value={formData.notes}

                onChange={(e) => handleInputChange('notes', e.target.value)}      return;

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

              />      <form onSubmit={handleSubmit} className="p-6">    }

            </div>

          </div>        {/* Basic Information */}    

        </div>

        <div className="mb-8">    const customerId = `${codeParts[0]}-${codeParts[1]}`;

        {/* Items */}

        <div className="mb-8">          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>    const shipmentCode = codeParts[2];

          <h3 className="text-lg font-medium text-gray-900 mb-4">Items</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">    

          {formData.items.map((item, index) => (

            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">            <div>    // Find customer

              <div className="flex justify-between items-center mb-4">

                <h4 className="text-md font-medium text-gray-900">Item {index + 1}</h4>              <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">    const customer = mockCustomersData.getCustomerById(customerId);

                {formData.items.length > 1 && (

                  <button                Client ID *    if (!customer) {

                    type="button"

                    onClick={() => removeItem(index)}              </label>      resetCustomerAndShipment();

                    className="text-red-600 hover:text-red-800"

                  >              <input      return;

                    <Minus className="h-5 w-5" />

                  </button>                type="number"    }

                )}

              </div>                id="client_id"    



              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">                value={formData.client_id}    // Find shipment type

                <div>

                  <label className="block text-sm font-medium text-gray-700">                onChange={(e) => handleInputChange('client_id', e.target.value)}    const shipmentType = mockCustomersData.getShipmentTypeByCode(shipmentCode);

                    Item Name *

                  </label>                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${    if (!shipmentType) {

                  <input

                    type="text"                  errors.client_id ? 'border-red-300' : 'border-gray-300'      resetCustomerAndShipment();

                    value={item.name}

                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}                }`}      return;

                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${

                      errors[`item_${index}_name`] ? 'border-red-300' : 'border-gray-300'                required    }

                    }`}

                    required              />    

                  />

                  {errors[`item_${index}_name`] && <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_name`]}</p>}              {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}    setSelectedCustomer(customer);

                </div>

            </div>    setSelectedShipmentType(shipmentType);

                <div>

                  <label className="block text-sm font-medium text-gray-700">    

                    Quantity

                  </label>            <div>    const defaultAddress = mockCustomersData.getDefaultAddress(customer.id);

                  <input

                    type="number"              <label htmlFor="shipment_id" className="block text-sm font-medium text-gray-700">    setSelectedAddress(defaultAddress);

                    min="1"

                    value={item.quantity}                Shipment ID *    

                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}

                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"              </label>    setFormData({

                  />

                </div>              <input      ...formData,



                <div>                type="number"      customerDetails: {

                  <label className="block text-sm font-medium text-gray-700">

                    Weight (kg) *                id="shipment_id"        id: customer.id,

                  </label>

                  <input                value={formData.shipment_id}        name: customer.name,

                    type="number"

                    step="0.01"                onChange={(e) => handleInputChange('shipment_id', e.target.value)}        phone: customer.phone,

                    min="0"

                    value={item.weight}                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${        email: customer.email,

                    onChange={(e) => handleItemChange(index, 'weight', e.target.value)}

                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${                  errors.shipment_id ? 'border-red-300' : 'border-gray-300'        address: defaultAddress ? mockCustomersData.getFormattedAddress(defaultAddress) : '',

                      errors[`item_${index}_weight`] ? 'border-red-300' : 'border-gray-300'

                    }`}                }`}        addressId: defaultAddress ? defaultAddress.id : ''

                    required

                  />                required      },

                  {errors[`item_${index}_weight`] && <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_weight`]}</p>}

                </div>              />      shipmentDetails: {



                <div>              {errors.shipment_id && <p className="mt-1 text-sm text-red-600">{errors.shipment_id}</p>}        type: shipmentType.name,

                  <label className="block text-sm font-medium text-gray-700">

                    Value ($)            </div>        code: shipmentType.code,

                  </label>

                  <input        origin: {

                    type="number"

                    step="0.01"            <div className="sm:col-span-2">          warehouse: shipmentType.origin.warehouse,

                    min="0"

                    value={item.value}              <label htmlFor="description" className="block text-sm font-medium text-gray-700">          address: shipmentType.origin.address

                    onChange={(e) => handleItemChange(index, 'value', e.target.value)}

                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"                Description        }

                  />

                </div>              </label>      }



                <div className="sm:col-span-2">              <input    });

                  <label className="block text-sm font-medium text-gray-700">

                    Dimensions (cm)                type="text"  };

                  </label>

                  <div className="mt-1 flex space-x-2">                id="description"  

                    <input

                      type="number"                value={formData.description}  const resetCustomerAndShipment = () => {

                      min="0"

                      placeholder="Length"                onChange={(e) => handleInputChange('description', e.target.value)}    setSelectedCustomer(null);

                      value={item.dimensions.length}

                      onChange={(e) => handleDimensionChange(index, 'length', e.target.value)}                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"    setSelectedShipmentType(null);

                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

                    />              />    setSelectedAddress(null);

                    <input

                      type="number"            </div>    setFormData({

                      min="0"

                      placeholder="Width"      ...formData,

                      value={item.dimensions.width}

                      onChange={(e) => handleDimensionChange(index, 'width', e.target.value)}            <div>      customerDetails: {

                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

                    />              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">        id: '',

                    <input

                      type="number"                Total Weight (kg)        name: '',

                      min="0"

                      placeholder="Height"              </label>        phone: '',

                      value={item.dimensions.height}

                      onChange={(e) => handleDimensionChange(index, 'height', e.target.value)}              <input        email: '',

                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

                    />                type="number"        address: '',

                  </div>

                </div>                step="0.01"        addressId: ''



                <div className="sm:col-span-2">                min="0"      },

                  <div className="flex items-center">

                    <input                id="weight"      shipmentDetails: {

                      id={`special-packaging-${index}`}

                      type="checkbox"                value={formData.weight}        type: '',

                      checked={item.special_packaging}

                      onChange={(e) => handleItemChange(index, 'special_packaging', e.target.checked)}                onChange={(e) => handleInputChange('weight', e.target.value)}        code: '',

                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"

                    />                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"        origin: {

                    <label htmlFor={`special-packaging-${index}`} className="ml-2 block text-sm text-gray-900">

                      Requires Special Packaging              />          warehouse: '',

                    </label>

                  </div>            </div>          address: ''

                </div>

              </div>        }

            </div>

          ))}            <div>      }



          <button              <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">    });

            type="button"

            onClick={addItem}                Dimensions  };

            className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

          >              </label>  

            <Plus className="h-4 w-4 mr-2" />

            Add Another Item              <input  // Handle customer name search

          </button>

        </div>                type="text"  const handleCustomerSearch = (e) => {



        {/* Submit Buttons */}                id="dimensions"    const searchTerm = e.target.value;

        <div className="flex justify-end space-x-3">

          <button                value={formData.dimensions}    setCustomerSearchTerm(searchTerm);

            type="button"

            onClick={onCancel}                onChange={(e) => handleInputChange('dimensions', e.target.value)}    

            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

            disabled={isSubmitting}                placeholder="e.g., 30x20x10 cm"    if (searchTerm.trim() === '') {

          >

            Cancel                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"      setFilteredCustomers([]);

          </button>

          <button              />      setShowCustomerResults(false);

            type="submit"

            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"            </div>      return;

            disabled={isSubmitting}

          >    }

            {isSubmitting ? 'Creating...' : 'Create Parcel'}

          </button>            <div>    

        </div>

      </form>              <label htmlFor="declared_value" className="block text-sm font-medium text-gray-700">    const filtered = mockCustomersData.customers.filter(customer =>

    </div>

  );                Declared Value ($)      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

};

              </label>      customer.phone.includes(searchTerm) ||

export default CreateParcel;
              <input      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

                type="number"    );

                step="0.01"    

                min="0"    setFilteredCustomers(filtered);

                id="declared_value"    setShowCustomerResults(true);

                value={formData.declared_value}  };

                onChange={(e) => handleInputChange('declared_value', e.target.value)}  

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"  // Handle customer selection from search results

              />  const handleSelectCustomer = (customer) => {

            </div>    setSelectedCustomer(customer);

    setCustomerSearchTerm(customer.name);

            <div>    setShowCustomerResults(false);

              <label htmlFor="shipping_cost" className="block text-sm font-medium text-gray-700">    

                Shipping Cost ($)    const defaultAddress = mockCustomersData.getDefaultAddress(customer.id);

              </label>    setSelectedAddress(defaultAddress);

              <input    

                type="number"    // Set default shipment type if available

                step="0.01"    const defaultShipmentType = mockCustomersData.getDefaultShipmentType();

                min="0"    

                id="shipping_cost"    setFormData({

                value={formData.shipping_cost}      ...formData,

                onChange={(e) => handleInputChange('shipping_cost', e.target.value)}      customerDetails: {

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"        id: customer.id,

              />        name: customer.name,

            </div>        phone: customer.phone,

        email: customer.email,

            <div>        address: defaultAddress ? mockCustomersData.getFormattedAddress(defaultAddress) : '',

              <label htmlFor="payment_status" className="block text-sm font-medium text-gray-700">        addressId: defaultAddress ? defaultAddress.id : ''

                Payment Status      },

              </label>      shipmentDetails: defaultShipmentType ? {

              <select        type: defaultShipmentType.name,

                id="payment_status"        code: defaultShipmentType.code,

                value={formData.payment_status}        origin: {

                onChange={(e) => handleInputChange('payment_status', e.target.value)}          warehouse: defaultShipmentType.origin.warehouse,

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"          address: defaultShipmentType.origin.address

              >        }

                <option value="unpaid">Unpaid</option>      } : formData.shipmentDetails

                <option value="paid">Paid</option>    });

                <option value="pending">Pending</option>  };

              </select>  

            </div>  // Handle address selection

  const handleAddressChange = (e) => {

            <div>    const addressId = e.target.value;

              <label htmlFor="category" className="block text-sm font-medium text-gray-700">    if (!selectedCustomer) return;

                Category    

              </label>    const address = selectedCustomer.addresses.find(addr => addr.id === addressId);

              <input    if (address) {

                type="text"      setSelectedAddress(address);

                id="category"      setFormData({

                value={formData.category}        ...formData,

                onChange={(e) => handleInputChange('category', e.target.value)}        customerDetails: {

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"          ...formData.customerDetails,

              />          address: mockCustomersData.getFormattedAddress(address),

            </div>          addressId: address.id

        }

            <div className="sm:col-span-2">      });

              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">    }

                Tags (comma-separated)  };

              </label>

              <input  // Handle shipment type selection

                type="text"  const handleShipmentTypeChange = (e) => {

                id="tags"    const shipmentCode = e.target.value;

                value={formData.tags}    const shipmentType = mockCustomersData.getShipmentTypeByCode(shipmentCode);

                onChange={(e) => handleInputChange('tags', e.target.value)}    

                placeholder="fragile, electronics, documents"    if (shipmentType) {

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"      setSelectedShipmentType(shipmentType);

              />      setFormData({

            </div>        ...formData,

        shipmentDetails: {

            <div className="sm:col-span-2">          type: shipmentType.name,

              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">          code: shipmentType.code,

                Notes          origin: {

              </label>            warehouse: shipmentType.origin.warehouse,

              <textarea            address: shipmentType.origin.address

                id="notes"          }

                rows="3"        }

                value={formData.notes}      });

                onChange={(e) => handleInputChange('notes', e.target.value)}    }

                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"  };

              />  

            </div>  const handleItemChange = (index, field, value) => {

          </div>    const updatedItems = [...formData.items];

        </div>    

    if (field.includes('.')) {

        {/* Items */}      const [parent, child] = field.split('.');

        <div className="mb-8">      updatedItems[index][parent][child] = value;

          <h3 className="text-lg font-medium text-gray-900 mb-4">Items</h3>    } else {

      updatedItems[index][field] = value;

          {formData.items.map((item, index) => (    }

            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">    

              <div className="flex justify-between items-center mb-4">    setFormData({

                <h4 className="text-md font-medium text-gray-900">Item {index + 1}</h4>      ...formData,

                {formData.items.length > 1 && (      items: updatedItems

                  <button    });

                    type="button"  };

                    onClick={() => removeItem(index)}

                    className="text-red-600 hover:text-red-800"  const addItem = () => {

                  >    setFormData({

                    <Minus className="h-5 w-5" />      ...formData,

                  </button>      items: [

                )}        ...formData.items,

              </div>        {

          name: '',

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">          quantity: 1,

                <div>          weight: '',

                  <label className="block text-sm font-medium text-gray-700">          dimensions: {

                    Item Name *            length: '',

                  </label>            width: '',

                  <input            height: ''

                    type="text"          },

                    value={item.name}          value: '',

                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}          specialPackaging: false

                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${        }

                      errors[`item_${index}_name`] ? 'border-red-300' : 'border-gray-300'      ]

                    }`}    });

                    required  };

                  />

                  {errors[`item_${index}_name`] && <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_name`]}</p>}  const removeItem = (index) => {

                </div>    if (formData.items.length > 1) {

      const updatedItems = [...formData.items];

                <div>      updatedItems.splice(index, 1);

                  <label className="block text-sm font-medium text-gray-700">      setFormData({

                    Quantity        ...formData,

                  </label>        items: updatedItems

                  <input      });

                    type="number"    }

                    min="1"  };

                    value={item.quantity}

                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}  const calculateTotalWeight = () => {

                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"    return formData.items.reduce((total, item) => {

                  />      const weight = parseFloat(item.weight) || 0;

                </div>      const quantity = parseInt(item.quantity) || 0;

      return total + (weight * quantity);

                <div>    }, 0).toFixed(2);

                  <label className="block text-sm font-medium text-gray-700">  };

                    Weight (kg) *

                  </label>  const calculateTotalVolume = () => {

                  <input    return formData.items.reduce((total, item) => {

                    type="number"      const length = parseFloat(item.dimensions.length) || 0;

                    step="0.01"      const width = parseFloat(item.dimensions.width) || 0;

                    min="0"      const height = parseFloat(item.dimensions.height) || 0;

                    value={item.weight}      const quantity = parseInt(item.quantity) || 0;

                    onChange={(e) => handleItemChange(index, 'weight', e.target.value)}      return total + ((length * width * height / 1000000) * quantity); // Convert to cubic meters

                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${    }, 0).toFixed(3);

                      errors[`item_${index}_weight`] ? 'border-red-300' : 'border-gray-300'  };

                    }`}

                    required  const calculateTotalValue = () => {

                  />    return formData.items.reduce((total, item) => {

                  {errors[`item_${index}_weight`] && <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_weight`]}</p>}      const value = parseFloat(item.value) || 0;

                </div>      const quantity = parseInt(item.quantity) || 0;

      return total + (value * quantity);

                <div>    }, 0).toFixed(2);

                  <label className="block text-sm font-medium text-gray-700">  };

                    Value ($)

                  </label>  const nextStep = () => {

                  <input    setCurrentStep(currentStep + 1);

                    type="number"  };

                    step="0.01"

                    min="0"  const prevStep = () => {

                    value={item.value}    setCurrentStep(currentStep - 1);

                    onChange={(e) => handleItemChange(index, 'value', e.target.value)}  };

                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

                  />  const handleSubmit = (e) => {

                </div>    e.preventDefault();

    

                <div className="sm:col-span-2">    // Add calculated totals to the form data

                  <label className="block text-sm font-medium text-gray-700">    const finalData = {

                    Dimensions (cm)      ...formData,

                  </label>      totalWeight: calculateTotalWeight(),

                  <div className="mt-1 flex space-x-2">      totalVolume: calculateTotalVolume(),

                    <input      totalValue: calculateTotalValue(),

                      type="number"      // Generate a random parcel ID and tracking number for demo purposes

                      min="0"      id: `PCL-${Math.floor(1000 + Math.random() * 9000)}`,

                      placeholder="Length"      trackingNumber: `TRK-${Math.floor(10000 + Math.random() * 90000)}`

                      value={item.dimensions.length}    };

                      onChange={(e) => handleDimensionChange(index, 'length', e.target.value)}    

                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"    onSubmit(finalData);

                    />  };

                    <input

                      type="number"  const hasSpecialPackaging = formData.items.some(item => item.specialPackaging);

                      min="0"

                      placeholder="Width"  return (

                      value={item.dimensions.width}    <div className="bg-white rounded-lg shadow-md">

                      onChange={(e) => handleDimensionChange(index, 'width', e.target.value)}      <div className="p-6 border-b border-gray-200">

                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"        <h2 className="text-2xl font-bold text-gray-900">Create New Parcel</h2>

                    />        <p className="mt-1 text-sm text-gray-500">Enter the details for the new parcel</p>

                    <input        

                      type="number"        {/* Progress Steps */}

                      min="0"        <div className="mt-4">

                      placeholder="Height"          <div className="flex items-center justify-between">

                      value={item.dimensions.height}            <div className="flex items-center">

                      onChange={(e) => handleDimensionChange(index, 'height', e.target.value)}              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>

                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"                1

                    />              </div>

                  </div>              <div className="ml-2 text-sm font-medium text-gray-900">Customer & Shipping</div>

                </div>            </div>

            <div className="hidden sm:block w-16 h-0.5 bg-gray-200"></div>

                <div className="sm:col-span-2">            <div className="flex items-center">

                  <div className="flex items-center">              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>

                    <input                2

                      id={`special-packaging-${index}`}              </div>

                      type="checkbox"              <div className="ml-2 text-sm font-medium text-gray-900">Items</div>

                      checked={item.special_packaging}            </div>

                      onChange={(e) => handleItemChange(index, 'special_packaging', e.target.checked)}            <div className="hidden sm:block w-16 h-0.5 bg-gray-200"></div>

                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"            <div className="flex items-center">

                    />              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>

                    <label htmlFor={`special-packaging-${index}`} className="ml-2 block text-sm text-gray-900">                3

                      Requires Special Packaging              </div>

                    </label>              <div className="ml-2 text-sm font-medium text-gray-900">Review & Submit</div>

                  </div>            </div>

                </div>          </div>

              </div>        </div>

            </div>      </div>

          ))}      

      <form onSubmit={handleSubmit}>

          <button        {/* Step 1: Customer & Shipping Details */}

            type="button"        {currentStep === 1 && (

            onClick={addItem}          <div className="p-6">

            className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer & Shipping Information</h3>

          >            

            <Plus className="h-4 w-4 mr-2" />            {/* Customer Code Lookup */}

            Add Another Item            <div className="bg-gray-50 p-4 rounded-md mb-6">

          </button>              <h4 className="text-md font-medium text-gray-900 mb-2">Quick Lookup by Customer Code</h4>

        </div>              <div className="flex mb-4">

                <div className="flex-grow mr-2">

        {/* Submit Buttons */}                  <label htmlFor="customerCode" className="block text-sm font-medium text-gray-700 mb-1">

        <div className="flex justify-end space-x-3">                    Customer-Shipment Code

          <button                  </label>

            type="button"                  <input

            onClick={onCancel}                    type="text"

            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"                    id="customerCode"

            disabled={isSubmitting}                    value={customerCode}

          >                    onChange={(e) => setCustomerCode(e.target.value)}

            Cancel                    placeholder="Enter customer-shipment code (e.g., CUST-001-STD)"

          </button>                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"

          <button                  />

            type="submit"                  <p className="mt-1 text-xs text-gray-500">

            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"                    Format: CustomerID-ShipmentCode (e.g., CUST-001-STD, CUST-001-EXP)

            disabled={isSubmitting}                  </p>

          >                </div>

            {isSubmitting ? 'Creating...' : 'Create Parcel'}                <div className="flex items-end">

          </button>                  <button

        </div>                    type="button"

      </form>                    onClick={handleCustomerCodeSearch}

    </div>                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

  );                  >

};                    <Search className="h-4 w-4 mr-1" />

                    Find

export default CreateParcel;                  </button>
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