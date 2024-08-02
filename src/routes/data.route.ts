import { Router } from "express";
import DataController from "../controllers/data.controller";
import DataMiddleware from "../middlewares/data.middleware";


class DataRoute {
    // router and controller
    public route: Router;
    public controller: DataController;


    constructor() {
        this.route = Router();
        this.controller = new DataController();
        this.routes(); // listen on the routes
    }

    routes() {
        this.route.get('/data', DataMiddleware, this.controller.getData); // get all data route
    }
}

export default DataRoute;