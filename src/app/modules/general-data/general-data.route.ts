import { NextFunction, Request, Response, Router } from "express";
import { routeToEntityMap } from "./mappings/modeltoroutemapping.mapping";
import { handler } from "../../config/dbconfig";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { Route } from "../../routes/routes.types";
import { Menus } from "./entities";
import authenticateToken from "../../middlewares/authenticate.middleware";
import { AuthenticatedRequest } from "../../types";
import { Services } from "../services/entities/services.entity";
import { Customer } from "../customer/entities/customer.entity";
import { SaleHeaders } from "../sale-items/entities/sale-header.entity";
import {
  getModelSchema,
  validateRequestBody,
} from "../../utils/get-model-schema.util";
const router = Router();
// Loop through each entry in the routeToEntityMap
for (let [key, value] of Object.entries(routeToEntityMap)) {
  // Define a GET route for each key in the map
  router.get(
    key,
    validateFilter(value), // Apply the validateFilter middleware
    async (req: Request, res: Response) => {
      try {
        // Get the data source
        const appDataSource = await handler();
        // Get the repository for the current entity
        const repository = appDataSource.getRepository(value);
        // Fetch data using the repository and query built from the request
        const data = await repository.find(await getQuery(req, value));
        // Send the fetched data as a JSON response with status 200
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        // Handle errors by sending a 500 status and error message
        res
          .status(500)
          .json({ message: "Error fetching DescriptionType", error });
      }
    }
  );

  // Define a POST route for each key in the map
  router.post(
    key,
    validateRequestBody(value), // Apply the validateRequestBody middleware
    async (req: Request, res: Response) => {
      try {
        // Get the data source
        const appDataSource = await handler();
        // Get the repository for the current entity
        const repository = appDataSource.getRepository(value);
        // Create a new entity instance from the request body
        const data = repository.create(req.body);
        // Save the new entity instance to the database
        const respo = await repository.save(data);
        // Send the saved entity as a JSON response with status 200
        res.status(200).json(respo);
      } catch (error) {
        // Handle errors by sending a 500 status and error message
        res
          .status(500)
          .json({ message: "Error fetching DescriptionType", error });
      }
    }
  );
}
router.get(
  "/menu-headers",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      //take user related data only
      const user: any = req.user;
      if (user.userType) {
        const appDataSource = await handler();
        const repository = appDataSource.getRepository(Menus);
        const data = await repository.find({
          relations: {
            entities: true,
          },
          where: {
            entities: {
              isInactive: 0,
            },
          },
        });
        const respo: {
          title: string;
          url: string;
          icon: string;
          subItems: { title: string; url: string }[];
        }[] = [];
        for (let menu of data) {
          let level1: { title: string; url: string }[] = [];
          for (let feature of menu.entities) {
            //1.send all menus for admin
            if (user.userType.id === 1) {
              level1.push({
                title: feature.displayName,
                url: feature.route,
              });
            }
            //2.restrict menus for normal user
            if (!feature.isAdminMenu && user.userType.id != 1) {
              level1.push({
                title: feature.displayName,
                url: feature.route,
              });
            }
          }
          level1.length &&
            respo.push({
              title: menu.name,
              url: "#",
              icon: menu.icon,
              subItems: level1,
            });
        }
        res.status(200).json(respo);
      } else {
        throw {
          message: "No metadata found for given user..",
          statusCode: 401,
        };
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching menus", error });
    }
  }
);
//2. get model properties
function capitalizeFirstLetter(str: string) {
  if (!str) return str; // Handle empty or null strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}
router.get(
  "/get-schema",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skip = ["id", "modifiedDate", "createdDate"];
      const result: any = {
        menuId: 16,
        postUrl: "/service-sessions",
        buttonName: "Service Sessions",
        sheetTitle: "Start New Session",
        sheetDescription: "",
        fields: [],
      };
      const appDataSource = await handler();
      const entityMetadata = appDataSource.getMetadata(Services);

      entityMetadata.ownColumns.forEach((column) => {
        if (!skip.includes(column.propertyName)) {
          result.fields.push({
            label: capitalizeFirstLetter(column.propertyName),
            name: column?.propertyName,
            type: column.type === "varchar" ? "text" : column.type,
            required: !column.isNullable,
            error: `${capitalizeFirstLetter(
              column.propertyName
            )} field is required`,
            ...(column.type === "varchar"
              ? {
                  validations: [
                    {
                      min: 3,
                      message: "Should have min 3 characters",
                    },
                    {
                      max: 100,
                      message: "Should not have more than 100 characters",
                    },
                  ],
                }
              : {}),
          });
        }
      });
      // console.log(entityMetadata.relations);
      // entityMetadata.relations.forEach((column) => {
      //   if (column.relationType === "many-to-one") {
      //     result.fields.push({
      //       label: capitalizeFirstLetter(column.propertyName),
      //       name: column?.propertyName,
      //       type: "number",
      //       required: true,
      //       error: `${capitalizeFirstLetter(
      //         column.propertyName
      //       )} field is required`,
      //     });
      //   }
      // });
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("", router);
