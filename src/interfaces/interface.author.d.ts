import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerAuthor {
  createControllerAuthor(req: Request, res: Response): Promise<any>
  resultsControllerAuthor(req: Request, res: Response): Promise<any>
  resultControllerAuthor(req: Request, res: Response): Promise<any>
  deleteControllerAuthor(req: Request, res: Response): Promise<any>
  updateControllerAuthor(req: Request, res: Response): Promise<any>
}

export interface IServiceAuthor {
  createServiceAuthor(req: Request): Promise<Record<string, any>>
  resultsServiceAuthor: () => Promise<Record<string, any>>
  resultServiceAuthor(req: Request): Promise<Record<string, any>>
  deleteServiceAuthor(req: Request): Promise<Record<string, any>>
  updateServiceAuthor(req: Request): Promise<Record<string, any>>
}

export type IAuthor = {
  first_name: string
  last_name: string
  place_of_birth: string
  date_of_birth: any
  created_at?: any
  updated_at?: any
}
