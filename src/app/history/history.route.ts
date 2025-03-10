import { Request, Response, Router } from "express";
import { routeToEntityMap } from "./mappings/entity-route.mapping";
import { validateFilter } from "../utils/validate-filter.util";
import { handler } from "../config/dbconfig";
import getQuery from "../utils/get-query.util";
import { Route } from "../routes/routes.types";

const router = Router();
// Loop through each entry in the routeToEntityMap
for (let [key, value] of Object.entries(routeToEntityMap)) {
  // Define a GET route for each key in the map
  router.get(
    key,
    validateFilter(value), // Apply the validateFilter middleware
    async (req: Request, res: Response) => {
      try {
        // Get the data source
        const appDataSource = await handler();
        // Get the repository for the current entity
        const repository = appDataSource.getRepository(value);
        // Fetch data using the repository and query built from the request
        const data = await repository.find(await getQuery(req, value));
        // Send the fetched data as a JSON response with status 200
        res.status(200).json(data);
      } catch (error) {
        // Handle errors by sending a 500 status and error message
        res
          .status(500)
          .json({ message: "Error fetching DescriptionType", error });
      }
    }
  );
}
export default new Route("/history", router);