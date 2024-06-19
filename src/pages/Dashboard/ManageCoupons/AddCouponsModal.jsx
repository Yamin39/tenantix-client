import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCouponsModal = ({ refetchCoupons }) => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const coupon_code = form.coupon_code.value;
    const discount_percentage = form.discount_percentage.value;
    const coupon_description = form.coupon_description.value;
    const availability = form.coupon_availability.value;

    const couponData = {
      coupon_code,
      discount_percentage: Number(discount_percentage),
      coupon_description,
      availability: availability === "true",
    };

    console.log(couponData);

    axiosSecure.post("/coupons", couponData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "New coupon added successfully.",
          icon: "success",
        });
        refetchCoupons();
        form.reset();
        document.getElementById("add_new_coupon_modal").close();
      }
    });
  };
  return (
    <>
      <div className="w-fit mx-auto mt-6">
        <button
          onClick={() => document.getElementById("add_new_coupon_modal").showModal()}
          className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-3 px-10"
        >
          Add a new coupon
        </button>
      </div>

      <dialog id="add_new_coupon_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button onClick={() => document.getElementById("add_new_coupon_form").reset()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-xl text-center">Add a new coupon</h3>

          <form id="add_new_coupon_form" onSubmit={handleSubmit} className="space-y-2">
            {/* Coupon code */}
            <div className="form-control">
              <label htmlFor="coupon_code" className="label">
                <span className="label-text text-base font-semibold uppercase">Coupon code</span>
              </label>
              <input
                name="coupon_code"
                id="coupon_code"
                type="text"
                placeholder="Enter Coupon code"
                className="input py-7 input-bordered rounded-2xl"
                required
              />
            </div>

            {/* discount percentage */}
            <div className="form-control">
              <label htmlFor="discount_percentage" className="label">
                <span className="label-text text-base font-semibold uppercase">Discount percentage</span>
              </label>
              <input
                name="discount_percentage"
                id="discount_percentage"
                type="number"
                placeholder="Enter Discount percentage"
                className="input py-7 input-bordered rounded-2xl"
                required
              />
            </div>

            {/* Coupon description */}
            <div className="form-control">
              <label htmlFor="coupon_description" className="label">
                <span className="label-text text-base font-semibold uppercase">Coupon description</span>
              </label>
              <textarea
                name="coupon_description"
                id="coupon_description"
                type="text"
                rows={3}
                placeholder="Enter Coupon description"
                className="textarea textarea-bordered rounded-2xl"
                required
              />
            </div>

            {/* Coupon availability */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold uppercase">Coupon availability</span>
              </label>
              <select name="coupon_availability" defaultValue={true} className="select select-bordered">
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </select>
            </div>

            <div className="form-control">
              <button className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-3 px-10">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

AddCouponsModal.propTypes = {
  refetchCoupons: PropTypes.func,
};

export default AddCouponsModal;
