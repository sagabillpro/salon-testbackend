import { JSONSchemaType } from "ajv";

export const ReportSchema: JSONSchemaType<{
  where?: {
    startDate?: string;
    endDate?: string;
  } | null;
  limit?: number;
  skip?: number;
}> = {
  type: "object",
  properties: {
    where: {
      type: "object",
      nullable: true, // Allow `null` for `where`
      properties: {
        startDate: {
          type: "string",
          format: "date-time",
          nullable: true, // Allow `null` for `startDate`
        },
        endDate: {
          type: "string",
          format: "date-time",
          nullable: true, // Allow `null` for `endDate`
        },
      },
      required: [], // No properties are required inside `where`
    },
    limit: { type: "number", nullable: true }, // Allow `null` for `limit`
    skip: { type: "number", nullable: true }, // Allow `null` for `skip`
  },
  required: [], // No top-level properties are required
  additionalProperties: false, // Prevent extra properties
};
