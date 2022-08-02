import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const RequireAuth = () => {
  const { token } = useAuthContext();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
