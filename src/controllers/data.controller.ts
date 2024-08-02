import { Request, Response } from 'express';
import DB from '../models/DB';
import { Op } from 'sequelize';

class DataController {

    constructor() {
        this.getData = this.getData.bind(this); // bind the method to the class
    }

    public async getData(req: Request, res: Response) {
        try {
            // Get the data query from the middleware-modified request body
            const query = req.body;

            // Get database instance
            const db = DB.getInstance();

            // Build options object based on query parameters
            const options: any = {};

            if (query.where && Object.keys(query.where).length > 0) {
                options.where = {};
                for (const [key, value] of Object.entries(query.where)) {
                    if (Array.isArray(value)) {
                        options.where[key] = { [Op.in]: value };
                    } else {
                        options.where[key] = value;
                    }
                }
            }

            if (query.order && query.order.length > 0) {
                options.order = query.order;
            }

            if (query.limit !== -1) {
                options.limit = query.limit;
            }

            if (query.offset !== 0) {
                options.offset = query.offset;
            }

            // Get data from model using the built options
            const data = await db.Data.findAll(options);

            // Return the filtered, sorted, and paginated data
            res.status(200).json({
                message: 'Data retrieved successfully',
                data: data
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'An error occurred while retrieving data',
                error: err
            });
        }
    }
}

export default DataController;
