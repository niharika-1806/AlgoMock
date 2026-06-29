import "./Navbar.css";
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
        <button className="login-btn">
          Dashboard
        </button>
        )
        :
        (
        <button className="login-btn">
            Login
        </button>
        )
        }
        <button className="primary-btn">Get Started</button>
      </div>

    </nav>
  );
}

export default Navbar;