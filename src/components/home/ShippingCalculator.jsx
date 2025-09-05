import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const ShippingCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState(0);
  const [volume, setVolume] = useState(0);

  const handleCalculate = () => {
    // Logic for calculating shipping cost
    alert('Shipping cost calculated!');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Shipping Calculator</h2>
        <p className="text-gray-600 mt-4">
          Get instant shipping quotes for your packages
        </p>
      </div>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Calculator size={24} className="text-red-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Calculate Shipping Cost</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-600 mb-2">From Location</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select origin country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-2">To Location</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select destination country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-600 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Volume (cm³)</label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Calculate Cost
        </button>
      </div>
    </section>
  );
};

export default ShippingCalculator;