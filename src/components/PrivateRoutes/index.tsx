import { Navigate, Outlet } from "react-router";

import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const auth = false;
  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
};
export default PrivateRoutes;
