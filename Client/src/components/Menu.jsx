/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import {
  fetchAllProducts,
  addItemToCart,
  getUserShoppingCart,
} from "../api/menu";

const isInCart = (product_id) => {
  // return true or false if the product with id or productId
  // is in your local storage cart
  // Retrieve the cart items from the local storage and check if the product is in the cart
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return cartItems.some((item) => item.product_id === product_id);
};

export default function allProducts({ setCartItemCount }) {
  const [products, setProducts] = useState([]);
  const [shoppingCartId, setShoppingCartId] = useState(null);
  const [counts, setCounts] = useState({});
  const [insideCart, setInsideCart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
        //needs to be different function for guest user functionality
        const result = await getUserShoppingCart();
        console.log("User shopping cart::::??", result);
        setShoppingCartId(result.shoppingcart_id);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const addToCart = async (shoppingcart_id, product_id, count) => {
    if (shoppingcart_id) {
      try {
        const cartItem = await addItemToCart({
          shoppingcart_id,
          product_id,
          count: count || 1,
        });
        setCounts({
          ...counts,
          [product_id]: 1,
        });

        // Update the cart item count state
        setCartItemCount((prevCount) => prevCount + (counts[product_id] || 1));
        setInsideCart((prevState) => ({
          ...prevState,
          [product_id]: true,
        }));

        return cartItem;
      } catch (error) {
        console.log("Failed to add item to cart:", error);
      }
    }
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="flex-1 bg-yellow-100">
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">Menu</h2>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category}>
          <h1>{category}</h1>
          {products.map((product) => (
            <div
              className="menuItem min-w-[18rem] m-4 inline-table grid-cols-4 justify-center mr-1 pb-4 m-1 border-2 border-yellow-500 rounded shadow-md"
              key={product.product_id}
            >
              <h3 className="text-white">{product.product_name}</h3>
              <div className="text-white">
                <p>{product.description}</p>
                <p>${product.price}</p>

                <div>
                  {insideCart[product.product_id] ||
                  isInCart(product.product_id) ? (
                    // Display stuff if product is in cart
                    <h4>ADDED TO CART</h4>
                  ) : (
                    // Don't display stuff if product is not in cart
                    <div>
                      <div>
                        <button
                          className="bg-slate-400 border-none text-black px-4 py-2 text-center no-underline inline-block text-base mx-1 cursor-pointer rounded-md transition-colors duration-300 ease-in-out"
                          onClick={() => {
                            const currentCount =
                              counts[product.product_id] || 1;
                            setCounts({
                              ...counts,
                              [product.product_id]:
                                currentCount > 1 ? currentCount - 1 : 1,
                            });
                          }}
                        >
                          -
                        </button>
                        <span className="inline-block text-base font-bold mx-2">
                          {counts[product.product_id] || 1}
                        </span>
                        <button
                          className="bg-slate-400 border-none text-black px-4 py-2 text-center no-underline inline-block text-base mx-1 cursor-pointer rounded-md transition-colors duration-300 ease-in-out"
                          onClick={() => {
                            const currentCount =
                              counts[product.product_id] || 1;
                            setCounts({
                              ...counts,
                              [product.product_id]: currentCount + 1,
                            });
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="bg-yellow-300 border-none text-black px-4 py-2 text-center no-underline inline-block text-base mt-2 cursor-pointer rounded transition-colors duration-300 ease-in-out"
                        onClick={() =>
                          addToCart(
                            shoppingCartId,
                            product.product_id,
                            counts[product.product_id] || 1
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
