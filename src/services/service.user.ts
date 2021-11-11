import { StatusCodes as status } from 'http-status-codes'
import { ModelUser, ModelSecret } from '@/models/model.user'
import { IServiceUser, IUser } from '@/interfaces/interface.user'
import { Request } from '@/helpers/helper.generic'
import { sendMailgun } from '@libs/lib.mailgun'
import { renderTemplate } from '@libs/lib.ejs'
import { signToken } from '@libs/lib.jwt'
import { expiredAt } from '@/helpers/helper.expiredAt'

export class ServiceUser extends ModelUser implements IServiceUser {
  /**
   * @method POST
   * @description function for register new user account
   */

  public async registerServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelUser[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkUserAccount: ModelUser = await super.model().query().findOne({ email: req.body.email })

      if (checkUserAccount) {
        throw { code: status.CONFLICT, message: `Email ${req.body.email} already taken` }
      }

      const addUserAccount: ModelUser = await super.model().query().insert(req.body).first()

      if (!addUserAccount) {
        throw { code: status.FORBIDDEN, message: 'Register new account failed' }
      }

      const generateActivaitonToken: any = await signToken(
        { id: addUserAccount.id, email: req.body.email },
        { expiredAt: 5, type: 'minute' }
      )

      if (generateActivaitonToken instanceof Promise) {
        throw { code: status.BAD_REQUEST, message: 'Generate activation token failed' }
      }

      const htmlTemplate: any = await renderTemplate(req.body.email, generateActivaitonToken.accessToken, 'template_register')

      if (htmlTemplate instanceof Boolean || htmlTemplate instanceof Promise) {
        throw { code: status.BAD_REQUEST, message: 'Render html template from ejs failed' }
      }

      const sendMail: any = await sendMailgun(req.body.email, 'Activation Account', htmlTemplate)

      if (!sendMail || sendMail instanceof Promise) {
        throw { code: status.BAD_REQUEST, message: 'Render html template from ejs failed' }
      }

      const addActivationToken: ModelSecret = await ModelSecret.query()
        .insert({
          user_id: addUserAccount.id,
          access_token: generateActivaitonToken.accessToken,
          type: 'activation',
          expired_at: expiredAt(5, 'minute')
        })
        .first()

      if (!addActivationToken) {
        throw { code: status.FORBIDDEN, message: 'Insert activation token into database failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Register new account success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for login into app
   */

  public async loginServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      const checkUserAccount: ModelUser = await super.model().query().findOne({ email: req.body.email })

      if (!checkUserAccount) {
        throw { code: status.CONFLICT, message: `Email ${req.body.email} is not never registered` }
      }

      const generateAccessToken: any = await signToken(
        { id: checkUserAccount.id, email: req.body.email },
        { expiredAt: 1, type: 'days' }
      )

      if (generateAccessToken instanceof Promise) {
        throw { code: status.BAD_REQUEST, message: 'Generate activation token failed' }
      }

      const addAccessToken: ModelSecret = await ModelSecret.query().insert({
        user_id: checkUserAccount.id,
        access_token: generateAccessToken,
        type: 'login',
        expired_at: expiredAt(1, 'days')
      })

      if (!addAccessToken) {
        throw { code: status.FORBIDDEN, message: 'Insert access token into database failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Login successfully', token: generateAccessToken })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for activation and verified new account after register
   */

  public async activationServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for reset old password
   */

  public async forgotServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for resend new email verified or activation
   */

  public async resendServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for updated or change old password to new password
   */

  public async resetServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for check token is health or not
   */

  public async healthTokenServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for refresh new accessToken, if toek is expired
   */

  public async refreshTokenServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for revoke or delete accessToken
   */

  public async revokeTokenServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
