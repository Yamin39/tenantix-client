import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageMemberTableRow from "./ManageMemberTableRow";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: members = [],
    isPending: membersLoading,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members");
      return res.data;
    },
  });

  return (
    <>
      <div className="p-1 sm:p-6 min-h-screen">
        <div className="bg-white rounded-3xl p-3 pb-8">
          <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
            <h3 className="font-semibold text-2xl">Manage members</h3>
            <p className="text-gray-500 mt-1">Efficiently manage all apartment members</p>
          </div>

          <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mb-2">All members</h3>

          <div className="overflow-x-auto">
            <table className="w-full table-xs sm:table-md md:table-lg lg:table table-zebra">
              <thead>
                <tr className="text-left text-gray-500 text-xs sm:text-base">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              {!membersLoading && (
                <tbody>
                  {members.map((member) => (
                    <ManageMemberTableRow key={member._id} member={member} refetch={refetch}></ManageMemberTableRow>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageMembers;
