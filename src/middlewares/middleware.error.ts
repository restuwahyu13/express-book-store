import { StatusCodes as Status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'

export const globalError = (): Handler => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      if (res.statusCode === 500 || req.statusCode === 500) {
        throw { code: Status.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' }
      }
      next()
    } catch (e: any) {
      res.status(e.code || Status.UNAUTHORIZED).json({ ...e })
    }
  }
}
