import USER from "../model/USER.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

// @ UPDATE USER INFO
// @ /api/v1/users/:ID
// @ PRIVATE

export const updateUserInfo = asyncHandler(async (req, res) => {
  const user = await USER.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User Not found");
  }
});

// @ USER INFO
// @ /api/v1/users/:ID
// @ PRIVATE

export const getUserInfo = asyncHandler(async (req, res) => {
  const user = await USER.findById(req.user._id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User Not found");
  }
});
