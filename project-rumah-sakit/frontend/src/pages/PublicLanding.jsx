import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const PublicLanding = () => {
  const [operasiList, setOperasiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOperasi = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/operasi");
        setOperasiList(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOperasi();
  }, []);

  const filteredOperasi = operasiList.filter(
    (op) =>
      op.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.jenis_operasi.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-gradient)",
        color: "var(--text-main)",
        overflowX: "hidden",
      }}
    >
      {/* Decorative Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        style={{
          padding: "8rem 5%",
          textAlign: "center",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Premium Healthcare Services <br />
          Excellence in Medical Care
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: "700px",
            margin: "0 auto 3rem auto",
            fontWeight: 500,
            letterSpacing: "0.3px",
            lineHeight: 1.8,
          }}
        >
          Delivering comprehensive medical solutions with board-certified
          specialists, cutting-edge facilities, and patient-centered care. Your
          health is our priority.
        </p>
        <div
          style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}
        >
          <a
            href="#jadwal"
            className="btn btn-primary"
            style={{
              padding: "1rem 2.5rem",
              fontSize: "0.95rem",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            View Surgery Schedule
          </a>
          <a
            href="#about"
            className="btn btn-secondary"
            style={{
              padding: "1rem 2.5rem",
              fontSize: "0.95rem",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Learn More
          </a>
        </div>
      </section>

      {/* About & Address Section */}
      <section
        id="about"
        style={{
          padding: "6rem 5%",
          background: "var(--surface)",
          borderTop: "2px solid var(--border-color)",
          borderBottom: "2px solid var(--border-color)",
        }}
      >
        <div
          className="grid grid-2"
          style={{ alignItems: "center", gap: "4rem" }}
        >
          <div>
            <h2
              style={{
                fontSize: "2.8rem",
                marginBottom: "1.5rem",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              About MyKlinik Pro
            </h2>
            <p
              style={{
                fontSize: "1rem",
                marginBottom: "1.5rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
              }}
            >
              MyKlinik stands as a beacon of medical excellence, committed to
              delivering world-class healthcare services. Our state-of-the-art
              facilities and highly trained medical professionals ensure
              comprehensive patient care.
            </p>
            <p
              style={{
                fontSize: "1rem",
                marginBottom: "2rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
              }}
            >
              With decades of combined experience, our specialists provide
              specialized treatment across multiple disciplines, maintaining the
              highest standards of medical ethics and patient safety.
            </p>
            <div
              className="glass-card"
              style={{
                padding: "2rem",
                background: "rgba(30, 64, 175, 0.08)",
                borderLeft: "4px solid var(--primary)",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.75rem",
                  color: "var(--primary)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                📍 Our Location
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-main)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                Jl. Kesehatan No. 123, Jakarta Selatan
                <br />
                DKI Jakarta 12345
                <br />
                <strong>Phone:</strong> (021) 555-1234
              </p>
            </div>
          </div>
          <div className="grid grid-2" style={{ gap: "2rem" }}>
            <div
              className="glass-card"
              style={{
                textAlign: "center",
                padding: "2.5rem 1.5rem",
                background: "rgba(30, 64, 175, 0.05)",
              }}
            >
              <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>👨‍⚕️</div>
              <h3
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                50+
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5px",
                }}
              >
                Specialist Doctors
              </p>
            </div>
            <div
              className="glass-card"
              style={{
                textAlign: "center",
                padding: "2.5rem 1.5rem",
                background: "rgba(30, 64, 175, 0.05)",
              }}
            >
              <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>🏥</div>
              <h3
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                24/7
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5px",
                }}
              >
                Emergency Services
              </p>
            </div>
            <div
              className="glass-card"
              style={{
                textAlign: "center",
                padding: "2.5rem 1.5rem",
                background: "rgba(30, 64, 175, 0.05)",
              }}
            >
              <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>🛏️</div>
              <h3
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                100+
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5px",
                }}
              >
                Patient Beds
              </p>
            </div>
            <div
              className="glass-card"
              style={{
                textAlign: "center",
                padding: "2.5rem 1.5rem",
                background: "rgba(30, 64, 175, 0.05)",
              }}
            >
              <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>⭐</div>
              <h3
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                99%
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5px",
                }}
              >
                Patient Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Documentation */}
      <section id="portfolio" style={{ padding: "6rem 5%" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: "1rem",
            }}
          >
            Facilities & Infrastructure
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Equipped with internationally-recognized standards and advanced
            medical technology.
          </p>
        </div>
        <div className="grid grid-3">
          <div
            className="glass-card"
            style={{ padding: "1rem", overflow: "hidden" }}
          >
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop"
              alt="Ruang Operasi"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
            <h3
              style={{
                padding: "0 0.5rem 0.5rem 0",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-main)",
              }}
            >
              Advanced Operating Rooms
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                padding: "0 0.5rem",
              }}
            >
              State-of-the-art surgical suites with latest technology
            </p>
          </div>
          <div
            className="glass-card"
            style={{ padding: "1rem", overflow: "hidden" }}
          >
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop"
              alt="Lobi Utama"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
            <h3
              style={{
                padding: "0 0.5rem 0.5rem 0",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-main)",
              }}
            >
              Patient Comfort Areas
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                padding: "0 0.5rem",
              }}
            >
              Modern facilities designed for patient comfort
            </p>
          </div>
          <div
            className="glass-card"
            style={{ padding: "1rem", overflow: "hidden" }}
          >
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop"
              alt="Perawatan"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
            <h3
              style={{
                padding: "0 0.5rem 0.5rem 0",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-main)",
              }}
            >
              Inpatient Care Units
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                padding: "0 0.5rem",
              }}
            >
              Comprehensive care with 24/7 monitoring
            </p>
          </div>
        </div>
      </section>

      {/* Searchable Surgery Schedule */}
      <section
        id="jadwal"
        style={{
          padding: "6rem 5%",
          background: "var(--surface)",
          borderTop: "2px solid var(--border-color)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.8rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
              }}
            >
              Surgery Schedule
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              Search and view upcoming surgical procedures
            </p>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by patient name or procedure type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "1.1rem 1.5rem",
                fontSize: "1rem",
                borderRadius: "8px",
              }}
            />
          </div>

          <div
            className="glass-card table-container"
            style={{ marginTop: "2rem" }}
          >
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "var(--text-muted)",
                }}
              >
                Loading schedule...
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Surgery Date & Time</th>
                    <th>Patient Name</th>
                    <th>Procedure Type</th>
                    <th>Physician</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperasi.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          padding: "3rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        No surgery schedules found for your search.
                      </td>
                    </tr>
                  ) : (
                    filteredOperasi.map((op) => (
                      <tr key={op.id_tindakan}>
                        <td style={{ fontWeight: 500 }}>
                          {new Date(op.jadwal_operasi).toLocaleString("id-ID")}
                        </td>
                        <td style={{ fontWeight: 600 }}>{op.nama_pasien}</td>
                        <td>{op.jenis_operasi}</td>
                        <td>
                          <span className="badge badge-blue">
                            {op.nama_dokter}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: "3rem 5%",
          textAlign: "center",
          borderTop: "2px solid var(--border-color)",
          background: "var(--surface)",
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}
      >
        <p style={{ margin: 0, letterSpacing: "0.3px" }}>
          © {new Date().getFullYear()} MyKlinik Pro. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default PublicLanding;
