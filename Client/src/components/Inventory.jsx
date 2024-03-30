import { useState, useEffect } from "react";
// import InventoryItem from "./InventoryItem";
// // import { useNavigate } from "react-router-dom";
import {
  fetchAllInventories,
  createProduct,
  updateInventoryQuantity,
  deleteProduct,
} from "../api/inventory";
import { fetchAllProducts } from "../api/menu";
import { Outlet } from "react-router-dom";

export default function allInventories() {
  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryID, setInventoryID] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    async function fetchInventories() {
      try {
        const fetchedInventories = await fetchAllInventories();
        setInventories(fetchedInventories);
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInventories();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    console.log(
      "LIST OF STUFF",
      product_name,
      price,
      description,
      inventoryID,
      category
    );
    try {
      const addedInventoryFromDB = await createProduct({
        product_name,
        price,
        description,
        inventory_id: inventoryID,
        category,
      });
      console.log("AddedInventoryFromDB:", addedInventoryFromDB);
      alert("Product added to Inventory!");
      return addedInventoryFromDB;
    } catch (error) {
      throw error;
    }
  }

  async function handleUpdateInventoryQuantity(e, inventory_id, quantity) {
    e.preventDefault();
    try {
      const updatedInventoryFromDB = await updateInventoryQuantity(
        inventory_id,
        quantity
      );
      console.log("updatedInventoryFromDB:", updatedInventoryFromDB);
      return updatedInventoryFromDB;
    } catch (error) {
      throw error;
    }
  }

  async function handleDeleteProduct(e, inventory_id) {
    e.preventDefault();
    try {
      const deleteProductsFromDB = await deleteProduct(inventory_id);
      return deleteProductsFromDB;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="route_flex">
      <h2>Inventory</h2>
      <form
        onSubmit={(e) =>
          handleAdd(e, product_name, price, description, inventoryID, category)
        }
        className="addProduct"
      >
        <label>Create New Product</label>
        <input
          type="text"
          id="product_name"
          placeholder="Product Name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          id="inventory_id"
          placeholder="Inventory ID"
          value={inventoryID}
          onChange={(e) => setInventoryID(e.target.value)}
        />
        <input
          type="number"
          id="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          id="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      {products.map((product) => {
        const productInventories = inventories.filter(
          (inventory) => inventory.inventory_id === product.inventory_id
        );
        const totalQuantity = productInventories.reduce(
          (sum, inventory) => sum + inventory.quantity,
          0
        );
        return (
          <div key={product.product_id} className="inventories">
            <p>Inventory ID: {product.inventory_id}</p>
            <p>Product: {product.product_name}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {totalQuantity}</p>
            <form
              onSubmit={(e) => {
                handleUpdateInventoryQuantity(
                  e,
                  product.inventory_id,
                  quantity
                );
              }}
            >
              <input
                type="number"
                id="quantity"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button type="submit" value={product.product_id}>
                Update Quantity
              </button>
            </form>
            <button
              className="shoppingButtons"
              value={product.product_id}
              onClick={(e) => {
                handleDeleteProduct(e, product.inventory_id);
              }}
            >
              Delete {product.product_name}?
            </button>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}
