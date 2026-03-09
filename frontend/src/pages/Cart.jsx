import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {

  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={item._id} className="cart-item">

              <img
                src={`http://localhost:5000/uploads/products/${item.image}`}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}/-</p>

                <button
                  className="btn remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{total}/-</h3>

            <button
              className="btn checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;