import { IncomingHttpHeaders } from 'http'
import { assert } from 'is-any-type'
import { StatusCodes as Status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '@libs/lib.jwt'
import { ModelSecret } from '@models/model.user'
import { dateFormat } from '@helpers/helper.dateFormat'

export const auth = (): Handler => {
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

      const validJwt: string[] = (accessToken as string).split('.')

      if (validJwt?.length !== 3) {
        throw { code: Status.UNAUTHORIZED, message: 'JWT token is not valid' }
      }

      const checkAccessToken: ModelSecret = await ModelSecret.query()
        .where('acess_token', validJwt[0])
        .andWhere('type', 'login')
        .first()

      if (!checkAccessToken) {
        throw { code: Status.UNAUTHORIZED, message: 'Access Token invalid' }
      }

      const datenow: string = dateFormat(new Date())
      const expiredAt: string = dateFormat(checkAccessToken.expired_at)

      if (expiredAt < datenow) {
        throw { code: Status.UNAUTHORIZED, message: 'Access Token expired' }
      }

      const decodedToken: Record<string, any> | string | JwtPayload = await verifyToken(accessToken as any)
      req['payload'] = decodedToken
      next()
    } catch (e: any) {
      console.log(e)
      res.status(e.code || Status.UNAUTHORIZED).json({ ...e })
    }
  }
}
