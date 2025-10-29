// src/services/warehouse/authService.js

const APP_ENV = import.meta.env.VITE_APP_ENV || "development"
const PROD_API_BASE_URL = import.meta.env.VITE_PROD_API_BASE_URL
const DEV_API_BASE_URL = import.meta.env.VITE_DEV_API_BASE_URL

// Determine the active environment and select the appropriate base URL
const isDevelopment = APP_ENV === 'development';

const API_BASE_URL = isDevelopment
  ? DEV_API_BASE_URL
  : PROD_API_BASE_URL;
// Centralized endpoints
const ENDPOINTS = {
  login: `${API_BASE_URL}/auth/warehouse-staff/login`,
  profile: `${API_BASE_URL}/warehouse/profile`,
};

// Token storage keys
const TOKEN_KEY = 'xy_cargo_warehouse_token';
const USER_KEY = 'xy_cargo_warehouse_user';

// Core login function
export async function login(email, password) {
  try {
    const res = await fetch(ENDPOINTS.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      return {
        success: false,
        message: data.message || "Login failed"
      };
    }

    // Save token and user data
    saveToken(data.token);
    saveUser(data.data);

    return {
      success: true,
      user: {
        id: data.data.warehouse_staff_id || data.data.id,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        name: `${data.data.firstName} ${data.data.lastName}`,
        email: data.data.email,
        phone: data.data.phone,
        role: data.data.role || 'Staff',
        warehouseId: data.data.warehouse_id,
        warehouseName: data.data.warehouse_name,
      },
      token: data.token,
    };
  } catch (e) {
    return { success: false, message: e.message || "Network error" };
  }
}

// Get warehouse profile
export async function getWarehouseProfile() {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, message: "No authentication token" };
    }

    const res = await fetch(ENDPOINTS.profile, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      return {
        success: false,
        message: data.message || "Failed to get profile"
      };
    }

    return {
      success: true,
      profile: data.data
    };
  } catch (e) {
    return { success: false, message: e.message || "Network error" };
  }
}

// Token management functions
export function saveToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to save warehouse token:', e);
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to get warehouse token:', e);
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove warehouse token:', e);
  }
}

// User data management functions
export function saveUser(userData) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (e) {
    console.error('Failed to save warehouse user data:', e);
  }
}

export function getUser() {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('Failed to get warehouse user data:', e);
    return null;
  }
}

export function removeUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to remove warehouse user data:', e);
  }
}

// Authentication state functions
export function isAuthenticated() {
  const token = getToken();
  const user = getUser();
  return !!(token && user);
}

export function logout() {
  removeToken();
  removeUser();
}

// Get authorization header for API requests
export function getAuthHeader() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Utility to get API base URL
export function getApiBaseUrl() {
  return API_BASE_URL;
}