import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        background: isScrolled
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(15, 23, 42, 0.3)",
        backdropFilter: "blur(10px)",
        borderBottom: isScrolled ? "1px solid var(--glass-border)" : "none",
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
          background: "linear-gradient(to right, #38bdf8, #818cf8)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        MyKlinik
      </h2>
      <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <a
          href="#about"
          style={{
            color: "var(--text-main)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Tentang Kami
        </a>
        <a
          href="#portfolio"
          style={{
            color: "var(--text-main)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Portfolio
        </a>
        <a
          href="#jadwal"
          style={{
            color: "var(--text-main)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Jadwal Operasi
        </a>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Login Staff
        </button>
      </nav>
    </header>
  );
};

export default Header;
