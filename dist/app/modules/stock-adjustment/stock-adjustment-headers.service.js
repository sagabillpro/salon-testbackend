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
    var dataSource, stockRepo, stockResponse, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                stockRepo = dataSource.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                return [4 /*yield*/, stockRepo.find({
                        where: __assign(__assign({}, filter === null || filter === void 0 ? void 0 : filter.where), { isInactive: 0 }),
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
                        name: "Garnier Men, Face Wash, Brightening",
                        items: [
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
                        ],
                    },
                    {
                        name: "Nivea Men, Face Wash",
                        items: [
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
                        ],
                    },
                ];
                // const groupedData = data.reduce((acc: any, item: any) => {
                //   const serviceName = item.service.name;
                //   // Check if service name already exists
                //   const existingGroup: any = acc.find(
                //     (group: any) => group.name === serviceName
                //   );
                //   if (existingGroup) {
                //     existingGroup.items.push(item);
                //   } else {
                //     acc.push({
                //       name: serviceName,
                //       items: [item],
                //     });
                //   }
                //   return acc;
                // }, []);
                return [2 /*return*/, data];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (req, adjustmentLinesData) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        try {
            user = req.user;
            // // Get the data source instance
            // const dataSource = await handler();
            // let data = new StockAdjustmentHeaders();
            // // Create a new header entry for the stock adjustment
            // let headerEntry = new StockAdjustmentHeaders();
            // headerEntry.txnDate = new Date().toLocaleDateString();
            // headerEntry.createdById = user?.userId;
            // headerEntry.modifiedById = user?.userId;
            // headerEntry.transactionStatusId = 2;
            // headerEntry.companyId = user?.companyId;
            // // Repositories for item available and stock track records
            // const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
            // const itemsStockTrackRepo = dataSource.getRepository(ItemsStockTrack);
            // // Arrays to hold new inventory lines and final updated records
            // const inventoryLines: InventoryLines[] = [];
            // const finalItemAvailable: ItemAvailable[] = [];
            // const finalItemStockTrack: ItemsStockTrack[] = [];
            // // Create an array to store the service IDs from the adjustment lines
            // const selectedServiceIds: number[] = [];
            // // Loop through each adjustment line to create inventory line entries
            // adjustmentLinesData.forEach((line) => {
            //   const inventory = new InventoryLines();
            //   // Collect service id for later queries
            //   selectedServiceIds.push(line.serviceId);
            //   // Set the inventory line's properties based on the adjustment line
            //   inventory.quantity = line.finalVariation;
            //   inventory.stockId = line.stockId;
            //   inventory.serviceId = line.serviceId;
            //   inventory.createdDate = new Date().toISOString();
            //   inventory.modifiedDate = new Date().toISOString();
            //   inventoryLines.push(inventory);
            // });
            // // Fetch the current available items for the selected service IDs
            // const itemsAvailable = await itemAvailableRepo.find({
            //   where: { service: { id: In(selectedServiceIds) } },
            //   select: { id: true, quantity: true, service: { id: true, name: true } },
            // });
            // // Fetch current stock tracking records for the selected service IDs
            // const stockTracks = await itemsStockTrackRepo.find({
            //   where: { service: { id: In(selectedServiceIds) } },
            // });
            // // Create mapping from serviceId to itemAvailable record
            // const itemAvailableMap: { [key: number]: ItemAvailable } = {};
            // itemsAvailable.forEach((item) => {
            //   itemAvailableMap[item.serviceId] = item;
            // });
            // // Create mapping from stock track id to stock track record
            // const stockTrackMap: { [key: number]: ItemsStockTrack } = {};
            // stockTracks.forEach((track) => {
            //   stockTrackMap[track.id] = track;
            // });
            // // Build a final mapping for each service: sum up the final variation
            // // (there might be multiple adjustment lines per service)
            // const finalMapping: { [key: number]: number } = {};
            // adjustmentLinesData.forEach((line) => {
            //   const currentTotal = finalMapping[line.serviceId] || 0;
            //   finalMapping[line.serviceId] = currentTotal + line.finalVariation;
            // });
            // // Update the quantity of each item available using the final mapping.
            // for (const [serviceIdStr, totalFinalVariation] of Object.entries(
            //   finalMapping
            // )) {
            //   const serviceId = Number(serviceIdStr);
            //   const itemAvailable = itemAvailableMap[serviceId];
            //   // Update quantity by adding the total variation from adjustments
            //   itemAvailable.quantity += totalFinalVariation;
            //   finalItemAvailable.push(itemAvailable);
            // }
            // // Update each stock track record with the new quantities from adjustment lines.
            // // Assuming each adjustment line corresponds to a specific stock track entry (using record id).
            // adjustmentLinesData.forEach((line) => {
            //   const track = stockTrackMap[line.stockId];
            //   // Update the track record with new quantities (assumed to be provided in the adjustment line)
            //   track.quantityAdded = line.quantityAddedNew;
            //   track.quantityUvailable = line.quantityUvailableNew;
            //   finalItemStockTrack.push(track);
            // });
            // // Start a transaction to save header and related updates
            // await dataSource.manager.transaction(
            //   "SERIALIZABLE",
            //   async (transactionalEntityManager) => {
            //     // Optionally generate a code for the header (assumed generateCode returns a modified header)
            //     headerEntry = await generateCode(30, headerEntry);
            //     headerEntry.inventoryLines = inventoryLines;
            //     headerEntry.stockAdjustmentLines = adjustmentLinesData;
            //     // Create the header entry (here you might want to pass headerEntry, not adjustmentLines)
            //     const createdHeader = transactionalEntityManager.create(
            //       StockAdjustmentHeaders,
            //       headerEntry
            //     );
            //     // Save the header entry
            //     data = await transactionalEntityManager.save(
            //       StockAdjustmentHeaders,
            //       createdHeader
            //     );
            //     transactionalEntityManager.save(ItemAvailable, finalItemAvailable);
            //     transactionalEntityManager.save(ItemsStockTrack, finalItemStockTrack);
            //   }
            // );
            // return data;
            return [2 /*return*/, adjustmentLinesData];
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
var exportUsersToExcel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, stockRepo, stockResponse, workbook, worksheet, stream, error_3;
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
                error_3 = _a.sent();
                console.error("Error exporting data to Excel:", error_3);
                res.status(500).json({ message: "Error generating Excel file" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//1. find multiple records
var findStockByPurchase = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        try {
            data = [
                {
                    stockNumber: "STK-001",
                    purchaseDate: "2024-12-26",
                    item: "ABC1 - Some very long item name that might overflow",
                },
                {
                    stockNumber: "STK-002",
                    purchaseDate: "2024-12-27",
                    item: "ABC2 - Another long item description",
                },
                { stockNumber: "STK-003", purchaseDate: "2024-12-28", item: "ABC3" },
            ];
            return [2 /*return*/, data];
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
exports.default = {
    find: find,
    create: create,
    findStocks: findStocks,
    exportUsersToExcel: exportUsersToExcel,
    findStockByPurchase: findStockByPurchase,
};
//# sourceMappingURL=stock-adjustment-headers.service.js.map