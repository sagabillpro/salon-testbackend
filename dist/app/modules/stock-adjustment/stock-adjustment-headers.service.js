"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var get_object_code_util_1 = require("../../utils/get-object-code.util");
var stock_adjustment_headers_repo_1 = __importDefault(require("./stock-adjustment-headers.repo"));
var dbconfig_1 = require("../../config/dbconfig");
var item_stock_track_entity_1 = require("../purchase-items/entities/item-stock-track.entity");
var exceljs_1 = __importDefault(require("exceljs"));
var stream_1 = require("stream");
var get_report_headers_util_1 = require("../../utils/get-report-headers.util");
//1. find multiple records
var find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, stock_adjustment_headers_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [2 /*return*/, repo.find(filter)];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
//1. find multiple records
var findStocks = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, stockRepo, stockResponse, data, groupedData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                stockRepo = dataSource.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                return [4 /*yield*/, stockRepo.find({
                        where: {
                            isInactive: 0,
                        },
                        select: {
                            id: true,
                            createdDate: true,
                            modifiedDate: true,
                            quantityAdded: true,
                            quantityUvailable: true,
                            unitPrice: true,
                            stockNumber: true,
                            service: {
                                name: true,
                                id: true,
                            },
                        },
                        relations: {
                            service: true,
                        },
                    })];
            case 2:
                stockResponse = _a.sent();
                data = [
                    {
                        id: 30,
                        unitPrice: 178,
                        stockNumber: "GRNP-20241226132106535168",
                        quantityAdded: 7,
                        quantityUvailable: 2,
                        createdDate: "2024-12-26T07:51:05.390Z",
                        modifiedDate: "2024-12-27 05:17:39.484661+00",
                        service: {
                            id: 31,
                            name: "Garnier Men, Face Wash, Brightening",
                        },
                    },
                    {
                        id: 31,
                        unitPrice: 100,
                        stockNumber: "GRNP-20241226132106535169",
                        quantityAdded: 5,
                        quantityUvailable: 3,
                        createdDate: "2024-12-26T07:51:06.390Z",
                        modifiedDate: "2024-12-27 05:17:40.484661+00",
                        service: {
                            id: 31,
                            name: "Garnier Men, Face Wash, Brightening",
                        },
                    },
                    {
                        id: 32,
                        unitPrice: 200,
                        stockNumber: "GRNP-20241226132106535170",
                        quantityAdded: 10,
                        quantityUvailable: 10,
                        createdDate: "2024-12-26T07:51:07.390Z",
                        modifiedDate: "2024-12-27 05:17:41.484661+00",
                        service: {
                            id: 32,
                            name: "Nivea Men, Face Wash",
                        },
                    },
                ];
                groupedData = data.reduce(function (acc, item) {
                    var serviceName = item.service.name;
                    // Check if service name already exists
                    var existingGroup = acc.find(function (group) { return group.name === serviceName; });
                    if (existingGroup) {
                        existingGroup.items.push(item);
                    }
                    else {
                        acc.push({
                            name: serviceName,
                            items: [item],
                        });
                    }
                    return acc;
                }, []);
                return [2 /*return*/, groupedData];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
//3. create single record
var create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, respo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, stock_adjustment_headers_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(14, data)];
            case 2:
                data = _a.sent();
                respo = repo.create(__assign({}, data));
                return [2 /*return*/, respo];
            case 3:
                error_3 = _a.sent();
                throw error_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
var exportUsersToExcel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, stockRepo, stockResponse, workbook, worksheet, stream, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                stockRepo = dataSource.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                return [4 /*yield*/, stockRepo.find({
                        where: {
                            isInactive: 0,
                        },
                        select: {
                            id: true,
                            createdDate: true,
                            modifiedDate: true,
                            quantityAdded: true,
                            quantityUvailable: true,
                            unitPrice: true,
                            stockNumber: true,
                            service: {
                                name: true,
                                id: true,
                            },
                        },
                        relations: {
                            service: true,
                        },
                    })];
            case 2:
                stockResponse = _a.sent();
                workbook = new exceljs_1.default.Workbook();
                worksheet = workbook.addWorksheet("Report");
                worksheet = (0, get_report_headers_util_1.getWorksheetColumnsFromSchema)(10, worksheet, stockResponse);
                console.log("worksheet", worksheet);
                // 5. Stream the Excel file as a response
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", "attachment; filename=Report_".concat(Date.now(), ".xlsx"));
                stream = new stream_1.PassThrough();
                return [4 /*yield*/, workbook.xlsx.write(stream)];
            case 3:
                _a.sent();
                // 7. Pipe the stream directly to the response
                stream.pipe(res);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error("Error exporting data to Excel:", error_4);
                res.status(500).json({ message: "Error generating Excel file" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = { find: find, create: create, findStocks: findStocks, exportUsersToExcel: exportUsersToExcel };
//# sourceMappingURL=stock-adjustment-headers.service.js.map