import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    base: { type: String },
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    description: [{ title: { type: String }, value: { type: String } }],
    url: { type: String, required: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    countReview: { type: Number },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

export default product;
