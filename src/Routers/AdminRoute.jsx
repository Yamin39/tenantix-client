import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const { userRole, userRoleLoading } = useUserRole();

  if (loading || userRoleLoading) {
    return (
      <div className="min-h-screen">
        <Loading></Loading>
      </div>
    );
  }

  if (user && userRole === "admin") {
    return children;
  }

  return <Navigate to="/" state={pathname} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
