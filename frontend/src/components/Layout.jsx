import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <div className="app-sidebar">
        <h2>⚡ CodeLens</h2>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >
          <a href="/dashboard" style={{ color: "white", textDecoration: "none" }}>
            📊 Dashboard
          </a>

          <a href="/analyze" style={{ color: "white", textDecoration: "none" }}>
            💻 Analyze
          </a>

          <a href="/history" style={{ color: "white", textDecoration: "none" }}>
            📜 History
          </a>

          <a href="/profile" style={{ color: "white", textDecoration: "none" }}>
            👤 Profile
          </a>

          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#da3633",
              color: "white"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="app-main">{children}</div>
    </div>
  );
}
