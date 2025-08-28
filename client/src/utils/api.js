import axios from "axios";

import { API_URL } from "./constants";

// get/fetch all the product
export async function getProducts(category, page = 1) {
  const response = await axios.get(
    API_URL +
      "products?page=" +
      page +
      (category === "all" ? "" : "&category=" + category)
  );

  return response.data;
}

// get the product by id
export async function getProduct(id) {
  const response = await axios.get(API_URL + "products/" + id);
  return response.data;
}

// create a new product
export async function addProduct(name, description, price, category, image) {
  const response = await axios.post(API_URL + "products", {
    name: name,
    description: description,
    price: price,
    category,
    image,
  });
  return response.data;
}

// update the product by id
export async function updateProduct(
  id,
  name,
  description,
  price,
  category,
  image
) {
  const response = await axios.put(API_URL + "products/" + id, {
    name: name,
    description: description,
    price: price,
    category,
    image,
  });
  return response.data;
}

// delete the product by id
export function deleteProduct(id) {
  return axios.delete(`${API_URL}products/${id}`);
}
