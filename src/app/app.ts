import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import path from "path";
import { registerRoutes } from "./routes/routes";
import { DataSource } from "typeorm";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { API_BASE } from "./utils/constant";
import { handler } from "./config/dbconfig";
// import { initializeDataSource } from "./config/dbconfig";
/**
 * Start logic
 */
let dataSource: DataSource;
export const startServer = async () => {
  try {
    const app = express();
    /**
     * Start the server on specified port
     */
    const { App_Port, NODE_ENV } = process.env;
    /**
     * Establish DB connections here
     */
    dataSource = await handler();

    /**
     * Register All the routes here
     */
    app.get("/", (req, res) => {
      res.send(`
    <html>
      <head>
        <title>Welcome to My E-commerce</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
          }
          h1 {
            color: #2c3e50;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to KFT Foods E-commerce!</h1>
        <p>This is the home page of your application.</p>
        <p>Enjoy your stay!</p>
      </body>
    </html>
  `);
    });

    registerRoutes(app);
    app.use(errorHandler);
    // if (NODE_ENV === "production") {
    //   const privateKey = fs.readFileSync(
    //     path.join(__dirname, "..", "ssl", "private_key.pem"),
    //     "utf8"
    //   );
    //   const certificate = fs.readFileSync(
    //     path.join(__dirname, "..", "ssl", "cert.pem"),
    //     "utf8"
    //   );

    //   const credentials = {
    //     key: privateKey,
    //     cert: certificate,
    //   };
    //   const httpsServer = https.createServer(credentials, app);

    //   httpsServer.listen(App_Port || 3000, () => {
    //     console.log(`HTTPS SERVER STARTED ON PORT: ${App_Port || 3000}`);
    //   });
    // } else {
    const httpServer = http.createServer(app);
    httpServer.listen(App_Port || 3000, () => {
      console.log(`HTTP SERVER STARTED ON PORT: ${App_Port || 3000}`);
    });
  } catch (error) {
    /**
     * Any error during startup process
     * leads to exit of the program
     */
    console.log(error);
    console.log("Couldn't start the server");
    process.exit(-1);
  }
};

process.on("SIGINT", () => {
  /**
   * Close DB connections
   */
});

export { dataSource };
