/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { logout } from "../api/userAuth";
import useAuth from "../components/hooks/useAuth";
import "../App.css";
import "../index.css";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Nav = ({ cartItemCount }) => {
  const { setLoggedIn, loggedIn, user } = useAuth();
  const navigate = useNavigate();
  console.log("loggedIn", loggedIn);

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
    navigate("/login");
  }

  return (
    <nav className="flex items-center justify-between bg-black py-4 px-8 text-white">
      <h3 className="text-2xl font-bold">MICKEY D's</h3>
      <div className="flex items-center">
        <Link
          to="/"
          className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
        >
          Home
        </Link>
        {user?.username != "Stranger" && (
          <>
            <Link
              to="/Profile"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              Profile
            </Link>
            <Link
              to="/Menu"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/MenuGallery"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/shoppingcart"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              <div className="relative">
                <i className="bi bi-cart3 text-xl text-yellow-300 hover:text-yellow-500 transition-colors"></i>
                {cartItemCount > 0 && (
                  <span className="absolute bottom-4 left-5 bg-red-500 text-white rounded-full w-5 h-5 text-base flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
          </>
        )}
        {user?.adm != false && user?.username != "Stranger" && (
          <Link
            to="/Dashboard"
            className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
          >
            Admin-Dash
          </Link>
        )}
        {user?.username === "Stranger" && (
          <>
            <Link
              to="/register"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/Menu"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/MenuGallery"
              className="mx-2 uppercase text-yellow-300 hover:text-yellow-500 transition-colors"
            >
              Gallery
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center">
        <h3 className="mr-4">Hi, {user.username}</h3>
        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-yellow-300 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
