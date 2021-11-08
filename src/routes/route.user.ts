import { Router } from 'express'
import { ControllerUser } from '@/controllers/controller.user'

export class RouteUser extends ControllerUser {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/auth/register', this.registerControllerUser)
    this.router.post('/auth/login', this.loginControllerUser)
    this.router.get('/auth/activation-account/:id', this.activationControllerUser)
    this.router.post('/auth/forgot-password/:id', this.forgotControllerUser)
    this.router.post('/auth/resend-token/:id', this.resendControllerUser)
    this.router.put('/auth/reset-password/:id', this.forgotControllerUser)

    return this.router
  }
}
