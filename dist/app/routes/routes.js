"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = require("express");
var routes_data_1 = require("./routes.data");
var constant_1 = require("../utils/constant");
/**
 * An utility function to register all the routes and middlewares
 *
 * @param app
 * @returns void
 */
var registerRoutes = function (app) {
    /**
     * All global level middlewares goes here
     */
    app.use((0, cors_1.default)());
    app.use((0, express_1.json)({ limit: "10mb" }));
    app.use((0, express_1.static)("app/public"));
    /**
     * Register all the paths
     */
    for (var _i = 0, routes_1 = routes_data_1.routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        app.use(constant_1.API_BASE + route.path, route.router);
    }
    /**
     * Middleware to handel any exception in any route
     */
    //   app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    //     try{
    //     }
    //     catch(err){
    //     }
    //   });
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=routes.js.map