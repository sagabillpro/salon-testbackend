import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import taxesService from "./taxes.service";
import { Taxes } from "./entities/taxes.entity";
// import wkhtmltopdf from "wkhtmltopdf";
import path from "path";
const router = Router();
import ejs from "ejs";
import { PassThrough, pipeline } from "stream";
import { handler } from "../../config/dbconfig";
import { TaxGroup } from "./entities/tax-groups.entity";

router.get(
  "/",
  validateFilter(Taxes),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taxesService.find(await getQuery(req, Taxes));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateRequestBody(Taxes),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taxesService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validateFilter(Taxes),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await taxesService.findById(
        id,
        await getQuery(req, Taxes)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateRequestBody(Taxes),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await taxesService.updateById(id, req.body);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await taxesService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
//crate route which will upload image to

// router.post("/uploadImage", async (req: Request, res: Response) => {
//   try {
//     if (!req.body) {
//       return res.status(400).send("No files were uploaded.");
//     }
//     const { image } = req.body;
//     const url = await uploadImageToCloudinary(image, "CompanyLogos");
//     return res.status(200).send({
//       data: url,
//     });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });
router.get(
  "/tax-groups",
  validateFilter(TaxGroup),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataSource = await handler();
      const repo = dataSource.getRepository(TaxGroup);
      const result = await repo.find(await getQuery(req, TaxGroup));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/taxes", router);
