import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";
import "../styles/Alert.css";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        email,
        password
      });

      setMessage("Registration successful. Please login.");
      setType("success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {

      setMessage(err.response?.data?.message || "Registration failed");
      setType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
   <div className="register-container">

    {message && (
      <div className={`custom-alert alert-${type}`}>
        {type === "success" ? "✅" : "❌"} {message}
      </div>
    )}

    <div className="register-card">

      <h2 className="register-title">Register</h2>

      <form className="register-form" onSubmit={handleSubmit}>

        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit">
          Register
        </button>

      </form>

      <p className="register-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </div>

  </div>
  );
}

export default Register;