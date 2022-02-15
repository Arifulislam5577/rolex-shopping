import asyncHandler from "express-async-handler";
import PRODUCT from "../model/PRODUCT.js";
import ApiFeatures from "../utils/apiFeatures.js";

// @ GET PRODUCT
// @ /api/v1/products
// @ PUBLIC

export const getProducts = asyncHandler(async (req, res) => {
  const totalProducts = await PRODUCT.countDocuments();

  const resultPerPage = 6;
  const apiFeature = new ApiFeatures(PRODUCT.find(), req.query)
    .search()
    .filter()
    .paginate(resultPerPage);
  const products = await apiFeature.query;
  const result = await products.length;
  const colors = await PRODUCT.distinct("color");

  if (products) {
    res
      .status(200)
      .json({ totalProducts, resultPerPage, result, products, colors });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @ GET SINGLE PRODUCT
// @ /api/v1/products/ID
// @ PUBLIC

export const productDetails = asyncHandler(async (req, res) => {
  const product = await PRODUCT.findOne({ _id: req.params.id });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
