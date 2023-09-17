import express from "express";
import { getPaymentMethods } from "../paymentMethod/paymentModel.js";
import { auth } from "../authMiddleware/auth.js";

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

export default router;
