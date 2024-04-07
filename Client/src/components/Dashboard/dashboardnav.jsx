import { Link } from "react-router-dom";

export function Dashboardnav() {
  return (
    <>
      <div className="bg-yellow-100">
        <nav className="bg-black flex">
          <div className="m-auto text-red-500 font-bold mb-5">
            <Link to="inventory">Products</Link>
          </div>
          <div className="m-auto text-red-500 font-bold mb-5">
            <Link to="users">Users</Link>
          </div>
        </nav>
      </div>
    </>
  );
}
