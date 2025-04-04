import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { ItemsStockTrack } from "../purchase-items/entities/item-stock-track.entity";
import { handler } from "../../config/dbconfig";
import { PassThrough } from "stream";
import { getWorksheetColumnsFromSchema } from "../../utils/get-report-headers.util";
import ExcelJS from "exceljs";
import authenticateToken from "../../middlewares/authenticate.middleware";
import getQuerySecure from "../../utils/get-query-secure.util";
const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilter(ItemsStockTrack),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataSource = await handler();
      const repo = dataSource.getRepository(ItemsStockTrack);
      const result = await repo.find(await getQuerySecure(req, ItemsStockTrack));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/download",
  authenticateToken,
  validateFilter(ItemsStockTrack),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataSource = await handler();
      const repo = dataSource.getRepository(ItemsStockTrack);
      const result = await repo.find(await getQuerySecure(req, ItemsStockTrack));
      // 2. Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      let worksheet = workbook.addWorksheet("Report");
      worksheet = getWorksheetColumnsFromSchema(10, worksheet, result);
      // 5. Stream the Excel file as a response
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=item-stock-report${Date.now()}.xlsx`
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

export default new Route("/item-stock-report", router);
