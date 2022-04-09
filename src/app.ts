import express, { RequestHandler } from "express";
import helmet from "helmet";
import path from "path";

const app = express();

app.use(helmet());

const checkLoggedIn: RequestHandler = (req, res, next) => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You have to be logged in first",
    });
  }

  next();
};

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.json({
    secretNumber: "Your secret number is 49",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
