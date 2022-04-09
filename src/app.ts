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

const config = {
  CLIENT_ID : '1093093735366-hsninpof1l6n4jsujcq48v72mhnffg3b.apps.googleusercontent.com',
  CLIENT_SECRET : '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'

}



app.get('/auth/google', (req , res) => {})

app.get('/auth/google/callback', (req , res) => {})

app.get('/auth/logout', (req , res) => {})

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
