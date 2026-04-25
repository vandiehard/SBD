import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 5%",
        background: isScrolled ? "var(--surface)" : "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(10px)",
        borderBottom: isScrolled ? "1px solid var(--border-color)" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "var(--primary)",
          fontWeight: "bold",
          fontSize: "1.5rem",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "-0.5px",
        }}
      >
        MyKlinik Pro
      </h2>
      <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        <a
          href="#about"
          style={{
            color: "var(--text-main)",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
          onMouseLeave={(e) => (e.target.style.color = "var(--text-main)")}
        >
          Tentang Kami
        </a>
        <a
          href="#portfolio"
          style={{
            color: "var(--text-main)",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
          onMouseLeave={(e) => (e.target.style.color = "var(--text-main)")}
        >
          Portfolio
        </a>
        <a
          href="#jadwal"
          style={{
            color: "var(--text-main)",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
          onMouseLeave={(e) => (e.target.style.color = "var(--text-main)")}
        >
          Jadwal Operasi
        </a>
        <ThemeToggle />
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Login Staff
        </button>
      </nav>
    </header>
  );
};

export default Header;
