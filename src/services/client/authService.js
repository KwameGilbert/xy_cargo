// src/services/client/authService.js
import { users } from "../../data/users.json.js";

// Toggle this to false when real API is ready
const USE_MOCK = true;

// Centralized endpoints (easy to update later)
const ENDPOINTS = {
  login: "/api/auth/login",
};

// Core login function (returns a normalized response)
export async function login(email, password) {
  if (USE_MOCK) {
    return mockLogin(email, password);
  }
  return apiLogin(email, password);
}

// Mock implementation (kept minimal & deterministic)
function mockLogin(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) {
        resolve({ success: false, message: "Invalid email or password" });
        return;
      }
      resolve({
        success: true,
        user: { id: user.id, name: user.name, email: user.email },
        token: "mock-token-" + btoa(user.email),
      });
    }, 400);
  });
}

// Real API implementation placeholder
async function apiLogin(email, password) {
  try {
    const res = await fetch(ENDPOINTS.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      return { success: false, message: "Login failed" };
    }
    const data = await res.json();
    return {
      success: true,
      user: data.user,
      token: data.token,
    };
  } catch (e) {
    return { success: false, message: e.message || "Network error" };
  }
}

// Utility to switch to API mode programmatically later if needed
export function isMockAuth() {
  return USE_MOCK;
}
