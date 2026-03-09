import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import "../styles/Checkout.css";

function Checkout() {

  const { cartItems, clearCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async (e) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_SONdydn9LhymWu",
      amount: total * 100, // Razorpay uses paise
      currency: "INR",
      name: "Lirsly",
      description: "Order Payment",

      handler: async function (response) {

        // After payment success → save order
        await API.post("/orders/create", {
          name,
          email,
          address,
          items: cartItems,
          total,
          paymentId: response.razorpay_payment_id
        });

        alert("Payment successful & Order placed!");

        clearCart();
      },

      prefill: {
        name: name,
        email: email
      },

      theme: {
        color: "#000"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout-container">

      <h2>Checkout</h2>

      <form onSubmit={placeOrder} className="checkout-form">

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          required
        />

        <h3>Total: ₹{total}/-</h3>

        <button className="btn">
          Pay & Place Order
        </button>

      </form>

    </div>
  );
}

export default Checkout;