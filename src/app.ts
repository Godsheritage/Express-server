import express from "express";
import helmet from "helmet";
import path from "path";

const app = express();

app.use(helmet())

app.get("/secret", (req, res) => {
  return res.json({
    secretNumber: "Your secret number is 49",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
