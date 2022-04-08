"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const app_1 = __importDefault(require("./app"));
const https_1 = __importDefault(require("https"));
const PORT = process.env.PORT || 3000;
const server = https_1.default.createServer({
    key: fs_1.default.readFileSync('key.pem'),
    cert: fs_1.default.readFileSync('cert.pem')
}, app_1.default);
server.listen(PORT, () => {
    console.log(`server is listening at port: ${PORT}`);
});
