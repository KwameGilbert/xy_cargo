import { motion } from "framer-motion";
import { useState } from "react";
import { Calculator, Package, Plane, Ship } from "lucide-react";

const ShippingCalculator = ({ SEO }) => {
  const [formData, setFormData] = useState({
    fromCountry: "China",
    toCountry: "Zambia",
    weight: "",
    length: "",
    width: "",
    height: "",
    packageType: "standard",
    serviceType: "standard",
    category: "normal"
  });
  const [weightWarning, setWeightWarning] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const serviceTypes = [
    { id: "standard", name: "Standard Air Freight", icon: Plane, description: "10-17 business days", multiplier: 1.0 },
    { id: "express", name: "Express Air Freight", icon: Plane, description: "3-5 business days", multiplier: 1.5 },
    { id: "sea", name: "Sea Freight", icon: Ship, description: "40-60 business days", multiplier: 1.0 }
  ];

  const categoryTypes = [
    { id: "normal", name: "Normal Goods", rate: 12, service: "air" },
    { id: "wigs", name: "Wigs", rate: 14, service: "air" },
    { id: "phones", name: "Phones", rate: 11, unit: "per piece", service: "air" },
    { id: "battery", name: "Battery Goods/Cosmetics/Toner Cartridges/Medicine", rate: 14, service: "air" },
    { id: "laptop", name: "Laptops and iPads", rate: 16, service: "air" },
    { id: "sea_general", name: "General Goods (Sea)", rate: 300, unit: "CBM", service: "sea" },
    { id: "sea_special", name: "Special Goods (Sea)", rate: 330, unit: "CBM", service: "sea" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "weight") {
      // Only show warning for express
      if (formData.serviceType === "express" && value !== "" && parseFloat(value) < 5) {
        setWeightWarning("Minimum allowed weight for Express is 5kg.");
      } else {
        setWeightWarning("");
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateShipping = () => {
    if (formData.serviceType !== 'sea') {
      if (!formData.weight) {
        alert("Please enter weight for air freight");
        return;
      }
      // Only enforce minimum for express
      if (formData.serviceType === 'express' && parseFloat(formData.weight) < 5) {
        setWeightWarning("Minimum allowed weight for Express is 5kg.");
        return;
      }
    }
    if (formData.serviceType === 'sea' && (!formData.length || !formData.width || !formData.height)) {
      alert("Please enter dimensions for sea freight");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      let cost = 0;
      let description = '';
      const selectedCategory = categoryTypes.find(cat => cat.id === formData.category);
      if (formData.serviceType !== 'sea') {
        // Only apply minimum for express
        const weight = formData.serviceType === 'express'
          ? Math.max(parseFloat(formData.weight) || 0, 5)
          : parseFloat(formData.weight) || 0;
        cost = weight * selectedCategory.rate;
        if (formData.serviceType === 'express') {
          cost *= 1.5;
        }
        description = formData.serviceType === 'standard' ? '10-17 business days' : '7-9 business days';
      } else {
        const lengthM = parseFloat(formData.length) / 100;
        const widthM = parseFloat(formData.width) / 100;
        const heightM = parseFloat(formData.height) / 100;
        const volumeCBM = lengthM * widthM * heightM;
        if (volumeCBM < 0.1) {
          cost = 50;
        } else {
          cost = volumeCBM * (formData.category === 'sea_special' ? 330 : 300);
        }
        description = '30-45 business days';
      }
      const serviceType = serviceTypes.find(s => s.id === formData.serviceType);
      const mockApiResponse = {
        quote: {
          basePrice: cost.toFixed(2),
          total: cost.toFixed(2),
          currency: "USD",
          service: {
            id: serviceType.id,
            name: serviceType.name,
            description: serviceType.description
          },
          category: selectedCategory.name,
          estimatedDays: description,
          route: {
            origin: "Foshan, China",
            destination: "Lusaka, Zambia"
          },
          measurements: formData.serviceType === 'sea' 
            ? {
                volume: ((parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height)) / 1000000).toFixed(2),
                unit: "CBM",
                dimensions: {
                  length: parseFloat(formData.length),
                  width: parseFloat(formData.width),
                  height: parseFloat(formData.height),
                  unit: "cm"
                }
              }
            : {
                weight: formData.serviceType === 'express'
                  ? Math.max(parseFloat(formData.weight) || 0, 5)
                  : parseFloat(formData.weight) || 0,
                unit: selectedCategory.id === "phones" ? "pieces" : "kg"
              },
          priceBreakdown: {
            baseCost: cost.toFixed(2),
            fees: "0.00",
            taxes: "0.00",
            discounts: "0.00",
            total: cost.toFixed(2)
          },
          additionalInfo: {
            minCharge: formData.serviceType === 'sea' ? "0.1 CBM ($50)" : "1 kg",
            storagePolicy: "Packages left unclaimed for more than 3 days will be charged $2 per day."
          }
        }
      };
      setQuote(mockApiResponse.quote);
      setLoading(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-gray-50 py-16">
      {SEO}
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={sectionVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="text-red-500 mr-3" size={48} />
            <h1 className="text-4xl font-bold text-gray-800">China to Zambia Shipping Calculator</h1>
          </div>
          <p className="text-xl text-gray-600">Get instant quotes for your shipments from China to Zambia</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <motion.div variants={sectionVariants} className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculate Your Shipping Cost</h2>
              {/* Origin & Destination, Service Type, Category Type, Package Details, Calculate Button */}
              {/* ...existing code... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <select
                    name="fromCountry"
                    value={formData.fromCountry}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  >
                    <option value="China">China (Foshan)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <select
                    name="toCountry"
                    value={formData.toCountry}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  >
                    <option value="Zambia">Zambia (Lusaka)</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Service Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        onClick={() => setFormData(prev => ({ 
                          ...prev, 
                          serviceType: service.id,
                          category: service.id === 'sea' ? 'sea_general' : 'normal'
                        }))}
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
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Cargo Category</h3>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {formData.serviceType !== 'sea' ? (
                      categoryTypes.filter(cat => cat.service === "air").map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} - ${category.rate}/{category.unit || "kg"}
                        </option>
                      ))
                    ) : (
                      categoryTypes.filter(cat => cat.service === "sea").map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} - ${category.rate}/{category.unit}
                        </option>
                      ))
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {formData.serviceType !== 'sea' 
                    ? formData.category === 'phones'
                      ? 'For phones, enter the number of pieces.'
                      : formData.serviceType === 'express'
                        ? 'For express air freight, minimum weight is 5kg.'
                        : 'For standard air freight, no minimum weight.'
                    : 'For sea freight, minimum charge is $50 (0.1 CBM).'}
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Package Details</h3>
                {formData.serviceType !== 'sea' ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {formData.category === 'phones' ? 'Number of Pieces *' : 'Weight (kg) *'}
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder={formData.category === 'phones' ? "1" : "5.0"}
                      min="5"
                      step={formData.category === 'phones' ? "1" : "0.1"}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${weightWarning ? 'border-red-500' : ''}`}
                      required
                    />
                    {weightWarning && (
                      <div className="text-red-500 text-sm mt-2">{weightWarning}</div>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="mb-4 text-sm text-gray-600">Enter package dimensions to calculate volume in cubic meters (CBM)</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Length (cm) *</label>
                        <input
                          type="number"
                          name="length"
                          value={formData.length}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Width (cm) *</label>
                        <input
                          type="number"
                          name="width"
                          value={formData.width}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm) *</label>
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    {formData.length && formData.width && formData.height && (
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          Estimated volume: 
                          <span className="font-medium ml-1">
                            {((parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height)) / 1000000).toFixed(2)} CBM
                          </span>
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
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
          <motion.div variants={sectionVariants} className="lg:col-span-1">
            {quote ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Quote</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{quote.route.origin} → {quote.route.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{quote.service.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{quote.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium">{quote.estimatedDays}</span>
                  </div>
                  {quote.measurements.weight !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{quote.measurements.unit === "pieces" ? "Pieces:" : "Weight:"}</span>
                      <span className="font-medium">{quote.measurements.weight} {quote.measurements.unit}</span>
                    </div>
                  )}
                  {quote.measurements.volume !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium">{quote.measurements.volume} {quote.measurements.unit}</span>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold text-red-500 pt-2">
                      <span>Total Cost:</span>
                      <span>${quote.total} {quote.currency}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center"
                    >
                      <Package className="mr-2" size={16} />
                      Book Shipment
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://wa.me/260967379139?text=I'd%20like%20to%20get%20a%20shipping%20quote%20for%20my%20package%20from%20China%20to%20Zambia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                      </svg>
                      Chat on WhatsApp
                    </motion.a>
                  </div>
                  <div className="text-xs text-gray-500 mt-4">
                    <p>* This is an estimate. Final cost may vary based on actual weight, dimensions, and additional services.</p>
                    <p>* {quote.additionalInfo.storagePolicy}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <Package className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-500">Fill in the details and click calculate to see your shipping quote</p>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2">Air Services Pricing:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Normal goods: $12/kg</li>
                      <li>• Wigs: $14/kg</li>
                      <li>• Phones: $11/piece</li>
                      <li>• Battery/Cosmetics/Toner/Medicine: $14/kg</li>
                      <li>• Laptops & iPads: $16/kg</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2">Sea Services Pricing:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• General Goods: $300/CBM</li>
                      <li>• Special Goods: $330/CBM</li>
                      <li>• Minimum charge: $50 (0.1 CBM)</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2">Delivery Times:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Standard Air: 10-17 days</li>
                      <li>• Express Air: 7-9 days</li>
                      <li>• Sea Freight: 30-45 days</li>
                    </ul>
                  </div>
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
