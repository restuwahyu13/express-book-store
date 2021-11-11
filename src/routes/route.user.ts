import { Router } from 'express'
import { ControllerUser, Schema } from '@/controllers/controller.user'
import { validator } from '@/libs/lib.validator'

export class RouteUser extends ControllerUser {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/auth/register', [...Schema.registerSchemaUser, validator()], this.registerControllerUser)
    this.router.post('/auth/login', this.loginControllerUser)
    this.router.get('/auth/activation-account/:id', this.activationControllerUser)
    this.router.post('/auth/forgot-password/:id', this.forgotControllerUser)
    this.router.post('/auth/resend-token/:id', this.resendControllerUser)
    this.router.put('/auth/reset-password/:id', this.forgotControllerUser)
    this.router.put('/token/health/:id', this.healthTokenControllerUser)
    this.router.put('/token/refresh/:id', this.refreshTokenControllerUser)
    this.router.put('/token/revoke/:id', this.revokeTokenControllerUser)

    return this.router
  }
}
