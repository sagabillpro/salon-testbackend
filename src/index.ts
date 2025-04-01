// src/index.ts
import dotenv from "dotenv";
import path from "path";
import { startServer } from "./app/app";
// Load environment variables from .env file

const PORT = process.env.App_Port || 3034;
startServer();
