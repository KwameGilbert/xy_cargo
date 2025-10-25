// src/services/client/authService.js
const APP_ENV = "development"
const PROD_API_BASE_URL = "https://api.xycargozm.com/v1"
const DEV_API_BASE_URL = "http://app.xycargo.com/v1"

// Determine the active environment and select the appropriate base URL
const isDevelopment = APP_ENV === 'development';

const API_BASE_URL = isDevelopment
  ? DEV_API_BASE_URL
  : PROD_API_BASE_URL;
// Centralized endpoints
const ENDPOINTS = {
  login: `${API_BASE_URL}/auth/client/login`,
  signup: `${API_BASE_URL}/auth/client/signup`,
};

// Token storage keys
const TOKEN_KEY = 'xy_cargo_client_token';
const USER_KEY = 'xy_cargo_client_user';

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
        id: data.data.client_id,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        name: `${data.data.firstName} ${data.data.lastName}`,
        email: data.data.email,
        phone: data.data.phone,
        address: data.data.address,
        company: data.data.company
      },
      token: data.token,
    };
  } catch (e) {
    return { success: false, message: e.message || "Network error" };
  }
}

// Core signup function
export async function signup(userData) {
  try {
    const res = await fetch(ENDPOINTS.signup, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      return {
        success: false,
        message: data.message || "Signup failed"
      };
    }

    return {
      success: true,
      user: {
        id: data.client.client_id,
        firstName: data.client.firstName,
        lastName: data.client.lastName,
        name: `${data.client.firstName} ${data.client.lastName}`,
        email: data.client.email,
        phone: data.client.phone,
        address: data.client.address,
        company: data.client.company
      },
      message: data.message
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
    console.error('Failed to save token:', e);
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to get token:', e);
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove token:', e);
  }
}

// User data management functions
export function saveUser(userData) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (e) {
    console.error('Failed to save user data:', e);
  }
}

export function getUser() {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('Failed to get user data:', e);
    return null;
  }
}

export function removeUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to remove user data:', e);
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

// Utility to update API base URL if needed
export function setApiBaseUrl(url) {
  // This would require updating the endpoints, but for now we'll keep it static
  console.warn('API base URL is static and cannot be changed at runtime');
}
