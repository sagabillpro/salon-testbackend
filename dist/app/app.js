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
// import { initializeDataSource } from "./config/dbconfig";
/**
 * Start logic
 */
var dataSource;
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, _a, App_Port_1, NODE_ENV, httpServer, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                app = (0, express_1.default)();
                _a = process.env, App_Port_1 = _a.App_Port, NODE_ENV = _a.NODE_ENV;
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                /**
                 * Establish DB connections here
                 */
                exports.dataSource = dataSource = _b.sent();
                /**
                 * Register All the routes here
                 */
                app.get("/", function (req, res) {
                    res.send("\n    <html>\n      <head>\n        <title>Welcome to My E-commerce</title>\n        <style>\n          body {\n            font-family: Arial, sans-serif;\n            text-align: center;\n            margin-top: 50px;\n          }\n          h1 {\n            color: #2c3e50;\n          }\n        </style>\n      </head>\n      <body>\n        <h1>Welcome to KFT Foods E-commerce!</h1>\n        <p>This is the home page of your application.</p>\n        <p>Enjoy your stay!</p>\n      </body>\n    </html>\n  ");
                });
                (0, routes_1.registerRoutes)(app);
                app.use(errorHandler_middleware_1.errorHandler);
                httpServer = http_1.default.createServer(app);
                httpServer.listen(App_Port_1 || 3000, function () {
                    console.log("HTTP SERVER STARTED ON PORT: ".concat(App_Port_1 || 3000));
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                /**
                 * Any error during startup process
                 * leads to exit of the program
                 */
                console.log(error_1);
                console.log("Couldn't start the server");
                process.exit(-1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.startServer = startServer;
process.on("SIGINT", function () {
    /**
     * Close DB connections
     */
});
//# sourceMappingURL=app.js.map