import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardDokter = ({ user }) => {
  const [operasiList, setOperasiList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOperasi = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/operasi");
        // Filter operasi untuk dokter ini saja
        // Karena mock login pakai nama bebas, kita filter berdasar kecocokan nama, atau tampilkan semua jika belum ada auth kuat.
        // Untuk demo, kita tampilkan semua, tapi di dunia nyata difilter by ID.
        // const myOps = res.data.filter(op => op.nama_dokter.toLowerCase().includes(user.name.toLowerCase()));
        setOperasiList(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOperasi();
  }, [user]);

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          paddingBottom: "2rem",
          borderBottom: "2px solid var(--border-color)",
        }}
      >
        <h1
          style={{
            marginBottom: "0.5rem",
            fontSize: "2.5rem",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Welcome Back, Dr. {user?.name}
        </h1>
        <p style={{ margin: 0, color: "var(--text-muted)", fontWeight: 500 }}>
          Review your schedule and manage upcoming procedures
        </p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: "3rem" }}>
        <div
          className="glass-card"
          style={{
            background:
              "linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(30, 64, 175, 0.05))",
            borderLeft: "4px solid var(--primary)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p
                style={{
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Total Procedures
              </p>
              <h2
                style={{
                  fontSize: "2.5rem",
                  margin: 0,
                  fontWeight: 700,
                  color: "var(--text-main)",
                }}
              >
                {operasiList.length}
              </h2>
            </div>
            <div
              style={{
                background: "rgba(30, 64, 175, 0.15)",
                padding: "1rem",
                borderRadius: "8px",
                fontSize: "1.5rem",
              }}
            >
              📅
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card table-container">
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
          Upcoming Procedures
        </h2>
        {loading ? (
          <p
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            Loading schedule...
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Procedure Date & Time</th>
                <th>Procedure Type</th>
                <th>Patient Name</th>
                <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {operasiList.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    No procedures scheduled at this time
                  </td>
                </tr>
              ) : (
                operasiList.map((op) => (
                  <tr key={op.id_tindakan}>
                    <td style={{ fontWeight: 500, color: "var(--text-main)" }}>
                      {new Date(op.jadwal_operasi).toLocaleString("id-ID")}
                    </td>
                    <td style={{ color: "var(--text-main)" }}>
                      {op.jenis_operasi}
                    </td>
                    <td style={{ fontWeight: 600, color: "var(--text-main)" }}>
                      {op.nama_pasien}
                    </td>
                    <td>
                      <span className="badge badge-blue">
                        {op.nama_ruangan}
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
  );
};

export default DashboardDokter;
