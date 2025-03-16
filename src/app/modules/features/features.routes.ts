import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { Feature } from "./entities/features.entity";
import FeatureService from "./features.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
import authenticateToken from "../../middlewares/authenticate.middleware";
const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilter(Feature),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await FeatureService.find(await getQuery(req, Feature));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authenticateToken,
  validateRequestBody(Feature),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await FeatureService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  validateFilter(Feature),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await FeatureService.findById(
        id,
        await getQuery(req, Feature)
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
  validateRequestBody(Feature),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await FeatureService.updateById(id, req.body);
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
      await FeatureService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/features", router);
