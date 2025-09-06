import React, { useState } from 'react';
import { Calculator, Clock, TruckIcon, Package, Weight, Box } from 'lucide-react';
import { motion } from 'framer-motion';

const ShippingCalc = () => {
  const [formData, setFormData] = useState({
    fromLocation: 'China',
    toLocation: 'Zambia',
    weight: 10,
    volume: 0.1,
    category: 'normal' // Default to normal goods
  });

  const [quote, setQuote] = useState({
    cost: '$0',
    deliveryTime: '10-17 days',
    service: 'Air Freight',
    showing: false
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateCost = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Apply XY Cargo pricing logic
      let cost = 0;
      let deliveryTime = '10-17 days';
      let service = 'Air Freight';
      
      // Air freight calculation
      if (formData.fromLocation === 'China' && formData.toLocation === 'Zambia') {
        switch (formData.category) {
          case 'normal':
            cost = formData.weight * 12; // $12/kg for normal goods
            break;
          case 'wigs':
            cost = formData.weight * 14; // $14/kg for wigs
            break;
          case 'phones':
            // For phones we charge per piece, assuming 1 piece = 1kg for simplicity
            // In a real app, you'd have a separate field for number of pieces
            cost = formData.weight * 11; // $11/piece for phones
            break;
          case 'battery':
            cost = formData.weight * 14; // $14/kg for battery goods
            deliveryTime = '10-17 days'; // Updated from 2-3 weeks as requested
            break;
          case 'laptop':
            cost = formData.weight * 16; // $16/kg for laptops and iPads
            break;
          case 'sea':
            // Sea freight is per CBM (cubic meter)
            service = 'Sea Freight';
            if (formData.volume < 0.1) {
              // Minimum charge is 0.1 CBM at $50
              cost = 50;
            } else {
              cost = formData.volume * 300; // $300/CBM for general goods
            }
            deliveryTime = '30-45 days';
            break;
          case 'special_sea':
            // Special goods via sea freight
            service = 'Sea Freight (Special Goods)';
            if (formData.volume < 0.1) {
              // Minimum charge is 0.1 CBM at $50
              cost = 50;
            } else {
              cost = formData.volume * 330; // $330/CBM for special goods
            }
            deliveryTime = '30-45 days';
            break;
          default:
            cost = formData.weight * 12; // Default to normal rate
        }
      }
      
      setQuote({
        cost: `$${cost.toFixed(2)} USD`,
        deliveryTime,
        service,
        showing: true
      });
      
      setLoading(false);
    }, 800);
  };

  return (
    <motion.div 
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          China to Zambia Shipping Calculator
        </motion.h2>
        <motion.p 
          className="text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Get instant shipping quotes for your packages from China to Zambia
        </motion.p>
      </div>
      
      <motion.div 
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <Calculator size={28} className="text-red-500 mr-3" />
          <h3 className="text-2xl font-semibold text-gray-800">Calculate Shipping Cost</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="mb-5">
              <label className="block text-gray-600 mb-2 font-medium">From Location</label>
              <div className="relative">
                <select
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled // Only China is available as origin
                >
                  <option value="China">China (Foshan)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-gray-600 mb-2 font-medium">To Location</label>
              <div className="relative">
                <select
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled // Only Zambia is available as destination
                >
                  <option value="Zambia">Zambia (Lusaka)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <label className="block text-gray-600 mb-2 font-medium">Cargo Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="normal">Normal Goods (Air) - $12/kg</option>
                  <option value="wigs">Wigs (Air) - $14/kg</option>
                  <option value="phones">Phones (Air) - $11/piece</option>
                  <option value="battery">Battery Goods/Cosmetics/Medicines (Air) - $14/kg</option>
                  <option value="laptop">Laptops & iPads (Air) - $16/kg</option>
                  <option value="sea">General Goods (Sea) - $300/CBM</option>
                  <option value="special_sea">Special Goods (Sea) - $330/CBM</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {formData.category === 'sea' || formData.category === 'special_sea' 
                  ? 'For sea freight, enter volume in cubic meters (CBM). Minimum: 0.1 CBM' 
                  : 'For air freight, enter weight in kilograms. Minimum: 1kg'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {(formData.category === 'sea' || formData.category === 'special_sea') ? (
                <div className="col-span-2">
                  <label className="block text-gray-600 mb-2 font-medium">
                    <div className="flex items-center">
                      <Box size={16} className="mr-1 text-red-500" />
                      Volume (CBM)
                    </div>
                  </label>
                  <input
                    type="number"
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    min="0.1"
                    step="0.1"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ) : (
                <div className="col-span-2">
                  <label className="block text-gray-600 mb-2 font-medium">
                    <div className="flex items-center">
                      <Weight size={16} className="mr-1 text-red-500" />
                      Weight (kg)
                    </div>
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}
            </div>

            <motion.button
              onClick={calculateCost}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </div>
              ) : (
                <>
                  <Calculator size={18} className="mr-2" /> Calculate Cost
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Quote Section */}
          <motion.div 
            className={`bg-red-50 p-6 rounded-lg flex flex-col ${quote.showing ? 'opacity-100' : 'opacity-40'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: quote.showing ? 1 : 0.4, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-red-500 text-center mb-8">Shipping Quote</h3>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Package size={18} className="mr-2 text-red-500" />
                <p className="text-gray-700">Service Type:</p>
              </div>
              <p className="text-xl font-semibold text-gray-800 ml-6">{quote.service}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600">Route:</p>
              <p className="text-lg font-medium text-gray-800">China (Foshan) → Zambia (Lusaka)</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600">Estimated Cost:</p>
              <p className="text-3xl font-bold text-red-500">{quote.cost}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formData.category === 'sea' || formData.category === 'special_sea' 
                  ? 'Minimum charge: $50 (0.1 CBM)'
                  : 'Minimum charge: 1kg'}
              </p>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600">Delivery Time:</p>
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-red-500" />
                <p className="text-lg text-gray-800 font-medium">{quote.deliveryTime}</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <motion.button 
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TruckIcon size={18} className="mr-2" /> Book Shipment
              </motion.button>
              
              <a 
                href="https://wa.me/260967379139" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full mt-3 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Discuss via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <motion.p 
          className="text-sm text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Note: This is an estimate. Final cost may vary based on actual weight, dimensions, and any additional services.
          <br />Packages left unclaimed for more than 3 days will be charged $2 per day.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ShippingCalc;