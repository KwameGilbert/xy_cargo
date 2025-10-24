import { Navigate } from 'react-router-dom';
import { useClientAuth } from '../../../contexts/ClientAuthContext';

// Component to protect client routes
const ClientProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useClientAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/client/auth/login" />;
  }

  return children;
};

export default ClientProtectedRoute;
