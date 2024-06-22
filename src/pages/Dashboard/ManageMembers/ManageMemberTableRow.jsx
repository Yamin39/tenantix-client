import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageMemberTableRow = ({ member, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { data: agreement = {} } = useQuery({
    queryKey: ["agreement"],
    // enabled: !!member?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?email=${member?.email}`);
      return res.data;
    },
  });

  console.log(agreement);

  const handleRemove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${email}`, { role: "user" }).then((data) => {
          if (data.data.modifiedCount) {
            axiosSecure.delete(`/agreements/${agreement?._id}`).then((res) => {
              console.log(res.data);
              if (res.data.deletedCount) {
                axiosSecure.patch(`/rooms/${agreement?.apartmentRoom_id}`, { availability: true }).then((data) => {
                  if (data.data.modifiedCount) {
                    Swal.fire({
                      title: "Removed!",
                      text: "Member role has been changed to user.",
                      icon: "success",
                    });
                    refetch();
                  }
                });
              }
            });
          }
        });
      }
    });
  };
  return (
    <tr className="text-xs sm:text-base">
      <td style={{ wordBreak: "break-all" }}>{member?.name}</td>
      <td style={{ wordBreak: "break-all" }}>{member?.email}</td>
      <td>
        <button onClick={() => handleRemove(member.email)} className="btn btn-sm btn-error text-white">
          Remove
        </button>
      </td>
    </tr>
  );
};

ManageMemberTableRow.propTypes = {
  member: PropTypes.object,
  refetch: PropTypes.func,
};

export default ManageMemberTableRow;
