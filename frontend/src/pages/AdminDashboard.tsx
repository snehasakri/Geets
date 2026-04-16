import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
type User = {
  role: "admin" | "user";
};

type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  // ✅ LOCAL DATE (IST SAFE)
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const user: User = JSON.parse(userData);

    if (user.role !== "admin") {
      navigate("/login");
      return;
    }

    const API = import.meta.env.VITE_API_URL;

    const fetchBookings = () => {
      fetch(`${API}/bookings`)
        .then((res) => res.json())
        .then((data) => {
          const today = getToday();

          // ✅ FINAL DATE FIX (handles both formats)
          const formatted = data.map((b: Booking) => {
            let cleanDate = b.date;

            if (cleanDate.includes("T")) {
              cleanDate = cleanDate.split("T")[0];
            }

            return {
              ...b,
              date: cleanDate,
            };
          });

          // ✅ SAFE FILTER
          const filtered = formatted.filter((b) => b.date >= today);

          setBookings(filtered);
        })
        .catch((err) => console.error(err));
    };

    fetchBookings();

    // ✅ AUTO REFRESH
    const interval = setInterval(fetchBookings, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/delete-booking/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const today = getToday();

  const todayBookings = bookings
    .filter((b) => b.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  const groupedBookings: { [key: string]: Booking[] } = {};

  bookings.forEach((b) => {
    if (b.date === today) return; // ✅ remove today's duplication

    if (!groupedBookings[b.date]) {
      groupedBookings[b.date] = [];
    }
    groupedBookings[b.date].push(b);
  });

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard 👩‍💼</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* TODAY BOOKINGS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📅 Today's Bookings</h2>

        {todayBookings.length > 0 ? (
          <Table bookings={todayBookings} onDelete={handleDelete} />
        ) : (
          <p style={styles.noData}>No bookings for today</p>
        )}
      </div>

      {/* UPCOMING BOOKINGS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📋 Upcoming Bookings</h2>

        {Object.keys(groupedBookings)
          .sort()
          .map((date) => {
            const [y, m, d] = date.split("-");
            const displayDate = `${d}-${m}-${y}`;

            return (
              <div key={date} style={styles.card}>
                <h3 style={styles.dateTitle}>📆 {displayDate}</h3>

                <Table
                  bookings={groupedBookings[date].sort((a, b) =>
                    a.time.localeCompare(b.time)
                  )}
                  onDelete={handleDelete}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

/* TABLE COMPONENT */
function Table({
  bookings,
  onDelete,
}: {
  bookings: Booking[];
  onDelete: (id: number) => void;
}) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Time</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Service</th>
          <th style={styles.th}>Phone</th>
          <th style={styles.th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {bookings.map((b) => (
          <tr key={b.id}>
            <td style={styles.td}>{b.time}</td>
            <td style={styles.td}>{b.name}</td>
            <td style={styles.td}>{b.service}</td>
            <td style={styles.td}>{b.phone}</td>
            <td style={styles.td}>
              <button onClick={() => onDelete(b.id)} style={styles.deleteBtn}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "15px",
  },
  logoutBtn: {
    padding: "10px 18px",
    background: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ff3b3b",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  section: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  card: {
    marginTop: "20px",
  },
  dateTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#e91e63",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px",
    background: "#f1f1f1",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  noData: {
    color: "#777",
  },
};