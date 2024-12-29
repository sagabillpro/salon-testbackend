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
var sale_header_entity_1 = require("../sale-items/entities/sale-header.entity");
var router = (0, express_1.Router)();
router.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, now, colorArrayArtist_1, colorArrayItem_1, colorArrayService, startOfMonth, dataSource, artist, item, service, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                result = {
                    topArtist: [],
                    topItems: [],
                    topService: [],
                };
                now = new Date();
                colorArrayArtist_1 = [
                    "#0D4F8B",
                    "#1D88EA",
                    "#82BEF3",
                    "#E8F3FD",
                    "#F6EFEF",
                ];
                colorArrayItem_1 = [
                    "#9E0508",
                    "#F8171B",
                    "#FB7E81",
                    "#E8F3FD",
                    "#FEE6E7",
                    "#F6EFEF",
                ];
                colorArrayService = [
                    "#6B8E23",
                    "#A4D146",
                    "#CCE698",
                    "#F5FAEB",
                    "#F6EFEF",
                ];
                startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                return [4 /*yield*/, dataSource
                        .getRepository(sale_header_entity_1.SaleHeaders)
                        .createQueryBuilder("sale")
                        .leftJoinAndSelect("sale.user", "user")
                        .select(["user.name as artist", "COUNT(user.id) as count"])
                        .where("sale.txnDate BETWEEN :start AND :end", {
                        start: startOfMonth,
                        end: now,
                    })
                        .groupBy("user.id")
                        .orderBy("count", "DESC")
                        .limit(5)
                        .getRawMany()];
            case 2:
                artist = _a.sent();
                return [4 /*yield*/, dataSource
                        .getRepository(sale_header_entity_1.SaleHeaders)
                        .createQueryBuilder("sale")
                        .leftJoinAndSelect("sale.saleLines", "saleLines")
                        .leftJoinAndSelect("saleLines.service", "service")
                        .select(["service.name as item", "SUM(saleLines.quantity) as count"])
                        .where("sale.txnDate BETWEEN :start AND :end", {
                        start: startOfMonth,
                        end: now,
                    })
                        .andWhere("sale.isService = :isService", { isService: 0 })
                        .addGroupBy("service.name")
                        .orderBy("count", "DESC")
                        .limit(5)
                        .getRawMany()];
            case 3:
                item = _a.sent();
                return [4 /*yield*/, dataSource
                        .getRepository(sale_header_entity_1.SaleHeaders)
                        .createQueryBuilder("sale")
                        .leftJoinAndSelect("sale.saleLines", "saleLines")
                        .leftJoinAndSelect("saleLines.service", "service")
                        .select(["service.name as item", "SUM(saleLines.quantity) as count"])
                        .where("sale.txnDate BETWEEN :start AND :end", {
                        start: startOfMonth,
                        end: now,
                    })
                        .andWhere("sale.isService = :isService", { isService: 1 })
                        .addGroupBy("service.name")
                        .orderBy("count", "DESC")
                        .limit(5)
                        .getRawMany()];
            case 4:
                service = _a.sent();
                //add colors
                result.topArtist = artist.map(function (val, index) {
                    return {
                        artist: val.artist,
                        count: Number(val.count),
                        fill: colorArrayArtist_1[index],
                    };
                });
                //add colors
                result.topItems = item.map(function (val, index) {
                    return {
                        item: val.item,
                        count: Number(val.count),
                        fill: colorArrayItem_1[index],
                    };
                });
                //add colors
                result.topService = service.map(function (val, index) {
                    return {
                        item: val.item,
                        count: Number(val.count),
                        fill: colorArrayItem_1[index],
                    };
                });
                res.send(result);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = new routes_types_1.Route("/dashboards", router);
//# sourceMappingURL=dashboard.route.js.map