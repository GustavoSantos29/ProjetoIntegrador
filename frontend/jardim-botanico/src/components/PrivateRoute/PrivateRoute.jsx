import { useAuth } from '../../context/AuthContext/AuthProvider';
import { Navigate } from 'react-router-dom';
import IsLoading from '../IsLoading/IsLoading';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <IsLoading/>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
