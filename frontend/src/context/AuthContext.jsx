import { createContext, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {

    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: res.data.email,
        role: res.data.role,
      })
    );

    // clear guest cart after login
    localStorage.removeItem("cart");

    setUser({
      email: res.data.email,
      role: res.data.role,
    });

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // clear cart when logging out
    localStorage.removeItem("cart");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export default AuthProvider;