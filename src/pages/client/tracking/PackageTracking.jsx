import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Search, AlertTriangle } from 'lucide-react';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import TrackingForm from '../../../components/client/tracking/TrackingForm';
import RecentShipments from '../../../components/client/tracking/RecentShipments';

const PackageTracking = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        // In production, this would be your API endpoint
        const response = await axios.get('/src/data/tracking.json');
        setTrackingData(response.data);
      } catch (err) {
        setError('Failed to load tracking data');
        console.error('Error fetching tracking data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, []);

  const handleTrackPackage = (trackingNumber) => {
    if (!trackingData) return;

    setSearchLoading(true);
    setError(null);
    
    // Simulate API call with a slight delay
    setTimeout(() => {
      // In a real application, this would make an API call
      // For now, we'll search through our mock data
      const foundShipment = trackingData.recentShipments.find(
        shipment => shipment.trackingNumber.toLowerCase() === trackingNumber.toLowerCase()
      );

      if (foundShipment) {
        setSearchResults([foundShipment]);
        setError(null);
      } else {
        setSearchResults([]);
        setError(`No shipment found with tracking number: ${trackingNumber}`);
      }
      setSearchLoading(false);
    }, 800);
  };

  const clearSearchResults = () => {
    setSearchResults(null);
    setError(null);
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mb-2"></div>
          <p className="text-gray-600">Loading tracking information...</p>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="py-4 px-1 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Package className="w-6 h-6 text-red-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">{trackingData?.pageTitle}</h1>
            </div>
            <p className="text-gray-600 mt-1">{trackingData?.pageDescription}</p>
          </div>

          <TrackingForm onTrackPackage={handleTrackPackage} />

          {searchLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mr-3"></div>
              <span>Searching for your package...</span>
            </div>
          )}

          {error && !searchLoading && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-start">
              <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">No Results Found</h3>
                <p className="mt-1">{error}</p>
                <p className="text-sm mt-2">
                  Please check the tracking number and try again. If you continue to experience issues, 
                  please contact our customer support at <span className="font-medium">support@xycargo.com</span>
                </p>
              </div>
            </div>
          )}

          {searchResults && searchResults.length > 0 && !searchLoading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-red-600 mr-2" />
                  <h2 className="text-lg font-semibold">Search Results</h2>
                </div>
                <button 
                  onClick={clearSearchResults}
                  className="text-sm text-gray-500 hover:text-red-600"
                >
                  Clear results
                </button>
              </div>
              <RecentShipments shipments={searchResults} />
            </div>
          )}

          <div className="mb-4 mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Shipments</h2>
          </div>
          <RecentShipments shipments={trackingData?.recentShipments} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default PackageTracking;