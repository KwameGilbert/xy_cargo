// src/services/warehouse/dashboardService.js

import { getAuthHeader, getApiBaseUrl } from './authService';

// Centralized endpoints
const ENDPOINTS = {
  dashboardData: `${getApiBaseUrl()}/warehouse-staff/dashboard/data`,
};

/**
 * Fetch dashboard data for a specific warehouse
 * @returns {Promise<Object>} Dashboard data or error
 */
export async function getDashboardData() {
  try {
    const res = await fetch(ENDPOINTS.dashboardData, {
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