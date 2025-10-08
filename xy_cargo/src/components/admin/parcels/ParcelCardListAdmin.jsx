import React from 'react';
import ParcelCard from './ParcelCardAdmin'; // Assuming a ParcelCardAdmin component exists for displaying individual parcel details

const ParcelCardListAdmin = ({ parcels }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {parcels.map(parcel => (
        <ParcelCard key={parcel.id} parcel={parcel} />
      ))}
    </div>
  );
};

export default ParcelCardListAdmin;