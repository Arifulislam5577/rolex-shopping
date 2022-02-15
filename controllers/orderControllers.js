import ORDER from "../model/ORDER.js";
import asyncHandler from "express-async-handler";

export const createOrder = asyncHandler(async (req, res) => {
  const order = await ORDER.create({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    orderCalculation: req.body.orderCalculation,
  });

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("Something wrong");
  }
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await ORDER.findById(req.params.id);
  if (order) {
    return res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await ORDER.findById(req.params.id);
  if (order) {
    order.paidAt = Date.now();
    order.deliveredAt = Date.now();
    order.isPaid = true;
    order.isDelivered = true;
    order.paymentResult = req.body.paymentResult;
    const orderUpdate = await order.save();

    res.status(200).json(orderUpdate);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

export const getUserOrder = asyncHandler(async (req, res) => {
  const order = await ORDER.find({ user: req.user._id });
  if (order) {
    return res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const order = await ORDER.find();
  if (order) {
    return res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});
