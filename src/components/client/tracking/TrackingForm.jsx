import { useState } from 'react';
import { Search } from 'lucide-react';

const TrackingForm = ({ onTrackPackage }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrackPackage(trackingNumber);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Track a Package</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Enter tracking number (e.g., TR001234567)"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
        >
          <Search className="w-4 h-4 mr-2" />
          Track Package
        </button>
      </form>
    </div>
  );
};

export default TrackingForm;