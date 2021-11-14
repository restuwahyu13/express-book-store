import { StatusCodes as status } from 'http-status-codes'
import { assert } from 'is-any-type'
import { ModelUser, ModelSecret } from '@models/model.user'
import { IServiceUser, IUser } from '@interfaces/interface.user'
import { Request } from '@helpers/helper.generic'
import { sendMailer } from '@libs/lib.nodemailer'
import { renderTemplate } from '@libs/lib.ejs'
import { IToken, signToken } from '@libs/lib.jwt'
import { expiredAt } from '@helpers/helper.expiredAt'
import { comparePassword, IPassword } from '@libs/lib.bcrypt'
import { randomToken } from '@helpers/helper.randomToken'

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

      const addUserAccount: ModelUser = await super.model().query().insert(req.body)

      if (!addUserAccount) {
        throw { code: status.FORBIDDEN, message: 'Register new account failed' }
      }

      const htmlTemplate: any = await renderTemplate(addUserAccount.email, randomToken(), 'template_register')

      if (assert.isBoolean(htmlTemplate) || assert.isPromise(htmlTemplate)) {
        throw { code: status.BAD_REQUEST, message: 'Render html template from ejs failed' }
      }

      const sendMail: any = await sendMailer(addUserAccount.email, 'Activation Account', htmlTemplate)

      if (assert.isUndefined(sendMail) || assert.isPromise(sendMail)) {
        throw { code: status.BAD_REQUEST, message: 'Sending email activation failed' }
      }

      const addActivationToken: ModelSecret = await ModelSecret.query()
        .insert({
          user_id: addUserAccount.id,
          access_token: randomToken(),
          type: 'activation',
          expired_at: expiredAt(5, 'minute')
        })
        .first()

      if (!addActivationToken) {
        throw { code: status.FORBIDDEN, message: 'Insert activation token into database failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Register new account success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code || status.BAD_REQUEST, message: e.message })
    }
  }

  /**
   * @method POST
   * @description function for login into app
   */

  public async loginServiceUser(req: Request<IUser>): Promise<Record<string, any>> {
    try {
      const checkTableColumn: ModelUser[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkUserAccount: ModelUser = await super.model().query().findOne({ email: req.body.email })

      if (!checkUserAccount) {
        throw { code: status.NOT_FOUND, message: `Email ${req.body.email} is not never registered` }
      }

      if (!checkUserAccount.verified) {
        throw { code: status.NOT_FOUND, message: `Account ${req.body.email} is not verified, please check your email` }
      }

      const checkPassword: IPassword = await comparePassword(req.body.password, checkUserAccount.password)

      if (checkPassword.error) {
        throw { code: status.BAD_REQUEST, message: 'Password is not match' }
      }

      const generateAccessToken: IToken | string = await signToken(
        { id: checkUserAccount.id, email: checkUserAccount.email, role: checkUserAccount.role },
        { expiredAt: 1, type: 'days' }
      )

      if (assert.isPromise(generateAccessToken as any)) {
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
      const getActivationToken: ModelSecret = await ModelSecret.query()
        .findOne({ access_token: req.params.token })
        .andWhere('type', 'activation')

      if (!getActivationToken) {
        throw { code: status.NOT_FOUND, message: 'Activation token not found' }
      }

      let datenow: string = new Date().toISOString()
      let expiredAt: string = new Date(getActivationToken.expired_at).toISOString()

      if (expiredAt < datenow) {
        throw { code: status.BAD_REQUEST, message: 'Activation token expired, please resend new activation token' }
      }

      const updatedVerified: ModelUser = await super.model().query().updateAndFetchById(getActivationToken.id, { verified: true })

      if (!updatedVerified) {
        throw { code: status.BAD_REQUEST, message: 'Verified account failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: `Verified account ${updatedVerified.email} success, please login` })
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
      const checkTableColumn: ModelUser[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkEmailExist: ModelUser = await super.model().query().findOne({ email: req.body.email })

      if (!checkEmailExist) {
        throw { code: status.NOT_FOUND, message: `Email ${req.body.email} is not exist` }
      }

      const htmlTemplate: any = await renderTemplate(checkEmailExist.email, randomToken(), 'template_reset')

      if (assert.isBoolean(htmlTemplate) || assert.isPromise(htmlTemplate)) {
        throw { code: status.BAD_REQUEST, message: 'Render html template from ejs failed' }
      }

      const sendMail: any = await sendMailer(checkEmailExist.email, 'Reset Password', htmlTemplate)

      if (assert.isUndefined(sendMail) || assert.isPromise(sendMail)) {
        throw { code: status.BAD_REQUEST, message: 'Sending email reset password failed' }
      }

      const addResetToken: ModelSecret = await ModelSecret.query()
        .insert({
          user_id: checkEmailExist.id,
          access_token: randomToken(),
          type: 'reset password',
          expired_at: expiredAt(5, 'minute')
        })
        .first()

      if (!addResetToken) {
        throw { code: status.FORBIDDEN, message: 'Insert reset token into database failed' }
      }

      return Promise.resolve({
        code: status.OK,
        message: `Reset password success, please check you email ${req.body.email}`
      })
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
      const checkTableColumn: ModelUser[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const checkEmailExist: ModelUser = await super.model().query().findOne({ email: req.body.email })

      if (!checkEmailExist) {
        throw { code: status.NOT_FOUND, message: `Email ${req.body.email} is not exist` }
      }

      const resetToken: string = randomToken()
      const htmlTemplate: any = await renderTemplate(checkEmailExist.email, resetToken, 'template_resend')

      if (assert.isBoolean(htmlTemplate) || assert.isPromise(htmlTemplate)) {
        throw { code: status.BAD_REQUEST, message: 'Render html template from ejs failed' }
      }

      const sendMail: any = await sendMailer(checkEmailExist.email, 'Resend Token', htmlTemplate)

      if (assert.isUndefined(sendMail) || assert.isPromise(sendMail)) {
        throw { code: status.BAD_REQUEST, message: 'Sending email resend activation token failed' }
      }

      const addActivationToken: ModelSecret = await ModelSecret.query()
        .insert({
          user_id: checkEmailExist.id,
          access_token: resetToken,
          type: 'activation',
          expired_at: expiredAt(5, 'minute')
        })
        .first()

      if (!addActivationToken) {
        throw { code: status.FORBIDDEN, message: 'Insert activation token into database failed' }
      }

      return Promise.resolve({
        code: status.OK,
        message: `Resend new activation token success, please check you email ${req.body.email}`
      })
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
      const checkTableColumn: ModelUser[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const getActivationToken: ModelSecret = await ModelSecret.query().findOne({ token: req.params.token })

      if (!getActivationToken) {
        throw { code: status.NOT_FOUND, message: 'Reset token not found' }
      }

      let datenow: string = new Date().toISOString()
      let expiredAt: string = new Date(getActivationToken.expired_at).toISOString()

      if (expiredAt < datenow) {
        throw { code: status.BAD_REQUEST, message: 'Reset token expired, please reset password again' }
      }

      const updatedPassword: ModelUser = await super
        .model()
        .query()
        .updateAndFetchById(getActivationToken.id, { password: req.body.password })

      if (!updatedPassword) {
        throw { code: status.BAD_REQUEST, message: 'Created new password failed' }
      }

      return Promise.resolve({ code: status.OK, message: 'Created new password success' })
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
