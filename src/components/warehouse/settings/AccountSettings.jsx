const AccountSettings = ({ userData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
      <p className="text-sm text-gray-600">Manage your account details here.</p>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700">Name: {userData.name}</p>
        <p className="text-sm font-medium text-gray-700">Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default AccountSettings;