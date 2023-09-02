import express from "express";
import { getAllCategories } from "../categories/categoryModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllCategories();
    result
      ? res.json({
          status: "success",
          message: "data is ready",
          result,
        })
      : res.json({
          status: "error",
          message: "no data have been retrieved",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
