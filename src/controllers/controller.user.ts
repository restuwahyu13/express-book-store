import { StatusCodes as status } from 'http-status-codes'
import { checkSchema } from 'express-validator'
import { IUser, IControllerUser } from '@/interfaces/interface.user'
import { ServiceUser } from '@/services/service.user'
import { Request, Response } from '@/helpers/helper.generic'

export class ControllerUser extends ServiceUser implements IControllerUser {
  async registerControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result = await super.registerServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async loginControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.loginServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async activationControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.activationServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async forgotControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.forgotServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resendControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resendServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resetControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resetServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async healthTokenControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resetServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async refreshTokenControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resetServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async revokeTokenControllerUser(req: Request<IUser>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resetServiceUser(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }
}

/**
 * @description schema validator initialize for all property controller here
 */

export class Schema {
  static registerSchemaUser = checkSchema({
    email: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'email is required'
      },
      isEmail: {
        errorMessage: 'email is not valid'
      }
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'password is required'
      },
      custom: {
        options: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gi.test(value),
        errorMessage: 'password minimal 8 characters and including camel case or unique character'
      }
    },
    role: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'role is required'
      },
      isString: {
        errorMessage: 'role must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'role not including unique character'
      }
    }
  })

  static loginSchemaRegister = checkSchema({
    email: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'email is required'
      },
      isEmail: {
        errorMessage: 'email is not valid'
      }
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'password is required'
      },
      custom: {
        options: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gi.test(value),
        errorMessage: 'password is not valid'
      }
    }
  })
}
