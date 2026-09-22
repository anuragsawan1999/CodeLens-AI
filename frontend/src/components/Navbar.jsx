import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 style={{ margin: 0 }}>⚡ CodeLens AI</h2>

      <div className="navbar-links">
        <Link to="/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>

        <Link to="/analyze" style={{ color: "white" }}>
          Analyze
        </Link>

        <Link to="/history" style={{ color: "white" }}>
          History
        </Link>

        <button
          onClick={logout}
          style={{
            background: "#da3633",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
