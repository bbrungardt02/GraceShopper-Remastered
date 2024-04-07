import AngusBurger from "../assets/AngusBurger.jpg";
import ChickenBurger from "../assets/Chicken-Burgers.jpg";
import PorkBurger from "../assets/PorkBurger.jpg";
import FishBurger from "../assets/FishBurger.jpg";
import Fries from "../assets/FriesMenu.jpg";
import IceCreamCone from "../assets/IceCreamCone.jpg";

export default function MenuGallery() {
  return (
    <div className="flex-1 bg-yellow-100">
      <div className="flex items-center h-18 font-cursive py-2 px-4">
        Made Fresh Everyday!
      </div>
      <h1 className="text-center bg-yellow-500">Photo Gallery of Menu Items</h1>
      <div className="flex flex-row flex-wrap justify-center">
        <div className="p-4 flex flex-wrap m-3 border-2 border-yellow-500 rounded animate-border-color">
          <img className="w-36 h-36" src={AngusBurger} alt="nature1" />
          <div className="pl-2 flex flex-wrap text-black text-lg p-4 font-lobster font-bold">
            Angus Burger
          </div>
        </div>
        <div className="p-4 flex flex-wrap m-3 border-2 border-yellow-500 rounded animate-border-color">
          <img className="w-36 h-36" src={ChickenBurger} alt="nature1" />
          <div className="pl-2 flex flex-wrap text-black text-lg p-4 font-lobster font-bold">
            Chicken Burger
          </div>
        </div>
        <div className="p-4 flex flex-wrap m-3 border-2 border-yellow-500 rounded animate-border-color">
          <img className="w-36 h-36" src={PorkBurger} alt="nature1" />
          <div className="pl-2 flex flex-wrap text-black text-lg p-4 font-lobster font-bold">
            Pork Burger
          </div>
        </div>
        <div className="p-4 flex flex-wrap m-3 border-2 border-yellow-500 rounded animate-border-color">
          <img className="w-36 h-36" src={FishBurger} alt="nature1" />
          <div className="pl-2 flex flex-wrap text-black text-lg p-4 font-lobster font-bold">
            Fish Burger
          </div>
        </div>
        <div className="p-4 flex flex-wrap m-3 border-2 border-yellow-500 rounded animate-border-color">
          <img className="w-36 h-36" src={Fries} alt="nature1" />
          <div className="pl-2 flex flex-wrap text-black text-lg p-4 font-lobster font-bold">
            Fries
          </div>
        </div>
        <div className="p-4 flex flex-wrap m-3 border-2 border-yellow-500 rounded animate-border-color">
          <img className="w-36 h-36" src={IceCreamCone} alt="nature1" />
          <div className="pl-2 flex flex-wrap text-black text-lg p-4 font-lobster font-bold">
            Ice Cream Cone
          </div>
        </div>
      </div>
    </div>
  );
}
