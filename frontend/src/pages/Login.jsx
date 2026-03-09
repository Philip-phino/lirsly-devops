import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import "../styles/Alert.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="login-container">

      {error && (
        <div className="custom-alert alert-error">
          {error}
        </div>
      )}

      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>

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
          Login
        </button>

      </form>

      <p className="register-link">
        Don't have an account?  
        <Link to="/register"> Register</Link>
      </p>

    </div>
  );
}

export default Login;