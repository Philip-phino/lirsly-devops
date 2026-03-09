import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {

  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">

      <h2 className="logo">Lirsly</h2>

      <ul className="nav-menu">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/cart">
            <span className="cart-icon">🛒</span>
             ({cartItems.length > 0 && cartItems.length})
          </Link>
        </li>

        {user?.role === "admin" && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        {user ? (
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;