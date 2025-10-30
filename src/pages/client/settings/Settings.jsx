import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ClientLayout from "../../../components/client/layout/ClientLayout";
import AccountSettings from "../../../components/client/settings/AccountSettings";
import { getAuthHeader, getApiBaseUrl } from "../../../services/client/authService";
import { useToast } from "../../../contexts/ToastContext";

const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { success, error: showError } = useToast();

  useEffect(() => {
    // Set active tab based on URL hash if present
    if (location.hash) {
      const tab = location.hash.replace("#", "");
      if (["account"].includes(tab)) {
        setActiveTab(tab);
      }
    }

    fetchSettingsData();
  }, [location.hash]);

  const fetchSettingsData = async () => {
    try {
      setError(null);
      setLoading(true);

      const baseUrl = getApiBaseUrl();
      const headers = getAuthHeader();

      // Fetch user profile data
      const profileResponse = await axios.get(`${baseUrl}/clients/profile/data`, { headers });
      const profileData = profileResponse.data?.client;

      setUserData({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        email: profileData?.email || "",
        phoneNumber: profileData?.phone || "",
        company: profileData?.company || "",
        address: profileData?.address || "",
        customerId: profileData?.customerId || ""
      });

    } catch (err) {
      console.error("Error fetching settings:", err);
      setError("Failed to load settings. Please try again.");
      showError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`#${tab}`);
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  if (error || !userData) {
    return (
      <ClientLayout>
        <div className="p-4 bg-gray-50 min-h-screen">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium">{error || "Failed to load settings"}</div>
            <button
              onClick={fetchSettingsData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 space-y-1">
            <button
              onClick={() => handleTabChange("account")}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeTab === "account" ? "bg-red-50 text-red-700 border-l-4 border-red-500" : "hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {activeTab === "account" && (
                <AccountSettings userData={userData} onUpdateSuccess={fetchSettingsData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientSettings;