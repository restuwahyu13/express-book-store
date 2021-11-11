import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerProfile {
  resultControllerProfile(req: Request, res: Response): Promise<any>
  deleteControllerProfile(req: Request, res: Response): Promise<any>
  updateControllerProfile(req: Request, res: Response): Promise<any>
}

export interface IServiceProfile {
  resultServiceProfile(req: Request): Promise<Record<string, any>>
  deleteServiceProfile(req: Request): Promise<Record<string, any>>
  updateServiceProfile(req: Request): Promise<Record<string, any>>
}

export type IProfile = {
  id: number
  user_id: number
  firstname: string
  lastname: string
  email: string
  phone: number
  place_of_birth: string
  date_of_birth: any
  address: string
  state: string
  city: string
  country: string
  postcode: number
  created_at?: any
  updated_at?: any
}
