export async function fetchAllShoppingCarts(shoppingcart_id) {
  try {
    const response = await fetch(`/api/shoppingcart/:${shoppingcart_id}`);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllOrdersForUser() {
  try {
    const response = await fetch(`/api/shoppingcart/user/order-history`);
    const result = await response.json();
    console.log("fetch all orders for a specific user", result);
    return result;
  } catch (error) {
    console.error(`Error fetching data from server`, error);
  }
}
