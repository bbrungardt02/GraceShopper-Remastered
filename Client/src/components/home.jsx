/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthProvider";
import bigburger from "../assets/bigburger.jpg";
import { Link } from "react-router-dom";
import bigburger2 from "../assets/bigburger2.jpg";
import fries from "../assets/fries.jpg";
import chickenBurger from "../assets/Chicken-Burgers.jpg";

export function Homepage() {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  const { loggedIn } = useContext(AuthContext);
  return (
    <div className="bg-yellow-100">
      {showPopup && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-9/10 max-h-9/10">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 pl-12 pr-12 border border-black">
              <h1>Brandon Brungardt</h1>
              <a
                className="text-blue-500 underline"
                href="http://www.linkedin.com/in/brandonbrungardt"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Brandon's LinkedIn
              </a>
              <h1>Brian Kim</h1>
              <a
                className="text-blue-500 underline"
                href="https://www.linkedin.com/in/bibimbop/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Brian's LinkedIn
              </a>
              <h1>Elliot Carmona</h1>
              <a
                className="text-blue-500 underline"
                href="http://linkedin.com/in/elliotcarmona016"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Elliot's LinkedIn
              </a>
              <h1>Charlotte Sass</h1>
              <a
                className="text-blue-500 underline"
                href="https://www.linkedin.com/in/charlotte-sass/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Charlotte's LinkedIn
              </a>
              <button
                className="absolute top-0 right-0 m-2"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-12">
        <div
          className="relative bg-cover bg-center flex justify-center items-center h-120 transition-all duration-500 ease-in-out transform hover:scale-105"
          style={{ backgroundImage: `url(${bigburger2})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1
            className="relative z-10 text-center text-6xl font-bold text-yellow-500 transition-all duration-500 ease-in-out transform hover:scale-125"
            style={{
              WebkitTextStroke: "2px black",
              WebkitTextFillColor: "#ffd700",
              textShadow:
                "0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700",
            }}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            THE ORIGINAL BURGER JOINT<br></br> BEFORE MC**ALD'S
          </h1>
        </div>
      </div>
      <div className="mx-12 flex justify-center items-center flex-wrap p-10 bg-gray-100 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            The Burger Above Their Burger
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Have a taste of our world-renowned* Burger & Fries! We have a
            variety of foods sure to satisfy your appetite<br></br> whether
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            it's a juicy burger, our specially seasoned fries, or one of our
            refreshing beverages!
          </p>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300"
            onClick={openPopup}
          >
            ABOUT US
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="m-4">
          <div
            className="relative bg-cover w-72 h-48 rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${fries})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-end p-4">
              <h4 className="text-lg font-bold text-white mb-2">
                Seasoned Crispy Fries
              </h4>
              <Link
                className="bg-yellow-500 text-black rounded-lg px-5 py-2.5 transition-colors duration-300 ease-in-out hover:bg-yellow-600"
                to="/menu"
              >
                Order Online
              </Link>
            </div>
          </div>
        </div>
        <div className="m-4">
          <div
            className="relative bg-cover w-72 h-48 rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${chickenBurger})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-end p-4">
              <h4 className="text-lg font-bold text-white mb-2">
                Chicken Burger
              </h4>
              <Link
                className="bg-yellow-500 text-black rounded-lg px-5 py-2.5 transition-colors duration-300 ease-in-out hover:bg-yellow-600"
                to="/menu"
              >
                Order Online
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            "The Best Burger I Ever Had"
          </h1>
          <p className="text-lg text-gray-700">- Satisfied Customer</p>
        </div>
        <div className="flex justify-center items-center bg-gray-100">
          <img
            src={bigburger}
            alt="Big Burger"
            className="max-w-full h-auto md:max-w-md transition-all duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Order Online or Come Visit Us Today
          </h1>
          {loggedIn ? (
            <Link
              className="inline-block px-6 py-3 mb-3 rounded-lg bg-yellow-500 text-black font-bold transition-all duration-300 ease-in-out hover:bg-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105"
              to="/shoppingcart"
            >
              Get Started
            </Link>
          ) : (
            <Link
              className="inline-block px-6 py-3 mb-3 rounded-lg bg-yellow-500 text-black font-bold transition-all duration-300 ease-in-out hover:bg-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105"
              to="/login"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
