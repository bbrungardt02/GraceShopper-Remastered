import { Dashboardnav } from "./dashboardnav";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="route_flex">
      <Dashboardnav></Dashboardnav>
      <Outlet />
    </div>
  );
}
