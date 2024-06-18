import { Outlet } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useUserRole from "../hooks/useUserRole";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  const { userRoleLoading } = useUserRole();
  return (
    <>
      {userRoleLoading ? (
        <div className="min-h-screen">
          <Loading></Loading>
        </div>
      ) : (
        <div className="flex">
          <div>
            <Sidebar></Sidebar>
          </div>
          <div className="flex-grow">
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
