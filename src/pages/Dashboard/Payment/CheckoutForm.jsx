import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ paymentData, discount }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [totalPrice, setTotalPrice] = useState(paymentData.rent);
  const navigate = useNavigate();
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const { room_id, room_no, floor_no, block_name, apartment_no, month } = paymentData;

  console.log(room_id);

  useEffect(() => {
    if (discount) {
      setTotalPrice(totalPrice - discount);
    }
  }, [discount]);

  console.log(totalPrice);

  useEffect(() => {
    if (totalPrice >= 0.5) {
      axiosSecure.post("/create-payment-intent", { price: totalPrice }).then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log(res.data.clientSecret);
      });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      toast.error(error?.message);
    } else {
      console.log("payment method", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      console.log("Confirm Error", confirmError);
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("Transaction Id: ", paymentIntent.id);

        const payment = {
          member_name: user?.name,
          member_email: user?.email,
          date: new Date(),
          transactionId: paymentIntent.id,
          paid_amount: totalPrice,
          room_id,
          room_no,
          floor_no,
          block_name,
          apartment_no,
          paid_month: month,
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("Payment saved", res.data);

        if (res.data?.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Payment success!",
            icon: "success",
          });
          navigate("/dashboard/payment-history");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn bg-green-500 text-white hover:bg-green-500 hover:brightness-90 mt-6 h-auto min-h-0 text-base rounded-xl py-3 xl:px-7"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${totalPrice}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  paymentData: PropTypes.object,
  discount: PropTypes.number,
};

export default CheckoutForm;
