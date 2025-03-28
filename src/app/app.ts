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
      res.send(`
        <html>
          <head>
            <title>Welcome to KFT Foods E-commerce - SAGA BILL PRO</title>
            <style>
              body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(to right, #83a4d4, #b6fbff);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #2c3e50;
              }
              .container {
                text-align: center;
                background: rgba(255, 255, 255, 0.9);
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
              }
              h1 {
                margin-top: 0;
              }
              .branch-name {
                font-size: 1.2em;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 20px;
              }
              p {
                margin: 10px 0;
              }
              ul {
                list-style: disc;
                margin: 10px 0 20px 20px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to SAGA BILL PRO!</h1>
              <p>This is the home page of your application.</p>
              <p>Our advanced billing system integrates various essential modules to ensure efficient financial operations. These modules include:</p>
              <ul>
                <li><strong>Invoice Generation:</strong> Automatically create detailed invoices.</li>
                <li><strong>Payment Processing:</strong> Seamlessly handle multiple payment methods.</li>
                <li><strong>Customer Management:</strong> Efficiently track and manage customer data.</li>
                <li><strong>Inventory Control:</strong> Monitor stock levels and product availability.</li>
                <li><strong>Financial Reporting:</strong> Generate comprehensive reports for insightful analysis.</li>
              </ul>
              <p>Enjoy your stay!</p>
            </div>
          </body>
        </html>
      `);
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
