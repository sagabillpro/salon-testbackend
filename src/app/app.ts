import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import path from "path";
import { registerRoutes } from "./routes/routes";
import { DataSource } from "typeorm";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { handler } from "./config/dbconfig";
import CompanyCoupounsService from "./modules/send-coupouns/company-coupons.service";
let dataSource: DataSource;
let httpServer: http.Server; // Keep reference to the server
import cron from "node-cron";
export const startServer = async () => {
  try {
    const app = express();
    const { App_Port } = process.env;

    dataSource = await handler(); // Establish DB connection
    app.get("/", (req, res) => {
      res.json({
        "status":"ok",
        "company": "SAGA BILL PRO",
        "application": "SAGA BILL PRO",
      });
    });

    // Register routes
    registerRoutes(app);
    app.use(errorHandler);

    // Schedule the job at 3 PM every day
    cron.schedule(
      "00 01 * * *",
      async () => {
        console.log("🎉 Running Birthday Cron Job at 3 PM");
        await CompanyCoupounsService.birthdayScheduler(); // Your function to fetch customers and send emails
        await CompanyCoupounsService.anniverseryScheduler();
      },
      { timezone: "Asia/Kolkata" }
    );

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
