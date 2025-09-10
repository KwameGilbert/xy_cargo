import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

// Component to protect client routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/client/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
