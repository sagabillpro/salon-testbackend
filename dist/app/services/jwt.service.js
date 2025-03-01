"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyToken = verifyToken;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
// 1. Generate Access Token
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, "".concat(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
}
// 2. Generate Refresh Token
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, "".concat(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
}
// 3. Verify Token (for both access and refresh tokens)
function verifyToken(token, isAccessToken) {
    if (isAccessToken === void 0) { isAccessToken = true; }
    var secret = isAccessToken
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET;
    try {
        var decode = jsonwebtoken_1.default.verify(token, "".concat(secret));
        return decode;
    }
    catch (error) {
        return error; // Return null if verification fails
    }
}
//# sourceMappingURL=jwt.service.js.map