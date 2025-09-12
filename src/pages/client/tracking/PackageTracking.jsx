import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import TrackingForm from '../../../components/client/tracking/TrackingForm';
import RecentShipments from '../../../components/client/tracking/RecentShipments';

const PackageTracking = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

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
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{trackingData?.pageTitle}</h1>
          <p className="text-gray-600 mt-1">{trackingData?.pageDescription}</p>
        </div>

        <TrackingForm onTrackPackage={handleTrackPackage} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Search Results</h2>
            <RecentShipments shipments={searchResults} />
          </div>
        )}

        <RecentShipments shipments={trackingData?.recentShipments} />
      </div>
    </ClientLayout>
  );
};

export default PackageTracking;