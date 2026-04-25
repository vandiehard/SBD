import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    pasienCount: 0,
    dokterCount: 0,
    perawatCount: 0,
    operasiCount: 0,
  });
  const [recentOperations, setRecentOperations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get(
          "http://localhost:5000/api/karyawan/stats",
        );
        setStats(statsRes.data);

        const opsRes = await axios.get("http://localhost:5000/api/operasi");
        // Get top 5 recent
        setRecentOperations(opsRes.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          color: "var(--text-muted)",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        Loading dashboard data...
      </div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "3rem",
          paddingBottom: "2rem",
          borderBottom: "2px solid var(--border-color)",
        }}
      >
        <div>
          <h1
            style={{
              marginBottom: "0.5rem",
              fontSize: "2.5rem",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Dashboard Overview
          </h1>
          <p style={{ margin: 0, color: "var(--text-muted)", fontWeight: 500 }}>
            Monitor clinic operations and key metrics
          </p>
        </div>
        <button
          className="btn btn-primary"
          style={{
            padding: "0.9rem 2rem",
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "1px",
            fontSize: "0.75rem",
          }}
        >
          + New Registration
        </button>
      </div>

      <div className="grid grid-4" style={{ marginBottom: "3rem" }}>
        <div
          className="glass-card"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "8px",
                background: "rgba(30, 64, 175, 0.15)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              🧑‍⚕️
            </div>
            <span className="badge badge-green">+12%</span>
          </div>
          <div>
            <h3
              style={{
                fontSize: "2.2rem",
                marginBottom: "0.25rem",
                color: "var(--text-main)",
                fontWeight: 700,
              }}
            >
              {stats.pasienCount}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Total Patients
            </p>
          </div>
        </div>

        <div
          className="glass-card"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "8px",
                background: "rgba(30, 64, 175, 0.15)",
                color: "var(--primary-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              👨‍⚕️
            </div>
            <span className="badge badge-blue">Active</span>
          </div>
          <div>
            <h3
              style={{
                fontSize: "2.2rem",
                marginBottom: "0.25rem",
                color: "var(--text-main)",
                fontWeight: 700,
              }}
            >
              {stats.dokterCount}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Physicians
            </p>
          </div>
        </div>

        <div
          className="glass-card"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "8px",
                background: "rgba(30, 64, 175, 0.15)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              👩‍⚕️
            </div>
            <span className="badge badge-blue">Active</span>
          </div>
          <div>
            <h3
              style={{
                fontSize: "2.2rem",
                marginBottom: "0.25rem",
                color: "var(--text-main)",
                fontWeight: 700,
              }}
            >
              {stats.perawatCount}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Nursing Staff
            </p>
          </div>
        </div>

        <div
          className="glass-card"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "8px",
                background: "rgba(30, 64, 175, 0.15)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              🏨
            </div>
            <span className="badge badge-purple">Scheduled</span>
          </div>
          <div>
            <h3
              style={{
                fontSize: "2.2rem",
                marginBottom: "0.25rem",
                color: "var(--text-main)",
                fontWeight: 700,
              }}
            >
              {stats.operasiCount}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Procedures
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "1.5rem",
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "var(--text-main)",
          }}
        >
          Recent Operations
        </h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Physician</th>
                <th>Procedure</th>
                <th>Scheduled Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOperations.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    No recent operations scheduled
                  </td>
                </tr>
              ) : (
                recentOperations.map((op) => (
                  <tr key={op.id_tindakan}>
                    <td style={{ fontWeight: 600, color: "var(--text-main)" }}>
                      {op.nama_pasien}
                    </td>
                    <td style={{ color: "var(--text-main)" }}>
                      Dr. {op.nama_dokter}
                    </td>
                    <td style={{ color: "var(--text-main)" }}>
                      {op.jenis_operasi}
                    </td>
                    <td
                      style={{ color: "var(--text-main)", fontSize: "0.9rem" }}
                    >
                      {new Date(op.jadwal_operasi).toLocaleDateString("id-ID")}
                    </td>
                    <td>
                      <span
                        className={`badge ${new Date(op.jadwal_operasi) > new Date() ? "badge-blue" : "badge-green"}`}
                      >
                        {new Date(op.jadwal_operasi) > new Date()
                          ? "Scheduled"
                          : "Completed"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
