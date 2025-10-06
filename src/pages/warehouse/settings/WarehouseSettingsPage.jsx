import { useState, useEffect } from "react";
import { Settings, User, Bell, Sliders, Loader2 } from "lucide-react";
import WarehouseLayout from "../../../components/warehouse/layout/WarehouseLayout";

// Mock components for demonstration
const AccountSettings = ({ userData }) => (

  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            defaultValue={userData?.name || "John Doe"}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue={userData?.email || "john@warehouse.com"}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            defaultValue={userData?.phone || "+233 XX XXX XXXX"}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
    <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-sm">
      Save Changes
    </button>
  </div>
);

const NotificationSettings = ({ notificationPreferences }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        {[
          { id: "email", label: "Email Notifications", description: "Receive updates via email" },
          { id: "sms", label: "SMS Alerts", description: "Get text message notifications" },
          { id: "push", label: "Push Notifications", description: "Browser push notifications" },
          { id: "shipment", label: "Shipment Updates", description: "Notifications for shipment status changes" }
        ].map((item) => (
          <div key={item.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
    <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-sm">
      Save Preferences
    </button>
  </div>
);

const SystemSettings = ({ systemPreferences }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Preferences</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
            <option>GMT (West Africa Time)</option>
            <option>UTC</option>
            <option>EST</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
    <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-sm">
      Update Settings
    </button>
  </div>
);

const WarehouseSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate API call with mock data
        setTimeout(() => {
          setSettingsData({
            user: {
              name: "John Doe",
              email: "john@warehouse.com",
              phone: "+233 XX XXX XXXX"
            },
            notificationPreferences: {},
            systemPreferences: {}
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "System", icon: Sliders }
  ];

  if (loading) {
    return (
      <WarehouseLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading settings...</p>
          </div>
        </div>
      </WarehouseLayout>
    );
  }

  return (
    <WarehouseLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                <Settings className="w-6 h-6 text-red-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
            </div>
            <p className="text-gray-600 ml-14">Manage your account and preferences</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 bg-gray-50">
                <nav className="flex overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-all relative ${
                        activeTab === tab.id
                            ? "text-red-600 bg-white"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                        {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                        )}
                    </button>
                    );
                })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8">
                <div className="max-w-2xl">
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

            {/* Quick Actions */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-sm text-gray-600 mb-3">Manage password and security settings</p>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Change Password →
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">Data & Privacy</h3>
                <p className="text-sm text-gray-600 mb-3">Control your data and privacy preferences</p>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Manage Privacy →
                </button>
            </div>
            </div>
        </div>
        </div>
    </WarehouseLayout>
  );
};

export default WarehouseSettingsPage;