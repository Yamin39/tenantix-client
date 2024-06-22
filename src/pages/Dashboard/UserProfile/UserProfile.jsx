import { useNavigate } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";
import DashboardGreet from "../DashboardGreet/DashboardGreet";
import ProfileCard from "../ProfileCard/ProfileCard";

const UserProfile = () => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();

  if (userRole !== "user") {
    navigate(-1);
  }

  return (
    <div className="p-6">
      <DashboardGreet></DashboardGreet>

      <div className="min-w-96 max-w-[31.25rem] mx-auto">
        <ProfileCard role="User"></ProfileCard>
      </div>

      <div className="mt-10 bg-white rounded-3xl p-3 pb-8">
        <div className="flex items-center gap-3 p-6 rounded-3xl bg-[#e9e9e98c]">
          <h3 className="font-semibold text-2xl">Agreement accept date:</h3>
          <p className="rounded-full px-6 py-1 bg-green-200 text-green-700">none</p>
        </div>

        <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mb-2">Rented apartment info</h3>

        <div className="overflow-x-auto">
          <table className="w-full table-xs sm:table-md md:table-lg lg:table table-zebra">
            <thead>
              <tr className="text-left text-gray-500 text-xs sm:text-base">
                <th>Floor no</th>
                <th>Block name</th>
                <th>Room no</th>
                <th>Apartment no</th>
                <th>Rent</th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-xs sm:text-base">
                <td>none</td>
                <td>none</td>
                <td>none</td>
                <td>none</td>
                <td>none</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
