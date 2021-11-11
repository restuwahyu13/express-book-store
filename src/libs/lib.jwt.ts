import { Request } from 'express'
import { StatusCodes as Status } from 'http-status-codes'
import { decrypt, encrypt } from 'jwt-transform'
import { NodeDiskStorage } from 'node-disk-storage'
import jwt from 'jsonwebtoken'
import { BookStoreError } from '@/helpers/helper.error'
import { convertTime } from '@/helpers/helper.convertTime'

const nds: InstanceType<typeof NodeDiskStorage> = new NodeDiskStorage({ compress: true })
const secretKey: string = process.env.JWT_SECRET_KEY || ''
const typeTime: Record<string, any> = {
  days: 'd',
  minute: 'm',
  second: 's'
}

interface IToken {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpired: string
}

interface ITokenMixed {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpired: string
  status: string
}

interface Ioptions {
  expiredAt: number
  type: string
}

const healthToken = async (accessToken: string): Promise<boolean> => {
  const getAccessToken: any = (await nds.get('accessToken')) || accessToken

  if (!getAccessToken) {
    throw { code: Status.BAD_REQUEST, message: 'Get accessTokenfrom disk failed' }
  }

  const decryptAccessToken: string = await decrypt(getAccessToken, 26)
  const decodedAccesToken: string | jwt.JwtPayload = jwt.verify(decryptAccessToken, secretKey, { audience: 'book-store-api' })

  if (!decodedAccesToken || decodedAccesToken instanceof jwt.JsonWebTokenError) {
    return false
  }

  return true
}

export const signToken = async (data: Record<string, any>, options: Ioptions): Promise<Record<string, any> | string> => {
  try {
    const accessToken: string = jwt.sign({ ...data }, secretKey, {
      expiresIn: `${options.expiredAt}${typeTime[options.type]}`,
      audience: 'book-store-api'
    })

    const refreshToken: string = jwt.sign({ ...data }, secretKey, { expiresIn: '30d', audience: 'book-store-api' })

    const setAccessToken: boolean | undefined = nds.set('accessToken', accessToken)
    const setRefreshToken: boolean | undefined = nds.set('refreshToken', refreshToken)

    if (!setAccessToken || !setRefreshToken) {
      throw { code: Status.BAD_REQUEST, message: 'Store accessToken and refreshToken into disk failed' }
    }

    const token: IToken = {
      accessToken: await encrypt(accessToken, 26),
      refreshToken: await encrypt(refreshToken, 26),
      accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`,
      refreshTokenExpired: `${convertTime(30, 'days')} Days`
    }

    return token
  } catch (e: any) {
    return Promise.reject(new BookStoreError('Generate accessToken and refreshToken failed' || e.message))
  }
}

export const verifyToken = async (req: Request, accessToken: string): Promise<Record<string, any> | string> => {
  try {
    const getAccessToken: string | undefined = nds.get('accessToken') || accessToken

    if (!getAccessToken) {
      throw { code: Status.BAD_REQUEST, message: 'Get accessToken from disk failed' }
    }

    const decryptAccessToken: string = await decrypt(getAccessToken, 26)
    const decodedToken: string | jwt.JwtPayload = jwt.verify(decryptAccessToken, secretKey, { audience: 'book-store-api' })
    // global request data for user or admin
    req['payload'] = decodedToken

    return decodedToken
  } catch (e: any) {
    return Promise.reject(new BookStoreError('Verified accessToken expired or invalid'))
  }
}

export const refreshToken = async (refreshToken: string, options: Ioptions): Promise<Record<string, any> | string> => {
  try {
    let token: ITokenMixed
    const getAccessToken: any = await nds.get('accessToken')
    const getRefreshToken: any = (await nds.get('refreshToken')) || refreshToken

    const decryptAccessToken: string = await decrypt(getRefreshToken, 26)
    const decryptRefreshToken: string = await decrypt(getAccessToken, 26)

    if (!healthToken(getAccessToken)) {
      if (!getAccessToken || !getRefreshToken) {
        throw { code: Status.BAD_REQUEST, message: 'Get accessToken and refreshToken from disk failed' }
      }

      const getAccessTokenData: jwt.JwtPayload = jwt.decode(decryptAccessToken) as any
      const getRefreshTokenData: jwt.JwtPayload = jwt.decode(decryptRefreshToken) as any

      const newAccessToken: string = jwt.sign({ ...getAccessTokenData }, secretKey, {
        expiresIn: `${options.expiredAt}${typeTime[options.type]}`,
        audience: 'book-store-api'
      })

      const newRefreshToken: string = jwt.sign({ ...getRefreshTokenData }, secretKey, {
        expiresIn: '30d',
        audience: 'book-store-api'
      })

      const setAccessToken: boolean | undefined = nds.set('accessToken', newAccessToken)
      const setRefreshToken: boolean | undefined = nds.set('refreshToken', newRefreshToken)

      if (!setAccessToken || !setRefreshToken) {
        throw { code: Status.BAD_REQUEST, message: 'Store accessToken and refreshToken into disk failed' }
      }

      token = {
        status: 'AccessToken Not Health, and this is new accessToken and refreshToken',
        accessToken: await encrypt(newAccessToken, 26),
        refreshToken: await encrypt(newRefreshToken, 26),
        accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`,
        refreshTokenExpired: `${convertTime(30, 'days')} Days`
      }
    } else {
      token = {
        status: 'AccessToken Is Health, and this is old accessToken and refreshToken',
        accessToken: await encrypt(decryptAccessToken, 26),
        refreshToken: await encrypt(decryptRefreshToken, 26),
        accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`,
        refreshTokenExpired: `${convertTime(30, 'days')} Days`
      }
    }

    return token
  } catch (e: any) {
    return Promise.reject(new BookStoreError('Generate new accessToken and refreshToken failed' || e.message))
  }
}
