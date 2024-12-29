import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { handler } from "../../config/dbconfig";
import { InventoryLines } from "../sale-items/entities/inventory-lines.entity";
import { validateFilter } from "../../utils/validate-filter.util";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { ReportSchema } from "../../schema/report.schema";
import { validateFilterManual } from "../../utils/validateFilterManual.util";

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
      const result = await dataSource
        .getRepository(InventoryLines)
        .createQueryBuilder("il")
        .select("itm.stockNumber", "stockNumber")
        .addSelect("SUM(il.quantity * sl.unitPrice * -1)", "soldAmount")
        .addSelect("SUM(il.quantity * itm.unitPrice * -1)", "purchaseAmount")
        .addSelect(
          "SUM((il.quantity * sl.unitPrice * -1) - (il.quantity * itm.unitPrice * -1))",
          "profit"
        )
        .innerJoin("SaleLines", "sl", "sl.txnHeaderId = il.saleId")
        .innerJoin("ItemsStockTrack", "itm", "itm.id = il.stockId")
        .where("sl.createdDate BETWEEN :start AND :end", {
          start: query.where.startDate,
          end: query.where.endDate,
        })
        .groupBy("itm.stockNumber")
        .getRawMany();
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export default new Route("/profit-loss-report", router);
