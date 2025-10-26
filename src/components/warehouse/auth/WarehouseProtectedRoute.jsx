import { Navigate } from 'react-router-dom';
import { useWarehouseAuth } from '../../../contexts/WarehouseAuthContext';

// Component to protect warehouse routes
const WarehouseProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useWarehouseAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading warehouse dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/warehouse/auth/login" />;
  }

  return children;
};

export default WarehouseProtectedRoute;