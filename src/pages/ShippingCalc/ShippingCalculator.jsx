import { motion } from "framer-motion";
import { useState } from "react";
import { Calculator, Package, Truck, Plane, Ship, Clock, DollarSign } from "lucide-react";
import SEO from "../../components/common/SEO/SEO";

const ShippingCalculator = () => {
  const [formData, setFormData] = useState({
    fromCountry: "",
    fromCity: "",
    toCountry: "",
    toCity: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    packageType: "standard",
    serviceType: "standard"
  });

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const packageTypes = [
    { id: "envelope", name: "Envelope/Document", icon: "📄" },
    { id: "standard", name: "Standard Package", icon: "📦" },
    { id: "fragile", name: "Fragile Items", icon: "🔮" },
    { id: "oversized", name: "Oversized Package", icon: "📏" }
  ];

  const serviceTypes = [
    { 
      id: "economy", 
      name: "Economy", 
      icon: Ship, 
      description: "5-10 business days",
      multiplier: 0.8
    },
    { 
      id: "standard", 
      name: "Standard", 
      icon: Truck, 
      description: "3-5 business days",
      multiplier: 1.0
    },
    { 
      id: "express", 
      name: "Express", 
      icon: Plane, 
      description: "1-2 business days",
      multiplier: 1.8
    },
    { 
      id: "overnight", 
      name: "Overnight", 
      icon: Clock, 
      description: "Next business day",
      multiplier: 2.5
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateShipping = () => {
    if (!formData.fromCountry || !formData.toCountry || !formData.weight) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const baseRate = 15;
      const weightRate = parseFloat(formData.weight) * 2.5;
      const volumeRate = (parseFloat(formData.length || 0) * parseFloat(formData.width || 0) * parseFloat(formData.height || 0)) / 1000;
      const serviceMultiplier = serviceTypes.find(s => s.id === formData.serviceType)?.multiplier || 1;
      
      const basePrice = (baseRate + weightRate + volumeRate) * serviceMultiplier;
      const insurance = basePrice * 0.05;
      const total = basePrice + insurance;

      setQuote({
        basePrice: basePrice.toFixed(2),
        insurance: insurance.toFixed(2),
        total: total.toFixed(2),
        service: serviceTypes.find(s => s.id === formData.serviceType),
        estimatedDays: serviceTypes.find(s => s.id === formData.serviceType)?.description
      });
      setLoading(false);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-16"
    >
      <SEO 
        title="Shipping Calculator"
        description="Calculate your shipping costs with XY Cargo Zambia's shipping calculator. Get instant quotes for air freight, sea freight, and special handling services."
        keywords="shipping calculator, freight calculator, shipping cost, shipping rates, calculate shipping cost"
        canonical="https://xycargozm.com/shipping-calculator"
      />
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={sectionVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="text-red-500 mr-3" size={48} />
            <h1 className="text-4xl font-bold text-gray-800">Shipping Calculator</h1>
          </div>
          <p className="text-xl text-gray-600">
            Get instant quotes for your shipments with our advanced calculator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <motion.div variants={sectionVariants} className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculate Your Shipping Cost</h2>
              
              {/* Origin & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Country *</label>
                  <select
                    name="fromCountry"
                    value={formData.fromCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                    <option value="FR">France</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Country *</label>
                  <select
                    name="toCountry"
                    value={formData.toCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>

              {/* Package Details */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Package Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="0.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                    <select
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {packageTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.icon} {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (cm)</label>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width (cm)</label>
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Service Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceTypes.map(service => {
                    const IconComponent = service.icon;
                    return (
                      <motion.div
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          formData.serviceType === service.id 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, serviceType: service.id }))}
                      >
                        <div className="flex items-center mb-2">
                          <IconComponent className="text-red-500 mr-2" size={20} />
                          <span className="font-medium text-gray-800">{service.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Calculate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calculateShipping}
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2" size={18} />
                    Calculate Shipping Cost
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Quote Results */}
          <motion.div variants={sectionVariants} className="lg:col-span-1">
            {quote ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Quote</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{quote.service.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium">{quote.estimatedDays}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Base Rate:</span>
                      <span>${quote.basePrice}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Insurance:</span>
                      <span>${quote.insurance}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-lg font-semibold text-red-500 border-t pt-2">
                      <span>Total:</span>
                      <span>${quote.total}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                  >
                    Book Shipment
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <Package className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-500">Fill in the details and click calculate to see your shipping quote</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingCalculator;
