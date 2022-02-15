import express from "express";
import { getUserInfo, updateUserInfo } from "../controllers/UserControllers.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router
  .route("/:id")
  .get(verifyToken, getUserInfo)
  .patch(verifyToken, updateUserInfo);

export default router;
