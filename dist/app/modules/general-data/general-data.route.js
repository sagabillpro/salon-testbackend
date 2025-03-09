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
var express_1 = require("express");
var modeltoroutemapping_mapping_1 = require("./mappings/modeltoroutemapping.mapping");
var dbconfig_1 = require("../../config/dbconfig");
var validate_filter_util_1 = require("../../utils/validate-filter.util");
var get_query_util_1 = __importDefault(require("../../utils/get-query.util"));
var routes_types_1 = require("../../routes/routes.types");
var entities_1 = require("./entities");
var authenticate_middleware_1 = __importDefault(require("../../middlewares/authenticate.middleware"));
var services_entity_1 = require("../services/entities/services.entity");
var usermenufeaturemap_service_1 = __importDefault(require("../features/usermenufeaturemap.service"));
var get_model_schema_util_1 = require("../../utils/get-model-schema.util");
var router = (0, express_1.Router)();
var _loop_1 = function (key, value) {
    // Define a GET route for each key in the map
    router.get(key, (0, validate_filter_util_1.validateFilter)(value), // Apply the validateFilter middleware
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var appDataSource, repository, data, _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    appDataSource = _c.sent();
                    repository = appDataSource.getRepository(value);
                    _b = (_a = repository).find;
                    return [4 /*yield*/, (0, get_query_util_1.default)(req, value)];
                case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 3:
                    data = _c.sent();
                    // Send the fetched data as a JSON response with status 200
                    res.status(200).json(data);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    console.log(error_1);
                    // Handle errors by sending a 500 status and error message
                    res
                        .status(500)
                        .json({ message: "Error fetching DescriptionType", error: error_1 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    // Define a POST route for each key in the map
    router.post(key, (0, get_model_schema_util_1.validateRequestBody)(value), // Apply the validateRequestBody middleware
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var appDataSource, repository, data, respo, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 1:
                    appDataSource = _a.sent();
                    repository = appDataSource.getRepository(value);
                    data = repository.create(req.body);
                    return [4 /*yield*/, repository.save(data)];
                case 2:
                    respo = _a.sent();
                    // Send the saved entity as a JSON response with status 200
                    res.status(200).json(respo);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    // Handle errors by sending a 500 status and error message
                    res
                        .status(500)
                        .json({ message: "Error fetching DescriptionType", error: error_2 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
// Loop through each entry in the routeToEntityMap
for (var _i = 0, _a = Object.entries(modeltoroutemapping_mapping_1.routeToEntityMap); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    _loop_1(key, value);
}
router.get("/menu-headers", authenticate_middleware_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, appDataSource, repository, data, respo, _i, data_1, menu, level1, _a, _b, feature, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                user = req.user;
                if (!user.userType) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _c.sent();
                repository = appDataSource.getRepository(entities_1.Menus);
                return [4 /*yield*/, repository.find({
                        relations: {
                            entities: true,
                        },
                        where: {
                            entities: {
                                isInactive: 0,
                            },
                        },
                    })];
            case 2:
                data = _c.sent();
                respo = [];
                for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                    menu = data_1[_i];
                    level1 = [];
                    for (_a = 0, _b = menu.entities; _a < _b.length; _a++) {
                        feature = _b[_a];
                        //1.send all menus for admin
                        if (user.userType.id === 1) {
                            level1.push({
                                title: feature.displayName,
                                url: feature.route,
                            });
                        }
                        //2.restrict menus for normal user
                        if (!feature.isAdminMenu && user.userType.id != 1) {
                            level1.push({
                                title: feature.displayName,
                                url: feature.route,
                            });
                        }
                    }
                    level1.length &&
                        respo.push({
                            title: menu.name,
                            url: "#",
                            icon: menu.icon,
                            subItems: level1,
                        });
                }
                res.status(200).json(respo);
                return [3 /*break*/, 4];
            case 3: throw {
                message: "No metadata found for given user..",
                statusCode: 401,
            };
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _c.sent();
                console.log(error_3);
                res.status(500).json({ message: "Error fetching menus", error: error_3 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//2. get model properties
function capitalizeFirstLetter(str) {
    if (!str)
        return str; // Handle empty or null strings
    return str.charAt(0).toUpperCase() + str.slice(1);
}
router.get("/get-schema", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skip_1, result_1, appDataSource, entityMetadata, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                skip_1 = ["id", "modifiedDate", "createdDate"];
                result_1 = {
                    menuId: 16,
                    postUrl: "/service-sessions",
                    buttonName: "Service Sessions",
                    sheetTitle: "Start New Session",
                    sheetDescription: "",
                    fields: [],
                };
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                entityMetadata = appDataSource.getMetadata(services_entity_1.Services);
                entityMetadata.ownColumns.forEach(function (column) {
                    if (!skip_1.includes(column.propertyName)) {
                        result_1.fields.push(__assign({ label: capitalizeFirstLetter(column.propertyName), name: column === null || column === void 0 ? void 0 : column.propertyName, type: column.type === "varchar" ? "text" : column.type, required: !column.isNullable, error: "".concat(capitalizeFirstLetter(column.propertyName), " field is required") }, (column.type === "varchar"
                            ? {
                                validations: [
                                    {
                                        min: 3,
                                        message: "Should have min 3 characters",
                                    },
                                    {
                                        max: 100,
                                        message: "Should not have more than 100 characters",
                                    },
                                ],
                            }
                            : {})));
                    }
                });
                // console.log(entityMetadata.relations);
                // entityMetadata.relations.forEach((column) => {
                //   if (column.relationType === "many-to-one") {
                //     result.fields.push({
                //       label: capitalizeFirstLetter(column.propertyName),
                //       name: column?.propertyName,
                //       type: "number",
                //       required: true,
                //       error: `${capitalizeFirstLetter(
                //         column.propertyName
                //       )} field is required`,
                //     });
                //   }
                // });
                res.send(result_1);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//updated route to get menus for user
router.get("/menu-headers-new", authenticate_middleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, appDataSource, repository, mappingObj_1, userData, data, respo, _i, data_2, menu, level1, _a, _b, entity, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                user = req.user;
                if (!user.userType) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _c.sent();
                repository = appDataSource.getRepository(entities_1.Menus);
                mappingObj_1 = {};
                return [4 /*yield*/, usermenufeaturemap_service_1.default.find({
                        relations: {
                            user: true,
                            entity: true,
                            feature: true,
                        },
                        select: {
                            user: {
                                id: true,
                                name: true,
                            },
                            entity: {
                                id: true,
                            },
                            feature: {
                                id: true,
                            },
                        },
                        where: {
                            user: {
                                id: user.userId,
                            },
                            feature: {
                                id: 5,
                            },
                        },
                    })];
            case 2:
                userData = _c.sent();
                //create mapping object
                userData.forEach(function (element) {
                    var _a;
                    if (((_a = element === null || element === void 0 ? void 0 : element.feature) === null || _a === void 0 ? void 0 : _a.id) === 5 && element.isActive === 1) {
                        // Set the feature ID to true in the mapping object for the current entity ID
                        mappingObj_1[element.entity.id] = true;
                    }
                });
                return [4 /*yield*/, repository.find({
                        relations: {
                            entities: true,
                        },
                        where: {
                            entities: {
                                isInactive: 0,
                            },
                        },
                    })];
            case 3:
                data = _c.sent();
                respo = [];
                for (_i = 0, data_2 = data; _i < data_2.length; _i++) {
                    menu = data_2[_i];
                    level1 = [];
                    for (_a = 0, _b = menu.entities; _a < _b.length; _a++) {
                        entity = _b[_a];
                        //1.send all menus for admin
                        if (false) {
                            //ad condition which will check for SAGA User and show all menus
                        }
                        if (mappingObj_1[entity.id]) {
                            level1.push({
                                title: entity.displayName,
                                url: entity.route,
                            });
                        }
                    }
                    level1.length &&
                        respo.push({
                            title: menu.name,
                            url: "#",
                            icon: menu.icon,
                            subItems: level1,
                        });
                }
                res.status(200).json(respo);
                return [3 /*break*/, 5];
            case 4: throw {
                message: "No metadata found for given user..",
                statusCode: 401,
            };
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _c.sent();
                console.log(error_5);
                res.status(500).json({ message: "Error fetching menus", error: error_5 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
//get object for user menus and screens
router.get("/get-user-features", authenticate_middleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, mappingObj_2, userData, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                mappingObj_2 = {};
                return [4 /*yield*/, usermenufeaturemap_service_1.default.find({
                        relations: {
                            user: true,
                            entity: true,
                            feature: true,
                        },
                        select: {
                            user: {
                                id: true,
                                name: true,
                            },
                            entity: {
                                id: true,
                            },
                            feature: {
                                id: true,
                            },
                        },
                        where: {
                            user: {
                                id: user.userId,
                            },
                        },
                    })];
            case 1:
                userData = _a.sent();
                //create mapping object
                userData.forEach(function (element) {
                    if (!mappingObj_2[element.entity.id]) {
                        mappingObj_2[element.entity.id] = {};
                    }
                    mappingObj_2[element.entity.id][element.feature.id] = true;
                });
                res.status(200).json(mappingObj_2);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                res.status(500).json({ message: "Error fetching menus", error: error_6 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = new routes_types_1.Route("", router);
//# sourceMappingURL=general-data.route.js.map