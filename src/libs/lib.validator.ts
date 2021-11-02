import { validationResult } from 'express-validator'
import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

export function validator() {
  return function (req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(status.BAD_REQUEST).json(errors.array())
    }
    next()
  }
}
