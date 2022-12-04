import USER from "../model/USER.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

// @ REGISTER USER
// @ /api/v1/users/register
// @ PUBLIC

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userByUsername = await USER.findOne({ username });
  const userByEmail = await USER.findOne({ email });

  if (userByUsername) {
    res.status(400);
    throw new Error("Username already exists");
  } else if (userByEmail) {
    res.status(400);
    throw new Error("Email already exists");
  } else if (!userByUsername && !userByEmail) {
    const user = await USER.create({ username, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @ LOGIN USER
// @ /api/v1/users/login
// @ PUBLIC

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await USER.findOne({ username });
  if (!user) {
    res.status(401);
    throw new Error("Invalid username or password");
  } else if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});
