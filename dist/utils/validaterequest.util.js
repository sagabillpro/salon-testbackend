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
exports.validateRelationFilter = void 0;
var ajv_1 = __importDefault(require("ajv"));
var ajv_formats_1 = __importDefault(require("ajv-formats"));
var schema_1 = require("../schema");
var dbconfig_1 = require("../config/dbconfig");
var ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
//2. get relation names relations
var getRelationNames = function (model, baseModelName) { return __awaiter(void 0, void 0, void 0, function () {
    var relationArray, appDataSource, entityMetadata, relations, _i, relations_1, relation, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                relationArray = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 2:
                appDataSource = _a.sent();
                entityMetadata = appDataSource.getMetadata(model);
                relations = entityMetadata.relations.map(function (relation) {
                    return {
                        propertyName: relation.propertyName,
                        relationType: relation.relationType,
                        className: relation.inverseEntityMetadata.targetName,
                    };
                });
                _i = 0, relations_1 = relations;
                _a.label = 3;
            case 3:
                if (!(_i < relations_1.length)) return [3 /*break*/, 7];
                relation = relations_1[_i];
                if (!(baseModelName !== relation.className)) return [3 /*break*/, 5];
                //a. get the scheama oject for that entity
                relationArray.push(relation.propertyName);
                return [4 /*yield*/, getRelationNames(relation.className, baseModelName)];
            case 4:
                result = _a.sent();
                relationArray = __spreadArray(__spreadArray([], relationArray, true), result, true);
                return [3 /*break*/, 6];
            case 5:
                relationArray.push(relation.propertyName);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [2 /*return*/, Array.from(new Set(relationArray))];
            case 8:
                e_1 = _a.sent();
                console.log(e_1);
                throw e_1;
            case 9: return [2 /*return*/];
        }
    });
}); };
//3.function which can validate relations passes
var validateFilterRelations = function (checkArray, relationArray) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        relationArray === null || relationArray === void 0 ? void 0 : relationArray.forEach(function (val) {
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
        });
        return [2 /*return*/];
    });
}); };
//4.filter out malicious properties from object
var checkModelProperties = function (model, fields) { return __awaiter(void 0, void 0, void 0, function () {
    var result, appDataSource, entityMetadata, modelProperties;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {};
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                entityMetadata = appDataSource.getMetadata(model);
                modelProperties = {};
                entityMetadata.ownColumns.forEach(function (column) {
                    modelProperties[column.propertyName] = true;
                });
                Object.keys(fields).map(function (key) {
                    if (modelProperties[key]) {
                        result[key] = true;
                    }
                });
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
        var processedFields, processedWhere, processedRelations, _a, _b, relation, sanitizedRelation;
        if (level === void 0) { level = 1; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    processedFields = {};
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
                    if (filter.where) {
                        //check if the property present inside teh model
                    }
                    processedWhere = filter.where ? __assign({}, filter.where) : undefined;
                    processedRelations = [];
                    if (!filter.relations) return [3 /*break*/, 8];
                    _a = 0, _b = filter.relations;
                    _c.label = 5;
                case 5:
                    if (!(_a < _b.length)) return [3 /*break*/, 8];
                    relation = _b[_a];
                    return [4 /*yield*/, sanitizeFilterObject(relation, mapping, level + 1)];
                case 6:
                    sanitizedRelation = _c.sent();
                    processedRelations.push(sanitizedRelation);
                    _c.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/, {
                        fields: processedFields,
                        relations: processedRelations,
                        where: processedWhere,
                    }];
            }
        });
    });
}; //1. validate params filter
var validateRelationFilter = function (model) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, validate, valid, appDataSource, entityMetadata, relationList, resultMapping_1, data1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!req.query.filter) return [3 /*break*/, 5];
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
                    //b1.check whether user passed anonymus relations
                    return [4 /*yield*/, validateFilterRelations(relationList, query.relations)];
                case 3:
                    //b1.check whether user passed anonymus relations
                    _a.sent();
                    resultMapping_1 = {};
                    resultMapping_1["baseModel"] = entityMetadata.targetName;
                    entityMetadata.relations.forEach(function (relation) {
                        resultMapping_1[relation.propertyName] =
                            relation.inverseEntityMetadata.targetName;
                    });
                    return [4 /*yield*/, sanitizeFilterObject(query, resultMapping_1)];
                case 4:
                    data1 = _a.sent();
                    console.log("data1", JSON.stringify(data1));
                    _a.label = 5;
                case 5:
                    next();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.status(422).json(error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.validateRelationFilter = validateRelationFilter;
//# sourceMappingURL=validaterequest.util.js.map