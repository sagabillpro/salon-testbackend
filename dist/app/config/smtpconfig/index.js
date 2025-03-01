"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
var nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: process.env.Mailer_Host,
    port: Number(process.env.Mailer_Port),
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.Mailer_UserName,
        pass: process.env.Mailer_Password,
    },
});
//# sourceMappingURL=index.js.map