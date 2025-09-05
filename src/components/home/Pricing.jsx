import React from 'react';

const Pricing = () => {
  const pricingData = [
    {
      region: 'United States',
      rates: [
        { weight: '0-1 kg', price: '$15.99', duration: '3-5 days' },
        { weight: '1-5 kg', price: '$25.99', duration: '3-5 days' },
        { weight: '5-10 kg', price: '$45.99', duration: '3-7 days' },
      ],
    },
    {
      region: 'Europe',
      rates: [
        { weight: '0-1 kg', price: '$18.99', duration: '4-6 days' },
        { weight: '1-5 kg', price: '$28.99', duration: '4-6 days' },
        { weight: '5-10 kg', price: '$49.99', duration: '5-8 days' },
      ],
    },
    {
      region: 'Asia Pacific',
      rates: [
        { weight: '0-1 kg', price: '$22.99', duration: '5-7 days' },
        { weight: '1-5 kg', price: '$35.99', duration: '5-7 days' },
        { weight: '5-10 kg', price: '$59.99', duration: '6-10 days' },
      ],
    },
  ];

  const includedFeatures = [
    'Real-time tracking included',
    '24/7 customer support',
    'Insurance up to $500',
    'Customs documentation assistance',
    'Free packaging consultation',
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Transparent Pricing</h2>
        <p className="text-gray-600 mt-4">
          No hidden fees, no surprises. Simple, weight-based pricing for destinations worldwide.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16">
        {pricingData.map((region) => (
          <div key={region.region} className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{region.region}</h3>
            {region.rates.map((rate, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <div className="text-gray-600">
                  <p>{rate.weight}</p>
                  <p className="text-sm">{rate.duration}</p>
                </div>
                <p className="text-red-500 font-bold">{rate.price}</p>
              </div>
            ))}
            <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Get Quote →
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-16">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Every Shipment Includes</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {includedFeatures.map((feature, index) => (
            <li key={index} className="flex items-center justify-center text-gray-600">
              <span className="text-green-500 mr-2">✔</span>
              {feature}
            </li>
          ))}
        </ul>
        <button className="mt-8 text-red-500 hover:underline focus:outline-none">
          View Complete Price List
        </button>
      </div>
    </section>
  );
};

export default Pricing;