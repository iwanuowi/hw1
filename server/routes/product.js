const express = require("express");
//create a express router
const router = express.Router();

// import all the controller functions
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

/*
 1. List all products: `GET /products`
 2. Get specific product details by its ID: `GET /products/:id`
 3. Add a new product: `POST /products`
 4. Update a product by its ID: `PUT /products/:id`
 5. Delete a product by its ID: `DELETE /products/:id`
*/

// get all products
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const products = await getProducts(category);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "unknown error" });
  }
});

// get one products
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "unknown error" });
  }
});

// add new product
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if (!name || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const product = await addProduct(name, description, price, category);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "unknown error" });
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if (!name || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const product = await updateProduct(id, name, description, price, category);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "unknown error" });
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).send({
      message: `Product with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "unknown error" });
  }
});

module.exports = router;
