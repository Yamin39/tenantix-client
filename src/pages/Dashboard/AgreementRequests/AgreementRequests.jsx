import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: agreements = [],
    isPending: agreementLoading,
    refetch: refetchAgreements,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements?status=pending");
      return res.data;
    },
  });

  const handleAccept = (id, email) => {
    axiosSecure.patch(`/accept-agreement/${id}`, { status: "checked" }).then((data) => {
      if (data.data.modifiedCount) {
        axiosSecure.patch(`/users/${email}`, { role: "member" }).then((data) => {
          if (data.data.modifiedCount) {
            Swal.fire({
              title: "Accepted!",
              text: "Agreement accepted successfully.",
              icon: "success",
            });
            refetchAgreements();
          }
        });
      }
    });
  };
  return (
    <div className="p-1 sm:p-6 min-h-screen">
      <div className="bg-white rounded-3xl p-3 pb-8">
        <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
          <h3 className="font-semibold text-2xl">Agreement requests</h3>
          <p className="text-gray-500 mt-1">Review, approve, and manage all tenant rental agreement requests efficiently here</p>
        </div>

        <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mb-2">All requests</h3>

        <div className="overflow-x-auto">
          <table className="w-full table-xs sm:table-md md:table-lg lg:table table-zebra">
            <thead>
              <tr className="text-left text-gray-500 text-xs sm:text-base">
                <th>User name</th>
                <th>User email</th>
                <th>Floor no</th>
                <th>Block name</th>
                <th>Room no</th>
                <th>Rent</th>
                <th>Request date</th>
                <th>Accept</th>
                <th>Reject</th>
              </tr>
            </thead>

            {!agreementLoading && (
              <tbody>
                {agreements.map((agreement) => (
                  <tr key={agreement._id} className="text-xs sm:text-base">
                    <td style={{ wordBreak: "break-all" }}>{agreement?.user_name}</td>
                    <td style={{ wordBreak: "break-all" }}>{agreement?.user_email}</td>
                    <td style={{ wordBreak: "break-all" }}>{agreement?.floor_no}</td>
                    <td style={{ wordBreak: "break-all" }}>{agreement?.block_name}</td>
                    <td style={{ wordBreak: "break-all" }}>{agreement?.room_no}</td>
                    <td style={{ wordBreak: "break-all" }}>{agreement?.rent}</td>
                    <td style={{ wordBreak: "break-all" }}>{moment(agreement?.request_date).format("DD MMMM YYYY")}</td>
                    <td>
                      <button
                        onClick={() => handleAccept(agreement._id, agreement?.user_email)}
                        className="btn bg-green-500 text-white hover:bg-green-500 hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2"
                      >
                        <FaCheck />
                      </button>
                    </td>
                    <td>
                      <button className="btn bg-red-500 text-white hover:bg-red-500 hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2">
                        <RxCross2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgreementRequests;
