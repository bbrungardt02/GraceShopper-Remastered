import { API_URL } from "./constants";

export async function fetchAllProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    const result = await response.json();
    console.log("result in fetch all Products", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserShoppingCart() {
  try {
    const response = await fetch(`${API_URL}/api/shoppingcart/user/cart`, {
      credentials: "include",
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addItemToCart(shoppingcart_id, product_id, count) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/api/cart_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shoppingcart_id, product_id, count }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    const cart_item = await response.json();
    return cart_item;
  } catch (error) {
    throw error;
  }
}
