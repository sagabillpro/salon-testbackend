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
        .getRepository(SaleLines) // Replace 'sale_lines' with your SaleLines entity name
        .createQueryBuilder("sl")
        .select([
          'sh.code AS "code"', // Use double quotes to maintain camelCase aliasing
          'sh.txnDate AS "txnDate"',
          'sc.name AS "serviceName"',
          'SUM(sl.quantity) AS "totalQuantity"',
          'SUM(sl.amount) AS "totalAmount"',
          'AVG(sl.rate) AS "averageRate"',
          'AVG(sl.unitPrice) AS "averageUnitPrice"',
        ])
        .innerJoin(SaleHeaders, "sh", "sl.txnHeaderId = sh.id")
        .innerJoin(Services, "sc", "sl.serviceId = sc.id")
        .where("sc.isService = :isService", { isService: 0 })
        .andWhere("sh.txnDate BETWEEN :start AND :end", {
          start: query.where.startDate,
          end: query.where.endDate,
        })
        .andWhere("sh.companyId = :companyId", { companyId: user.companyId })

        .groupBy("sh.code")
        .addGroupBy("sh.txnDate")
        .addGroupBy("sc.name")
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
        .getRepository(SaleLines) // Replace 'sale_lines' with your SaleLines entity name
        .createQueryBuilder("sl")
        .select([
          'sh.code AS "code"', // Use double quotes to maintain camelCase aliasing
          'sh.txnDate AS "txnDate"',
          'sc.name AS "serviceName"',
          'SUM(sl.quantity) AS "totalQuantity"',
          'SUM(sl.amount) AS "totalAmount"',
          'AVG(sl.rate) AS "averageRate"',
          'AVG(sl.unitPrice) AS "averageUnitPrice"',
        ])
        .innerJoin(SaleHeaders, "sh", "sl.txnHeaderId = sh.id")
        .innerJoin(Services, "sc", "sl.serviceId = sc.id")
        .where("sc.isService = :isService", { isService: 0 })
        .andWhere("sh.txnDate BETWEEN :start AND :end", {
          start: query.where.startDate,
          end: query.where.endDate,
        })
        .andWhere("sh.companyId = :companyId", { companyId: user.companyId })

        .groupBy("sh.code")
        .addGroupBy("sh.txnDate")
        .addGroupBy("sc.name")
        .getRawMany();
      // 2. Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      let worksheet = workbook.addWorksheet("Report");
      worksheet = getWorksheetColumnsFromSchema(12, worksheet, result);
      // 5. Stream the Excel file as a response
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=sale-report${Date.now()}.xlsx`
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
export default new Route("/sale-report", router);
