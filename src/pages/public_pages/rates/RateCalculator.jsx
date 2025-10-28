import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calculator, MapPin, Truck, Package, DollarSign } from 'lucide-react';
import MainLayout from '../../../components/public_pages/layout/MainLayout';
import { getApiBaseUrl } from '../../../services/client/authService';

const RateCalculator = () => {
  const [formData, setFormData] = useState({
    originCountryId: '',
    originCityId: '',
    destinationCountryId: '',
    destinationCityId: '',
    shipmentTypeId: '',
    cargoCategoryId: '',
    weight: '',
    pieces: '',
    cbm: ''
  });

  const [options, setOptions] = useState({
    countries: [],
    originCities: [],
    destinationCities: [],
    shipmentTypes: [],
    cargoCategories: []
  });

  const [calculation, setCalculation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesRes, shipmentTypesRes, cargoCategoriesRes] = await Promise.all([
          axios.get(`${getApiBaseUrl()}/rates/countries`),
          axios.get(`${getApiBaseUrl()}/rates/shipment-types`),
          axios.get(`${getApiBaseUrl()}/rates/cargo-categories`)
        ]);

        setOptions({
          countries: countriesRes.data.data || [],
          shipmentTypes: shipmentTypesRes.data.data || [],
          cargoCategories: cargoCategoriesRes.data.data || [],
          originCities: [],
          destinationCities: []
        });
      } catch (err) {
        console.error('Failed to load initial data:', err);
        setError('Failed to load form data. Please refresh the page.');
      }
    };

    fetchInitialData();
  }, []);

  // Fetch cities when country changes
  const fetchCities = async (countryId, type) => {
    if (!countryId) return;

    try {
      const response = await axios.get(`${getApiBaseUrl()}/rates/countries/${countryId}/cities`);
      const cities = response.data.data || [];
      
      setOptions(prev => ({
        ...prev,
        [type === 'origin' ? 'originCities' : 'destinationCities']: cities
      }));
    } catch (err) {
      console.error('Failed to load cities:', err);
    }
  };

  const handleCountryChange = (e, type) => {
    const countryId = e.target.value;
    setFormData(prev => ({
      ...prev,
      [type === 'origin' ? 'originCountryId' : 'destinationCountryId']: countryId,
      [type === 'origin' ? 'originCityId' : 'destinationCityId']: '' // Reset city when country changes
    }));
    
    fetchCities(countryId, type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = async () => {
    // Validate required fields
    const required = ['originCountryId', 'destinationCountryId', 'shipmentTypeId', 'cargoCategoryId'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      setError(`Please select: ${missing.join(', ')}`);
      return;
    }

    setLoading(true);
    setError('');
    setCalculation(null);

    try {
      const response = await axios.post(`${getApiBaseUrl()}/rates/calculate`, formData);
      
      if (response.data.status === 'success') {
        setCalculation(response.data.data);
      } else {
        setError(response.data.message || 'Failed to calculate rate');
      }
    } catch (err) {
      console.error('Calculation error:', err);
      setError(err.response?.data?.message || 'Failed to calculate rate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedRate = () => {
    return options.cargoCategories.find(cat => cat.category_id == formData.cargoCategoryId);
  };

  const getSelectedShipmentType = () => {
    return options.shipmentTypes.find(type => type.type_id == formData.shipmentTypeId);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-red-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Rate Calculator</h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate shipping costs for your cargo from China to Zambia
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Route Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-6 w-6 text-red-600 mr-2" />
                Select Route
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From (Origin)</label>
                  <select
                    value={formData.originCountryId}
                    onChange={(e) => handleCountryChange(e, 'origin')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Country</option>
                    {options.countries.map(country => (
                      <option key={country.country_id} value={country.country_id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  
                  {formData.originCountryId && (
                    <select
                      name="originCityId"
                      value={formData.originCityId}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select City (Optional)</option>
                      {options.originCities.map(city => (
                        <option key={city.city_id} value={city.city_id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To (Destination)</label>
                  <select
                    value={formData.destinationCountryId}
                    onChange={(e) => handleCountryChange(e, 'destination')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Country</option>
                    {options.countries.map(country => (
                      <option key={country.country_id} value={country.country_id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  
                  {formData.destinationCountryId && (
                    <select
                      name="destinationCityId"
                      value={formData.destinationCityId}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select City (Optional)</option>
                      {options.destinationCities.map(city => (
                        <option key={city.city_id} value={city.city_id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Service Type */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Truck className="h-6 w-6 text-red-600 mr-2" />
                Service Type
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.shipmentTypes.map(type => (
                  <label key={type.type_id} className="flex items-center">
                    <input
                      type="radio"
                      name="shipmentTypeId"
                      value={type.type_id}
                      checked={formData.shipmentTypeId == type.type_id}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-700 font-medium">{type.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cargo Category */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Package className="h-6 w-6 text-red-600 mr-2" />
                Cargo Category
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {options.cargoCategories.map(category => (
                  <div key={category.category_id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                    <label className="flex items-start">
                      <input
                        type="radio"
                        name="cargoCategoryId"
                        value={category.category_id}
                        checked={formData.cargoCategoryId == category.category_id}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 mt-1"
                      />
                      <div className="ml-3 flex-1">
                        <span className="text-gray-900 font-medium block">{category.name}</span>
                        {category.description && (
                          <span className="text-sm text-gray-500 block mt-1">{category.description}</span>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Cargo Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cargo Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter weight"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pieces</label>
                  <input
                    type="number"
                    name="pieces"
                    value={formData.pieces}
                    onChange={handleInputChange}
                    placeholder="Enter pieces"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Volume (CBM)</label>
                  <input
                    type="number"
                    name="cbm"
                    value={formData.cbm}
                    onChange={handleInputChange}
                    placeholder="Enter volume"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Calculate Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Calculating...' : 'Calculate Rate'}
              </button>
            </div>

            {/* Calculation Results */}
            {calculation && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                  Calculation Results
                </h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Route Summary */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Route Summary</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">From:</span> {options.countries.find(c => c.country_id == formData.originCountryId)?.name}</p>
                        <p><span className="font-medium">To:</span> {options.countries.find(c => c.country_id == formData.destinationCountryId)?.name}</p>
                        <p><span className="font-medium">Service:</span> {getSelectedShipmentType()?.name}</p>
                        <p><span className="font-medium">Cargo:</span> {getSelectedRate()?.name}</p>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Cost Breakdown</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Base Cost:</span>
                          <span>${calculation.calculation.baseCost.toFixed(2)}</span>
                        </div>
                        
                        {calculation.calculation.additionalCosts.map((cost, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {cost.type === 'weight' && `Weight (${cost.chargeable}kg @ $${cost.costPerUnit}/kg):`}
                              {cost.type === 'pieces' && `Pieces (${cost.chargeable} @ $${cost.costPerUnit}/piece):`}
                              {cost.type === 'cbm' && `Volume (${cost.chargeable}cbm @ $${cost.costPerUnit}/cbm):`}
                            </span>
                            <span>${cost.cost.toFixed(2)}</span>
                          </div>
                        ))}
                        
                        <div className="border-t pt-2 flex justify-between font-bold text-lg">
                          <span>Total Cost:</span>
                          <span className="text-green-600">${calculation.calculation.totalCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RateCalculator;