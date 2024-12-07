import { Request, Response, NextFunction } from 'express';

function errorHandler(statusCode: number | undefined, err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    console.log("ERROR MIDDLEWARE CALLED");
    res.status(statusCode || 500).json({
        ok: false,
        message:err.message,
    });
}

export default errorHandler;