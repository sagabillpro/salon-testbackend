import { JSONSchemaType } from "ajv";
import { Item } from "../modules/items/entities/items.entity";
export const Items: JSONSchemaType<
  Omit<Item, "itemImage" | "itemDescription">
> = {
  type: "object",
  properties: {
    name: { type: "string" },
    id: { type: "number" },
    discount: { type: "number" },
    code: { type: "string" },
    description: { type: "string" },
    isInactive: { type: "number" },
    salePrice: { type: "number" },
    dimension: { type: "string" },
    modifiedDate: { type: "string", format: "date-time" },
    createdDate: { type: "string", format: "date-time" },
    revisionNumber: { type: "number" },
    // itemImages:{type:"arra}
  },
  required: ["name","code","salePrice","dimension"],
  additionalProperties: false,
};
