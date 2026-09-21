import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const register = async () => {

    try {

      const res = await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Signup successful 🚀 Please login");

      navigate("/");

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert("User Already exist");

    }

  };


  return (

    <div style={{ padding: "20px" }}>

      <h2>Signup</h2>


      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />


      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />


      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />


      <button onClick={register}>
        Create Account
      </button>

    </div>

  );
}