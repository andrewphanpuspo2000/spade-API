import express from "express";
import {
  getAllCategories,
  getCatItems,
  getOneCatItem,
} from "../categories/categoryModel.js";

const router = express.Router();

router.get("/getItem/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Data is ......................", id);
    if (id) {
      const data = await getOneCatItem(id);
      console.log("data is ", data);
      if (data) {
        res.json({
          status: "success",
          message: "Item has been retrieved",
          data,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:slug/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const data = await getCatItems(_id);
      // console.log(data);
      if (data) {
        res.json({
          status: "success",
          message: "cat items retrieved",
          data: data,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

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
