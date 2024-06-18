import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApartmentCard = ({ room }) => {
  const { apartment_image, room_no, floor_no, block_name, apartment_no, rent } = room;
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
      return navigate("/login", { state: pathname });
    }

    if (isRequested) {
      Swal.fire({
        title: "Not allowed!",
        text: "You have already requested for an apartment room. Request for multiple apartments is not allowed.",
        icon: "error",
      });
      return;
    }

    const agreementInfo = {
      user_name: user?.displayName,
      user_email: user?.email,
      room_no,
      floor_no,
      block_name,
      apartment_no,
      rent,
      request_date: new Date(),
      status: "pending",
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
            Swal.fire({
              title: "Success!",
              text: "Agreement request sent successfully.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-3xl">
      <div className="w-full h-[14rem] sm:h-[18.75rem] md:h-[22vw] lg:h-[11rem] xl:h-[12.5rem] 2xl:h-[18.75rem] p-2">
        <img className="size-full rounded-2xl" src={apartment_image} />
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
};

export default ApartmentCard;
