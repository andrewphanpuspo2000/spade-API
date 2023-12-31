import express from "express";
import isOnline from "is-online";
import {
  addOrder,
  deleteOrderById,
  findAllOrder,
  findAllOrderByFilter,
} from "../orderDB/orderModel.js";
import { auth } from "../authMiddleware/auth.js";
import {
  findProductById,
  getOneCatItem,
  returnAllProducts,
  updateProductDataById,
} from "../categories/categoryModel.js";
import mongoose from "mongoose";
const router = express.Router();

router.post("/add", auth, async (req, res, next) => {
  try {
    const online = await isOnline();
    if (online) {
      const result = await addOrder(req.body);
      if (result?._id) {
        result?.items.forEach(async (item) => {
          const findItem = await getOneCatItem(item?._id);
          //this is for reducing the qty of product that sold
          findItem?._id &&
            (await updateProductDataById(findItem?._id, {
              qty: +findItem?.qty - +item.qty,
            }));
        });

        return res.json({
          status: "success",
          message: "Order has been placed",
          item: result,
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

router.get("/trending", async (req, res, next) => {
  try {
    const products = await returnAllProducts();

    const obj = { id: "", count: 0 };
    if (products) {
      const filterPromises = products.map(async (item) => {
        const parse = JSON.parse(JSON.stringify(item));
        const filter = await findAllOrderByFilter({
          items: { $elemMatch: { name: parse?.name } },
        });
        // console.log(filter);
        if (obj.count < filter.length) {
          obj.id = parse._id;
          obj.count = filter.length;
        }
      });

      await Promise.all(filterPromises); // Wait for all promises to complete
      console.log(obj);
      const trendingItem = await findProductById(obj.id);
      res.json({
        status: "success",
        trendingItem,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const result = await deleteOrderById(id);

      result?._id &&
        res.json({
          status: "success",
        });
    }
  } catch (error) {
    next(err);
  }
});
export default router;
