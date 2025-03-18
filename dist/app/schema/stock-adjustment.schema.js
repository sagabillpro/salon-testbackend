"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockAdjustmentSchema = void 0;
exports.stockAdjustmentSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            stockId: { type: "integer" },
            quantityAdded: { type: "integer" },
            quantityAddedNew: { type: "integer" },
            quantityAddedVariation: { type: "integer" },
            quantityUvailable: { type: "integer" },
            quantityUvailableNew: { type: "integer" },
            quantityUvailableVariation: { type: "integer" },
            finalVariation: { type: "integer" },
            serviceId: { type: "integer" },
            reason: { type: "string" }
        },
        required: [
            "stockId",
            "quantityAdded",
            "quantityAddedNew",
            "quantityAddedVariation",
            "quantityUvailable",
            "quantityUvailableNew",
            "quantityUvailableVariation",
            "finalVariation",
            "serviceId",
            "reason"
        ],
        additionalProperties: false,
    },
};
//# sourceMappingURL=stock-adjustment.schema.js.map