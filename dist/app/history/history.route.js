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
var express_1 = require("express");
var entity_route_mapping_1 = require("./mappings/entity-route.mapping");
var validate_filter_util_1 = require("../utils/validate-filter.util");
var dbconfig_1 = require("../config/dbconfig");
var get_query_util_1 = __importDefault(require("../utils/get-query.util"));
var routes_types_1 = require("../routes/routes.types");
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
                    // Handle errors by sending a 500 status and error message
                    res
                        .status(500)
                        .json({ message: "Error fetching DescriptionType", error: error_1 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
// Loop through each entry in the routeToEntityMap
for (var _i = 0, _a = Object.entries(entity_route_mapping_1.routeToEntityMap); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    _loop_1(key, value);
}
exports.default = new routes_types_1.Route("/history", router);
//# sourceMappingURL=history.route.js.map