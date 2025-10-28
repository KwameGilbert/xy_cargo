// src/services/ratesService.js
import axios from 'axios';
import { getApiBaseUrl } from './client/authService';

export const ratesService = {
  // Get all countries
  getCountries: async () => {
    const response = await axios.get(`${getApiBaseUrl()}/rates/countries`);
    return response.data;
  },

  // Get cities by country
  getCitiesByCountry: async (countryId) => {
    const response = await axios.get(`${getApiBaseUrl()}/rates/countries/${countryId}/cities`);
    return response.data;
  },

  // Get shipment types
  getShipmentTypes: async () => {
    const response = await axios.get(`${getApiBaseUrl()}/rates/shipment-types`);
    return response.data;
  },

  // Get cargo categories
  getCargoCategories: async () => {
    const response = await axios.get(`${getApiBaseUrl()}/rates/cargo-categories`);
    return response.data;
  },

  // Calculate rate
  calculateRate: async (calculationData) => {
    const response = await axios.post(`${getApiBaseUrl()}/rates/calculate`, calculationData);
    return response.data;
  }
};