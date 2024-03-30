const client = require("../client");

async function createCart_Item({ shoppingcart_id, product_id, count }) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
            INSERT INTO cart_items(shoppingcart_id, product_id, count)
            VALUES($1,$2,$3)
            RETURNING *;
            `,
      [shoppingcart_id, product_id, count]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function getCartById(item_id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    SELECT * FROM cart_items
    WHERE item_id = $1;
    `,
      [item_id]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCartItem({ item_id, count }) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
      UPDATE cart_items
      SET count = $2
      WHERE item_id = $1
      RETURNING *;
    `,
      [item_id, count]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function deleteCartItem(item_id) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
  DELETE from cart_items 
  WHERE item_id = $1
  RETURNING *;
  `,
      [item_id]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function getItemsFromCartId(shoppingcart_id) {
  try {
    const { rows: items } = await client.query(
      `
      SELECT *
      FROM cart_items
      WHERE shoppingcart_id = $1;
    `,
      [shoppingcart_id]
    );
    return items;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart_Item,
  getCartById,
  updateCartItem,
  deleteCartItem,
  getItemsFromCartId,
};
