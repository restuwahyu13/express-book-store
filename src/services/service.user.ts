import { StatusCodes as status } from 'http-status-codes'

import { ModelUser } from '@/models/model.user'
import { IServiceUser, IUser } from '@/interfaces/interface.user'
import { Request } from '@/helpers/helper.generic'

export class ServiceUser extends ModelUser implements IServiceUser {
  public async registerServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      const checkUserAccount = await super.model().query().findOne({ email: req.body.email })

      if (!checkUserAccount) {
        throw { code: status.CONFLICT, message: `Email ${req.body.email} already taken` }
      }

      const addUserAccount = await super.model().query().insert(req.body).returning('id')

      if (!addUserAccount) {
        throw { code: status.FORBIDDEN, message: 'Register new account failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Register new account success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async loginServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async activationServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async forgotServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async resendServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async resetServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
