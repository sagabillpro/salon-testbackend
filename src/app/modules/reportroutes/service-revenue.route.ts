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
import authenticateToken from "../../middlewares/authenticate.middleware";
import { AuthenticatedRequest } from "../../types";
import { PassThrough } from "stream";
import { getWorksheetColumnsFromSchema } from "../../utils/get-report-headers.util";
import ExcelJS from "exceljs";

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
        .where("sc.isService = :isService", { isService: 1 })
        .andWhere("sh.txnDate BETWEEN :start AND :end", {
          start: query.where.startDate,
          end: query.where.endDate,
        })
        .andWhere("sh.companyId = :isService", { companyId: user.companyId })
        .groupBy("sc.name")
        .getRawMany();
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/download",
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
        .where("sc.isService = :isService", { isService: 1 })
        .andWhere("sh.txnDate BETWEEN :start AND :end", {
          start: query.where.startDate,
          end: query.where.endDate,
        })
        .andWhere("sh.companyId = :isService", { companyId: user.companyId })
        .groupBy("sc.name")
        .getRawMany();
      // 2. Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      let worksheet = workbook.addWorksheet("Report");
      worksheet = getWorksheetColumnsFromSchema(13, worksheet, result);
      // 5. Stream the Excel file as a response
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=service-sale-revenue-report${Date.now()}.xlsx`
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
export default new Route("/service-sale-revenue-report", router);
