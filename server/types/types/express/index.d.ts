import { Request } from "express";

declare module 'express-serve-static-core' {
    interface Request {
      decodedToken?: any;
    }
  }
