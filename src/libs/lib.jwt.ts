import { Request } from 'express'
import { StatusCodes as Status } from 'http-status-codes'
import { decrypt, encrypt } from 'jwt-transform'
import { NodeDiskStorage } from 'node-disk-storage'
import jwt from 'jsonwebtoken'
import { BookStoreError } from '@/helpers/helper.error'
import { secondToDays } from '@/helpers/helper.secondToDay'

const nds: InstanceType<typeof NodeDiskStorage> = new NodeDiskStorage({ compress: true })

interface IToken {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpred: string
}

interface ITokenMixed {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpred: string
  status: string
}

const healthToken = async (accessToken: string, secretKey: string): Promise<boolean> => {
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

export const signToken = async (data: Record<string, any>, secretKey: string): Promise<Record<string, any> | string> => {
  try {
    const accessToken: string = jwt.sign({ ...data }, secretKey, { expiresIn: '1d', audience: 'book-store-api' })
    const refreshToken: string = jwt.sign({ ...data }, secretKey, { expiresIn: '30d', audience: 'book-store-api' })

    const setAccessToken: boolean | undefined = nds.set('accessToken', accessToken)
    const setRefreshToken: boolean | undefined = nds.set('refreshToken', refreshToken)

    if (!setAccessToken || !setRefreshToken) {
      throw { code: Status.BAD_REQUEST, message: 'Store accessToken and refreshToken into disk failed' }
    }

    const token: IToken = {
      accessToken: await encrypt(accessToken, 26),
      refreshToken: await encrypt(refreshToken, 26),
      accessTokenExpired: `${secondToDays(24 * 60 * 60 * 1)} Days`,
      refreshTokenExpred: `${secondToDays(24 * 60 * 1000 * 30)} Days`
    }

    return token
  } catch (e: any) {
    return Promise.reject(new BookStoreError('Generate accessToken and refreshToken failed' || e.message))
  }
}

export const verifyToken = async (
  req: Request,
  accessToken: string,
  secretKey: string
): Promise<Record<string, any> | string> => {
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

export const refreshToken = async (refreshToken: string, secretKey: string): Promise<Record<string, any> | string> => {
  try {
    let token: ITokenMixed
    const getAccessToken: any = await nds.get('accessToken')
    const getRefreshToken: any = (await nds.get('refreshToken')) || refreshToken

    const decryptAccessToken: string = await decrypt(getRefreshToken, 26)
    const decryptRefreshToken: string = await decrypt(getAccessToken, 26)

    if (!healthToken(getAccessToken, secretKey)) {
      if (!getAccessToken || !getRefreshToken) {
        throw { code: Status.BAD_REQUEST, message: 'Get accessToken and refreshToken from disk failed' }
      }

      const getAccessTokenData: jwt.JwtPayload = jwt.decode(decryptAccessToken) as any
      const getRefreshTokenData: jwt.JwtPayload = jwt.decode(decryptRefreshToken) as any

      const newAccessToken: string = jwt.sign({ ...getAccessTokenData }, secretKey, {
        expiresIn: '1d',
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
        accessTokenExpired: `${secondToDays(24 * 60 * 60 * 1)} Days`,
        refreshTokenExpred: `${secondToDays(24 * 60 * 1000 * 30)} Days`
      }
    } else {
      token = {
        status: 'AccessToken Is Health, and this is old accessToken and refreshToken',
        accessToken: await encrypt(decryptAccessToken, 26),
        refreshToken: await encrypt(decryptRefreshToken, 26),
        accessTokenExpired: `${secondToDays(24 * 60 * 60 * 1)} Days`,
        refreshTokenExpred: `${secondToDays(24 * 60 * 1000 * 30)} Days`
      }
    }

    return token
  } catch (e: any) {
    return Promise.reject(new BookStoreError('Generate new accessToken and refreshToken failed' || e.message))
  }
}
