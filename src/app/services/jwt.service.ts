import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });
// 1. Generate Access Token
export function generateAccessToken(payload: {
  userId: number,
  userName: string;
  email: string;
  userType: {
    id: number;
    name: string;
  };
}): string {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

// 2. Generate Refresh Token
export function generateRefreshToken(payload: {
  userName: string;
  userId: number,
  email: string;
  userType: {
    id: number;
    name: string;
  };
}): string {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}

// 3. Verify Token (for both access and refresh tokens)
export function verifyToken(
  token: string,
  isAccessToken = true
): any {
  const secret = isAccessToken
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET;
  try {
    const decode = jwt.verify(token, `${secret}`)
    return decode
  } catch (error) {
    return error; // Return null if verification fails
  }
}
