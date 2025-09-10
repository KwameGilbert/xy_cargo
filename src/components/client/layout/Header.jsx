import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Fallback to localStorage since AuthProvider may not be present
  const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const currentUser = stored ? JSON.parse(stored) : { name: "Client" };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/client/auth/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/client/dashboard" className="flex items-center">
          <img
            src="/images/logo/xy-cargo-logo.svg"
            alt="XY Cargo Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-semibold text-gray-900">Client Portal</span>
        </Link>

        <div className="flex items-center">
          <span className="mr-4 text-sm text-gray-600">Welcome, {currentUser?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
