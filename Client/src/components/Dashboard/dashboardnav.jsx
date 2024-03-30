import { Link } from "react-router-dom";

export function Dashboardnav() {
  // eslint-disable-next-line no-useless-catch
  try {
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
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    throw error;
  }
}
