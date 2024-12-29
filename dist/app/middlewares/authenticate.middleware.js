"use strict";
// middleware/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
var secretKey = process.env.ACCESS_TOKEN_SECRET || "your-secret-key"; // Use an environment variable for the secret key
var authenticateToken = function (req, res, next) {
    // Get the token from the Authorization header
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access Token Required" });
    }
    // Verify and decode the token
    jsonwebtoken_1.default.verify(token, secretKey, function (err, decoded) {
        if (err) {
            return res.status(440).json({ message: "401" });
        }
        // Attach the decoded data to the request object
        req.user = decoded;
        next();
    });
};
exports.default = authenticateToken;
//# sourceMappingURL=authenticate.middleware.js.map