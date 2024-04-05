import { Link } from "react-router-dom";

export function Dashboardnav() {
  return (
    <>
      <div className="route_flex">
        <nav className="nav">
          <div className="Link">
            <Link to="inventory">Products</Link>
          </div>
          <div className="Link">
            <Link to="users">Users</Link>
          </div>
        </nav>
      </div>
    </>
  );
}
