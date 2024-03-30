const { array } = require("prop-types");
const client = require("../client");

async function createShoppingCarts({ status, user_id }) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
            INSERT INTO shoppingcarts(status, user_id)
            VALUES($1,$2)
            RETURNING *;
            `,
      [status, user_id]
    );
    return shoppingCart;
  } catch (error) {
    throw error;
  }
}

// not sure if we need a full crud but will do so just in case
async function deleteShoppingCartByUserId({ user_id }) {
  try {
    //untested
    console.log(user_id);
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
        DELETE FROM shoppingcarts
        WHERE user_id = $1
        AND status = 'pending'
         `,
      [user_id]
    );
  } catch (error) {
    throw error;
  }
}

async function updateShoppingCart({ userid, updateObj }) {
  try {
    //untested
    console.log(userid);
    console.log(updateObj);
    const setString = Object.keys(updateObj)

      .map((key, i) => {
        return `${key}=$${i + 1}`;
      })
      .join(", ");
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      UPDATE shoppingcarts
      SET ${setString}
      WHERE user_id = ${userid}
      returning *
    `,
      Object.values(updateObj)
    );
    return shoppingCart;
  } catch (error) {
    throw error;
  }
}

async function getShoppingCartByUserId(user_id) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      SELECT
      shoppingcarts.shoppingcart_id AS shoppingcart_id,
      shoppingcarts.status AS status,
      shoppingcarts.user_id AS user_id,
      COALESCE(JSON_AGG(
        JSON_BUILD_OBJECT(
          'item_id', cart_items.item_id,
          'product_id', products.product_id,
          'inventory_id', products.inventory_id,
          'name', products.product_name,
          'qty', cart_items.count,
          'price', products.price
        )
      ), '[]'::json) AS products
    FROM
      shoppingcarts
      LEFT JOIN cart_items ON shoppingcarts.shoppingcart_id = cart_items.shoppingcart_id
      LEFT JOIN products ON products.product_id = cart_items.product_id
    WHERE
      shoppingcarts.user_id = $1
      AND shoppingcarts.status = 'pending'
    GROUP BY
      shoppingcarts.shoppingcart_id, shoppingcarts.status, shoppingcarts.user_id
    `,
      [user_id]
    );
    return shoppingCart;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByUserId(user_id) {
  try {
    const { rows: shoppingCart } = await client.query(
      `
      SELECT
      shoppingcarts.shoppingcart_id AS shoppingcart_id,
      shoppingcarts.status AS status,
      shoppingcarts.user_id AS user_id,
      COALESCE(JSON_AGG(
        JSON_BUILD_OBJECT(
          'item_id', cart_items.item_id,
          'product_id', products.product_id,
          'name', products.product_name,
          'qty', cart_items.count,
          'price', products.price
        )
      ), '[]'::json) AS products
    FROM
      shoppingcarts
      LEFT JOIN cart_items ON shoppingcarts.shoppingcart_id = cart_items.shoppingcart_id
      LEFT JOIN products ON products.product_id = cart_items.product_id
    WHERE
      shoppingcarts.user_id = $1
      AND shoppingcarts.status = 'completed'
    GROUP BY
      shoppingcarts.shoppingcart_id, shoppingcarts.status, shoppingcarts.user_id
    `,
      [user_id]
    );
    return shoppingCart;
  } catch (error) {
    console.log("Error in getting the Shopping Cart by User Id:", error);
    throw error;
  }
}

async function updateShoppingStatus(user_id) {
  try {
    // Update the status from 'pending' to 'completed'
    await client.query(
      `
      UPDATE shoppingcarts
      SET status = 'completed'
      WHERE user_id = $1
        AND status = 'pending'
      RETURNING *
    `,
      [user_id]
    );

    console.log("Shopping status updated successfully!");
  } catch (error) {
    console.log("Error updating shopping status:", error);
  }
}

// async function getShoppingCartById(shoppingcart_id) {
//   try {
//     const {
//       rows: [shoppingCart],
//     } = await client.query(
//       `
//       SELECT *
//       FROM shoppingcarts
//       WHERE shoppingcart_id = $1;
//     `,
//       [shoppingCart]
//     );
//     return shoppingcart_id;
//   } catch (error) {
//     throw error;
//   }
// }

async function deleteShoppingCart(user_id) {
  try {
    console.log(user_id);
    await client.query(
      `DELETE FROM cart_items
       WHERE shoppingcart_id IN (
       SELECT shoppingcart_id
       FROM shoppingcarts
       WHERE user_id = $1
       AND status = 'pending'
);`,
      [user_id]
    );
    await client.query(
      `DELETE FROM shoppingcarts
       WHERE user_id = $1
       AND status = 'pending';
         `,
      [user_id]
    );
    return { success: true, message: "Shopping Cart Deleted" };
  } catch (error) {
    return { success: false, message: error };
  }
}

module.exports = {
  createShoppingCarts,
  deleteShoppingCartByUserId,
  updateShoppingCart,
  getShoppingCartByUserId,
  //getShoppingCartById,
  getAllOrdersByUserId,
  updateShoppingStatus,
  deleteShoppingCart,
};
