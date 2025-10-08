import React, { useState, useEffect } from 'react';
import ParcelActionsAdmin from './ParcelActionsAdmin';
import ParcelDetail from './ParcelDetail'; // Assuming a similar structure to the existing ParcelDetail component
import mockParcelData from './mockData'; // Mock data for demonstration purposes

const AdminParcelDetail = ({ parcelId }) => {
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch parcel details
    setLoading(true);
    try {
      // Simulate network delay
      const timer = setTimeout(() => {
        const parcelData = mockParcelData.find(p => p.id === parcelId);
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
  }, [parcelId]);

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
    <div className="admin-parcel-detail">
      <h2>Parcel Details</h2>
      <ParcelDetail parcel={parcel} />
      <div className="actions">
        <ParcelActionsAdmin 
          onSplit={handleSplitParcel} 
          onReassign={handleReassignCustomer} 
          onUpdateCost={handleUpdateCost} 
        />
      </div>
      <div className="summary">
        <h3>Weight and Volume Summary</h3>
        <p>Total Weight: {parcel.metrics.totalWeight} kg</p>
        <p>Total Volume: {parcel.metrics.volume}</p>
      </div>
      <div className="payment-info">
        <h3>Payment Information</h3>
        <p>Payment Status: {parcel.metrics.paymentStatus}</p>
      </div>
      <div className="status-timeline">
        <h3>Status Timeline</h3>
        <ul>
          {parcel.timeline.map((event, index) => (
            <li key={index}>
              <span>{event.date}: {event.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminParcelDetail;