import axios from "axios";

const API_URL = "http://localhost:8888/products";

// fetch products by category
export async function getProducts(category = "all") {
  try {
    const response = await axios.get(
      API_URL + (category === "all" ? "" : "?category=" + category)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export function getProduct(id) {
  return axios.get(`${API_URL}/${id}`);
}

export function addProduct(product) {
  return axios.post(API_URL, product);
}

export function updateProduct(id, product) {
  return axios.put(`${API_URL}/${id}`, product);
}

export function deleteProduct(id) {
  return axios.delete(`${API_URL}/${id}`);
}
