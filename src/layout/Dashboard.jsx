import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
