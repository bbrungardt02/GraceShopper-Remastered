const client = require("../client");

async function createProduct({
  product_name,
  price,
  description,
  inventory_id,
  category,
}) {
  await client.query(
    `
    INSERT INTO inventories (inventory_id, quantity)
    VALUES ($1, 100)
    ON CONFLICT (inventory_id) DO NOTHING;
    `,
    [inventory_id]
  );

  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products (product_name, price, description, inventory_id, category)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (product_name) DO NOTHING
      RETURNING *;
      `,
      [product_name, price, description, inventory_id, category]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
          SELECT * FROM products;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(product_id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * FROM products
    WHERE product_id = $1;
    `,
      [product_id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(
  product_id,
  product_name,
  price,
  description,
  category,
  quantity
) {
  try {
    const {
      rows: [updatedProduct],
    } = await client.query(
      `
      UPDATE products
      SET product_name = $2,
          price = $3,
          description = $4,
          category = $5
      WHERE product_id = $1;
    `,
      [product_id, product_name, price, description, category, quantity]
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(inventory_id) {
  console.log("ping");
  try {
    // Check if the product_id exists in the cart_items table
    const checkCartItems = await client.query(
      `SELECT COUNT(*) FROM cart_items WHERE product_id = $1`,
      [inventory_id]
    );
    // If the product_id exists in cart_items, set it to null
    if (checkCartItems.rows[0].count > 0) {
      await client.query(
        `UPDATE cart_items SET product_id = NULL WHERE product_id = $1`,
        [inventory_id]
      );
    }
    // Perform the deletion from the products table
    await client.query(
      `DELETE FROM products
      WHERE inventory_id = $1`,
      [inventory_id]
    );
    // Perform the deletion from the inventories table
    await client.query(
      `DELETE FROM inventories 
      WHERE inventory_id = $1`,
      [inventory_id]
    );

    return { success: true, message: "inventory item deleted" };
  } catch (error) {
    return { success: false, message: error };
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
