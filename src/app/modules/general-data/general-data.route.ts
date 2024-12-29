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
for (let [key, value] of Object.entries(routeToEntityMap)) {
  router.get(
    key,
    validateFilter(value),
    async (req: Request, res: Response) => {
      try {
        const appDataSource = await handler();
        const repository = appDataSource.getRepository(value);
        const data = await repository.find(await getQuery(req, value));
        res.status(200).json(data);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching DescriptionType", error });
      }
    }
  );
  router.post(
    key,
    validateRequestBody(value),
    async (req: Request, res: Response) => {
      try {
        const appDataSource = await handler();
        const repository = appDataSource.getRepository(value);
        const data = repository.create(req.body);
        const respo = await repository.save(data);
        res.status(200).json(respo);
      } catch (error) {
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
            features: true,
          },
          where: {
            features: {
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
          for (let feature of menu.features) {
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
