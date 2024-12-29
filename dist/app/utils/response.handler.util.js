"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
/**
 * Utility class to structure responses
 */
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler(data, error) {
        if (data === void 0) { data = null; }
        if (error === void 0) { error = null; }
        this.data = data;
        this.error = error;
    }
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.handler.util.js.map