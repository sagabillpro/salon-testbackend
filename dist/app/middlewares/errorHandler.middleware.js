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
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
    // Default to 500 Internal Server Error if no status code is provided
    var statusCode = err.statusCode || err.status || 500;
    var message = err.message || "Something went wrong!";
    // Build a response object with error details
    var errorResponse = __assign(__assign({ success: false, message: message }, (err.errors && { errors: err.errors })), (process.env.NODE_ENV === "development" && {
        stack: err.stack
    }));
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
// Usage: Attach this middleware in Express app
// app.use(errorHandler);
//# sourceMappingURL=errorHandler.middleware.js.map