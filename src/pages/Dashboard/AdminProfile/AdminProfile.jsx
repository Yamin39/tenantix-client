import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardGreet from "../DashboardGreet/DashboardGreet";
import ProfileCard from "../ProfileCard/ProfileCard";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: adminStats = {}, isPending } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { total_rooms, total_users, total_members, percentageOfAvailable_rooms, percentageOfUnavailable_rooms } = adminStats;

  return (
    <div className="p-6 min-h-screen">
      <DashboardGreet></DashboardGreet>

      <div className="flex flex-col xl:flex-row items-center justify-center">
        <div className="w-full xl:w-1/2">
          <ProfileCard role="Admin"></ProfileCard>
        </div>

        <div className="w-full xl:w-1/2 bg-white rounded-3xl mt-6 xl:ml-6">
          {isPending ? (
            <div className="flex justify-center items-center min-h-56">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="flex justify-between text-lg m-6 p-6 bg-[#e9e9e98c] rounded-3xl">
                {/* total rooms */}
                <span className="font-semibold text-gray-700 tracking-wide">Total rooms</span>
                <span className="rounded-full px-3 border border-violet-700 bg-violet-200 text-violet-700">{total_rooms}</span>
              </div>

              <div className="text-center grid grid-cols-2 gap-6 p-6 pt-0">
                {/* Available rooms */}
                <div className="flex flex-col justify-center items-center px-6 py-8 bg-[#e9e9e98c] rounded-3xl">
                  <div
                    className="radial-progress border-4 border-green-100 bg-green-100 text-lg text-green-500"
                    style={{ "--value": percentageOfAvailable_rooms, "--size": "7rem" }}
                    role="progressbar"
                  >
                    {percentageOfAvailable_rooms}%
                  </div>
                  <span className="font-semibold text-gray-700 mt-4 tracking-wide">
                    Available <br /> rooms
                  </span>
                </div>

                {/*  agreement/unavailable rooms */}
                <div className="flex flex-col justify-center items-center px-6 py-8 bg-[#e9e9e98c] rounded-3xl">
                  <div
                    className="radial-progress text-lg border-4 border-red-100 bg-red-100 text-red-500"
                    style={{ "--value": percentageOfUnavailable_rooms, "--size": "7rem" }}
                    role="progressbar"
                  >
                    {percentageOfUnavailable_rooms}%
                  </div>
                  <span className="font-semibold text-gray-700 mt-4 tracking-wide">
                    Agreement / Unavailable <br /> rooms
                  </span>
                </div>

                {/* total users */}
                <div className="flex flex-col sm:flex-row justify-between text-lg p-6 bg-[#e9e9e98c] rounded-3xl">
                  <span className="font-semibold text-gray-700 tracking-wide">Total users</span>
                  <span className="h-fit rounded-full px-3 border border-violet-700 bg-violet-200 text-violet-700">{total_users}</span>
                </div>

                {/* total members */}
                <div className="flex flex-col sm:flex-row justify-between text-lg p-6 bg-[#e9e9e98c] rounded-3xl">
                  <span className="font-semibold text-gray-700 tracking-wide">Total members</span>
                  <span className="mt-2 sm:mt-0 h-fit rounded-full px-3 border border-violet-700 bg-violet-200 text-violet-700">{total_members}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
