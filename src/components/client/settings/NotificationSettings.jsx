import { useState } from "react";

const NotificationSettings = ({ notificationPreferences }) => {
  const [channels, setChannels] = useState(notificationPreferences.channels || {});
  const [types, setTypes] = useState(notificationPreferences.types || {});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChannelChange = (channel) => {
    setChannels((prev) => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };

  const handleTypeChange = (type) => {
    setTypes((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // In a real app, this would be an API call to update notification preferences
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving notification preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Communication Channels</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={channels.email || false}
                onChange={() => handleChannelChange("email")}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="emailNotifications" className="ml-3 text-gray-700">
                Email notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                checked={channels.sms || false}
                onChange={() => handleChannelChange("sms")}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="smsNotifications" className="ml-3 text-gray-700">
                SMS notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushNotifications"
                checked={channels.push || false}
                onChange={() => handleChannelChange("push")}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="pushNotifications" className="ml-3 text-gray-700">
                Push notifications
              </label>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Types</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="shipmentUpdates"
                checked={types.shipmentUpdates || false}
                onChange={() => handleTypeChange("shipmentUpdates")}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="shipmentUpdates" className="ml-3 text-gray-700">
                Shipment updates and tracking
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="paymentReminders"
                checked={types.paymentReminders || false}
                onChange={() => handleTypeChange("paymentReminders")}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="paymentReminders" className="ml-3 text-gray-700">
                Payment reminders and invoices
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="securityAlerts"
                checked={types.securityAlerts || false}
                onChange={() => handleTypeChange("securityAlerts")}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="securityAlerts" className="ml-3 text-gray-700">
                Security alerts
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="promotionalEmails"
                checked={types.promotionalEmails || false}
                onChange={() => handleTypeChange("promotionalEmails")}
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="promotionalEmails" className="ml-3 text-gray-700">
                Promotional emails and offers
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          {saveSuccess && (
            <div className="mr-4 text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Preferences saved successfully
            </div>
          )}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Preferences
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;