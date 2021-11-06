import { validationResult } from 'express-validator'
import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

export function validator() {
  return function (req: Request, res: Response, next: NextFunction): any {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(status.BAD_REQUEST).json(errors.array())
    }
    next()
  }
}
