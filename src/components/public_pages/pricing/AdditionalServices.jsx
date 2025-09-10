import React from 'react';
import { Shield, Clock, Globe } from 'lucide-react';

const AdditionalServices = () => {
  const services = [
    {
      id: 1,
      title: 'Insurance Coverage',
      description: 'Protect your shipments with comprehensive insurance up to $10,000',
      price: '$2.99',
      icon: <Shield size={40} className="text-red-500" />
    },
    {
      id: 2,
      title: 'Express Delivery',
      description: 'Priority handling and faster delivery times for urgent shipments',
      price: '$15.99',
      icon: <Clock size={40} className="text-red-500" />
    },
    {
      id: 3,
      title: 'Customs Clearance',
      description: 'Professional customs documentation and clearance services',
      price: '$25.99',
      icon: <Globe size={40} className="text-red-500" />
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Additional Services</h2>
        <p className="text-gray-600 mt-4">
          Enhance your shipping experience with our premium add-on services.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16">
        {services.map((service) => (
          <div key={service.id} className="bg-white border border-gray-100 rounded-lg p-6 text-center shadow-md">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                {service.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
            
            <p className="text-gray-600 mb-6">
              {service.description}
            </p>
            
            <p className="text-red-500 text-2xl font-bold mb-4">
              Starting at {service.price}
            </p>
            
            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center">
              Add to Shipment <span className="ml-2">→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;
