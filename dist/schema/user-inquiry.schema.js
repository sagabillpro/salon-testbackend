"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInquiry = void 0;
exports.UserInquiry = {
    type: "object",
    properties: {
        name: { type: "string", nullable: false },
        email: { type: "string", nullable: false },
        mobile: { type: "string", nullable: false },
        message: { type: "string", nullable: false },
    },
    required: ["name", "email", "mobile", "message"],
    additionalProperties: false,
};
//# sourceMappingURL=user-inquiry.schema.js.map