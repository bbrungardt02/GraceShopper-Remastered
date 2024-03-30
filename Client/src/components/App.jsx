import { useState } from "react";
import Nav from "../components/Nav";
import Menu from "./Menu";
import RegisterForm from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";
import HealthPage from "../components/HealthPage";
import Profile from "../components/Profile";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./home";
import Footer from "./Footer";
import ShoppingCart from "../components/ShoppingCart";
import { Dashboard } from "./Dashboard/dashboard";
import Inventory from "./Inventory";
import Users from "./Users";
import MenuGallery from "./MenuGallery";

const getCartItemCount = () => {
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    try {
      const parsedCartItems = JSON.parse(cartItems);
      console.log("parsedCartItems:", parsedCartItems);
      const cartItemCount = parsedCartItems.reduce((acc, curr) => {
        if (curr.qty === 1) {
          acc += 1;
        } else {
          acc += curr.qty;
        }
        return acc;
      }, 0);
      return cartItemCount;
    } catch (error) {
      console.error("Error parsing cartItems JSON:", error);
    }
  }
  return 0;
};

function App() {
  const [cartItemCount, setCartItemCount] = useState(getCartItemCount());

  return (
    <div className="app_flex">
      <Nav cartItemCount={cartItemCount} />
      <Routes className="route_flex">
        <Route path="/" element={<Homepage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route
          path="/Menu"
          element={<Menu setCartItemCount={setCartItemCount} />}
        />
        <Route path="/MenuGallery" element={<MenuGallery />} />
        <Route path="Dashboard" element={<Dashboard />}>
          <Route path="inventory" element={<Inventory />}></Route>
          <Route path="users" element={<Users />}></Route>
        </Route>
        <Route
          path="/shoppingcart"
          element={<ShoppingCart setCartItemCount={setCartItemCount} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
