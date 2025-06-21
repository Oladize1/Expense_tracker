import express from 'express'
export const expenseRouter = express.Router()
import { asyncHandler } from '../Utils/helper'
import { createExpense, getAllExpenses } from '../Controllers/expenseController'
import { decodeToken } from '../Utils/token'
import { getToken } from '../Middleware/getToken'
const auth = [getToken, decodeToken]
expenseRouter.route('/').get(...auth, asyncHandler(getAllExpenses)).post(...auth, asyncHandler(createExpense))