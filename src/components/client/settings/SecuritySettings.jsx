import { useState } from "react";

const SecuritySettings = ({ securitySettings }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securitySettings.twoFactorAuthentication || false);
  const [passwordError, setPasswordError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call to update password
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaveSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    try {
      // Simulate API call to toggle 2FA
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTwoFactorEnabled(!twoFactorEnabled);
    } catch (error) {
      console.error("Error toggling 2FA:", error);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
        
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            {saveSuccess && (
              <div className="mr-4 text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Password updated successfully
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
                  Updating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Two-Factor Authentication</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 mb-2">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <p className="text-sm text-gray-500">
              {twoFactorEnabled 
                ? "Two-factor authentication is currently enabled." 
                : "Two-factor authentication is currently disabled."}
            </p>
          </div>
          
          <div className="ml-4">
            <button
              type="button"
              onClick={handleToggleTwoFactor}
              className={`px-4 py-2 rounded-md ${
                twoFactorEnabled 
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {twoFactorEnabled ? "Disable" : "Enable"}
            </button>
          </div>
        </div>
      </div>

      {securitySettings.loginHistory && securitySettings.loginHistory.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Recent Login Activity</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {securitySettings.loginHistory.map((login, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{login.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{login.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{login.device}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{login.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;