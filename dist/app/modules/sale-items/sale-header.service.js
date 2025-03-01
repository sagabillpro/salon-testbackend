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
var sale_header_entity_1 = require("./entities/sale-header.entity");
var sale_header_repo_1 = __importDefault(require("./sale-header.repo"));
var inventory_lines_entity_1 = require("./entities/inventory-lines.entity");
var send_invoice_mail_service_1 = __importDefault(require("../../services/send-invoice-mail.service"));
var item_stocks_entity_1 = require("./entities/item-stocks.entity");
var item_stock_track_entity_1 = require("../purchase-items/entities/item-stock-track.entity");
var customer_entity_1 = require("../customer/entities/customer.entity");
var contact_entity_1 = require("../contacts/entities/contact.entity");
var contact_service_1 = __importDefault(require("../contacts/contact.service"));
//1. find multiple records
var find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sale_header_repo_1.default)()];
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
                return [4 /*yield*/, (0, sale_header_repo_1.default)()];
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
        var dataSource, repo, customerRepo, invoiceItems_1, respo, custmerRepo, customer, error_3;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    dataSource = _a.sent();
                    return [4 /*yield*/, (0, sale_header_repo_1.default)()];
                case 2:
                    repo = _a.sent();
                    customerRepo = dataSource.getRepository(customer_entity_1.Customer);
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(19, data)];
                case 3:
                    data = _a.sent();
                    invoiceItems_1 = [];
                    if (data.saleLines.length) {
                        data.saleLines.forEach(function (value) {
                            invoiceItems_1.push({
                                name: value.service.name,
                                quantity: value.quantity,
                                unitPrice: value.rate,
                                total: Number(value.amount),
                                tax: value.taxAmount,
                                taxName: value.tax.name,
                            });
                        });
                    }
                    return [4 /*yield*/, repo.create(__assign({}, data))];
                case 4:
                    respo = _a.sent();
                    custmerRepo = dataSource.getRepository(contact_entity_1.Contact);
                    return [4 /*yield*/, contact_service_1.default.findById(data.customer.id)];
                case 5:
                    customer = _a.sent();
                    return [4 /*yield*/, custmerRepo.save(__assign(__assign({}, customer), { lastVisitedDate: new Date().toISOString() }))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, send_invoice_mail_service_1.default)({
                            customer: customer.name,
                            txnDate: new Date(data.txnDate).toLocaleDateString(),
                            txnId: data.code,
                            mobile: customer.mobile,
                            subTotal: data.subTotal,
                            grandTotal: data.grandTotal,
                            tax: data.totalTax,
                            discount: data.totalDiscount,
                            email: customer.email,
                            itemData: invoiceItems_1,
                        })];
                case 7:
                    _a.sent();
                    return [2 /*return*/, respo];
                case 8:
                    error_3 = _a.sent();
                    throw error_3;
                case 9: return [2 /*return*/];
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
        var repo, inventory_1, respo, error_4;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, sale_header_repo_1.default)()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(19, data)];
                case 2:
                    data = _a.sent();
                    inventory_1 = [];
                    if (!isService) {
                        data.saleLines.forEach(function (value) {
                            var il = new inventory_lines_entity_1.InventoryLines();
                            (il.service = value.service),
                                (il.quantity = value.quantity),
                                (il.createdDate = value.createdDate),
                                (il.modifiedDate = value.modifiedDate);
                            inventory_1.push(il);
                        });
                        data.inventoryLines = inventory_1;
                    }
                    return [4 /*yield*/, repo.updateById(id, __assign({}, data))];
                case 3:
                    respo = _a.sent();
                    return [2 /*return*/, respo];
                case 4:
                    error_4 = _a.sent();
                    throw error_4;
                case 5: return [2 /*return*/];
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
                return [4 /*yield*/, (0, sale_header_repo_1.default)()];
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
var createBulk = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isService) {
        var repo, dataSource, itemAvailableRepo, itemStockTrack, result_1, invoiceItems_2, inventory_2, itemIds_1, errors_1, itemToQauntityMap_1, customer, itemsAvailable_1, stockMap_1, stockTrack_1, error_6;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, (0, sale_header_repo_1.default)()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 2:
                    dataSource = _a.sent();
                    itemAvailableRepo = dataSource.getRepository(item_stocks_entity_1.ItemAvailable);
                    itemStockTrack = dataSource.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(19, data)];
                case 3:
                    data = _a.sent();
                    result_1 = new sale_header_entity_1.SaleHeaders();
                    invoiceItems_2 = [];
                    inventory_2 = [];
                    itemIds_1 = [];
                    errors_1 = [];
                    itemToQauntityMap_1 = {};
                    return [4 /*yield*/, contact_service_1.default.findById(data.customer.id)];
                case 4:
                    customer = _a.sent();
                    data.saleLines.forEach(function (value) {
                        invoiceItems_2.push({
                            name: value.service.name,
                            quantity: value.quantity,
                            unitPrice: value.rate,
                            total: Number(value.amount),
                            tax: value.taxAmount,
                            taxName: value.tax.name,
                        });
                        itemIds_1.push(value.service.id);
                    });
                    return [4 /*yield*/, itemAvailableRepo.find({
                            where: {
                                service: {
                                    id: (0, typeorm_1.In)(itemIds_1),
                                },
                            },
                            relations: {
                                service: true,
                            },
                            select: {
                                id: true,
                                quantity: true,
                                service: {
                                    id: true,
                                    name: true,
                                },
                            },
                        })];
                case 5:
                    itemsAvailable_1 = _a.sent();
                    //add data to map
                    itemsAvailable_1.forEach(function (val, index) {
                        itemToQauntityMap_1[val.service.id] = {
                            name: val.service.name,
                            quantity: val.quantity,
                            idx: index,
                        };
                    });
                    //check availabilty
                    data.saleLines.forEach(function (value) {
                        var _a, _b, _c;
                        if (itemToQauntityMap_1[value.service.id]) {
                            if (((_a = itemToQauntityMap_1[value.service.id]) === null || _a === void 0 ? void 0 : _a.quantity) < value.quantity) {
                                errors_1.push("".concat(itemToQauntityMap_1[value.service.id].name, " is out of stock : available stock is ").concat(((_b = itemToQauntityMap_1[value.service.id]) === null || _b === void 0 ? void 0 : _b.quantity)
                                    ? (_c = itemToQauntityMap_1[value.service.id]) === null || _c === void 0 ? void 0 : _c.quantity
                                    : 0));
                            }
                        }
                        else {
                            errors_1.push("".concat(value.service.name, " is out of stock : available stock is ").concat(0));
                        }
                    });
                    //throw error if applicable
                    if (errors_1.length) {
                        throw { message: errors_1, statusCode: 409 };
                    }
                    stockMap_1 = {};
                    return [4 /*yield*/, itemStockTrack.find({
                            where: {
                                service: {
                                    id: (0, typeorm_1.In)(itemIds_1),
                                },
                            },
                            order: {
                                id: "ASC",
                            },
                            relations: {
                                service: true,
                            },
                        })];
                case 6:
                    stockTrack_1 = _a.sent();
                    stockTrack_1.forEach(function (val, index) {
                        stockMap_1[val.id] = {
                            id: val.id,
                            idx: index,
                            aQuanity: val === null || val === void 0 ? void 0 : val.quantityUvailable,
                        };
                    });
                    data.saleLines.forEach(function (value) {
                        //1. filter out stock entries for each item
                        var idx = 0;
                        var itmRemain = value.quantity;
                        var uvailableForItem = stockTrack_1.filter(function (val) { return val.service.id === value.service.id; });
                        while (itmRemain) {
                            //1. update current entry
                            var _uvailableForItem = uvailableForItem[idx];
                            //create inventory records here
                            var il = new inventory_lines_entity_1.InventoryLines();
                            il.service = value.service;
                            il.createdDate = value.createdDate;
                            il.modifiedDate = value.modifiedDate;
                            il.stock = _uvailableForItem;
                            var sold = _uvailableForItem.quantityUvailable - itmRemain;
                            _uvailableForItem = __assign(__assign({}, _uvailableForItem), { quantityUvailable: sold > 0 ? sold : 0 });
                            if (stockMap_1[_uvailableForItem.id]) {
                                stockTrack_1[stockMap_1[_uvailableForItem.id].idx] = _uvailableForItem;
                            }
                            if (sold < 0) {
                                il.quantity = -Number(itmRemain + sold);
                                inventory_2.push(il);
                                itmRemain = Math.abs(sold);
                            }
                            else {
                                il.quantity = -Number(itmRemain);
                                inventory_2.push(il);
                                itmRemain = 0;
                            }
                            idx++;
                        }
                        //decrease item availabilty
                        if (itemToQauntityMap_1[value.service.id]) {
                            var _itemsAvailable = itemsAvailable_1[itemToQauntityMap_1[value.service.id].idx];
                            _itemsAvailable = __assign(__assign({}, _itemsAvailable), { id: _itemsAvailable.id, quantity: _itemsAvailable.quantity - value.quantity });
                            itemsAvailable_1[itemToQauntityMap_1[value.service.id].idx] =
                                _itemsAvailable;
                        }
                    });
                    data.inventoryLines = inventory_2;
                    //3. start transaction
                    return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (transactionalEntityManager) { return __awaiter(void 0, void 0, void 0, function () {
                            var headerEntry, headerEntryResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    //2. update items availability
                                    //2. update items availability
                                    return [4 /*yield*/, transactionalEntityManager.save(item_stock_track_entity_1.ItemsStockTrack, stockTrack_1)];
                                    case 1:
                                        //2. update items availability
                                        //2. update items availability
                                        _a.sent();
                                        return [4 /*yield*/, transactionalEntityManager.save(item_stocks_entity_1.ItemAvailable, itemsAvailable_1)];
                                    case 2:
                                        _a.sent();
                                        headerEntry = transactionalEntityManager.create(sale_header_entity_1.SaleHeaders, data);
                                        return [4 /*yield*/, transactionalEntityManager.save(sale_header_entity_1.SaleHeaders, headerEntry)];
                                    case 3:
                                        headerEntryResult = _a.sent();
                                        result_1 = headerEntryResult;
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 7:
                    //3. start transaction
                    _a.sent();
                    if (!customer.email) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, send_invoice_mail_service_1.default)({
                            customer: customer.name,
                            txnDate: new Date(data.txnDate).toLocaleDateString(),
                            txnId: data.code,
                            mobile: customer.mobile,
                            subTotal: data.subTotal,
                            grandTotal: data.grandTotal,
                            tax: data.totalTax,
                            discount: data.totalDiscount,
                            email: customer.email,
                            itemData: invoiceItems_2,
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, result_1];
                case 10:
                    error_6 = _a.sent();
                    throw error_6;
                case 11: return [2 /*return*/];
            }
        });
    });
};
exports.default = { find: find, findById: findById, create: create, deleteById: deleteById, updateById: updateById, createBulk: createBulk };
//# sourceMappingURL=sale-header.service.js.map