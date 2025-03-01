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
exports.queryBuilder = void 0;
var dbconfig_1 = require("../config/dbconfig");
var typeorm_1 = require("typeorm");
var validate_filter_util_1 = require("./validate-filter.util");
var convertWhereObject = function (where) {
    var result = {};
    //1. return normal properties
    //2. check if we have advanced properties
    for (var _i = 0, _a = Object.entries(where); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (key === "$a") {
            for (var _c = 0, _d = Object.entries(where["$a"]); _c < _d.length; _c++) {
                var _e = _d[_c], key1 = _e[0], value1 = _e[1];
                //1.not equal to operator
                if (key1 === "neq") {
                    for (var _f = 0, _g = Object.entries(where["$a"][key1]); _f < _g.length; _f++) {
                        var _h = _g[_f], level3Key = _h[0], level3Value = _h[1];
                        level3Value ? (result[level3Key] = (0, typeorm_1.Not)(level3Value)) : null;
                    }
                }
                //2. equal to operator
                else if (key1 === "eq") {
                    for (var _j = 0, _k = Object.entries(where["$a"][key1]); _j < _k.length; _j++) {
                        var _l = _k[_j], level3Key = _l[0], level3Value = _l[1];
                        level3Value ? (result[level3Key] = (0, typeorm_1.Equal)(level3Value)) : null;
                    }
                }
                //3. morethan to operator
                else if (key1 === "mt") {
                    for (var _m = 0, _o = Object.entries(where["$a"][key1]); _m < _o.length; _m++) {
                        var _p = _o[_m], level3Key = _p[0], level3Value = _p[1];
                        level3Value ? (result[level3Key] = (0, typeorm_1.MoreThan)(level3Value)) : null;
                    }
                }
                //4. morethan to operator
                else if (key1 === "mte") {
                    for (var _q = 0, _r = Object.entries(where["$a"][key1]); _q < _r.length; _q++) {
                        var _s = _r[_q], level3Key = _s[0], level3Value = _s[1];
                        level3Value
                            ? (result[level3Key] = (0, typeorm_1.MoreThanOrEqual)(level3Value))
                            : null;
                    }
                }
                //5. less than to operator
                else if (key1 === "lt") {
                    for (var _t = 0, _u = Object.entries(where["$a"][key1]); _t < _u.length; _t++) {
                        var _v = _u[_t], level3Key = _v[0], level3Value = _v[1];
                        level3Value ? (result[level3Key] = (0, typeorm_1.LessThan)(level3Value)) : null;
                    }
                }
                //6. less than to operator
                else if (key1 === "lte") {
                    for (var _w = 0, _x = Object.entries(where["$a"][key1]); _w < _x.length; _w++) {
                        var _y = _x[_w], level3Key = _y[0], level3Value = _y[1];
                        level3Value
                            ? (result[level3Key] = (0, typeorm_1.LessThanOrEqual)(level3Value))
                            : null;
                    }
                }
                //7. like operator
                else if (key1 === "like") {
                    for (var _z = 0, _0 = Object.entries(where["$a"][key1]); _z < _0.length; _z++) {
                        var _1 = _0[_z], level3Key = _1[0], level3Value = _1[1];
                        level3Value
                            ? (result[level3Key] = (0, typeorm_1.Like)("%" +
                                "".concat(level3Value).replace(/[.*+?^${}()|[\]\\&%#@!]/g, "") +
                                "%"))
                            : null;
                    }
                }
                //8. ilike operator
                else if (key1 === "like") {
                    for (var _2 = 0, _3 = Object.entries(where["$a"][key1]); _2 < _3.length; _2++) {
                        var _4 = _3[_2], level3Key = _4[0], level3Value = _4[1];
                        level3Value
                            ? (result[level3Key] = (0, typeorm_1.ILike)("%" +
                                "".concat(level3Value).replace(/[.*+?^${}()|[\]\\&%#@!]/g, "") +
                                "%"))
                            : null;
                    }
                }
                //9. in operator
                else if (key1 === "in") {
                    for (var _5 = 0, _6 = Object.entries(where["$a"][key1]); _5 < _6.length; _5++) {
                        var _7 = _6[_5], level3Key = _7[0], level3Value = _7[1];
                        level3Value && Array.isArray(level3Value)
                            ? (result[level3Key] = (0, typeorm_1.In)(level3Value))
                            : null;
                    }
                }
                //10. not in operator
                else if (key1 === "nin") {
                    for (var _8 = 0, _9 = Object.entries(where["$a"][key1]); _8 < _9.length; _8++) {
                        var _10 = _9[_8], level3Key = _10[0], level3Value = _10[1];
                        level3Value && Array.isArray(level3Value)
                            ? (result[level3Key] = (0, typeorm_1.Not)((0, typeorm_1.In)(level3Value)))
                            : null;
                    }
                } //11. between
                else if (key1 === "between") {
                    for (var _11 = 0, _12 = Object.entries(where["$a"][key1]); _11 < _12.length; _11++) {
                        var _13 = _12[_11], level3Key = _13[0], level3Value = _13[1];
                        if (Array.isArray(level3Value) && level3Value.length === 2) {
                            result[level3Key] = (0, typeorm_1.Between)(level3Value[0], level3Value[1]);
                        }
                    }
                }
                //13. null
                else {
                }
            }
        }
        else {
            result[key] = value;
        }
    }
    return result;
};
var createSelectObject = function (obj, name) {
    var _a, _b, _c;
    var selectObj = {};
    var relationObj = {};
    var whereObj = {};
    var orderObj = {};
    if (obj === null || obj === void 0 ? void 0 : obj.fields) {
        selectObj = obj === null || obj === void 0 ? void 0 : obj.fields;
    }
    if (obj === null || obj === void 0 ? void 0 : obj.order) {
        orderObj = obj === null || obj === void 0 ? void 0 : obj.order;
    }
    if (obj.where) {
        //convert where object here
        whereObj = convertWhereObject(obj.where);
    }
    if (obj === null || obj === void 0 ? void 0 : obj.relations) {
        for (var _i = 0, _d = obj === null || obj === void 0 ? void 0 : obj.relations; _i < _d.length; _i++) {
            var relation = _d[_i];
            if (relation.name && (relation === null || relation === void 0 ? void 0 : relation.fields)) {
                relationObj[relation.name] = true;
                var _e = createSelectObject(relation, relation.name), resposelect = _e[0], respoRelation = _e[1], respoWhere = _e[2], respoOrder = _e[3];
                //add relation object
                relationObj[relation.name] = Object.keys(respoRelation).length
                    ? respoRelation
                    : true;
                //add select object
                if ((_a = Object.keys(resposelect)) === null || _a === void 0 ? void 0 : _a.length) {
                    selectObj[relation.name] = resposelect;
                }
                //add where object
                if ((_b = Object.keys(respoWhere)) === null || _b === void 0 ? void 0 : _b.length) {
                    whereObj[relation.name] = respoWhere;
                }
                //add where object
                if ((_c = Object.keys(respoOrder)) === null || _c === void 0 ? void 0 : _c.length) {
                    orderObj[relation.name] = respoOrder;
                }
            }
        }
    }
    return [selectObj, relationObj, whereObj, orderObj];
};
var queryBuilder = function (query, model) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, entityMetadata, resultMapping, finalFilter, _a, select, relations, where, order;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _b.sent();
                entityMetadata = appDataSource.getMetadata(model);
                resultMapping = {};
                resultMapping["baseModel"] = entityMetadata.targetName;
                entityMetadata.relations.forEach(function (relation) {
                    resultMapping[relation.propertyName] =
                        relation.inverseEntityMetadata.targetName;
                });
                return [4 /*yield*/, (0, validate_filter_util_1.sanitizeFilterObject)(query, resultMapping)];
            case 2:
                finalFilter = _b.sent();
                _a = createSelectObject(finalFilter), select = _a[0], relations = _a[1], where = _a[2], order = _a[3];
                return [2 /*return*/, __assign(__assign(__assign(__assign(__assign(__assign({}, (Object.keys(select).length ? { select: select } : {})), (Object.keys(relations).length ? { relations: relations } : {})), (Object.keys(where).length ? { where: where } : {})), (Object.keys(order).length ? { order: order } : {})), (query.skip ? { skip: query.skip } : {})), (query.limit ? { take: query.limit } : {}))];
        }
    });
}); };
exports.queryBuilder = queryBuilder;
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
//# sourceMappingURL=query-builder.js.map