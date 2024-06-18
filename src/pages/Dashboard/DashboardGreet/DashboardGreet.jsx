import moment from "moment";
import useAuth from "../../../hooks/useAuth";

const DashboardGreet = () => {
  const { user } = useAuth();
  return (
    <div className="bg-white rounded-3xl p-6">
      <h3 className="font-semibold text-2xl">Welcome, {user?.displayName?.split(" ")[0]}</h3>
      <p className="text-gray-400">{moment().format("dddd, MMM DD")}</p>
    </div>
  );
};

export default DashboardGreet;
