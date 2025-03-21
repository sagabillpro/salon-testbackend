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
var company_coupons_repo_1 = __importDefault(require("./company-coupons.repo"));
var send_birthday_mail_service_1 = require("../../services/send-birthday-mail.service");
var generate_coupons_code_util_1 = require("../../utils/generate-coupons-code.util");
var dbconfig_1 = require("../../config/dbconfig");
var contact_entity_1 = require("../contacts/entities/contact.entity");
//1. find multiple records
var find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, company_coupons_repo_1.default)()];
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
                return [4 /*yield*/, (0, company_coupons_repo_1.default)()];
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
var create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, respo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, company_coupons_repo_1.default)()];
            case 1:
                repo = _a.sent();
                respo = repo.create(__assign({}, data));
                return [2 /*return*/, respo];
            case 2:
                error_3 = _a.sent();
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
//4. update single record by id
var updateById = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, respo, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, company_coupons_repo_1.default)()];
            case 1:
                repo = _a.sent();
                respo = repo.updateById(id, __assign({}, data));
                return [2 /*return*/, respo];
            case 2:
                error_4 = _a.sent();
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
//5. delete single record by id
var deleteById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, company_coupons_repo_1.default)()];
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
//1. find multiple records
var birthdayScheduler = function () { return __awaiter(void 0, void 0, void 0, function () {
    var today, month, day, dataSource, customers, emailPromises, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                today = new Date();
                month = today.getMonth() + 1;
                day = today.getDate();
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                return [4 /*yield*/, dataSource
                        .getRepository(contact_entity_1.Contact)
                        .createQueryBuilder("customer")
                        .leftJoinAndSelect("customer.company", "company")
                        .andWhere("EXTRACT(MONTH FROM customer.birthDate) = :month", { month: month })
                        .andWhere("EXTRACT(DAY FROM customer.birthDate) = :day", { day: day })
                        .select([
                        "customer.id",
                        "customer.name",
                        "customer.email",
                        "customer.mobile",
                        "customer.birthDate",
                        "company.id",
                        "company.name",
                        "company.logo",
                        "company.email",
                    ])
                        .getMany()];
            case 2:
                customers = _a.sent();
                console.log("chek 1 ");
                console.log(customers);
                emailPromises = customers.map(function (record) { return __awaiter(void 0, void 0, void 0, function () {
                    var code;
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        console.log("insode this 1");
                        code = (0, generate_coupons_code_util_1.generateCouponCode)(5);
                        //     const couponCode = await db.getOrGenerateCoupon(customer.id, "BIRTHDAY");
                        if (record.email) {
                            console.log("insode this 2");
                            return [2 /*return*/, (0, send_birthday_mail_service_1.sendBirthdayEmail)({
                                    customer: {
                                        name: record.name,
                                        email: record.email,
                                    },
                                    company: {
                                        logo: (_a = record === null || record === void 0 ? void 0 : record.company) === null || _a === void 0 ? void 0 : _a.logo,
                                        name: (_b = record === null || record === void 0 ? void 0 : record.company) === null || _b === void 0 ? void 0 : _b.name,
                                        email: (_c = record === null || record === void 0 ? void 0 : record.company) === null || _c === void 0 ? void 0 : _c.email,
                                    },
                                    couponCode: code,
                                })];
                        }
                        return [2 /*return*/];
                    });
                }); });
                // Send all emails in parallel
                return [4 /*yield*/, Promise.all(emailPromises)];
            case 3:
                // Send all emails in parallel
                _a.sent();
                console.log("Reached to all emails in parallel");
                return [2 /*return*/, "ok"];
            case 4:
                error_6 = _a.sent();
                console.log(error_6);
                throw error_6;
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
    birthdayScheduler: birthdayScheduler,
};
//# sourceMappingURL=company-coupons.service.js.map