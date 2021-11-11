import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerAdmin {
  createdControllerAdmin(req: Request, res: Response): Promise<any>
  resultsControllerAdmin(req: Request, res: Response): Promise<any>
  resultControllerAdmin(req: Request, res: Response): Promise<any>
  deleteControllerAdmin(req: Request, res: Response): Promise<any>
  updateControllerAdmin(req: Request, res: Response): Promise<any>
}

export interface IServiceAdmin {
  createdControllerAdmin(req: Request): Promise<Record<string, any>>
  resultsControllerAdmin(): Promise<Record<string, any>>
  resultControllerAdmin(req: Request): Promise<Record<string, any>>
  deleteControllerAdmin(req: Request): Promise<Record<string, any>>
  updateControllerAdmin(req: Request): Promise<Record<string, any>>
}

export type IAdmin = {
  email: string
  password: string
  role: string
  access_token?: string
  created_at?: any
  updated_at?: any
}
