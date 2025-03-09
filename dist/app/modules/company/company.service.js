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
var company_repo_1 = __importDefault(require("./company.repo"));
var company_entity_1 = require("./entities/company.entity");
var get_object_code_util_1 = require("../../utils/get-object-code.util");
var dbconfig_1 = require("../../config/dbconfig");
var entities_1 = require("../general-data/entities");
var branches_entity_1 = require("../branches/entities/branches.entity");
var taxes_entity_1 = require("../taxes/entities/taxes.entity");
//1. find multiple records
var find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, company_repo_1.default)()];
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
                return [4 /*yield*/, (0, company_repo_1.default)()];
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
var create = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isCalledForEdit, editManager) {
        var dataSource, countryRepo, manager, country, taxRepo, tax, branches, headerWithoutLines, headerEntry, branchesNew_1, error_3;
        if (isCalledForEdit === void 0) { isCalledForEdit = false; }
        if (editManager === void 0) { editManager = null; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    dataSource = _a.sent();
                    countryRepo = dataSource.getRepository(entities_1.Country);
                    manager = editManager || dataSource.manager;
                    return [4 /*yield*/, countryRepo.findOne({
                            where: { id: data.countryId },
                        })];
                case 2:
                    country = _a.sent();
                    if (!country) {
                        throw {
                            message: "Record not found with id: " + data.countryId,
                            statusCode: 404,
                        };
                    }
                    taxRepo = dataSource.getRepository(taxes_entity_1.Taxes);
                    return [4 /*yield*/, taxRepo.findOne({
                            where: { id: data.taxId },
                        })];
                case 3:
                    tax = _a.sent();
                    if (!tax) {
                        throw {
                            message: "Record not found with id: " + data.taxId,
                            statusCode: 404,
                        };
                    }
                    branches = data.branches, headerWithoutLines = __rest(data, ["branches"]);
                    console.log(tax);
                    if (!!isCalledForEdit) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(27, __assign({}, headerWithoutLines))];
                case 4:
                    headerWithoutLines = _a.sent();
                    _a.label = 5;
                case 5:
                    headerEntry = manager.create(company_entity_1.Company, __assign(__assign({}, headerWithoutLines), { countryId: data.countryId, taxId: tax.id, taxRecordId: tax.recordId }));
                    console.log("step22", headerEntry);
                    return [4 /*yield*/, manager.save(company_entity_1.Company, headerEntry)];
                case 6:
                    data = _a.sent();
                    console.log("step23", headerWithoutLines);
                    branchesNew_1 = [];
                    // 8. Iterate over the provided branches data (if any) to create new Branch instances.
                    //    Each branch is associated with the saved company record (using companyId and companyRecordId).
                    branches === null || branches === void 0 ? void 0 : branches.forEach(function (value) {
                        // Create a new branch instance by merging the incoming branch data
                        // with the company association details from the saved company.
                        var branchInstance = __assign(__assign({}, value), { companyId: data.id, companyRecordId: data.recordId });
                        branchesNew_1.push(branchInstance);
                    });
                    console.log("step2223", headerWithoutLines);
                    // 9. Save all new Branch instances.
                    return [4 /*yield*/, manager.save(branches_entity_1.Branch, branchesNew_1)];
                case 7:
                    // 9. Save all new Branch instances.
                    _a.sent();
                    // });
                    // 10. Return the newly created company record.
                    return [2 /*return*/, data];
                case 8:
                    error_3 = _a.sent();
                    console.log(error_3);
                    throw error_3;
                case 9: return [2 /*return*/];
            }
        });
    });
};
// 4. Update single Company record by id
var updateById = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, branches_1, headerWithoutLines_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                branches_1 = data.branches, headerWithoutLines_1 = __rest(data, ["branches"]);
                // Start a transaction with SERIALIZABLE isolation level to ensure atomicity
                return [4 /*yield*/, dataSource.manager.transaction("REPEATABLE READ", function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                        var oldHeaderRecord, oldBranches, inActiveHeaderRecord;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, manager.findOne(company_entity_1.Company, {
                                        where: { id: id },
                                        relations: { branches: true },
                                    })];
                                case 1:
                                    oldHeaderRecord = _a.sent();
                                    oldBranches = (oldHeaderRecord === null || oldHeaderRecord === void 0 ? void 0 : oldHeaderRecord.branches) || [];
                                    // Merge the old branches with any new branches provided in the update.
                                    // This ensures that the new record will include both unchanged and updated branches.
                                    branches_1 = __spreadArray(__spreadArray([], oldBranches, true), (branches_1 ? branches_1 : []), true);
                                    // 2. Mark the existing company record as inactive (soft delete it)
                                    // by saving a copy with isInactive set to 1.
                                    console.log("step1", oldHeaderRecord);
                                    return [4 /*yield*/, manager.save(company_entity_1.Company, __assign(__assign({}, oldHeaderRecord), { isInactive: 1 }))];
                                case 2:
                                    inActiveHeaderRecord = _a.sent();
                                    return [4 /*yield*/, create(__assign(__assign({}, headerWithoutLines_1), { branches: branches_1, code: inActiveHeaderRecord.code, recordId: inActiveHeaderRecord.recordId }), true, manager)];
                                case 3:
                                    // 3. Re-use the create logic to generate a new Company record (i.e., a new version)
                                    // using the merged branches and retaining the same code and recordId from the inactive record.
                                    data = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                // Start a transaction with SERIALIZABLE isolation level to ensure atomicity
                _a.sent();
                // Return the newly created (updated) Company record
                return [2 /*return*/, data];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                throw error_4;
            case 4: return [2 /*return*/];
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
                return [4 /*yield*/, (0, company_repo_1.default)()];
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
exports.default = { find: find, findById: findById, create: create, deleteById: deleteById, updateById: updateById };
//# sourceMappingURL=company.service.js.map