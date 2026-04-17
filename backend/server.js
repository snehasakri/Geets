const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ===============================
// ✅ CORS CONFIG (FINAL FIX)
// ===============================
const allowedOrigins = [
  "https://geets-ovh25eol0-snehasakris-projects.vercel.app", // ✅ updated
  "http://localhost:8080",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ===============================
// ✅ HANDLE PREFLIGHT (IMPORTANT FIX)
// ===============================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ THIS FIXES YOUR 500 ERROR
  }

  next();
});

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
  queueLimit: 0
});

// Test DB
db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ DB Connection Error:", err);
  } else {
    console.log("✅ MySQL Connected");
    connection.release();
  }
});

// ===============================
// ✅ TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ===============================
// ✅ ADD BOOKING
// ===============================
app.post("/add-booking", (req, res) => {
  console.log("📩 Incoming:", req.body);

  const { name, phone, email, service, date, time } = req.body;

  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "INSERT INTO bookings (name, phone, email, service, date, time) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, phone, email, service, date, time], (err, result) => {
    if (err) {
      console.log("❌ Insert Error:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking successful"
    });
  });
});

// ===============================
// ✅ GET BOOKINGS
// ===============================
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

  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ Fetch Error:", err);
      return res.status(500).json({
        error: "Error fetching data"
      });
    }

    res.status(200).json(result);
  });
});

// ===============================
// ✅ DELETE BOOKING
// ===============================
app.delete("/delete-booking/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("❌ Delete Error:", err);
      return res.status(500).json({ success: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Not found"
      });
    }

    res.json({ success: true });
  });
});

// ===============================
// ✅ GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({
    error: err.message || "Internal Server Error"
  });
});

// ===============================
// ✅ START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});