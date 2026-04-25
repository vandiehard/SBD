import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            color: "var(--primary)",
            fontSize: "1.8rem",
            fontWeight: "bold",
            margin: "0 0 0.25rem 0",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          MyKlinik
        </h2>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            margin: 0,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Pro Management
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Menu
        </span>
        <ThemeToggle />
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {user?.role === "admin" && (
          <>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span style={{ fontSize: "1.2rem" }}>📊</span> Dashboard
            </NavLink>
            <NavLink
              to="/admin/pasien"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span style={{ fontSize: "1.2rem" }}>🧑‍⚕️</span> Pasien
            </NavLink>
            <NavLink
              to="/admin/karyawan"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span style={{ fontSize: "1.2rem" }}>👨‍⚕️</span> Karyawan
            </NavLink>
            <NavLink
              to="/admin/operasi"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span style={{ fontSize: "1.2rem" }}>🏨</span> Operasi
            </NavLink>
          </>
        )}

        {user?.role === "dokter" && (
          <>
            <NavLink
              to="/dokter/dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span style={{ fontSize: "1.2rem" }}>📊</span> Dashboard
            </NavLink>
          </>
        )}
      </nav>

      <div
        className="glass-card"
        style={{
          marginTop: "auto",
          padding: "1.25rem",
          background: "rgba(30, 64, 175, 0.08)",
          borderColor: "var(--border-color)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "8px",
              background: "var(--primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontWeight: "600",
                fontSize: "0.9rem",
                color: "var(--text-main)",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {user?.name || "User"}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--primary-light)",
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            >
              {user?.role || "Guest"}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          style={{ width: "100%", padding: "0.65rem", fontSize: "0.8rem" }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
