const NotificationSettings = ({ notificationPreferences }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
      <p className="text-sm text-gray-600">Configure your notification preferences.</p>
      <div className="mt-4">
        {notificationPreferences.map((pref, idx) => (
          <div key={idx} className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">{pref.name}</span>
            <input
              type="checkbox"
              checked={pref.enabled}
              className="form-checkbox h-5 w-5 text-red-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;