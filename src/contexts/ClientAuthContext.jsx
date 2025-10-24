import React, { createContext, useState, useContext, useEffect } from "react";
import { login as loginService, getToken, getUser, saveToken, saveUser, removeToken, removeUser } from "../services/client/authService";

// Create client auth context
const ClientAuthContext = createContext();

// Custom hook for using client auth context
export const useClientAuth = () => {
  return useContext(ClientAuthContext);
};

// ClientAuthProvider component
export const ClientAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedToken = getToken();
      const storedUser = getUser();
      if (storedToken && storedUser) {
        setToken(storedToken);
        setCurrentUser(storedUser);
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
        setToken(response.token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message || "Login failed" };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setIsAuthenticated(false);
    removeToken();
    removeUser();
  };

  // Context value
  const value = {
    currentUser,
    token,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <ClientAuthContext.Provider value={value}>
      {children}
    </ClientAuthContext.Provider>
  );
};