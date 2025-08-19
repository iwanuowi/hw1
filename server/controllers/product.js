const Product = require("../models/Product");

const getProducts = async (category) => {
  let filter = {};
  if (category) {
    filter.category = category;
  }
  return await Product.find(filter);
};

const getProduct = async (id) => {
  return await Product.findById(id);
};

const addProduct = async (name, description, price, category) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  await newProduct.save();
  return newProduct;
};

const updateProduct = async (name, description, price, category) => {
  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true,
    }
  );
  return updateProduct;
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
