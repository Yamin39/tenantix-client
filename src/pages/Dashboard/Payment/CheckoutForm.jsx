import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ paymentData }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  //   const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const totalPrice = paymentData.rent;

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
      setError(error?.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
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
        toast.success(`Payment success! Transaction Id: ${paymentIntent.id}`);
        console.log("Transaction Id: ", paymentIntent.id);
        setTransactionId(paymentIntent.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "1rem",
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
      <button className="btn btn-accent mt-6" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  paymentData: PropTypes.object,
};

export default CheckoutForm;
