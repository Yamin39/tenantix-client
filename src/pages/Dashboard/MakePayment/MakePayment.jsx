import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakePayment = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: agreement = {} } = useQuery({
    queryKey: ["agreement"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${user.email}/checked`);
      return res.data;
    },
  });

  const { user_name, user_email, room_no, floor_no, block_name, apartment_no, rent } = agreement;

  const handleSubmit = (e) => {
    e.preventDefault();
    const month = e.target.month.value;

    if (month === "Select month") {
      toast.error("Please select a month");
      return;
    }

    const paymentData = {
      user_name,
      user_email,
      room_no,
      floor_no,
      block_name,
      apartment_no,
      rent,
      month,
    };

    // console.log(paymentData);
    navigate("/dashboard/payment", { state: paymentData });
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white rounded-3xl p-3 pb-8">
        <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
          <h3 className="font-semibold text-2xl">Make Payment</h3>
          <p className="text-gray-500 mt-1">Securely pay your rent online here.</p>
        </div>

        <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mt-6 mb-2">Details</h3>

        <form onSubmit={handleSubmit} className="card-body pl-1 sm:pl-3 pt-0">
          <div className="form-control">
            <label htmlFor="member_email" className="label">
              <span className="label-text text-base font-semibold">Member email</span>
            </label>
            {/* member_email */}
            <input
              name="member_email"
              id="member_email"
              type="email"
              value={user_email}
              className="cursor-not-allowed input py-7 input-bordered rounded-2xl"
              readOnly
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* floor_no */}
            <div className="form-control flex-grow">
              <label htmlFor="floor_no" className="label">
                <span className="label-text text-base font-semibold">Floor</span>
              </label>
              <input
                name="floor_no"
                id="floor_no"
                type="number"
                value={floor_no}
                className="cursor-not-allowed input py-7 input-bordered rounded-2xl"
                readOnly
              />
            </div>

            {/* block_name */}
            <div className="form-control flex-grow">
              <label htmlFor="block_name" className="label">
                <span className="label-text text-base font-semibold">Block name</span>
              </label>
              <input
                name="block_name"
                id="block_name"
                type="text"
                value={block_name}
                className="cursor-not-allowed input py-7 input-bordered rounded-2xl"
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* room_no */}
            <div className="form-control flex-grow">
              <label htmlFor="room_no" className="label">
                <span className="label-text text-base font-semibold">Room no</span>
              </label>
              <input name="room_no" id="room_no" type="number" value={room_no} className="cursor-not-allowed input py-7 input-bordered rounded-2xl" readOnly />
            </div>
            {/* apartment_no */}
            <div className="form-control flex-grow">
              <label htmlFor="apartment_no" className="label">
                <span className="label-text text-base font-semibold">Apartment no</span>
              </label>
              <input
                name="apartment_no"
                id="apartment_no"
                type="number"
                value={apartment_no}
                className="cursor-not-allowed input py-7 input-bordered rounded-2xl"
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* rent */}
            <div className="form-control sm:w-1/2">
              <label htmlFor="rent" className="label">
                <span className="label-text text-base font-semibold">Rent</span>
              </label>
              <input name="rent" id="rent" type="number" value={rent} className="cursor-not-allowed input py-7 input-bordered rounded-2xl" readOnly />
            </div>

            {/* month */}
            <div className="form-control sm:w-1/2">
              <label className="label">
                <span className="label-text text-base font-semibold">Month</span>
              </label>
              <select name="month" className="select select-bordered" required>
                <option disabled selected>
                  Select month
                </option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>

          <button className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-3 xl:px-7 mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;
