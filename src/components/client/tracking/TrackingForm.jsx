import { useState, useEffect } from 'react';
import { Search, Package, History, X } from 'lucide-react';

const TrackingForm = ({ onTrackPackage }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentTrackingSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const validateTrackingNumber = (number) => {
    // Basic validation: Format like TR followed by 9 digits
    const trackingRegex = /^TR\d{9}$/i;
    return trackingRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setIsValid(true);
    setErrorMessage('');
    
    const trimmedNumber = trackingNumber.trim();
    
    if (!trimmedNumber) {
      setIsValid(false);
      setErrorMessage('Please enter a tracking number');
      return;
    }
    
    if (!validateTrackingNumber(trimmedNumber)) {
      setIsValid(false);
      setErrorMessage('Invalid format. Please enter a valid tracking number (e.g., TR001234567)');
      return;
    }
    
    // Save to recent searches (no duplicates, max 5)
    const updatedSearches = [
      trimmedNumber,
      ...recentSearches.filter(item => item !== trimmedNumber)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentTrackingSearches', JSON.stringify(updatedSearches));
    
    // Submit the search
    onTrackPackage(trimmedNumber);
  };

  const handleQuickSearch = (number) => {
    setTrackingNumber(number);
    onTrackPackage(number);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentTrackingSearches');
    setShowHistory(false);
  };

  const clearSearch = () => {
    setTrackingNumber('');
    setIsValid(true);
    setErrorMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Package className="w-5 h-5 mr-2 text-red-600" />
          <h2 className="text-lg font-semibold">Track a Package</h2>
        </div>
        {recentSearches.length > 0 && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center text-sm text-gray-600 hover:text-red-600"
          >
            <History className="w-4 h-4 mr-1" />
            Recent
          </button>
        )}
      </div>
      
      {showHistory && recentSearches.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Recent Searches</p>
            <button 
              onClick={clearRecentSearches}
              className="text-xs text-gray-500 hover:text-red-500"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((number, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(number)}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:bg-red-50 hover:border-red-200"
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <input
            type="text"
            className={`w-full px-4 py-2.5 border ${!isValid ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pl-10`}
            placeholder="Enter tracking number (e.g., TR001234567)"
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              setIsValid(true);
              setErrorMessage('');
            }}
            aria-invalid={!isValid}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {trackingNumber && (
            <button 
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md flex items-center justify-center transition-colors duration-200"
        >
          Track Package
        </button>
      </form>
      
      {!isValid && errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
      
      <div className="mt-3">
        <p className="text-xs text-gray-500">
          Enter your XY Cargo tracking number to get real-time updates on your shipment's status and location.
        </p>
      </div>
    </div>
  );
};

export default TrackingForm;