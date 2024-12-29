"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
exports.LoginSchema = {
    type: "object",
    properties: {
        userName: {
            type: "string",
        },
        password: {
            type: "string",
        },
    },
    required: ["userName", "password"],
    additionalProperties: false,
};
//# sourceMappingURL=login.schema.js.map