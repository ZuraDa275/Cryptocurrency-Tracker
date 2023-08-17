import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CryptoState } from "../CryptoContext";
import { useAxiosAuthInstance } from "../hooks/axiosAuthInstance";
import useUserDataStore from "../store/userDataStore";

export default function CheckoutForm({ cryptoBucksAmt }) {
  const setCryptoBucks = useUserDataStore((state) => state.setCryptoBucks);
  const axiosInstance = useAxiosAuthInstance();
  const { setError, setOpen, setResponse } = CryptoState();
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCryptoPurchase = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/crypto/purchase-crypto-bucks",
        {
          cryptoBucksAmt,
        }
      );
      setCryptoBucks(response?.data?.cryptoBucks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setError("Your payment was not successful, please try again.");
          setOpen(true);
          break;
        default:
          setError("Something went wrong.");
          setOpen(true);
          break;
      }
    });
  }, [stripe, setError, setOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setResponse("Payment Successful!");
      setOpen(true);
    }, 2000);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/shop",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setError(error.message);
      setOpen(true);
    } else {
      setError("An unexpected error occurred.");
      setOpen(true);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target?.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        style={{
          color: "white",
          background: "#5469d4",
          fontSize: "1em",
          padding: ".5rem",
          fontFamily: "Raleway",
          cursor: "pointer",
          boxShadow: " 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
          width: "100%",
          marginTop: "1em",
        }}
        onClick={handleCryptoPurchase}
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}
