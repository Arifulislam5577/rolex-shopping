import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USER",
    },
    orderItems: [
      {
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        url: { type: String, required: true },
        price: { type: Number, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
      country: { type: String, required: true },
    },
    orderCalculation: {
      totalItems: { type: Number, required: true },
      itemsPrice: { type: Number, required: true },
      taxPrice: { type: Number, required: true },
      shippingPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      email_address: { type: String },
      payTime: { type: Date, default: Date.now() },
    },

    isPaid: { type: Boolean, default: false },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
