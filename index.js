const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// ✅ Serve static files (like CSS) from "public"
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve the HTML file from "views/index.html"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// ✅ Timestamp API
app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (/^\d+$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
