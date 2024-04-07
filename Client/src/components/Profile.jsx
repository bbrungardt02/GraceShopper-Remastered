import { AuthContext } from "./auth/AuthProvider";
import { useState, useEffect, useContext } from "react";
import { fetchAllOrdersForUser } from "../api/profile";

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
      <div className="flex-1 p-4 bg-yellow-100">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
        <div className="space-y-4">
          <u className="text-lg font-semibold">USER INFO</u>
          <div className="font-medium">Username: {user.username}</div>
          <div className="font-medium">Email: {user.email}</div>
          <hr className="my-4"></hr>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order History</h2>
            {shoppingCarts.length > 0 ? (
              <div className="space-y-4">
                {shoppingCarts.map((shoppingCart) => (
                  <div
                    key={shoppingCart.shoppingcart_id}
                    className="p-4 m-2 border-2 border-yellow-500 rounded shadow-md transition-colors duration-200 ease-in-out hover:border-yellow-600 overflow-y-auto max-h-60 w-1/4"
                  >
                    <h2 className="text-lg font-semibold mb-2">
                      Order No. {shoppingCart.shoppingcart_id}
                    </h2>
                    <h3 className="text-lg font-medium mb-2">
                      Total: ${calculateTotalPrice(shoppingCart)}
                    </h3>
                    {shoppingCart.products.map((item) => (
                      <div key={item.item_id} className="space-y-2">
                        <h4 className="text-base font-medium">{item.name}</h4>
                        <p className="text-sm">Qty: {item.qty}</p>
                        <p className="text-sm">Cost Per Item: ${item.price}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base">Your Order History is empty 🤕</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
