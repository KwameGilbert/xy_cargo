import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, MapPin, Package, DollarSign, Zap, Plane } from 'lucide-react';

const ShippingCalculator = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    volume: ''
  });
  const [quote, setQuote] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (quote) setQuote(null); // Clear quote when inputs change
  };

  const handleCalculate = async () => {
    if (!formData.origin || !formData.destination || !formData.weight) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate API call with realistic calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const baseRate = 15;
    const weightRate = parseFloat(formData.weight) * 2.5;
    const volumeRate = parseFloat(formData.volume || 0) * 0.001;
    const distance = Math.random() * 1000 + 500; // Simulate distance
    const distanceRate = distance * 0.01;
    
    const total = baseRate + weightRate + volumeRate + distanceRate;
    
    setQuote({
      cost: total.toFixed(2),
      deliveryTime: Math.floor(Math.random() * 5) + 3,
      distance: distance.toFixed(0)
    });
    
    setIsCalculating(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const quoteVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 right-10 text-blue-200"
      >
        <Plane size={60} />
      </motion.div>
      
      <motion.div
        animate={{
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-10 left-10 text-indigo-200"
      >
        <Package size={40} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto px-4"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="inline-block mb-4"
          >
            <Calculator className="text-red-500 mx-auto" size={48} />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Shipping Calculator</h2>
          <p className="text-gray-600 text-lg">
            Get instant shipping quotes for your packages with our smart calculator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="bg-white shadow-xl rounded-2xl p-8 backdrop-blur-sm border border-white/20"
              whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <Calculator size={24} className="text-red-500 mr-3" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800">Calculate Shipping Cost</h3>
              </div>

              <div className="space-y-6">
                {/* Origin and Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                      <MapPin size={16} className="mr-2 text-green-500" />
                      From Location
                    </label>
                    <motion.select
                      value={formData.origin}
                      onChange={(e) => handleInputChange('origin', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">Select origin country</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </motion.select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                      <MapPin size={16} className="mr-2 text-red-500" />
                      To Location
                    </label>
                    <motion.select
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">Select destination country</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </motion.select>
                  </motion.div>
                </div>

                {/* Weight and Volume */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                      <Package size={16} className="mr-2 text-blue-500" />
                      Weight (kg)
                    </label>
                    <motion.input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="0.0"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                      <Package size={16} className="mr-2 text-purple-500" />
                      Volume (cm³)
                    </label>
                    <motion.input
                      type="number"
                      value={formData.volume}
                      onChange={(e) => handleInputChange('volume', e.target.value)}
                      placeholder="0"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                </div>

                {/* Calculate Button */}
                <motion.button
                  onClick={handleCalculate}
                  disabled={!formData.origin || !formData.destination || !formData.weight || isCalculating}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCalculating ? (
                    <motion.div className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Calculating...
                    </motion.div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Zap size={20} className="mr-2" />
                      Calculate Cost
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Quote Display */}
          <motion.div variants={itemVariants} className="flex items-center">
            <AnimatePresence mode="wait">
              {quote ? (
                <motion.div
                  key="quote"
                  variants={quoteVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="w-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border-2 border-green-200"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-center mb-6"
                  >
                    <DollarSign className="text-green-600 mx-auto mb-2" size={48} />
                    <h3 className="text-2xl font-bold text-gray-800">Shipping Quote</h3>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex justify-between items-center p-4 bg-white rounded-lg"
                    >
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="text-2xl font-bold text-green-600">${quote.cost}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex justify-between items-center p-4 bg-white rounded-lg"
                    >
                      <span className="text-gray-600">Delivery Time:</span>
                      <span className="font-semibold text-blue-600">{quote.deliveryTime} days</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex justify-between items-center p-4 bg-white rounded-lg"
                    >
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-semibold text-purple-600">{quote.distance} km</span>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-6"
                    >
                      Book This Shipment
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Package className="text-gray-400 mx-auto mb-4" size={64} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-500">Fill in the shipping details to see your instant quote</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ShippingCalculator;
