import { useAuth } from '@/hooks/UseAuth'
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoutes() {
  const { isAuthenticated } = useAuth();
  {console.log(isAuthenticated)}
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
