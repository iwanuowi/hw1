// load the environment variables
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(" MongoDB connection failed:", error);
  }
}

const productRouter = require("./routes/product");
app.use("/products", productRouter);
app.use("/orders", require("./routes/order"));
app.use("/payment", require("./routes/payment"));

connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce! 🚀");
});

app.listen(8888, () => {
  console.log("Your server is running on http://localhost:8888");
});
