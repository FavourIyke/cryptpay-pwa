import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const PrivateRoute: FC<{ children: any }> = ({ children, ...rest }) => {
  const location = useLocation();
  const { token } = useAuth();

  return token && token !== "none" ? (
    <>{children}</>
  ) : !token ? (
    <></>
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
