export async function createShoppingCart({ status, user_id }) {
  try {
    const response = await fetch(`/api/shoppingcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        user_id,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateItemQty(item_id, count) {
  try {
    const response = await fetch(`/api/cart_items/${item_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: count }),
    });
    const updatedCartQty = await response.json();
    console.log("updated cart item:", updatedCartQty);
    return updatedCartQty;
  } catch (error) {
    console.error("Error updating Cart Quantity:", error);
  }
}

export async function checkoutInventoryQuantity(inventory_id, quantity) {
  try {
    const response = await fetch(`/api/inventories/checkout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inventory_id,
        quantity,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function completeOrder(user_id) {
  try {
    const response = await fetch(`/api/shoppingcart/completed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function cancelOrder(user_id) {
  try {
    const response = await fetch(`api/shoppingcart/cancel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItemFromCart(item_id) {
  try {
    const response = await fetch(`api/cart_items/${item_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
