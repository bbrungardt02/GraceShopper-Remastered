import { AuthContext } from "./auth/AuthProvider";
import { useState, useEffect, useContext } from "react";
import { fetchAllOrdersForUser } from "../api/profile";
import { Link } from "react-router-dom";

export default function Profile() {
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const { user } = useContext(AuthContext);

  // NOT FINISHED

  useEffect(() => {
    async function fetchShoppingCarts() {
      try {
        const fetchedShoppingCarts = await fetchAllOrdersForUser();
        setShoppingCarts(fetchedShoppingCarts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchShoppingCarts();
  }, []);

  const calculateTotalPrice = (shoppingCart) => {
    const total = shoppingCart.products.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0);
    return total;
  };

  return (
    <>
      <div className="route_flex">
        <h1 className="userHeader">Welcome, {user.username}!</h1>
        <div className="userInfo">
          <u>USER INFO</u>
          <div>{("username:", user.username)}</div>
          <div>{("email:", user.email)}</div>
          <hr></hr>
          <div className="orderhistory">
            <h2> Order History</h2>
            {shoppingCarts.length > 0 ? (
              <div>
                {shoppingCarts.map((shoppingCart) => (
                  <div id="scroll">
                    <div
                      key={shoppingCart.shoppingcart_id}
                      className="ShoppingCart"
                    >
                      <h2>Order No. {shoppingCart.shoppingcart_id}</h2>
                      <h3>Total: ${calculateTotalPrice(shoppingCart)}</h3>
                      {shoppingCart.products.map((item) => (
                        <div key={item.item_id}>
                          <h4>{item.name}</h4>
                          <p>Qty: {item.qty}</p>
                          <p>Cost Per Item: ${item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Your Order History is empty 🤕</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
