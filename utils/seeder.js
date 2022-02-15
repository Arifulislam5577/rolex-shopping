import mongoose from "mongoose";
import dotenv from "dotenv";
import PRODUCT from "../model/PRODUCT.js";
import { products } from "../data/product.js";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connect to database");
});

const seedProducts = async () => {
  try {
    await PRODUCT.deleteMany();
    console.log("Product deleted");
    await PRODUCT.insertMany(products);
    console.log("Product added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();
