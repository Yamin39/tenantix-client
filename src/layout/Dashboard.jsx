import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useUserRole from "../hooks/useUserRole";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  const { userRoleLoading } = useUserRole();
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex">
        <Sidebar></Sidebar>
      </div>
      <div className="lg:flex-grow max-w-[1440px] mx-auto">
        {userRoleLoading ? (
          <div className="min-h-screen">
            <Loading></Loading>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Dashboard;
