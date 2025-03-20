import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";

import { validateRequestBody } from "../../utils/get-model-schema.util";
import { Services } from "./entities/services.entity";
import service from "./services.service"
import authenticateToken from "../../middlewares/authenticate.middleware";
import getQuerySecure from "../../utils/get-query-secure.util";
const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilter(Services),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.find(await getQuerySecure(req, Services));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authenticateToken,
  validateRequestBody(Services),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.create(req.body);
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  validateFilter(Services),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await service.findById(
        id,
        await getQuery(req, Services)
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
  validateRequestBody(Services),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await service.updateById(id, req.body);
      res.send();
    } catch (error) {
      console.log(error);
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
      await service.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/services", router);
