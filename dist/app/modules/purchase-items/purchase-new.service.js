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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var purchase_lines_entity_1 = require("./entities/purchase-lines.entity");
var item_stock_track_entity_1 = require("./entities/item-stock-track.entity");
var inventory_lines_entity_1 = require("../sale-items/entities/inventory-lines.entity");
var item_stocks_service_1 = __importDefault(require("../sale-items/item-stocks.service"));
var item_stocks_entity_1 = require("../sale-items/entities/item-stocks.entity");
var purchase_headers_entity_1 = require("./entities/purchase-headers.entity");
var dbconfig_1 = require("../../config/dbconfig");
var get_object_code_util_1 = require("../../utils/get-object-code.util");
var services_entity_1 = require("../services/entities/services.entity");
var getuniquenumber_util_1 = __importDefault(require("../../utils/getuniquenumber.util"));
// Function to increase inventory (used for Purchase creation/edit)
var increaseInventory = function (manager, purchaseLines, skuMap, headerId // Optional headerId for linking stock entries in edit scenario
) { return __awaiter(void 0, void 0, void 0, function () {
    var stockEntries, stockTrackResult, itemIdStockMap, inventory, itemIds, resultItemAvailable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stockEntries = purchaseLines.map(function (line) {
                    var stock = new item_stock_track_entity_1.ItemsStockTrack();
                    stock.createdDate = line.createdDate;
                    stock.modifiedDate = line.modifiedDate;
                    stock.quantityAdded = line.quantity;
                    stock.unitPrice = line.unitPrice;
                    stock.serviceId = line.serviceId;
                    stock.quantityUvailable = line.quantity;
                    stock.stockNumber = skuMap[line.serviceId]; // Use serviceId as key
                    if (headerId) {
                        stock.txnHeaderId = headerId; // Link to header if available (edit scenario)
                    }
                    return stock;
                });
                return [4 /*yield*/, manager.save(item_stock_track_entity_1.ItemsStockTrack, stockEntries)];
            case 1:
                stockTrackResult = _a.sent();
                itemIdStockMap = {};
                stockTrackResult.forEach(function (stock) {
                    itemIdStockMap[stock.serviceId] = stock; // Use serviceId as key
                });
                inventory = purchaseLines.map(function (line) {
                    var invLine = new inventory_lines_entity_1.InventoryLines();
                    invLine.serviceId = line.serviceId;
                    invLine.quantity = Number(line.quantity);
                    invLine.createdDate = line.createdDate;
                    invLine.modifiedDate = line.modifiedDate;
                    invLine.stock = itemIdStockMap[line.serviceId]; // Use serviceId as key
                    if (headerId) {
                        invLine.purchaseId = headerId; // Link to header if available (edit scenario)
                    }
                    return invLine;
                });
                itemIds = purchaseLines.map(function (line) { return line.serviceId; });
                return [4 /*yield*/, item_stocks_service_1.default.create(inventory, itemIds)];
            case 2:
                resultItemAvailable = _a.sent();
                return [4 /*yield*/, manager.save(item_stocks_entity_1.ItemAvailable, resultItemAvailable)];
            case 3:
                _a.sent();
                return [2 /*return*/, { stockTrackResult: stockTrackResult, inventory: inventory }]; // Return relevant results if needed
        }
    });
}); };
// Function to decrease inventory (currently adapted for Purchase Edit Rollback)
// Note: This function is tailored for reversing a PURCHASE, not general sales decrease.
var decreaseInventoryForPurchaseEditRollback = function (manager, purchaseLinesNew, // Original purchase lines to reverse
itemAvailableMap // Current item availability map
) { return __awaiter(void 0, void 0, void 0, function () {
    var itemAvailableRepo, inventoryMap, itemAvailableUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                itemAvailableRepo = manager.getRepository(item_stocks_entity_1.ItemAvailable);
                inventoryMap = {};
                purchaseLinesNew.forEach(function (val) {
                    inventoryMap[val.serviceId] = val.quantity;
                });
                return [4 /*yield*/, itemAvailableRepo.find({
                        where: {
                            serviceId: (0, typeorm_1.In)(Object.keys(inventoryMap)),
                            isInactive: 0,
                        },
                    })];
            case 1:
                itemAvailableUpdate = _a.sent();
                itemAvailableUpdate.forEach(function (val) {
                    val.quantity = itemAvailableMap[val.serviceId]; // Restore quantity
                });
                return [4 /*yield*/, manager.save(item_stocks_entity_1.ItemAvailable, itemAvailableUpdate)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createBulk = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isCalledForEdit) {
        var dataSource, itemIds, itemRepo, relatedItems, skuMap_1, latestItemMap_1, error_1;
        if (isCalledForEdit === void 0) { isCalledForEdit = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    dataSource = _a.sent();
                    if (!!isCalledForEdit) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(20, data)];
                case 2:
                    // Generate code only for new purchases
                    data = _a.sent();
                    _a.label = 3;
                case 3:
                    itemIds = data.purchaseLines.map(function (line) { return line.serviceId; });
                    itemRepo = dataSource.getRepository(services_entity_1.Services);
                    return [4 /*yield*/, itemRepo.find({
                            where: { id: (0, typeorm_1.In)(itemIds), isInactive: 0 },
                            select: { sku: true, id: true }, // Include recordId
                        })];
                case 4:
                    relatedItems = _a.sent();
                    skuMap_1 = {};
                    latestItemMap_1 = {};
                    relatedItems.forEach(function (item) {
                        skuMap_1[item.id] = "".concat(item.sku, "-").concat((0, getuniquenumber_util_1.default)());
                        latestItemMap_1[item.id] = item.id; // Map recordId to latest id
                    });
                    // Update purchase lines with latest serviceId and store original record id
                    data.purchaseLines = data.purchaseLines.map(function (line) { return (__assign(__assign({}, line), { serviceId: latestItemMap_1[line.serviceId] })); });
                    // Start transaction to handle stock updates, inventory, and header insertion
                    return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                            var headerEntry, headerEntryResult, inventoryResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        headerEntry = manager.create(purchase_headers_entity_1.PurchaseHeaders, data);
                                        return [4 /*yield*/, manager.save(purchase_headers_entity_1.PurchaseHeaders, headerEntry)];
                                    case 1:
                                        headerEntryResult = _a.sent();
                                        return [4 /*yield*/, increaseInventory(manager, data.purchaseLines, skuMap_1, headerEntryResult.id // Pass headerId for linking
                                            )];
                                    case 2:
                                        inventoryResult = _a.sent();
                                        data = headerEntryResult; // Return header entry as before
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 5:
                    // Start transaction to handle stock updates, inventory, and header insertion
                    _a.sent();
                    return [2 /*return*/, data];
                case 6:
                    error_1 = _a.sent();
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
};
var editBulk = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, headerRepo, purchaseLinesRepo, itemAvailableRepo, itemsStockTrackRepo, inventoryLinesRepo, headerResponse_1, purchaseLinesNew_1, itemStockTrack_1, inventoryLines_1, inventoryMap_1, itemAvailable, itemAvailableMap_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                headerRepo = dataSource.getRepository(purchase_headers_entity_1.PurchaseHeaders);
                purchaseLinesRepo = dataSource.getRepository(purchase_lines_entity_1.PurchaseLines);
                itemAvailableRepo = dataSource.getRepository(item_stocks_entity_1.ItemAvailable);
                itemsStockTrackRepo = dataSource.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                inventoryLinesRepo = dataSource.getRepository(inventory_lines_entity_1.InventoryLines);
                return [4 /*yield*/, headerRepo.findOne({
                        where: {
                            id: data.id,
                            isInactive: 0,
                        },
                    })];
            case 2:
                headerResponse_1 = _a.sent();
                if (!headerResponse_1) {
                    throw {
                        message: "Record not found with id: " + data.id,
                        statusCode: 404,
                    };
                }
                return [4 /*yield*/, purchaseLinesRepo.find({
                        where: {
                            txnHeaderId: data.id,
                            isInactive: 0,
                        },
                    })];
            case 3:
                purchaseLinesNew_1 = _a.sent();
                return [4 /*yield*/, itemsStockTrackRepo.find({
                        where: {
                            txnHeaderId: data.id,
                            isInactive: 0,
                        },
                    })];
            case 4:
                itemStockTrack_1 = _a.sent();
                //if in itemStockTrack if quantityAdded is not equal to quantityUvailable  then throw error
                itemStockTrack_1.forEach(function (val) {
                    if (val.quantityAdded !== val.quantityUvailable) {
                        throw {
                            message: "This purchase transaction is in use and cannot be edited, please contact support",
                            statusCode: 409,
                        };
                    }
                });
                return [4 /*yield*/, inventoryLinesRepo.find({
                        where: {
                            purchaseId: data.id,
                            isInactive: 0,
                        },
                    })];
            case 5:
                inventoryLines_1 = _a.sent();
                inventoryMap_1 = {};
                purchaseLinesNew_1.forEach(function (val) {
                    inventoryMap_1[val.serviceId] = val.quantity;
                });
                return [4 /*yield*/, itemAvailableRepo.find({
                        where: {
                            serviceId: (0, typeorm_1.In)(Object.keys(inventoryMap_1)),
                            isInactive: 0,
                        },
                    })];
            case 6:
                itemAvailable = _a.sent();
                itemAvailableMap_1 = {};
                itemAvailable.forEach(function (val) {
                    itemAvailableMap_1[val.serviceId] = val.quantity;
                });
                //create new purchase transaction
                return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                        var purchaseLines, headerWithoutLines;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // Decrease inventory by restoring ItemAvailable quantities
                                return [4 /*yield*/, decreaseInventoryForPurchaseEditRollback(manager, purchaseLinesNew_1, itemAvailableMap_1)];
                                case 1:
                                    // Decrease inventory by restoring ItemAvailable quantities
                                    _a.sent();
                                    //make purchaseLines iteStockTrack and inventoryLines inactive
                                    return [4 /*yield*/, manager.save(purchase_lines_entity_1.PurchaseLines, purchaseLinesNew_1.map(function (val) {
                                            val.isInactive = 1;
                                            return val;
                                        }))];
                                case 2:
                                    //make purchaseLines iteStockTrack and inventoryLines inactive
                                    _a.sent();
                                    return [4 /*yield*/, manager.save(item_stock_track_entity_1.ItemsStockTrack, itemStockTrack_1.map(function (val) {
                                            val.isInactive = 1;
                                            return val;
                                        }))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, manager.save(inventory_lines_entity_1.InventoryLines, inventoryLines_1.map(function (val) {
                                            val.isInactive = 1;
                                            return val;
                                        }))];
                                case 4:
                                    _a.sent();
                                    purchaseLines = data.purchaseLines, headerWithoutLines = __rest(data, ["purchaseLines"]);
                                    return [4 /*yield*/, manager.save(purchase_headers_entity_1.PurchaseHeaders, __assign(__assign(__assign({}, headerResponse_1), headerWithoutLines), { isInactive: 1 }))];
                                case 5:
                                    headerResponse_1 = _a.sent();
                                    //create new purchase transaction (using createBulk in edit mode)
                                    data.code = headerResponse_1.code; //important to maintain code for history/linking
                                    data.isInactive = 0; // ensure new record is active
                                    return [4 /*yield*/, createBulk(data, true)];
                                case 6:
                                    _a.sent(); // Call createBulk for recreation, passing isCalledForEdit = true
                                    data = headerResponse_1; //even though we are recreating we are sending old header response for now // consider returning new header from create bulk if needed
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 7:
                //create new purchase transaction
                _a.sent();
                return [2 /*return*/, data];
            case 8:
                error_2 = _a.sent();
                throw error_2;
            case 9: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=purchase-new.service.js.map