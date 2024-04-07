import { useState } from "react";
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
    <footer className="flex flex-row bg-black p-5 text-yellow-500 text-sm font-sans text-center border-t border-gray-300 justify-center list-none">
      <h1 className="text-green-500 text-center -mt-12"></h1>
      <div className="flex flex-row justify-center items-center">
        <div className="p-4 flex-1/3">
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
            <div className="fixed inset-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
              <img
                className="object-contain w-full h-full z-10"
                src={gucci}
                alt="Gucci Mane"
              />
              <button
                className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-lg text-black z-20"
                onClick={closePopup}
              >
                X
              </button>
            </div>
          )}
        </div>
        <div className="p-4 flex-1/3">
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
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div href="#">MyMcDonald's Rewards</div>
        </div>
        <div className="p-4 flex-1/3">
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
