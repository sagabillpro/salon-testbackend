import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { Company } from "./entities/company.entity";
import CompanyService from "./company.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
import authenticateToken from "../../middlewares/authenticate.middleware";
import getQuerySecure from "../../utils/get-query-secure.util";
const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilter(Company),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CompanyService.find(await getQuerySecure(req, Company));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authenticateToken,
  validateRequestBody(Company),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CompanyService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  validateFilter(Company),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await CompanyService.findById(
        id,
        await getQuery(req, Company)
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticateToken,
  validateRequestBody(Company),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await CompanyService.updateById(id, req.body);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await CompanyService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/companies", router);
