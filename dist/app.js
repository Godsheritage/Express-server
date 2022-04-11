"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRETS: process.env.CLIENT_SECRETS,
};
const AUTH_OPTIONS = {
    callbackURL: "auth/google/callback",
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRETS,
};
const verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log(`Google Profile: ${profile}`);
    done(null, profile);
};
passport_1.default.use(new passport_google_oauth20_1.Strategy(AUTH_OPTIONS, verifyCallback));
app.use((0, helmet_1.default)());
app.use(passport_1.default.initialize());
const checkLoggedIn = (req, res, next) => {
    const isLoggedIn = true;
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
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
}), (req, res) => {
    console.log("Google called us back");
});
app.get("/auth/logout", (req, res) => { });
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
