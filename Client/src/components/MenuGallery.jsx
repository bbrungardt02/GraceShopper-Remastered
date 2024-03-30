import "../App.css";
import "../index.css";
import "./Gallery.css";
import AngusBurger from "../assets/AngusBurger.jpg";
import ChickenBurger from "../assets/Chicken-Burgers.jpg";
import PorkBurger from "../assets/PorkBurger.jpg";
import FishBurger from "../assets/FishBurger.jpg";
import Fries from "../assets/FriesMenu.jpg";
import IceCreamCone from "../assets/IceCreamCone.jpg";

export default function MenuGallery() {
  return (
    <div className="route_flex">
      <div id="header">Made Fresh Everyday!</div>
      <h1 className="gallery">Photo Gallery of Menu Items</h1>
      <div className="gallerydiv">
        <div className="gallerydivs">
          <img className="menuGallery" src={AngusBurger} alt="nature1" />
          <div className="galleryName"> Angus Burger </div>
        </div>
        <div className="gallerydivs">
          <img className="menuGallery" src={ChickenBurger} alt="nature1" />
          <div className="galleryName"> Chicken Burger </div>
        </div>
        <div className="gallerydivs">
          <img className="menuGallery" src={PorkBurger} alt="nature1" />
          <div className="galleryName"> Pork Burger </div>
        </div>
        <div className="gallerydivs">
          <img className="menuGallery" src={FishBurger} alt="nature1" />
          <div className="galleryName"> Fish Burger </div>
        </div>
        <div className="gallerydivs">
          <img className="menuGallery" src={Fries} alt="nature1" />
          <div className="galleryName"> Fries </div>
        </div>
        <div className="gallerydivs">
          <img className="menuGallery" src={IceCreamCone} alt="nature1" />
          <div className="galleryName"> Ice Cream Cone </div>
        </div>
      </div>
    </div>
  );
}
