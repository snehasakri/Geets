const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ===============================
// ✅ CORS CONFIG (FINAL CLEAN FIX)
// ===============================
const allowedOrigins = [
  "https://geets-1acn34drw-snehasakris-projects.vercel.app", // ✅ CURRENT frontend
  "http://localhost:3000",
  "http://localhost:8080"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked:", origin);
      callback(null, false); // ✅ DO NOT throw error
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ===============================
// ✅ MIDDLEWARE
// ===============================
app.use(express.json());

// ===============================
// ✅ MYSQL CONNECTION
// ===============================
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10
});

db.getConnection((err, conn) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
    conn.release();
  }
});

// ===============================
// ✅ ROUTES
// ===============================
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.post("/add-booking", (req, res) => {
  const { name, phone, email, service, date, time } = req.body;

  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql =
    "INSERT INTO bookings (name, phone, email, service, date, time) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, phone, email, service, date, time], (err) => {
    if (err) {
      console.log("❌ Insert Error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true });
  });
});

app.get("/bookings", (req, res) => {
  db.query("SELECT * FROM bookings ORDER BY id DESC", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

app.delete("/delete-booking/:id", (req, res) => {
  db.query("DELETE FROM bookings WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server running on", PORT));