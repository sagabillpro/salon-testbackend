import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: {
        userName: string;
        userId: number,
        email: string;
        userType: {
            id: number;
            name: string;
        };
    } | JwtPayload | string;
}