import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useCoupon from "../../../hooks/useCoupon";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const [disableApplyBtn, setDisableApplyBtn] = useState(false);
  const [discount, setDiscount] = useState(0);
  const couponRef = useRef();
  const { state } = useLocation();
  const { coupons } = useCoupon();

  // add publishable key
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

  const discountHandler = () => {
    const couponValue = couponRef.current.value.trim();

    if (couponValue === "") {
      return toast.error("Please enter a coupon code");
    }

    const couponCodes = coupons.map((coupon) => coupon.coupon_code);
    const isMatched = couponCodes.includes(couponValue);

    console.log(isMatched);
    if (!isMatched) {
      return toast.error("Invalid coupon code");
    }

    const matchedCoupon = coupons.find((coupon) => coupon.coupon_code === couponValue);
    console.log(matchedCoupon);

    const { discount_percentage, availability } = matchedCoupon;

    if (!availability) {
      return toast.error("This coupon is unavailable");
    }

    setDiscount((discount_percentage / 100) * state.rent);
    console.log(discount_percentage);
    toast.success("Coupon applied successfully");
    setDisableApplyBtn(true);
  };

  return (
    <div>
      <div className="p-6 min-h-screen">
        <div className="bg-white rounded-3xl p-3 pb-8">
          <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
            <h3 className="font-semibold text-2xl">Confirm payment</h3>
            <p className="text-gray-500 mt-1">Complete your payment process here.</p>
          </div>

          <div className="mt-6">
            <div className="form-control max-w-96 bg-[#e9e9e98c] p-6 mb-6 rounded-3xl">
              <label htmlFor="coupon" className="label pt-0">
                <span className="label-text text-base font-semibold">Have any coupon?</span>
              </label>
              {/* coupon */}
              <input ref={couponRef} name="coupon" id="coupon" type="text" placeholder="Enter coupon code" className="input py-7 input-bordered rounded-2xl" />
              <button
                onClick={discountHandler}
                className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-3 xl:px-7 mt-4"
                disabled={disableApplyBtn}
              >
                {disableApplyBtn ? "Coupon applied" : "Apply"}
              </button>
            </div>

            <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mt-6 mb-4">Enter your card details</h3>

            <div className="bg-[#e9e9e98c] px-4 py-6 rounded-3xl">
              <Elements stripe={stripePromise}>
                <CheckoutForm paymentData={state} discount={discount}></CheckoutForm>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
