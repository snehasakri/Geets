const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ===============================
// ✅ CORS CONFIG (FIXED)
// ===============================
const allowedOrigins = [
  "https://geets-dll2sky39-snehasakris-projects.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ❌ REMOVED THIS LINE (CAUSES RENDER CRASH)
// app.options("*", cors());

// ===============================
// ✅ MIDDLEWARE
// ===============================
app.use(express.json());

// ===============================
// ✅ MYSQL CONNECTION
// ===============================
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10
});

// Connect DB
db.connect((err) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
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
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql =
    "INSERT INTO bookings (name, phone, email, service, date, time) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, phone, email, service, date, time], (err, result) => {
    if (err) {
      console.log("❌ Insert Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({
      success: true,
      message: "Booking successful",
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
      return res.status(500).json({ error: "Error fetching data" });
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
// ✅ START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});