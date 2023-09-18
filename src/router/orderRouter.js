import express from "express";
import isOnline from "is-online";
import { addOrder } from "../orderDB/orderModel.js";
import { auth } from "../authMiddleware/auth.js";
const router = express.Router();

router.post("/add", auth, async (req, res, next) => {
  try {
    const online = await isOnline();
    if (online) {
      const result = await addOrder(req.body);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "Order has been placed",
        });
      } else {
        return res.json({
          status: "error",
          message: "Can not place item",
        });
      }
    } else {
      return res.json({
        status: "error",
        message: "You are offline",
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default router;
