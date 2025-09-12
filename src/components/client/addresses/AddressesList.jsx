import React from 'react';
import AddressCard from './AddressCard';

const AddressesList = ({ addresses = [], onEdit, onDelete, onSetDefault }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {addresses.map(addr => (
        <AddressCard key={addr.id} address={addr} onEdit={onEdit} onDelete={onDelete} onSetDefault={onSetDefault} />
      ))}
    </div>
  );
};

export default AddressesList;
