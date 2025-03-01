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
exports.validateRequestBody = exports.getModelSchema = void 0;
var ajv_1 = __importDefault(require("ajv"));
var ajv_formats_1 = __importDefault(require("ajv-formats"));
var mappings_1 = require("../mappings");
var dbconfig_1 = require("../config/dbconfig");
var ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
// add the date related columns here
var dateColumns = ["modifiedDate", "createdDate"];
var ignoreRequiredCheck = ["id"];
/**
 This function can create ajv scheama by using typeorm enitity.
 **/
var getModelSchema = function (model_1, baseModel_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([model_1, baseModel_1], args_1, true), void 0, function (model, baseModel, level) {
        var appDataSource, entityMetadata, schemaObject_1, relations, _a, relations_1, relation, relativeModelSchema, modelProperties, e_1;
        if (level === void 0) { level = 1; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    appDataSource = _b.sent();
                    entityMetadata = appDataSource.getMetadata(model);
                    schemaObject_1 = {
                        type: "object",
                        properties: {},
                        required: [],
                        additionalProperties: false,
                    };
                    relations = entityMetadata.relations.map(function (relation) {
                        return {
                            propertyName: relation.propertyName,
                            relationType: relation.relationType,
                            className: relation.inverseEntityMetadata.targetName, // Get the class name of the related entity
                        };
                    });
                    _a = 0, relations_1 = relations;
                    _b.label = 2;
                case 2:
                    if (!(_a < relations_1.length)) return [3 /*break*/, 5];
                    relation = relations_1[_a];
                    if (!(relation.relationType === "many-to-one" &&
                        level < 4 &&
                        entityMetadata.targetName != baseModel)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, exports.getModelSchema)(relation.className, baseModel, level++)];
                case 3:
                    relativeModelSchema = _b.sent();
                    // set only id as required
                    relativeModelSchema.required = ["id"];
                    schemaObject_1["properties"][relation.propertyName] = relativeModelSchema;
                    //b. make it required
                    schemaObject_1.required.push(relation.propertyName);
                    _b.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5:
                    level = level;
                    modelProperties = entityMetadata.ownColumns.map(function (column) {
                        return {
                            type: column.type,
                            name: column === null || column === void 0 ? void 0 : column.propertyName,
                            required: !column.isNullable,
                        };
                    });
                    //4. loop through properties
                    modelProperties.forEach(function (value) {
                        var _a, _b;
                        //1. get the type according to the name
                        if (mappings_1.typeOrmToAjvTypesMapping["".concat(value.type)]) {
                            schemaObject_1["properties"]["".concat(value.name)] = __assign({ type: (_a = mappings_1.typeOrmToAjvTypesMapping["".concat(value.type)]) === null || _a === void 0 ? void 0 : _a.type }, (((_b = mappings_1.typeOrmToAjvTypesMapping["".concat(value.type)]) === null || _b === void 0 ? void 0 : _b.format) ||
                                dateColumns.includes("".concat(value === null || value === void 0 ? void 0 : value.name))
                                ? {
                                    format: "date-time",
                                    // format: typeOrmToAjvTypesMapping[`${value.type}`]?.format
                                }
                                : {}));
                        }
                        //2. else assign the string value
                        else {
                            schemaObject_1["properties"]["".concat(value === null || value === void 0 ? void 0 : value.name)] = {
                                type: "string",
                            };
                        }
                        //e. check if value is required
                        if (value.required && !ignoreRequiredCheck.includes("".concat(value.name))) {
                            schemaObject_1.required.push("".concat(value.name));
                        }
                    });
                    return [2 /*return*/, schemaObject_1];
                case 6:
                    e_1 = _b.sent();
                    throw e_1;
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.getModelSchema = getModelSchema;
/** this function can validate req body agains the schema*/
var validateRequestBody = function (model) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var appDataSource, entityMetadata, schemaObject, relations, _i, relations_2, relation, relativeModelSchema, relativeModelSchema, validate, valid, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    appDataSource = _a.sent();
                    entityMetadata = appDataSource.getMetadata(model);
                    return [4 /*yield*/, (0, exports.getModelSchema)(model, entityMetadata.targetName)];
                case 2:
                    schemaObject = _a.sent();
                    relations = entityMetadata.relations.map(function (relation) {
                        return {
                            propertyName: relation.propertyName,
                            relationType: relation.relationType,
                            className: relation.inverseEntityMetadata.targetName, // Get the class name of the related entity
                        };
                    });
                    _i = 0, relations_2 = relations;
                    _a.label = 3;
                case 3:
                    if (!(_i < relations_2.length)) return [3 /*break*/, 8];
                    relation = relations_2[_i];
                    if (!(relation.relationType === "one-to-many")) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, exports.getModelSchema)(relation.className, entityMetadata.targetName)];
                case 4:
                    relativeModelSchema = _a.sent();
                    schemaObject["properties"][relation.propertyName] = {
                        type: "array",
                        //b. assign to properties
                        items: relativeModelSchema,
                    };
                    //b. make it required
                    schemaObject.required.push(relation.propertyName);
                    _a.label = 5;
                case 5:
                    if (!(relation.relationType === "many-to-one")) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, exports.getModelSchema)(relation.className, entityMetadata.targetName)];
                case 6:
                    relativeModelSchema = _a.sent();
                    // set only id as required
                    relativeModelSchema.required = ["id"];
                    schemaObject["properties"][relation.propertyName] =
                        relativeModelSchema;
                    //b. make it required
                    schemaObject.required.push(relation.propertyName);
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8:
                    validate = ajv.compile(schemaObject);
                    valid = validate(req.body);
                    if (!valid) {
                        throw validate.errors;
                    }
                    next();
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    res.status(422).json(error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
};
exports.validateRequestBody = validateRequestBody;
//# sourceMappingURL=get-model-schema.nested.util.js.map