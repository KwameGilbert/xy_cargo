import React from 'react';
import { Plane, Ship, Smartphone, Laptop, Package, Battery, Scissors, MessageCircle } from 'lucide-react';

const ShippingPricing = () => {
  const airFreightRates = [
    {
      category: 'Normal Goods',
      icon: Package,
      price: '$12',
      unit: 'per kg',
      delivery: '10-17 days',
      description: 'General merchandise, clothing, accessories',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      category: 'Wigs & Hair Products',
      icon: Scissors,
      price: '$14',
      unit: 'per kg',
      delivery: '10-17 days',
      description: 'Hair extensions, wigs, styling products',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      category: 'Mobile Phones',
      icon: Smartphone,
      price: '$11',
      unit: 'per piece',
      delivery: '10-17 days',
      description: 'Smartphones, tablets, phone accessories',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      category: 'Battery Goods',
      icon: Battery,
      price: '$14',
      unit: 'per kg',
      delivery: '2-3 weeks',
      description: 'Items with batteries, cosmetics, toner, medicine',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      category: 'Laptops & iPads',
      icon: Laptop,
      price: '$16',
      unit: 'per kg',
      delivery: '10-17 days',
      description: 'Computers, tablets, electronic devices',
      color: 'bg-red-50 text-red-600 border-red-200'
    }
  ];

  const seaFreightRates = [
    {
      category: 'General Goods',
      price: '$300',
      unit: 'per CBM',
      description: 'Clothing, bags, shoes, accessories, fabrics, machinery',
      minCharge: '$50 (0.1 CBM minimum)'
    },
    {
      category: 'Special Goods',
      price: '$330',
      unit: 'per CBM',
      description: 'Built-in batteries, printing materials, food items',
      minCharge: '$50 (0.1 CBM minimum)',
      note: 'Requires detailed communication before shipping'
    }
  ];

  const includedFeatures = [
    'Real-time tracking included',
    'WhatsApp support available',
    'China warehouse handling',
    'Minimum 1kg for air freight',
    'Minimum 0.1 CBM for sea freight',
    'Unclaimed package storage (3 days free)',
  ];

  const whatsappContacts = [
    { number: '+260967379139', region: 'Zambia' },
    { number: '+260769481203', region: 'Support' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">XY CARGO ZAMBIA: China to Zambia Pricing</h2>
        <p className="text-gray-600 mt-4">
          Transparent pricing for air and sea freight services. All rates in USD.
        </p>
      </div>

      {/* Air Freight Section */}
      <div className="mb-16 px-4 md:px-16">
        <div className="flex items-center justify-center mb-8">
          <Plane className="text-blue-500 mr-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-800">Air Freight Services</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airFreightRates.map((rate, index) => (
            <div key={index} className={`bg-white shadow-lg rounded-lg p-6 border-2 ${rate.color}`}>
              <div className="flex items-center mb-4">
                <rate.icon size={24} className="mr-3" />
                <h4 className="text-lg font-semibold text-gray-800">{rate.category}</h4>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-800">{rate.price}</span>
                <span className="text-gray-600 ml-2">{rate.unit}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rate.description}</p>
              <div className="text-center">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {rate.delivery}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sea Freight Section */}
      <div className="mb-16 px-4 md:px-16">
        <div className="flex items-center justify-center mb-8">
          <Ship className="text-green-500 mr-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-800">Sea Freight Services</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seaFreightRates.map((rate, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-8 border-2 border-green-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">{rate.category}</h4>
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-green-600">{rate.price}</span>
                <span className="text-gray-600 ml-2">{rate.unit}</span>
              </div>
              <p className="text-gray-600 mb-4">{rate.description}</p>
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Minimum Charge: {rate.minCharge}</p>
              </div>
              {rate.note && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">{rate.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Important Information */}
      <div className="mb-16 px-4 md:px-16">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4 text-center">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Minimum Requirements:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Air freight: Minimum 1kg</li>
                <li>• Sea freight: Minimum 0.1 CBM</li>
                <li>• Sea freight starting price: $50</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Storage Policy:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• First 3 days: FREE storage</li>
                <li>• After 3 days: $2 per day charge</li>
                <li>• Unclaimed packages subject to fees</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Contacts */}
      <div className="mb-16 px-4 md:px-16">
        <div className="text-center mb-8">
          <MessageCircle className="text-green-500 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-800">WhatsApp Support</h3>
          <p className="text-gray-600 mt-2">Working Hours: 8:00 am-17:00 pm (Zambia Time)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatsappContacts.map((contact, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center border-2 border-green-200">
              <p className="text-gray-600 text-sm mb-4">{contact.region}</p>
              <a 
                href={`https://wa.me/${contact.number.replace(/\D/g, '')}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} className="mr-2" />
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center px-4 md:px-16">
        <h3 className="text-xl font-semibold text-gray-800 mb-8">Every Shipment Includes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {includedFeatures.map((feature, index) => (
            <div key={index} className="flex items-center justify-center text-gray-600 bg-white p-4 rounded-lg shadow">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              {feature}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-blue-800 mb-2">China Warehouse Address:</h4>
          <p className="text-blue-700">广东省佛山市南海区里水镇沙步工业区横二路9号菲尔国际仓转赞比亚</p>
          <p className="text-blue-700 mt-2">客户名称:</p>
          <p className="text-blue-700 mt-2">Mobile: +86 199 2568 2512</p>
        </div>
      </div>
    </section>
  );
};

export default ShippingPricing;
   