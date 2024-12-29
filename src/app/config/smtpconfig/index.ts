import dotenv from "dotenv";
import path from "path";
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.Mailer_Host,
    port: Number(process.env.Mailer_Port),
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.Mailer_UserName,
        pass: process.env.Mailer_Password,
    },
});

