"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequest = void 0;
var ajv_1 = __importDefault(require("ajv"));
var ajv_formats_1 = __importDefault(require("ajv-formats"));
var ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
var checkRequest = function (schema) {
    return function (req, res, next) {
        try {
            var validate = ajv.compile(schema);
            var valid = validate(req.body);
            if (!valid) {
                throw validate.errors;
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(422).json(error);
        }
    };
};
exports.checkRequest = checkRequest;
//# sourceMappingURL=checkRequest.middleware.js.map