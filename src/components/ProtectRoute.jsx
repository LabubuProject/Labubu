import { Navigate } from 'react-router-dom';
import { useAuth }   from '../AuthContext/AuthContext';

export default function ProtectRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}