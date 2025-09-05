import React from 'react';

const VolumeDiscounts = () => {
  const discountTiers = [
    {
      percentage: "5%",
      volume: "10+ Shipments/Month",
      type: "Regular Business Discount"
    },
    {
      percentage: "10%",
      volume: "50+ Shipments/Month",
      type: "Growing Business Discount"
    },
    {
      percentage: "15%",
      volume: "100+ Shipments/Month",
      type: "Enterprise Discount"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="border border-gray-200 rounded-lg p-8">
          <div className="text-center mb-6">
            <span className="text-sm text-red-500 font-medium">Volume Discounts</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Save More with Bulk Shipping</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {discountTiers.map((tier, index) => (
              <div key={index} className="text-center">
                <p className="text-red-500 text-4xl font-bold">{tier.percentage}</p>
                <p className="font-medium text-gray-800 mt-2">{tier.volume}</p>
                <p className="text-gray-600 text-sm">{tier.type}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors">
              Apply for Volume Discount
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolumeDiscounts;
