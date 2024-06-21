import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  // add publishable key
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

  const { state } = useLocation();

  console.log(state);

  return (
    <div>
      <div className="p-6 min-h-screen">
        <div className="bg-white rounded-3xl p-3 pb-8">
          <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
            <h3 className="font-semibold text-2xl">Confirm payment</h3>
            <p className="text-gray-500 mt-1">Complete your payment process here.</p>
          </div>

          {/* <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mt-6 mb-2">Details</h3> */}

          <div className="mt-10">
            <Elements stripe={stripePromise}>
              <CheckoutForm paymentData={state}></CheckoutForm>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
