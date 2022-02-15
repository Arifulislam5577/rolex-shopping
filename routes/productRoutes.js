import express from "express";
import {
  getProducts,
  productDetails,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(productDetails);

export default router;
