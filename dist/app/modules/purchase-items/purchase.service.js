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
var company_entity_1 = require("../company/entities/company.entity");
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
//3. create single record
var createBulk = function (req, data) { return __awaiter(void 0, void 0, void 0, function () {
    var user_1, dataSource, itemIds_2, inventory_3, itemRepo, skuMap_1, relatedItems, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                user_1 = req.user;
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(20, data)];
            case 2:
                data = _a.sent();
                itemIds_2 = [];
                inventory_3 = [];
                itemRepo = dataSource.getRepository(services_entity_1.Services);
                data.purchaseLines.forEach(function (value) {
                    itemIds_2.push(value.service.id);
                });
                skuMap_1 = {};
                return [4 /*yield*/, itemRepo.find({
                        where: {
                            id: (0, typeorm_1.In)(itemIds_2),
                        },
                        select: {
                            sku: true,
                            id: true,
                        },
                    })];
            case 3:
                relatedItems = _a.sent();
                //3. create sku mapping for future
                relatedItems.forEach(function (val) {
                    skuMap_1[val.id] = val.sku + "-" + (0, getuniquenumber_util_1.default)();
                });
                //3. start transaction
                console.log("pass1 ");
                return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (transactionalEntityManager) { return __awaiter(void 0, void 0, void 0, function () {
                        var headerEntry, stockEntries, itemIdStockMap, stockTrackEntry, stockTrackResult, resultItemAvailable, itemAvailableEntry, headerEntryResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    headerEntry = transactionalEntityManager.create(purchase_headers_entity_1.PurchaseHeaders, __assign(__assign({}, data), { companyId: user_1.companyId }));
                                    console.log("pass2");
                                    stockEntries = [];
                                    //1. create Stock and save stock
                                    console.log("pass3 ");
                                    data.purchaseLines.forEach(function (value) {
                                        var stockInstance = new item_stock_track_entity_1.ItemsStockTrack();
                                        stockInstance.createdDate = value.createdDate;
                                        stockInstance.modifiedDate = value.modifiedDate;
                                        stockInstance.quantityAdded = value.quantity;
                                        stockInstance.unitPrice = value.unitPrice;
                                        stockInstance.serviceId = value.service.id;
                                        stockInstance.quantityUvailable = value.quantity;
                                        stockInstance.txnHeaderId = headerEntry.id;
                                        stockInstance.stockNumber = skuMap_1[value.service.id];
                                        stockInstance.companyId = user_1.companyId;
                                        stockEntries.push(stockInstance);
                                    });
                                    itemIdStockMap = {};
                                    console.log("pass4");
                                    stockTrackEntry = transactionalEntityManager.create(item_stock_track_entity_1.ItemsStockTrack, stockEntries);
                                    console.log("pass5");
                                    return [4 /*yield*/, transactionalEntityManager.save(item_stock_track_entity_1.ItemsStockTrack, stockTrackEntry)];
                                case 1:
                                    stockTrackResult = _a.sent();
                                    console.log("pass6");
                                    // add entries into mapping object
                                    stockTrackResult.forEach(function (val) {
                                        itemIdStockMap[val.serviceId] = val.id;
                                    });
                                    //************** stock logic end ***********************************************************************/
                                    //**************** B) inventory lodic start **********************************************************
                                    //2. create inventory
                                    console.log("pass7");
                                    data.purchaseLines.forEach(function (value) {
                                        var il = new inventory_lines_entity_1.InventoryLines();
                                        il.serviceId = value.service.id;
                                        il.quantity = Number(value.quantity);
                                        il.createdDate = value.createdDate;
                                        il.modifiedDate = value.modifiedDate;
                                        il.purchaseId = headerEntry.id;
                                        il.stockId = itemIdStockMap[value.service.id];
                                        inventory_3.push(il);
                                    });
                                    console.log("pass8");
                                    //attch the object to inventory
                                    headerEntry.inventoryLines = inventory_3;
                                    // *************** inventory lodic end  *********************************************************
                                    // *************** C) item available start ********************************************************
                                    //1. create stock elements
                                    console.log("pass9");
                                    return [4 /*yield*/, item_stocks_service_1.default.create(inventory_3, itemIds_2)];
                                case 2:
                                    resultItemAvailable = _a.sent();
                                    console.log("pass10");
                                    itemAvailableEntry = transactionalEntityManager.create(item_stocks_entity_1.ItemAvailable, resultItemAvailable);
                                    //2. update items availability
                                    return [4 /*yield*/, transactionalEntityManager.save(item_stocks_entity_1.ItemAvailable, itemAvailableEntry)];
                                case 3:
                                    //2. update items availability
                                    _a.sent();
                                    return [4 /*yield*/, transactionalEntityManager.save(purchase_headers_entity_1.PurchaseHeaders, headerEntry)];
                                case 4:
                                    headerEntryResult = _a.sent();
                                    //********** header entry save end *********************************************************************/
                                    data = headerEntryResult;
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 4:
                _a.sent();
                return [2 /*return*/, data];
            case 5:
                error_6 = _a.sent();
                console.log(error_6);
                throw error_6;
            case 6: return [2 /*return*/];
        }
    });
}); };
//create service which will get purchaseHeader information based on id also its lines
var purchaseInvoiceData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dataSource, companyRepo, company, invoiceItems, companyDetails, invoiceDetails, supplierDetails, finalData, error_7;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                return [4 /*yield*/, findById(id, {
                        relations: {
                            purchaseLines: {
                                service: true,
                                taxGroup: true,
                            },
                            supplier: {
                                state: true,
                                country: true,
                                city: true,
                            },
                        },
                    })];
            case 1:
                data = _e.sent();
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 2:
                dataSource = _e.sent();
                companyRepo = dataSource.getRepository(company_entity_1.Company);
                return [4 /*yield*/, companyRepo.findOne({
                        where: {
                            id: 40,
                        },
                        select: {
                            id: true,
                            name: true,
                            addressLine1: true,
                            email: true,
                            phoneNumber: true,
                            signature: true,
                            logo: true,
                        },
                    })];
            case 3:
                company = _e.sent();
                if (!company) {
                    throw { message: "Company record not found", statusCode: 404 };
                }
                invoiceItems = data.purchaseLines.map(function (line) {
                    var _a, _b;
                    return ({
                        description: (_a = line === null || line === void 0 ? void 0 : line.service) === null || _a === void 0 ? void 0 : _a.name,
                        quantity: line === null || line === void 0 ? void 0 : line.quantity,
                        unitCost: line.unitPrice,
                        taxPercentage: (_b = line === null || line === void 0 ? void 0 : line.taxGroup) === null || _b === void 0 ? void 0 : _b.name,
                        taxAmount: line.taxAmount,
                        lineTotal: Number(line.amount),
                    });
                });
                companyDetails = {
                    companyName: company.name,
                    companyAddress: company.addressLine1,
                    companyEmail: company.email,
                    companyPhone: company.phoneNumber,
                    signatureUrl: company.signature,
                    logoUrl: company.logo,
                };
                invoiceDetails = {
                    invoiceNumber: data.code,
                    invoiceDate: data.txnDate,
                    dueDate: data.txnDate,
                    subtotal: data.subTotal,
                    tax: data.totalTax,
                    discount: data.totalDiscount,
                    totalPayable: data.grandTotal,
                };
                supplierDetails = {
                    supplierName: data.supplier.name,
                    supplierAddress: data.supplier.address,
                    supplierCity: (_b = (_a = data === null || data === void 0 ? void 0 : data.supplier) === null || _a === void 0 ? void 0 : _a.city) === null || _b === void 0 ? void 0 : _b.name,
                    supplierState: (_d = (_c = data === null || data === void 0 ? void 0 : data.supplier) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.name,
                    supplierZip: data === null || data === void 0 ? void 0 : data.supplier.zipCode,
                    supplierEmail: data.supplier.email,
                };
                finalData = {
                    data: __assign(__assign(__assign(__assign({}, companyDetails), invoiceDetails), supplierDetails), { items: invoiceItems }),
                };
                return [2 /*return*/, finalData];
            case 4:
                error_7 = _e.sent();
                throw error_7;
            case 5: return [2 /*return*/];
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
    purchaseInvoiceData: purchaseInvoiceData,
};
//# sourceMappingURL=purchase.service.js.map