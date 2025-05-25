import express from "express";
import {
  addProduct,
  deleteProduct,
  product,
  productId,
  updateProduct,
} from "../controllers/product.controller.js";
import { OrderHandel } from "../controllers/order.controller.js";
import { AdminOrders, SuperAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/products", product);
router.get("/products/:id", productId);
router.post("/order", OrderHandel);
router.post("/adminorders", AdminOrders);
router.post("/add", addProduct);
router.get("/super", SuperAdmin);
router.delete("/productsdelete",deleteProduct)
router.patch("/productsupdate",updateProduct)

export default router;
