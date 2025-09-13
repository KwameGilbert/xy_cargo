import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ClientLayout from "../../../components/client/layout/ClientLayout";
import AccountSettings from "../../../components/client/settings/AccountSettings";
import NotificationSettings from "../../../components/client/settings/NotificationSettings";
import SecuritySettings from "../../../components/client/settings/SecuritySettings";
import PreferenceSettings from "../../../components/client/settings/PreferenceSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set active tab based on URL hash if present
    if (location.hash) {
      const tab = location.hash.replace("#", "");
      setActiveTab(tab);
    }

    const fetchSettings = async () => {
      try {
        const response = await axios.get("/data/settings.json");
        setSettingsData(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [location.hash]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`#${tab}`);
  };

  if (loading || !settingsData) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
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
            
            <button
              onClick={() => handleTabChange("notifications")}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeTab === "notifications" ? "bg-red-50 text-red-700 border-l-4 border-red-500" : "hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notifications
            </button>
            
            <button
              onClick={() => handleTabChange("security")}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeTab === "security" ? "bg-red-50 text-red-700 border-l-4 border-red-500" : "hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Security
            </button>
            
            <button
              onClick={() => handleTabChange("preferences")}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeTab === "preferences" ? "bg-red-50 text-red-700 border-l-4 border-red-500" : "hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preferences
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {activeTab === "account" && (
                <AccountSettings userData={settingsData.user} />
              )}
              
              {activeTab === "notifications" && (
                <NotificationSettings notificationPreferences={settingsData.notificationPreferences} />
              )}
              
              {activeTab === "security" && (
                <SecuritySettings securitySettings={settingsData.securitySettings} />
              )}
              
              {activeTab === "preferences" && (
                <PreferenceSettings systemPreferences={settingsData.systemPreferences} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Settings;