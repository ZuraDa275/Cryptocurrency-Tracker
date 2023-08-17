import { Response } from "express";
import "dotenv/config";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import { newRequest } from "../middleware/authMiddleware";
const calculateOrderAmount = (cryptoBucksAmt: string): number => {
  if (cryptoBucksAmt === "500") return 500;
  else if (cryptoBucksAmt === "2,500") return 2500;
  else if (cryptoBucksAmt === "5,000") return 5000;
  else return 10000;
};

const createPaymentIntentController = async (
  req: newRequest,
  res: Response
) => {
  const { cryptoBucksAmt } = req.body;

  //   Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cryptoBucksAmt),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

export default createPaymentIntentController;
