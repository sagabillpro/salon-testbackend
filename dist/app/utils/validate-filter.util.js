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
exports.validateFilter = exports.sanitizeFilterObject = void 0;
var ajv_1 = __importDefault(require("ajv"));
var ajv_formats_1 = __importDefault(require("ajv-formats"));
var schema_1 = require("../schema");
var dbconfig_1 = require("../config/dbconfig");
var ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
//2. get relation names relations
var getRelationNames = function (model_1, baseModelName_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([model_1, baseModelName_1], args_1, true), void 0, function (model, baseModelName, level, visited) {
        var relationArray, appDataSource, entityMetadata, relations, _a, relations_1, relation, result, e_1;
        if (level === void 0) { level = 1; }
        if (visited === void 0) { visited = new Set(); }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    relationArray = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 2:
                    appDataSource = _b.sent();
                    entityMetadata = appDataSource.getMetadata(model);
                    relations = entityMetadata.relations.map(function (relation) {
                        return {
                            propertyName: relation.propertyName,
                            relationType: relation.relationType,
                            className: relation.inverseEntityMetadata.targetName,
                        };
                    });
                    // If we already visited this model, stop recursion
                    if (visited.has(entityMetadata.targetName)) {
                        return [2 /*return*/, relationArray];
                    }
                    visited.add(entityMetadata.targetName); // Mark as visited
                    _a = 0, relations_1 = relations;
                    _b.label = 3;
                case 3:
                    if (!(_a < relations_1.length)) return [3 /*break*/, 6];
                    relation = relations_1[_a];
                    relationArray.push(relation.propertyName);
                    if (!(!visited.has(relation.className) && level < 5)) return [3 /*break*/, 5];
                    return [4 /*yield*/, getRelationNames(relation.className, baseModelName, level + 1, // Corrected increment
                        visited)];
                case 4:
                    result = _b.sent();
                    relationArray = __spreadArray(__spreadArray([], relationArray, true), result, true);
                    _b.label = 5;
                case 5:
                    _a++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, Array.from(new Set(relationArray))];
                case 7:
                    e_1 = _b.sent();
                    console.error("Error in getRelationNames:", e_1);
                    throw e_1;
                case 8: return [2 /*return*/];
            }
        });
    });
};
//3.function which can validate relations passes
var validateFilterRelations = function (checkArray, relationArray) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            console.log("levelll...");
            relationArray === null || relationArray === void 0 ? void 0 : relationArray.forEach(function (val) {
                if (val === null || val === void 0 ? void 0 : val.name) {
                    if ((val === null || val === void 0 ? void 0 : val.name) && checkArray.includes(val === null || val === void 0 ? void 0 : val.name)) {
                        if (val.relations) {
                            validateFilterRelations(checkArray, val.relations);
                        }
                    }
                    else {
                        var error = {
                            status: 400,
                            message: "Invalid relation name '".concat(val === null || val === void 0 ? void 0 : val.name, "' provided."),
                            errorCode: "INVALID_RELATION_NAME",
                            availableRelations: checkArray,
                        };
                        throw error;
                    }
                }
            });
        }
        catch (e) {
            throw e;
        }
        return [2 /*return*/];
    });
}); };
//4.filter out malicious properties from object
var checkModelProperties = function (model, fields) { return __awaiter(void 0, void 0, void 0, function () {
    var result_1, appDataSource, entityMetadata, modelProperties_1, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result_1 = {};
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                entityMetadata = appDataSource.getMetadata(model);
                modelProperties_1 = {};
                entityMetadata.ownColumns.forEach(function (column) {
                    modelProperties_1[column.propertyName] = true;
                });
                Object.keys(fields).map(function (key) {
                    if (modelProperties_1[key]) {
                        result_1[key] = true;
                    }
                });
                return [2 /*return*/, result_1];
            case 2:
                e_2 = _a.sent();
                throw e_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
//4.filter out malicious properties from order object
var checkModelOrder = function (model, order) { return __awaiter(void 0, void 0, void 0, function () {
    var result_2, appDataSource, entityMetadata, modelProperties_2, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result_2 = {};
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                entityMetadata = appDataSource.getMetadata(model);
                modelProperties_2 = {};
                entityMetadata.ownColumns.forEach(function (column) {
                    modelProperties_2[column.propertyName] = true;
                });
                Object.keys(order).map(function (key) {
                    if (modelProperties_2[key] && ["asc", "desc"].includes(order[key])) {
                        result_2[key] = order[key];
                    }
                });
                return [2 /*return*/, result_2];
            case 2:
                e_3 = _a.sent();
                throw e_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
//5. checkModelPropertiesWhere
var checkModelPropertiesWhere = function (model, where) { return __awaiter(void 0, void 0, void 0, function () {
    var result, appDataSource, entityMetadata, modelProperties, _loop_1, _i, _a, _b, level1Key, level1Value;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                result = {};
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _c.sent();
                entityMetadata = appDataSource.getMetadata(model);
                modelProperties = {};
                entityMetadata.ownColumns.forEach(function (column) {
                    modelProperties[column.propertyName] = true;
                });
                _loop_1 = function (level1Key, level1Value) {
                    if (modelProperties[level1Key]) {
                        result[level1Key] = level1Value;
                    }
                    else if (level1Key === "$a") {
                        var level2Result_1 = {};
                        //1.validate advanced where options
                        Object.keys(where["$a"]).map(function (level2Key) {
                            if ([
                                "eq",
                                "neq",
                                "mte",
                                "in",
                                "nin",
                                "lt",
                                "lte",
                                "mt",
                                "mte",
                                "like",
                                "ilike",
                                "between",
                            ].includes(level2Key)) {
                                var level3Result = {};
                                //get key and values from inner object
                                for (var _i = 0, _a = Object.entries(where["$a"][level2Key]); _i < _a.length; _i++) {
                                    var _b = _a[_i], level3Key = _b[0], level3Value = _b[1];
                                    modelProperties[level3Key]
                                        ? (level3Result[level3Key] = level3Value)
                                        : null;
                                }
                                //assign to main object
                                level2Result_1[level2Key] = level3Result;
                            }
                            else if (level2Key === "between") {
                            }
                            else if (level2Key === "isNull") {
                            }
                        });
                        //assign the main advanced where object to maoin where
                        result[level1Key] = level2Result_1;
                    }
                };
                // Object.keys(where).map((key) =>
                for (_i = 0, _a = Object.entries(where); _i < _a.length; _i++) {
                    _b = _a[_i], level1Key = _b[0], level1Value = _b[1];
                    _loop_1(level1Key, level1Value);
                }
                return [2 /*return*/, result];
        }
    });
}); };
var sanitizeFilterObject = function (filter_1, mapping_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([filter_1, mapping_1], args_1, true), void 0, function (
    // model: T,
    filter, mapping, level) {
        var processedFields, processedWhere, processedOrder, processedRelations, _a, _b, relation, sanitizedRelation, e_4;
        if (level === void 0) { level = 1; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 17, , 18]);
                    processedFields = {};
                    processedWhere = {};
                    processedOrder = {};
                    if (!filter.fields) return [3 /*break*/, 4];
                    if (!(level === 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, checkModelProperties(mapping["baseModel"], filter.fields)];
                case 1:
                    processedFields = _c.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!(filter.name && mapping[filter.name])) return [3 /*break*/, 4];
                    return [4 /*yield*/, checkModelProperties(mapping[filter.name], filter.fields)];
                case 3:
                    processedFields = _c.sent();
                    _c.label = 4;
                case 4:
                    if (!filter.where) return [3 /*break*/, 8];
                    if (!(level === 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, checkModelPropertiesWhere(mapping["baseModel"], filter.where)];
                case 5:
                    processedWhere = _c.sent();
                    return [3 /*break*/, 8];
                case 6:
                    if (!(filter.name && mapping[filter.name])) return [3 /*break*/, 8];
                    return [4 /*yield*/, checkModelPropertiesWhere(mapping[filter.name], filter.where)];
                case 7:
                    processedWhere = _c.sent();
                    _c.label = 8;
                case 8:
                    if (!filter.order) return [3 /*break*/, 12];
                    if (!(level === 1)) return [3 /*break*/, 10];
                    return [4 /*yield*/, checkModelOrder(mapping["baseModel"], filter.order)];
                case 9:
                    processedOrder = _c.sent();
                    return [3 /*break*/, 12];
                case 10:
                    if (!(filter.name && mapping[filter.name])) return [3 /*break*/, 12];
                    return [4 /*yield*/, checkModelOrder(mapping[filter.name], filter.order)];
                case 11:
                    processedOrder = _c.sent();
                    _c.label = 12;
                case 12:
                    processedRelations = [];
                    if (!filter.relations) return [3 /*break*/, 16];
                    _a = 0, _b = filter.relations;
                    _c.label = 13;
                case 13:
                    if (!(_a < _b.length)) return [3 /*break*/, 16];
                    relation = _b[_a];
                    return [4 /*yield*/, (0, exports.sanitizeFilterObject)(relation, mapping, level + 1)];
                case 14:
                    sanitizedRelation = _c.sent();
                    processedRelations.push(sanitizedRelation);
                    _c.label = 15;
                case 15:
                    _a++;
                    return [3 /*break*/, 13];
                case 16: return [2 /*return*/, __assign(__assign({}, (filter.name ? { name: filter.name } : {})), { fields: processedFields, relations: processedRelations, where: processedWhere, order: processedOrder })];
                case 17:
                    e_4 = _c.sent();
                    throw e_4;
                case 18: return [2 /*return*/];
            }
        });
    });
}; //1. validate params filter
exports.sanitizeFilterObject = sanitizeFilterObject;
var validateFilter = function (model) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, validate, valid, appDataSource, entityMetadata, relationList, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!req.query.filter) return [3 /*break*/, 3];
                    query = JSON.parse("".concat(req.query.filter));
                    validate = ajv.compile(schema_1.FilterSchema);
                    valid = validate(query);
                    if (!valid) {
                        throw validate.errors;
                    }
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    appDataSource = _a.sent();
                    entityMetadata = appDataSource.getMetadata(model);
                    return [4 /*yield*/, getRelationNames(model, entityMetadata.targetName)];
                case 2:
                    relationList = _a.sent();
                    _a.label = 3;
                case 3:
                    next();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    res.status(422).json(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
};
exports.validateFilter = validateFilter;
//sample where object
//ref-: https://orkhan.gitbook.io/typeorm/docs/find-options
var where = {
    $a: {
        //1. not equal to
        neq: {
            property: "value",
        }, //6. less than eqaul
        mte: {
            property: "value",
        },
        //2. not include
        nin: {
            property: [1, 2, 3, 4, 5],
        },
        //3. less than
        lt: {
            property: "value",
        },
        //4. less than eqaul
        lte: {
            property: "value",
        },
        //5. less than
        mt: {
            property: "value",
        },
        //6. eqaul to
        eq: {
            property: "value",
        },
        //7. like
        like: {
            property: "value",
        },
        //8. like case insensetive
        ilike: {
            property: "value",
        },
        between: {
            property: ["start", "end"],
        },
        in: {
            property: ["start", "end"],
        },
        isNull: {
            properties: ["start", "end"],
        },
    },
};
//# sourceMappingURL=validate-filter.util.js.map