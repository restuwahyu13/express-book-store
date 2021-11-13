import { IncomingHttpHeaders } from 'http'
import { assert } from 'is-any-type'
import { StatusCodes as Status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '@libs/lib.jwt'

export const permission = (roles: string[]): Handler => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let headers: IncomingHttpHeaders = req.headers

      if (!Object.keys(headers).includes('authorization')) {
        throw { code: Status.UNAUTHORIZED, message: 'Authorization is required' }
      }

      const authorization: boolean | undefined = (headers.authorization as any).includes('Bearer')

      if (!authorization) {
        throw { code: Status.UNAUTHORIZED, message: 'Bearer is required' }
      }

      const accessToken: string | undefined = (headers.authorization as any).split('Bearer ')[1]

      if (assert.isUndefined(accessToken as any)) {
        throw { code: Status.UNAUTHORIZED, message: 'Access Token is required' }
      }

      const decodedToken: Record<string, any> | string | JwtPayload = await verifyToken(accessToken as any)

      if (!roles.includes(decodedToken['role'])) {
        throw { code: Status.FORBIDDEN, message: 'Your role persmission access denield' }
      }

      next()
    } catch (e: any) {
      res.status(e.code || Status.UNAUTHORIZED).json({ ...e })
    }
  }
}
