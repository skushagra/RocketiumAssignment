import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';

// Define the structure of finalQuery
interface FinalQuery {
    where: Record<string, any>; // Define as Record<string, any> to allow dynamic keys
    order: [string, 'asc' | 'desc'][]; // Array of tuples for ordering
    limit: number;
    offset: number;
}

function parseSortQuery(query: any, finalQuery: FinalQuery) {
    const sortQuery = query.sort;
    if (sortQuery) {
        const sortArray = sortQuery.split(',');
        sortArray.forEach((sort: string) => {
            const sortSplit = sort.split(':');
            finalQuery.order.push([sortSplit[0], sortSplit[1] as 'asc' | 'desc']);
        });
    }
}

function parseLimitQuery(query: any, finalQuery: FinalQuery) {
    if (query.limit) {
        finalQuery.limit = parseInt(query.limit);
        if (query.offset) {
            finalQuery.offset = parseInt(query.offset);
        }
    }
}

export default function DataMiddleware(req: Request, res: Response, next: NextFunction) {
    const query = req.query as Record<string, any>;

    const finalQuery: FinalQuery = {
        where: {},
        order: [],
        limit: -1,
        offset: 0
    };

    if (query.sort) {
        parseSortQuery(query, finalQuery);
    }

    if (query.limit) {
        parseLimitQuery(query, finalQuery);
    }

    // Handle multiple values for filtering
    for (const [key, value] of Object.entries(query)) {
        if (key !== 'sort' && key !== 'limit' && key !== 'offset') {
            finalQuery.where[key] = Array.isArray(value) ? value : value.split(',');
        }
    }

    req.body = finalQuery;
    next();
}
