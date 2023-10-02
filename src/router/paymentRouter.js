import express from "express";
import { getPaymentMethods } from "../paymentMethod/paymentModel.js";
import { auth } from "../authMiddleware/auth.js";
import Stripe from "stripe";
const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const methods = await getPaymentMethods();
    if (methods?.length) {
      return res.json({
        status: "success",
        methods,
      });
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/create-payment-intent", auth, async (req, res, next) => {
  try {
    console.log("this is env key:", process.env.STRIPE_S_K);
    const { amount, currency, paymentMethod } = req.body;
    const stripe = new Stripe(process.env.STRIPE_S_K);
    console.log(amount, typeof amount);

    const { client_secret } = await stripe.paymentIntents.create({
      amount: Math.ceil(amount) * 100,
      currency,
      payment_method_types: [paymentMethod],
    });
    console.log("this is CLient SK:", client_secret);
    client_secret &&
      res.json({
        client_secret,
      });
  } catch (err) {
    next(err);
  }
});

export default router;
