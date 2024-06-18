import { CgProfile } from "react-icons/cg";
import { FiHome } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { RiCoupon3Line, RiMenu3Fill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";
import "./Sidebar.css";
import logo from "/logo.png";

const Sidebar = () => {
  const { userRole, userRoleLoading } = useUserRole();

  return (
    <>
      <div className="z-50 drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-6 pb-0 flex items-center justify-between md:hidden">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} className="max-w-10 lg:max-w-12" />
              <p className="font-semibold text-2xl lg:text-3xl">
                <span className="text-primary-color">Tenant</span>ix
              </p>
            </Link>
          </div>

          <label htmlFor="my-drawer-2" className="btn drawer-button">
            <RiMenu3Fill className="text-3xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul id="sidebar" className="menu p-4 w-56 min-h-full bg-primary-color text-white">
            <div className="mt-6 mb-10">
              <Link to="/" className="flex flex-col items-center gap-3">
                <img src={logo} className="max-w-10 lg:max-w-12" />
                <p className="font-semibold text-2xl lg:text-3xl">Tenantix</p>
              </Link>
            </div>

            {userRoleLoading ? (
              <div className="min-h-20 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <>
                {/* user */}
                {userRole === "user" && (
                  <>
                    <li>
                      <NavLink to="/dashboard/user-profile">
                        <CgProfile className="text-base" />
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/announcements">
                        <GrAnnounce className="text-base" />
                        Announcements
                      </NavLink>
                    </li>
                  </>
                )}

                {/* member */}
                {userRole === "member" && (
                  <>
                    <li>
                      <NavLink to="/dashboard/member-profile">
                        <CgProfile className="text-base" />
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/make-payment">
                        <RiMoneyDollarCircleLine className="text-base" />
                        Make payment
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/payment-history">
                        <MdHistory className="text-base" />
                        Payment History
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/announcements">
                        <GrAnnounce className="text-base" />
                        Announcements
                      </NavLink>
                    </li>
                  </>
                )}

                {/* admin */}
                {userRole === "admin" && (
                  <>
                    <li>
                      <NavLink to="/dashboard/admin-profile">
                        <CgProfile className="text-base" />
                        Admin Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/manage-members">
                        <IoPeopleOutline className="text-base" />
                        Manage Members
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/make-announcements">
                        <GrAnnounce className="text-base" />
                        Make Announcement
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/agreement-requests">
                        <GoChecklist className="text-base" />
                        Agreement Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/manage-coupons">
                        <RiCoupon3Line className="text-base" />
                        Manage Coupons
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            )}

            {/* common */}
            <div className="divider before:bg-gray-400 after:bg-gray-400"></div>
            <li>
              <NavLink to="/">
                <FiHome className="text-base" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/apartment">
                <PiBuildingApartment className="text-base" />
                Apartments
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
