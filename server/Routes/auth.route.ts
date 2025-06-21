import express  from "express";
import { loginUser, registerUser } from "../Controllers/authController";

export const authRouter = express.Router()


//Next time, you can use express-async-handler
function asyncHandler(fn: any) {
	return function(req: express.Request, res: express.Response, next: express.NextFunction) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

authRouter.post('/login', asyncHandler(loginUser))
authRouter.post('/register', asyncHandler(registerUser))