export const PurchaseHeadersSchema: any = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    code: {
      type: "string",
    },
    description: {
      type: "string",
    },
    txnDate: {
      type: "string",
    },
    subTotal: {
      type: "number", // Changed to number for decimals
    },
    grandTotal: {
      type: "number", // Changed to number for decimals
    },
    totalDiscount: {
      type: "number", // Changed to number for decimals
    },
    totalTax: {
      type: "number", // Changed to number for decimals
    },
    createdDate: {
      type: "string",
      format: "date-time",
    },
    modifiedDate: {
      type: "string",
      format: "date-time",
    },
    saleInvoiceNumber: {
      type: "string",
    },
    supplier: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
      required: ["id", "name"],
      additionalProperties: false,
    },
    supplierId: {
      type: "integer",
    },
    userId: {
      type: "integer",
    },
    paymentTypeId: {
      type: "integer",
    },
    purchaseLines: {
      type: "array",
      items: {
        type: "object",
        properties: {
          txnHeader: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
            },
            required: ["id"],
            additionalProperties: false,
          },
          service: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              name: {
                type: "string",
              },
            },
            required: ["id", "name"],
            additionalProperties: false,
          },
          tax: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              percentage: {
                type: "number", // Changed to number for decimals (if needed)
              },
            },
            required: ["id", "name"],
            additionalProperties: false,
          },
          id: {
            type: "integer",
          },
          amount: {
            type: "number", // Changed to number for decimals
          },
          quantity: {
            type: "integer",
          },
          unitPrice: {
            type: "number",
          },
          costPrice: {
            type: "number", // Changed to number for decimals
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
          uomId: { type: "number" },
          discountAmount: {
            type: "number", // Changed to number for decimals
          },
          taxAmount: {
            type: "number", // Changed to number for decimals
          },
          rate: {
            type: "number", // Changed to number for decimals
          },
          createdDate: {
            type: "string",
            format: "date-time",
          },
          modifiedDate: {
            type: "string",
            format: "date-time",
          },
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
    "supplier",
    "userId",
    "paymentTypeId",
    "purchaseLines",
    "subTotal",
    "grandTotal",
    "totalDiscount",
    "totalTax",
  ],
  additionalProperties: false,
};
