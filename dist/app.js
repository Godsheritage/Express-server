"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
dotenv_1.default.config();
const app = (0, express_1.default)();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRETS: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};
const AUTH_OPTIONS = {
    callbackURL: "/auth/google/callback",
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRETS,
};
const verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log("Google Profile", profile);
    done(null, profile);
};
passport_1.default.use(new passport_google_oauth20_1.Strategy(AUTH_OPTIONS, verifyCallback));
//save the session to the cookie
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
//read the session from the cookie
passport_1.default.deserializeUser((id, done) => {
    done(null, id);
});
app.use((0, helmet_1.default)());
app.use((0, cookie_session_1.default)({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
}));
app.use(passport_1.default.initialize());
//to authenticate the session being sent to the server
app.use(passport_1.default.session());
// to check if a user is logged in 
const checkLoggedIn = (req, res, next) => {
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
app.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["email"],
}));
//callback url
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
}), (req, res) => {
    console.log("Google called us back");
});
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
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
exports.default = app;
