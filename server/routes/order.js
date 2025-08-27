const express = require("express");
const { model } = require("mongoose");
// set up order routers
const router = express.Router();

const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
/*
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

// get orders
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});
// get order
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// create order
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, products, totalPrice } = req.body;

    const newOrder = await addNewOrder({
      customerName,
      customerEmail,
      products,
      totalPrice,
    });

    res.status(200).send(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// update order
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;

    const updatedOrder = await updateOrder(id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// delete order
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteOrder(id);

    res.status(200).send({
      message: `Order #${id} has been deleted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

module.exports = router;
