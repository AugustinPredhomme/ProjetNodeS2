import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    let statusCode = 500;
    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
    } else if (err.message === 'Not Found') {
        statusCode = 404; // Not found
    }

    res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
}