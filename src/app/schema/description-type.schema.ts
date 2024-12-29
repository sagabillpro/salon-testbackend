import { JSONSchemaType } from "ajv";
import { DescriptionType } from "../modules/items/entities/description-type.entity";

export const DescriptionTypes: JSONSchemaType<DescriptionType> = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        description: { type: "string" },
        modifiedDate: { type: "string", format: "date-time" },
        createdDate: { type: "string", format: "date-time" },
        revisionNumber: { type: "number" },
    },
    required: ["name"],
    additionalProperties: false,
};
