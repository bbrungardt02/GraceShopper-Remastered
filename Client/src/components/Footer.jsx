import React, { useState } from "react";
import gucci from "../assets/gucci.jpg";

function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <footer>
      <h1
        style={{ color: "green", textAlign: "center", marginTop: "-50px" }}
      ></h1>
      <div id="listitems">
        <div className="flexfooter">
          <h1>About Us</h1>
          <li>
            <a href="#" />
            Our History
          </li>
          <li>
            <a href="#" />
            Leadership team
          </li>
          <li>
            <a href="#" />
            Franchise info
          </li>
          <li>
            <a href="#" onClick={openPopup}>
              Radric Delantic Davis aka Gucci Mane
            </a>
          </li>
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <img src={gucci} alt="Gucci Mane" />
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          )}
        </div>
        <div className="flexfooter">
          <h1>Services</h1>
          <li>
            <a href="#" />
            Wifi
          </li>
          <li>
            <a href="#" />
            McDelivery
          </li>
          <li>
            <a href="#" />
            McCafé
          </li>
          <div href="#">MyMcDonald's Rewards</div>
        </div>
        <div className="flexfooter">
          <h1>Contact Us</h1>
          <li>
            <a href="#" />
            Employement
          </li>
          <li>
            <a href="#" />
            Customer feedback
          </li>
          <li>
            <a href="#" />
            Donations
          </li>
          <li>
            <a href="#" />
            Frequently Asked Questions
          </li>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
