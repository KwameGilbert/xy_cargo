import React, { useState } from 'react';
import { Calculator, Clock, TruckIcon } from 'lucide-react';

const ShippingCalc = () => {
  const [formData, setFormData] = useState({
    fromLocation: 'France',
    toLocation: 'Japan',
    weight: 23,
    volume: 34
  });

  const [quote, setQuote] = useState({
    cost: '$72.5',
    deliveryTime: '3-7 business days',
    showing: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateCost = () => {
    // In a real app, this would make an API call to calculate shipping costs
    // For this demo, we'll just use the existing values
    setQuote({
      ...quote,
      showing: true
    });
  };

  return (
    <div className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Shipping Calculator</h2>
        <p className="text-gray-600 mt-4">
          Get instant shipping quotes for your packages
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <Calculator size={24} className="text-red-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Calculate Shipping Cost</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">From Location</label>
              <div className="relative">
                <select
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="France">France</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">To Location</label>
              <div className="relative">
                <select
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Japan">Japan</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-600 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Volume (cm³)</label>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <button
              onClick={calculateCost}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
            >
              <Calculator size={18} className="mr-2" /> Calculate Cost
            </button>
          </div>

          {/* Quote Section */}
          {quote.showing && (
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-500 text-center mb-8">Shipping Quote</h3>
              
              <div className="mb-4">
                <p className="text-gray-600">Estimated Cost:</p>
                <p className="text-2xl font-bold text-red-500 text-right">{quote.cost}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600">Delivery Time:</p>
                <div className="flex items-center justify-end">
                  <Clock size={18} className="mr-2 text-gray-600" />
                  <p className="text-gray-700 font-medium">{quote.deliveryTime}</p>
                </div>
              </div>
              
              <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center">
                <TruckIcon size={18} className="mr-2" /> Book Shipment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingCalc;
