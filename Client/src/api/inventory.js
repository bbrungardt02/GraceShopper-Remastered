import { API_URL } from "./constants";

export async function fetchAllInventories() {
  try {
    const response = await fetch(`${API_URL}/api/inventories`, {
      credentials: "include",
    });
    const inventories = await response.json();

    // Fetch product details for each inventory
    const inventoryPromises = inventories.map(async (inventory) => {
      const productResponse = await fetch(
        `${API_URL}/api/products/${inventory.product_id}`
      );
      const product = await productResponse.json();
      inventory.product = product;
      return inventory;
    });

    const fetchedInventories = await Promise.all(inventoryPromises);
    console.log("fetched inventories", fetchedInventories);
    return fetchedInventories;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(inventory_id) {
  console.log("product_id & inventory_id:", inventory_id);
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/api/products/${inventory_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inventory_id }),

      credentials: "include",
    });
    console.log(response);
    const results = response.json;
    return results;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(
  product_name,
  price,
  description,
  inventory_id,
  category
) {
  // Create inventory row
  await fetch(`${API_URL}/api/inventories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inventory_id,
    }),
    credentials: "include",
  });
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(product_name, price, description, inventory_id, category);
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name,
        price,
        description,
        inventory_id,
        category,
      }),
      credentials: "include",
    });
    const results = await response.json();

    return results;
  } catch (error) {
    throw error;
  }
}

export async function updateInventoryQuantity(inventory_id, quantity) {
  try {
    const response = await fetch(`${API_URL}/api/inventories/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inventory_id,
        quantity,
      }),
      credentials: "include",
    });
    const result = await response.json();
    console.log("Result inside of update Inventory QTY:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
