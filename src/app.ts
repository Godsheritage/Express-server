import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import passport, { session } from "passport";
import cookieSession from "cookie-session";
import express, { RequestHandler } from "express";
import { Strategy } from "passport-google-oauth20";
dotenv.config();

const app = express();

const config: any = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRETS: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS: any = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRETS,
};

const verifyCallback: any = (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
) => {
  console.log("Google Profile", profile);
  done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

//save the session to the cookie
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

//read the session from the cookie
passport.deserializeUser((id: any, done) => {
  done(null, id);
});

app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use(passport.initialize());


//to authenticate the session being sent to the server
app.use(passport.session());

// to check if a user is logged in 
const checkLoggedIn: RequestHandler = (req, res, next) => {
  //req.user
  console.log(`the surrent user is ${req.user}`);
  const isLoggedIn = req.isAuthenticated() && req.user;

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You have to be logged in first",
    });
  }

  next();
};

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

//callback url
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
  }),
  (req, res) => {
    console.log("Google called us back");
  }
);

//to logout
app.get("/auth/logout", (req, res) => {
  req.logOut(); //removes req.user and slears any logged in session
  return res.redirect('/');
});

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.json({
    secretNumber: "Your secret number is 49",
  });
});

app.get("failure", (req, res) => {
  return res.status(400).json({
    error: "Failed to login",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
