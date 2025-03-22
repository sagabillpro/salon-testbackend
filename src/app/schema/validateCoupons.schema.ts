import { JSONSchemaType } from "ajv";

export const ValidateCouponSchema: JSONSchemaType<{
  customerId: number;
  code: string;
}> = {
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
