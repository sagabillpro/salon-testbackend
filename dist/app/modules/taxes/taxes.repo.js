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
Object.defineProperty(exports, "__esModule", { value: true });
var dbconfig_1 = require("../../../app/config/dbconfig");
var taxes_entity_1 = require("./entities/taxes.entity");
var repository = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, repo, find, findOne, findOneById, create, updateById, deleteById, createAll, createBulk;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                repo = dataSource.getRepository(taxes_entity_1.Taxes);
                find = function (option) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, repo.find(option)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                error_1 = _a.sent();
                                throw error_1;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                findOne = function (option) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, repo.find(option)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                error_2 = _a.sent();
                                throw error_2;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                findOneById = function (id, filter) { return __awaiter(void 0, void 0, void 0, function () {
                    var item, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, repo.findOne({
                                        select: __assign({}, filter === null || filter === void 0 ? void 0 : filter.select),
                                        where: __assign({ recordId: Number(id), isInactive: 0 }, filter === null || filter === void 0 ? void 0 : filter.where),
                                        relations: __assign({}, filter === null || filter === void 0 ? void 0 : filter.relations),
                                    })];
                            case 1:
                                item = _a.sent();
                                if (!item) {
                                    throw { message: "Record not found with id: " + id, statusCode: 404 };
                                }
                                return [2 /*return*/, item];
                            case 2:
                                error_3 = _a.sent();
                                throw error_3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var respo, error_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                respo = repo.create(data);
                                return [4 /*yield*/, repo.save(respo)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, respo];
                            case 2:
                                error_4 = _a.sent();
                                throw error_4;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                updateById = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
                    var respo, newRecord, error_5;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, , 5]);
                                return [4 /*yield*/, repo.findOneBy({
                                        recordId: id,
                                        isInactive: 0,
                                    })];
                            case 1:
                                respo = _a.sent();
                                // If the record is not found, throw a 404 error
                                if (!respo) {
                                    throw { message: "Record not found with id: " + id, statusCode: 404 };
                                }
                                // Mark the existing record as inactive
                                return [4 /*yield*/, repo.save(__assign(__assign({}, respo), { isInactive: 1 }))];
                            case 2:
                                // Mark the existing record as inactive
                                _a.sent();
                                newRecord = repo.create(__assign(__assign({}, data), { recordId: respo.recordId, code: respo.code }));
                                // Save the new record to the database
                                return [4 /*yield*/, repo.save(newRecord)];
                            case 3:
                                // Save the new record to the database
                                _a.sent();
                                // Return the newly created record
                                return [2 /*return*/, newRecord];
                            case 4:
                                error_5 = _a.sent();
                                // If an error occurs, throw it to be handled by the caller
                                throw error_5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                deleteById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var respo, error_6;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 5, , 6]);
                                return [4 /*yield*/, repo.findOneBy({
                                        recordId: id,
                                        isInactive: 0,
                                    })];
                            case 1:
                                respo = _a.sent();
                                if (!!respo) return [3 /*break*/, 2];
                                throw { message: "Record not found with id: " + id, statusCode: 404 };
                            case 2: 
                            // Soft remove the record (mark it as deleted without physically removing it from the database)
                            return [4 /*yield*/, repo.softRemove(respo)];
                            case 3:
                                // Soft remove the record (mark it as deleted without physically removing it from the database)
                                _a.sent();
                                _a.label = 4;
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                error_6 = _a.sent();
                                // If an error occurs, throw it to be handled by the caller
                                throw error_6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); };
                createAll = function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var respo, error_7;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                respo = repo.create(data);
                                return [4 /*yield*/, repo.save(respo)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, respo];
                            case 2:
                                error_7 = _a.sent();
                                throw error_7;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                createBulk = function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var respo, error_8;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                respo = repo.create(data);
                                return [4 /*yield*/, repo.save(respo)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, dataSource.transaction(function (transactionalEntityManager) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/];
                                        });
                                    }); })];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, respo];
                            case 3:
                                error_8 = _a.sent();
                                throw error_8;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, {
                        find: find,
                        findOne: findOne,
                        findOneById: findOneById,
                        create: create,
                        updateById: updateById,
                        deleteById: deleteById,
                        createAll: createAll,
                    }];
        }
    });
}); };
// Exporting an async function that resolves to an object containing find and findOne
exports.default = repository;
//# sourceMappingURL=taxes.repo.js.map