import { NextFunction, Request, Response, Router } from "express";
import { Route } from "../../routes/routes.types";
import itemsService from "./items.service";
import { validateFilter } from "../../utils/validate-filter.util";
import { Item } from "./entities/items.entity";
import getQuery from "../../utils/get-query.util";

const router = Router();

router.get(
  "/",
  validateFilter(Item),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await itemsService.find(await getQuery(req, Item));
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await itemsService.create(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await itemsService.findById(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await itemsService.updateById(id, req.body);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await itemsService.deleteById(id);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default new Route("/items", router);
