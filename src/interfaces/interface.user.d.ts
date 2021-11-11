import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerUser {
  registerControllerUser(req: Request, res: Response): Promise<any>
  loginControllerUser(req: Request, res: Response): Promise<any>
  activationControllerUser(req: Request, res: Response): Promise<any>
  forgotControllerUser(req: Request, res: Response): Promise<any>
  resendControllerUser(req: Request, res: Response): Promise<any>
  resetControllerUser(req: Request, res: Response): Promise<any>
  healthTokenControllerUser(req: Request, res: Response): Promise<any>
  refreshTokenControllerUser(req: Request, res: Response): Promise<any>
  revokeTokenControllerUser(req: Request, res: Response): Promise<any>
}

export interface IServiceUser {
  registerServiceUser(req: Request): Promise<Record<string, any>>
  loginServiceUser(req: Request): Promise<Record<string, any>>
  activationServiceUser(req: Request): Promise<Record<string, any>>
  forgotServiceUser(req: Request): Promise<Record<string, any>>
  resendServiceUser(req: Request): Promise<Record<string, any>>
  resetServiceUser(req: Request): Promise<Record<string, any>>
  healthTokenServiceUser(req: Request, res: Response): Promise<any>
  refreshTokenServiceUser(req: Request, res: Response): Promise<any>
  revokeTokenServiceUser(req: Request, res: Response): Promise<any>
}

export type IUser = {
  email: string
  password: string
  role: string
  active?: boolean
  verified?: boolean
  access_token?: string
  expired_at?: any
  type?: string
  created_at?: any
  updated_at?: any
}
