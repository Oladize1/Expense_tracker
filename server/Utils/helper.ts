import express from "express";
export function asyncHandler(fn: any) {
    return function(req: express.Request, res: express.Response, next: express.NextFunction) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
