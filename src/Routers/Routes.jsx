import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Root from "../layout/Root";
import Apartment from "../pages/Apartment/Apartment";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AgreementRequests from "../pages/Dashboard/AgreementRequests/AgreementRequests";
import Announcements from "../pages/Dashboard/Announcements/Announcements";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import ManageMembers from "../pages/Dashboard/ManageMembers/ManageMembers";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "apartment",
        element: <Apartment></Apartment>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // user routes
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "announcements",
        element: <Announcements></Announcements>,
      },

      // member routes

      // admin routes
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers></ManageMembers>
          </AdminRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons></ManageCoupons>
          </AdminRoute>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <AdminRoute>
            <AgreementRequests></AgreementRequests>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
