import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApartmentCard = ({ room, refetchRooms }) => {
  const { _id, apartment_image, room_no, floor_no, block_name, apartment_no, rent, availability } = room;
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: isRequested, refetch } = useQuery({
    queryKey: ["isRequested"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?email=${user.email}`);
      return res.data;
    },
  });

  const handleAgreement = () => {
    if (!user) {
      return navigate("/login");
    }

    if (isRequested) {
      Swal.fire({
        title: "Not allowed!",
        text: "You have already requested for an apartment room. Request for multiple apartments is not allowed.",
        icon: "error",
      });
      return;
    }

    if (!availability) {
      toast.error("This room is unavailable");
      return;
    }

    const agreementInfo = {
      user_name: user?.displayName,
      user_email: user?.email,
      room_no,
      floor_no,
      block_name,
      apartment_no,
      apartmentRoom_id: _id,
      rent,
      request_date: new Date(),
      status: "pending",
      isRejected: false,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You are allowed to apply for only one apartment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(agreementInfo);

        axiosSecure.post("/agreements", agreementInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            axiosSecure.patch(`/rooms/${_id}`, { availability: false }).then((data) => {
              if (data.data.modifiedCount) {
                Swal.fire({
                  title: "Success!",
                  text: "Agreement request sent successfully! Please wait for admin approval.",
                  icon: "success",
                });
                refetch();
                refetchRooms();
              }
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-3xl">
      <div className="relative w-full h-[14rem] sm:h-[18.75rem] md:h-[22vw] lg:h-[11rem] xl:h-[12.5rem] 2xl:h-[18.75rem] p-2">
        <img className="size-full rounded-2xl" src={apartment_image} />
        <span
          className={`absolute text-sm bottom-4 right-4 ${
            availability ? "bg-green-200 text-green-800 border border-green-700" : "bg-red-200 text-red-700 border border-red-700"
          } px-4 py-1 rounded-full`}
        >
          {availability ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="p-6 pt-0">
        {/* rent */}
        <h6 className="text-2xl text-primary-color mt-2 font-semibold">
          ${rent}/<span className="text-lg text-gray-500">month</span>
        </h6>

        <div className="rounded-3xl p-2 mt-4 mb-6 bg-[#6b59f546]">
          <ul className="bg-white space-y-2 shadow-inner rounded-2xl p-2">
            {/* floor no */}
            <li className="bg-[#e9e9e98c] px-4 py-2 rounded-xl">
              <span className="font-semibold">Floor no: </span> {floor_no}
            </li>

            {/* room no */}
            <li className="bg-[#e9e9e98c] px-4 py-2 rounded-xl">
              <span className="font-semibold">Room no: </span> {room_no}
            </li>

            {/* Block name */}
            <li className="bg-[#e9e9e98c] px-4 py-2 rounded-xl">
              <span className="font-semibold">Block name: </span> {block_name}
            </li>

            {/* Apartment no */}
            <li className="bg-[#e9e9e98c] px-4 py-2 rounded-xl">
              <span className="font-semibold">Apartment no: </span> {apartment_no}
            </li>
          </ul>
        </div>

        <button
          onClick={handleAgreement}
          className="w-full btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 lg:text-base rounded-2xl py-3"
        >
          Agreement
        </button>
      </div>
    </div>
  );
};

ApartmentCard.propTypes = {
  room: PropTypes.object,
  refetchRooms: PropTypes.func,
};

export default ApartmentCard;
