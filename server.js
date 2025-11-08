// backend/server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "data.json");

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// ✅ POST - Add Complaint
app.post("/complaints", (req, res) => {
  const newComplaint = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    type: req.body.type,
    description: req.body.description,
    date: new Date().toISOString()
  };

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push(newComplaint);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.status(201).send({ message: "Complaint submitted successfully!" });
});

// ✅ GET - View Complaints
app.get("/complaints", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// ✅ Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
