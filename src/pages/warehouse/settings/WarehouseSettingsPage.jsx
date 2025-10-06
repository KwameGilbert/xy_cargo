import React, { useState, useEffect } from "react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";
import AccountSettings from "../../../components/warehouse/settings/AccountSettings";
import NotificationSettings from "../../../components/warehouse/settings/NotificationSettings";
import SystemSettings from "../../../components/warehouse/settings/SystemSettings";

const WarehouseSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/data/warehouseSettings.json");
        const data = await response.json();
        setSettingsData(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <WarehouseLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading settings...</p>
        </div>
      </WarehouseLayout>
    );
  }

  return (
    <WarehouseLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("account")}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "account"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "notifications"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "system"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              System
            </button>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === "account" && (
              <AccountSettings userData={settingsData.user} />
            )}
            {activeTab === "notifications" && (
              <NotificationSettings notificationPreferences={settingsData.notificationPreferences} />
            )}
            {activeTab === "system" && (
              <SystemSettings systemPreferences={settingsData.systemPreferences} />
            )}
          </div>
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseSettingsPage;