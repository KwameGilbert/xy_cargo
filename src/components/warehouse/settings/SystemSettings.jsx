const SystemSettings = ({ systemPreferences }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
      <p className="text-sm text-gray-600">Adjust system-level configurations.</p>
      <div className="mt-4">
        {systemPreferences.map((setting, idx) => (
          <div key={idx} className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">{setting.name}</span>
            <input
              type="checkbox"
              checked={setting.enabled}
              className="form-checkbox h-5 w-5 text-red-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSettings;