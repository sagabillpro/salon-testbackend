import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import { validateFilter } from "../../utils/validate-filter.util";
import getQuery from "../../utils/get-query.util";
import { Branch } from "./entities/branches.entity";
import BranchService from "./branches.service";
import { validateRequestBody } from "../../utils/get-model-schema.util";
import getQuerySecure from "../../utils/get-query-secure.util";
import authenticateToken from "../../middlewares/authenticate.middleware";
const router = Router();

router.get(
  "/",
  authenticateToken,
  validateFilter(Branch),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BranchService.find(await getQuerySecure(req, Branch));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authenticateToken,
  validateRequestBody(Branch),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BranchService.create(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  validateFilter(Branch),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await BranchService.findById(
        id,
        await getQuery(req, Branch)
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
  validateRequestBody(Branch),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await BranchService.updateById(id, req.body);
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
      await BranchService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/branches", router);
