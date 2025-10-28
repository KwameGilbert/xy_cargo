// src/services/trackingService.js

import { getApiBaseUrl } from './client/authService';

// Centralized endpoints
const ENDPOINTS = {
  trackParcel: (trackingNumber) => `${getApiBaseUrl()}/parcels/track/${trackingNumber}`,
};

/**
 * Track a parcel by tracking number
 * @param {string} trackingNumber - The tracking number to search for
 * @returns {Promise<Object>} Tracking data or error
 */
export async function trackParcel(trackingNumber) {
  try {
    const res = await fetch(ENDPOINTS.trackParcel(trackingNumber), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to track parcel",
        code: res.status
      };
    }

    if (data.status !== 'success') {
      return {
        success: false,
        message: data.message || "Parcel not found",
        code: 404
      };
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Network error occurred",
      code: 500
    };
  }
}