"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var app_1 = require("./app/app");
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, ".env") });
var PORT = process.env.App_Port || 3034;
(0, app_1.startServer)();
//# sourceMappingURL=index.js.map