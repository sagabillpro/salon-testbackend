// // src/app.ts
// import "reflect-metadata";
// import express, { Application } from "express";
// import morgan from "morgan"; // For logging requests
// import cors from "cors"; // Enable Cross-Origin Resource Sharing
// import dotenv from "dotenv";
// import path from "path";
// import routes from "./routes"
// // Load environment variables from .env file
// dotenv.config({ path: path.join(__dirname, ".env") });
// //**** import routes end
// //**** import middleware start
// // import { appDataSource } from "./config/dbconfig";
// import { errorHandler } from "./middlewares";
// //**** import middleware end
// const app: Application = express();
// // Global Middleware
// app.use(cors()); // Enable CORS
// app.use(express.json());
// // Parse incoming JSON requests
// app.use(morgan("dev")); // Log HTTP requests in development mode
// app.get("/", (req, res) => {
//   res.send(`
//     <html>
//       <head>
//         <title>Welcome to My E-commerce</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             text-align: center;
//             margin-top: 50px;
//           }
//           h1 {
//             color: #2c3e50;
//           }
//         </style>
//       </head>
//       <body>
//         <h1>Welcome to KFT Foods E-commerce!</h1>
//         <p>This is the home page of your application.</p>
//         <p>Enjoy your stay!</p>
//       </body>
//     </html>
//   `);
// });
// app.use(routes);
// // Error Handling Middleware
// app.use(errorHandler); // Custom error handling
// export default app;
//# sourceMappingURL=app.js.map