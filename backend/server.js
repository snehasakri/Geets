const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ===============================
// ✅ CORS CONFIG (FINAL FIX - ALLOW ALL)
// ===============================
app.use(cors({
  origin: "https://geets-nine.vercel.app",   // ✅ allows all frontend URLs (fixes Vercel issue)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ===============================
// ✅ MIDDLEWARE
// ===============================
app.use(express.json());

// ===============================
// ✅ MYSQL CONNECTION (POOL)
// ===============================
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Test DB connection
db.getConnection((err, conn) => {
  if (err) {
    console.log("❌ DB Connection Error:", err);
  } else {
    console.log("✅ MySQL Connected");
    conn.release();
  }
});

// ===============================
// ✅ ROUTES
// ===============================

// Test route
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// Add booking
app.post("/add-booking", (req, res) => {
  console.log("📩 Incoming:", req.body);

  const { name, phone, email, service, date, time } = req.body;

  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql =
    "INSERT INTO bookings (name, phone, email, service, date, time) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, phone, email, service, date, time], (err) => {
    if (err) {
      console.log("❌ Insert Error:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.message
      });
    }

    res.json({
      success: true,
      message: "Booking successful"
    });
  });
});

// Get bookings
app.get("/bookings", (req, res) => {
  const sql = `
    SELECT 
      id,
      name,
      email,
      phone,
      service,
      DATE_FORMAT(date, '%Y-%m-%d') AS date,
      time
    FROM bookings
    ORDER BY id DESC
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.log("❌ Fetch Error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(data);
  });
});

// Delete booking
app.delete("/delete-booking/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM bookings WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("❌ Delete Error:", err);
      return res.status(500).json({ success: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true });
  });
});

// ===============================
// ✅ GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ===============================
// ✅ START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});