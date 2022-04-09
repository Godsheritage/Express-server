"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const checkLoggedIn = (req, res, next) => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: "You have to be logged in first",
        });
    }
    next();
};
app.get('/auth/google', (req, res) => { });
app.get('/auth/google/callback', (req, res) => { });
app.get('/auth/logout', (req, res) => { });
app.get("/secret", checkLoggedIn, (req, res) => {
    return res.json({
        secretNumber: "Your secret number is 49",
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
exports.default = app;
