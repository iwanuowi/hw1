const axios = require("axios");
const Order = require("../models/Order");

const getOrders = async () => {
  const orders = await Order.find().sort({ _id: -1 });
  return orders;
};

const getOrder = async (id) => {
  const orders = await Order.findById(id);
  return orders;
};

const addNewOrder = async ({
  customerName,
  customerEmail,
  products,
  totalPrice,
}) => {
  try {
    const billplzReponse = await axios.post(
      process.env.BILLPLZ_API_URL + "v3/bills",
      {
        collection_id: process.env.BILLPLZ_API_COLLECTION_ID,
        description: "Payment for React Ecommerce",
        name: customerName,
        email: customerEmail,
        amount: Math.round(parseFloat(totalPrice) * 100), // safer
        callback_url: process.env.FRONTEND_URL + "verify-payment",
        redirect_url: process.env.FRONTEND_URL + "verify-payment",
      },
      {
        auth: {
          username: process.env.BILLPLZ_API_KEY,
          password: "",
        },
      }
    );

    const billplz_id = billplzReponse.data.id;
    const billplz_url = billplzReponse.data.url;

    const newOrder = new Order({
      customerName,
      customerEmail,
      products,
      totalPrice,
      billplz_id,
    });

    await newOrder.save();

    return { ...newOrder.toObject(), billplz_url };
  } catch (err) {
    console.error("Billplz API error:", err.response?.data || err.message);
    throw err;
  }
};

const updateOrder = async (id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  return updatedOrder;
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
