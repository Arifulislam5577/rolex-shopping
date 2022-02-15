import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import authRouter from "./routes/authRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/OrderRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1/order", orderRouter);

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connect to database");
});

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    "Listen on port: " + PORT + " at " + process.env.NODE_ENV + " mode"
  );
});
