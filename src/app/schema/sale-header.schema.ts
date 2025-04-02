export const SaleHeadersSchema: any = {
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
    customer: {
      type: "object",
      properties: {
        id: { type: "integer" },
        // name: { type: "string" },
      },
      //  required: ["id", "name"],
      additionalProperties: false,
    },
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
          taxGroupComponents: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  minimum: 1,
                },
                name: {
                  type: "string",
                  minLength: 1,
                },
                percentage: {
                  type: "number",
                  minimum: 0,
                  maximum: 100,
                },
                taxAmount: {
                  type: "number",
                  minimum: 0,
                },
              },
              required: ["id", "name", "percentage", "taxAmount"],
              additionalProperties: false,
            },
          },
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
          taxGroup: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              rate: { type: "number" }, // changed from integer if decimals are possible
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
          "taxGroupComponents",
          "service",
          "amount",
          "createdDate",
          "modifiedDate",
          "taxGroup",
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
    "customer",
    "userId",
    "paymentTypeId",
    "saleLines",
    "isService",
  ],
  additionalProperties: false,
};
