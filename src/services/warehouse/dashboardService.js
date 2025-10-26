// src/services/warehouse/dashboardService.js

import { getAuthHeader, getApiBaseUrl } from './authService';

// Centralized endpoints
const ENDPOINTS = {
  dashboardData: (warehouseId) => `${getApiBaseUrl()}/warehouse-staff/dashboard/data/${warehouseId}`,
};

/**
 * Fetch dashboard data for a specific warehouse
 * @param {number} warehouseId - The warehouse ID
 * @returns {Promise<Object>} Dashboard data or error
 */
export async function getDashboardData(warehouseId) {
  try {
    const res = await fetch(ENDPOINTS.dashboardData(warehouseId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader()
      },
    });

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      return {
        success: false,
        message: data.message || "Failed to fetch dashboard data"
      };
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Network error occurred"
    };
  }
}