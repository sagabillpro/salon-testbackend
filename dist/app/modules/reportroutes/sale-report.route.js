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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_types_1 = require("../../routes/routes.types");
var dbconfig_1 = require("../../config/dbconfig");
var report_schema_1 = require("../../schema/report.schema");
var validateFilterManual_util_1 = require("../../utils/validateFilterManual.util");
var sale_lines_enity_1 = require("../sale-items/entities/sale-lines.enity");
var sale_header_entity_1 = require("../sale-items/entities/sale-header.entity");
var services_entity_1 = require("../services/entities/services.entity");
var router = (0, express_1.Router)();
router.get("/", (0, validateFilterManual_util_1.validateFilterManual)(report_schema_1.ReportSchema), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, dataSource, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = req.query.filter ? JSON.parse("".concat(req.query.filter)) : {};
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                return [4 /*yield*/, dataSource
                        .getRepository(sale_lines_enity_1.SaleLines) // Replace 'sale_lines' with your SaleLines entity name
                        .createQueryBuilder("sl")
                        .select([
                        'sh.code AS "code"', // Use double quotes to maintain camelCase aliasing
                        'sh.txnDate AS "txnDate"',
                        'sc.name AS "serviceName"',
                        'SUM(sl.quantity) AS "totalQuantity"',
                        'SUM(sl.amount) AS "totalAmount"',
                        'AVG(sl.rate) AS "averageRate"',
                        'AVG(sl.unitPrice) AS "averageUnitPrice"',
                    ])
                        .innerJoin(sale_header_entity_1.SaleHeaders, "sh", "sl.txnHeaderId = sh.id")
                        .innerJoin(services_entity_1.Services, "sc", "sl.serviceId = sc.id")
                        .where("sh.isService = :isService", { isService: 0 })
                        .andWhere("sh.txnDate BETWEEN :start AND :end", {
                        start: query.where.startDate,
                        end: query.where.endDate,
                    })
                        .groupBy("sh.code")
                        .addGroupBy("sh.txnDate")
                        .addGroupBy("sc.name")
                        .getRawMany()];
            case 2:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = new routes_types_1.Route("/sale-report", router);
//# sourceMappingURL=sale-report.route.js.map