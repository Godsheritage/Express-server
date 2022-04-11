import path from "path";
import helmet from "helmet";
import express, { RequestHandler } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

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

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRETS: process.env.CLIENT_SECRETS,
};

app.get("/auth/google", (req, res) => {});

app.get("/auth/google/callback", (req, res) => {});

app.get("/auth/logout", (req, res) => {});

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
