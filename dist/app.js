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
app.get("/secret", (req, res) => {
    return res.json({
        secretNumber: "Your secret number is 49",
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
exports.default = app;
