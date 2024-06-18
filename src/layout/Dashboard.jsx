import { Outlet } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useUserRole from "../hooks/useUserRole";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  const { userRoleLoading } = useUserRole();
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex">
        <Sidebar></Sidebar>
      </div>
      <div className="flex-grow">
        {userRoleLoading ? (
          <div className="min-h-screen">
            <Loading></Loading>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
