// add product to cart
export function AddToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart(cart);
  return true;
}

// export function AddToCart(product) {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   cart.push(product);

//   updateCart(cart);

//   return true;
// }

// get all the items in the cart
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// update the cart to local storage
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// delete item from the cart
export function deleteItemFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  updateCart(cart);
  return cart;
}
