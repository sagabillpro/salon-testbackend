import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { handler } from "../../config/dbconfig";
import { InventoryLines } from "../sale-items/entities/inventory-lines.entity";
import { validateFilter } from "../../utils/validate-filter.util";
import { validateBodyManual } from "../../utils/validate-req-body.util";
import { ReportSchema } from "../../schema/report.schema";
import { validateFilterManual } from "../../utils/validateFilterManual.util";
import authenticateToken from "../../middlewares/authenticate.middleware";
import { AuthenticatedRequest } from "../../types";
import ExcelJS from "exceljs";
import { PassThrough } from "stream";
import { getWorksheetColumnsFromSchema } from "../../utils/get-report-headers.util";

const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilterManual(ReportSchema),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user: any = req?.user;
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
        .andWhere("itm.companyId = :companyId", { companyId: user.companyId })

        .groupBy("itm.stockNumber")
        .getRawMany();
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/download",
  validateFilterManual(ReportSchema),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user: any = req?.user;
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
        .andWhere("itm.companyId = :companyId", { companyId: user.companyId })

        .groupBy("itm.stockNumber")
        .getRawMany();
      // 2. Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      let worksheet = workbook.addWorksheet("Report");
      worksheet = getWorksheetColumnsFromSchema(11, worksheet, result);
      // 5. Stream the Excel file as a response
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=profit-loss-report${Date.now()}.xlsx`
      );

      // 6. Use stream for better performance with large datasets
      const stream = new PassThrough();
      await workbook.xlsx.write(stream);

      // 7. Pipe the stream directly to the response
      stream.pipe(res);
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/profit-loss-report", router);
