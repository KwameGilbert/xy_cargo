import React, { useState, useEffect } from 'react';
import ParcelActionsAdmin from './ParcelActionsAdmin';
import ParcelDetail from './AdminParcelDetail';
import mockParcelData from './mockData'; // Assuming mock data is available for demonstration

const CreateAdminParcel = () => {
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch parcel details
    setLoading(true);
    
    try {
      // Simulate network delay
      const timer = setTimeout(() => {
        // Use the mock parcel detail data
        const parcelData = mockParcelData.parcelDetail; // Replace with actual API call
        
        if (parcelData) {
          setParcel(parcelData);
          setLoading(false);
        } else {
          setError('Parcel not found');
          setLoading(false);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to load parcel details');
      setLoading(false);
    }
  }, []);

  const handleSplitParcel = () => {
    // Logic to split the parcel
  };

  const handleReassignCustomer = () => {
    // Logic to reassign the customer
  };

  const handleUpdateCost = (newCost) => {
    // Logic to update the cost
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="parcel-detail-container">
      <ParcelActionsAdmin 
        onSplitParcel={handleSplitParcel} 
        onReassignCustomer={handleReassignCustomer} 
        onUpdateCost={handleUpdateCost} 
      />
      <ParcelDetail parcel={parcel} />
    </div>
  );
};

export default CreateAdminParcel;