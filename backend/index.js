import express from "express";   // agar "type": "module" use karte ho
// const express = require("express"); // agar CommonJS use karna ho

const app = express();
const PORT = 5000;

// Middleware (JSON handle karne ke liye)
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
