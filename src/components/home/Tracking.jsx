import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = () => {
    if (trackingNumber) {
      alert(`Tracking details for: ${trackingNumber}`);
    } else {
      alert('Please enter a tracking number.');
    }
  };

  const demoTrackingNumbers = ['FY123456789', 'FY987654321', 'FY456789123'];

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Track Your Package</h2>
        <p className="text-gray-600 mt-4">
          Get real-time updates on your shipment's journey
        </p>
      </div>
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Search size={24} className="text-red-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Enter Tracking Number</h3>
        </div>
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter your tracking number (e.g., FY123456789)"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
        />
        <button
          onClick={handleTrack}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Track
        </button>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">Try a demo tracking number:</p>
        <div className="flex justify-center space-x-4">
          {demoTrackingNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setTrackingNumber(number)}
              className="text-red-500 hover:underline focus:outline-none"
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracking;