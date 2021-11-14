import { Router } from 'express'
import { ControllerUser, Schema } from '@controllers/controller.user'
import { validator } from '@libs/lib.validator'

export class RouteUser extends ControllerUser {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/register', [...Schema.registerSchemaUser, validator()], this.registerControllerUser)
    this.router.post('/login', this.loginControllerUser)
    this.router.get('/activation-account/:token', this.activationControllerUser)
    this.router.post('/forgot-password', this.forgotControllerUser)
    this.router.post('/resend-token', this.resendControllerUser)
    this.router.put('/reset-password/:token', this.forgotControllerUser)
    this.router.put('/token/health/:id', this.healthTokenControllerUser)
    this.router.put('/token/refresh/:id', this.refreshTokenControllerUser)
    this.router.put('/token/revoke/:id', this.revokeTokenControllerUser)

    return this.router
  }
}

export default new RouteUser().main()
