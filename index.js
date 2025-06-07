const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

function parseDate(input) {
  if (!input) return new Date();
  return isNaN(input) ? new Date(input) : new Date(parseInt(input));
}

function getDiff(start, end) {
  let diffMs = Math.abs(end - start);

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= days * 24 * 60 * 60 * 1000;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * 60 * 60 * 1000;

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs -= minutes * 60 * 1000;

  const seconds = Math.floor(diffMs / 1000);

  return {
    milliseconds: Math.abs(end - start),
    days,
    hours,
    minutes,
    seconds,
  };
}



app.get("/api/diff", (req, res) => {
  const { start: startParam, end: endParam } = req.query;

  const startDate = parseDate(startParam);
  const endDate = parseDate(endParam);

  if (startDate.toString() === "Invalid Date" || endDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  const diff = getDiff(startDate, endDate);

  res.json({
    start: startDate.toUTCString(),
    end: endDate.toUTCString(),
    difference: diff
  });
});

app.listen(PORT, () => {
  console.log(`Time Difference Microservice listening on port ${PORT}`);
});
