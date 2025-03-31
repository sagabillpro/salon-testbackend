import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import taxesService from "../taxes/taxes.service";
const router = Router();

router.get(
  "/generate",
  // authenticateToken,
  // validateFilter(Branch),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = 1;
      const result = await taxesService.calculateGstReport(id);
      res.send(result);
    } catch (error) {
        console.log(error);
      next(error);
    }
  }
);
// router.get(
//   "/download",
//   validateFilter(ItemsStockTrack),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const dataSource = await handler();
//       const repo = dataSource.getRepository(ItemsStockTrack);
//       const result = await repo.find(await getQuerySecure(req, ItemsStockTrack));
//       // 2. Create a new Excel workbook and worksheet
//       const workbook = new ExcelJS.Workbook();
//       let worksheet = workbook.addWorksheet("Report");
//       worksheet = getWorksheetColumnsFromSchema(10, worksheet, result);
//       // 5. Stream the Excel file as a response
//       res.setHeader(
//         "Content-Type",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       );
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=item-stock-report${Date.now()}.xlsx`
//       );

//       // 6. Use stream for better performance with large datasets
//       const stream = new PassThrough();
//       await workbook.xlsx.write(stream);

//       // 7. Pipe the stream directly to the response
//       stream.pipe(res);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default new Route("/gst-report", router);
