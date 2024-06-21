import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Root from "../layout/Root";
import Apartment from "../pages/Apartment/Apartment";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AgreementRequests from "../pages/Dashboard/AgreementRequests/AgreementRequests";
import Announcements from "../pages/Dashboard/Announcements/Announcements";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import MakePayment from "../pages/Dashboard/MakePayment/MakePayment";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import ManageMembers from "../pages/Dashboard/ManageMembers/ManageMembers";
import MemberProfile from "../pages/Dashboard/MemberProfile/MemberProfile";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";
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
      {
        path: "member-profile",
        element: (
          <MemberRoute>
            <MemberProfile></MemberProfile>
          </MemberRoute>
        ),
      },
      {
        path: "make-payment",
        element: (
          <MemberRoute>
            <MakePayment></MakePayment>
          </MemberRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <MemberRoute>
            <Payment></Payment>
          </MemberRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory></PaymentHistory>
          </MemberRoute>
        ),
      },

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
