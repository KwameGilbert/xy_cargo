import React, { createContext, useState, useContext, useEffect } from "react";
import { login as loginService } from "../services/client/authService";

// Create auth context
const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      if (response.success) {
        setCurrentUser(response.user);
        setIsAuthenticated(true);
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(response.user));
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.message || "Login failed" };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
