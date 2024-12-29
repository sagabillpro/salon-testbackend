import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { handler } from "../../config/dbconfig";
import { InventoryLines } from "../sale-items/entities/inventory-lines.entity";
import { validateFilter } from "../../utils/validate-filter.util";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { ReportSchema } from "../../schema/report.schema";
import { validateFilterManual } from "../../utils/validateFilterManual.util";
import { SaleLines } from "../sale-items/entities/sale-lines.enity";
import { SaleHeaders } from "../sale-items/entities/sale-header.entity";
import { Services } from "../services/entities/services.entity";

const router = Router();

router.get(
  "/",
  validateFilterManual(ReportSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: {
        where: {
          startDate: string;
          endDate: string;
        };
        skip?: number;
        limit?: number;
      } = req.query.filter ? JSON.parse(`${req.query.filter}`) : {};
      const dataSource = await handler();

      const data = await dataSource
        .getRepository(SaleLines) // Replace 'sale_lines' with your actual SaleLines entity name
        .createQueryBuilder("sl")
        .select([
          'sc.name AS "name"', // Service name
          'SUM(sl.quantity) AS "totalQuantity"', // Total quantity
          'SUM(sl.rate * sl.quantity) AS "totalSaleAmount"', // Total sale amount
          'SUM(sl.taxAmount) AS "totalTaxAmount"', // Total tax amount
          'SUM(sl.discountAmount) AS "totalDiscountAmount"', // Total discount amount
          'SUM(sl.amount) AS "grandTotal"', // Grand total
        ])
        .innerJoin(SaleHeaders, "sh", "sl.txnHeaderId = sh.id")
        .innerJoin(Services, "sc", "sl.serviceId = sc.id")
        .where("sh.isService = :isService", { isService: 1 })
        .andWhere("sh.txnDate BETWEEN :start AND :end", {
          start: query.where.startDate,
          end: query.where.endDate,
        })
        .groupBy("sc.name")
        .getRawMany();
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/service-sale-revenue-report", router);
