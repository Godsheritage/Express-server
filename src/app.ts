import path from "path";
import helmet from "helmet";
import express, { RequestHandler } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRETS: process.env.CLIENT_SECRETS,
};

const AUTH_OPTIONS = {
  callBackURL: "auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRETS,
};

const verifyCallback: any = (accessToken:any, refreshToken: any, profile:any, done:any) => {
  console.log(`Google Profile ${profile}`);
  done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

app.use(helmet());
app.use(passport.initialize());

const checkLoggedIn: RequestHandler = (req, res, next) => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You have to be logged in first",
    });
  }

  next();
};

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("Google called us back");
  }
);

app.get("/auth/google", passport.authenticate('google', {
  scope : ['email']
}));

app.get("/auth/logout", (req, res) => {});

app.get("failure", (req, res) => {
  return res.status(400).json({
    error: "Failed to login",
  });
});

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
