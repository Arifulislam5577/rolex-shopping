import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrder,
  getUserOrder,
  updateOrder,
} from "../controllers/orderControllers.js";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, createOrder);
router.route("/").get(verifyToken, getUserOrder);
router.route("/admin").get(verifyTokenAndAdmin, getAllOrder);
router.route("/:id").get(verifyToken, getOrder).patch(verifyToken, updateOrder);

export default router;
