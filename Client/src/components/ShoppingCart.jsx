import { useContext, useState, useEffect } from "react";
import {
  createShoppingCart,
  completeOrder,
  cancelOrder,
  updateItemQty,
  checkoutInventoryQuantity,
  deleteItemFromCart,
} from "../api/shoppingcart";
import { getUserShoppingCart } from "../api/menu";
import { AuthContext } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function StartOrder({ setCartItemCount }) {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  let navigate = useNavigate();

  async function startShopping() {
    try {
      // Check if the user already has a shopping cart
      if (shoppingCart.length > 0) {
        console.log("User already has a shopping cart.");
        return;
      }
      // Create a new shopping cart if no cart exists
      const createdOrder = await createShoppingCart({
        status: "pending",
        user_id: user.user_id,
      });
      //if statement for guest user
      console.log("Created Cart in FE: ", createdOrder);
      setOrder(createdOrder);
      navigate("/Menu");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchShoppingCart = async () => {
      try {
        const result = await getUserShoppingCart();
        setShoppingCart(result.products);
        localStorage.setItem("cartItems", JSON.stringify(result.products));
      } catch (error) {
        console.error("Error fetching shopping cart:", error);
      }
    };
    fetchShoppingCart();
  }, []);

  const totalPrice = shoppingCart.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const handleEditQty = async (item_id, count) => {
    try {
      const updatedCartQty = await updateItemQty(item_id, count);
      const updatedCart = shoppingCart.map((item) => {
        if (item.item_id === item_id) {
          setCartItemCount((prevCount) => {
            if (count === item.qty - 1) {
              return prevCount - 1; // Decrease count by 1
            } else if (count === item.qty + 1) {
              return prevCount + 1; // Increase count by 1
            }
            return prevCount; // No change
          });
          return { ...item, qty: updatedCartQty.count }; // Update the quantity
        }
        return item;
      });
      setShoppingCart(updatedCart);
    } catch (error) {
      console.error("Error handling Edit Quantity:", error);
    }
  };

  const deleteItem = async (item_id, qty) => {
    try {
      const deletedCartItem = await deleteItemFromCart(item_id);
      // reset state of shopping cart
      const result = await getUserShoppingCart();
      setShoppingCart(result.products);
      setCartItemCount((prevCount) => prevCount - qty);
      // Remove the specific item from localStorage based on its ID
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const updatedCartItems = cartItems.filter(
        (item) => item.item_id !== item_id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error("Error handling Delete Item:", error);
    }
  };

  const deleteOrder = async () => {
    try {
      const canceledShoppingCart = await cancelOrder(user.user_id);
      console.log("Canceled shopping cart:", canceledShoppingCart);
      setShoppingCart([]);
      localStorage.clear();
      setCartItemCount(0);
    } catch (error) {
      console.error("Error canceling shopping cart:", error);
    }
  };

  const checkout = async () => {
    try {
      // Update inventory quantities for each item in the shopping cart
      for (const item of shoppingCart) {
        await checkoutInventoryQuantity(item.inventory_id, item.qty);
      }
      // Complete the order
      const completedCart = await completeOrder();
      console.log("Shopping cart completed:", completedCart);
      setShoppingCart([]);
      localStorage.clear();
      setCartItemCount(0);
    } catch (error) {
      console.error("Error completing shopping cart:", error);
    }
  };

  return (
    <div className="route_flex">
      <div id="orderButtons">
        {shoppingCart.length === 0 && (
          <button id="startShopping" onClick={() => startShopping()}>
            Start Order
          </button>
        )}
        {shoppingCart.length > 0 && (
          <>
            <button className="shoppingButtons" onClick={() => checkout()}>
              Checkout
            </button>
            <button className="shoppingButtons" onClick={() => deleteOrder()}>
              Cancel Order
            </button>
          </>
        )}
      </div>
      <div>
        <h1 id="myShoppingCart"> My Shopping Cart</h1>
        <br></br>
        {shoppingCart.length > 0 ? (
          <div id="myCart">
            <h2>Total: ${totalPrice}</h2>
            {shoppingCart.map((item) => (
              <div key={item.item_id}>
                <p>{item.name}</p>
                <p>Qty: {item.qty}</p>
                <button
                  className="shoppingButtons"
                  onClick={() => handleEditQty(item.item_id, item.qty - 1)}
                >
                  {" "}
                  -
                </button>
                <button
                  className="shoppingButtons"
                  onClick={() => deleteItem(item.item_id, item.qty)}
                >
                  Delete
                </button>
                <button
                  className="shoppingButtons"
                  onClick={() => handleEditQty(item.item_id, item.qty + 1)}
                >
                  {" "}
                  +
                </button>
                <p>Cost Per Item: ${item.price}</p>
                <p>Subtotal: ${item.price * item.qty}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Your shopping cart is empty 🤕</p>
        )}
      </div>
    </div>
  );
}
