import { Dashboardnav } from "./dashboardnav";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="flex-1">
      <Dashboardnav></Dashboardnav>
      <Outlet />
    </div>
  );
}
