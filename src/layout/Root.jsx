import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Root = () => {
  return (
    <div className="max-w-[1440px] min-h-screen w-10/12 mx-auto font-open-sans">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
