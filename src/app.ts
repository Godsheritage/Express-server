import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/secret", (req, res) => {
  return res.json({
    secretNumber: "Your secret number is 49",
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
