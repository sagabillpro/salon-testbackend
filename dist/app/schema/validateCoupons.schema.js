"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCouponSchema = void 0;
exports.ValidateCouponSchema = {
    type: "object",
    properties: {
        customerId: {
            type: "number",
        },
        code: {
            type: "string",
        },
    },
    required: ["code", "customerId"],
    additionalProperties: false,
};
//# sourceMappingURL=validateCoupons.schema.js.map