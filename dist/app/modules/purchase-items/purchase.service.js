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
var get_object_code_util_1 = require("../../utils/get-object-code.util");
var dbconfig_1 = require("../../config/dbconfig");
var purchase_repo_1 = __importDefault(require("./purchase.repo"));
var purchase_headers_entity_1 = require("./entities/purchase-headers.entity");
var inventory_lines_entity_1 = require("../sale-items/entities/inventory-lines.entity");
var item_stocks_entity_1 = require("../sale-items/entities/item-stocks.entity");
var item_stocks_service_1 = __importDefault(require("../sale-items/item-stocks.service"));
var services_entity_1 = require("../services/entities/services.entity");
var item_stock_track_entity_1 = require("./entities/item-stock-track.entity");
var getuniquenumber_util_1 = __importDefault(require("../../utils/getuniquenumber.util"));
var purchase_lines_entity_1 = require("./entities/purchase-lines.entity");
//1. find multiple records
var find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, purchase_repo_1.default)()];
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
//2. find single records
var findById = function (id, filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, respo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, purchase_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [4 /*yield*/, repo.findOneById(id, filter)];
            case 2:
                respo = _a.sent();
                return [2 /*return*/, respo];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
//3. create single record
var create = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isService) {
        var repo, dataSource, itemStocksRepo, itemIds_1, inventory_1, resultItemStock, itemStockResponse, respo, error_3;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, (0, purchase_repo_1.default)()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 2:
                    dataSource = _a.sent();
                    itemStocksRepo = dataSource.getRepository(item_stocks_entity_1.ItemAvailable);
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(20, data)];
                case 3:
                    data = _a.sent();
                    itemIds_1 = [];
                    inventory_1 = [];
                    // check if lenght applicable
                    if (data.purchaseLines.length) {
                    }
                    if (!!isService) return [3 /*break*/, 6];
                    data.purchaseLines.forEach(function (value) {
                        var il = new inventory_lines_entity_1.InventoryLines();
                        (il.service = value.service),
                            (il.quantity = -Number(value.quantity)),
                            (il.createdDate = value.createdDate),
                            (il.modifiedDate = value.modifiedDate);
                        itemIds_1.push(value.service.id);
                        inventory_1.push(il);
                    });
                    data.inventoryLines = inventory_1;
                    return [4 /*yield*/, item_stocks_service_1.default.create(inventory_1, itemIds_1)];
                case 4:
                    resultItemStock = _a.sent();
                    itemStockResponse = itemStocksRepo.create(resultItemStock);
                    return [4 /*yield*/, itemStocksRepo.save(itemStockResponse)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    respo = repo.create(__assign({}, data));
                    return [2 /*return*/, respo];
                case 7:
                    error_3 = _a.sent();
                    throw error_3;
                case 8: return [2 /*return*/];
            }
        });
    });
};
//4. update single record by id
var updateById = function (id_1, data_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([id_1, data_1], args_1, true), void 0, function (id, data, isService) {
        var repo, inventory_2, respo, error_4;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, purchase_repo_1.default)()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(20, data)];
                case 2:
                    data = _a.sent();
                    inventory_2 = [];
                    if (!isService) {
                        data.purchaseLines.forEach(function (value) {
                            var il = new inventory_lines_entity_1.InventoryLines();
                            (il.service = value.service),
                                (il.quantity = -Number(value.quantity)),
                                (il.createdDate = value.createdDate),
                                (il.modifiedDate = value.modifiedDate);
                            inventory_2.push(il);
                        });
                        data.inventoryLines = inventory_2;
                    }
                    respo = repo.updateById(id, __assign({}, data));
                    return [2 /*return*/, respo];
                case 3:
                    error_4 = _a.sent();
                    throw error_4;
                case 4: return [2 /*return*/];
            }
        });
    });
};
//5. delete single record by id
var deleteById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, purchase_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [4 /*yield*/, repo.deleteById(id)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
// //3. create single record
// const createBulk = async (data: PurchaseHeaders) => {
//   try {
//     const dataSource = await handler();
//     data = await generateCode(20, data);
//     const itemIds: number[] = [];
//     const inventory: InventoryLines[] = [];
//     const itemRepo = dataSource.getRepository(Services);
//     data.purchaseLines.forEach((value) => {
//       itemIds.push(value.service.id);
//     });
//     //. 1.create itemId and sku mapping
//     const skuMap: {
//       [key: number]: string;
//     } = {};
//     //2. get related items only
//     const relatedItems = await itemRepo.find({
//       where: {
//         id: In(itemIds),
//         isInactive: 0,
//       },
//       select: {
//         sku: true,
//         id: true,
//       },
//     });
//     //create latest items mapping
//     const latestItemMap = {};
//     relatedItems.forEach((val) => {
//       latestItemMap[val.recordId] = val.id;
//     });
//     data.purchaseLines = data.purchaseLines.map((value) => {
//       return {
//         ...value,
//         serviceId: latestItemMap[value.service.id],
//         serviceRecordId: value.service.id,
//       };
//     });
//     //3. create sku mapping for future
//     relatedItems.forEach((val) => {
//       skuMap[val.id] = val.sku + "-" + generateUniqueNumber();
//     });
//     //3. start transaction
//     await dataSource.manager.transaction(
//       "SERIALIZABLE",
//       async (transactionalEntityManager) => {
//         const headerEntry = transactionalEntityManager.create(
//           PurchaseHeaders,
//           data
//         );
//         // ************** A) stock logic start ************************************************************
//         const stockEntries: ItemsStockTrack[] = [];
//         //1. create Stock and save stock
//         data.purchaseLines.forEach((value) => {
//           const stockInstance = new ItemsStockTrack();
//           stockInstance.createdDate = value.createdDate;
//           stockInstance.modifiedDate = value.modifiedDate;
//           stockInstance.quantityAdded = value.quantity;
//           stockInstance.unitPrice = value.unitPrice;
//           // stockInstance.service = value.service;
//           stockInstance.serviceId = latestItemMap[value.service.id];
//           stockInstance.serviceRecordId = value.service.id;
//           stockInstance.quantityUvailable = value.quantity;
//           stockInstance.stockNumber = skuMap[value.service.id];
//           stockEntries.push(stockInstance);
//         });
//         const itemIdStockMap: {
//           [key: number]: ItemsStockTrack;
//         } = {};
//         const stockTrackEntry = transactionalEntityManager.create(
//           ItemsStockTrack,
//           stockEntries
//         );
//         //2. update items availability
//         const stockTrackResult = await transactionalEntityManager.save(
//           ItemsStockTrack,
//           stockTrackEntry
//         );
//         // add entries into mapping object
//         stockTrackResult.forEach((val) => {
//           itemIdStockMap[val.service.id] = val;
//         });
//         //************** stock logic end ***********************************************************************/
//         //**************** B) inventory lodic start **********************************************************
//         //2. create inventory
//         data.purchaseLines.forEach((value) => {
//           const il = new InventoryLines();
//           // il.service = value.service;
//           il.serviceRecordId = value.service.id;
//           il.serviceId = latestItemMap[value.service.id];
//           il.quantity = Number(value.quantity);
//           il.createdDate = value.createdDate;
//           il.modifiedDate = value.modifiedDate;
//           il.stock = itemIdStockMap[value.service.id];
//           inventory.push(il);
//         });
//         //attch the object to inventory
//         headerEntry.inventoryLines = inventory;
//         // *************** inventory lodic end  *********************************************************
//         // *************** C) item available start ********************************************************
//         //1. create stock elements
//         const resultItemAvailable = await itemStocksService.create(
//           inventory,
//           itemIds
//         );
//         const itemAvailableEntry = transactionalEntityManager.create(
//           ItemAvailable,
//           resultItemAvailable
//         );
//         //2. update items availability
//         await transactionalEntityManager.save(
//           ItemAvailable,
//           itemAvailableEntry
//         );
//         // *************** item available end ********************************************************
//         //********** D) header entry save start ***************/
//         const headerEntryResult = await transactionalEntityManager.save(
//           PurchaseHeaders,
//           headerEntry
//         );
//         //********** header entry save end *********************************************************************/
//         data = headerEntryResult;
//       }
//     );
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
var createBulk = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isCalledForEdit) {
        var dataSource, itemIds_2, itemRepo, relatedItems, latestItemMap_1, skuMap_1, error_6;
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
                    data = _a.sent();
                    _a.label = 3;
                case 3:
                    itemIds_2 = data.purchaseLines.map(function (line) { return line.service.id; });
                    itemRepo = dataSource.getRepository(services_entity_1.Services);
                    return [4 /*yield*/, itemRepo.find({
                            where: { id: (0, typeorm_1.In)(itemIds_2), isInactive: 0 },
                            select: { sku: true, id: true, recordId: true },
                        })];
                case 4:
                    relatedItems = _a.sent();
                    latestItemMap_1 = {};
                    skuMap_1 = {};
                    relatedItems.forEach(function (item) {
                        latestItemMap_1[item.recordId] = item.id;
                        skuMap_1[item.id] = "".concat(item.sku, "-").concat((0, getuniquenumber_util_1.default)());
                    });
                    // Update purchase lines with latest serviceId and store original record id
                    data.purchaseLines = data.purchaseLines.map(function (line) { return (__assign(__assign({}, line), { serviceId: latestItemMap_1[line.service.id], serviceRecordId: line.service.id })); });
                    // Start transaction to handle stock updates, inventory, and header insertion
                    return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                            var headerEntry, stockEntries, stockTrackResult, itemIdStockMap, inventory, resultItemAvailable, itemAvailableEntry, headerEntryResult, stockTrackResultNew;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        headerEntry = manager.create(purchase_headers_entity_1.PurchaseHeaders, data);
                                        stockEntries = data.purchaseLines.map(function (line) {
                                            var stock = new item_stock_track_entity_1.ItemsStockTrack();
                                            stock.createdDate = line.createdDate;
                                            stock.modifiedDate = line.modifiedDate;
                                            stock.quantityAdded = line.quantity;
                                            stock.unitPrice = line.unitPrice;
                                            stock.serviceId = latestItemMap_1[line.service.id];
                                            stock.serviceRecordId = line.service.id;
                                            stock.quantityUvailable = line.quantity;
                                            stock.stockNumber = skuMap_1[line.service.id];
                                            return stock;
                                        });
                                        return [4 /*yield*/, manager.save(item_stock_track_entity_1.ItemsStockTrack, stockEntries)];
                                    case 1:
                                        stockTrackResult = _a.sent();
                                        itemIdStockMap = {};
                                        stockTrackResult.forEach(function (stock) {
                                            itemIdStockMap[stock.service.id] = stock;
                                        });
                                        inventory = data.purchaseLines.map(function (line) {
                                            var invLine = new inventory_lines_entity_1.InventoryLines();
                                            invLine.serviceRecordId = line.service.id;
                                            invLine.serviceId = latestItemMap_1[line.service.id];
                                            invLine.quantity = Number(line.quantity);
                                            invLine.createdDate = line.createdDate;
                                            invLine.modifiedDate = line.modifiedDate;
                                            invLine.stock = itemIdStockMap[line.service.id];
                                            return invLine;
                                        });
                                        headerEntry.inventoryLines = inventory;
                                        return [4 /*yield*/, item_stocks_service_1.default.create(inventory, itemIds_2)];
                                    case 2:
                                        resultItemAvailable = _a.sent();
                                        itemAvailableEntry = manager.create(item_stocks_entity_1.ItemAvailable, resultItemAvailable);
                                        return [4 /*yield*/, manager.save(item_stocks_entity_1.ItemAvailable, itemAvailableEntry)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, manager.save(purchase_headers_entity_1.PurchaseHeaders, headerEntry)];
                                    case 4:
                                        headerEntryResult = _a.sent();
                                        stockTrackResultNew = stockTrackResult.map(function (stock) {
                                            stock.txnHeaderId = headerEntryResult.id;
                                            stock.txnHeaderRecordId = headerEntryResult.recordId;
                                            return stock; // Ensure the modified stock object is returned
                                        });
                                        return [4 /*yield*/, manager.save(item_stock_track_entity_1.ItemsStockTrack, stockTrackResultNew)];
                                    case 5:
                                        _a.sent();
                                        data = headerEntryResult;
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 5:
                    // Start transaction to handle stock updates, inventory, and header insertion
                    _a.sent();
                    return [2 /*return*/, data];
                case 6:
                    error_6 = _a.sent();
                    throw error_6;
                case 7: return [2 /*return*/];
            }
        });
    });
};
var editBulk = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, headerRepo, purchaseLinesRepo, itemAvailableRepo, itemsStockTrackRepo, inventoryLinesRepo, headerResponse_1, purchaseLines_1, itemStockTrack_1, inventoryLines_1, inventoryMap_1, itemAvailable, itemAvailableMap_1, itemAvailableUpdate_1, error_7;
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
                            recordId: data.recordId,
                            isInactive: 0,
                        },
                    })];
            case 2:
                headerResponse_1 = _a.sent();
                return [4 /*yield*/, purchaseLinesRepo.find({
                        where: {
                            txnHeaderRecordId: data.recordId,
                            isInactive: 0,
                        },
                    })];
            case 3:
                purchaseLines_1 = _a.sent();
                return [4 /*yield*/, itemsStockTrackRepo.find({
                        where: {
                            txnHeaderRecordId: data.recordId,
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
                            purchaseRecordId: data.recordId,
                            isInactive: 0,
                        },
                    })];
            case 5:
                inventoryLines_1 = _a.sent();
                inventoryMap_1 = {};
                purchaseLines_1.forEach(function (val) {
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
                //loop through the inventoryMap and minus the quantity from itemAvailableMap
                Object.keys(inventoryMap_1).forEach(function (key) {
                    //if this is negative means any conflict happent throw error
                    if (itemAvailableMap_1[key] - inventoryMap_1[key] < 0) {
                        throw {
                            message: "This purchase transaction is in use and cannot be edited, please contact support",
                            statusCode: 409,
                        };
                    }
                    itemAvailableMap_1[key] = itemAvailableMap_1[key] - inventoryMap_1[key];
                });
                itemAvailableUpdate_1 = itemAvailable.map(function (val) {
                    val.quantity = itemAvailableMap_1[val.serviceId];
                    return val;
                });
                //create new purchase transaction
                return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                        var newPurchase;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                //update the itemAvailable for rollback
                                return [4 /*yield*/, manager.save(item_stocks_entity_1.ItemAvailable, itemAvailableUpdate_1)];
                                case 1:
                                    //update the itemAvailable for rollback
                                    _a.sent();
                                    //make purchaseLines iteStockTrack and inventoryLines inactive
                                    return [4 /*yield*/, manager.save(purchase_lines_entity_1.PurchaseLines, purchaseLines_1.map(function (val) {
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
                                    return [4 /*yield*/, manager.save(purchase_headers_entity_1.PurchaseHeaders, __assign(__assign({}, headerResponse_1), { isInactive: 1 }))];
                                case 5:
                                    //make the header inactive
                                    headerResponse_1 = _a.sent();
                                    return [4 /*yield*/, createBulk(__assign(__assign({}, data), { recordId: headerResponse_1.recordId, code: headerResponse_1.code }), true)];
                                case 6:
                                    newPurchase = _a.sent();
                                    data = newPurchase;
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 7:
                //create new purchase transaction
                _a.sent();
                return [2 /*return*/, data];
            case 8:
                error_7 = _a.sent();
                throw error_7;
            case 9: return [2 /*return*/];
        }
    });
}); };
var purchaseReturn = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, headerRepo, purchaseLinesRepo, inventoryLinesRepo, stockTrackRepo, itemAvailableRepo, header_1, purchaseLines_2, inventoryLines_2, stockTracks_1, purchasedQuantityMap_1, availableItems, availableMap_1, updatedAvailableItems_1, newPurchaseReturn, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                headerRepo = dataSource.getRepository(purchase_headers_entity_1.PurchaseHeaders);
                purchaseLinesRepo = dataSource.getRepository(purchase_lines_entity_1.PurchaseLines);
                inventoryLinesRepo = dataSource.getRepository(inventory_lines_entity_1.InventoryLines);
                stockTrackRepo = dataSource.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                itemAvailableRepo = dataSource.getRepository(item_stocks_entity_1.ItemAvailable);
                return [4 /*yield*/, headerRepo.findOne({
                        where: { recordId: data.recordId, isInactive: 0 },
                    })];
            case 2:
                header_1 = _a.sent();
                return [4 /*yield*/, purchaseLinesRepo.find({
                        where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
                    })];
            case 3:
                purchaseLines_2 = _a.sent();
                return [4 /*yield*/, inventoryLinesRepo.find({
                        where: { purchaseRecordId: data.recordId, isInactive: 0 },
                        relations: { stock: true },
                    })];
            case 4:
                inventoryLines_2 = _a.sent();
                return [4 /*yield*/, stockTrackRepo.find({
                        where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
                    })];
            case 5:
                stockTracks_1 = _a.sent();
                // 2. Validate eligibility for return (ensure no partial processing has occurred)
                stockTracks_1.forEach(function (stock) {
                    if (stock.quantityAdded !== stock.quantityUvailable) {
                        throw {
                            message: "Purchase transaction is in use and cannot be returned.",
                            statusCode: 409,
                        };
                    }
                });
                purchasedQuantityMap_1 = {};
                purchaseLines_2.forEach(function (line) {
                    purchasedQuantityMap_1[line.serviceId] =
                        (purchasedQuantityMap_1[line.serviceId] || 0) + line.quantity;
                });
                return [4 /*yield*/, itemAvailableRepo.find({
                        where: {
                            serviceId: (0, typeorm_1.In)(Object.keys(purchasedQuantityMap_1).map(Number)),
                            isInactive: 0,
                        },
                    })];
            case 6:
                availableItems = _a.sent();
                availableMap_1 = {};
                availableItems.forEach(function (item) {
                    availableMap_1[item.serviceId] = item.quantity;
                });
                // For purchase return, reverse the addition done during purchase by subtracting the purchased quantities
                Object.keys(purchasedQuantityMap_1).forEach(function (serviceIdStr) {
                    var serviceId = Number(serviceIdStr);
                    // If subtracting results in negative availability, then it's an error (cannot return more than available)
                    if (availableMap_1[serviceId] - purchasedQuantityMap_1[serviceId] < 0) {
                        throw {
                            message: "Purchase transaction is in use and cannot be returned, please contact support",
                            statusCode: 409,
                        };
                    }
                    availableMap_1[serviceId] =
                        availableMap_1[serviceId] - purchasedQuantityMap_1[serviceId];
                });
                updatedAvailableItems_1 = availableItems.map(function (item) {
                    item.quantity = availableMap_1[item.serviceId];
                    return item;
                });
                newPurchaseReturn = void 0;
                return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                        var updatedHeader;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // Update item availability for the return
                                return [4 /*yield*/, manager.save(item_stocks_entity_1.ItemAvailable, updatedAvailableItems_1)];
                                case 1:
                                    // Update item availability for the return
                                    _a.sent();
                                    // Mark original purchase lines, stock tracks, and inventory lines as inactive
                                    return [4 /*yield*/, manager.save(purchase_lines_entity_1.PurchaseLines, purchaseLines_2.map(function (line) { return (__assign(__assign({}, line), { isInactive: 1 })); }))];
                                case 2:
                                    // Mark original purchase lines, stock tracks, and inventory lines as inactive
                                    _a.sent();
                                    return [4 /*yield*/, manager.save(item_stock_track_entity_1.ItemsStockTrack, stockTracks_1.map(function (stock) { return (__assign(__assign({}, stock), { isInactive: 1 })); }))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, manager.save(inventory_lines_entity_1.InventoryLines, inventoryLines_2.map(function (inv) { return (__assign(__assign({}, inv), { isInactive: 1 })); }))];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, manager.save(purchase_headers_entity_1.PurchaseHeaders, __assign(__assign({}, header_1), { isInactive: 1 }))];
                                case 5:
                                    updatedHeader = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 7:
                _a.sent();
                return [2 /*return*/, {}];
            case 8:
                error_8 = _a.sent();
                throw error_8;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    find: find,
    findById: findById,
    create: create,
    deleteById: deleteById,
    updateById: updateById,
    createBulk: createBulk,
    editBulk: editBulk,
};
//# sourceMappingURL=purchase.service.js.map