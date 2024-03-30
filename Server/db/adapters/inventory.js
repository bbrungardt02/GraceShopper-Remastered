const client = require("../client");

async function createInventories({ quantity }) {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `
            INSERT INTO inventories(quantity)
            VALUES($1)
            RETURNING *;
            `,
      [quantity]
    );
    return inventory;
  } catch (error) {
    throw error;
  }
}

async function getInventoryById(id) {
  const {
    rows: [inventory],
  } = await client.query(
    `
  SELECT * 
  FROM inventories
  WHERE inventory_id=$1;
  `,
    [id]
  );
  console.log("getInventoriesById CHECK", inventory);
  return inventory;
}

async function getAllInventory() {
  try {
    const { rows } = await client.query(`
          SELECT * FROM inventories;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateInventoryQuantity(inventory_id, quantity) {
  try {
    const updated = await client.query(
      `
      UPDATE inventories
      SET quantity = $2
      WHERE inventory_id = $1
      RETURNING *
    `,
      [inventory_id, quantity]
    );
    console.log("Inventory quantity updated successfully!");

    return updated;
  } catch (error) {
    console.log("Error updating Inventory quantity:", error);
  }
}

async function checkoutInventoryQuantity(inventory_id, quantity) {
  try {
    await client.query(
      `
      UPDATE inventories
      SET quantity = quantity - $2
      WHERE inventory_id = $1
      RETURNING *
    `,
      [inventory_id, quantity]
    );
    console.log("Inventory quantity updated successfully!");
  } catch (error) {
    console.log("Error updating Inventory quantity:", error);
  }
}

module.exports = {
  createInventories,
  getInventoryById,
  getAllInventory,
  checkoutInventoryQuantity,
  updateInventoryQuantity,
};
