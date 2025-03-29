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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var get_object_code_util_1 = require("../../utils/get-object-code.util");
var dbconfig_1 = require("../../config/dbconfig");
var entities_1 = require("../general-data/entities");
var user_repo_1 = __importDefault(require("./user.repo"));
var user_entity_1 = require("./entities/user.entity");
var services_1 = require("../../services");
var user_sessions_entity_1 = require("./entities/user-sessions.entity");
var usermenufeaturemap_entity_1 = require("../features/entities/usermenufeaturemap.entity");
//1. find multiple records
var find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, user_repo_1.default)()];
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
                return [4 /*yield*/, (0, user_repo_1.default)()];
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
    var dataSource, userTypeRepo, userType, repo, hashedPassword, respo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                userTypeRepo = dataSource.getRepository(entities_1.DUserType);
                return [4 /*yield*/, userTypeRepo.findOne({
                        where: {
                            id: data.userType.id,
                        },
                    })];
            case 2:
                userType = _a.sent();
                if (!userType) {
                    throw {
                        message: "Record not found with id: " + data.userType.id,
                        statusCode: 404,
                    };
                }
                return [4 /*yield*/, (0, user_repo_1.default)()];
            case 3:
                repo = _a.sent();
                return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(18, data)];
            case 4:
                data = _a.sent();
                return [4 /*yield*/, (0, services_1.hashPassword)(data.password)];
            case 5:
                hashedPassword = _a.sent();
                respo = repo.create(__assign(__assign({}, data), { password: hashedPassword, userType: userType }));
                return [2 /*return*/, respo];
            case 6:
                error_3 = _a.sent();
                throw error_3;
            case 7: return [2 /*return*/];
        }
    });
}); };
//4. create record in bulk
var createBulk = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var response_1, dataSource, repo_1, respo, respo, userTypeRepo, userMenusAndFeaturesRepo, userType_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                response_1 = new user_entity_1.Users();
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                return [4 /*yield*/, (0, user_repo_1.default)()];
            case 2:
                repo_1 = _a.sent();
                if (!data.id) return [3 /*break*/, 4];
                return [4 /*yield*/, repo_1.find({
                        where: {
                            userName: data.userName,
                            id: (0, typeorm_1.Not)(data.id),
                        },
                    })];
            case 3:
                respo = _a.sent();
                // 4. If user already exists, throw an error with status code 409 (Conflict)
                if (respo.length) {
                    throw {
                        message: "User with this user name already exists.",
                        statusCode: 409,
                    };
                }
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, repo_1.find({
                    where: {
                        userName: data.userName,
                    },
                })];
            case 5:
                respo = _a.sent();
                // 4. If user already exists, throw an error with status code 409 (Conflict)
                if (respo.length) {
                    throw {
                        message: "User with this user name already exists.",
                        statusCode: 409,
                    };
                }
                _a.label = 6;
            case 6:
                userTypeRepo = dataSource.getRepository(entities_1.DUserType);
                userMenusAndFeaturesRepo = dataSource.getRepository(usermenufeaturemap_entity_1.UserMenusAndFeatures);
                return [4 /*yield*/, userTypeRepo.findOne({
                        where: {
                            id: data.userTypeId,
                        },
                    })];
            case 7:
                userType_1 = _a.sent();
                // 7. If userType ID is invalid, throw an error with status code 404 (Not Found)
                if (!userType_1) {
                    throw {
                        message: "Record not found with id: " + data.userType.id,
                        statusCode: 404,
                    };
                }
                // 8. Start a database transaction with SERIALIZABLE isolation level
                return [4 /*yield*/, dataSource.manager.transaction("SERIALIZABLE", function (transactionalEntityManager) { return __awaiter(void 0, void 0, void 0, function () {
                        var hashedPassword, userMenusAndFeatures, headerWithoutLines, currentUser, userMenusAndFeaturesNew;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!data.id) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(18, data)];
                                case 1:
                                    data = _a.sent();
                                    _a.label = 2;
                                case 2:
                                    hashedPassword = "";
                                    if (!!data.id) return [3 /*break*/, 4];
                                    return [4 /*yield*/, (0, services_1.hashPassword)(data.password)];
                                case 3:
                                    hashedPassword = _a.sent();
                                    _a.label = 4;
                                case 4:
                                    userMenusAndFeatures = data.userMenusAndFeatures, headerWithoutLines = __rest(data, ["userMenusAndFeatures"]);
                                    if (!!data.id) return [3 /*break*/, 5];
                                    headerWithoutLines = transactionalEntityManager.create(user_entity_1.Users, __assign(__assign({}, headerWithoutLines), { password: hashedPassword, userType: userType_1 }));
                                    return [3 /*break*/, 9];
                                case 5: return [4 /*yield*/, repo_1.findOne({
                                        where: {
                                            id: data.id,
                                        },
                                    })];
                                case 6:
                                    currentUser = _a.sent();
                                    // 7. If userType ID is invalid, throw an error with status code 404 (Not Found)
                                    if (!currentUser) {
                                        throw {
                                            message: "Record not found with id: " + data.id,
                                            statusCode: 404,
                                        };
                                    }
                                    if (!(data.password != "")) return [3 /*break*/, 8];
                                    return [4 /*yield*/, (0, services_1.hashPassword)(data.password)];
                                case 7:
                                    hashedPassword = _a.sent();
                                    _a.label = 8;
                                case 8:
                                    headerWithoutLines = __assign(__assign({}, headerWithoutLines), (data.password != ""
                                        ? { password: hashedPassword }
                                        : { password: currentUser.password }));
                                    _a.label = 9;
                                case 9:
                                    userMenusAndFeaturesNew = [];
                                    return [4 /*yield*/, transactionalEntityManager.save(user_entity_1.Users, headerWithoutLines)];
                                case 10:
                                    response_1 = _a.sent();
                                    // 13. Iterate over userMenusAndFeatures data and create instances
                                    userMenusAndFeatures === null || userMenusAndFeatures === void 0 ? void 0 : userMenusAndFeatures.forEach(function (value, index) {
                                        var userMenusAndFeaturesInstance = new usermenufeaturemap_entity_1.UserMenusAndFeatures();
                                        userMenusAndFeaturesInstance = __assign(__assign({}, value), { userId: response_1.id });
                                        userMenusAndFeaturesNew.push(userMenusAndFeaturesInstance);
                                    });
                                    // 14. Assign the userMenusAndFeatures array to the user entry
                                    // 15. Save the new user entry into the database
                                    return [4 /*yield*/, transactionalEntityManager.save(usermenufeaturemap_entity_1.UserMenusAndFeatures, userMenusAndFeaturesNew ? userMenusAndFeaturesNew : [])];
                                case 11:
                                    // 14. Assign the userMenusAndFeatures array to the user entry
                                    // 15. Save the new user entry into the database
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 8:
                // 8. Start a database transaction with SERIALIZABLE isolation level
                _a.sent();
                // 16. Return the created user data
                return [2 /*return*/, data];
            case 9:
                error_4 = _a.sent();
                // 17. Throw the error to be handled by the caller
                throw error_4;
            case 10: return [2 /*return*/];
        }
    });
}); };
//4. update single record by id
var updateById = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, userTypeRepo, userType, repo, respo, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                userTypeRepo = dataSource.getRepository(entities_1.DUserType);
                return [4 /*yield*/, userTypeRepo.findOne({
                        where: {
                            id: data.userType.id,
                        },
                    })];
            case 2:
                userType = _a.sent();
                if (!userType) {
                    throw {
                        message: "Record not found with id: " + data.userType.id,
                        statusCode: 404,
                    };
                }
                return [4 /*yield*/, (0, user_repo_1.default)()];
            case 3:
                repo = _a.sent();
                respo = repo.updateById(id, __assign(__assign({}, data), { userType: userType }));
                return [2 /*return*/, respo];
            case 4:
                error_5 = _a.sent();
                throw error_5;
            case 5: return [2 /*return*/];
        }
    });
}); };
//5. delete single record by id
var deleteById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, user_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [4 /*yield*/, repo.deleteById(id)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                throw error_6;
            case 4: return [2 /*return*/];
        }
    });
}); };
//6. user login
var login = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, userSessionRepo, repo, foundUser, verfied, accessToken, refreshTokenToken, currentDate, userSession;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _b.sent();
                userSessionRepo = dataSource.getRepository(user_sessions_entity_1.UserSessions);
                return [4 /*yield*/, (0, user_repo_1.default)()];
            case 2:
                repo = _b.sent();
                return [4 /*yield*/, repo.findOne({
                        where: {
                            userName: data.userName,
                            isInactive: 0,
                            company: {
                                isInactive: 0,
                            },
                        },
                        relations: {
                            userType: true,
                            company: true,
                        },
                        select: {
                            company: {
                                name: true,
                                id: true,
                                upiId: true,
                                stateId: true,
                                taxId: true,
                                isInactive: true,
                            },
                        },
                    })];
            case 3:
                foundUser = _b.sent();
                if (!foundUser) return [3 /*break*/, 8];
                if (foundUser.isInactive) {
                    throw { message: "Your account has been deactivated by the admin. Please contact support for assistance.", statusCode: 401 };
                }
                if ((_a = foundUser === null || foundUser === void 0 ? void 0 : foundUser.company) === null || _a === void 0 ? void 0 : _a.isInactive) {
                    throw { message: "Your company has been deactivated by the admin. Please contact support for assistance.", statusCode: 401 };
                }
                return [4 /*yield*/, (0, services_1.comparePassword)(data.password, foundUser === null || foundUser === void 0 ? void 0 : foundUser.password)];
            case 4:
                verfied = _b.sent();
                if (!verfied) return [3 /*break*/, 6];
                accessToken = (0, services_1.generateAccessToken)({
                    userId: foundUser.id,
                    companyId: foundUser.companyId,
                    companyName: foundUser.company.name,
                    upiId: foundUser.company.upiId,
                    stateId: foundUser.company.stateId,
                    taxId: foundUser.company.taxId,
                    userName: foundUser.userName,
                    email: foundUser.email,
                    userType: foundUser.userType,
                });
                refreshTokenToken = (0, services_1.generateRefreshToken)({
                    userId: foundUser.id,
                    companyId: foundUser.companyId,
                    companyName: foundUser.company.name,
                    upiId: foundUser.company.upiId,
                    stateId: foundUser.company.stateId,
                    taxId: foundUser.company.taxId,
                    userName: foundUser.userName,
                    email: foundUser.email,
                    userType: foundUser.userType,
                });
                currentDate = new Date().toISOString();
                userSession = userSessionRepo.create({
                    user: foundUser,
                    token: refreshTokenToken,
                    createdDate: currentDate,
                    isInactive: 0,
                    modifiedDate: currentDate,
                });
                return [4 /*yield*/, userSessionRepo.save(userSession)];
            case 5:
                _b.sent();
                //4. send accessToken and refreshToken in response
                return [2 /*return*/, {
                        refreshTokenToken: refreshTokenToken,
                        accessToken: accessToken,
                    }];
            case 6: throw { message: "Invalid password !", statusCode: 401 };
            case 7: return [3 /*break*/, 9];
            case 8: throw { message: "User not found", statusCode: 404 };
            case 9: return [2 /*return*/];
        }
    });
}); };
//6. user login
var logout = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, userSessionRepo, userData, foundSession, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                userSessionRepo = dataSource.getRepository(user_sessions_entity_1.UserSessions);
                userData = (0, services_1.verifyToken)(data.token);
                if (!userData) return [3 /*break*/, 5];
                return [4 /*yield*/, userSessionRepo.findOne({
                        where: {
                            token: data.token,
                            isInactive: 0,
                            user: {
                                id: userData === null || userData === void 0 ? void 0 : userData.userId,
                            },
                        },
                    })];
            case 2:
                foundSession = _a.sent();
                if (!foundSession) return [3 /*break*/, 4];
                //make session inactive
                return [4 /*yield*/, userSessionRepo.save(__assign(__assign({}, foundSession), { isInactive: 1 }))];
            case 3:
                //make session inactive
                _a.sent();
                return [2 /*return*/, { status: 200, message: "user logged out succesfully..." }];
            case 4: throw {
                message: "Active Session not found for this user",
                statusCode: 404,
            };
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                throw err_1;
            case 7: return [2 /*return*/];
        }
    });
}); };
//6. user login
var generateNewAccessToken = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSource, userSessionRepo, userData, foundSession, accessToken, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                userSessionRepo = dataSource.getRepository(user_sessions_entity_1.UserSessions);
                userData = (0, services_1.verifyToken)(data.token);
                if (!userData) return [3 /*break*/, 3];
                return [4 /*yield*/, userSessionRepo.findOne({
                        where: {
                            token: data.token,
                            isInactive: 0,
                            user: {
                                id: userData === null || userData === void 0 ? void 0 : userData.userId,
                            },
                        },
                    })];
            case 2:
                foundSession = _a.sent();
                if (foundSession) {
                    accessToken = (0, services_1.generateAccessToken)({
                        userId: userData.userId,
                        companyId: userData.companyId,
                        upiId: userData.upiId,
                        stateId: userData.stateId,
                        taxId: userData.taxId,
                        companyName: userData.companyName,
                        userName: userData.userName,
                        email: userData.email,
                        userType: userData.userType,
                    });
                    return [2 /*return*/, { accessToken: accessToken }];
                }
                else {
                    throw {
                        message: "Active Session not found for this user",
                        statusCode: 404,
                    };
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                throw err_2;
            case 5: return [2 /*return*/];
        }
    });
}); };
//6. user login
var decodedToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, userData, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authHeader = req.headers["authorization"];
                token = authHeader && authHeader.split(" ")[1];
                if (!token) {
                    return [2 /*return*/, res.status(401).json({ message: "Access Token Required" })];
                }
                return [4 /*yield*/, (0, services_1.verifyToken)(token)];
            case 1:
                userData = _a.sent();
                return [2 /*return*/, userData];
            case 2:
                err_3 = _a.sent();
                throw err_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    find: find,
    findById: findById,
    create: create,
    deleteById: deleteById,
    updateById: updateById,
    login: login,
    generateNewAccessToken: generateNewAccessToken,
    logout: logout,
    createBulk: createBulk,
    decodedToken: decodedToken,
};
//# sourceMappingURL=user.service.js.map