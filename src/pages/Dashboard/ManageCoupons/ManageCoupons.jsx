import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCoupon from "../../../hooks/useCoupon";
import AddCouponsModal from "./AddCouponsModal";

const ManageCoupons = () => {
  const { coupons, couponLoading, refetchCoupons } = useCoupon();
  const axiosSecure = useAxiosSecure();
  const handleUpdate = (id, availability) => {
    axiosSecure.patch(`/coupons/${id}`, { availability }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        document.getElementById(`${id}-couponUpdateModal`).close();
        Swal.fire({
          title: "Updated!",
          text: "Coupons availability updated successfully.",
          icon: "success",
        });
        refetchCoupons();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/coupons/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Coupon deleted successfully.",
              icon: "success",
            });
            refetchCoupons();
          }
        });
      }
    });
  };

  return (
    <>
      <div className="p-1 sm:p-6 min-h-screen">
        <div className="bg-white rounded-3xl p-3 pb-8">
          <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
            <h3 className="font-semibold text-2xl">Manage coupons</h3>
            <p className="text-gray-500 mt-1">Create, update, and manage all discount coupons for tenants seamlessly here</p>
          </div>

          <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mb-2">All coupons</h3>

          <div className="overflow-x-auto">
            <table className="w-full table-xs sm:table-md md:table-lg lg:table table-zebra">
              <thead>
                <tr className="text-left text-gray-500 text-xs sm:text-base">
                  <th>Code</th>
                  <th>Percentage</th>
                  <th>Description</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {!couponLoading && (
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id} className="text-xs sm:text-base">
                      <td>{coupon?.coupon_code}</td>
                      <td>{coupon?.discount_percentage}</td>
                      <td>{coupon?.coupon_description}</td>
                      <td>{coupon?.availability ? "Available" : "Unavailable"}</td>
                      <td className="flex flex-col gap-2">
                        <button
                          onClick={() => document.getElementById(`${coupon._id}-couponUpdateModal`).showModal()}
                          className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="btn bg-red-500 text-white hover:bg-red-500 hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2"
                        >
                          <AiOutlineDelete />
                        </button>

                        {/* update modal */}
                        <dialog id={`${coupon._id}-couponUpdateModal`} className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button
                                onClick={() => document.getElementById(`${coupon._id}-couponUpdateForm`).reset()}
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                              >
                                ✕
                              </button>
                            </form>
                            <form
                              id={`${coupon._id}-couponUpdateForm`}
                              onSubmit={(e) => {
                                e.preventDefault();
                                const updatedAvailability = e.target.availability.value === "true";
                                if (updatedAvailability === coupon?.availability) {
                                  Swal.fire({
                                    title: "Warning!",
                                    text: "Please change the value before updating",
                                    icon: "warning",
                                  });
                                  document.getElementById(`${coupon._id}-couponUpdateModal`).close();
                                  return;
                                }
                                handleUpdate(coupon._id, updatedAvailability);
                              }}
                              className="text-center"
                            >
                              <h3 className="font-semibold text-lg">Update the availability of this coupon</h3>

                              <div className="flex justify-center items-center mt-4 gap-4">
                                <select name="availability" defaultValue={coupon?.availability} className="select select-bordered max-w-xs">
                                  <option value={true}>Available</option>
                                  <option value={false}>Unavailable</option>
                                </select>

                                <button className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2 xl:px-7">
                                  Update
                                </button>
                              </div>
                            </form>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>

        <AddCouponsModal refetchCoupons={refetchCoupons}></AddCouponsModal>
      </div>
    </>
  );
};

export default ManageCoupons;
