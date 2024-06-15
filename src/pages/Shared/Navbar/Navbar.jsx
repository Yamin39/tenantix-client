import { FiLogIn } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "/logo.png";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink className="hover:text-primary-color hover:bg-transparent" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-primary-color hover:bg-transparent" to="/apartment">
          Apartment
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="mb-8">
      <div className="py-3">
        <div className="navbar px-0 justify-between">
          <div>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost px-2 md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                {navLinks}
              </ul>
            </div>
            <div>
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} className="max-w-10 lg:max-w-12" />
                <p className="font-semibold text-2xl lg:text-3xl">
                  <span className="text-primary-color">Tenant</span>ix
                </p>
              </Link>
            </div>
          </div>
          <div>
            <ul className="hidden md:flex navLink-container menu menu-horizontal gap-1 2xl:gap-2 2xl:px-1 font-medium lg:text-base">{navLinks}</ul>
            <NavLink
              to="/login"
              className="login-nav btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 lg:text-base rounded-3xl py-2"
            >
              <FiLogIn className="text-lg" />
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
