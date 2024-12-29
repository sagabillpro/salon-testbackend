"use strict";
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
exports.getFilterSchema = void 0;
var ajv_1 = __importDefault(require("ajv"));
var ajv_formats_1 = __importDefault(require("ajv-formats"));
var dbconfig_1 = require("../config/dbconfig");
var ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
/**
 This function can create ajv select scheama by using typeorm enitity.
 **/
/**exp -:
             {
          "select": {
            "id": true,
            "name": true,
            "relation1": {
              "id": true,
              "name": true,
              "relation12": {
                "id": true,
                "name": true
              }
            }
          }
        }

        **/
var getWhereSchema = function (model, baseModelName) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, entityMetadata, modelProperties, schemaObject_1, relationObject, relations, _i, relations_1, relation, _a, relativeModelSchema, sample, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _b.sent();
                entityMetadata = appDataSource.getMetadata(model);
                modelProperties = entityMetadata.ownColumns.map(function (column) {
                    return {
                        type: column.type,
                        name: column.propertyName,
                        required: !column.isNullable,
                    };
                });
                schemaObject_1 = {
                    type: "object",
                    properties: {},
                    required: [],
                };
                relationObject = {};
                modelProperties.forEach(function (value) {
                    //1. get the type according to the name
                    schemaObject_1["properties"][value.name] = {
                        type: "boolean",
                    };
                });
                relations = entityMetadata.relations.map(function (relation) {
                    return {
                        propertyName: relation.propertyName,
                        relationType: relation.relationType,
                        className: relation.inverseEntityMetadata.targetName,
                        // name:relation.inverseEntityMetadata. // Get the class name of the related entity
                    };
                });
                _i = 0, relations_1 = relations;
                _b.label = 2;
            case 2:
                if (!(_i < relations_1.length)) return [3 /*break*/, 6];
                relation = relations_1[_i];
                if (!(baseModelName !== relation.className)) return [3 /*break*/, 4];
                return [4 /*yield*/, getWhereSchema(relation.className, baseModelName)];
            case 3:
                _a = _b.sent(), relativeModelSchema = _a[0], sample = _a[1];
                schemaObject_1["properties"][relation.propertyName] = relativeModelSchema;
                relationObject[relation.propertyName] = sample;
                return [3 /*break*/, 5];
            case 4:
                relationObject[relation.propertyName] = true;
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, [schemaObject_1, relationObject]];
            case 7:
                e_1 = _b.sent();
                throw e_1;
            case 8: return [2 /*return*/];
        }
    });
}); };
/**
 This function can create ajv scheama by using typeorm enitity.
 **/
var getRelationSchema = function (model, baseModelName, propertyName) { return __awaiter(void 0, void 0, void 0, function () {
    var schemaObject, appDataSource, entityMetadata, relations, _i, relations_2, relation, data, e_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 9, , 10]);
                schemaObject = {
                    anyOf: [
                        {
                            type: "object",
                            properties: {},
                            required: [],
                            additionalProperties: false,
                        }, {
                            type: "boolean"
                        }
                    ]
                };
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _d.sent();
                entityMetadata = appDataSource.getMetadata(model);
                relations = entityMetadata.relations.map(function (relation) {
                    return {
                        propertyName: relation.propertyName,
                        relationType: relation.relationType,
                        className: relation.inverseEntityMetadata.targetName,
                    };
                });
                if (!relations.length) return [3 /*break*/, 7];
                _i = 0, relations_2 = relations;
                _d.label = 2;
            case 2:
                if (!(_i < relations_2.length)) return [3 /*break*/, 6];
                relation = relations_2[_i];
                if (!(baseModelName !== relation.className)) return [3 /*break*/, 4];
                return [4 /*yield*/, getRelationSchema(relation.className, baseModelName, relation.propertyName)];
            case 3:
                data = _d.sent();
                schemaObject.anyOf.push({
                    type: "object",
                    properties: (_a = {},
                        _a["".concat(relation.propertyName)] = data,
                        _a),
                    required: [],
                    additionalProperties: false,
                }, {
                    type: "boolean",
                });
                return [3 /*break*/, 5];
            case 4:
                schemaObject.anyOf.push({
                    type: "object",
                    properties: (_b = {},
                        _b["".concat(relation.propertyName)] = { type: "boolean", },
                        _b),
                    required: [],
                    additionalProperties: false,
                }, {
                    type: "boolean",
                });
                _d.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 8];
            case 7:
                schemaObject.anyOf.push({
                    type: "object",
                    properties: (_c = {},
                        _c["".concat(propertyName)] = { type: "boolean", },
                        _c),
                    required: [],
                    additionalProperties: false,
                }, {
                    type: "boolean",
                });
                _d.label = 8;
            case 8: return [2 /*return*/, schemaObject];
            case 9:
                e_2 = _d.sent();
                return [2 /*return*/, e_2];
            case 10: return [2 /*return*/];
        }
    });
}); };
var validateRelationSchema = function (model, baseModelName, propertyName) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, entityMetadata, relations, _i, relations_3, relation, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                entityMetadata = appDataSource.getMetadata(model);
                relations = entityMetadata.relations.map(function (relation) {
                    return {
                        propertyName: relation.propertyName,
                        relationType: relation.relationType,
                        className: relation.inverseEntityMetadata.targetName,
                    };
                });
                // const emptyObj: any = { type: "object", properties: {} };
                //3. loop through relations and crate a scheama for each relation entity
                if (relations.length) {
                    for (_i = 0, relations_3 = relations; _i < relations_3.length; _i++) {
                        relation = relations_3[_i];
                        if (baseModelName !== relation.className) { }
                    }
                }
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getFilterSchema = function (model) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var schemaObject, appDataSource, entityMetadata, _a, schemaObject1, relationObject1, validate, valid, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    schemaObject = {
                        type: "object",
                        properties: {},
                        required: [],
                    };
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    appDataSource = _b.sent();
                    entityMetadata = appDataSource.getMetadata(model);
                    return [4 /*yield*/, getWhereSchema(model, entityMetadata.targetName)];
                case 2:
                    _a = _b.sent(), schemaObject1 = _a[0], relationObject1 = _a[1];
                    // schemaObject["properties"]["relations"] = await getRelationSchema(
                    //   model,
                    //   entityMetadata.targetName
                    // );
                    //2. create relation object
                    console.log(JSON.stringify(relationObject1));
                    validate = ajv.compile(schemaObject);
                    valid = validate({
                        relations: {
                            itemDescription: true,
                            itemImage: true
                        }
                    });
                    if (!valid) {
                        throw validate.errors;
                    }
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.status(422).json(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
exports.getFilterSchema = getFilterSchema;
//# sourceMappingURL=getFilterSchema.util.js.map