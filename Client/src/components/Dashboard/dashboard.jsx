import { Dashboardnav } from "./dashboardnav";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  // eslint-disable-next-line no-useless-catch
  try {
    return (
      <div className="route_flex">
        <Dashboardnav></Dashboardnav>
        <Outlet />
      </div>
    );
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    throw error;
  }
}
