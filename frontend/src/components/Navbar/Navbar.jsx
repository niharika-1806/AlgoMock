import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = false;
  return (
    <nav className="navbar">

      <div className="logo">
        <span className="logo-text">AlgoMock</span>
      </div>

      <ul className="nav-links">
        <li>Features</li>
        <li>Practice</li>
        <li>About</li>
      </ul>

      <div className="nav-buttons">
        {
        isLoggedIn ?
        (
          <Link to="/dashboard" className="login-btn">
            Dashboard
          </Link>
        )
        :
        (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )
        }
        <button className="primary-btn">Get Started</button>
      </div>

    </nav>
  );
}

export default Navbar;