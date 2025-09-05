import React from 'react';
import { UserPlus, Package, Truck, CheckCircle } from 'lucide-react';

const HowWeWork = () => {
  const steps = [
    {
      id: 1,
      icon: <UserPlus size={40} className="text-red-500" />,
      title: 'Register',
      description: 'Create your account and verify your identity for secure shipping services.',
    },
    {
      id: 2,
      icon: <Package size={40} className="text-red-500" />,
      title: 'Drop/Send Parcel',
      description: 'Bring your package to our location or schedule a pickup at your convenience.',
    },
    {
      id: 3,
      icon: <Truck size={40} className="text-red-500" />,
      title: 'Ship & Track',
      description: 'Watch your package journey in real-time with our advanced tracking system.',
    },
    {
      id: 4,
      icon: <CheckCircle size={40} className="text-red-500" />,
      title: 'Receive',
      description: 'Your recipient gets the package safely delivered to their doorstep.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">How We Work</h2>
        <p className="text-gray-600 mt-4">
          Simple, transparent, and reliable. Our streamlined process ensures your packages
          reach their destination safely and on time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-16">
        {steps.map((step) => (
          <div key={step.id} className="bg-white shadow-md rounded-lg p-6 text-center">
            {/* ID Number Circle */}
            <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full mx-auto mb-4">
              <span className="text-white font-bold">{step.id}</span>
            </div>
            
            {/* Icon */}
            <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mx-auto mb-4">
              {step.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;