import { Link } from "react-router-dom";

export function Dashboardnav() {
  return (
    <>
      <div className="flex-1">
        <nav className="bg-black flex">
          <div className="m-auto">
            <Link to="inventory">Products</Link>
          </div>
          <div className="m-auto">
            <Link to="users">Users</Link>
          </div>
        </nav>
      </div>
    </>
  );
}
