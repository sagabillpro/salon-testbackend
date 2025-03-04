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
    var dataSource, repo_1, respo, respo, userTypeRepo, userType_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
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
                return [4 /*yield*/, userTypeRepo.findOne({
                        where: {
                            id: data.userType.id,
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
                        var hashedPassword, headerEntry, currentUser, userMenusAndFeatures;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(18, data)];
                                case 1:
                                    // 9. Generate a unique code for the user
                                    data = _a.sent();
                                    hashedPassword = "";
                                    if (!(data.password != "")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (0, services_1.hashPassword)(data.password)];
                                case 2:
                                    hashedPassword = _a.sent();
                                    _a.label = 3;
                                case 3:
                                    headerEntry = new user_entity_1.Users();
                                    if (!(!data.id || (data.id && data.password != ""))) return [3 /*break*/, 4];
                                    headerEntry = transactionalEntityManager.create(user_entity_1.Users, __assign(__assign({}, data), { password: hashedPassword, userType: userType_1 }));
                                    return [3 /*break*/, 6];
                                case 4:
                                    console.log("inside thsi ....");
                                    return [4 /*yield*/, repo_1.findOne({
                                            where: {
                                                id: data.id,
                                            },
                                        })];
                                case 5:
                                    currentUser = _a.sent();
                                    // 7. If userType ID is invalid, throw an error with status code 404 (Not Found)
                                    if (!currentUser) {
                                        throw {
                                            message: "Record not found with id: " + data.id,
                                            statusCode: 404,
                                        };
                                    }
                                    headerEntry = __assign(__assign({}, data), { password: currentUser.password });
                                    _a.label = 6;
                                case 6:
                                    userMenusAndFeatures = [];
                                    // 13. Iterate over userMenusAndFeatures data and create instances
                                    data.userMenusAndFeatures.forEach(function (value, index) {
                                        var userMenusAndFeaturesInstance = new usermenufeaturemap_entity_1.UserMenusAndFeatures();
                                        userMenusAndFeaturesInstance = __assign({}, value);
                                        userMenusAndFeatures.push(userMenusAndFeaturesInstance);
                                        // return userMenusAndFeaturesInstance;
                                    });
                                    // 14. Assign the userMenusAndFeatures array to the user entry
                                    headerEntry.userMenusAndFeatures = userMenusAndFeatures;
                                    // 15. Save the new user entry into the database
                                    console.log("headerEntry", headerEntry);
                                    return [4 /*yield*/, transactionalEntityManager.save(user_entity_1.Users, headerEntry)];
                                case 7:
                                    data = _a.sent();
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
                _a.trys.push([0, 5, , 6]);
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
                return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(14, data)];
            case 4:
                data = _a.sent();
                respo = repo.updateById(id, __assign(__assign({}, data), { userType: userType }));
                return [2 /*return*/, respo];
            case 5:
                error_5 = _a.sent();
                throw error_5;
            case 6: return [2 /*return*/];
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
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                dataSource = _a.sent();
                userSessionRepo = dataSource.getRepository(user_sessions_entity_1.UserSessions);
                return [4 /*yield*/, (0, user_repo_1.default)()];
            case 2:
                repo = _a.sent();
                return [4 /*yield*/, repo.findOne({
                        where: {
                            userName: data.userName,
                        },
                        relations: {
                            userType: true,
                        },
                    })];
            case 3:
                foundUser = _a.sent();
                if (!foundUser) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, services_1.comparePassword)(data.password, foundUser === null || foundUser === void 0 ? void 0 : foundUser.password)];
            case 4:
                verfied = _a.sent();
                if (!verfied) return [3 /*break*/, 6];
                accessToken = (0, services_1.generateAccessToken)({
                    userId: foundUser.id,
                    userName: foundUser.userName,
                    email: foundUser.email,
                    userType: foundUser.userType,
                });
                refreshTokenToken = (0, services_1.generateRefreshToken)({
                    userId: foundUser.id,
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
                _a.sent();
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
};
//# sourceMappingURL=user.service.js.map