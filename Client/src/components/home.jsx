import React, { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthProvider";
import bigburger from "../assets/bigburger.jpg";

export function Homepage() {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  try {
    const { loggedIn } = useContext(AuthContext);
    return (
      <>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="popup">
                <h1>Brandon Brungardt</h1>
                <a
                  className="nameLinks"
                  href="http://www.linkedin.com/in/brandonbrungardt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brandon's LinkedIn
                </a>
                <h1>Brian Kim</h1>
                <a
                  className="nameLinks"
                  href="https://www.linkedin.com/in/bibimbop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brian's LinkedIn
                </a>
                <h1>Elliot Carmona</h1>
                <a
                  className="nameLinks"
                  href="http://linkedin.com/in/elliotcarmona016"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Elliot's LinkedIn
                </a>
                <h1>Charlotte Sass</h1>
                <a
                  className="nameLinks"
                  href="https://www.linkedin.com/in/charlotte-sass/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Charlotte's LinkedIn
                </a>
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          </div>
        )}
        <div id="burger2Parent">
          <div id="bigBurger2">
            <h1 className="landertext">
              THE ORIGINAL BURGER JOINT<br></br> BEFORE MC**ALD'S
            </h1>
          </div>
        </div>
        <div className="flexImage">
          <div>
            <h2 id="dah2">The Burger Above Their Burger</h2>
            <p>
              Have a taste of our world-renowned* Burger & Fries! We have a
              variety of foods sure to satisfy your appetite<br></br> whether
              it's a juicy burger, our specially seasoned fries, or one of our
              refreshing beverages!
            </p>
            <button className="shoppingButtons" onClick={openPopup}>
              ABOUT US
            </button>
          </div>
        </div>
        <div className="flexImage">
          <div>
            <div id="fries">
              <h4 className="product">Seasoned Crispy Fries</h4>
              <p>
                <a className="productbtn" href="/menu">
                  Order Online
                </a>
              </p>
            </div>
          </div>
          <div>
            <div id="chickenburger">
              <h4 className="product">Chicken Burger</h4>
              <p>
                <a className="productbtn" href="/menu">
                  Order Online
                </a>
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1>"The Best Burger I Ever Had"</h1>
          <p>- Satisfied Customer</p>
        </div>
        <div id="bigBurger">
          <img src={bigburger} alt="Big Burger" />
        </div>
        <div>
          <h1>Order Online or Come Visit Us Today</h1>
          {loggedIn ? (
            <a className="getStarted" href="/shoppingcart">
              Get Started
            </a>
          ) : (
            <a className="getStarted" href="/login">
              Log In
            </a>
          )}
        </div>
      </>
    );
  } catch (error) {}
}
