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
var services_entity_1 = require("../services/entities/services.entity");
var item_stock_track_entity_1 = require("../purchase-items/entities/item-stock-track.entity");
var customer_entity_1 = require("../customer/entities/customer.entity");
var contact_entity_1 = require("../contacts/entities/contact.entity");
var contact_service_1 = __importDefault(require("../contacts/contact.service"));
var sale_lines_enity_1 = require("./entities/sale-lines.enity");
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
// //3. create single record
// const createBulk = async (data: SaleHeaders, isService: boolean = false) => {
//   try {
//     const repo = await repository();
//     const dataSource = await handler();
//     const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
//     const itemStockTrack = dataSource.getRepository(ItemsStockTrack);
//     data = await generateCode(19, data);
//     let result: SaleHeaders = new SaleHeaders();
//     const invoiceItems: {
//       name: string;
//       quantity: number;
//       unitPrice: number;
//       total: number;
//       tax: number;
//       taxName: string;
//     }[] = [];
//     const inventory: InventoryLines[] = [];
//     const itemIds: number[] = [];
//     const errors: string[] = [];
//     const itemToQauntityMap: {
//       [key: number]: {
//         quantity: number;
//         name: string;
//         idx: number;
//       };
//     } = {};
//     //get customer data custo
//     let customer = await contactService.findById(data.customer.id);
//     data.saleLines.forEach((value) => {
//       invoiceItems.push({
//         name: value.service.name,
//         quantity: value.quantity,
//         unitPrice: value.rate,
//         total: Number(value.amount),
//         tax: value.taxAmount,
//         taxName: value.tax.name,
//       });
//       itemIds.push(value.service.id);
//     });
//     // get items available as per item demand
//     //! check if item  with isInavtive=0 is not present
//     let itemsAvailable = await itemAvailableRepo.find({
//       where: {
//         service: {
//           id: In(itemIds),
//         },
//       },
//       relations: {
//         service: true,
//       },
//       select: {
//         id: true,
//         quantity: true,
//         service: {
//           id: true,
//           name: true,
//         },
//       },
//     });
//     //add data to map
//     itemsAvailable.forEach((val, index) => {
//       itemToQauntityMap[val.service.id] = {
//         name: val.service.name,
//         quantity: val.quantity,
//         idx: index,
//       };
//     });
//     //check availabilty
//     data.saleLines.forEach((value) => {
//       if (itemToQauntityMap[value.service.id]) {
//         if (itemToQauntityMap[value.service.id]?.quantity < value.quantity) {
//           errors.push(
//             `${
//               itemToQauntityMap[value.service.id].name
//             } is out of stock : available stock is ${
//               itemToQauntityMap[value.service.id]?.quantity
//                 ? itemToQauntityMap[value.service.id]?.quantity
//                 : 0
//             }`
//           );
//         }
//       } else {
//         errors.push(
//           `${value.service.name} is out of stock : available stock is ${0}`
//         );
//       }
//     });
//     //throw error if applicable
//     if (errors.length) {
//       throw { message: errors, statusCode: 409 };
//     }
//     //get related stock track records
//     const stockMap: {
//       [key: number]: {
//         id: number;
//         idx: number;
//         aQuanity: number;
//       };
//     } = {};
//     let stockTrack = await itemStockTrack.find({
//       where: {
//         service: {
//           id: In(itemIds),
//         },
//       },
//       order: {
//         id: "ASC",
//       },
//       relations: {
//         service: true,
//       },
//     });
//     stockTrack.forEach((val, index) => {
//       stockMap[val.id] = {
//         id: val.id,
//         idx: index,
//         aQuanity: val?.quantityUvailable,
//       };
//     });
//     data.saleLines.forEach((value) => {
//       //1. filter out stock entries for each item
//       let idx = 0;
//       let itmRemain = value.quantity;
//       let uvailableForItem = stockTrack.filter(
//         (val) => val.service.id === value.service.id
//       );
//       while (itmRemain) {
//         //1. update current entry
//         let _uvailableForItem = uvailableForItem[idx];
//         //create inventory records here
//         const il = new InventoryLines();
//         il.service = value.service;
//         il.createdDate = value.createdDate;
//         il.modifiedDate = value.modifiedDate;
//         il.stock = _uvailableForItem;
//         let sold = _uvailableForItem.quantityUvailable - itmRemain;
//         _uvailableForItem = {
//           ..._uvailableForItem,
//           quantityUvailable: sold > 0 ? sold : 0,
//         };
//         if (stockMap[_uvailableForItem.id]) {
//           stockTrack[stockMap[_uvailableForItem.id].idx] = _uvailableForItem;
//         }
//         if (sold < 0) {
//           il.quantity = -Number(itmRemain + sold);
//           inventory.push(il);
//           itmRemain = Math.abs(sold);
//         } else {
//           il.quantity = -Number(itmRemain);
//           inventory.push(il);
//           itmRemain = 0;
//         }
//         idx++;
//       }
//       //decrease item availabilty
//       if (itemToQauntityMap[value.service.id]) {
//         let _itemsAvailable =
//           itemsAvailable[itemToQauntityMap[value.service.id].idx];
//         _itemsAvailable = {
//           ..._itemsAvailable,
//           id: _itemsAvailable.id,
//           quantity: _itemsAvailable.quantity - value.quantity,
//         };
//         itemsAvailable[itemToQauntityMap[value.service.id].idx] =
//           _itemsAvailable;
//       }
//     });
//     data.inventoryLines = inventory;
//     //3. start transaction
//     await dataSource.manager.transaction(
//       "SERIALIZABLE",
//       async (transactionalEntityManager) => {
//         //2. update items availability
//         //2. update items availability
//         await transactionalEntityManager.save(ItemsStockTrack, stockTrack);
//         await transactionalEntityManager.save(ItemAvailable, itemsAvailable);
//         const headerEntry = transactionalEntityManager.create(
//           SaleHeaders,
//           data
//         );
//         const headerEntryResult = await transactionalEntityManager.save(
//           SaleHeaders,
//           headerEntry
//         );
//         result = headerEntryResult;
//       }
//     );
//     if (customer.email) {
//       await invoiceMailer({
//         customer: customer.name,
//         txnDate: new Date(data.txnDate).toLocaleDateString(),
//         txnId: data.code,
//         mobile: customer.mobile,
//         subTotal: data.subTotal,
//         grandTotal: data.grandTotal,
//         tax: data.totalTax,
//         discount: data.totalDiscount,
//         email: customer.email,
//         itemData: invoiceItems,
//       });
//     }
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };
// (""); // Function to create a single sale record with inventory tracking and stock management
var createBulk = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isService) {
        var repo, dataSource, itemAvailableRepo, itemStockTrack, result_1, invoiceItems_2, inventory_2, itemIds_1, errors_1, itemToQuantityMap_1, customer, itemsAvailable_1, itemRepo, relatedItems, latestItemMap_1, stockMap_1, stockTrack_1, error_6;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
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
                    // Generate unique sale code
                    data = _a.sent();
                    result_1 = new sale_header_entity_1.SaleHeaders();
                    invoiceItems_2 = [];
                    inventory_2 = [];
                    itemIds_1 = [];
                    errors_1 = [];
                    itemToQuantityMap_1 = {};
                    return [4 /*yield*/, contact_service_1.default.findById(data.customer.id)];
                case 4:
                    customer = _a.sent();
                    // Prepare invoice items and collect item IDs
                    data.saleLines.forEach(function (_a) {
                        var service = _a.service, quantity = _a.quantity, rate = _a.rate, amount = _a.amount, taxAmount = _a.taxAmount, tax = _a.tax;
                        invoiceItems_2.push({
                            name: service.name,
                            quantity: quantity,
                            unitPrice: rate,
                            total: Number(amount),
                            tax: taxAmount,
                            taxName: tax.name,
                        });
                        itemIds_1.push(service.id);
                    });
                    return [4 /*yield*/, itemAvailableRepo.find({
                            //take only active records for items
                            where: { service: { id: (0, typeorm_1.In)(itemIds_1), isInactive: 0 }, isInactive: 0 },
                            relations: { service: true },
                            select: { id: true, quantity: true, service: { id: true, name: true } },
                        })];
                case 5:
                    itemsAvailable_1 = _a.sent();
                    // Map item stock availability
                    itemsAvailable_1.forEach(function (_a, index) {
                        var service = _a.service, quantity = _a.quantity;
                        itemToQuantityMap_1[service.id] = {
                            name: service.name,
                            quantity: quantity,
                            idx: index,
                        };
                    });
                    // Validate item availability
                    data.saleLines.forEach(function (_a) {
                        var service = _a.service, quantity = _a.quantity;
                        if (itemToQuantityMap_1[service.id]) {
                            if (itemToQuantityMap_1[service.id].quantity < quantity) {
                                errors_1.push("".concat(itemToQuantityMap_1[service.id].name, " is out of stock: available stock is ").concat(itemToQuantityMap_1[service.id].quantity || 0));
                            }
                        }
                        else {
                            errors_1.push("".concat(service.name, " is out of stock: available stock is 0"));
                        }
                    });
                    if (errors_1.length)
                        throw { message: errors_1, statusCode: 409 };
                    itemRepo = dataSource.getRepository(services_entity_1.Services);
                    return [4 /*yield*/, itemRepo.find({
                            where: { id: (0, typeorm_1.In)(itemIds_1), isInactive: 0 },
                            select: { sku: true, id: true, recordId: true },
                        })];
                case 6:
                    relatedItems = _a.sent();
                    latestItemMap_1 = {};
                    relatedItems.forEach(function (item) {
                        latestItemMap_1[item.recordId] = item.id;
                    });
                    stockMap_1 = {};
                    return [4 /*yield*/, itemStockTrack.find({
                            where: { service: { id: (0, typeorm_1.In)(itemIds_1), isInactive: 0 } },
                            order: { id: "ASC" },
                            relations: { service: true },
                        })];
                case 7:
                    stockTrack_1 = _a.sent();
                    //create map for stock track records
                    stockTrack_1.forEach(function (_a, index) {
                        var id = _a.id, quantityUvailable = _a.quantityUvailable;
                        stockMap_1[id] = { id: id, idx: index, availableQuantity: quantityUvailable };
                    });
                    // Manage inventory and stock tracking
                    data.saleLines.forEach(function (_a) {
                        var service = _a.service, quantity = _a.quantity, createdDate = _a.createdDate, modifiedDate = _a.modifiedDate;
                        var remainingQty = quantity;
                        //get the records only for specific item from stock track
                        var stockEntries = stockTrack_1.filter(function (_a) {
                            var stockService = _a.service;
                            return stockService.id === service.id;
                        });
                        var idx = 0;
                        while (remainingQty > 0) {
                            var stockEntry = stockEntries[idx];
                            var inventoryLine = new inventory_lines_entity_1.InventoryLines();
                            inventoryLine.service = service;
                            inventoryLine.serviceId = latestItemMap_1[service.recordId];
                            inventoryLine.serviceRecordId = service.id;
                            inventoryLine.createdDate = createdDate;
                            inventoryLine.modifiedDate = modifiedDate;
                            //!make changed here in future if required
                            inventoryLine.stock = stockEntry;
                            var updatedStockQty = stockEntry.quantityUvailable - remainingQty;
                            stockEntry.quantityUvailable = Math.max(updatedStockQty, 0);
                            // stockEntry.serviceId = latestItemMap[service.recordId];
                            // stockEntry.serviceRecordId = service.id;
                            //update the stokc track record at correct position
                            if (stockMap_1[stockEntry.id]) {
                                stockTrack_1[stockMap_1[stockEntry.id].idx] = stockEntry;
                            }
                            inventoryLine.quantity =
                                updatedStockQty < 0
                                    ? -(remainingQty + updatedStockQty) // If stock is insufficient, store the fulfilled part.
                                    : -remainingQty; // Otherwise, store the entire deducted quantity.
                            inventory_2.push(inventoryLine);
                            //set the remainig quanoty which will be used in next iteration, stock will be deducted in next iteration
                            remainingQty = updatedStockQty < 0 ? Math.abs(updatedStockQty) : 0;
                            idx++;
                        }
                        // Update available stock
                        if (itemToQuantityMap_1[service.id]) {
                            var itemIndex = itemToQuantityMap_1[service.id].idx;
                            itemsAvailable_1[itemIndex].quantity -= quantity;
                        }
                    });
                    //data for sale lines already included
                    //add data for inventory lines
                    data.inventoryLines = inventory_2;
                    // Start transaction
                    return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (transactionalEntityManager) { return __awaiter(void 0, void 0, void 0, function () {
                            var headerEntry;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, transactionalEntityManager.save(item_stock_track_entity_1.ItemsStockTrack, stockTrack_1)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, transactionalEntityManager.save(item_stocks_entity_1.ItemAvailable, itemsAvailable_1)];
                                    case 2:
                                        _a.sent();
                                        headerEntry = transactionalEntityManager.create(sale_header_entity_1.SaleHeaders, data);
                                        return [4 /*yield*/, transactionalEntityManager.save(sale_header_entity_1.SaleHeaders, headerEntry)];
                                    case 3:
                                        result_1 = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 8:
                    // Start transaction
                    _a.sent();
                    if (!customer.email) return [3 /*break*/, 10];
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
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, result_1];
                case 11:
                    error_6 = _a.sent();
                    throw error_6;
                case 12: return [2 /*return*/];
            }
        });
    });
};
var editBulk = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isService) {
        var dataSource, headerRepo, saleLinesRepo, itemAvailableRepo, itemsStockTrackRepo, inventoryLinesRepo, headerResponse_1, saleLines_1, inventoryLines_1, inventoryMap_1, stockMap_2, itemAvailable, itemAvailableMap_1, itemAvailableUpdate_1, itemStockTrack_1, error_7;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    dataSource = _a.sent();
                    headerRepo = dataSource.getRepository(sale_header_entity_1.SaleHeaders);
                    saleLinesRepo = dataSource.getRepository(sale_lines_enity_1.SaleLines);
                    itemAvailableRepo = dataSource.getRepository(item_stocks_entity_1.ItemAvailable);
                    itemsStockTrackRepo = dataSource.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                    inventoryLinesRepo = dataSource.getRepository(inventory_lines_entity_1.InventoryLines);
                    return [4 /*yield*/, headerRepo.findOne({
                            where: { recordId: data.recordId, isInactive: 0 },
                        })];
                case 2:
                    headerResponse_1 = _a.sent();
                    return [4 /*yield*/, saleLinesRepo.find({
                            where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
                        })];
                case 3:
                    saleLines_1 = _a.sent();
                    return [4 /*yield*/, inventoryLinesRepo.find({
                            where: { saleRecordId: data.recordId, isInactive: 0 },
                            relations: { stock: true },
                        })];
                case 4:
                    inventoryLines_1 = _a.sent();
                    inventoryMap_1 = {};
                    stockMap_2 = {};
                    inventoryLines_1.forEach(function (line) {
                        // Accumulate deducted quantity per service
                        inventoryMap_1[line.serviceId] = (inventoryMap_1[line.serviceId] || 0) + line.quantity;
                        // Accumulate deducted quantity per stock entry
                        stockMap_2[line.stock.id] = (stockMap_2[line.stock.id] || 0) + line.quantity;
                    });
                    return [4 /*yield*/, itemAvailableRepo.find({
                            where: { serviceId: (0, typeorm_1.In)(Object.keys(inventoryMap_1)), isInactive: 0 },
                        })];
                case 5:
                    itemAvailable = _a.sent();
                    itemAvailableMap_1 = {};
                    itemAvailable.forEach(function (item) {
                        itemAvailableMap_1[item.serviceId] = item.quantity;
                    });
                    // For each service, add back the deducted inventory quantity to available stock
                    Object.keys(inventoryMap_1).forEach(function (key) {
                        // Convert key to number if needed
                        var serviceId = Number(key);
                        itemAvailableMap_1[serviceId] = (itemAvailableMap_1[serviceId] || 0) + inventoryMap_1[serviceId];
                    });
                    itemAvailableUpdate_1 = itemAvailable.map(function (item) {
                        item.quantity = itemAvailableMap_1[item.serviceId];
                        return item;
                    });
                    return [4 /*yield*/, itemsStockTrackRepo.find({
                            where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
                        })];
                case 6:
                    itemStockTrack_1 = _a.sent();
                    // For each stock track record, add back the deducted quantity from stockMap
                    itemStockTrack_1 = itemStockTrack_1.map(function (stock) {
                        stock.quantityUvailable = stock.quantityUvailable + (stockMap_2[stock.id] || 0);
                        return stock;
                    });
                    // 7. Begin transaction to perform rollback and create new sale transaction
                    return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                            var newSale;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // Update item available records (restoring stock)
                                    return [4 /*yield*/, manager.save(item_stocks_entity_1.ItemAvailable, itemAvailableUpdate_1)];
                                    case 1:
                                        // Update item available records (restoring stock)
                                        _a.sent();
                                        // Mark all sale lines as inactive
                                        return [4 /*yield*/, manager.save(sale_lines_enity_1.SaleLines, saleLines_1.map(function (line) {
                                                line.isInactive = 1;
                                                return line;
                                            }))];
                                    case 2:
                                        // Mark all sale lines as inactive
                                        _a.sent();
                                        // Save updated stock track records (restoring available quantities)
                                        return [4 /*yield*/, manager.save(item_stock_track_entity_1.ItemsStockTrack, itemStockTrack_1)];
                                    case 3:
                                        // Save updated stock track records (restoring available quantities)
                                        _a.sent();
                                        // Mark all inventory lines as inactive
                                        return [4 /*yield*/, manager.save(inventory_lines_entity_1.InventoryLines, inventoryLines_1.map(function (line) {
                                                line.isInactive = 1;
                                                return line;
                                            }))];
                                    case 4:
                                        // Mark all inventory lines as inactive
                                        _a.sent();
                                        return [4 /*yield*/, manager.save(sale_header_entity_1.SaleHeaders, __assign(__assign({}, headerResponse_1), { isInactive: 1 }))];
                                    case 5:
                                        // Mark the current sale header as inactive
                                        headerResponse_1 = _a.sent();
                                        return [4 /*yield*/, createBulk(__assign(__assign({}, data), { recordId: headerResponse_1.recordId, code: headerResponse_1.code }), true)];
                                    case 6:
                                        newSale = _a.sent();
                                        // Update data with the newly created sale transaction
                                        data = newSale;
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 7:
                    // 7. Begin transaction to perform rollback and create new sale transaction
                    _a.sent();
                    return [2 /*return*/, data];
                case 8:
                    error_7 = _a.sent();
                    throw error_7;
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.default = { find: find, findById: findById, create: create, deleteById: deleteById, updateById: updateById, createBulk: createBulk, editBulk: editBulk };
//# sourceMappingURL=sale-header.service.js.map