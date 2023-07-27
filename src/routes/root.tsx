import { Outlet, Link } from "react-router-dom";


export default function Root() {
    return (
      <>
        <div className="navbar">
          <h1>Github Repositories</h1>
          <nav>
            <ul>
              <li>
                <Link to={`/`}>Home page</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }