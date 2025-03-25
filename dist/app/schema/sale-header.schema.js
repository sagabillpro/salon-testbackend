"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleHeadersSchema = void 0;
exports.SaleHeadersSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        code: { type: "string" },
        description: { type: "string" },
        txnDate: { type: "string" },
        subTotal: { type: "number" }, // changed from integer
        grandTotal: { type: "number" }, // changed from integer
        totalDiscount: { type: "number" }, // changed from integer
        totalTax: { type: "number" }, // changed from integer
        isInactive: { type: "integer" },
        createdDate: { type: "string", format: "date-time" },
        modifiedDate: { type: "string", format: "date-time" },
        customerId: { type: "integer" },
        userId: { type: "integer" },
        couponId: { type: "integer" },
        isService: { type: "integer" },
        paymentTypeId: { type: "integer" },
        saleLines: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    txnHeader: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                    service: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                        },
                        required: ["id", "name"],
                        additionalProperties: false,
                    },
                    tax: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            percentage: { type: "number" }, // changed from integer if decimals are possible
                        },
                        required: ["id", "name"],
                        additionalProperties: false,
                    },
                    uom: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                        },
                        required: ["id", "name"],
                        additionalProperties: false,
                    },
                    id: { type: "integer" },
                    amount: { type: "number" }, // changed from integer
                    unitPrice: { type: "number" },
                    uomId: { type: "number" },
                    quantity: { type: "integer" },
                    isService: { type: "integer" },
                    costPrice: { type: "integer" },
                    discountAmount: { type: "number" }, // changed from integer
                    taxAmount: { type: "number" }, // changed from integer
                    rate: { type: "number" }, // changed from integer
                    createdDate: { type: "string", format: "date-time" },
                    modifiedDate: { type: "string", format: "date-time" },
                },
                required: [
                    "service",
                    "amount",
                    "createdDate",
                    "modifiedDate",
                    "tax",
                    "quantity",
                    "rate",
                ],
                additionalProperties: false,
            },
        },
    },
    required: [
        "txnDate",
        "grandTotal",
        "createdDate",
        "modifiedDate",
        "customerId",
        "userId",
        "paymentTypeId",
        "saleLines",
        "isService",
    ],
    additionalProperties: false,
};
//# sourceMappingURL=sale-header.schema.js.map