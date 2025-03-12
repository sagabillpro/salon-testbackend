import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import path from "path";
import { registerRoutes } from "./routes/routes";
import { DataSource } from "typeorm";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { handler } from "./config/dbconfig";

let dataSource: DataSource;
let httpServer: http.Server; // Keep reference to the server

export const startServer = async () => {
  try {
    const app = express();
    const { App_Port } = process.env;

    dataSource = await handler(); // Establish DB connection

    // Register routes
    registerRoutes(app);
    app.use(errorHandler);

    httpServer = http.createServer(app); // Store server instance
    httpServer.listen(App_Port || 3000, () => {
      console.log(`HTTP SERVER STARTED ON PORT: ${App_Port || 3000}`);
    });

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("Shutting down server...");

      // Close HTTP server
      httpServer.close(() => {
        console.log("HTTP server closed.");
      });

      // Close database connection
      if (dataSource?.isInitialized) {
        await dataSource.destroy();
        console.log("Database connection closed.");
      }

      process.exit(0);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(-1);
  }
};

export { dataSource };
