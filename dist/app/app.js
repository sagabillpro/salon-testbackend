"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.startServer = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var routes_1 = require("./routes/routes");
var errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
var dbconfig_1 = require("./config/dbconfig");
var company_coupons_service_1 = __importDefault(require("./modules/send-coupouns/company-coupons.service"));
var dataSource;
var httpServer; // Keep reference to the server
var node_cron_1 = __importDefault(require("node-cron"));
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, App_Port_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                app = (0, express_1.default)();
                App_Port_1 = process.env.App_Port;
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                exports.dataSource = dataSource = _a.sent(); // Establish DB connection
                app.get("/", function (req, res) {
                    res.send("\n        <html>\n          <head>\n            <title>Welcome to KFT Foods E-commerce - SAGA BILL PRO</title>\n            <style>\n              body {\n                font-family: 'Helvetica Neue', Arial, sans-serif;\n                margin: 0;\n                padding: 0;\n                background: linear-gradient(to right, #83a4d4, #b6fbff);\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                height: 100vh;\n                color: #2c3e50;\n              }\n              .container {\n                text-align: center;\n                background: rgba(255, 255, 255, 0.9);\n                padding: 40px;\n                border-radius: 15px;\n                box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);\n              }\n              h1 {\n                margin-top: 0;\n              }\n              .branch-name {\n                font-size: 1.2em;\n                font-weight: bold;\n                color: #e74c3c;\n                margin-bottom: 20px;\n              }\n              p {\n                margin: 10px 0;\n              }\n              ul {\n                list-style: disc;\n                margin: 10px 0 20px 20px;\n                text-align: left;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <h1>Welcome to SAGA BILL PRO!</h1>\n              <p>This is the home page of your application.</p>\n              <p>Our advanced billing system integrates various essential modules to ensure efficient financial operations. These modules include:</p>\n              <ul>\n                <li><strong>Invoice Generation:</strong> Automatically create detailed invoices.</li>\n                <li><strong>Payment Processing:</strong> Seamlessly handle multiple payment methods.</li>\n                <li><strong>Customer Management:</strong> Efficiently track and manage customer data.</li>\n                <li><strong>Inventory Control:</strong> Monitor stock levels and product availability.</li>\n                <li><strong>Financial Reporting:</strong> Generate comprehensive reports for insightful analysis.</li>\n              </ul>\n              <p>Enjoy your stay!</p>\n            </div>\n          </body>\n        </html>\n      ");
                });
                // Register routes
                (0, routes_1.registerRoutes)(app);
                app.use(errorHandler_middleware_1.errorHandler);
                // Schedule the job at 3 PM every day
                node_cron_1.default.schedule("20 13 * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("🎉 Running Birthday Cron Job at 3 PM");
                                return [4 /*yield*/, company_coupons_service_1.default.birthdayScheduler()];
                            case 1:
                                _a.sent(); // Your function to fetch customers and send emails
                                return [2 /*return*/];
                        }
                    });
                }); }, { timezone: "Asia/Kolkata" });
                httpServer = http_1.default.createServer(app); // Store server instance
                httpServer.listen(App_Port_1 || 3000, function () {
                    console.log("HTTP SERVER STARTED ON PORT: ".concat(App_Port_1 || 3000));
                });
                // Handle graceful shutdown
                process.on("SIGINT", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Shutting down server...");
                                // Close HTTP server
                                httpServer.close(function () {
                                    console.log("HTTP server closed.");
                                });
                                if (!(dataSource === null || dataSource === void 0 ? void 0 : dataSource.isInitialized)) return [3 /*break*/, 2];
                                return [4 /*yield*/, dataSource.destroy()];
                            case 1:
                                _a.sent();
                                console.log("Database connection closed.");
                                _a.label = 2;
                            case 2:
                                process.exit(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error starting server:", error_1);
                process.exit(-1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.startServer = startServer;
//# sourceMappingURL=app.js.map