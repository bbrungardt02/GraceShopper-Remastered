import { Dashboardnav } from "./dashboardnav";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="flex-1 bg-yellow-100 min-h-screen">
      <Dashboardnav className="mb-4" />
      <Outlet className="mb-4" />
      <div className="flex justify-center items-center mt-20 mb-20">
        <div className="bi bi-arrow-up-left mx-40 text-9xl"></div>
        <div className="bi bi-arrow-up-right mx-40 text-9xl"></div>
      </div>
      <h1 className="text-4xl font-bold text-gray-700">
        Which would you like to do, sir?
      </h1>
    </div>
  );
}
