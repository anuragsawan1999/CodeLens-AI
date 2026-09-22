import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const login = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {

      alert("Login failed");

    }

  };


  return (

    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0d1117",
      color: "white",
      padding: "20px"
    }}>


      <div style={{
        background: "#161b22",
        padding: "30px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "300px"
      }}>


        <h2>Login</h2>


        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />


        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />


        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "10px",
            background: "#238636",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>


        {/* SIGNUP BUTTON UI */}
        <button
          onClick={() => navigate("/signup")}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            background: "transparent",
            color: "#58a6ff",
            border: "1px solid #58a6ff",
            cursor: "pointer"
          }}
        >
          Create new account
        </button>


      </div>

    </div>

  );

}