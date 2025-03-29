"use strict";
// import { FindManyOptions, FindOneOptions, In } from "typeorm";
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
// import { generateCode } from "../../utils/get-object-code.util";
// import { handler } from "../../config/dbconfig";
// import { City, Country, States } from "../general-data/entities";
// import { SaleHeaders } from "./entities/sale-header.entity";
// import repository from "./sale-header.repo";
// import { InventoryLines } from "./entities/inventory-lines.entity";
// import invoiceMailer from "../../services/send-invoice-mail.service";
// import customerService from "../customer/customer.service";
// import { ItemAvailable } from "./entities/item-stocks.entity";
// import itemStocksService from "./item-stocks.service";
// import { Services } from "../services/entities/services.entity";
// import { ItemsStockTrack } from "../purchase-items/entities/item-stock-track.entity";
// import { Customer } from "../customer/entities/customer.entity";
// import { Contact } from "../contacts/entities/contact.entity";
// import contactService from "../contacts/contact.service";
// import { SaleLines } from "./entities/sale-lines.enity";
// //1. find multiple records
// const find = async (filter?: FindManyOptions<SaleHeaders>) => {
//   try {
//     const repo = await repository();
//     return repo.find(filter);
//   } catch (error) {
//     throw error;
//   }
// };
// //2. find single records
// const findById = async (
//   id: number,
//   filter?: FindOneOptions<SaleHeaders> | FindManyOptions<SaleHeaders>
// ) => {
//   try {
//     const repo = await repository();
//     const respo = await repo.findOneById(id, filter);
//     return respo;
//   } catch (error) {
//     throw error;
//   }
// };
// //3. create single record
// const create = async (data: SaleHeaders, isService: boolean = false) => {
//   try {
//     const dataSource = await handler();
//     const repo = await repository();
//     const customerRepo = dataSource.getRepository(Customer);
//     data = await generateCode(19, data);
//     const invoiceItems: {
//       name: string;
//       quantity: number;
//       unitPrice: number;
//       total: number;
//       tax: number;
//       taxName: string;
//     }[] = [];
//     if (data.saleLines.length) {
//       data.saleLines.forEach((value) => {
//         invoiceItems.push({
//           name: value.service.name,
//           quantity: value.quantity,
//           unitPrice: value.rate,
//           total: Number(value.amount),
//           tax: value.taxAmount,
//           taxName: value.tax.name,
//         });
//       });
//     }
//     const respo = await repo.create({
//       ...data,
//     });
//     const custmerRepo = dataSource.getRepository(Contact);
//     //get customer data custo
//     let customer = await contactService.findById(data.customer.id);
//     await custmerRepo.save({
//       ...customer,
//       lastVisitedDate: new Date().toISOString(),
//     });
//     await invoiceMailer({
//       customer: customer.name,
//       txnDate: new Date(data.txnDate).toLocaleDateString(),
//       txnId: data.code,
//       mobile: customer.mobile,
//       subTotal: data.subTotal,
//       grandTotal: data.grandTotal,
//       tax: data.totalTax,
//       discount: data.totalDiscount,
//       email: customer.email,
//       itemData: invoiceItems,
//     });
//     return respo;
//   } catch (error) {
//     throw error;
//   }
// };
// //4. update single record by id
// const updateById = async (
//   id: number,
//   data: SaleHeaders,
//   isService: boolean = false
// ) => {
//   try {
//     const repo = await repository();
//     data = await generateCode(19, data);
//     const inventory: InventoryLines[] = [];
//     if (!isService) {
//       data.saleLines.forEach((value) => {
//         const il = new InventoryLines();
//         (il.service = value.service),
//           (il.quantity = value.quantity),
//           (il.createdDate = value.createdDate),
//           (il.modifiedDate = value.modifiedDate);
//         inventory.push(il);
//       });
//       data.inventoryLines = inventory;
//     }
//     const respo = await repo.updateById(id, {
//       ...data,
//     });
//     return respo;
//   } catch (error) {
//     throw error;
//   }
// };
// //5. delete single record by id
// const deleteById = async (id: number) => {
//   try {
//     const repo = await repository();
//     await repo.deleteById(id);
//   } catch (error) {
//     throw error;
//   }
// };
// // //3. create single record
// // const createBulk = async (data: SaleHeaders, isService: boolean = false) => {
// //   try {
// //     const repo = await repository();
// //     const dataSource = await handler();
// //     const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
// //     const itemStockTrack = dataSource.getRepository(ItemsStockTrack);
// //     data = await generateCode(19, data);
// //     let result: SaleHeaders = new SaleHeaders();
// //     const invoiceItems: {
// //       name: string;
// //       quantity: number;
// //       unitPrice: number;
// //       total: number;
// //       tax: number;
// //       taxName: string;
// //     }[] = [];
// //     const inventory: InventoryLines[] = [];
// //     const itemIds: number[] = [];
// //     const errors: string[] = [];
// //     const itemToQauntityMap: {
// //       [key: number]: {
// //         quantity: number;
// //         name: string;
// //         idx: number;
// //       };
// //     } = {};
// //     //get customer data custo
// //     let customer = await contactService.findById(data.customer.id);
// //     data.saleLines.forEach((value) => {
// //       invoiceItems.push({
// //         name: value.service.name,
// //         quantity: value.quantity,
// //         unitPrice: value.rate,
// //         total: Number(value.amount),
// //         tax: value.taxAmount,
// //         taxName: value.tax.name,
// //       });
// //       itemIds.push(value.service.id);
// //     });
// //     // get items available as per item demand
// //     //! check if item  with isInavtive=0 is not present
// //     let itemsAvailable = await itemAvailableRepo.find({
// //       where: {
// //         service: {
// //           id: In(itemIds),
// //         },
// //       },
// //       relations: {
// //         service: true,
// //       },
// //       select: {
// //         id: true,
// //         quantity: true,
// //         service: {
// //           id: true,
// //           name: true,
// //         },
// //       },
// //     });
// //     //add data to map
// //     itemsAvailable.forEach((val, index) => {
// //       itemToQauntityMap[val.service.id] = {
// //         name: val.service.name,
// //         quantity: val.quantity,
// //         idx: index,
// //       };
// //     });
// //     //check availabilty
// //     data.saleLines.forEach((value) => {
// //       if (itemToQauntityMap[value.service.id]) {
// //         if (itemToQauntityMap[value.service.id]?.quantity < value.quantity) {
// //           errors.push(
// //             `${
// //               itemToQauntityMap[value.service.id].name
// //             } is out of stock : available stock is ${
// //               itemToQauntityMap[value.service.id]?.quantity
// //                 ? itemToQauntityMap[value.service.id]?.quantity
// //                 : 0
// //             }`
// //           );
// //         }
// //       } else {
// //         errors.push(
// //           `${value.service.name} is out of stock : available stock is ${0}`
// //         );
// //       }
// //     });
// //     //throw error if applicable
// //     if (errors.length) {
// //       throw { message: errors, statusCode: 409 };
// //     }
// //     //get related stock track records
// //     const stockMap: {
// //       [key: number]: {
// //         id: number;
// //         idx: number;
// //         aQuanity: number;
// //       };
// //     } = {};
// //     let stockTrack = await itemStockTrack.find({
// //       where: {
// //         service: {
// //           id: In(itemIds),
// //         },
// //       },
// //       order: {
// //         id: "ASC",
// //       },
// //       relations: {
// //         service: true,
// //       },
// //     });
// //     stockTrack.forEach((val, index) => {
// //       stockMap[val.id] = {
// //         id: val.id,
// //         idx: index,
// //         aQuanity: val?.quantityUvailable,
// //       };
// //     });
// //     data.saleLines.forEach((value) => {
// //       //1. filter out stock entries for each item
// //       let idx = 0;
// //       let itmRemain = value.quantity;
// //       let uvailableForItem = stockTrack.filter(
// //         (val) => val.service.id === value.service.id
// //       );
// //       while (itmRemain) {
// //         //1. update current entry
// //         let _uvailableForItem = uvailableForItem[idx];
// //         //create inventory records here
// //         const il = new InventoryLines();
// //         il.service = value.service;
// //         il.createdDate = value.createdDate;
// //         il.modifiedDate = value.modifiedDate;
// //         il.stock = _uvailableForItem;
// //         let sold = _uvailableForItem.quantityUvailable - itmRemain;
// //         _uvailableForItem = {
// //           ..._uvailableForItem,
// //           quantityUvailable: sold > 0 ? sold : 0,
// //         };
// //         if (stockMap[_uvailableForItem.id]) {
// //           stockTrack[stockMap[_uvailableForItem.id].idx] = _uvailableForItem;
// //         }
// //         if (sold < 0) {
// //           il.quantity = -Number(itmRemain + sold);
// //           inventory.push(il);
// //           itmRemain = Math.abs(sold);
// //         } else {
// //           il.quantity = -Number(itmRemain);
// //           inventory.push(il);
// //           itmRemain = 0;
// //         }
// //         idx++;
// //       }
// //       //decrease item availabilty
// //       if (itemToQauntityMap[value.service.id]) {
// //         let _itemsAvailable =
// //           itemsAvailable[itemToQauntityMap[value.service.id].idx];
// //         _itemsAvailable = {
// //           ..._itemsAvailable,
// //           id: _itemsAvailable.id,
// //           quantity: _itemsAvailable.quantity - value.quantity,
// //         };
// //         itemsAvailable[itemToQauntityMap[value.service.id].idx] =
// //           _itemsAvailable;
// //       }
// //     });
// //     data.inventoryLines = inventory;
// //     //3. start transaction
// //     await dataSource.manager.transaction(
// //       "SERIALIZABLE",
// //       async (transactionalEntityManager) => {
// //         //2. update items availability
// //         //2. update items availability
// //         await transactionalEntityManager.save(ItemsStockTrack, stockTrack);
// //         await transactionalEntityManager.save(ItemAvailable, itemsAvailable);
// //         const headerEntry = transactionalEntityManager.create(
// //           SaleHeaders,
// //           data
// //         );
// //         const headerEntryResult = await transactionalEntityManager.save(
// //           SaleHeaders,
// //           headerEntry
// //         );
// //         result = headerEntryResult;
// //       }
// //     );
// //     if (customer.email) {
// //       await invoiceMailer({
// //         customer: customer.name,
// //         txnDate: new Date(data.txnDate).toLocaleDateString(),
// //         txnId: data.code,
// //         mobile: customer.mobile,
// //         subTotal: data.subTotal,
// //         grandTotal: data.grandTotal,
// //         tax: data.totalTax,
// //         discount: data.totalDiscount,
// //         email: customer.email,
// //         itemData: invoiceItems,
// //       });
// //     }
// //     return result;
// //   } catch (error) {
// //     throw error;
// //   }
// // };
// // (""); // Function to create a single sale record with inventory tracking and stock management
// const createBulk = async (data: SaleHeaders, isService: boolean = false) => {
//   try {
//     const repo = await repository();
//     const dataSource = await handler();
//     const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
//     const itemStockTrack = dataSource.getRepository(ItemsStockTrack);
//     // Generate unique sale code
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
//     const itemToQuantityMap: Record<
//       number,
//       { quantity: number; name: string; idx: number }
//     > = {};
//     // Fetch customer data
//     const customer = await contactService.findById(data.customer.id);
//     // Prepare invoice items and collect item IDs
//     data.saleLines.forEach(
//       ({ service, quantity, rate, amount, taxAmount, tax }) => {
//         invoiceItems.push({
//           name: service.name,
//           quantity,
//           unitPrice: rate,
//           total: Number(amount),
//           tax: taxAmount,
//           taxName: tax.name,
//         });
//         itemIds.push(service.id);
//       }
//     );
//     // Fetch available stock for items
//     //!fetch only active records
//     const itemsAvailable = await itemAvailableRepo.find({
//       //take only active records for items
//       where: { service: { id: In(itemIds), isInactive: 0 }, isInactive: 0 },
//       relations: { service: true },
//       select: { id: true, quantity: true, service: { id: true, name: true } },
//     });
//     // Map item stock availability
//     itemsAvailable.forEach(({ service, quantity }, index) => {
//       itemToQuantityMap[service.id] = {
//         name: service.name,
//         quantity,
//         idx: index,
//       };
//     });
//     // Validate item availability
//     data.saleLines.forEach(({ service, quantity }) => {
//       if (itemToQuantityMap[service.id]) {
//         if (itemToQuantityMap[service.id].quantity < quantity) {
//           errors.push(
//             `${
//               itemToQuantityMap[service.id].name
//             } is out of stock: available stock is ${
//               itemToQuantityMap[service.id].quantity || 0
//             }`
//           );
//         }
//       } else {
//         errors.push(`${service.name} is out of stock: available stock is 0`);
//       }
//     });
//     if (errors.length) throw { message: errors, statusCode: 409 };
//     const itemRepo = dataSource.getRepository(Services);
//     // Fetch related (active) services with required fields
//     const relatedItems = await itemRepo.find({
//       where: { id: In(itemIds), isInactive: 0 },
//       select: { sku: true, id: true, recordId: true },
//     });
//     // Build mappings for latest service and SKU generation
//     const latestItemMap: Record<number, number> = {};
//     relatedItems.forEach((item) => {
//       latestItemMap[item.recordId] = item.id;
//     });
//     // Fetch stock tracking records
//     const stockMap: Record<
//       number,
//       { id: number; idx: number; availableQuantity: number }
//     > = {};
//     // Fetch stock tracking records for items in the sale, ordered by ID in ascending order
//     //!fetch only active records
//     let stockTrack = await itemStockTrack.find({
//       where: { service: { id: In(itemIds), isInactive: 0 } },
//       order: { id: "ASC" },
//       relations: { service: true },
//     });
//     //create map for stock track records
//     stockTrack.forEach(({ id, quantityUvailable }, index) => {
//       stockMap[id] = { id, idx: index, availableQuantity: quantityUvailable };
//     });
//     // Manage inventory and stock tracking
//     data.saleLines.forEach(
//       ({ service, quantity, createdDate, modifiedDate }) => {
//         let remainingQty = quantity;
//         //get the records only for specific item from stock track
//         let stockEntries = stockTrack.filter(
//           ({ service: stockService }) => stockService.id === service.id
//         );
//         let idx = 0;
//         while (remainingQty > 0) {
//           let stockEntry = stockEntries[idx];
//           let inventoryLine = new InventoryLines();
//           inventoryLine.service = service;
//           inventoryLine.serviceId = latestItemMap[service.recordId];
//           inventoryLine.serviceRecordId = service.id;
//           inventoryLine.createdDate = createdDate;
//           inventoryLine.modifiedDate = modifiedDate;
//           //!make changed here in future if required
//           inventoryLine.stock = stockEntry;
//           let updatedStockQty = stockEntry.quantityUvailable - remainingQty;
//           stockEntry.quantityUvailable = Math.max(updatedStockQty, 0);
//           // stockEntry.serviceId = latestItemMap[service.recordId];
//           // stockEntry.serviceRecordId = service.id;
//           //update the stokc track record at correct position
//           if (stockMap[stockEntry.id]) {
//             stockTrack[stockMap[stockEntry.id].idx] = stockEntry;
//           }
//           inventoryLine.quantity =
//             updatedStockQty < 0
//               ? -(remainingQty + updatedStockQty) // If stock is insufficient, store the fulfilled part.
//               : -remainingQty; // Otherwise, store the entire deducted quantity.
//           inventory.push(inventoryLine);
//           //set the remainig quanoty which will be used in next iteration, stock will be deducted in next iteration
//           remainingQty = updatedStockQty < 0 ? Math.abs(updatedStockQty) : 0;
//           idx++;
//         }
//         // Update available stock
//         if (itemToQuantityMap[service.id]) {
//           let itemIndex = itemToQuantityMap[service.id].idx;
//           itemsAvailable[itemIndex].quantity -= quantity;
//         }
//       }
//     );
//     //data for sale lines already included
//     //add data for inventory lines
//     data.inventoryLines = inventory;
//     // Start transaction
//     await dataSource.manager.transaction(
//       "SERIALIZABLE",
//       async (transactionalEntityManager) => {
//         await transactionalEntityManager.save(ItemsStockTrack, stockTrack);
//         await transactionalEntityManager.save(ItemAvailable, itemsAvailable);
//         const headerEntry = transactionalEntityManager.create(
//           SaleHeaders,
//           data
//         );
//         result = await transactionalEntityManager.save(
//           SaleHeaders,
//           headerEntry
//         );
//       }
//     );
//     // Send invoice email if customer has an email
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
// const editBulk = async (data: SaleHeaders, isService: boolean = false) => {
//   try {
//     const dataSource = await handler();
//     // Repositories for different entities
//     const headerRepo = dataSource.getRepository(SaleHeaders);
//     const saleLinesRepo = dataSource.getRepository(SaleLines);
//     const itemAvailableRepo = dataSource.getRepository(ItemAvailable);
//     const itemsStockTrackRepo = dataSource.getRepository(ItemsStockTrack);
//     const inventoryLinesRepo = dataSource.getRepository(InventoryLines);
//     // 1. Fetch the active sale header by recordId
//     let headerResponse = await headerRepo.findOne({
//       where: { recordId: data.recordId, isInactive: 0 },
//     });
//     // 2. Fetch all active sale lines for the sale header
//     const saleLines = await saleLinesRepo.find({
//       where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
//     });
//     // 3. Fetch all active inventory lines for the sale header, including their stock details
//     const inventoryLines = await inventoryLinesRepo.find({
//       where: { saleRecordId: data.recordId, isInactive: 0 },
//       relations: { stock: true },
//     });
//     // 4. Build mapping objects for inventory and stock deductions:
//     const inventoryMap: Record<number, number> = {};
//     const stockMap: Record<number, number> = {};
//     inventoryLines.forEach((line) => {
//       // Accumulate deducted quantity per service
//       inventoryMap[line.serviceId] = (inventoryMap[line.serviceId] || 0) + line.quantity;
//       // Accumulate deducted quantity per stock entry
//       stockMap[line.stock.id] = (stockMap[line.stock.id] || 0) + line.quantity;
//     });
//     // 5. Restore available stock by fetching item available records for the affected services
//     const itemAvailable = await itemAvailableRepo.find({
//       where: { serviceId: In(Object.keys(inventoryMap)), isInactive: 0 },
//     });
//     // Build a mapping of available quantity by serviceId
//     const itemAvailableMap: Record<number, number> = {};
//     itemAvailable.forEach((item) => {
//       itemAvailableMap[item.serviceId] = item.quantity;
//     });
//     // For each service, add back the deducted inventory quantity to available stock
//     Object.keys(inventoryMap).forEach((key) => {
//       // Convert key to number if needed
//       const serviceId = Number(key);
//       itemAvailableMap[serviceId] = (itemAvailableMap[serviceId] || 0) + inventoryMap[serviceId];
//     });
//     // Update each item available record with the new quantity from the mapping
//     const itemAvailableUpdate = itemAvailable.map((item) => {
//       item.quantity = itemAvailableMap[item.serviceId];
//       return item;
//     });
//     // 6. Restore stock track records:
//     // Fetch active stock track records for the sale header
//     let itemStockTrack = await itemsStockTrackRepo.find({
//       where: { txnHeaderRecordId: data.recordId, isInactive: 0 },
//     });
//     // For each stock track record, add back the deducted quantity from stockMap
//     itemStockTrack = itemStockTrack.map((stock) => {
//       stock.quantityUvailable = stock.quantityUvailable + (stockMap[stock.id] || 0);
//       return stock;
//     });
//     // 7. Begin transaction to perform rollback and create new sale transaction
//     await dataSource.manager.transaction("SERIALIZABLE", async (manager) => {
//       // Update item available records (restoring stock)
//       await manager.save(ItemAvailable, itemAvailableUpdate);
//       // Mark all sale lines as inactive
//       await manager.save(
//         SaleLines,
//         saleLines.map((line) => {
//           line.isInactive = 1;
//           return line;
//         })
//       );
//       // Save updated stock track records (restoring available quantities)
//       await manager.save(ItemsStockTrack, itemStockTrack);
//       // Mark all inventory lines as inactive
//       await manager.save(
//         InventoryLines,
//         inventoryLines.map((line) => {
//           line.isInactive = 1;
//           return line;
//         })
//       );
//       // Mark the current sale header as inactive
//       headerResponse = await manager.save(SaleHeaders, {
//         ...headerResponse,
//         isInactive: 1,
//       });
//       // Create a new sale transaction by calling createBulk
//       const newSale = await createBulk(
//         {
//           ...data,
//           recordId: headerResponse.recordId,
//           code: headerResponse.code,
//         },
//         true
//       );
//       // Update data with the newly created sale transaction
//       data = newSale;
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
// export default { find, findById, create, deleteById, updateById, createBulk,editBulk };
var typeorm_1 = require("typeorm");
var get_object_code_util_1 = require("../../utils/get-object-code.util");
var dbconfig_1 = require("../../config/dbconfig");
var sale_header_entity_1 = require("./entities/sale-header.entity");
var sale_header_repo_1 = __importDefault(require("./sale-header.repo"));
var inventory_lines_entity_1 = require("./entities/inventory-lines.entity");
var send_invoice_mail_service_1 = __importDefault(require("../../services/send-invoice-mail.service"));
var item_stocks_entity_1 = require("./entities/item-stocks.entity");
var item_stock_track_entity_1 = require("../purchase-items/entities/item-stock-track.entity");
var contact_entity_1 = require("../contacts/entities/contact.entity");
var contact_service_1 = __importDefault(require("../contacts/contact.service"));
var company_entity_1 = require("../company/entities/company.entity");
var coupons_list_entity_1 = require("../send-coupouns/entities/coupons-list.entity");
var customer_visits_entity_1 = require("./entities/customer-visits.entity");
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
        var dataSource_1, repo, invoiceItems_1, respo, custmerRepo, customer, error_3;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    dataSource_1 = _a.sent();
                    return [4 /*yield*/, (0, sale_header_repo_1.default)()];
                case 2:
                    repo = _a.sent();
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
                    custmerRepo = dataSource_1.getRepository(contact_entity_1.Contact);
                    return [4 /*yield*/, contact_service_1.default.findById(data.customer.id)];
                case 5:
                    customer = _a.sent();
                    return [4 /*yield*/, custmerRepo.save(__assign(__assign({}, customer), { lastVisitedDate: new Date().toISOString() }))];
                case 6:
                    _a.sent();
                    if (customer.email) {
                        // await invoiceMailer({
                        //   customer: customer.name,
                        //   txnDate: new Date(data.txnDate).toLocaleDateString(),
                        //   txnId: data.code,
                        //   mobile: customer.mobile,
                        //   subTotal: data.subTotal,
                        //   grandTotal: data.grandTotal,
                        //   tax: data.totalTax,
                        //   discount: data.totalDiscount,
                        //   email: customer.email,
                        //   itemData: invoiceItems,
                        // });
                    }
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
var createBulk = function (req_1, data_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([req_1, data_1], args_1, true), void 0, function (req, data, isService) {
        var user, dataSource_2, companyRepo, couponListRepo, customerVisitsRepo, customerVist, foundCoupons_1, itemLines, company, companyDetails, itemAvailableRepo, itemStockTrack, result_1, invoiceDetails, newInvoiceItems_1, inventory_2, itemIds_1, errors_1, itemToQauntityMap_1, customer_1, customerDetails, itemsAvailable_1, stockMap_1, stockTrack_1, error_6;
        var _a, _b;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = req.user;
                    data = __assign(__assign({}, data), { companyId: user.companyId });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 15, , 16]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 2:
                    dataSource_2 = _c.sent();
                    companyRepo = dataSource_2.getRepository(company_entity_1.Company);
                    couponListRepo = dataSource_2.getRepository(coupons_list_entity_1.CoupounsList);
                    customerVisitsRepo = dataSource_2.getRepository(customer_visits_entity_1.CustomerVisit);
                    customerVist = new customer_visits_entity_1.CustomerVisit();
                    foundCoupons_1 = new coupons_list_entity_1.CoupounsList();
                    if (!data.couponId) return [3 /*break*/, 4];
                    return [4 /*yield*/, couponListRepo.findOneBy({
                            id: data.couponId,
                        })];
                case 3:
                    foundCoupons_1 = _c.sent();
                    if (!foundCoupons_1) {
                        throw { message: "Coupon not found with id: ", statusCode: 404 };
                    }
                    _c.label = 4;
                case 4:
                    if (!data.paymentTypeId) return [3 /*break*/, 6];
                    return [4 /*yield*/, couponListRepo.findOneBy({
                            id: data.couponId,
                        })];
                case 5:
                    foundCoupons_1 = _c.sent();
                    if (!foundCoupons_1) {
                        throw { message: "Coupon not found with id: ", statusCode: 404 };
                    }
                    _c.label = 6;
                case 6:
                    itemLines = data.saleLines.filter(function (line) { return !line.isService; });
                    return [4 /*yield*/, companyRepo.findOne({
                            where: {
                                id: user.companyId,
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
                case 7:
                    company = _c.sent();
                    if (!company) {
                        throw { message: "Record not found with id: ", statusCode: 404 };
                    }
                    companyDetails = {
                        companyName: company.name,
                        companyAddress: company.addressLine1,
                        companyEmail: company.email,
                        companyPhone: company.phoneNumber,
                        signatureUrl: company.signature,
                        logoUrl: company.logo,
                    };
                    itemAvailableRepo = dataSource_2.getRepository(item_stocks_entity_1.ItemAvailable);
                    itemStockTrack = dataSource_2.getRepository(item_stock_track_entity_1.ItemsStockTrack);
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(19, data)];
                case 8:
                    data = _c.sent();
                    result_1 = new sale_header_entity_1.SaleHeaders();
                    invoiceDetails = {
                        invoiceNumber: data.code,
                        invoiceDate: data.txnDate,
                        dueDate: data.txnDate,
                        subtotal: data.subTotal,
                        tax: data.totalTax,
                        discount: data.totalDiscount,
                        totalPayable: data.grandTotal,
                    };
                    newInvoiceItems_1 = [];
                    inventory_2 = [];
                    itemIds_1 = [];
                    errors_1 = [];
                    itemToQauntityMap_1 = {};
                    return [4 /*yield*/, contact_service_1.default.findById(data.customer.id)];
                case 9:
                    customer_1 = _c.sent();
                    customerDetails = {
                        clientName: customer_1.name,
                        //add address onlater on
                        clientAddress: customer_1.address,
                        clientCity: (_a = customer_1 === null || customer_1 === void 0 ? void 0 : customer_1.city) === null || _a === void 0 ? void 0 : _a.name,
                        clientState: (_b = customer_1 === null || customer_1 === void 0 ? void 0 : customer_1.state) === null || _b === void 0 ? void 0 : _b.name,
                        //add zop code in customer
                        clientZip: customer_1.zipCode,
                        clientEmail: customer_1.email,
                    };
                    data.saleLines.forEach(function (value) {
                        var _a, _b;
                        newInvoiceItems_1.push({
                            description: (_a = value === null || value === void 0 ? void 0 : value.service) === null || _a === void 0 ? void 0 : _a.name,
                            quantity: value === null || value === void 0 ? void 0 : value.quantity,
                            unitCost: value.rate,
                            taxPercentage: (_b = value === null || value === void 0 ? void 0 : value.tax) === null || _b === void 0 ? void 0 : _b.name,
                            taxAmount: value.taxAmount,
                            lineTotal: Number(value.amount),
                        });
                    });
                    console.log("check 1");
                    itemLines.forEach(function (value) {
                        // invoiceItems.push({
                        //   name: value.service.name,
                        //   quantity: value.quantity,
                        //   unitPrice: value.rate,
                        //   total: Number(value.amount),
                        //   tax: value.taxAmount,
                        //   taxName: value.tax.name,
                        // });
                        // newInvoiceItems.push({
                        //   description: value?.service?.name,
                        //   quantity: value?.quantity,
                        //   unitCost: value.rate,
                        //   taxPercentage: value?.tax?.name,
                        //   taxAmount: value.taxAmount,
                        //   lineTotal: Number(value.amount),
                        // });
                        itemIds_1.push(value.service.id);
                    });
                    console.log("check 2");
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
                case 10:
                    itemsAvailable_1 = _c.sent();
                    //add data to map
                    console.log("check 3");
                    itemsAvailable_1.forEach(function (val, index) {
                        itemToQauntityMap_1[val.service.id] = {
                            name: val.service.name,
                            quantity: val.quantity,
                            idx: index,
                        };
                    });
                    //check availabilty
                    console.log("check 4");
                    itemLines.forEach(function (value) {
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
                    console.log("check 5");
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
                case 11:
                    stockTrack_1 = _c.sent();
                    console.log("check 6");
                    stockTrack_1.forEach(function (val, index) {
                        stockMap_1[val.id] = {
                            id: val.id,
                            idx: index,
                            aQuanity: val === null || val === void 0 ? void 0 : val.quantityUvailable,
                        };
                    });
                    console.log("check 7");
                    itemLines.forEach(function (value) {
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
                    console.log("check 8");
                    data.inventoryLines = inventory_2;
                    //3. start transaction
                    return [4 /*yield*/, dataSource_2.manager.transaction("SERIALIZABLE", function (transactionalEntityManager) { return __awaiter(void 0, void 0, void 0, function () {
                            var headerEntry, headerEntryResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        //2. update items availability
                                        //2. update items availability
                                        console.log("check 9");
                                        return [4 /*yield*/, transactionalEntityManager.save(item_stock_track_entity_1.ItemsStockTrack, stockTrack_1)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, transactionalEntityManager.save(item_stocks_entity_1.ItemAvailable, itemsAvailable_1)];
                                    case 2:
                                        _a.sent();
                                        //set last visited date
                                        return [4 /*yield*/, transactionalEntityManager.save(contact_entity_1.Contact, __assign(__assign({}, customer_1), { lastVisitedDate: new Date().toISOString() }))];
                                    case 3:
                                        //set last visited date
                                        _a.sent();
                                        if (!foundCoupons_1) return [3 /*break*/, 5];
                                        return [4 /*yield*/, transactionalEntityManager.save(coupons_list_entity_1.CoupounsList, __assign(__assign({}, foundCoupons_1), { isUsed: 1 }))];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5:
                                        foundCoupons_1;
                                        headerEntry = transactionalEntityManager.create(sale_header_entity_1.SaleHeaders, data);
                                        return [4 /*yield*/, transactionalEntityManager.save(sale_header_entity_1.SaleHeaders, headerEntry)];
                                    case 6:
                                        headerEntryResult = _a.sent();
                                        result_1 = headerEntryResult;
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 12:
                    //3. start transaction
                    _c.sent();
                    console.log("check 10");
                    if (!customer_1.email) return [3 /*break*/, 14];
                    // await invoiceMailer({
                    //   customer: customer.name,
                    //   txnDate: new Date(data.txnDate).toLocaleDateString(),
                    //   txnId: data.code,
                    //   mobile: customer.mobile,
                    //   subTotal: data.subTotal,
                    //   grandTotal: data.grandTotal,
                    //   tax: data.totalTax,
                    //   discount: data.totalDiscount,
                    //   email: customer.email,
                    //   itemData: invoiceItems,
                    // });
                    return [4 /*yield*/, (0, send_invoice_mail_service_1.default)(__assign(__assign(__assign(__assign({}, companyDetails), invoiceDetails), customerDetails), { items: newInvoiceItems_1 }))];
                case 13:
                    // await invoiceMailer({
                    //   customer: customer.name,
                    //   txnDate: new Date(data.txnDate).toLocaleDateString(),
                    //   txnId: data.code,
                    //   mobile: customer.mobile,
                    //   subTotal: data.subTotal,
                    //   grandTotal: data.grandTotal,
                    //   tax: data.totalTax,
                    //   discount: data.totalDiscount,
                    //   email: customer.email,
                    //   itemData: invoiceItems,
                    // });
                    _c.sent();
                    _c.label = 14;
                case 14: return [2 /*return*/, result_1];
                case 15:
                    error_6 = _c.sent();
                    console.log(error_6);
                    throw error_6;
                case 16: return [2 /*return*/];
            }
        });
    });
};
//create service which will get saleHeader information based on id also its lines
var saleInvoiceData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dataSource_3, companyRepo, company, invoiceItems, companyDetails, invoiceDetails, customerDetails, finalData, error_7;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                return [4 /*yield*/, findById(id, {
                        relations: {
                            saleLines: {
                                service: true,
                                tax: true,
                            },
                            customer: {
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
                dataSource_3 = _e.sent();
                companyRepo = dataSource_3.getRepository(company_entity_1.Company);
                return [4 /*yield*/, companyRepo.findOne({
                        where: {
                            id: data.companyId,
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
                    throw { message: "Record not found with id: " + id, statusCode: 404 };
                }
                invoiceItems = data.saleLines.map(function (line) {
                    var _a, _b;
                    return ({
                        description: (_a = line === null || line === void 0 ? void 0 : line.service) === null || _a === void 0 ? void 0 : _a.name,
                        quantity: line === null || line === void 0 ? void 0 : line.quantity,
                        unitCost: line.rate,
                        taxPercentage: (_b = line === null || line === void 0 ? void 0 : line.tax) === null || _b === void 0 ? void 0 : _b.name,
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
                customerDetails = {
                    clientName: data.customer.name,
                    //add address onlater on
                    clientAddress: data.customer.address,
                    clientCity: (_b = (_a = data === null || data === void 0 ? void 0 : data.customer) === null || _a === void 0 ? void 0 : _a.city) === null || _b === void 0 ? void 0 : _b.name,
                    clientState: (_d = (_c = data === null || data === void 0 ? void 0 : data.customer) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.name,
                    //add zop code in customer
                    clientZip: data === null || data === void 0 ? void 0 : data.customer.zipCode,
                    clientEmail: data.customer.email,
                };
                finalData = {
                    data: __assign(__assign(__assign(__assign({}, companyDetails), invoiceDetails), customerDetails), { items: invoiceItems }),
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
    saleInvoiceData: saleInvoiceData,
};
//# sourceMappingURL=sale-header.service.js.map