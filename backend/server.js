// backend/server.js

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sneha@123",
  database: "beauty_parlor",
});

// ✅ Connect DB
db.connect((err) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ ADD BOOKING (NO CHANGE)
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

    console.log("✅ Booking inserted");

    res.status(200).json({
      success: true,
      message: "Booking successful",
    });
  });
});

// ✅ 🔥 FIXED GET BOOKINGS (MAIN FIX)
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

// ✅ DELETE BOOKING
app.delete("/delete-booking/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Delete Error:", err);
      return res.status(500).json({ success: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true });
  });
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ START SERVER
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on http://localhost:5000");
});