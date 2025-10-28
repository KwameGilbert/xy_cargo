import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Calculator, Package, Plane, Ship, MapPin, Truck, DollarSign } from "lucide-react";
import { getApiBaseUrl } from '../../../services/client/authService';

const ShippingCalculator = ({ SEO }) => {
  const [formData, setFormData] = useState({
    fromCountry: '',
    toCountry: '',
    serviceType: '',
    category: '',
    weight: '',
    length: '',
    width: '',
    height: ''
  });

  const [countries, setCountries] = useState([]);
  const [shipmentTypes, setShipmentTypes] = useState([]);
  const [cargoCategories, setCargoCategories] = useState([]);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weightWarning, setWeightWarning] = useState('');

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesRes, shipmentTypesRes, cargoCategoriesRes] = await Promise.all([
          axios.get(`${getApiBaseUrl()}/rates/countries`),
          axios.get(`${getApiBaseUrl()}/rates/shipment-types`),
          axios.get(`${getApiBaseUrl()}/rates/cargo-categories`)
        ]);

        setCountries(countriesRes.data.data || []);
        setShipmentTypes(shipmentTypesRes.data.data || []);
        setCargoCategories(cargoCategoriesRes.data.data || []);

        // Set default values (China to Zambia if available)
        const china = countriesRes.data.data?.find(c => c.name === 'China');
        const zambia = countriesRes.data.data?.find(c => c.name === 'Zambia');

        if (china && zambia) {
          setFormData(prev => ({
            ...prev,
            fromCountry: china.country_id?.toString(),
            toCountry: zambia.country_id?.toString()
          }));
          // No need to fetch cities since we're not using them
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
        setError('Failed to load shipping data. Please refresh the page.');
      }
    };

    fetchInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['fromCountry', 'toCountry', 'serviceType', 'category'];
    
    for (const field of requiredFields) {
      if (!formData[field]) return false;
    }

    // Check package details based on service type
    const selectedCategory = cargoCategories.find(cat => cat.category_id === parseInt(formData.category));
    if (selectedCategory) {
      const isSeaFreight = shipmentTypes.find(type => type.type_id === parseInt(formData.serviceType))?.name?.toLowerCase().includes('sea');
      
      if (isSeaFreight) {
        // For sea freight, check dimensions
        if (!formData.length || !formData.width || !formData.height) return false;
        const dimensions = [formData.length, formData.width, formData.height].map(d => parseFloat(d));
        if (dimensions.some(d => isNaN(d) || d <= 0)) return false;
      } else {
        // For air freight, check weight/pieces
        if (selectedCategory.unit === 'pieces') {
          if (!formData.weight || parseInt(formData.weight) < 1) return false;
        } else {
          const minWeight = selectedCategory.min_quantity || 0.1;
          if (!formData.weight || parseFloat(formData.weight) < minWeight) return false;
        }
      }
    }

    return true;
  };

  const calculateShipping = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setQuote(null);

    try {
      const requestData = {
        originCountryId: parseInt(formData.fromCountry),
        destinationCountryId: parseInt(formData.toCountry),
        shipmentTypeId: parseInt(formData.serviceType),
        cargoCategoryId: parseInt(formData.category)
      };

      // Add package details based on service type
      const selectedCategory = cargoCategories.find(cat => cat.category_id === parseInt(formData.category));
      const isSeaFreight = shipmentTypes.find(type => type.type_id === parseInt(formData.serviceType))?.name?.toLowerCase().includes('sea');

      if (isSeaFreight) {
        // Calculate volume for sea freight
        const length = parseFloat(formData.length);
        const width = parseFloat(formData.width);
        const height = parseFloat(formData.height);
        const volume = (length * width * height) / 1000000; // Convert to CBM
        requestData.volume = volume;
      } else {
        // Add weight/pieces for air freight
        requestData.weight = selectedCategory.unit === 'pieces' ? parseInt(formData.weight) : parseFloat(formData.weight);
      }

      const response = await axios.post(`${getApiBaseUrl()}/rates/calculate`, requestData);

      if (response.data.status === 'success') {
        setQuote(response.data.data);
      } else {
        setError(response.data.message || 'Failed to calculate rate');
      }
    } catch (err) {
      console.error('Calculation error:', err);
      setError(err.response?.data?.message || 'Failed to calculate shipping rate. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <select
                    name="fromCountry"
                    value={formData.fromCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value="">Select Origin Country</option>
                    {countries.map(country => (
                      <option key={country.country_id} value={country.country_id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <select
                    name="toCountry"
                    value={formData.toCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value="">Select Destination Country</option>
                    {countries.map(country => (
                      <option key={country.country_id} value={country.country_id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Service Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {shipmentTypes.map(service => {
                    const IconComponent = service.icon || Package;
                    return (
                      <motion.div
                        key={service.type_id}
                        whileHover={{ scale: 1.02 }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          formData.serviceType === service.type_id.toString() 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData(prev => ({ 
                          ...prev, 
                          serviceType: service.type_id.toString(),
                          category: '' // Reset category when service changes
                        }))}
                      >
                        <div className="flex items-center mb-2">
                          <IconComponent className="text-red-500 mr-2" size={20} />
                          <span className="font-medium text-gray-800">{service.name}</span>
                        </div>
                        {/* <p className="text-sm text-gray-600">{service.description}</p> */}
                        <p className="text-xs text-gray-500 mt-1">Estimated delivery: {service.estimated_days} days</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              {formData.serviceType && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Cargo Category</h3>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      disabled={loading}
                    >
                      <option value="">Select Category</option>
                      {cargoCategories.filter(cat => cat.shipment_type_id === parseInt(formData.serviceType)).map(category => (
                        <option key={category.category_id} value={category.category_id}>
                          {category.name} - ${category.base_rate}/{category.unit}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {formData.category && (
                    <p className="mt-2 text-sm text-gray-500">
                      {cargoCategories.find(cat => cat.category_id === parseInt(formData.category))?.description || 'Please enter package details below.'}
                    </p>
                  )}
                </div>
              )}
              {formData.category && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Package Details</h3>
                  {(() => {
                    const selectedCategory = cargoCategories.find(cat => cat.category_id === parseInt(formData.category));
                    const isSeaFreight = shipmentTypes.find(type => type.type_id === parseInt(formData.serviceType))?.name?.toLowerCase().includes('sea');
                    
                    if (isSeaFreight) {
                      return (
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
                      );
                    } else {
                      const isPieces = selectedCategory?.unit === 'pieces';
                      const minValue = selectedCategory?.min_quantity || (isPieces ? 1 : 0.1);
                      
                      return (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isPieces ? 'Number of Pieces *' : 'Weight (kg) *'}
                          </label>
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            placeholder={minValue.toString()}
                            min={minValue}
                            step={isPieces ? "1" : "0.1"}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${weightWarning ? 'border-red-500' : ''}`}
                            required
                          />
                          {weightWarning && (
                            <div className="text-red-500 text-sm mt-2">{weightWarning}</div>
                          )}
                          {selectedCategory && (
                            <p className="mt-2 text-sm text-gray-500">
                              Minimum {isPieces ? 'pieces' : 'weight'}: {minValue} {selectedCategory.unit}
                            </p>
                          )}
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
              {formData.category && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculateShipping}
                  disabled={loading || !isFormValid()}
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
              )}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          </motion.div>
          <motion.div variants={sectionVariants} className="lg:col-span-1">
            {quote ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Quote</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{quote.origin_country} → {quote.destination_country}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{quote.shipment_type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{quote.cargo_category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium">{quote.estimated_days} days</span>
                  </div>
                  {quote.weight !== undefined && quote.weight !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{quote.unit === "pieces" ? "Pieces:" : "Weight:"}</span>
                      <span className="font-medium">{quote.weight} {quote.unit}</span>
                    </div>
                  )}
                  {quote.volume !== undefined && quote.volume !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium">{quote.volume} CBM</span>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold text-red-500 pt-2">
                      <span>Total Cost:</span>
                      <span>${quote.total_cost} USD</span>
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
                    <p>* Rates are subject to change without notice.</p>
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
                  {shipmentTypes.length > 0 && (
                    <>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700 mb-2">Available Services:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {shipmentTypes.map(type => (
                            <li key={type.type_id}>• {type.name}: {type.description}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700 mb-2">Cargo Categories:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {cargoCategories.slice(0, 6).map(category => (
                            <li key={category.category_id}>• {category.name}: ${category.base_rate}/{category.unit}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
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
